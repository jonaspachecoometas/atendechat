import request from 'src/service/request.js'
import requestMidia from 'src/service/requestMidia.js'

// Sistema de cache e debounce global para ConsultarTickets
// Reduz drasticamente requisições simultâneas ao backend
let ticketsCache = new Map()
let pendingRequests = new Map()
let debounceTimers = new Map()

// Configurações otimizadas para 40+ usuários
const CACHE_TTL = 2000 // 2 segundos de cache
const DEBOUNCE_AGGRESSIVE = 1500 // 1.5 segundos de debounce agressivo (sempre ativo para reduzir carga)

// Função auxiliar para gerar chave de cache baseada nos params
function getCacheKey(params) {
  // Normalizar arrays e ordenar para garantir cache consistente
  // Converter arrays para strings ordenadas para comparação correta
  const normalizeArray = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return ''
    return arr.slice().sort((a, b) => {
      // Ordenar números e strings corretamente
      if (typeof a === 'number' && typeof b === 'number') return a - b
      return String(a).localeCompare(String(b))
    }).join(',')
  }

  return JSON.stringify({
    pageNumber: params.pageNumber || 1,
    status: Array.isArray(params.status) 
      ? normalizeArray(params.status)
      : (params.status || ''),
    searchParam: (params.searchParam || '').trim(),
    queuesIds: normalizeArray(params.queuesIds),
    whatsappIds: normalizeArray(params.whatsappIds),
    selectedUser: normalizeArray(params.selectedUser),
    withUnreadMessages: params.withUnreadMessages === true,
    isNotAssignedUser: params.isNotAssignedUser === true,
    includeNotQueueDefined: params.includeNotQueueDefined !== undefined 
      ? params.includeNotQueueDefined === true
      : true,
    showAll: params.showAll === true,
    includeClosed: params.includeClosed === true
  })
}

// Função para limpar cache (útil para forçar refresh quando necessário)
export function limparCacheTickets() {
  ticketsCache.clear()
  pendingRequests.clear()
  debounceTimers.forEach(timer => clearTimeout(timer))
  debounceTimers.clear()
}

/**
 * Consulta tickets com cache e debounce otimizado (sempre usa debounce agressivo)
 * @param {Object} params - Parâmetros da consulta
 * @param {Object} options - Opções de otimização
 * @param {boolean} options.forceRefresh - Forçar refresh ignorando cache
 * @returns {Promise} Promise com os dados dos tickets
 */
export function ConsultarTickets(params, options = {}) {
  const { forceRefresh = false } = options
  const cacheKey = getCacheKey(params)
  const now = Date.now()
  // Sempre usar debounce agressivo para reduzir carga no backend
  const debounceDelay = DEBOUNCE_AGGRESSIVE

  // Verificar cache válido (se não for refresh forçado)
  if (!forceRefresh) {
    const cached = ticketsCache.get(cacheKey)
    if (cached && (now - cached.timestamp) < CACHE_TTL) {
      // Retornar cache imediatamente
      return Promise.resolve(cached.data)
    }
  }

  // Se já há uma requisição pendente para os mesmos params, retornar a mesma promise
  // Isso evita requisições duplicadas simultâneas
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey)
  }

  // Limpar timer de debounce anterior se existir para este cacheKey
  if (debounceTimers.has(cacheKey)) {
    clearTimeout(debounceTimers.get(cacheKey))
  }

  // Criar nova requisição com debounce
  const requestPromise = new Promise((resolve, reject) => {
    const timerId = setTimeout(async () => {
      try {
        // Fazer a requisição real
        const response = await request({
          url: '/tickets',
          method: 'get',
          params,
        })
        
        // Atualizar cache
        ticketsCache.set(cacheKey, {
          data: response,
          timestamp: Date.now()
        })
        
        // Limpar requisição pendente e timer
        pendingRequests.delete(cacheKey)
        debounceTimers.delete(cacheKey)
        
        resolve(response)
      } catch (error) {
        // Limpar requisição pendente mesmo em caso de erro
        pendingRequests.delete(cacheKey)
        debounceTimers.delete(cacheKey)
        reject(error)
      }
    }, debounceDelay)

    debounceTimers.set(cacheKey, timerId)
  })

  // Armazenar requisição pendente
  pendingRequests.set(cacheKey, requestPromise)
  
  return requestPromise
}

export function ConsultarDadosTicket(params) {
  return request({
    url: `/tickets/${params.id}`,
    method: 'get',
    params,
  })
}

export function ConsultarLogsTicket(params) {
  return request({
    url: `/tickets/${params.ticketId}/logs`,
    method: 'get',
    params,
  })
}

