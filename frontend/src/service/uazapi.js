import request from 'src/service/request.js'
import requestMidia from 'src/service/requestMidia.js'

export function EnviarMensagemUazapi (ticketId, data) {
  return requestMidia({
    url: `/uazapi-message/${ticketId}`,
    method: 'post',
    data
  })
}

export function EnviarReacaoUazapi (ticketId, data) {
  return request({
    url: `/uazapi-react/${ticketId}`,
    method: 'post',
    data
  })
}

export function EnviarEdicaoUazapi (ticketId, data) {
  return request({
    url: `/uazapi-edition/${ticketId}`,
    method: 'post',
    data
  })
}

export function QRCodeUazapi (data) {
  return request({
    url: `/uazapi-qrcode/${data.wabaId}`,
    method: 'post',
    data
  })
}

export function ValidarWebhookUazapi (data) {
  return request({
    url: `/uazapi-setwebhook/${data.wabaId}`,
    method: 'post',
    data
  })
}
