import request from 'src/service/request.js'
import requestMidia from 'src/service/requestMidia.js'

export function EnviarTextoInstagram (data) {
  return requestMidia({
    url: '/instagramMetaText',
    method: 'post',
    data
  })
}

export function EnviarHumanAgentInstagram (data) {
  return requestMidia({
    url: '/instagramMetaHumanAgent',
    method: 'post',
    data
  })
}

export function EnviarReacaoInstagram (data) {
  return request({
    url: '/instagramMetaReaction',
    method: 'post',
    data
  })
}

export function EnviarBotaoInstagram (data) {
  return request({
    url: '/instagramMetaButton',
    method: 'post',
    data
  })
}

export function EnviarListaInstagram (data) {
  return request({
    url: '/instagramMetaList',
    method: 'post',
    data
  })
}

export function EnviarArquivoInstagram (data) {
  return requestMidia({
    url: '/instagramMetaFile',
    method: 'post',
    data
  })
}

export function EnviarStickerInstagram (data) {
  return requestMidia({
    url: '/instagramMetaSticker',
    method: 'post',
    data
  })
}

export function EnviarArquivoUrlInstagram (data) {
  return request({
    url: '/instagramMetaFileUrl',
    method: 'post',
    data
  })
}

export function ExchangeEmbeddedSignupCodeInstagram (data) {
  return request({
    url: '/instagramMetaExchangeEmbeddedSignupCode',
    method: 'post',
    data
  })
}

export function OverrideCallbackUrlInstagram (data) {
  return request({
    url: '/instagramMetaOverrideCallbackUrl',
    method: 'post',
    data
  })
}

export function GetChannelInfoInstagram (whatsappId) {
  return request({
    url: `/instagramMetaChannelInfo/${whatsappId}`,
    method: 'get'
  })
}

export function ListMediaInstagram (whatsappId, params = {}) {
  // Se tiver nextUrl, enviar como query param
  const queryParams = { ...params }
  const queryString = new URLSearchParams(queryParams).toString()
  return request({
    url: `/instagramMetaMedia/${whatsappId}${queryString ? '?' + queryString : ''}`,
    method: 'get'
  })
}

export function GetMediaCommentsInstagram (mediaId, params = {}) {
  const queryString = new URLSearchParams(params).toString()
  return request({
    url: `/instagramMetaComments/${mediaId}${queryString ? '?' + queryString : ''}`,
    method: 'get'
  })
}

export function ReplyCommentInstagram (data) {
  return request({
    url: '/instagramMetaReplyComment',
    method: 'post',
    data
  })
}

export function DeleteCommentInstagram (data) {
  return request({
    url: '/instagramMetaDeleteComment',
    method: 'delete',
    data
  })
}

