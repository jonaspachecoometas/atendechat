const usuario = JSON.parse(localStorage.getItem('usuario'))
import Router from 'src/router/index.js'
import { socketIO } from '../utils/socket.js'
import { ConsultarTickets } from 'src/service/tickets.js'
import { ListarUsuarios as ListarUsuariosAll, ListarUsuariosChatPrivado } from 'src/service/user.js'
import { orderBy } from 'lodash'
import { parseISO } from 'date-fns'
import bus from 'src/utils/eventBus'

const socket = socketIO()

const userId = +localStorage.getItem('userId')

socket.on(`tokenInvalid:${socket.id}`, () => {
  socket.disconnect()
  localStorage.removeItem('dashboardChartPanels');
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('profile')
  localStorage.removeItem('userId')
  localStorage.removeItem('usuario')
  // Este setTimeout não pode ser gerenciado pelo sistema pois está fora do contexto do componente
  setTimeout(() => {
    Router.push({
      name: 'login'
    })
  }, 1000)
})

export default {
  data() {
    return {
      // Sistema de gerenciamento de memória
      timers: [],
      // Sistema de debounce e cache para ConsultarTickets
      ticketsQueryDebounce: null,
      ticketsQueryCache: null,
      ticketsQueryCacheTime: null,
      ticketsQueryPending: null,
    }
  },
  methods: {
    // Sistema de gerenciamento de memória
    addTimer(timerId) {
      this.timers.push(timerId);
    },
    clearAllTimers() {
      this.timers.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      this.timers = [];
    },
    cleanupMemory() {
      this.clearAllTimers();
      // Limpar debounce e cache
      if (this.ticketsQueryDebounce) {
        clearTimeout(this.ticketsQueryDebounce);
        this.ticketsQueryDebounce = null;
      }
      this.ticketsQueryCache = null;
      this.ticketsQueryCacheTime = null;
      this.ticketsQueryPending = null;
    },
    // Sistema otimizado de consulta de tickets com debounce e cache
    async consultarTicketsOtimizado(params, options = {}) {
      const {
        debounceDelay = 1500, // 1.5 segundos de debounce
        cacheTTL = 2000, // Cache válido por 2 segundos
        forceRefresh = false // Forçar refresh ignorando cache
      } = options;

      const cacheKey = JSON.stringify(params);
      const now = Date.now();

      // Verificar cache se não for refresh forçado
      if (!forceRefresh && this.ticketsQueryCache && 
          this.ticketsQueryCacheTime && 
          (now - this.ticketsQueryCacheTime) < cacheTTL &&
          JSON.stringify(this.ticketsQueryCache.params) === cacheKey) {
        return this.ticketsQueryCache.data;
      }

      // Se já há uma requisição pendente com os mesmos parâmetros, retornar a mesma promise
      if (this.ticketsQueryPending && 
          JSON.stringify(this.ticketsQueryPending.params) === cacheKey) {
        return this.ticketsQueryPending.promise;
      }

      // Limpar debounce anterior
      if (this.ticketsQueryDebounce) {
        clearTimeout(this.ticketsQueryDebounce);
        this.ticketsQueryDebounce = null;
      }

      // Criar nova promise com debounce
      const promise = new Promise((resolve, reject) => {
        this.ticketsQueryDebounce = setTimeout(async () => {
          try {
            const response = await ConsultarTickets(params);
            
            // Atualizar cache - manter estrutura original da resposta
            this.ticketsQueryCache = {
              params: JSON.parse(cacheKey),
              data: response
            };
            this.ticketsQueryCacheTime = Date.now();
            
            // Limpar requisição pendente
            this.ticketsQueryPending = null;
            this.ticketsQueryDebounce = null;
            
            // Retornar response mantendo estrutura original
            resolve(response);
          } catch (error) {
            // Limpar requisição pendente mesmo em caso de erro
            this.ticketsQueryPending = null;
            this.ticketsQueryDebounce = null;
            reject(error);
          }
        }, debounceDelay);
      });

      // Armazenar requisição pendente
      this.ticketsQueryPending = {
        params: JSON.parse(cacheKey),
        promise
      };

      return promise;
    },
    socketInitial () {
      socket.emit(`${usuario.tenantId}:joinNotification`)
      
      // Ler ticketsRain do localStorage uma vez para reutilizar
      const getTicketsRainEnabled = () => {
        const ticketsRain = localStorage.getItem('ticketsRain');
        return ticketsRain ? JSON.parse(ticketsRain) === 'enabled' : false;
      };

      socket.on(`${usuario.tenantId}:forceLogout`, (data) => {
        const currentUserId = +localStorage.getItem('userId')
        if (data.userId === currentUserId) {
          socket.disconnect()
          localStorage.removeItem('dashboardChartPanels');
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          localStorage.removeItem('profile')
          localStorage.removeItem('userId')
          localStorage.removeItem('usuario')
          localStorage.removeItem('queues')
          localStorage.removeItem('bloquearWavoip')
          localStorage.removeItem('whatsappAllowed')
          localStorage.removeItem('filtrosAtendimento')
          
          this.$q.notify({
            message: data.message || 'Nova sessão iniciada em outro dispositivo',
            type: 'warning',
            position: 'top',
            timeout: 5000,
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
          
          const timerId = setTimeout(() => {
            Router.push({
              name: 'login'
            })
          }, 2000)
          this.addTimer(timerId);
        }
      })

      socket.on(`sessionInvalidated:${socket.id}`, (data) => {
        socket.disconnect()
        localStorage.removeItem('dashboardChartPanels');
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('profile')
        localStorage.removeItem('userId')
        localStorage.removeItem('usuario')
        localStorage.removeItem('queues')
        localStorage.removeItem('bloquearWavoip')
        localStorage.removeItem('whatsappAllowed')
        localStorage.removeItem('filtrosAtendimento')
        
        this.$q.notify({
          message: data.message || 'Sessão inválida. Faça login novamente.',
          type: 'negative',
          position: 'top',
          timeout: 5000,
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
        
        const timerId2 = setTimeout(() => {
          Router.push({
            name: 'login'
          })
        }, 2000)
        this.addTimer(timerId2);
      })

      socket.io.on(`${usuario.tenantId}:whatsapp`, data => {
        if (data.action === 'update') {
          // console.log('socket ON: UPDATE_WHATSAPPS')
          this.$store.commit('UPDATE_WHATSAPPS', data.whatsapp)
        }
      })

      socket.on(`${usuario.tenantId}:whatsapp`, data => {   
        if (data.action === 'delete') {
          // console.log('socket ON: DELETE_WHATSAPPS')
          this.$store.commit('DELETE_WHATSAPPS', data.whatsappId)
        }
      })

      socket.on(`${usuario.tenantId}:whatsappSession`, data => {
        // console.log('socket ON: UPDATE_SESSION')
        if (data.action === 'update') {
          this.$store.commit('UPDATE_SESSION', data.session)
          bus.emit('UPDATE_SESSION', data.session)
        }

        if (data.action === 'loadingscreen') {
          this.$q.notify({
            position: 'bottom',
            icon: 'mdi-wifi-arrow-up-down',
            message: `${this.$t('socketInitial.loadingScreen')} ${data.session.name} - ${data.percent}%.`,
            type: 'positive',
            color: 'positive',
            html: true,
            progress: true,
            timeout: 7000,
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }],
            classes: 'text-body2 text-weight-medium'
          })
        }

        if (data.action === 'readySession') {
          this.$q.notify({
            position: 'top',
            icon: 'mdi-wifi-arrow-up-down',
            message: `${this.$t('socketInitial.readySession')} ${data.session?.name}. Número: ${data.session?.number}.`,
            type: 'positive',
            color: 'primary',
            html: true,
            progress: true,
            timeout: 7000,
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }],
            classes: 'text-body2 text-weight-medium'
          })
        }
      })

      socket.on(`${usuario.tenantId}:wavoip`, data => {
        // console.log('socket ON: WAVOIP_SESSION')

        if (data.action === 'update') {
          this.$q.notify({
            position: 'bottom',
            icon: 'mdi-wifi-arrow-up-down',
            message: `${this.$t('socketInitial.wavoipSession')} ${data.session.name} | Wavoip Token: ${data.session.wavoipToken}.`,
            type: 'positive',
            color: 'positive',
            html: true,
            progress: true,
            timeout: 7000,
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }],
            classes: 'text-body2 text-weight-medium'
          })
        }

      })

      let notification = null;
      socket.on(`${usuario.tenantId}:importMessages`, data => {
        // console.log('socket ON: UPDATE_IMPORT')
        if (data.action === 'update') {
          if (data.status.all === -1 && data.status.this === -1) {
            if (notification) {
              notification();
            }
            notification = this.$q.notify({
              message: this.$t('socketInitial.updateImport'),
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            });
          } else {
            if (notification) {
              notification();
            }
            notification = this.$q.notify({
              message: `${this.$t('socketInitial.refreshImport')} ${data.status.this} - ${data.status.all} -   ${data.status.date}`,
              type: 'warning',
              progress: true,
              position: 'top',
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            });
          }
        }
        if (data.action === 'refresh') {
          this.$q.notify({
            message: `${this.$t('socketInitial.refreshImport')} ${data}`,
            type: 'negative',
            progress: true,
            position: 'top',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
      })

      socket.on(`${usuario.tenantId}:change_battery`, data => {
        // console.log('socket ON: CHANGE_BATTERY')
        this.$q.notify({
          message: `${this.$t('socketInitial.changeBattery')} ${data.batteryInfo.sessionName} - ${data.batteryInfo.battery}%.`,
          type: 'negative',
          progress: true,
          position: 'top',
          actions: [{
            icon: 'close',
            round: true,
            color: 'white'
          }]
        })
      })

      const filtroPadrao = {
        searchParam: '',
        pageNumber: 1,
        status: ['open', 'pending'],
        showAll: false,
        includeClosed: false,
        count: null,
        queuesIds: [],
        whatsappIds: [],
        selectedUser: [],
        withUnreadMessages: false,
        isNotAssignedUser: false,
        includeNotQueueDefined: true
        // date: new Date(),
      }

      socket.on(`${usuario.tenantId}:ticketList`, async (data) => {
        const filtros = JSON.parse(localStorage.getItem('filtrosAtendimento')) || filtroPadrao;
        if(filtros.searchParam.length > 0 ) return
        if(filtros.withUnreadMessages === true ) return
        

        // Otimização: Filtrar tickets antes de processar para evitar tempestade de requests
        // Se ticketsRain estiver enabled, filtrar tickets que não pertencem ao usuário (exceto admin)
        if (getTicketsRainEnabled() && data.type === 'ticket:update' && data.payload?.ticket) {
          const ticket = data.payload.ticket;
          if (usuario?.profile !== 'admin' && 
              ticket.userId !== usuario.userId && 
              (!ticket.userIdArray || !ticket.userIdArray.includes(usuario.userId))) {
            return; // Ignorar ticket que não pertence ao usuário
          }
        }
        
        if (data.type === 'ticket:update') {
          // console.log('socket ON: TICKET:UPDATE')
          try {
            const params = {
              searchParam: '',
              pageNumber: 1,
              status: ['open', 'pending'],
              showAll: false,
              includeClosed: false,
              count: null,
              queuesIds: [],
              whatsappIds: [],
              selectedUser: [],
              withUnreadMessages: [true, false],
              isNotAssignedUser: [true, false],
              includeNotQueueDefined: [true, false]
              // date: new Date(),
            }
            const response = await this.consultarTicketsOtimizado(params)
            const data = response?.data || response
            if (!data) return
            this.countTickets = data.count           
            // this.$store.commit('UPDATE_NOTIFICATIONS', data)
            if(usuario.profile === 'admin'){
              const openTickets = (data.tickets || []).filter(ticket => ticket.status === 'open' && ticket.unreadMessages > 0)
              const openCount = Number(openTickets.length) || 0
              this.$store.commit('UPDATE_NOTIFICATIONS', { ...data, tickets: openTickets, count: openCount })
            }
            else {
              const openTickets = data.tickets.filter(ticket => ticket.status === 'open' && ticket.userId === usuario.userId && ticket.unreadMessages > 0)
              const openCount = Number(openTickets?.length) || 0
              this.$store.commit('UPDATE_NOTIFICATIONS', { ...data, tickets: openTickets, count: openCount })
            }
            const orderTickets = (tickets) => {
              const newTickes = orderBy(tickets, (obj) => parseISO(obj.lastMessageAt || obj.updatedAt), ['asc'])
              return [...newTickes]
            }
            const newTickets = orderTickets(data.tickets)
            // NEWSOCKET
            this.$store.commit('LOAD_TICKETS', newTickets);
            this.$store.commit('UPDATE_TICKET', newTickets);
            this.$store.commit('UPDATE_CONTACT', newTickets);
            // // console.log('try ORDER_TICKETS', newTickets.map(ticket => ({ id: ticket.id, lastMessageAt: ticket.lastMessageAt })))      
            // setTimeout(() => {
            //   // console.log('try LOAD_TICKETS')
            //   this.$store.commit('LOAD_TICKETS', newTickets);
            // }, 200);
            // setTimeout(() => {
            //   // console.log('try UPDATE_TICKET')
            //   this.$store.commit('UPDATE_TICKET', newTickets);
            // }, 400);
            // setTimeout(() => {
            //   // console.log('try UPDATE_CONTACT')
            //   this.$store.commit('UPDATE_CONTACT', newTickets);
            //   // this.$store.commit('UPDATE_NOTIFICATIONS', data)
            // }, 600);
          } catch (err) {
            // Silenciar erros de timeout - não mostrar no console
            if (err?.code !== 'ECONNABORTED' && !err?.message?.includes('timeout')) {
              console.log('error try 1', err)
            }
          }
        }
        if (data.type === 'ticket:create') {
          // Otimização: Filtrar tickets antes de processar para evitar tempestade de requests
          // Se ticketsRain estiver enabled, filtrar tickets que não pertencem ao usuário (exceto admin)
          if (getTicketsRainEnabled() && data.payload?.ticket) {
            const ticket = data.payload.ticket;
            if (usuario?.profile !== 'admin' && 
                ticket.userId !== usuario.userId && 
                (!ticket.userIdArray || !ticket.userIdArray.includes(usuario.userId))) {
              return; // Ignorar ticket que não pertence ao usuário
            }
          }
          // console.log('socket ON: TICKET:CREATE')
          try {
            const params = {
              searchParam: '',
              pageNumber: 1,
              status: ['open', 'pending'],
              showAll: false,
              includeClosed: false,
              count: null,
              queuesIds: [],
              whatsappIds: [],
              selectedUser: [],
              withUnreadMessages: false,
              isNotAssignedUser: false,
              includeNotQueueDefined: true
              // date: new Date(),
            }
            const response = await this.consultarTicketsOtimizado(params)
            const data = response?.data || response
            if (!data) return
            this.countTickets = data.count           
            // this.$store.commit('UPDATE_NOTIFICATIONS', data)
            if(usuario.profile === 'admin'){
              const openTickets = (data.tickets || []).filter(ticket => ticket.status === 'open' && ticket.unreadMessages > 0)
              const openCount = Number(openTickets.length) || 0
              this.$store.commit('UPDATE_NOTIFICATIONS', { ...data, tickets: openTickets, count: openCount })
            }
            else {
              const openTickets = data.tickets.filter(ticket => ticket.status === 'open' && ticket.userId === usuario.userId && ticket.unreadMessages > 0)
              const openCount = Number(openTickets?.length) || 0
              this.$store.commit('UPDATE_NOTIFICATIONS', { ...data, tickets: openTickets, count: openCount })
            }
            const orderTickets = (tickets) => {
              const newTickes = orderBy(tickets, (obj) => parseISO(obj.lastMessageAt || obj.updatedAt), ['asc'])
              return [...newTickes]
            }
            const newTickets = orderTickets(data.tickets)  
            // NEWSOCKET
            this.$store.commit('LOAD_TICKETS', newTickets);  
            this.$store.commit('UPDATE_TICKET', newTickets);
            this.$store.commit('UPDATE_CONTACT', newTickets);
            // // console.log('try ORDER_TICKETS', newTickets.map(ticket => ({ id: ticket.id, lastMessageAt: ticket.lastMessageAt })))      
            // setTimeout(() => {
            //   // console.log('try LOAD_TICKETS')
            //   this.$store.commit('LOAD_TICKETS', newTickets);
            // }, 200);
            // setTimeout(() => {
            //   // console.log('try UPDATE_TICKET')
            //   this.$store.commit('UPDATE_TICKET', newTickets);
            // }, 400);
            // setTimeout(() => {
            //   // console.log('try UPDATE_CONTACT')
            //   this.$store.commit('UPDATE_CONTACT', newTickets);
            //   // this.$store.commit('UPDATE_NOTIFICATIONS', data)
            // }, 600);
          } catch (err) {
            // Silenciar erros de timeout - não mostrar no console
            if (err?.code !== 'ECONNABORTED' && !err?.message?.includes('timeout')) {
              console.log('error try 2', err)
            }
          }
        }
      })

      socket.on(`${usuario.tenantId}:ticketList`, async (data) => {   
        // console.log('socket ON: TICKET:LIST', data)
        if (data.type === 'chat:create') {
          // console.log('socket ON: CHAT:CREATE')
          if (!data.payload) return
          
          // Otimização: Filtrar tickets antes de processar para evitar tempestade de requests
          // Se ticketsRain estiver enabled, filtrar tickets que não pertencem ao usuário (exceto admin)
          if (getTicketsRainEnabled() && data.payload.ticket) {
            const ticket = data.payload.ticket;
            if (usuario?.profile !== 'admin' && 
                ticket.userId !== usuario.userId && 
                (!ticket.userIdArray || !ticket.userIdArray.includes(usuario.userId))) {
              return; // Ignorar ticket que não pertence ao usuário
            }
          }
          
          if (data.payload.ticket.userId === userId){
            const profilePicUrl = data.payload.ticket.contact.profilePicUrl;
            const validImage = profilePicUrl && profilePicUrl !== 'null' && profilePicUrl !== 'undefined' ? profilePicUrl : undefined;
            new self.Notification('Contato: ' + data.payload.ticket.contact.name, {
              body: this.$t('common.message') + ': '  + data.payload.body,
              tag: 'simple-push-demo-notification',
              image: validImage,
              icon: validImage,
            })
          }
          this.$store.commit('UPDATE_MESSAGES', data.payload)
          const params = {
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
          try {
            const response = await this.consultarTicketsOtimizado(params)
            const data = response?.data || response
            if (!data) return
            this.countTickets = data.count        
            // this.$store.commit('UPDATE_NOTIFICATIONS', data)
            if(usuario.profile === 'admin'){
              const openTickets = (data.tickets || []).filter(ticket => ticket.status === 'open' && ticket.unreadMessages > 0)
              const openCount = Number(openTickets.length) || 0
              this.$store.commit('UPDATE_NOTIFICATIONS', { ...data, tickets: openTickets, count: openCount })
            }
            else {
              const openTickets = data.tickets.filter(ticket => ticket.status === 'open' && ticket.userId === usuario.userId && ticket.unreadMessages > 0)
              const openCount = Number(openTickets?.length) || 0
              this.$store.commit('UPDATE_NOTIFICATIONS', { ...data, tickets: openTickets, count: openCount })
            }
            // NEWSOCKET UPDATE_MESSAGES
            try{
              this.$store.commit('UPDATE_MESSAGES', data?.payload)
            } catch(e){
              
            }
            const orderTickets = (tickets) => {
              const newTickes = orderBy(tickets, (obj) => parseISO(obj.lastMessageAt || obj.updatedAt), ['asc'])
              return [...newTickes]
            }
            const newTickets = orderTickets(data.tickets) 
            // NEWSOCKET UPDATE_CONTACT
            this.$store.commit('UPDATE_CONTACT', newTickets);    
            // setTimeout(() => {
            //   // this.$store.commit('LOAD_TICKETS', newTickets);
            // }, 200);
            // setTimeout(() => {
            //   // this.$store.commit('UPDATE_TICKET', newTickets);
            //   try{
            //     this.$store.commit('UPDATE_MESSAGES', data.payload)
            //   } catch(e){
                
            //   }
            // }, 400);
            // setTimeout(() => {
            //   this.$store.commit('UPDATE_CONTACT', newTickets);
            //   this.$store.commit('UPDATE_NOTIFICATIONS', data);
            // }, 600);
            try{
              // this.scrollToBottom()
              if (data.payload.ticket.userId === userId || (data.payload.ticket.userIdArray && data.payload.ticket.userIdArray.includes(userId))){
                this.scrollToBottom()
              }
            } catch(e){
              
            }
          } catch (err) {
            // Silenciar erros de timeout - não mostrar no console
            if (err?.code !== 'ECONNABORTED' && !err?.message?.includes('timeout')) {
              console.log('error try 3', err)
            }
          }
        }
      })

      socket.on(`${usuario.tenantId}:ticketList`, async data => {
        var verify = []
        if (data.type === 'notification:new') {
          const params = {
            searchParam: '',
            pageNumber: 1,
            status: ['open', 'pending'],
            showAll: false,
            includeClosed: false,
            count: null,
            queuesIds: [],
            whatsappIds: [],
            selectedUser: [],
            withUnreadMessages: false,
            isNotAssignedUser: false,
            includeNotQueueDefined: true
          }
          try {
            const response_noti = await this.consultarTicketsOtimizado(params)
            if (!response_noti) return
            const data_noti = response_noti.data || response_noti
            if (!data_noti) return
            // this.$store.commit('UPDATE_NOTIFICATIONS_P', data_noti.data)
            if(this.usuario.profile === 'admin'){
              const pendingTickets = (data_noti.tickets || []).filter(ticket => ticket.status === 'pending')
              const pendingCount = Number(pendingTickets.length) || 0
              if(pendingCount > 0){
                this.$store.commit('UPDATE_NOTIFICATIONS_P', { ...data_noti, tickets: pendingTickets, count: pendingCount })
              }
            }
            else {
              const pendingTickets = (data_noti.tickets || []).filter(ticket => ticket.status === 'pending' && ticket.userId === this.usuario.userId)
              const pendingCount = Number(pendingTickets.length) || 0
              if(pendingCount > 0){
                this.$store.commit('UPDATE_NOTIFICATIONS_P', { ...data_noti, tickets: pendingTickets, count: pendingCount })
              }
            }
            verify = { data: data_noti }
          } catch (err) {
            // Silenciar erros de timeout - não mostrar no console
            if (err?.code !== 'ECONNABORTED' && !err?.message?.includes('timeout')) {
              this.$notificarErro(this.$t('common.errorOccurred') , err)
              console.error(err)
            }
          }
          var pass_noti = false
          if (verify?.data?.tickets) {
            verify.data.tickets.forEach((element) => { pass_noti = (element.id == data.payload.id ? true : pass_noti) })
          }
          if (pass_noti) {
            const message = new self.Notification(this.$t('common.newClientPending'), {
              body: this.$t('common.client') + data.payload.contact.name,
              tag: 'simple-push-demo-notification'
            })
          }
        }
      })

      socket.on(`${usuario.tenantId}:ticketList`, async data => {
        if (data.type === 'notification:status') {
          if (data.payload.msg.ticket.userId === userId || (data.payload.msg.ticket.userIdArray && data.payload.msg.ticket.userIdArray.includes(userId))){
            this.$q.notify({
              message: data.payload.message,
              type: 'warning',
              position: 'top',
              timeout: 5000,
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          }
        }
      })

      socket.on(`${usuario.tenantId}:ticketList`, async data => {

        if (data.type === 'chat:ack' || data.type === 'chat:delete') {
          this.$store.commit('UPDATE_MESSAGE_STATUS', data.payload)
        }

        if (data.type === 'chat:update') {
          this.$store.commit('UPDATE_MESSAGES', data.payload)
        }
      })

      socket.on(`${usuario.tenantId}:contactList`, data => {
        if (data.type === 'contact:update') {
          // console.log('socket ON: CONTACT:UPDATE')
          this.$store.commit('UPDATE_CONTACT', data.payload)
        }
      })

      socket.on(`${usuario.tenantId}:msg-private-msg`, data => {
        if ((data.data.receiverId == usuario.userId || data.data.groupId != null) && data.action === 'update') {
          this.$store.commit('PRIVATE_RECEIVED_MESSAGE', data)
        }
      })
      
      socket.on(`${usuario.tenantId}:unread-msg-private-msg`, data => {
        if (data.data.senderId == usuario.userId && data.action === 'update') {
          this.$store.commit('UNREAD_MESSAGE_PRIVATE_RECEIVED', data)
        }
      })
      
      socket.on(`${usuario.tenantId}:msg-private-msg-notificacao`, data => {
        if ((data.data.receiverId == usuario.userId || data.data.groupId != null) && data.action === 'update') {
          this.$store.commit('NOTIFICATION_RECEIVED_PRIVATE_MESSAGE', data)
        }
      })
      
      socket.on('verifyOnlineUsers', data => {
        this.$store.commit('LIST_USERS_PRIVATE', { action: 'updateAllUsers', data: {} })
        this.socket.emit(`${usuario.tenantId}:userVerified`, usuario)
      })
  
      socket.on(`${usuario.tenantId}:user-online`, data => {
        if (data.action === 'update' && data.data.userId !== usuario.userId) {
          this.$store.commit('USER_CHAT_UPDATE', data)
        }
      })
      
      socket.on(`${usuario.tenantId}:updateStatusUser`, async () => {
        try {
          const { data } = await ListarUsuariosChatPrivado()
          const users = Array.isArray(data) ? data : (data?.users || [])
          this.$store.commit('LIST_USERS_PRIVATE', { action: 'create', data: users })
        } catch (e) {
          try {
            const { data } = await ListarUsuariosAll()
            const users = Array.isArray(data) ? data : (data?.users || [])
            this.$store.commit('LIST_USERS_PRIVATE', { action: 'create', data: users.filter(u => u.profile !== 'superadmin') })
          } catch (e2) {
            // Silenciar erros de timeout - não mostrar no console
            if (e2?.code !== 'ECONNABORTED' && !e2?.message?.includes('timeout')) {
              console.error('Falha ao atualizar lista de usuários via socket:', e2)
            }
          }
        }
      })
    }
  },
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  mounted () {
    this.socketInitial()
  },
  unmounted() {
    socket.disconnect()
  }
}
