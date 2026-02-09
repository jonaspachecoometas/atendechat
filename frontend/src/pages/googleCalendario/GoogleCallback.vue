<template>
  <div class="google-callback-page">
    <div class="callback-container">
      <q-spinner-dots size="50px" color="primary" />
      <div class="text-h6 q-mt-md">{{ $t('googleCallback.processing') }}</div>
      <div class="text-body2 q-mt-sm">{{ $t('googleCallback.waitMessage') }}</div>
    </div>
  </div>
</template>

<script>
import { TrocarCodigoPorTokens, ListarConfiguracoesGoogleCalendar, AtualizarConfiguracaoGoogleCalendar } from 'src/service/googleCalendar.js'

export default {
  name: 'GoogleCallback',
  data() {
    return {
      processing: true,
      // Sistema de gerenciamento de memória
      timers: []
    }
  },
  
  async mounted() {
    try {
      // Extrair parâmetros manualmente da URL
      const url = window.location.href
      const hashIndex = url.indexOf('#')
      const queryIndex = url.indexOf('?', hashIndex)
      
      if (queryIndex === -1) {
        console.warn('No parameters found in URL')
        this.redirectToGoogleCalendar()
        return
      }
      
      const queryString = url.substring(queryIndex + 1)
      
      // Decodificar e parsear manualmente
      const decodedQuery = decodeURIComponent(queryString)
      
      const params = new URLSearchParams(decodedQuery)
      const code = params.get('code')
      const error = params.get('error')
      const state = params.get('state') // Nome da configuração
      
      console.log('GoogleCallback - Parâmetros recebidos:', { code, error, state })
      
      if (error) {
        console.error('Authorization error:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('googleCallback.errors.authorization', { error })
        })
        this.redirectToGoogleCalendar()
        return
      }
      
      if (!code) {
        console.warn('Authorization code not found')
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCallback.errors.codeNotFound')
        })
        this.redirectToGoogleCalendar()
        return
      }
      
      if (!state) {
        console.warn('State (nome da configuração) não encontrado')
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCallback.errors.configNameNotFound')
        })
        this.redirectToGoogleCalendar()
        return
      }
      
      // Buscar a configuração pelo nome (state)
      console.log('Buscando configuração com nome:', state)
      const configResponse = await ListarConfiguracoesGoogleCalendar()
      
      if (!configResponse.data || !configResponse.data.configs || configResponse.data.configs.length === 0) {
        console.error('Nenhuma configuração encontrada')
        this.$q.notify({
          type: 'negative',
          message: this.$t('googleCallback.errors.noConfigFound')
        })
        this.redirectToGoogleCalendar()
        return
      }
      
      const currentConfig = configResponse.data.configs.find(config => config.name === state)
      
      if (!currentConfig) {
        console.error('Configuração não encontrada para o nome:', state)
        this.$q.notify({
          type: 'negative',
          message: this.$t('googleCallback.errors.configNotFoundForName', { name: state })
        })
        this.redirectToGoogleCalendar()
        return
      }
      
      console.log('Configuração encontrada:', currentConfig)
      
      // Trocar código por tokens
      const tokenResponse = await TrocarCodigoPorTokens({
        code,
        clientId: currentConfig.googleClientId,
        clientSecret: currentConfig.googleClientSecret
      })
      
      console.log('Tokens obtidos:', tokenResponse.data)
      
      if (!tokenResponse.data || !tokenResponse.data.accessToken || !tokenResponse.data.refreshToken) {
        console.error('Tokens inválidos na resposta')
        this.$q.notify({
          type: 'negative',
          message: this.$t('googleCallback.errors.invalidTokens')
        })
        this.redirectToGoogleCalendar()
        return
      }
      
      // Atualizar a configuração no banco com os tokens
      console.log('Atualizando configuração no banco...')
      try {
        await AtualizarConfiguracaoGoogleCalendar(currentConfig.id, {
          name: currentConfig.name,
          googleClientId: currentConfig.googleClientId,
          googleClientSecret: currentConfig.googleClientSecret,
          googleAccessToken: tokenResponse.data.accessToken,
          googleRefreshToken: tokenResponse.data.refreshToken,
          isActive: true
        })
        
        console.log('Configuração atualizada com sucesso!')
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('googleCallback.success.authorizationCompleted')
        })
        
        // Redirecionar para Google Calendar
        console.log('Redirecionando para /google-calendar...')
        this.redirectToGoogleCalendar()
      } catch (updateError) {
        console.error('Erro ao atualizar configuração:', updateError)
        this.$q.notify({
          type: 'negative',
          message: this.$t('googleCallback.errors.saveTokensError', { 
            error: updateError.response?.data?.error || updateError.message 
          })
        })
        this.redirectToGoogleCalendar()
      }
      
    } catch (error) {
      console.error('Error processing authorization:', error)
      this.$q.notify({
        type: 'negative',
        message: this.$t('googleCallback.errors.processAuthorizationError', { 
          error: error.response?.data?.error || error.message 
        })
      })
      this.redirectToGoogleCalendar()
    }
  },
  
  methods: {
    // Sistema de gerenciamento de memória
    addTimer(timerId) {
      this.timers.push(timerId);
    },
    clearAllTimers() {
      this.timers.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      this.timers = [];
    },
    cleanupMemory() {
      this.clearAllTimers();
    },
    redirectToGoogleCalendar() {
      const timerId = setTimeout(() => {
        this.$router.push('/configuracoes/google-calendar')
      }, 2000)
      this.addTimer(timerId);
    }
  },
  
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
  }
}
</script>

<style lang="scss" scoped>
.google-callback-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.callback-container {
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style> 
