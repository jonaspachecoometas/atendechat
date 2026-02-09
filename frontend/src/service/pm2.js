import request from 'src/service/request.js'

export function Restart () {
  return request({
    url: `/restart-pm2`,
    method: 'get'
  })
}