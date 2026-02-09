import request from 'src/service/request.js'
import requestMidia from 'src/service/requestMidia.js'

export function EnviarTextoMessenger (data) {
  return requestMidia({
    url: '/messengerMetaText',
    method: 'post',
    data
  })
}

export function EnviarHumanAgentMessenger (data) {
  return requestMidia({
    url: '/messengerMetaHumanAgent',
    method: 'post',
    data
  })
}

export function EnviarReacaoMessenger (data) {
  return request({
    url: '/messengerMetaReaction',
    method: 'post',
    data
  })
}

export function EnviarBotaoMessenger (data) {
  return request({
    url: '/messengerMetaButton',
    method: 'post',
    data
  })
}

export function EnviarListaMessenger (data) {
  return request({
    url: '/messengerMetaList',
    method: 'post',
    data
  })
}

export function EnviarArquivoMessenger (data) {
  return requestMidia({
    url: '/messengerMetaFile',
    method: 'post',
    data
  })
}

export function EnviarStickerMessenger (data) {
  return requestMidia({
    url: '/messengerMetaSticker',
    method: 'post',
    data
  })
}

export function EnviarArquivoUrlMessenger (data) {
  return request({
    url: '/messengerMetaFileUrl',
    method: 'post',
    data
  })
}

export function ExchangeEmbeddedSignupCodeMessenger (data) {
  return request({
    url: '/messengerMetaExchangeEmbeddedSignupCode',
    method: 'post',
    data
  })
}

export function OverrideCallbackUrlMessenger (data) {
  return request({
    url: '/messengerMetaOverrideCallbackUrl',
    method: 'post',
    data
  })
}

export function GetChannelInfoMessenger (whatsappId) {
  return request({
    url: `/messengerMetaChannelInfo/${whatsappId}`,
    method: 'get'
  })
}

export function GetChannelInfoFacebook (whatsappId) {
  return request({
    url: `/facebookMetaChannelInfo/${whatsappId}`,
    method: 'get'
  })
}

export function BuscarTemplatesMessenger (whatsappId) {
  return request({
    url: `/messengerMetaTemplates/${whatsappId}`,
    method: 'get'
  })
}

export function EnviarTemplateMarketingMessenger (data) {
  return request({
    url: '/messengerMetaTemplateMarketing',
    method: 'post',
    data
  })
}

export function EnviarTemplateUtilityMessenger (data) {
  return request({
    url: '/messengerMetaTemplateUtility',
    method: 'post',
    data
  })
}

export function CriarTemplateMarketingMessenger (data) {
  return request({
    url: '/messengerMetaTemplateMarketingCreate/',
    method: 'post',
    data
  })
}

export function CriarTemplateUtilityMessenger (data) {
  return request({
    url: '/messengerMetaTemplateUtilityCreate/',
    method: 'post',
    data
  })
}