import { ConsultarDadosTicket, LocalizarMensagens } from 'src/service/tickets.js'
import { Notify } from 'quasar'
import $router from 'src/router'
import { orderBy } from 'lodash'
import { parseISO } from 'date-fns'

const orderMessages = (messages) => {
  const newMessages = orderBy(messages, (obj) => {
    const dateValue = obj.timestamp || obj.createdAt
    if (!dateValue) return new Date(0) // Retorna data mínima se não houver valor
    try {
      const parsed = parseISO(dateValue)
      if (isNaN(parsed.getTime())) return new Date(0) // Retorna data mínima se inválida
      return parsed
    } catch (error) {
      console.error('Erro ao parsear data em orderMessages:', error, dateValue)
      return new Date(0) // Retorna data mínima em caso de erro
    }
  }, ['asc'])
  return [...newMessages]
}

const orderTickets = (tickets) => {
  const newTickes = orderBy(tickets, (obj) => parseISO(obj.lastMessageAt || obj.updatedAt), ['asc'])
  return [...newTickes]
}

// Função auxiliar para normalizar objeto queue (evitar [object Object])
const normalizeQueue = (queue) => {
  if (!queue) return null
  if (queue?.dataValues) {
    return queue.dataValues.queue || queue.dataValues
  }
  if (typeof queue === 'string') {
    return queue
  }
  if (queue?.queue) {
    return queue.queue
  }
  return queue
}

// Função auxiliar para remover chatGptHistory de tickets (evitar sobrecarga no frontend e erros de URL muito longa)
const removeChatGptHistory = (ticket) => {
  if (!ticket || typeof ticket !== 'object') return ticket
  const { chatGptHistory, ...ticketWithoutHistory } = ticket
  return ticketWithoutHistory
}

