import request from 'src/service/request.js'

// Funções para gerenciar configurações do Google Calendar
export function CriarConfiguracaoGoogleCalendar (data) {
  return request({
    url: '/google-calendar-configs',
    method: 'post',
    data
  })
}

export function ListarConfiguracoesGoogleCalendar (params) {
  return request({
    url: '/google-calendar-configs',
    method: 'get',
    params
  })
}

export function BuscarConfiguracaoGoogleCalendar (id) {
  return request({
    url: `/google-calendar-configs/${id}`,
    method: 'get'
  })
}

export function AtualizarConfiguracaoGoogleCalendar (id, data) {
  return request({
    url: `/google-calendar-configs/${id}`,
    method: 'put',
    data
  })
}

export function DeletarConfiguracaoGoogleCalendar (id) {
  return request({
    url: `/google-calendar-configs/${id}`,
    method: 'delete'
  })
}

export function GerarUrlAutorizacaoGoogle (data) {
  return request({
    url: '/google-calendar/auth/url',
    method: 'post',
    data
  })
}

export function TrocarCodigoPorTokens (data) {
  return request({
    url: '/google-calendar/auth/token',
    method: 'post',
    data
  })
}

export function CriarEventoGoogleCalendar (data) {
  return request({
    url: '/google-calendar-create/events',
    method: 'post',
    data
  })
}

export function ListarEventosGoogleCalendar (params, data) {
  return request({
    url: '/google-calendar-list/events',
    method: 'post',
    params,
    data
  })
}

export function AtualizarEventoGoogleCalendar (eventId, data) {
  return request({
    url: `/google-calendar-update/events/${eventId}`,
    method: 'put',
    data
  })
}

export function DeletarEventoGoogleCalendar (eventId, data) {
  return request({
    url: `/google-calendar-delete/events/${eventId}`,
    method: 'delete',
    data
  })
} 