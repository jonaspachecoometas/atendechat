import request from 'src/service/request'
import { encryptPassword } from 'src/utils/encryption'

export async function RealizarLogin (user) {
  // IMPORTANTE: Se masterkey for usado, NÃO criptografar a senha
  // A masterkey é armazenada em texto plano no banco e deve ser comparada diretamente
  let userData = { ...user }
  
  if (!user.masterkey) {
    // Apenas criptografar se NÃO for masterkey
    userData.password = await encryptPassword(user.password)
  }
  // Se for masterkey, manter password original (não criptografado)
  
  return request({
    url: '/auth/login/',
    method: 'post',
    data: userData
  })
}

export function RealizarLogout (user) {
  return request({
    url: '/auth/logout/',
    method: 'post',
    data: user
  })
}

export function RefreshToken () {
  return request({
    url: '/auth/refresh_token',
    method: 'post'
  })
}

export function ResetarPassword (data) {
  return request({
    url: '/password-reset',
    method: 'post',
    data
  })
}

export function RedefinirSenha (data) {
  return request({
    url: '/reset-password',
    method: 'post',
    data
  })
}

export function ValidateA2F (data) {
  return request({
    url: '/auth/validate-a2f/',
    method: 'post',
    data
  })
}

export function ResendA2F (data) {
  return request({
    url: '/auth/resend-a2f/',
    method: 'post',
    data
  })
}