import request from 'src/service/request.js'

export function CriarMotivo (data) {
  return request({
    url: '/reasons/',
    method: 'post',
    data
  })
}

export function ListarMotivos () {
  return request({
    url: '/reasons/',
    method: 'get'
  })
}

export function AlterarMotivo (data) {
  return request({
    url: `/reasons/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarMotivo (data) {
  return request({
    url: `/reasons/${data.id}`,
    method: 'delete'
  })
}
