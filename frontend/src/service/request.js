import axios from 'axios'
import Router from '../router/index.js'

import loading from 'src/utils/loading.js'
import { Notify } from 'quasar'

import backendErrors from './erros.js'
import { RefreshToken } from './login.js'

const service = axios.create({
  baseURL: process.env.URL_API,
  timeout: 30000,
  withCredentials: true // Necessário para enviar cookies HTTP-only (refresh token)
})

// Refresh token coordination (single-flight) + request queue
let isRefreshing = false
let refreshWaitQueue = []

const handlerError = err => {
  const errorMsg = err?.response?.data?.error
  let error = 'Ocorreu um erro não identificado.'
  if (errorMsg) {
    if (backendErrors[errorMsg]) {
      error = backendErrors[errorMsg]
    } else {
      error = err.response.data.error
    }
  }
  Notify.create({
    position: 'top',
    type: 'warning',
    html: true,
    progress: true,
    message: `${JSON.stringify(error)}`
  })
}

// const tokenInicial = url => {
//   const paths = [
//     '/login/'
//   ]
//   let is_init = false
//   paths.forEach(path => {
//     url.indexOf(path) !== -1 ? is_init = true : is_init = false
//   })
//   return is_init
// }

service.interceptors.request.use(
  config => {
    try {
      if (config.loading) {
        loading.show(config.loading)
      }
    } catch (error) {

    }

    // let url = config.url
    // const r = new RegExp('id_conta_cliente', 'g')
    // url = url.replace(r, id_conta_cliente)
    // const u = new RegExp('id_unidade_negocio', 'g')
    // config.url = url.replace(u, id_unidade_negocio)
    // Attach Authorization only when we have a valid token
    try {
      const raw = localStorage.getItem('token')
      const tokenAuth = raw ? JSON.parse(raw) : null
      if (tokenAuth) {
        config.headers = config.headers || {}
        config.headers.Authorization = 'Bearer ' + tokenAuth
      }
    } catch (e) { /* noop */ }
    return config
  },
  error => {
    // handlerError(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    loading.hide(response.config)
    const res = response
    const status = res.status
    // Tratar 2xx como sucesso e também 304 (Not Modified) para permitir uso de cache do navegador
    if (status !== 304 && status?.toString().substr(0, 1) !== '2') {
      // handlerError(res)
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    try { loading.hide(error?.config) } catch (e) {}

    const status = error?.response?.status
    const originalRequest = error?.config || {}

    const url = String(originalRequest?.url || '')
    const isAuthCall = url.includes('/auth/login') || url.includes('/auth/refresh_token') || url.includes('/auth/logout')

    // If unauthorized/forbidden, try a single refresh and then replay the request
    if ((status === 401 || status === 403) && !originalRequest._retry && !isAuthCall) {
      originalRequest._retry = true

      if (!isRefreshing) {
        isRefreshing = true
        RefreshToken()
          .then(res => {
            const newToken = res?.data?.token
            if (newToken) {
              localStorage.setItem('token', JSON.stringify(newToken))
            }
            // Wake up queued requests
            refreshWaitQueue.forEach(cb => {
              try { cb(newToken) } catch (e) {}
            })
            refreshWaitQueue = []
          })
          .catch(() => {
            // Refresh failed: purge session and redirect to login
            localStorage.removeItem('dashboardChartPanels')
            localStorage.removeItem('token')
            localStorage.removeItem('username')
            localStorage.removeItem('profile')
            localStorage.removeItem('userId')
            setTimeout(() => {
              Router.push({ name: 'login' })
            }, 200)
          })
          .finally(() => {
            isRefreshing = false
          })
      }

      return new Promise((resolve, reject) => {
        refreshWaitQueue.push((newToken) => {
          try {
            // Retry original request with new token if present
            originalRequest.headers = originalRequest.headers || {}
            if (newToken) {
              originalRequest.headers.Authorization = 'Bearer ' + newToken
            } else {
              delete originalRequest.headers.Authorization
            }
            resolve(service(originalRequest))
          } catch (e) {
            reject(e)
          }
        })
      })
    }

    // Tratar erros de timeout silenciosamente (não mostrar no console)
    // if (error?.code === 'ECONNABORTED' || (error?.message || '').indexOf('timeout') > -1) {
    //   // Retornar uma promise resolvida silenciosamente para evitar "Uncaught (in promise)"
    //   return Promise.resolve({ data: null, status: 408, statusText: 'Request Timeout' })
    // }

    if (status === 401) {
      localStorage.removeItem('dashboardChartPanels')
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('profile')
      localStorage.removeItem('userId')
      if (!isAuthCall) {
        handlerError(error)
        setTimeout(() => { Router.push({ name: 'login' }) }, 200)
      }
    } else if (status === 500) {
      handlerError(error)
    } else {
      // handlerError(error)
    }
    return Promise.reject(error.response || error)
  }
)

export default service
