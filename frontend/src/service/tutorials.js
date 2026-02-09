import request from 'src/service/request.js'

export function ListarTutoriais(params) {
  return request({
    url: '/tutorials',
    method: 'get',
    params,
  })
}

export function CriarTutorial(data) {
  return request({
    url: '/tutorials',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function AtualizarTutorial(tutorialId, data) {
  return request({
    url: `/tutorials/${tutorialId}`,
    method: 'patch',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function DeletarTutorial(tutorialId) {
  return request({
    url: `/tutorials/${tutorialId}`,
    method: 'delete'
  })
} 