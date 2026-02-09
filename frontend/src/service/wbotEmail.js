import request from 'src/service/request.js'

// Rotas de configuração SMTP
export function getSmtpConfig(whatsappId) {
  return request({
    url: `/wbot-email/smtp/${whatsappId}`,
    method: 'get'
  })
}

export function updateSmtpConfig(whatsappId, data) {
  return request({
    url: `/wbot-email/smtp/${whatsappId}`,
    method: 'put',
    data
  })
}

export function deleteSmtpConfig(whatsappId) {
  return request({
    url: `/wbot-email/smtp/${whatsappId}`,
    method: 'delete'
  })
}

export function testSmtpConnection(whatsappId) {
  return request({
    url: `/wbot-email/smtp/${whatsappId}/test`,
    method: 'post'
  })
}

// Rotas de envio de email
export function sendEmail(whatsappId, data) {
  return request({
    url: `/wbot-email/send/${whatsappId}`,
    method: 'post',
    data
  })
}

export function sendBulkEmails(whatsappId, data) {
  return request({
    url: `/wbot-email/send/bulk/${whatsappId}`,
    method: 'post',
    data
  })
}

export function sendTemplateEmail(whatsappId, data) {
  return request({
    url: `/wbot-email/send/template/${whatsappId}`,
    method: 'post',
    data
  })
}

// Rotas de recebimento de email
export function startListening(whatsappId) {
  return request({
    url: `/wbot-email/listen/${whatsappId}/start`,
    method: 'post'
  })
}

export function stopListening(whatsappId) {
  return request({
    url: `/wbot-email/listen/${whatsappId}/stop`,
    method: 'post'
  })
}

export function checkNewEmails(whatsappId) {
  return request({
    url: `/wbot-email/listen/${whatsappId}/check`,
    method: 'get'
  })
}

export function getListenerStatus(whatsappId) {
  return request({
    url: `/wbot-email/listen/${whatsappId}/status`,
    method: 'get'
  })
}

export function getAllListeners() {
  return request({
    url: '/wbot-email/listen',
    method: 'get'
  })
}

export function testImapConnection(whatsappId) {
  return request({
    url: `/wbot-email/listen/${whatsappId}/test-imap`,
    method: 'post'
  })
}

// Teste de conexão POP3
export function testPop3Connection(whatsappId) {
  return request({
    url: `/wbot-email/listen/${whatsappId}/test-pop3`,
    method: 'post'
  })
}

// Status da conexão de email (IMAP vs POP3)
export function getEmailConnectionStatus(whatsappId) {
  return request({
    url: `/wbot-email/listen/${whatsappId}/connection-status`,
    method: 'get'
  })
}

// Rotas de gerenciamento geral
export function initializeWhatsappEmail(whatsappId) {
  return request({
    url: `/wbot-email/${whatsappId}/initialize`,
    method: 'post'
  })
}

export function shutdownWhatsappEmail(whatsappId) {
  return request({
    url: `/wbot-email/${whatsappId}/shutdown`,
    method: 'post'
  })
}

export function restartWhatsappEmail(whatsappId) {
  return request({
    url: `/wbot-email/${whatsappId}/restart`,
    method: 'post'
  })
}

export function getWhatsappEmailStatus(whatsappId) {
  return request({
    url: `/wbot-email/${whatsappId}/status`,
    method: 'get'
  })
}

export function getEmailStats(whatsappId) {
  return request({
    url: `/wbot-email/${whatsappId}/stats`,
    method: 'get'
  })
}

// Rotas utilitárias
export function validateEmailAddress(data) {
  return request({
    url: '/wbot-email/validate-email',
    method: 'post',
    data
  })
}

export function updateServiceConfig(data) {
  return request({
    url: '/wbot-email/config',
    method: 'put',
    data
  })
}

export function getServiceConfig() {
  return request({
    url: '/wbot-email/config',
    method: 'get'
  })
}
