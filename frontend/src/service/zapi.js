import request from 'src/service/request.js'
import requestMidia from 'src/service/requestMidia.js'

export function EnviarMensagemZapi (ticketId, data) {
  return requestMidia({
    url: `/zapi-message/${ticketId}`,
    method: 'post',
    data
  })
}

export function EnviarReacaoZapi (ticketId, data) {
  return request({
    url: `/zapi-react/${ticketId}`,
    method: 'post',
    data
  })
}

export function EnviarEdicaoZapi (ticketId, data) {
  return request({
    url: `/zapi-edition/${ticketId}`,
    method: 'post',
    data
  })
}

export function QRCodeZapi (data) {
  return request({
    url: `/zapi-qrcode/${data.wabaId}`,
    method: 'post',
    data
  })
}

export function ValidarWebhookZapi (data) {
  return request({
    url: `/zapi-setwebhook/${data.wabaId}`,
    method: 'post',
    data
  })
}
