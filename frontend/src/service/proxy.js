import request from 'src/service/request'

// Listar proxies do tenant
export function ListarProxies() {
  return request({
    url: '/proxy',
    method: 'get'
  })
}

// Salvar proxies do tenant
export function SalvarProxies(proxies) {
  return request({
    url: '/proxy',
    method: 'post',
    data: { proxies }
  })
}

// Remover proxies do tenant
export function RemoverProxies() {
  return request({
    url: '/proxy',
    method: 'delete'
  })
}

// Testar proxy específico
export function TestarProxy(proxy) {
  return request({
    url: '/proxy-test',
    method: 'post',
    data: { proxy }
  })
}

// Obter estatísticas dos proxies
export function ObterEstatisticasProxies() {
  return request({
    url: '/proxy-stats',
    method: 'get'
  })
}

// Gerar proxies locais para o tenant
export function GerarProxiesLocais(count = 5, type = 'mixed') {
  return request({
    url: '/proxy-generate-local',
    method: 'post',
    data: { count, type }
  })
}

// Gerar proxies locais globais
export function GerarProxiesLocaisGlobais(count = 10, type = 'mixed') {
  return request({
    url: '/proxy-generate-global',
    method: 'post',
    data: { count, type }
  })
}
