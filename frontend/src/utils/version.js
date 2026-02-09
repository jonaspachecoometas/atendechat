/**
 * Utilitário para gerenciar versão da aplicação
 * A versão é definida no package.json e será injetada no build
 */

// Versão será substituída durante o build
export const APP_VERSION = '3.1.5.1.5'

const VERSION_STORAGE_KEY = 'app_version'

/**
 * Obtém a versão atual armazenada no localStorage
 */
export function getStoredVersion() {
  try {
    return localStorage.getItem(VERSION_STORAGE_KEY)
  } catch (error) {
    console.error('Erro ao obter versão armazenada:', error)
    return null
  }
}

/**
 * Armazena a versão atual no localStorage
 */
export function storeVersion(version) {
  try {
    localStorage.setItem(VERSION_STORAGE_KEY, version)
    return true
  } catch (error) {
    console.error('Erro ao armazenar versão:', error)
    return false
  }
}

/**
 * Verifica se há uma nova versão disponível
 * Compara a versão atual com a versão armazenada
 */
export function checkVersionUpdate() {
  const currentVersion = APP_VERSION
  const storedVersion = getStoredVersion()

  // Se não há versão armazenada, armazena a atual
  if (!storedVersion) {
    storeVersion(currentVersion)
    return false
  }

  // Se as versões são diferentes, há uma atualização
  if (storedVersion !== currentVersion) {
    return true
  }

  return false
}

/**
 * Atualiza a versão armazenada para a versão atual
 */
export function updateStoredVersion() {
  return storeVersion(APP_VERSION)
}

/**
 * Verifica atualização através de fetch do index.html
 * Útil quando o cache está muito persistente
 */
export async function checkVersionFromServer() {
  try {
    // Adiciona timestamp para evitar cache
    const timestamp = new Date().getTime()
    const response = await fetch(`/?v=${timestamp}`, {
      method: 'HEAD',
      cache: 'no-store'
    })

    // Tenta obter a versão de um meta tag ou header customizado
    // Se não houver, retorna null (não é possível detectar)
    return null
  } catch (error) {
    console.error('Erro ao verificar versão do servidor:', error)
    return null
  }
}