export function AtualizarStatusTicket(ticketId, status, userId) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      status,
      userId,
    },
  })
}

export function AtualizarStatusTicketForcado(ticketId, status, userId) {
  return request({
    url: `/ticketsForce/${ticketId}`,
    method: 'put',
    data: {
      status,
      userId,
    },
  })
}

export function AtualizarChatbotTicket(ticketId, data) {
  return request({
    url: `/ticketsChatBot/${ticketId}`,
    method: 'put',
    data
  })
}

export function AtualizarCanalTicket(ticketId, data) {
  return request({
    url: `/ticketsChannelId/${ticketId}`,
    method: 'put',
    data
  })
}

export function AtualizarStatusTicketNull(ticketId, status, userId) {
  return request({
    url: `/ticketsNull/${ticketId}`,
    method: 'put',
    data: {
      status,
      userId,
    },
  })
}

export function AtualizarDifyTicket(ticketId, difyStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      difyStatus
    },
  })
}

export function AtualizarLmTicket(ticketId, lmStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      lmStatus
    },
  })
}

export function AtualizarGeminiTicket(ticketId, geminiStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      geminiStatus
    },
  })
}

export function AtualizarDeepseekTicket(ticketId, deepseekStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      deepseekStatus
    },
  })
}

export function AtualizarQwenTicket(ticketId, qwenStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      qwenStatus
    },
  })
}

export function AtualizarClaudeTicket(ticketId, claudeStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      claudeStatus
    },
  })
}

export function AtualizarGrokTicket(ticketId, grokStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      grokStatus
    },
  })
}

export function AtualizarOllamaTicket(ticketId, ollamaStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      ollamaStatus
    },
  })
}

export function AtualizarN8NTicket(ticketId, n8nStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      n8nStatus
    },
  })
}

export function AtualizarTypebotTicket(ticketId, typebotStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      typebotStatus
    },
  })
}

export function AtualizarDialogflowTicket(ticketId, dialogflowStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      dialogflowStatus
    },
  })
}

export function AtualizarChatgptTicket(ticketId, chatgptStatus) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data: {
      chatgptStatus
    },
  })
}

export function AtualizarTicketNaoLido(ticketId, unreadMessages) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data:{
      unreadMessages
    }
  })
}

export function AtualizarTicket(ticketId, data) {
  return request({
    url: `/tickets/${ticketId}`,
    method: 'put',
    data,
  })
}

export function LocalizarMensagens(params) {
  return request({
    url: `/messages/${params.ticketId}`,
    method: 'get',
    params,
  })
}

export function ExportarMensagens(params) {
  return request({
    url: `/exportMessages/${params.ticketId}`,
    method: 'get',
    params,
  })
}

export function LocalizarMensagensPorContato(params) {
  return request({
    url: `/messagesContact/${params.contactId}`,
    method: 'get',
    params,
  })
}

export function BuscarMensagensPorBody(params) {
  return request({
    url: "/searchMessage",
    method: "get",
    params,
  });
}

// export function ListarAgendadas() {
//   return request({
//     url: `/scheduleMessages/`,
//     method: 'get',
//   })
// }

export function ListarAgendadas ({ page }) {
  return request({
    url: `/scheduleMessages/`,
    method: 'get',
    params: {
      page
    },
  })
}

export function EnviarMensagemTexto(ticketId, data) {
  return requestMidia({
    url: `/messages/${ticketId}`,
    method: 'post',
    data,
  })
}

export function EnviarMensagemAgendada(data) {
  return requestMidia({
    url: `/messagesSchedule/`,
    method: 'post',
    data,
  })
}

export function EditarMensagemText(messageId, message) {
  return request({
    url: `/messages/${messageId}`,
    method: 'PATCH',
    data: message,
  })
}

export function EncaminharMensagem(messages, contato) {
  const data = {
    messages,
    contact: contato,
  }
  return request({
    url: '/forward-messages/',
    method: 'post',
    data,
  })
}

export function EncaminharMensagemParaOutroCanal(messages, contato, channel, channelId) {
  const data = {
    messages,
    contact: contato,
    channel,
    channelId,
  }
  return request({
    url: '/forward-other-channel-messages/',
    method: 'post',
    data,
  })
}

export function DeletarMensagem(mensagem) {
  return request({
    url: `/messages`,
    method: 'delete',
    data: {
      id: mensagem.id,
      messageId: mensagem.messageId,
    },
  })
}

export function CriarTicket(data) {
  return request({
    url: '/tickets',
    method: 'post',
    data,
  })
}

export function SyncOldMessagesWbot(data) {
  return request({
    url: '/messages/syncOld',
    method: 'post',
    data,
  })
}

