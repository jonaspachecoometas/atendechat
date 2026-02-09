import request from 'src/service/request.js'

export function CriarBulkDispatch(data) {
  return request({
    url: '/bulk-dispatch',
    method: 'post',
    data
  })
}

export function ListarBulkDispatches(params) {
  return request({
    url: '/bulk-dispatch',
    method: 'get',
    params
  })
}

export function ObterBulkDispatch(id) {
  return request({
    url: `/bulk-dispatch/${id}`,
    method: 'get'
  })
}

export function AtualizarBulkDispatch(id, data) {
  return request({
    url: `/bulk-dispatch/${id}`,
    method: 'put',
    data
  })
}

export function IncrementarProgressoBulkDispatch(id, data) {
  return request({
    url: `/bulk-dispatch/${id}/increment`,
    method: 'patch',
    data
  })
}

