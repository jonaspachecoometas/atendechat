import request from 'src/service/request.js'
import requestMidia from 'src/service/requestMidia.js'

export function BuscarTemplates (tokenApi) {
  return request({
    url: `/wabametaTemplate/${tokenApi}`,
    method: 'get',
  })
}

export function CriarTemplate (data) {
  return request({
    url: '/wabametaTemplateCreate',
    method: 'post',
    data
  })
}

export function EditarTemplate (data) {
  return request({
    url: '/wabametaTemplateEdit',
    method: 'put',
    data
  })
}

export function ExcluirTemplate (data) {
  return request({
    url: '/wabametaTemplateDelete',
    method: 'delete',
    data
  })
}

export function TestarTemplate (data) {
  return request({
    url: '/wabametaTemplateTest',
    method: 'post',
    data
  })
}

export function uploadImageManual (data) {
  return request({
    url: '/wabametaUploadImage',
    method: 'post',
    data
  })
}

export function VerificarTelefone (data) {
  return request({
    url: `/wabametaVerifyPhone`,
    method: 'post',
    data
  })
}

export function VerificarBM (data) {
  return request({
    url: `/wabametaVerifyBms`,
    method: 'post',
    data
  })
}

export function EnviarTextoWaba (data) {
  return requestMidia({
    url: '/wabametaText',
    method: 'post',
    data
  })
}

export function EnviarReacaoWaba (data) {
  return request({
    url: '/wabametaReaction',
    method: 'post',
    data
  })
}

export function EnviarTemplateWaba (data) {
  return request({
    url: '/wabametaTemplateText',
    method: 'post',
    data
  })
}

export function EnviarTemplateComponenteWaba (data) {
  return request({
    url: '/wabametaTemplateComponents',
    method: 'post',
    data
  })
}

export function EnviarTemplateMarketingComponenteWaba (data) {
  return request({
    url: '/wabametaMarketingTemplateComponents',
    method: 'post',
    data
  })
}

export function EnviarTemplateMassaComponenteWaba (data) {
  return request({
    url: '/wabametaBulkTemplateComponents',
    method: 'post',
    data
  })
}

export function EnviarTemplateWabaAgendado (data) {
  return request({
    url: '/wabametaTemplateTextSchedule',
    method: 'post',
    data
  })
}

export function EnviarArquivoWaba (data) {
  return requestMidia({
    url: '/wabametaFile',
    method: 'post',
    data
  })
}

export function EnviarStickerWaba (data) {
  return request({
    url: '/wabametaSticker',
    method: 'post',
    data
  })
}

export function EnviarArquivoUrlWaba (data) {
  return request({
    url: '/wabametaFileUrl',
    method: 'post',
    data
  })
}

export function EnviarBotaoWaba (data) {
  return request({
    url: '/wabametaButton',
    method: 'post',
    data
  })
}

export function EnviarListaWaba (data) {
  return request({
    url: '/wabametaList',
    method: 'post',
    data
  })
}

export function RegistrarTelefone (data) {
  return request({
    url: '/wabametaRegisterPhone',
    method: 'post',
    data
  })
}

export function ObterTelefonePorId (data) {
  return request({
    url: '/wabametaGetPhoneById',
    method: 'post',
    data
  })
}

export function SolicitarCodigoVerificacao (data) {
  return request({
    url: '/wabametaRequestVerificationCode',
    method: 'post',
    data
  })
}

export function VerificarCodigo (data) {
  return request({
    url: '/wabametaVerifyCode',
    method: 'post',
    data
  })
}

export function OverrideCallbackUrl (data) {
  return request({
    url: '/wabametaOverrideCallbackUrl',
    method: 'post',
    data
  })
}

export function OverrideCallbackCoexUrl (data) {
  return request({
    url: '/wabametaOverrideCallbackCoexUrl',
    method: 'post',
    data
  })
}

export function ExchangeEmbeddedSignupCode (data) {
  return request({
    url: '/wabametaExchangeEmbeddedSignupCode',
    method: 'post',
    data
  })
}

export function GetWABAData (data) {
  return request({
    url: '/wabametaGetWABAData',
    method: 'post',
    data
  })
}

export function GetWABAPhoneNumbers (data) {
  return request({
    url: '/wabametaGetWABAPhoneNumbers',
    method: 'post',
    data
  })
}

export function ObterPerfil (data) {
  return request({
    url: '/wabametaGetProfile',
    method: 'post',
    data
  })
}

export function AtualizarPerfil (data) {
  return request({
    url: '/wabametaUpdateProfile',
    method: 'post',
    data
  })
}

export function ConfigurarSIP (data) {
  return request({
    url: '/wabametaConfigureSIP',
    method: 'post',
    data
  })
}

export function EnviarCTAURLWaba (data) {
  return requestMidia({
    url: '/wabametaCTAURL/',
    method: 'post',
    data
  })
}

export function EnviarFlowWaba (data) {
  return requestMidia({
    url: '/wabametaFlow/',
    method: 'post',
    data
  })
}

export function EnviarReplyButtonsWaba (data) {
  return requestMidia({
    url: '/wabametaReplyButtons/',
    method: 'post',
    data
  })
}

export function EnviarAddressWaba (data) {
  return requestMidia({
    url: '/wabametaAddress/',
    method: 'post',
    data
  })
}

export function EnviarLocationRequestWaba (data) {
  return requestMidia({
    url: '/wabametaLocationRequest/',
    method: 'post',
    data
  })
}

export function EnviarLocationWaba (data) {
  return requestMidia({
    url: '/wabametaLocation/',
    method: 'post',
    data
  })
}