export function SendBirthdayMessage(data) {
  return request({
    url: '/messages/sendBirthday',
    method: 'post',
    data,
  })
}

export function SyncOldMessagesByUserWbot(data) {
  return request({
    url: '/messages/syncOldByUser',
    method: 'post',
    data,
  })
}

export function ResolvePending() {
  return request({
    url: '/pending/resolvePending',
    method: 'post'
  })
}

export function SendGhostMessage(data) {
  return request({
    url: '/messages/ghostMessage',
    method: 'post',
    data,
  })
}

export function SendMentionMessage(data) {
  return request({
    url: '/messages/mentionMessage',
    method: 'post',
    data,
  })
}

export function SendMentionAllMessage(data) {
  return request({
    url: '/messages/mentionAllMessage',
    method: 'post',
    data,
  })
}

export function SendReactionMessage(data) {
  return request({
    url: '/messages/reactionMessage',
    method: 'post',
    data,
  })
}

export function SendEditMessage(data) {
  return request({
    url: '/messages/editMessage',
    method: 'post',
    data,
  })
}

export function ListParticipants(data) {
  return request({
    url: '/messages/listParticipants',
    method: 'post',
    data,
  })
}

export function CountMensage (params) {
  return request({
    url: '/count/messages',
    method: 'get',
    params
  })
}

export function LimpartHistoricoGpt(params) {
  return request({
    url: '/ticketsClear',
    method: 'get',
    params,
  })
}

export function LerTodasAsMensagens(params) {
  return request({
    url: '/ticketsMarkAllUnread',
    method: 'get',
    params,
  })
}

export function NoRedis(data) {
  return requestMidia({
    url: '/noRedis',
    method: 'post',
    data,
  })
}

export function EnviarBotao(data) {
  return request({
    url: '/sendButton',
    method: 'post',
    data,
  })
}

export function MudarCanalTickets(data) {
  return request({
    url: `/ticketsChannel`,
    method: 'put',
    data,
  })
}

export function AtualizarMensagensSyncTime(tenantId) {
  return request({
    url: '/messagesUpdateSyncTime',
    method: 'post',
    data: {
      tenantId
    }
  })
}

export function AtualizarTodasMensagensNaoLidas() {
  return request({
    url: '/ticketsUpdateAllUnreadMessages',
    method: 'put'
  })
}

export function VerificarTicketsAbertos(contactId, whatsappId) {
  return request({
    url: `/ticketscheck/${contactId}/${whatsappId}`,
    method: 'get'
  })
}

export function EmitirNotificacaoTicket(ticketId, type) {
  return request({
    url: `/ticketsNotification/${ticketId}`,
    method: 'post',
    data: {
      type
    }
  })
}

export function AtualizarLastMessageAtTickets() {
  return request({
    url: '/ticketsLastMessageAt',
    method: 'put'
  })
}

export function IniciarPausaTicket(ticketId) {
  return request({
    url: `/ticketsPause/${ticketId}/pause`,
    method: 'post'
  })
}

export function FinalizarPausaTicket(ticketId) {
  return request({
    url: `/ticketsPause/${ticketId}/pause/end`,
    method: 'post'
  })
}

export function EnviarVcard(ticketId, contact) {
  return request({
    url: `/messages/${ticketId}/vcard`,
    method: 'post',
    data: {
      contact: contact.contact[0]
    }
  })
}

export function EnviarLocalizacao(ticketId, location) {
  return request({
    url: `/messages/${ticketId}/location`,
    method: 'post',
    data: {
      location
    }
  })
}

export function SendTypingIndicator(ticketId, payloadOrState = 'composing') {
  const data = (payloadOrState && typeof payloadOrState === 'object')
    ? { 
        state: payloadOrState.state ?? 'composing',
        ticket: payloadOrState.ticket
      }
    : { state: payloadOrState }
  return request({
    url: `/messages/${ticketId}/typing`,
    method: 'post',
    data
  })
}

export function SendRecordingIndicator(ticketId, payloadOrState = 'recording') {
  const data = (payloadOrState && typeof payloadOrState === 'object')
    ? { 
        state: payloadOrState.state ?? 'recording',
        ticket: payloadOrState.ticket
      }
    : { state: payloadOrState }
  return request({
    url: `/messages/${ticketId}/recording`,
    method: 'post',
    data
  })
}

export function SendPausedIndicator(ticketId, payloadOrState = 'paused') {
  const data = (payloadOrState && typeof payloadOrState === 'object')
    ? { 
        state: payloadOrState.state ?? 'paused',
        ticket: payloadOrState.ticket
      }
    : { state: payloadOrState }
  return request({
    url: `/messages/${ticketId}/paused`,
    method: 'post',
    data
  })
}
