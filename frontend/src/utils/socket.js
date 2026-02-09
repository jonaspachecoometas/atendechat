import { io } from 'socket.io-client'

// export const socketIO = () => {
//   return io(process.env.URL_API, {
//     reconnection: true,
//     autoConnect: true,
//     transports: ['websocket', 'polling'],
//     auth: (cb) => {
//       const tokenItem = localStorage.getItem('token')
//       const token = tokenItem ? JSON.parse(tokenItem) : null
//       // eslint-disable-next-line standard/no-callback-literal
//       cb({ token })
//     }
//   })
// }

export const socketIO = () => {
  // Lê token do localStorage (se existir)
  let token = null
  try {
    const raw = localStorage.getItem('token')
    token = raw ? JSON.parse(raw) : null
  } catch (e) {
    token = null
  }

  // Configura URL/path considerando proxy em dev
  const API_BASE = process.env.URL_API || ''
  const isRelative = API_BASE.startsWith('/')
  const socketUrl = isRelative ? '' : API_BASE
  const socketPath = isRelative
    ? `${API_BASE.replace(/\/$/, '')}/socket.io`
    : '/socket.io'

  const options = {
    reconnection: true,
    // tenta polling primeiro para maior compatibilidade com proxies
    transports: ['polling', 'websocket'],
    // Não conectar automaticamente sem token para evitar erros de autenticação na tela de login
    autoConnect: !!token,
    forceNew: true,
    timeout: 30000,
    path: socketPath
  }

  if (token) {
    options.auth = { token }
  }

  const s = io(socketUrl, options)
  return s
}

const socket = socketIO()

// Função auxiliar para autenticar e conectar após o login
export function connectWithToken (newToken) {
  try {
    socket.auth = { token: newToken }
    if (!socket.connected) socket.connect()
  } catch (e) {
    console.error('failed to connectWithToken', e)
  }
}

// Atualiza auth a partir do localStorage e tenta conectar
export function ensureConnectedFromStorage () {
  try {
    const raw = localStorage.getItem('token')
    const tok = raw ? JSON.parse(raw) : null
    if (tok) {
      socket.auth = { token: tok }
      if (!socket.connected) socket.connect()
    }
  } catch (e) { /* ignore */ }
}

// Sistema de gerenciamento de memória
let socketListeners = []

const addSocketListener = (event, handler) => {
  socket.on(event, handler);
  socketListeners.push({ event, handler });
};

const removeAllSocketListeners = () => {
  socketListeners.forEach(({ event, handler }) => {
    socket.off(event, handler);
  });
  socketListeners = [];
};

const cleanupMemory = () => {
  removeAllSocketListeners();
};

socket.io.on('error', (error) => {
  console.error('socket error', error)
})

addSocketListener('connect', () => {
  // console.log('✅ SOCKET ID:', socket.id)
  console.log('🔗 SOCKET CONNECTED:', socket.connected)
  // console.log('🌐 SOCKET URL:', socket.io.uri)
  // console.log('🔗 SOCKET TRANSPORT:', socket.io.engine.transport.name)
})

addSocketListener('connect_error', (error) => {
  
  // Verificar se é erro de autenticação
  if (error.message === 'authentication error') {
    // Evita loop de reconexão sem token; somente conecta quando houver token válido
    socket.disconnect()
  }
})

addSocketListener('reconnect_attempt', (attemptNumber) => {
  console.log('reconnect attempt', attemptNumber)
})

addSocketListener('reconnect', (attemptNumber) => {
  console.log('reconnect', attemptNumber)
})

addSocketListener('reconnect_error', (error) => {
  console.error('reconnect error', error)
})

addSocketListener('disconnect', (reason) => {
  console.info('socket disconnect', reason)

  if (reason === "io server disconnect") {
    // the disconnection was initiated by the server, you need to reconnect manually
    console.log('reconnecting manually...')
    socket.connect();
  } else if (reason === "transport close") {
    console.log('transport closed - waiting for automatic reconnection...')
  } else if (reason === "ping timeout") {
    console.log('ping timeout - waiting for automatic reconnection...')
  } else {
    console.log('disconnection by:', reason)
  }
  // else the socket will automatically try to reconnect
})

// Métodos de limpeza de memória
socket.cleanupMemory = cleanupMemory;
socket.removeAllSocketListeners = removeAllSocketListeners;

export default socket
