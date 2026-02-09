import request from 'src/service/request.js'

export function CriarOpportunity (data) {
  return request({
    url: '/opportunities',
    method: 'post',
    data
  })
}

export function ListarOpportunities (filters = {}) {
  return request({
    url: '/opportunities',
    method: 'get',
    params: {
      page: filters.page || 1,
      limit: filters.limit || 10,
      orderBy: filters.orderBy,
      orderDirection: filters.orderDirection,
      pipelineId: filters.pipelineId,
      stageId: filters.stageId,
      responsibleId: filters.responsibleId,
      status: filters.status,
      valorMin: filters.valorMin,
      valorMax: filters.valorMax,
      startDate: filters.startDate,
      endDate: filters.endDate,
      searchTerm: filters.searchTerm,
      periodo: filters.periodo,
      ordenacao: filters.ordenacao
    }
  })
}

export function BuscarOpportunity (id) {
  return request({
    url: `/opportunities/${id}`,
    method: 'get'
  })
}

export function AlterarOpportunity (data) {
  return request({
    url: `/opportunities/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarOpportunity (id) {
  return request({
    url: `/opportunities/${id}`,
    method: 'delete'
  })
}

export function ListarOpportunitiesByContact (contactId, filters = {}) {
  return request({
    url: `/opportunitiesContact/${contactId}`,
    method: 'get',
    params: {
      page: filters.page || 1,
      limit: filters.limit || 100,
      orderBy: filters.orderBy,
      orderDirection: filters.orderDirection,
      status: filters.status,
      valorMin: filters.valorMin,
      valorMax: filters.valorMax
    }
  })
} 