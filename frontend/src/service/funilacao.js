import request from 'src/service/request.js'

export function CriarPipelineAction (data) {
  return request({
    url: '/pipeline-actions',
    method: 'post',
    data
  })
}

export function ListarPipelineActions (filters = {}) {
  return request({
    url: '/pipeline-actions',
    method: 'get',
    params: {
      page: filters.page || 1,
      limit: filters.limit || 10,
      orderBy: filters.orderBy,
      orderDirection: filters.orderDirection,
      pipelineId: filters.pipelineId,
      stageId: filters.stageId,
      whatsappId: filters.whatsappId,
      actionType: filters.actionType,
      active: filters.active,
      searchTerm: filters.searchTerm,
      ordenacao: filters.ordenacao
    }
  })
}

export function BuscarPipelineAction (id) {
  return request({
    url: `/pipeline-actions/${id}`,
    method: 'get'
  })
}

export function AlterarPipelineAction (data) {
  return request({
    url: `/pipeline-actions/${data.id}`,
    method: 'put',
    data
  })
}

export function DeletarPipelineAction (id) {
  return request({
    url: `/pipeline-actions/${id}`,
    method: 'delete'
  })
}

export function ToggleActivePipelineAction (id) {
  return request({
    url: `/pipeline-actions/${id}/toggle-active`,
    method: 'put'
  })
}

export function ListarPipelineActionsByPipeline (pipelineId) {
  return request({
    url: `/pipeline-actions/pipeline/${pipelineId}`,
    method: 'get'
  })
}

export function ListarPipelineActionsByStage (stageId) {
  return request({
    url: `/pipeline-actions/stage/${stageId}`,
    method: 'get'
  })
}

export function ListarPipelineActionLogs (tenantId, page = 1) {
  return request({
    url: `/pipeline-action-log/tenant/${tenantId}`,
    method: 'get',
    params: {
      page
    }
  })
}

export function CriarPipelineActionsSequential (data) {
  return request({
    url: '/pipeline-actions/sequential',
    method: 'post',
    data
  })
} 