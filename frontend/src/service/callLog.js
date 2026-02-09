import request from 'src/service/request.js'

export function CriarCallLog(data) {
  return request({
    url: '/call-logs',
    method: 'post',
    data
  })
}

export function ListarCallLogs(filters = {}) {
  return request({
    url: '/call-logs',
    method: 'get',
    params: {
      page: filters.page || 1,
      limit: filters.limit || 10,
      orderBy: filters.orderBy,
      orderDirection: filters.orderDirection,
      userId: filters.userId,
      originNumber: filters.originNumber,
      destinationNumber: filters.destinationNumber,
      callStatus: filters.callStatus,
      startDate: filters.startDate,
      endDate: filters.endDate
    }
  })
}

export function BuscarCallLog(id) {
  return request({
    url: `/call-logs/${id}`,
    method: 'get'
  })
}

export function AlterarCallLog(data) {
  return request({
    url: `/call-logs/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarCallLog(id) {
  return request({
    url: `/call-logs/${id}`,
    method: 'delete'
  })
} 