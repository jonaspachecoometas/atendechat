import request from './request.js'

export function getSystemMetrics() {
  return request({
    url: '/metrics',
    method: 'get'
  })
} 