const checkTicketFilter = (ticket) => {
  const filtroPadrao = {
    searchParam: '',
    pageNumber: 1,
    status: ['open', 'pending'],
    showAll: false,
    count: null,
    queuesIds: [],
    whatsappIds: [],
    selectedUser: [],
    withUnreadMessages: false,
    isNotAssignedUser: false,
    includeNotQueueDefined: true
    // date: new Date(),
  }

  const NotViewTicketsChatBot = () => {
    const configuracoes = JSON.parse(localStorage.getItem('configuracoes'))
    const conf = configuracoes?.find(c => c.key === 'NotViewTicketsChatBot')
    return (conf?.value === 'enabled')
  }

  const DirectTicketsToWallets = () => {
    const configuracoes = JSON.parse(localStorage.getItem('configuracoes'))
    const conf = configuracoes?.find(c => c.key === 'DirectTicketsToWallets')
    return (conf?.value === 'enabled')
  }

  const isNotViewAssignedTickets = () => {
    const configuracoes = JSON.parse(localStorage.getItem('configuracoes'))
    const conf = configuracoes?.find(c => c.key === 'NotViewAssignedTickets')
    return (conf?.value === 'enabled')
  }

  const filtros = JSON.parse(localStorage.getItem('filtrosAtendimento')) || filtroPadrao
  const filasSelecionadas = filtros.queuesIds || []
  const usuariosSelecionados = filtros.selectedUser || []
  const conexoesSelecionadas = filtros.whatsappIds || []
  const usuario = JSON.parse(localStorage.getItem('usuario'))
  const UserQueues = JSON.parse(localStorage.getItem('queues'))
  const filasCadastradas = JSON.parse(localStorage.getItem('filasCadastradas') || '[]')
  const profile = localStorage.getItem('profile')
  const isAdminOrSuper = profile === 'admin' || profile === 'super'
  const isAdminShowAll = (profile === "admin" || profile === "super") && filtros.showAll
  const isQueuesTenantExists = (filasCadastradas?.length || 0) > 0
  const ticketsNulos = JSON.parse(localStorage.getItem('nullticket'))
  const supervisorAdmin = JSON.parse(localStorage.getItem('supervisorAdmin'))
  // const whatsappIdFiltro = JSON.parse(localStorage.getItem('whatsappIdFiltro'))
  // const userIdFiltro = JSON.parse(localStorage.getItem('userFiltro'))
  const tagIdFiltro = JSON.parse(localStorage.getItem('tagFiltro'))
  const kanbanIdFiltro = JSON.parse(localStorage.getItem('kanbanFiltro'))
  const userId = usuario?.userId || +localStorage.getItem('userId')
  const mostrarGruposParaTodos = JSON.parse(localStorage.getItem('mostrarGruposParaTodos'))
  const mostrarFechadoParaTodos = JSON.parse(localStorage.getItem('mostrarFechadoParaTodos'))
  
  // Verificar se é admin/supervisor com filtro de fila ativo
  // Admin sempre vê todos os tickets das filas quando filtra por fila
  const isAdminWithQueueFilter = (profile === 'admin' || (supervisorAdmin === 'disabled' && profile === 'super')) && filasSelecionadas.length > 0
  
  // // Verificar se é admin e se está solicitando para mostrar todos
  if (isAdminShowAll) {
    // console.log('isAdminShowAll', isAdminShowAll)
    return true
  }
  if(mostrarFechadoParaTodos === 'enabled' && ticket.status === 'closed'){
    if (isQueuesTenantExists && (profile === 'user' || (supervisorAdmin === 'enabled' && profile === 'super'))) {
      // Garantir comparação correta convertendo para número
      const ticketQueueId = ticket.queueId ? Number(ticket.queueId) : null
      // Se ticket TEM fila, verificar acesso. Se não tem fila, permitir se ticketsNulos estiver habilitado
      if (ticketQueueId !== null) {
        const isQueueUser = UserQueues.findIndex(q => ticketQueueId === Number(q.id))
        if (isQueueUser !== -1) {
          // console.log('Fila do ticket liberada para o Usuario', ticket.queueId)
          return true
        } else {
          // console.log('Usuario não tem acesso a fila', ticket.queueId)
          return false
        }
      } else {
        // Ticket sem fila - permitir se ticketsNulos estiver habilitado
        return ticketsNulos === 'enabled'
      }
    } else {
      return true
    }
  }
  
  // // se status do ticket diferente do status filtrado, retornar false
  if (filtros.status.length > 0 && !filtros.status.includes(ticket.status)) {
    // console.log('Status ticket', filtros.status, ticket.status)
    return false
  }

  if(ticket.isGroup){
    // Se for admin ou supervisorAdmin, mostrar atendimento se fila ou usuário for null
    if ((profile === 'admin' || (supervisorAdmin === 'disabled' && profile === 'super')) && (!ticket.queueId || !ticket.userId)) {
      return true
    }
    
    if(mostrarGruposParaTodos === 'enabled'){
      return true
    }
    if(ticket.groupUserIdArray && ticket.groupUserIdArray.length > 0){
      if(ticket.groupUserIdArray.includes(userId)){
        return true
      }
    }
    // Verificar também no contact.groupUserIdArray
    if(ticket.contact && ticket.contact.groupUserIdArray && ticket.contact.groupUserIdArray.length > 0){
      if(ticket.contact.groupUserIdArray.includes(userId)){
        return true
      }
    }
    else {
      // if (userIdFiltro && ticket.userId !== userIdFiltro) {
      //   // console.log('Userid ticket', userIdFiltro, ticket.userId)
      //   return false
      // }
    
      // if (whatsappIdFiltro && ticket.whatsappId !== whatsappIdFiltro) {
      //   // console.log('Whatsappid ticket', whatsappIdFiltro, ticket.whatsappId)
      //   return false
      // }

      if ((conexoesSelecionadas?.length || 0) > 0){  
        if (conexoesSelecionadas.includes(ticket.whatsappId)) return true
        return false 
      }

      if ((usuariosSelecionados?.length || 0) > 0){  
        if (usuariosSelecionados.includes(ticket.userId)) return true
        return false 
        // validFilter = true
      }
    
      if (kanbanIdFiltro && ticket.kanban !== kanbanIdFiltro){
        // console.log('kanbanIdFiltro', kanbanIdFiltro, ticket.kanban)
        return false
      }
    
      if (tagIdFiltro){
        // console.log('Tags ticket', tagIdFiltro, ticket.tags)
        // const isTagIncluded = ticket.tags.some(tag => tag.id === tagIdFiltro);
        const isTagIncluded = Array.isArray(ticket.tags) && ticket.tags.some(tag => tag.id === tagIdFiltro);
        if (isTagIncluded) {
            return true
        } else {
            return false
        }
      }
    
      // // verificar se já é um ticket do usuário
      // if (ticket?.userId == userId) {
      //   if (filasSelecionadas.length > 0){  
      //     if (filasSelecionadas.includes(ticket.queueId)) return true
      //     return false 
      //     // validFilter = true
      //   }
      //   // console.log('Ticket do usuário', ticket?.userId, userId)
      //   return true
      // }

      // if (ticket?.userId == userId) {
      //   if (conexoesSelecionadas.length > 0){  
      //     if (conexoesSelecionadas.includes(ticket.whatsappId)) return true
      //     return false 
      //     // validFilter = true
      //   }
      //   // console.log('Ticket do usuário', ticket?.userId, userId)
      //   return true
      // }
    
      if (ticket?.userId == userId) {
        if (usuariosSelecionados?.length > 0){  
          if (usuariosSelecionados.includes(ticket.userId)) return true
          return false 
          // validFilter = true
        }
        // console.log('Ticket do usuário', ticket?.userId, userId)
        return true
      }
  
      // verificar se o parametro para não permitir visualizar
      // tickets atribuidos à outros usuários está ativo
      // IMPORTANTE: Não aplicar se for admin/supervisor com filtro de fila ativo
      if (isNotViewAssignedTickets() && (ticket?.userId || userId) !== userId && (
        // !userIdFiltro && 
        // !whatsappIdFiltro && 
        !kanbanIdFiltro && !tagIdFiltro && !isQueuesTenantExists) && (profile === 'admin' || (supervisorAdmin === 'disabled' && profile === 'super')) && !isAdminWithQueueFilter) {
        // console.log('isNotViewAssignedTickets e ticket não é do usuário', ticket?.userId, userId)
        // se usuário não estiver atribuido, permitir visualizar
        if (!ticket?.userId) {
          return true
        }
        return false
      }
    
      // if (isNotViewAssignedTickets() && (ticket?.userId || userId) !== userId && profile === 'user') {
      //   // console.log('isNotViewAssignedTickets e ticket não é do usuário', ticket?.userId, userId)
      //   // se usuário não estiver atribuido, permitir visualizar
      //   if (!ticket?.userId) {
      //     return true
      //   }
      //   return false
      // }
    
      // Não visualizar tickets ainda com o Chatbot desde que ainda não exista usuário ou fila definida
      if (NotViewTicketsChatBot()) {
        if (!ticket?.userId && !ticket.queueId && ticket.chatFlowId) {
          // console.log('NotViewTicketsChatBot e o ticket está sem usuário e fila definida')
          return false
        }
      }

      if (ticket.status === 'pending' && isAdminOrSuper && !filtros.showAll && isQueuesTenantExists && ticketsNulos !== 'enabled') {
        const belongsToQueue = Array.isArray(UserQueues) && UserQueues.some(q => q.id === ticket.queueId)
        if (!belongsToQueue) return false
      }
    
      let isValid = true
    
      // // verificar se o usuário possui fila liberada
      // Se o ticket TEM fila definida, SEMPRE verificar acesso (independente de ticketsNulos)
      // ticketsNulos só afeta tickets SEM fila definida
      if (isQueuesTenantExists && (profile === 'user' || (supervisorAdmin === 'enabled' && profile === 'super'))) {
        const ticketQueueId = ticket.queueId ? Number(ticket.queueId) : null
        
        // Se ticket TEM fila definida, verificar acesso
        if (ticketQueueId !== null) {
          const isQueueUser = UserQueues.findIndex(q => ticketQueueId === Number(q.id))
          if (isQueueUser !== -1) {
            // console.log('Fila do ticket liberada para o Usuario', ticket.queueId)
            isValid = true
          } else {
            // console.log('Usuario não tem acesso a fila', ticket.queueId)
            return false
          }
        } else {
          // Se ticket NÃO tem fila e ticketsNulos está desabilitado, não permitir visualizar
          if (ticketsNulos !== 'enabled') {
            return false
          }
        }
      }
    
      // // verificar se a fila do ticket está filtrada
      if (isQueuesTenantExists && filtros.queuesIds.length > 0) {
        // Garantir comparação correta convertendo para número
        const ticketQueueId = ticket.queueId ? Number(ticket.queueId) : null
        const isQueue = filtros.queuesIds.findIndex(q => ticketQueueId === Number(q))
        if (isQueue == -1) {
          // console.log('filas filtradas e diferentes da do ticket', ticket.queueId)
          return false
        }
      }
    
      // // se configuração para carteira ativa: verificar se já é um ticket da carteira do usuário
      if (DirectTicketsToWallets() && (ticket?.contact?.wallets?.length || 0) > 0) {
        const idx = ticket?.contact?.wallets.findIndex(w => w.id == userId)
        if (idx !== -1) {
          // console.log('Ticket da carteira do usuário')
          return true
        }
        // console.log('DirectTicketsToWallets: Ticket não pertence à carteira do usuário', ticket)
        return false
      }
  
      // NotViewAssignedTickets: não aplicar se for admin/supervisor com filtro de fila ativo
      // Admin sempre vê todos os tickets das filas quando filtra por fila
      if (isNotViewAssignedTickets() && (ticket?.userId || userId) !== userId && !isAdminWithQueueFilter) {
        // console.log('isNotViewAssignedTickets e ticket não é do usuário', ticket?.userId, userId)
        // se usuário não estiver atribuido, permitir visualizar
        if (!ticket?.userId) {
          return true
        }
        return false
      }
    
      // verificar se filtro somente tickets não assinados (isNotAssingned) ativo
      if (filtros.isNotAssignedUser) {
        // console.log('isNotAssignedUser ativo para exibir somente tickets não assinados', filtros.isNotAssignedUser, !ticket.userId)
        return filtros.isNotAssignedUser && !ticket.userId
      }
    
      return isValid
    }
  }

  // if (userIdFiltro && ticket.userId !== userIdFiltro) {
  //   // console.log('Userid ticket', userIdFiltro, ticket.userId)
  //   return false
  // }

  // if (whatsappIdFiltro && ticket.whatsappId !== whatsappIdFiltro) {
  //   // console.log('Whatsappid ticket', whatsappIdFiltro, ticket.whatsappId)
  //   return false
  // }

  if ((conexoesSelecionadas?.length || 0) > 0){  
    if (conexoesSelecionadas.includes(ticket.whatsappId)) return true
    return false 
  }

  if ((usuariosSelecionados?.length || 0) > 0){  
    if (usuariosSelecionados.includes(ticket.userId)) return true
    return false 
    // validFilter = true
  }

  if (kanbanIdFiltro && ticket.kanban !== kanbanIdFiltro){
    // console.log('kanbanIdFiltro', kanbanIdFiltro, ticket.kanban)
    return false
  }

  if (tagIdFiltro){
    // console.log('Tags ticket', tagIdFiltro, ticket.tags)
    // const isTagIncluded = ticket.tags.some(tag => tag.id === tagIdFiltro);
    const isTagIncluded = Array.isArray(ticket.tags) && ticket.tags.some(tag => tag.id === tagIdFiltro);
    if (isTagIncluded) {
        return true
    } else {
        return false
    }
  }

  // // // se status do ticket diferente do staatus filtrado, retornar false
  // if (filtros.status.length > 0 && !filtros.status.includes(ticket.status)) {
  //   // console.log('Status ticket', filtros.status, ticket.status)
  //   return false
  // }

  // // verificar se já é um ticket do usuário
  if (ticket?.userId == userId) {
    if (filasSelecionadas?.length > 0){  
      if (filasSelecionadas.includes(ticket.queueId)) return true
      return false 
      // validFilter = true
    }
    // console.log('Ticket do usuário', ticket?.userId, userId)
    return true
  }

  // if (ticket?.userId == userId) {
  //   if (conexoesSelecionadas.length > 0){  
  //     if (conexoesSelecionadas.includes(ticket.whatsappId)) return true
  //     return false 
  //     // validFilter = true
  //   }
  //   // console.log('Ticket do usuário', ticket?.userId, userId)
  //   return true
  // }

  // if (ticket?.userId == userId) {
  //   if (usuariosSelecionados.length > 0){  
  //     if (usuariosSelecionados.includes(ticket.userId)) return true
  //     return false 
  //     // validFilter = true
  //   }
  //   // console.log('Ticket do usuário', ticket?.userId, userId)
  //   return true
  // }

  // // verificar se já é um ticket do usuário
  // if (profile === 'admin' || profile === 'super') {
  //   if (filasSelecionadas.length > 0){  
  //     if (filasSelecionadas.includes(ticket.queueId)) return true
  //     return false 
  //     // validFilter = true
  //   }
  //   // console.log('Ticket do usuário', ticket?.userId, userId)
  //   return true
  // }

  if (NotViewTicketsChatBot()) {
    if (!ticket?.userId && !ticket.queueId && ticket.chatFlowId) {
      // console.log('NotViewTicketsChatBot e o ticket está sem usuário e fila definida')
      return false
    }
  }

  let isValid = true
  
  // verificar se o parametro para não permitir visualizar
  // tickets atribuidos à outros usuários está ativo
  // IMPORTANTE: Não aplicar se for admin/supervisor com filtro de fila ativo
  if (isNotViewAssignedTickets() && (ticket?.userId || userId) !== userId && (
    // !userIdFiltro && 
    // !whatsappIdFiltro && 
    !kanbanIdFiltro && !tagIdFiltro && !isQueuesTenantExists) && (profile === 'admin'  || (supervisorAdmin === 'disabled' && profile === 'super')) && !isAdminWithQueueFilter) {
    // console.log('isNotViewAssignedTickets e ticket não é do usuário', ticket?.userId, userId)
    // se usuário não estiver atribuido, permitir visualizar
    if (!ticket?.userId) {
      return true
    }
    return false
  }

  // if (isNotViewAssignedTickets() && (ticket?.userId || userId) !== userId && profile === 'user') {
  //   // console.log('isNotViewAssignedTickets e ticket não é do usuário', ticket?.userId, userId)
  //   // se usuário não estiver atribuido, permitir visualizar
  //   if (!ticket?.userId) {
  //     isValid = true
  //   }
  //   return false
  // }

  // // Se o ticket não possuir fila definida, checar o filtro
  // // permite visualizar tickets sem filas definidas é falso.
  // // if (isQueuesTenantExists && !ticket.queueId && !filtros.includeNotQueueDefined) {
  // //   console.log('filtros.includeNotQueueDefined', ticket.queueId, !filtros.includeNotQueueDefined)
  // //   return false
  // // }

  // // verificar se o usuário possui fila liberada
  // Se o ticket TEM fila definida, SEMPRE verificar acesso (independente de ticketsNulos)
  // ticketsNulos só afeta tickets SEM fila definida
  if (isQueuesTenantExists && (profile === 'user' || (supervisorAdmin === 'enabled' && profile === 'super'))) {
    const ticketQueueId = ticket.queueId ? Number(ticket.queueId) : null
    
    // Se ticket TEM fila definida, verificar acesso
    if (ticketQueueId !== null) {
      const isQueueUser = UserQueues.findIndex(q => ticketQueueId === Number(q.id))
      if (isQueueUser !== -1) {
        // console.log('Fila do ticket liberada para o Usuario', ticket.queueId)
        isValid = true
      } else {
        // console.log('Usuario não tem acesso a fila', ticket.queueId)
        return false
      }
    } else {
      // Se ticket NÃO tem fila e ticketsNulos está desabilitado, não permitir visualizar
      if (ticketsNulos !== 'enabled') {
        return false
      }
    }
  }

  // // verificar se a fila do ticket está filtrada
  if (isQueuesTenantExists && filtros.queuesIds.length > 0) {
    // Garantir comparação correta convertendo para número
    const ticketQueueId = ticket.queueId ? Number(ticket.queueId) : null
    const isQueue = filtros.queuesIds.findIndex(q => ticketQueueId === Number(q))
    if (isQueue == -1) {
      // console.log('filas filtradas e diferentes da do ticket', ticket.queueId)
      return false
    }
  }

  // // se configuração para carteira ativa: verificar se já é um ticket da carteira do usuário
  if (DirectTicketsToWallets() && (ticket?.contact?.wallets?.length || 0) > 0) {
    const idx = ticket?.contact?.wallets.findIndex(w => w.id == userId)
    if (idx !== -1) {
      // console.log('Ticket da carteira do usuário')
      return true
    }
    // console.log('DirectTicketsToWallets: Ticket não pertence à carteira do usuário', ticket)
    return false
  }

  // // verificar se o parametro para não permitir visualizar
  // // tickets atribuidos à outros usuários está ativo
  // NotViewAssignedTickets: não aplicar se for admin/supervisor com filtro de fila ativo
  // Admin sempre vê todos os tickets das filas quando filtra por fila
  if (isNotViewAssignedTickets() && (ticket?.userId || userId) !== userId && !isAdminWithQueueFilter) {
    // console.log('isNotViewAssignedTickets e ticket não é do usuário', ticket?.userId, userId)
    // se usuário não estiver atribuido, permitir visualizar
    if (!ticket?.userId) {
      return true
    }
    return false
  }

  // // verificar se filtro somente tickets não assinados (isNotAssingned) ativo
  if (filtros.isNotAssignedUser) {
    // console.log('isNotAssignedUser ativo para exibir somente tickets não assinados', filtros.isNotAssignedUser, !ticket.userId)
    return filtros.isNotAssignedUser && !ticket.userId
  }

  return isValid
}

