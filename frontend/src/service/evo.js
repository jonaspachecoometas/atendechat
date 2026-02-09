import request from 'src/service/request.js'
import requestMidia from 'src/service/requestMidia.js'

export function EnviarMensagemEvo (ticketId, data) {
  return requestMidia({
    url: `/evo-message/${ticketId}`,
    method: 'post',
    data
  })
}

export function EnviarReacaoEvo (ticketId, data) {
  return request({
    url: `/evo-react/${ticketId}`,
    method: 'post',
    data
  })
}

export function EnviarEdicaoEvo (ticketId, data) {
  return request({
    url: `/evo-edition/${ticketId}`,
    method: 'post',
    data
  })
}

export function QRCodeEvo (data) {
  return request({
    url: `/evo-qrcode/${data.wabaId}`,
    method: 'post',
    data
  })
}

export function ValidarWebhook (data) {
  return request({
    url: `/evo-setwebhook/${data.wabaId}`,
    method: 'post',
    data
  })
}