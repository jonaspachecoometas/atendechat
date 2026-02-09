import request from 'src/service/request.js'
import requestMidia from 'src/service/requestMidia.js'

export function EnviarMensagemMeow (ticketId, data) {
  return requestMidia({
    url: `/meow-message/${ticketId}`,
    method: 'post',
    data
  })
}

export function EnviarReacaoMeow (ticketId, data) {
  return request({
    url: `/meow-react/${ticketId}`,
    method: 'post',
    data
  })
}

export function EnviarEdicaoMeow (ticketId, data) {
  return request({
    url: `/meow-edition/${ticketId}`,
    method: 'post',
    data
  })
}

export function QRCodeMeow (data) {
  return request({
    url: `/meow-qrcode/${data.wabaId}`,
    method: 'post',
    data
  })
}


export function ValidarWebhookMeow (data) {
  return request({
    url: `/meow-setwebhook/${data.wabaId}`,
    method: 'post',
    data
  })
}