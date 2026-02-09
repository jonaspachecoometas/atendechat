import request from 'src/service/request.js'

export function CriarTicketAction (data) {
  return request({
    url: '/ticket-actions',
    method: 'post',
    data
  })
}

export function ListarTicketActions (filters = {}) {
  return request({
    url: '/ticket-actions',
    method: 'get',
    params: {
      page: filters.page || 1,
      limit: filters.limit || 10,
      orderBy: filters.orderBy,
      orderDirection: filters.orderDirection,
      whatsappId: filters.whatsappId,
      actionType: filters.actionType,
      active: filters.active,
      searchTerm: filters.searchTerm,
      ordenacao: filters.ordenacao
    }
  })
}

export function BuscarTicketAction (id) {
  return request({
    url: `/ticket-actions/${id}`,
    method: 'get'
  })
}

export function AlterarTicketAction (data) {
  return request({
    url: `/ticket-actions/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarTicketAction (id) {
  return request({
    url: `/ticket-actions/${id}`,
    method: 'delete'
  })
}

export function ToggleActiveTicketAction (id) {
  return request({
    url: `/ticket-actions/${id}/toggle-active`,
    method: 'put'
  })
}

export function ListarTicketActionsAtivas () {
  return request({
    url: '/ticket-actions/active/list',
    method: 'get'
  })
}

export function CriarTicketActionsSequential (data) {
  return request({
    url: '/ticket-actions/sequential',
    method: 'post',
    data
  })
}

