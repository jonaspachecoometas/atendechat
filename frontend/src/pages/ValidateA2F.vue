<template>
  <div class="container">
    <div class="login-section fixed-layout">
      <q-layout class="vertical-center full-width">
        <q-page-container>
          <q-page class="flex justify-center items-center login-page">
            <q-ajax-bar position="top" color="primary" size="5px" />
            <div class="login-content">
              <div class="logo-language-row">
                <img
                  :src="logoPath"
                  class="logo-image"
                  alt="Logo"
                  @error="onLogoError"
                />
              </div>
              <q-separator spaced />
              <div class="text-primary">
                <div class="text-h6 login-title">{{ $t('validateA2F.title') }}</div>
                <div class="text-caption text-grey-5 q-mb-md">
                  {{ $t('validateA2F.message', { channel: a2fChannel }) }}
                </div>
                <div class="timer-container q-mb-md" v-if="timeRemaining > 0">
                  <q-icon name="mdi-clock-outline" size="16px" class="q-mr-xs" />
                  <span class="timer-text">{{ $t('validateA2F.timeRemaining', { time: formattedTime }) }}</span>
                </div>
                <div class="timer-container q-mb-md" v-else>
                  <q-icon name="mdi-alert-circle-outline" size="16px" class="q-mr-xs" color="negative" />
                  <span class="timer-text text-negative">{{ $t('validateA2F.codeExpired') }}</span>
                </div>
                <div class="input-label">{{ $t('validateA2F.codeLabel') }}</div>
                <q-input
                  dark
                  :color="$q.dark.isActive ? 'white' : 'white'"
                  :input-style="{ color: 'white' }"
                  class="dark-input"
                  outlined
                  v-model="a2fCode"
                  :placeholder="$t('validateA2F.codePlaceholder')"
                  @keypress.enter="validateCode"
                  :error="!!error"
                  :error-message="error"
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="mdi-numeric"
                      class="cursor-pointer"
                      color='primary'
                    />
                  </template>
                </q-input>
                <div class="buttons-container">
                  <q-btn
                    class="login-button"
                    :loading="loading"
                    @click="validateCode"
                    unelevated
                  >
                    {{ $t('validateA2F.validateButton') }}
                    <template #loading>
                      <q-spinner-puff class="on-left" />{{ $t('validateA2F.validating') }}
                    </template>
                  </q-btn>
                  <q-btn
                    flat
                    class="resend-button"
                    @click="resendCode"
                    :disable="resending || canResend === false"
                    :loading="resending"
                  >
                    <span v-if="canResend === false && resendCooldown > 0">
                      {{ $t('validateA2F.resendCooldown', { seconds: resendCooldown }) }}
                    </span>
                    <span v-else>
                      {{ $t('validateA2F.resendCode') }}
                    </span>
                  </q-btn>
                </div>
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
    <div class="video-container">
      <video
        autoplay
        muted
        loop
        playsinline
        preload="metadata"
        style="width: 100%; height: auto; object-fit: cover; "
      >
        <source src="../assets/110694.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
import { ValidateA2F, ResendA2F } from 'src/service/login.js'
import { Notify, Dark } from 'quasar'
import { socketIO, connectWithToken, ensureConnectedFromStorage } from 'src/utils/socket.js'

const socket = socketIO()

const pesquisaTicketsFiltroPadrao = {
  searchParam: '',
  pageNumber: 1,
  status: ['open', 'pending'],
  showAll: false,
  count: null,
  queuesIds: [],
  whatsappIds: [],
  selectedUser: [],
  withUnreadMessages: false,
  isNotAssignedUser: false,
  includeNotQueueDefined: true
}

