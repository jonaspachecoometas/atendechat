import request from 'src/service/request.js'

export function startGmailOAuth2(whatsappId) {
  return request({
    url: `/gauth/gmail/${whatsappId}/start`,
    method: 'get'
  })
}

export function handleGmailOAuth2Callback(code, whatsappId) {
  return request({
    url: `/gauth/gmail/callback?code=${code}&whatsappId=${whatsappId}`,
    method: 'get'
  })
}

export function refreshGmailToken(whatsappId, refreshToken) {
  return request({
    url: `/gauth/gmail/${whatsappId}/refresh`,
    method: 'post',
    data: {
      refresh_token: refreshToken
    }
  })
}

export function verifyGmailToken(whatsappId, accessToken) {
  return request({
    url: `/gauth/gmail/${whatsappId}/verify?token=${accessToken}`,
    method: 'get'
  })
}

export function getGmailUserInfo(whatsappId, accessToken) {
  return request({
    url: `/gauth/gmail/${whatsappId}/userinfo?token=${accessToken}`,
    method: 'get'
  })
}

export function getGmailOAuth2Url(whatsappId) {
  const apiUrl = process.env.URL_API || 'http://localhost:3101';
  return `${apiUrl}/gauth/gmail/${whatsappId}/start`;
}

export function getGmailCallbackUrl() {
  const baseUrl = window.location.origin;
  return `${baseUrl}/gmail/callbackUrlBack`;
}

export function getGmailCallbackUrlWithParams(params = '') {
  const callbackUrl = getGmailCallbackUrl();
  return `${callbackUrl}${params}`;
}

export function getGmailRedirectUrl() {
  const baseUrl = window.location.origin;
  return `${baseUrl}/#/gmail/callbackUrlBack`;
}

export function getGmailRedirectUrlWithParams(params = '') {
  const redirectUrl = getGmailRedirectUrl();
  return `${redirectUrl}${params}`;
}

export function buildGmailRedirectUrlFromCurrentLocation() {
  const currentParams = window.location.search;
  return getGmailRedirectUrlWithParams(currentParams);
}

export function redirectToGmailCallback() {
  const redirectUrl = getGmailRedirectUrlWithParams(window.location.search);
  window.location.href = redirectUrl;
}

export function saveGmailOAuth2Tokens(code, state) {
  // Usar fetch diretamente porque esta rota não requer autenticação
  // e pode ser chamada de uma página de callback
  let apiUrl = process.env.URL_API;
  
  // Se URL_API não estiver disponível, tentar diferentes estratégias
  if (!apiUrl || apiUrl === 'undefined' || apiUrl === '') {
    // Estratégia 1: Em desenvolvimento, tentar usar proxy '/api'
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      // Tentar porta padrão do backend primeiro
      apiUrl = window.location.origin.replace(/:\d+/, ':3101');
    } else {
      // Em produção, usar a mesma origem (backend e frontend no mesmo domínio)
      // Isso funciona quando há um proxy reverso (nginx, etc.) que roteia /api para o backend
      apiUrl = window.location.origin;
    }
  }
  
  // Se URL_API for relativa (começa com /), usar como proxy
  if (apiUrl && apiUrl.startsWith('/')) {
    apiUrl = window.location.origin + apiUrl;
  }
  
  // Garantir que a URL não tenha barra no final
  apiUrl = apiUrl.replace(/\/$/, '');
  
  const endpoint = `${apiUrl}/gauth/gmail/save-tokens`;
  
  console.log('Tentando salvar tokens OAuth2:', { 
    endpoint, 
    apiUrl,
    urlApiEnv: process.env.URL_API,
    code: code ? 'presente' : 'ausente', 
    state,
    origin: window.location.origin
  });
  
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: code,
      state: state
    })
  }).then(async (response) => {
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro ao salvar tokens:', { 
        status: response.status, 
        statusText: response.statusText, 
        errorText,
        endpoint
      });
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
    }
    return response.json();
  });
}
