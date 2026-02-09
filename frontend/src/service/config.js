// Configuration Service
// Gerencia as configurações da aplicação e variáveis de ambiente

class ConfigService {
  constructor() {
    this.config = {
      URL_API: process.env.URL_API || 'http://localhost:3101',
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
      USUARIO_API: process.env.USUARIO_API,
      SENHA_API: process.env.SENHA_API
    };
    
    console.log('ConfigService initialized with:', this.config);
  }

  // Retorna a URL da API
  getApiUrl() {
    return this.config.URL_API;
  }

  // Retorna a URL completa para um endpoint específico
  getApiEndpoint(endpoint) {
    return `${this.config.URL_API}${endpoint}`;
  }

  // Retorna a URL de callback para OAuth2
  getOAuthCallbackUrl(provider = 'gmail') {
    const baseUrl = window.location.origin;
    if (provider === 'gmail') {
      return `${baseUrl}/gmail/callbackUrlBack`;
    }
    return `${baseUrl}/#/auth/${provider}/callback`;
  }

  // Retorna a URL de callback completa com parâmetros
  getOAuthCallbackUrlWithParams(provider = 'gmail', params = '') {
    const callbackUrl = this.getOAuthCallbackUrl(provider);
    return `${callbackUrl}${params}`;
  }

  // Retorna a URL de redirecionamento após OAuth2
  getOAuthRedirectUrl(provider = 'gmail') {
    const baseUrl = window.location.origin;
    if (provider === 'gmail') {
      return `${baseUrl}/#/gmail/callbackUrlBack`;
    }
    return `${baseUrl}/#/auth/${provider}/callbackUrlBack`;
  }

  // Retorna a URL de redirecionamento com parâmetros
  getOAuthRedirectUrlWithParams(provider = 'gmail', params = '') {
    const redirectUrl = this.getOAuthRedirectUrl(provider);
    return `${redirectUrl}${params}`;
  }

  // Atualiza uma configuração
  updateConfig(key, value) {
    this.config[key] = value;
    console.log(`Config updated: ${key} = ${value}`);
  }

  // Retorna todas as configurações
  getAllConfig() {
    return { ...this.config };
  }
}

// Instância singleton
const configService = new ConfigService();

export default configService;
