import CryptoJS from 'crypto-js'
import request from 'src/service/request.js'

// Default encryption key - will be replaced by tenant 1 key
const DEFAULT_ENCRYPTION_KEY = 'zpro-passaporte-2024-encryption-key'

// Cache para evitar múltiplas consultas à API em sequência
let encryptionKeyCache = null
const CACHE_TTL = 60000 // 1 minuto

// Cache de falhas de descriptografia para evitar loops
const decryptionFailureCache = new Map()
const MAX_DECRYPTION_FAILURES = 5 // Máximo de falhas antes de bloquear
const FAILURE_CACHE_TTL = 300000 // 5 minutos

/**
 * Gets the encryption key from tenant 1 via API (always the main tenant)
 * Com cache para evitar múltiplas consultas à API
 * @returns {Promise<string>} - Tenant 1 encryption key
 */
async function getTenantEncryptionKey() {
  try {
    const now = Date.now()

    // Verificar cache válido
    if (encryptionKeyCache && (now - encryptionKeyCache.timestamp < CACHE_TTL)) {
      return encryptionKeyCache.key || DEFAULT_ENCRYPTION_KEY
    }

    const response = await request({
      url: '/publicEncryptionKey',
      method: 'get',
      timeout: 5000 // Timeout de 5 segundos
    })
    
    if (response.status === 200 && response.data) {
      // Atualizar cache
      encryptionKeyCache = {
        key: response.data,
        timestamp: now
      }
      return response.data
    }
    
    // If API fails, use cached value if available
    if (encryptionKeyCache) {
      console.warn('Error getting encryption key from API, using cached value')
      return encryptionKeyCache.key || DEFAULT_ENCRYPTION_KEY
    }
    
    // If API fails and no cache, use default key
    return DEFAULT_ENCRYPTION_KEY
  } catch (error) {
    // Se houver erro, usar cache se disponível
    if (encryptionKeyCache) {
      console.warn('Error getting encryption key from tenant 1, using cached value:', error)
      return encryptionKeyCache.key || DEFAULT_ENCRYPTION_KEY
    }
    
    console.error('Error getting encryption key from tenant 1:', error)
    return DEFAULT_ENCRYPTION_KEY
  }
}

/**
 * Verifica se uma descriptografia falhou recentemente para evitar loops
 */
function checkDecryptionFailureRate(encryptedPassword) {
  const now = Date.now()
  const cacheKey = encryptedPassword ? encryptedPassword.substring(0, 50) : 'invalid'

  const failure = decryptionFailureCache.get(cacheKey)

  if (failure) {
    // Limpar cache antigo
    if (now - failure.lastAttempt > FAILURE_CACHE_TTL) {
      decryptionFailureCache.delete(cacheKey)
      return false
    }

    // Se excedeu o limite de falhas, bloquear temporariamente
    if (failure.count >= MAX_DECRYPTION_FAILURES) {
      return true // Bloqueado
    }
  }

  return false // Não bloqueado
}

/**
 * Registra uma falha de descriptografia
 */
function recordDecryptionFailure(encryptedPassword) {
  const cacheKey = encryptedPassword ? encryptedPassword.substring(0, 50) : 'invalid'
  const now = Date.now()

  const failure = decryptionFailureCache.get(cacheKey) || { count: 0, lastAttempt: 0 }

  failure.count++
  failure.lastAttempt = now

  decryptionFailureCache.set(cacheKey, failure)

  // Limpar cache antigo periodicamente (manter apenas últimos 1000)
  if (decryptionFailureCache.size > 1000) {
    const entriesToDelete = []
    for (const [key, value] of decryptionFailureCache.entries()) {
      if (now - value.lastAttempt > FAILURE_CACHE_TTL) {
        entriesToDelete.push(key)
      }
    }
    entriesToDelete.forEach(key => decryptionFailureCache.delete(key))
  }
}

/**
 * Limpa o registro de falha após sucesso
 */
function clearDecryptionFailure(encryptedPassword) {
  const cacheKey = encryptedPassword ? encryptedPassword.substring(0, 50) : 'invalid'
  decryptionFailureCache.delete(cacheKey)
}

