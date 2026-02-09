import request from 'src/service/request.js'

export function EnviarMensagemWebChat(ticketId, data) {
  return request({
    url: `/webchat-message/${ticketId}`,
    method: 'post',
    data
  })
}

export function EnviarReacaoWebChat(ticketId, data) {
  return request({
    url: `/webchat-react/${ticketId}`,
    method: 'post',
    data
  })
}

export function EnviarEdicaoWebChat(ticketId, data) {
  return request({
    url: `/webchat-edition/${ticketId}`,
    method: 'post',
    data
  })
}

export function ObterWidgetWebChat(tenantId, wabaId, websocketToken) {
  return request({
    url: `/widget/${tenantId}/${wabaId}/${websocketToken}`,
    method: 'get',
    responseType: 'blob'
  })
}

export function VerificarConfiguracaoWebchat() {
  return request({
    url: '/webchat/config',
    method: 'get'
  })
}