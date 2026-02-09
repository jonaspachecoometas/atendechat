import request from 'src/service/request.js'

export function EnviarEmail (data) {
  return request({
    url: `/email/`,
    method: 'post',
    data
  }).then(response => {
    // Se a resposta não tem sucesso, lança um erro
    if (!response.data || response.data.success !== true) {
      throw {
        response: {
          data: response.data || {
            success: false,
            error: 'Erro ao enviar email',
            details: 'Resposta inválida do servidor'
          }
        }
      }
    }
    return response
  }).catch(error => {
    // Se o erro já tem uma resposta formatada, apenas propaga
    if (error.response?.data) {
      throw error
    }
    
    // Se não tem resposta formatada, cria uma
    throw {
      response: {
        data: {
          success: false,
          error: 'Erro ao enviar email',
        //   details: error.message || 'Erro desconhecido'
        }
      }
    }
  })
}

export function EnviarEmailComTemplate (data) {
  return request({
    url: `/email/template/`,
    method: 'post',
    data
  }).then(response => {
    // Se a resposta não tem sucesso, lança um erro
    if (!response.data || response.data.success !== true) {
      throw {
        response: {
          data: response.data || {
            success: false,
            error: 'Erro ao enviar email com template',
            details: 'Resposta inválida do servidor'
          }
        }
      }
    }
    return response
  }).catch(error => {
    // Se o erro já tem uma resposta formatada, apenas propaga
    if (error.response?.data) {
      throw error
    }
    
    // Se não tem resposta formatada, cria uma
    throw {
      response: {
        data: {
          success: false,
          error: 'Erro ao enviar email com template',
        //   details: error.message || 'Erro desconhecido'
        }
      }
    }
  })
}

export function EnviarEmailComConfiguracoes (data) {
    // Extrai apenas os dados necessários do email
    const emailData = {
      to: data.to,
      subject: data.subject,
      text: data.text
    };

    return request({
      url: `/emailTenant/`,
      method: 'post',
      data: emailData
    }).then(response => {
      // Se a resposta não tem sucesso, lança um erro
      if (!response.data || response.data.success !== true) {
        throw {
          response: {
            data: response.data || {
              success: false,
              error: 'Erro ao enviar email com configurações',
              details: 'Resposta inválida do servidor'
            }
          }
        }
      }
      return response
    }).catch(error => {
      // Se o erro já tem uma resposta formatada, apenas propaga
      if (error.response?.data) {
        throw error
      }
      
      // Se não tem resposta formatada, cria uma
      throw {
        response: {
          data: {
            success: false,
            error: 'Erro ao enviar email com configurações',
            // details: error.message || 'Erro desconhecido'
          }
        }
      }
    })
}