/**
 * Encrypts a password using AES
 * @param {string} password - Password to be encrypted
 * @returns {Promise<string>} - Encrypted password in base64
 */
export async function encryptPassword(password) {
  try {
    if (!password || typeof password !== 'string') {
      throw new Error('Invalid password format')
    }

    const encryptionKey = await getTenantEncryptionKey()
    
    if (!encryptionKey || encryptionKey.length < 16) {
      throw new Error('Invalid encryption key: key is too short or empty')
    }

    const encrypted = CryptoJS.AES.encrypt(password, encryptionKey).toString()
    return encrypted
  } catch (error) {
    console.error('Error encrypting password:', error)
    throw new Error('Password encryption failed')
  }
}

/**
 * Decrypts an encrypted password using AES
 * Com proteção contra loops infinitos e tratamento robusto de erros
 * @param {string} encryptedPassword - Encrypted password in base64
 * @returns {Promise<string>} - Decrypted password
 * @throws {Error} - Quando a descriptografia falha
 */
export async function decryptPassword(encryptedPassword) {
  // Validar entrada
  if (!encryptedPassword || typeof encryptedPassword !== 'string') {
    throw new Error('Invalid encrypted password format')
  }

  // Verificar se está bloqueado por muitas falhas
  if (checkDecryptionFailureRate(encryptedPassword)) {
    const error = new Error(
      'Decryption blocked: too many recent failures. The encryption key may be incompatible with this data.'
    )
    error.isKeyMismatch = true
    console.warn('Decryption blocked for password due to repeated failures')
    throw error
  }

  try {
    const encryptionKey = await getTenantEncryptionKey()

    // Validar chave de criptografia
    if (!encryptionKey || encryptionKey.length < 16) {
      const error = new Error('Invalid encryption key: key is too short or empty')
      error.isKeyMismatch = true
      throw error
    }

    const decrypted = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey)
    const decryptedPassword = decrypted.toString(CryptoJS.enc.Utf8)

    // Verificar se a descriptografia foi bem-sucedida
    if (!decryptedPassword || decryptedPassword.length === 0) {
      // Registrar falha
      recordDecryptionFailure(encryptedPassword)

      // Verificar se é provável que a chave seja incompatível
      const isKeyMismatch = encryptionKey !== DEFAULT_ENCRYPTION_KEY

      const error = new Error(
        `Decryption failed - invalid password or encryption key mismatch. ` +
        `The encryption key may have been changed and is incompatible with old encrypted data.`
      )
      error.isKeyMismatch = isKeyMismatch
      throw error
    }

    // Limpar registro de falha em caso de sucesso
    clearDecryptionFailure(encryptedPassword)

    return decryptedPassword
  } catch (error) {
    // Se já tem a flag isKeyMismatch, apenas propagar
    if (error.isKeyMismatch) {
      console.error('Decryption error (key mismatch):', error.message)
      throw error
    }

    // Registrar falha para erros genéricos
    recordDecryptionFailure(encryptedPassword)

    // Log detalhado do erro
    console.error('Error decrypting password:', error?.message || error)

    // Determinar se é erro de chave incompatível
    const isKeyMismatch = error?.message?.includes('mismatch') || 
                         error?.message?.includes('invalid password')

    const newError = new Error(
      `Password decryption failed: ${error?.message || 'Unknown error'}`
    )
    newError.isKeyMismatch = isKeyMismatch
    throw newError
  }
}

/**
 * Limpa o cache da chave de criptografia
 * Útil quando a chave é atualizada
 */
export function clearEncryptionKeyCache() {
  encryptionKeyCache = null
  console.info('Encryption key cache cleared')
}

/**
 * Limpa o cache de falhas de descriptografia
 * Útil para resetar bloqueios após correção de problemas
 */
export function clearDecryptionFailureCache() {
  decryptionFailureCache.clear()
  console.info('Decryption failure cache cleared')
}

/**
 * Generates a random encryption key (for future use)
 * @returns {string} - Random encryption key
 */
export function generateEncryptionKey() {
  return CryptoJS.lib.WordArray.random(256/8).toString()
}
