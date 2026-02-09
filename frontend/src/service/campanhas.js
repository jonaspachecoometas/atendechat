import request from 'src/service/request.js'

export function CriarCampanha (data) {
  return request({
    url: '/campaigns/',
    method: 'post',
    data
  })
}

export function RelatorioDetalhadoCampanha(campaignId) {
  return request({
    url: `/campaigns/${campaignId}/report`,
    method: "get",
  });
}

export function DuplicarCampanha(campaignId) {
  return request({
    url: `/campaigns/${campaignId}/duplicate`,
    method: 'post'
  });
}

export function IniciarCampanha (campaignId) {
  return request({
    url: `/campaigns/start/${campaignId}/`,
    method: 'post',
    data: {
      campaignId
    }
  })
}

export function CancelarCampanha (campaignId) {
  return request({
    url: `/campaigns/cancel/${campaignId}/`,
    method: 'post',
    data: {
      campaignId
    }
  })
}

export function PularMensagemCampanha (campaignId) {
  return request({
    url: `/campaigns-skip-message/${campaignId}/`,
    method: 'post',
    data: {
      campaignId
    }
  })
}

export function ListarCampanhas (page = 1, limit = 15) {
  return request({
    url: '/campaigns/',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

export function AlterarCampanha (data, id) {
  return request({
    url: `/campaigns/${id}`,
    method: 'put',
    data
  })
}

export function DeletarCampanha (data) {
  return request({
    url: `/campaigns/${data.id}`,
    method: 'delete'
  })
}

export function AdicionarContatosCampanha (data, campaignId) {
  return request({
    url: `/campaigns/contacts/${campaignId}/`,
    method: 'post',
    data
  })
}

export function ListarContatosCampanha (campaignId) {
  return request({
    url: `/campaigns/contacts/${campaignId}/`,
    method: 'get',
    params: {
      campaignId
    }
  })
}

export function DeletarContatoCampanha (campaignId, contactId) {
  return request({
    url: `/campaigns/contacts/${campaignId}/${contactId}/`,
    method: 'delete',
    params: {
      campaignId,
      contactId
    }
  })
}

export function DeletarTodosContatosCampanha (campaignId) {
  return request({
    url: `/campaigns/deleteall/contacts/${campaignId}/`,
    method: 'delete',
    params: {
      campaignId
    }
  })
}

export function AtualizarAckContatosCampanha (campaignId) {
  return request({
    url: `/campaigns/contactsAck/${campaignId}/`,
    method: 'put'
  })
}