export default {
  name: 'ValidateA2F',
  data () {
    return {
      a2fCode: '',
      loading: false,
      resending: false,
      error: '',
      pendingSessionId: null,
      email: null,
      a2fChannel: 'email',
      logoPath: '/logo_dark.png',
      logoError: false,
      codeSentAt: null, // Timestamp de quando o código foi enviado
      timeRemaining: 300, // 5 minutos em segundos
      timerInterval: null,
      lastResendAt: null, // Timestamp do último reenvio
      resendCooldown: 0, // Cooldown em segundos
      resendCooldownInterval: null
    }
  },
  mounted () {
    // Recuperar dados da sessão pendente
    const pendingData = sessionStorage.getItem('pendingA2F')
    if (pendingData) {
      try {
        const data = JSON.parse(pendingData)
        this.pendingSessionId = data.pendingSessionId
        this.email = data.email
        this.a2fChannel = data.channel || 'email'
        
        // Recuperar timestamp de quando o código foi enviado
        this.codeSentAt = data.codeSentAt ? new Date(data.codeSentAt) : new Date()
        this.lastResendAt = data.lastResendAt ? new Date(data.lastResendAt) : null
        
        // Calcular tempo restante
        this.updateTimeRemaining()
        
        // Iniciar timer
        this.startTimer()
        this.startResendCooldown()
      } catch (e) {
        console.error('Erro ao recuperar dados pendentes:', e)
        this.$router.push('/login')
      }
    } else {
      // Se não houver dados pendentes, redirecionar para login
      this.$router.push('/login')
    }
  },
  beforeUnmount () {
    // Limpar intervalos ao sair do componente
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }
    if (this.resendCooldownInterval) {
      clearInterval(this.resendCooldownInterval)
    }
  },
  computed: {
    formattedTime () {
      const minutes = Math.floor(this.timeRemaining / 60)
      const seconds = this.timeRemaining % 60
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    },
    canResend () {
      return this.resendCooldown === 0
    }
  },
  methods: {
    updateTimeRemaining () {
      if (!this.codeSentAt) return
      
      const now = new Date()
      const elapsed = Math.floor((now - this.codeSentAt) / 1000) // segundos
      this.timeRemaining = Math.max(0, 300 - elapsed) // 5 minutos = 300 segundos
      
      // Se expirou, redirecionar para login após alguns segundos
      if (this.timeRemaining === 0) {
        this.$q.notify({
          message: this.$t('validateA2F.codeExpired'),
          color: "negative",
          position: "top"
        })
        setTimeout(() => {
          this.$router.push('/login')
        }, 3000)
      }
    },
    startTimer () {
      this.timerInterval = setInterval(() => {
        this.updateTimeRemaining()
      }, 1000)
    },
    updateResendCooldown () {
      if (!this.lastResendAt) {
        this.resendCooldown = 0
        return
      }
      
      const now = new Date()
      const elapsed = Math.floor((now - this.lastResendAt) / 1000) // segundos
      this.resendCooldown = Math.max(0, 60 - elapsed) // 1 minuto = 60 segundos
    },
    startResendCooldown () {
      this.updateResendCooldown()
      this.resendCooldownInterval = setInterval(() => {
        this.updateResendCooldown()
      }, 1000)
    },
    async validateCode () {
      if (!this.a2fCode || this.a2fCode.length !== 6) {
        this.error = this.$t('validateA2F.invalidCode')
        return
      }

      this.loading = true
      this.error = ''

      try {
        const response = await ValidateA2F({
          pendingSessionId: this.pendingSessionId,
          a2fCode: this.a2fCode,
          email: this.email
        })

        if (response.status === 200) {
          // Limpar dados pendentes
          sessionStorage.removeItem('pendingA2F')
          
          // Processar dados de login diretamente (sem chamar UserLogin que tenta fazer login novamente)
          const data = response.data
          
          try {
            // Salvar dados no localStorage
            localStorage.setItem('token', JSON.stringify(data.token))
            localStorage.setItem('username', data.username)
            localStorage.setItem('profile', data.profile)
            localStorage.setItem('userId', data.userId)
            localStorage.setItem('usuario', JSON.stringify(data))
            localStorage.setItem('queues', JSON.stringify(data.queues || []))
            localStorage.setItem('bloquearWavoip', JSON.stringify(data.blockWavoip || false))
            localStorage.setItem('whatsappAllowed', JSON.stringify(data.whatsappAllowed || []))
            localStorage.setItem('filtrosAtendimento', JSON.stringify(pesquisaTicketsFiltroPadrao))

            if (data?.configs?.filtrosAtendimento) {
              localStorage.setItem('filtrosAtendimento', JSON.stringify(data.configs.filtrosAtendimento))
            }
            if (data?.configs?.isDark) {
              Dark.set(data.configs.isDark)
            }
            
            // Commitar mutations do store
            // Agora que o módulo user tem namespaced: true, podemos usar o namespace
            this.$store.commit('user/SET_IS_SUPORTE', data)
            this.$store.commit('user/SET_IS_ADMIN', data)

            // Garantir conexão do socket após login
            try {
              connectWithToken(data.token)
            } catch (_) {
              try { ensureConnectedFromStorage() } catch (_) {}
            }

            socket.emit(`${data.tenantId}:setUserActive`)

            // Notificação de sucesso
            Notify.create({
              type: 'positive',
              message: 'Login sucess!',
              position: 'top',
              progress: true
            })

            // Redirecionar baseado no perfil
            if (data.profile === 'admin' || data.profile === 'super') {
              this.$router.push({ name: 'home' })
            } else if (data.profile === 'superadmin') {
              this.$router.push({ name: 'assinatura' })
            } else {
              this.$router.push({ name: 'atendimento' })
            }
            
            this.loading = false
          } catch (err) {
            console.error('Erro ao processar dados de login:', err)
            this.loading = false
            this.$q.notify({
              message: this.$t('validateA2F.loginError'),
              color: "negative",
            })
          }
        }
      } catch (error) {
        console.error('Erro ao validar código 2FA:', error)
        this.loading = false
        const serverData = error && error.response ? error.response.data : null
        let errorMessage = this.$t('validateA2F.validationError')
        
        if (serverData) {
          if (serverData.error === 'ERR_INVALID_A2F_CODE') {
            errorMessage = this.$t('validateA2F.invalidCodeError')
          } else if (serverData.error === 'ERR_A2F_CODE_EXPIRED') {
            errorMessage = this.$t('validateA2F.expiredCodeError')
          } else if (serverData.error === 'ERR_INVALID_SESSION') {
            errorMessage = this.$t('validateA2F.invalidSessionError')
            // Redirecionar para login após alguns segundos
            setTimeout(() => {
              this.$router.push('/login')
            }, 3000)
          } else if (serverData.message) {
            errorMessage = serverData.message
          }
        }
        
        this.error = errorMessage
        this.$q.notify({
          message: errorMessage,
          color: "negative",
        })
      }
    },
    async resendCode () {
      // Verificar cooldown
      if (this.resendCooldown > 0) {
        this.$q.notify({
          message: this.$t('validateA2F.resendCooldown', { seconds: this.resendCooldown }),
          color: "warning",
          position: "top"
        })
        return
      }

      if (!this.pendingSessionId || !this.email) {
        this.$q.notify({
          message: this.$t('validateA2F.invalidSessionError'),
          color: "negative",
        })
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
        return
      }

      this.resending = true
      this.error = ''

      try {
        const response = await ResendA2F({
          pendingSessionId: this.pendingSessionId,
          email: this.email
        })

        if (response.status === 200) {
          // Atualizar timestamp do código enviado
          this.codeSentAt = new Date()
          this.lastResendAt = new Date()
          this.timeRemaining = 300 // Resetar para 5 minutos
          
          // Atualizar sessionStorage
          const pendingData = {
            pendingSessionId: this.pendingSessionId,
            email: this.email,
            channel: this.a2fChannel,
            codeSentAt: this.codeSentAt.toISOString(),
            lastResendAt: this.lastResendAt.toISOString()
          }
          sessionStorage.setItem('pendingA2F', JSON.stringify(pendingData))
          
          // Reiniciar cooldown
          this.resendCooldown = 60
          this.startResendCooldown()
          
          this.$q.notify({
            message: response.data?.message || this.$t('validateA2F.codeResent'),
            color: "positive",
            position: "top",
            timeout: 3000
          })
        }
      } catch (error) {
        console.error('Erro ao reenviar código 2FA:', error)
        const serverData = error && error.response ? error.response.data : null
        let errorMessage = this.$t('validateA2F.resendError')
        
        if (serverData) {
          if (serverData.error === 'ERR_INVALID_SESSION') {
            errorMessage = this.$t('validateA2F.invalidSessionError')
            setTimeout(() => {
              this.$router.push('/login')
            }, 2000)
          } else if (serverData.error === 'ERR_RESEND_LIMIT') {
            errorMessage = this.$t('validateA2F.resendLimitError')
            this.resendCooldown = 60
            this.startResendCooldown()
          } else if (serverData.message) {
            errorMessage = serverData.message
          }
        }
        
        this.$q.notify({
          message: errorMessage,
          color: "negative",
        })
      } finally {
        this.resending = false
      }
    },
    onLogoError() {
      if (!this.logoError) {
        this.logoError = true
        this.logoPath = '/logo.png'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.login-section {
  width: 45%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.98), rgba(30, 30, 30, 0.95));
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  padding-right: 3rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.login-page {
  padding: 1rem 0;
  min-height: auto;
}

.login-content {
  max-width: 400px;
  width: 100%;
  text-align: center;
  padding: 1.5rem 2rem;
  background: rgba(40, 40, 40, 0.95);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.5s ease-out;
  margin: 1rem 0;
}

.video-container {
  display: flex;
  justify-content: flex-end;
  width: 55%;
  position: relative;
  overflow: hidden;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8) contrast(1.1);
  transition: transform 0.3s ease;
}

.logo-image {
  max-width: 60%;
  max-height: 37px;
  height: auto;
  width: auto;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  display: block;
  object-fit: contain;
}

.input-label {
  color: white;
  font-size: 14px;
  margin-bottom: 6px;
  text-align: left;
}

.q-input {
  margin-bottom: 0.75rem;
}

.dark-input .q-field__control {
  background: rgba(60, 60, 60, 0.8) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

.dark-input .q-field__native {
  color: white !important;
}

.dark-input .q-field__label {
  color: rgba(255, 255, 255, 0.7) !important;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
}

.login-button {
  width: 100%;
  max-width: 300px;
  height: 45px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%);
  color: white !important;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
  background: linear-gradient(90deg, #7C3AED 0%, #DB2777 100%);
}

.resend-button {
  color: white !important;
  margin-top: 0.5rem;
}

.text-primary {
  color: white !important;
}

.text-h6 {
  color: white !important;
  font-size: 1.1rem;
}

.login-title {
  text-align: left;
  margin-bottom: 0.5rem;
}

.timer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.timer-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.timer-container .q-icon {
  color: var(--q-primary);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .video-container {
    display: none;
  }
  
  .login-section {
    width: 100%;
    background: linear-gradient(135deg, rgba(20, 20, 20, 0.98), rgba(30, 30, 30, 0.95));
    padding-right: 1rem;
    align-items: center;
    justify-content: center;
  }
  
  .login-content {
    margin: 0 auto;
    padding: 1.5rem;
    max-width: 90%;
  }
}
</style>

