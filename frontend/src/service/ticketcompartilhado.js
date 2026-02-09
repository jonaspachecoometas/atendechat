import request from 'src/service/request.js'

// Criar novo convite de compartilhamento
export function CriarTicketCompartilhado(data) {
  return request({
    url: '/ticket-shared',
    method: 'post',
    data
  })
}

// Listar todos os convites de compartilhamento
export function ListarTicketsCompartilhados(params = {}) {
  return request({
    url: '/ticket-shared',
    method: 'get',
    params
  })
}

// // Buscar convite específico por ID
// export function BuscarTicketCompartilhado(id) {
//   return request({
//     url: `/ticket-shared/${id}`,
//     method: 'get'
//   })
// }

// // Buscar convite por ticketId
// export function BuscarTicketCompartilhadoPorTicket(ticketId) {
//   return request({
//     url: `/ticket-shared/ticket/${ticketId}`,
//     method: 'get'
//   })
// }

// Atualizar convite de compartilhamento
export function AtualizarTicketCompartilhado(id, data) {
  return request({
    url: `/ticket-shared/${id}`,
    method: 'put',
    data
  })
}

// Deletar convite de compartilhamento
export function DeletarTicketCompartilhado(id) {
  return request({
    url: `/ticket-shared/${id}`,
    method: 'delete'
  })
}

// Verificar se um ticket já possui convite de compartilhamento
export function VerificarTicketCompartilhado(ticketId) {
  return request({
    url: `/ticket-shareds/ticket/${ticketId}`,
    method: 'get'
  }).then(response => {
    return { existe: true, data: response.data }
  }).catch(error => {
    return { existe: false, data: null }
    // throw error
  })
}

// Listar convites de compartilhamento por usuário
export function ListarTicketsCompartilhadosPorUsuario() {
  return request({
    url: '/ticket-shared-user/user',
    method: 'get'
  })
} 