import request from 'src/service/request.js'

// Cache e debounce para ListarContatos e ObterContato - reduz requisições simultâneas
let contactsListCache = new Map()
let contactDetailCache = new Map()
let pendingListRequests = new Map()
let pendingDetailRequests = new Map()
let debounceListTimers = new Map()
const CACHE_TTL = 2000 // 2 segundos de cache
const DETAIL_CACHE_TTL = 5000 // 5 segundos para detalhes de contato (mais estável)
const DEBOUNCE_DELAY = 300 // 300ms de debounce

// Função auxiliar para gerar chave de cache baseada nos params de listagem
function getListCacheKey(params) {
  return JSON.stringify({
    pageNumber: params.pageNumber || 1,
    searchParam: params.searchParam || '',
    tags: (params.tags || []).sort().join(','),
    kanban: params.kanban || '',
    // Adicionar outros parâmetros relevantes se necessário
    ...params
  })
}

export function ListarContatos (params = {}) {
  const cacheKey = getListCacheKey(params)
  const now = Date.now()

  // Verificar cache
  const cached = contactsListCache.get(cacheKey)
  if (cached && (now - cached.timestamp) < CACHE_TTL) {
    return Promise.resolve(cached.data)
  }

  // Se há uma requisição pendente para os mesmos params, retornar a mesma promise
  if (pendingListRequests.has(cacheKey)) {
    return pendingListRequests.get(cacheKey)
  }

  // Limpar timer de debounce anterior se existir
  if (debounceListTimers.has(cacheKey)) {
    clearTimeout(debounceListTimers.get(cacheKey))
  }

  // Criar nova requisição com debounce
  const requestPromise = new Promise((resolve, reject) => {
    const timerId = setTimeout(async () => {
      try {
        const response = await request({
          url: '/contacts/',
          method: 'get',
          params
        })
        
        // Atualizar cache
        contactsListCache.set(cacheKey, {
          data: response,
          timestamp: Date.now()
        })
        
        // Limpar requisição pendente
        pendingListRequests.delete(cacheKey)
        debounceListTimers.delete(cacheKey)
        
        resolve(response)
      } catch (error) {
        // Limpar requisição pendente mesmo em caso de erro
        pendingListRequests.delete(cacheKey)
        debounceListTimers.delete(cacheKey)
        reject(error)
      }
    }, DEBOUNCE_DELAY)

    debounceListTimers.set(cacheKey, timerId)
  })

  pendingListRequests.set(cacheKey, requestPromise)
  return requestPromise
}

export function ListarContatosAniversario (params) {
  return request({
    url: '/contactsBirthday/',
    method: 'get',
    params
  })
}

export function ListarContatosKanban (params) {
  return request({
    url: '/contactsKanban/',
    method: 'get',
    params
  })
}

export function ListarContatosPorEtiqueta (params) {
  return request({
    url: '/contactsByTags/',
    method: 'get',
    params
  })
}

export function ListarContatosPorEtiquetaEspecifica (params) {
  return request({
    url: '/contactsBySpecificTag/',
    method: 'get',
    params
  })
}

export function ListarContatosKanbanTags (params) {
  return request({
    url: '/contactsTags/',
    method: 'get',
    params
  })
}

export function ListarContatosPorKanbanEspecifico (params) {
  return request({
    url: '/contactsBySpecificKanban/',
    method: 'get',
    params
  })
}

export function ObterContato (contactId) {
  if (!contactId) {
    return Promise.reject(new Error('contactId é obrigatório'))
  }

  const cacheKey = `contact_${contactId}`
  const now = Date.now()

  // Verificar cache
  const cached = contactDetailCache.get(cacheKey)
  if (cached && (now - cached.timestamp) < DETAIL_CACHE_TTL) {
    return Promise.resolve(cached.data)
  }

  // Se há uma requisição pendente para o mesmo contato, retornar a mesma promise
  if (pendingDetailRequests.has(cacheKey)) {
    return pendingDetailRequests.get(cacheKey)
  }

  // Criar nova requisição
  const requestPromise = request({
    url: `/contacts/${contactId}`,
    method: 'get'
  })
    .then(response => {
      // Atualizar cache
      contactDetailCache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      })
      
      // Limpar requisição pendente
      pendingDetailRequests.delete(cacheKey)
      
      return response
    })
    .catch(error => {
      // Limpar requisição pendente mesmo em caso de erro
      pendingDetailRequests.delete(cacheKey)
      throw error
    })

  pendingDetailRequests.set(cacheKey, requestPromise)
  return requestPromise
}

