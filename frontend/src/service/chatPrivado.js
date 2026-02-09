import request from './request.js'

export function enviarMensagemPrivada(data) {
  return request({
    url: '/chat-privado/msg',
    method: 'post',
    data
  })
}

export function marcarMensagemPrivadaComoLida(contactId, isGroup) {
  return request({
    url: `/chat-privado/msg/${contactId}/read`,
    method: 'put',
    data: {
      isGroup
    }
  })
}

export function listarGruposPrivados(userId) {
  return request({
    url: `/users/grupo-privado/${userId}`,
    method: 'get'
  })
}

export function listarMensagensPrivadas(contactId, isGroup) {
  return request({
    url: `/chat-privado/msg/${contactId}?isGroup=${isGroup}`,
    method: 'get'
  })
}

export function listCountUnreadPrivateMessage() {
  return request({
    url: '/chat-privado/msgs/mensagens',
    method: 'get'
  })
}

export function listCountUnreadGroupMessage() {
  return request({
    url: '/chat-privado/groups/mensagens',
    method: 'get'
  })
}

export function marcarTodasMensagensComoLidas() {
  return request({
    url: '/chat-privado/msgMarcarTodasLidas',
    method: 'put'
  })
}

export function editarMensagemPrivada(mensagemId, text) {
  return request({
    url: `/chat-privado/msg/${mensagemId}`,
    method: 'put',
    data: { text }
  })
}

export function deletarMensagemPrivada(mensagemId) {
  return request({
    url: `/chat-privado/msg/${mensagemId}`,
    method: 'delete'
  })
}

export function adicionarReacaoMensagemPrivada(mensagemId, emoji) {
  return request({
    url: `/chat-privado/msg/${mensagemId}/reaction`,
    method: 'put',
    data: { emoji }
  })
}

export function removerReacaoMensagemPrivada(mensagemId) {
  return request({
    url: `/chat-privado/msg/${mensagemId}/reaction`,
    method: 'delete'
  })
}