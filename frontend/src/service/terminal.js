import request from 'src/service/request.js'

export function Terminal (data) {
  return request({
    url: '/command/',
    method: 'post',
    data
  })
}