export function ObterContatoPeloNumero (numberId) {
  return request({
    url: `/contactsNumber/${numberId}`,
    method: 'get'
  })
}

export function RemoverFotoNula (contactId) {
  return request({
    url: `/contactsRemovePicture/${contactId}`,
    method: 'post'
  })
}

export function AtualizarLid (contactId, lid) {
  return request({
    url: `/contactsUpdateLid/${contactId}`,
    method: 'post',
    data: { lid }
  })
}

export function AtualizarNome (contactId, name) {
  return request({
    url: `/contactsUpdateName/${contactId}`,
    method: 'post',
    data: { name }
  })
}

export function AtualizarLidFromContactId (contactId) {
  return request({
    url: `/contactsUpdateLidFromContactId/${contactId}`,
    method: 'post'
  })
}

export function DeletarDuplicados () {
  return request({
    url: '/contactsDeleteDuplicate',
    method: 'post'
  })
}

export function AgruparLid () {
  return request({
    url: '/contactsCheckLid',
    method: 'post'
  })
}

export function ChecarNonoDigito () {
  return request({
    url: '/contactsGroupDuplicate',
    method: 'post'
  })
}

export function MigrarContato(contactId) {
  return request({
    url: '/contactMigrate',
    method: 'post',
    data: {
      contactId
    }
  });
}

export function SanitizarContato(contactId) {
  return request({
    url: '/closeAllContactTickets',
    method: 'post',
    data: { contactId }
  });
}

export function CriarContato (data) {
  return request({
    url: '/contacts',
    method: 'post',
    data
  })
}

export function CriarContatoVcard (data) {
  return request({
    url: '/contactVcard',
    method: 'post',
    data
  })
}


export function ListarUrlFoto (data) {
  return request({
    url: '/contactsShowProfilePicture',
    method: 'post',
    data
  })
}

export function ImportarArquivoContato (data) {
  return request({
    url: '/contacts/upload',
    method: 'post',
    data,
    timeout: 120000
  })
}

export function ExportarArquivoContato (data) {
  return request({
    url: '/contacts/export',
    method: 'post',
    data,
    timeout: 120000
  })
}

export function SyncronizarContatos () {
  return request({
    url: '/contacts/sync',
    method: 'post'
  })
}

export function SyncronizarGrupos () {
  return request({
    url: '/groups/sync',
    method: 'post'
  })
}

// Função auxiliar para invalidar cache de um contato específico
function invalidateContactCache(contactId) {
  if (contactId) {
    contactDetailCache.delete(`contact_${contactId}`)
    // Limpar também da lista (forçar nova busca)
    contactsListCache.clear()
  }
}

export function EditarContato (contactId, data) {
  return request({
    url: `/contacts/${contactId}`,
    method: 'put',
    data
  }).then(response => {
    // Invalidar cache após edição
    invalidateContactCache(contactId)
    return response
  })
}

export function DeletarContato (contactId) {
  return request({
    url: `/contacts/${contactId}`,
    method: 'delete'
  }).then(response => {
    // Invalidar cache após deleção
    invalidateContactCache(contactId)
    return response
  })
}

export function DeletarContatoForcado (contactId) {
  return request({
    url: `/contactsforce/${contactId}`,
    method: 'delete'
  })
}

export function EditarEtiquetasContato (contactId, tags) {
  const data = {
    tags
  }
  return request({
    url: `/contact-tags/${contactId}`,
    method: 'put',
    data
  }).then(response => {
    // Invalidar cache após edição de tags
    invalidateContactCache(contactId)
    return response
  })
}

export function EditarCarteiraContato (contactId, wallets) {
  const data = {
    wallets
  }
  return request({
    url: `/contact-wallet/${contactId}`,
    method: 'put',
    data
  }).then(response => {
    // Invalidar cache após edição de carteira
    invalidateContactCache(contactId)
    return response
  })
}