const atendimentoTicket = {
  state: {
    chatTicketDisponivel: false,
    tickets: [],
    ticketsLocalizadosBusca: [],
    ticketFocado: {
      contacts: {
        tags: [],
        wallets: [],
        extraInfo: []
      }
    },
    hasMore: false,
    contatos: [],
    mensagens: []
  },
  mutations: {
    // OK
    SET_HAS_MORE (state, payload) {
      state.hasMore = payload
    },
    // OK
    LOAD_TICKETS (state, payload) {
      const newTickets = orderTickets(payload)
      newTickets.forEach(ticket => {
        // Remover chatGptHistory para evitar sobrecarga no frontend
        const ticketClean = removeChatGptHistory(ticket)
        
        // Normalizar queue para evitar [object Object]
        if (ticketClean.queue) {
          ticketClean.queue = normalizeQueue(ticketClean.queue)
        }
        
        const ticketIndex = state.tickets.findIndex(t => t.id === ticketClean.id)
        if (ticketIndex !== -1) {
          state.tickets[ticketIndex] = ticketClean
          if (ticketClean.unreadMessages > 0) {
            state.tickets.unshift(state.tickets.splice(ticketIndex, 1)[0])
          }
        } else {
          if (checkTicketFilter(ticketClean)) {
            // Permite carregar tickets mesmo se name for vazio/undefined/null
            // O número do contato será exibido no lugar do nome
            state.tickets.push(ticketClean)
          }
        }
      })
    },
    // OK
    RESET_TICKETS (state) {
      state.hasMore = true
      state.tickets = []
    },
    RESET_UNREAD (state, payload) {
      const tickets = [...state.tickets]
      const ticketId = payload.ticketId
      const ticketIndex = tickets.findIndex(t => t.id === ticketId)
      if (ticketIndex !== -1) {
        tickets[ticketIndex] = payload
        tickets[ticketIndex].unreadMessages = 0
      }
      state.ticket = tickets
    },
    // OK
    UPDATE_TICKET (state, payload) {
      // Normalizar payload caso venha como objeto Sequelize
      const ticketDataRaw = payload?.dataValues || payload
      // Remover chatGptHistory para evitar sobrecarga no frontend
      const ticketData = removeChatGptHistory(ticketDataRaw)
      const ticketId = ticketData?.id || payload?.id
      
      if (!ticketId) return
      
      const ticketIndex = state.tickets.findIndex(t => t.id === ticketId)
      
      if (ticketIndex !== -1) {
        // atualizar ticket se encontrado
        const tickets = [...state.tickets]
        
        // Normalizar objeto queue se vier como objeto Sequelize
        const normalizedQueue = normalizeQueue(ticketData?.queue)
        
        // Criar objeto atualizado com todos os dados do payload (normalizado)
        const updatedTicket = {
          ...tickets[ticketIndex],
          ...ticketData,
          // Garantir que queueId seja atualizado corretamente
          queueId: ticketData.queueId !== undefined ? ticketData.queueId : tickets[ticketIndex].queueId,
          // Normalizar queue para evitar [object Object]
          queue: normalizedQueue !== null ? normalizedQueue : normalizeQueue(tickets[ticketIndex].queue),
          // ajustar informações por conta das mudanças no front
          username: ticketData?.user?.name || ticketData?.username || tickets[ticketIndex].username,
          profilePicUrl: ticketData?.contact?.profilePicUrl || ticketData?.profilePicUrl || tickets[ticketIndex].profilePicUrl,
          name: ticketData?.contact?.name || ticketData?.name || tickets[ticketIndex].name,
          // Garantir que objetos relacionados sejam atualizados (mas normalizar queue)
          contact: ticketData?.contact || tickets[ticketIndex].contact,
          user: ticketData?.user || tickets[ticketIndex].user
        }
        
        tickets[ticketIndex] = updatedTicket
        
        // Filtrar TODOS os tickets após atualização para garantir que tickets que não passam no filtro sejam removidos
        state.tickets = tickets.filter(t => checkTicketFilter(t))

        // atualizar se ticket focado
        if (state.ticketFocado.id == ticketId) {
          state.ticketFocado = {
            ...state.ticketFocado,
            ...ticketData
            // conservar as informações do contato
            // contact: state.ticketFocado.contact
          }
        }
      } else {
        // Normalizar objeto queue se vier como objeto Sequelize
        const normalizedQueue = normalizeQueue(ticketData?.queue)
        
        const tickets = [...state.tickets]
        tickets.unshift({
          ...ticketData,
          // Normalizar queue para evitar [object Object]
          queue: normalizedQueue,
          // ajustar informações por conta das mudanças no front
          username: ticketData?.user?.name || ticketData?.username,
          profilePicUrl: ticketData?.contact?.profilePicUrl || ticketData?.profilePicUrl,
          name: ticketData?.contact?.name || ticketData?.name
        })
        state.tickets = tickets.filter(t => checkTicketFilter(t))
      }
    },

    DELETE_TICKET (state, payload) {
      const ticketId = payload
      const ticketIndex = state.tickets.findIndex(t => t.id === ticketId)
      if (ticketIndex !== -1) {
        state.tickets.splice(ticketIndex, 1)
      }
      // return state.tickets
    },

    // UPDATE_TICKET_MESSAGES_COUNT (state, payload) {

    //   const { ticket, searchParam } = payload
    //   const ticketIndex = state.tickets.findIndex(t => t.id === ticket.id)
    //   if (ticketIndex !== -1) {
    //     state.tickets[ticketIndex] = ticket
    //     state.tickets.unshift(state.tickets.splice(ticketIndex, 1)[0])
    //   } else if (!searchParam) {
    //     state.tickets.unshift(ticket)
    //   }
    //   // return state.tickets
    // },

    UPDATE_TICKET_FOCADO_CONTACT (state, payload) {
      state.ticketFocado.contact = payload
    },
    UPDATE_CONTACT (state, payload) {
      if (state.ticketFocado.contactId == payload.id) {
        state.ticketFocado.contact = payload
      }
      const ticketIndex = state.tickets.findIndex(t => t.contactId === payload.id)
      if (ticketIndex !== -1) {
        const tickets = [...state.tickets]
        tickets[ticketIndex].contact = payload
        tickets[ticketIndex].name = payload.name
        tickets[ticketIndex].profilePicUrl = payload.profilePicUrl
        state.tickets = tickets
      }
    },
    // OK
    TICKET_FOCADO (state, payload) {
      // Remover chatGptHistory para evitar sobrecarga no frontend e erros de URL muito longa
      const ticketClean = removeChatGptHistory(payload)
      const params = {
        ...ticketClean,
        status: ticketClean.status == 'pending' ? 'open' : ticketClean?.status
      }
      state.ticketFocado = params
      // return state.ticketFocado
    },
    // OK
    LOAD_INITIAL_MESSAGES (state, payload) {
      const { messages, messagesOffLine } = payload
      state.mensagens = []
      const newMessages = orderMessages([...messages, ...messagesOffLine])
      state.mensagens = newMessages
    },
    // OK
    LOAD_MORE_MESSAGES (state, payload) {
      const { messages, messagesOffLine } = payload
      const arrayMessages = [...messages, ...messagesOffLine]
      const newMessages = []
      arrayMessages.forEach((message, index) => {
        const messageIndex = state.mensagens.findIndex(m => m.id === message.id)
        if (messageIndex !== -1) {
          state.mensagens[messageIndex] = message
          arrayMessages.splice(index, 1)
        } else {
          newMessages.push(message)
        }
      })
      const messagesOrdered = orderMessages(newMessages)
      state.mensagens = [...messagesOrdered, ...state.mensagens]
    },
    // OK
    UPDATE_MESSAGES (state, payload) {
      // Se ticket não for o focado, não atualizar.
      if(!payload.ticket) return
      if (state.ticketFocado.id === payload.ticket.id) {
        const messageIndex = state.mensagens.findIndex(m => m.id === payload.id)
        const mensagens = [...state.mensagens]
        if (messageIndex !== -1) {
          // Fazer merge ao invés de substituir completamente para preservar campos importantes
          // Isso evita perda de dados e erros de "Invalid time value"
          mensagens[messageIndex] = {
            ...mensagens[messageIndex],
            ...payload,
            // Garantir que createdAt seja preservado se não estiver no payload ou for inválido
            createdAt: payload.createdAt && !isNaN(new Date(payload.createdAt).getTime()) 
              ? payload.createdAt 
              : mensagens[messageIndex].createdAt
          }
        } else {
          mensagens.push(payload)
        }
        state.mensagens = mensagens
        if (payload.scheduleDate && payload.status == 'pending') {
          const idxScheduledMessages = state.ticketFocado.scheduledMessages.findIndex(m => m.id === payload.id)
          if (idxScheduledMessages === -1) {
            state.ticketFocado.scheduledMessages.push(payload)
          }
        }
      }

      const TicketIndexUpdate = state.tickets.findIndex(t => t.id == payload.ticket.id)
      if (TicketIndexUpdate !== -1) {
        const tickets = [...state.tickets]
        const unreadMessages = state.ticketFocado.id == payload.ticket.id ? 0 : payload.ticket.unreadMessages
        tickets[TicketIndexUpdate] = {
          ...state.tickets[TicketIndexUpdate],
          answered: payload.ticket.answered,
          unreadMessages,
          lastMessage: payload.mediaName || payload.body
        }
        state.tickets = tickets
      }
    },
    // OK
    UPDATE_MESSAGE_STATUS (state, payload) {
      // Se ticket não for o focado, não atualizar.
      if(state.ticketFocado.channel !== 'waba'){
        if (state?.ticketFocado?.id != payload?.ticket?.id) {
          return
        }
      }
      const messageIndex = state.mensagens.findIndex(m => m.id === payload.id)
      const mensagens = [...state.mensagens]
      if (messageIndex !== -1) {
        // Fazer merge ao invés de substituir completamente para preservar campos importantes como createdAt
        // Isso evita erros de "Invalid time value" quando o payload não contém todos os campos
        mensagens[messageIndex] = {
          ...mensagens[messageIndex],
          ...payload,
          // Garantir que createdAt seja preservado se não estiver no payload ou for inválido
          createdAt: payload.createdAt && !isNaN(new Date(payload.createdAt).getTime()) 
            ? payload.createdAt 
            : mensagens[messageIndex].createdAt
        }
        state.mensagens = mensagens
      }

      // Se existir mensagens agendadas no ticket focado,
      // tratar a atualização das mensagens deletadas.
      if (state.ticketFocado?.scheduledMessages) {
        const scheduledMessages = [...state.ticketFocado.scheduledMessages]
        const scheduled = scheduledMessages.filter(m => m.id != payload.id)
        state.ticketFocado.scheduledMessages = scheduled
      }
    },
    // OK
    RESET_MESSAGE (state) {
      state.mensagens = []
      // return state.mensagens
    }
  },
  actions: {
    async LocalizarMensagensTicket ({ commit, dispatch }, params) {
      const mensagens = await LocalizarMensagens(params)
      // commit('TICKET_FOCADO', mensagens.data.ticket)
      commit('SET_HAS_MORE', mensagens.data.hasMore)
      // commit('UPDATE_TICKET_CONTACT', mensagens.data.ticket.contact)
      if (params.pageNumber === 1) {
        commit('LOAD_INITIAL_MESSAGES', mensagens.data)
      } else {
        commit('LOAD_MORE_MESSAGES', mensagens.data)
      }
    },
    async AbrirChatMensagens ({ commit, dispatch }, data) {
      try {
        await commit('TICKET_FOCADO', {})
        await commit('RESET_MESSAGE')
        const ticket = await ConsultarDadosTicket(data)
        // Remover chatGptHistory antes de armazenar (já será removido na mutation, mas garantimos aqui também)
        const ticketClean = removeChatGptHistory(ticket.data)
        await commit('TICKET_FOCADO', ticketClean)
        // commit('SET_HAS_MORE', true)
        const params = {
          ticketId: data.id,
          pageNumber: 1
        }
        await dispatch('LocalizarMensagensTicket', params)

        await $router.push({
          name: 'chat',
          params: { ticketId: data.id },
          query: { pageNumber: 1, t: new Date().getTime() }
        })
      } catch (error) {
        // posteriormente é necessário investigar o motivo de está caindo em erro
        if (!error) return
        const errorMsg = error?.response?.data?.error
        if (errorMsg) {
          Notify.create({
            type: 'warning',
            message: error.response.data.error,
            progress: true,
            position: 'top'
          })
        } else {
          console.log('error', JSON.stringify(error))
          Notify.create({
            type: 'warning',
            // message: `Error! ${JSON.stringify(error)}`,
            message: `Atualize a página e tente novamente!`,
            progress: true,
            position: 'top'
          })
        }
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
    }
  }
}

export default atendimentoTicket
