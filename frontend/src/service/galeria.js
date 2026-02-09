import request from 'src/service/request.js'

export function ListarGaleria (params) {
  return request({
    url: '/gallery',
    method: 'get',
    params
  })
}

export function MostrarGaleria (id) {
  return request({
    url: `/gallery/${id}`,
    method: 'get'
  })
}

export function CriarGaleria (formData) {
  return request({
    url: '/gallery',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function DeletarGaleria (id) {
  return request({
    url: `/gallery/${id}`,
    method: 'delete'
  })
}

