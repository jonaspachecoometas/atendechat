import request from 'src/service/request.js'

export function EnviarSMS (data) {
  return request({
    url: '/sendSms',
    method: 'post',
    data
  })
}

export function EnviarSMSMassa (data) {
  return request({
    url: '/bulkSms',
    method: 'post',
    data
  })
}

export function EnviarSMSConecta (data) {
  return request({
    url: '/sendSmsConecta',
    method: 'post',
    data
  })
}

export function EnviarSMSMassaConecta (data) {
  return request({
    url: '/bulkSmsConecta',
    method: 'post',
    data
  })
}

export function EnviarSMSLivson (data) {
  return request({
    url: '/sendSmsLivson',
    method: 'post',
    data
  })
}

export function EnviarSMSMassaLivson (data) {
  return request({
    url: '/bulkSmsLivson',
    method: 'post',
    data
  })
}
