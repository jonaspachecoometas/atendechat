import request from 'src/service/request.js';

export function ListarAssistentes(tenantId) {
  return request({
    url: `/vapiAssistants/${tenantId}`,
    method: 'get',
  });
}

export function ListarNumerosDeTelefone(tenantId) {
  return request({
    url: `/vapiPhoneNumbers/${tenantId}`,
    method: 'get',
  });
}

export function CriarChamada(tenantId, customers, assistantId, phoneNumberId) {
  return request({
    url: `/vapiCall/${tenantId}`,
    method: 'post',
    data: {
      customers,
      assistantId,
      phoneNumberId
    }
  });
} 