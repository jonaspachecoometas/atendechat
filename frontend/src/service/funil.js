import request from 'src/service/request.js'

export function CriarPipeline (data) {
  return request({
    url: '/pipelines',
    method: 'post',
    data
  })
}

export function ListarPipelines (filters = {}) {
  return request({
    url: '/pipelines',
    method: 'get',
    params: {
      page: filters.page || 1,
      limit: filters.limit || 1000,
      orderBy: filters.orderBy,
      orderDirection: filters.orderDirection,
      status: filters.status,
      searchTerm: filters.searchTerm,
      ordenacao: filters.ordenacao
    }
  })
}

export function BuscarPipeline (id) {
  return request({
    url: `/pipelines/${id}`,
    method: 'get'
  })
}

export function AlterarPipeline (data) {
  return request({
    url: `/pipelines/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarPipeline (id) {
  return request({
    url: `/pipelines/${id}`,
    method: 'delete'
  })
} 