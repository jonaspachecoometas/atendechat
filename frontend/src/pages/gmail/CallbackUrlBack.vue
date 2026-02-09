<template>
  <div class="gmail-callback-page">
    <div class="callback-container">
      <!-- Loading State -->
      <div v-if="loading" class="text-center">
        <q-spinner-dots size="50px" color="primary" />
        <div class="text-h6 q-mt-md">{{ $t('gmailCallback.processing') || 'Processando autorização Gmail...' }}</div>
        <div class="text-body2 q-mt-sm">{{ $t('gmailCallback.waitMessage') || 'Aguarde enquanto processamos sua autorização Gmail OAuth2.' }}</div>
      </div>

      <!-- Success State -->
      <div v-else-if="success" class="text-center">
        <q-icon name="check_circle" size="80px" color="positive" />
        <div class="text-h5 text-positive q-mt-md">{{ $t('gmailCallback.title') || '✅ Autorização Gmail Concluída!' }}</div>
        <div class="text-body1 q-mt-sm">
          {{ $t('gmailCallback.message') || 'Sua conta Gmail foi configurada com sucesso para OAuth2.' }}
        </div>
        
        <div class="q-mt-lg">
          <q-card class="q-pa-md">
            <div class="text-subtitle1 q-mb-sm">{{ $t('gmailCallback.infoSession') }}</div>
            <div class="text-body2">
              <div><strong>{{ $t('gmailCallback.whatsappId') || 'WhatsApp ID:' }}</strong> {{ whatsappId }}</div>
              <div><strong>{{ $t('gmailCallback.status') || 'Status:' }}</strong> <span class="text-positive">✅ Configurado</span></div>
              <div><strong>{{ $t('gmailCallback.data') || 'Data:' }}</strong> {{ currentDate }}</div>
            </div>
          </q-card>
        </div>

        <div class="q-mt-lg">
          <q-btn 
            color="primary" 
            :label="$t('gmailCallback.closeWindow') || 'Fechar Janela'" 
            @click="closeWindow"
            icon="close"
            size="lg"
          />
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center">
        <q-icon name="error" size="80px" color="negative" />
        <div class="text-h5 text-negative q-mt-md">{{ $t('gmailCallback.errorTitle') || '❌ Erro na Autorização' }}</div>
        <div class="text-body1 q-mt-sm">
          {{ errorMessage }}
        </div>
        
        <div class="q-mt-lg">
          <q-card class="q-pa-md">
            <div class="text-subtitle1 q-mb-sm">{{ $t('gmailCallback.debugInfo') || 'Informações de Debug:' }}</div>
            <div class="text-body2">
              <div><strong>{{ $t('gmailCallback.fullUrl') || 'URL Completa:' }}</strong> {{ currentUrl }}</div>
              <div><strong>{{ $t('gmailCallback.parameters') || 'Parâmetros:' }}</strong> {{ urlParams }}</div>
            </div>
          </q-card>
        </div>

        <div class="q-mt-lg">
          <q-btn 
            color="negative" 
            :label="$t('gmailCallback.retry') || 'Tentar Novamente'" 
            @click="retryAuth"
            icon="refresh"
            size="lg"
          />
          <q-btn 
            color="secondary" 
            :label="$t('gmailCallback.closeWindow') || 'Fechar Janela'" 
            @click="closeWindow"
            icon="close"
            class="q-ml-sm"
            size="lg"
          />
        </div>
      </div>

      <!-- Default State -->
      <div v-else class="text-center">
        <q-icon name="help" size="80px" color="grey" />
        <div class="text-h5 q-mt-md">{{ $t('gmailCallback.callbackTitle') || 'Callback Gmail' }}</div>
        <div class="text-body1 q-mt-sm">
          {{ $t('gmailCallback.waitingMessage') || 'Aguardando processamento da autorização...' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveGmailOAuth2Tokens } from 'src/service/gmailOAuth2.js'

export default {
  name: 'GmailCallbackUrlBack',
  data() {
    return {
      loading: true,
      success: false,
      error: false,
      errorMessage: '',
      whatsappId: '',
      currentDate: '',
      currentUrl: '',
      urlParams: '',
      // Sistema de gerenciamento de memória
      timers: []
    }
  },
  
  async mounted() {
    this.processCallback();
  },
  
  methods: {
    async processCallback() {
      try {
        // Extrair parâmetros manualmente da URL
        const url = window.location.href
        const hashIndex = url.indexOf('#')
        const queryIndex = url.indexOf('?', hashIndex)
        
        if (queryIndex === -1) {
          console.warn('No parameters found in URL')
          this.errorMessage = this.$t('gmailCallback.noParametersFound') || 'Nenhum parâmetro encontrado na URL'
          this.error = true
          this.loading = false
          return
        }
        
        const queryString = url.substring(queryIndex + 1)
        
        // Decodificar e parsear manualmente
        const decodedQuery = decodeURIComponent(queryString)
        
        const params = new URLSearchParams(decodedQuery)
        const code = params.get('code')
        const error = params.get('error')
        const state = params.get('state') // WhatsApp ID
        
        if (error) {
          console.error(this.$t('gmailCallback.authorizationError'), error)
          this.errorMessage = this.$t('gmailCallback.authorizationError') || `Erro na autorização: ${error}`
          this.error = true
          this.loading = false
          return
        }
        
        if (!code) {
          console.warn(this.$t('gmailCallback.codeNotFound'))
          this.errorMessage = this.$t('gmailCallback.codeNotFound') || 'Código de autorização não encontrado'
          this.error = true
          this.loading = false
          return
        }
        
        if (!state) {
          console.warn(this.$t('gmailCallback.whatsappIdNotFound'))
          this.errorMessage = this.$t('gmailCallback.whatsappIdNotFound') || 'ID do WhatsApp não encontrado'
          this.error = true
          this.loading = false
          return
        }
        
        this.whatsappId = state
        this.currentDate = new Date().toLocaleDateString()
        this.currentUrl = url
        this.urlParams = queryString
        
        try {
          // Usar o serviço para salvar os tokens
          const result = await saveGmailOAuth2Tokens(code, state)
          
          if (result.success) {
            this.success = true
            this.loading = false
          } else {
            console.error('Erro ao salvar tokens:', result)
            this.errorMessage = this.$t('gmailCallback.saveTokensError') || `Erro ao salvar tokens: ${result.message || 'Erro desconhecido'}`
            this.error = true
            this.loading = false
          }
          
        } catch (saveError) {
          console.error('Erro ao salvar tokens:', saveError)
          this.errorMessage = this.$t('gmailCallback.saveTokensError') || `Erro ao salvar tokens: ${saveError.message}`
          this.error = true
          this.loading = false
        }
        
      } catch (error) {
        console.error('Error processing authorization:', error)
        this.errorMessage = this.$t('gmailCallback.processAuthorizationError') || `Erro ao processar autorização: ${error.message}`
        this.error = true
        this.loading = false
      }
    },
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
    closeWindow() {
      window.close();
    },
    retryAuth() {
      this.loading = true;
      this.success = false;
      this.error = false;
      this.errorMessage = '';
      this.whatsappId = '';
      this.currentDate = '';
      this.currentUrl = '';
      this.urlParams = '';
      // Reprocessar a autorização
      this.processCallback();
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
.gmail-callback-page {
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
