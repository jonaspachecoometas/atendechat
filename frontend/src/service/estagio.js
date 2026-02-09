import request from 'src/service/request.js'

export function CriarStage (data) {
  return request({
    url: '/stages',
    method: 'post',
    data
  })
}

export function ListarStages (filters = {}) {
  return request({
    url: '/stages',
    method: 'get',
    params: {
      page: filters.page || 1,
      limit: filters.limit || 1000,
      orderBy: filters.orderBy,
      orderDirection: filters.orderDirection,
      pipelineId: filters.pipelineId,
      status: filters.status,
      searchTerm: filters.searchTerm,
      ordenacao: filters.ordenacao
    }
  })
}

export function BuscarStage (id) {
  return request({
    url: `/stages/${id}`,
    method: 'get'
  })
}

export function AlterarStage (data) {
  return request({
    url: `/stages/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarStage (id) {
  return request({
    url: `/stages/${id}`,
    method: 'delete'
  })
} 