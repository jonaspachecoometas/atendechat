import request from 'src/service/request.js'

export function FetchFacebookPages (data) {
  return request({
    url: '/fb/register-pages',
    method: 'post',
    data
  })
}

export function LogoutFacebookPages (data) {
  return request({
    url: '/fb/logout-pages',
    method: 'post',
    data
  })
}
