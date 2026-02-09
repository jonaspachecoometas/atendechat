import request from 'src/service/request.js'

export function ListarAppWaba (params = {}) {
  return request({
    url: '/app-waba',
    method: 'get',
    params
  })
}

export function MostrarAppWaba (id) {
  return request({
    url: `/app-waba/${id}`,
    method: 'get'
  })
}

export function CriarAppWaba (data) {
  return request({
    url: '/app-waba',
    method: 'post',
    data
  })
}

export function AtualizarAppWaba (id, data) {
  return request({
    url: `/app-waba/${id}`,
    method: 'put',
    data
  })
}

export function DeletarAppWaba (id) {
  return request({
    url: `/app-waba/${id}`,
    method: 'delete'
  })
}

export function ObterAppWabaAtivo (tenantId) {
  return request({
    url: `/app-waba-active/${tenantId}`,
    method: 'get'
  })
}

export function ListarAppWabaAtivos () {
  return request({
    url: '/app-waba-tenantActive',
    method: 'get'
  })
}

