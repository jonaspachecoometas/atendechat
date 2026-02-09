import request from 'src/service/request.js'

export function CriarProvedorGlobal (data) {
  return request({
    url: '/globalProviderConfig',
    method: 'post',
    data
  })
}

export function ListarProvedoresGlobais (params = {}) {
  return request({
    url: '/globalProviderConfig',
    method: 'get',
    params
  })
}

export function ListarProvedorGlobalPorId (id) {
  return request({
    url: `/globalProviderConfig/${id}`,
    method: 'get'
  })
}

export function AlterarProvedorGlobal (data) {
  return request({
    url: `/globalProviderConfig/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarProvedorGlobal (id) {
  return request({
    url: `/globalProviderConfig/${id}`,
    method: 'delete'
  })
}

export function AdicionarTenantAoProvedorGlobal (globalProviderConfigId, tenantId) {
  return request({
    url: `/globalProviderConfig/${globalProviderConfigId}/tenants`,
    method: 'post',
    data: { tenantId }
  })
}

export function RemoverTenantDoProvedorGlobal (globalProviderConfigId, tenantId) {
  return request({
    url: `/globalProviderConfig/${globalProviderConfigId}/tenants`,
    method: 'delete',
    data: { tenantId }
  })
}

export function ListarProvedoresGlobaisPublicos (params = {}) {
  return request({
    url: '/globalProviderConfig/public',
    method: 'get',
    params
  })
}

