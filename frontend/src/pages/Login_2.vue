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
                <div class="language-selector">
                  <q-btn-dropdown
                    flat
                    dense
                    class="language-toggle"
                    dropdown-icon="expand_more"
                    menu-anchor="bottom right"
                    menu-self="top right"
                    content-class="language-menu"
                  >
                    <template #label>
                      <div class="language-toggle-label">
                        <q-avatar size="24px">
                          <img :src="currentLanguage.flag" :alt="currentLanguage.label" />
                        </q-avatar>
                        <span class="language-label">{{ currentLanguage.label }}</span>
                      </div>
                    </template>
                    <q-list>
                      <q-item
                        v-for="lang in languages"
                        :key="lang.code"
                        clickable
                        v-close-popup
                        @click="selectLanguage(lang.code)"
                      >
                        <q-item-section avatar>
                          <q-avatar size="24px">
                            <img :src="lang.flag" :alt="lang.label" />
                          </q-avatar>
                        </q-item-section>
                        <q-item-section>{{ lang.label }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
              </div>
              <q-separator spaced />
              <div class="text-primary">
                <div class="text-h6 login-title">{{ $t('login.welcome') }}</div>
                <div>
                  <div class="input-label">{{ $t('login.emailLabel') }}</div>
                  <q-input
                    dark
                    :color="$q.dark.isActive ? 'white' : 'white'"
                    :input-style="{ color: 'white' }"
                    class="dark-input email-input"
                    clearable
                    v-model="form.email"
                    :placeholder="$t('login.emailPlaceholder')"
                    @blur="touchEmail"
                    :error="!!(v$ && v$.form && v$.form.email && v$.form.email.$error)"
                    :error-message="$t('login.emailError')"
                    outlined
                    @keypress.enter="fazerLogin"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="mdi-email-outline"
                        class="cursor-pointer"
                        color='primary'
                      />
                    </template>
                  </q-input>

                  <div class="input-label" style="margin-top: -10px !important;">{{ $t('login.passwordLabel') }}</div>
                  <q-input
                    dark
                    :color="$q.dark.isActive ? 'white' : 'white'"
                    :input-style="{ color: 'white' }"
                    class="dark-input"
                    outlined
                    v-model="form.password"
                    :type="isPwd ? 'password' : 'text'"
                    @keypress.enter="fazerLogin"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="mdi-shield-key-outline"
                        class="cursor-pointer"
                        color='primary'
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                  
                  <div class="forgot-password-link-below">
                    <a href="#" @click.prevent="openPasswordResetModal" class="forgot-link">
                      {{ $t('login.forgotPassword') }}
                    </a>
                  </div>

                  <q-separator spaced style="margin: 0.75rem 0;" />
                </div>
                <div class="buttons-container">
                  <q-btn
                    class="login-button"
                    :loading="loading"
                    @click="fazerLogin"
                    unelevated
                  >
                    {{ $t('login.loginButton') }}
                    <template #loading>
                      <q-spinner-puff class="on-left" />{{ $t('login.loginLoading') }}
                    </template>
                  </q-btn>
                </div>
                <!-- <q-btn
                  @click="accountCreate"
                  color="negative"
                >
                  Criar Conta
                </q-btn> -->
              </div>
              <div class="integrations-section">
                <!-- <div class="integrations-label">{{ $t('login.integrateWith') }}</div> -->
                <div class="carousel-wrapper">
                  <div class="carousel-container">
                    <div class="carousel-track">
                      <div 
                        v-for="(logo, index) in [...logos, ...logos]" 
                        :key="`logo-${index}`"
                        class="carousel-item"
                      >
                        <img :src="`/${logo}`" :alt="logo" class="integration-logo" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
    <q-dialog v-model="modalEsqueciSenha">
      <q-card class="reset-password-modal">
        <q-card-section>
          <div class="text-h6 reset-password-title">{{ $t('login.resetPasswordTitle') }}</div>
        </q-card-section>

        <q-card-section>
          <div class="input-label">{{ $t('login.resetPasswordLabel') }}</div>
          <q-input
            dark
            v-model="emailRedefinicao"
            :color="$q.dark.isActive ? 'white' : 'white'"
            :input-style="{ color: 'white' }"
            class="dark-input"
            :placeholder="$t('login.emailPlaceholder')"
            type="email"
            :error="!!(v$ && v$.emailRedefinicao && v$.emailRedefinicao.$error)"
            :error-message="$t('login.validateEmailError')"
            @blur="touchEmailRedefinicao"
            outlined
          >
            <template v-slot:prepend>
              <q-icon
                name="mdi-email-outline"
                class="cursor-pointer"
                color='primary'
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="reset-password-actions">
          <q-btn 
            flat
            class="cancel-button"
            :label="$t('common.cancel')" 
            v-close-popup 
          />
          <q-btn
            class="send-button"
            :label="$t('common.send')" 
            unelevated
            @click="requestPasswordReset"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { MostrarCoresPublicas } from 'src/service/empresas.js';
import { RealizarLogin } from 'src/service/login.js';
// import sanitizeHtml from "sanitize-html"; 

export default {
  name: 'Login',
  setup () { return { v$: useVuelidate() } },
  data () {
    const storedLanguage = localStorage.getItem('language') || (this.$i18n && this.$i18n.locale) || 'pt'
    return {
      colors: {},
      modalEsqueciSenha: false,
      emailRedefinicao: null,
      form: {
        email: null,
        password: null
      },
      contasCliente: {},
      isPwd: true,
      loading: false,
      selectedLanguage: storedLanguage,
      languages: [
        { code: 'pt', label: 'Português', flag: '/flags/pt.png' },
        { code: 'en', label: 'English', flag: '/flags/en.png' },
        { code: 'es', label: 'Español', flag: '/flags/es.png' }
      ],
      logos: [
        'whatsapp-logo.png',
        'telegram-logo.png',
        'hub_facebook-logo.png',
        'hub_instagram-logo.png',
        'hub_email-logo.png',
        'hub_sms-logo.png',
        // 'hub_whatsapp-logo.png',
        // 'hub_webchat-logo.png',
        'hub_widget-logo.png',
        // 'baileys-logo.png',
        // 'evo-logo.png',
        // 'instagram-logo.png',
        'webchat-logo.png',
        'waba-logo.png',
        // 'meow-logo.png'
      ],
      currentIndex: 0,
      carouselInterval: null,
      logoPath: '/zpro_dark.png',
      logoError: false
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    },
    emailRedefinicao: { required, email }
  },
  computed: {
    currentLanguage () {
      return this.languages.find(lang => lang.code === this.selectedLanguage) || this.languages[0]
    }
  },
  methods: {
    touchEmail () {
      try { this.v$ && this.v$.form && this.v$.form.email && this.v$.form.email.$touch() } catch (e) {}
    },
    touchEmailRedefinicao () {
      try { this.v$ && this.v$.emailRedefinicao && this.v$.emailRedefinicao.$touch() } catch (e) {}
    },
    // sanitizeInput(input) {
    //   return sanitizeHtml(input, {
    //     allowedTags: [],
    //     allowedAttributes: {},
    //   });
    // },
    updateLanguage(language) {
      this.selectedLanguage = language;
      this.$i18n.locale = language;
      localStorage.setItem('language', language);
      window.location.reload(); 
    },
    selectLanguage(language) {
      this.updateLanguage(language);
    },
    accountCreate() {
      this.$router.push('/signup');
    },
    async loadColors() {
      try {
        const response = await MostrarCoresPublicas();
        if (response.status === 200) {
          const colorsArray = response.data;

          localStorage.setItem('storedColors', JSON.stringify(colorsArray));
          this.colors = colorsArray.reduce((acc, colorObj) => {
            const key = colorObj.label.toLowerCase();
            acc[key] = colorObj[key];
            return acc;
          }, {});

          const root = document.documentElement;
          root.style.setProperty("--q-neutral", this.colors.neutral);
          root.style.setProperty("--q-primary", this.colors.primary);
          root.style.setProperty("--q-secondary", this.colors.secondary);
          root.style.setProperty("--q-accent", this.colors.accent);
          root.style.setProperty("--q-warning", this.colors.warning);
          root.style.setProperty("--q-negative", this.colors.negative);
          root.style.setProperty("--q-positive", this.colors.positive);
          root.style.setProperty("--q-light", this.colors.light);

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    async fazerLogin () {
      if (this.v$ && this.v$.form) this.v$.form.$touch()
      // this.form.email = this.sanitizeInput(this.form.email);
      // this.form.password = this.sanitizeInput(this.form.password);
      if (this.v$ && this.v$.form && this.v$.form.$error) {
        this.$q.notify(this.$t('login.errorMessage'));
        return
      }
      this.loading = true
      
      try {
        // Use the encrypted login function
        const response = await RealizarLogin(this.form);
        
        // Verificar se precisa de código 2FA - DEVE SER A PRIMEIRA E ÚNICA VERIFICAÇÃO
        const requiresA2F = response?.data?.requiresA2F === true || response?.requiresA2F === true
        
        if (requiresA2F) {
          // Salvar dados pendentes na sessão
          const now = new Date()
          const pendingData = {
            pendingSessionId: response.data?.pendingSessionId || response?.pendingSessionId,
            email: this.form.email,
            channel: response.data?.channel || response?.channel,
            codeSentAt: now.toISOString() // Timestamp de quando o código foi enviado
          }
          
          sessionStorage.setItem('pendingA2F', JSON.stringify(pendingData))
          
          // Parar loading imediatamente
          this.loading = false
          
          // Mostrar notificação
          this.$q.notify({
            message: response.data?.message || this.$t('login.a2fCodeSent'),
            color: "positive",
            position: "top",
            timeout: 2000
          })
          
          // Redirecionar usando o router do Vue
          this.$nextTick(() => {
            this.$router.push('/validate-a2f').catch(err => {
              console.error('Erro ao redirecionar com router:', err)
              window.location.hash = '#/validate-a2f'
            })
          })
          
          return
        }
        
        // Se não precisar de 2FA, continuar com login normal
        if (response && response.status === 200) {
          // Handle successful login - usar namespace correto do store
          await this.$store.dispatch('user/UserLogin', { ...this.form, ...response.data })
          this.loading = false
        } else {
          this.loading = false
          this.$q.notify({
            message: this.$t('login.errorMessage'),
            color: "negative",
          });
        }
      } catch (error) {
        console.error('Login error:', error)
        console.error('Error response:', error?.response)
        console.error('Error response data:', error?.response?.data)
        
        // Verificar se o erro é na verdade uma resposta 2FA
        if (error?.response?.data?.requiresA2F === true) {
          const pendingData = {
            pendingSessionId: error.response.data?.pendingSessionId,
            email: this.form.email,
            channel: error.response.data?.channel
          }
          
          sessionStorage.setItem('pendingA2F', JSON.stringify(pendingData))
          
          this.$q.notify({
            message: error.response.data?.message || this.$t('login.a2fCodeSent'),
            color: "positive",
            position: "top",
            timeout: 2000
          })
          
          this.loading = false
          
          setTimeout(() => {
            const baseUrl = window.location.origin + window.location.pathname
            window.location.href = baseUrl + '#/validate-a2f'
          }, 500)
          
          return
        }
        
        this.loading = false
        const serverData = error && error.response ? error.response.data : null
        
        // Verificar se o erro é OUT_RANGE (fora do horário de atendimento)
        // Verificar em diferentes possíveis estruturas do erro
        const errorCode = serverData?.error || error?.response?.data?.error || error?.data?.error
        // Verificar também se o erro vem como string direta
        const errorString = typeof serverData === 'string' ? serverData : (typeof error?.data === 'string' ? error.data : null)
        
        if (errorCode === 'OUT_RANGE' || errorString === 'OUT_RANGE') {
          this.$q.notify({
            message: this.$t('login.outOfServiceHours'),
            color: "negative",
          })
          return
        }

        if(errorCode === 'INVALID_TENANT' || errorString === 'INVALID_TENANT'){
          this.$q.notify({
            message: this.$t('login.invalidTenant'),
            color: "negative",
          })
          return
        }

        if(errorCode === 'ERR_LIMIT_MAX'){
          this.$q.notify({
            message: this.$t('login.limitError'),
            color: "negative",
          })
          return
        }

        if(errorCode === 'INVALID_LICENSE' || errorString === 'INVALID_LICENSE'){
          this.$q.notify({
            message: this.$t('login.licenseErrorUser'),
            color: "negative",
          })
          return
        }

        if(errorCode === 'INVALID_DOMAIN' || errorString === 'INVALID_DOMAIN'){
          this.$q.notify({
            message: this.$t('login.licenseDomainError'),
            color: "negative",
          })
          return
        }

        if(errorCode === 'LICENSE_ERROR' || errorString === 'LICENSE_ERROR'){
          this.$q.notify({
            message: this.$t('login.licenseErrorServer'),
            color: "negative",
          })
          return
        }
        
        let detailedMessage = ''
        if (typeof serverData === 'string') {
          detailedMessage = serverData
        } else if (serverData && typeof serverData === 'object') {
          detailedMessage = serverData.error || serverData.message || ''
        } else if (error && error.message) {
          detailedMessage = error.message
        }
        const finalMessage = detailedMessage || this.$t('login.errorMessage')
        this.$q.notify({
          message: finalMessage,
          color: "negative",
        });
      }
    },
    openPasswordResetModal() {
      this.modalEsqueciSenha = true;
    },
    async requestPasswordReset() {
      this.v$.emailRedefinicao.$touch()
      if (this.v$.emailRedefinicao.$error) {
        this.$q.notify(this.$t('login.validateEmailError'));
        return
      }
      // this.emailRedefinicao = this.sanitizeInput(this.emailRedefinicao);

      try {
        this.loading = true;
        await this.$store.dispatch('user/requestPasswordReset', { email: this.emailRedefinicao });
        this.$q.notify(this.$t('login.resetPasswordSuccess'));
        this.modalEsqueciSenha = false;
        this.loading = false;
      } catch (error) {
        this.$q.notify(this.$t('login.resetPasswordError'));
        this.loading = false;
      }
    },
    clear () {
      this.form.email = ''
      this.form.password = ''
      this.v$.form.$reset()
    },
    startCarousel() {
      // O carrossel agora usa CSS animation, não precisa de intervalo JavaScript
    },
    stopCarousel() {
      // Não precisa fazer nada, CSS animation para automaticamente
    },
    onLogoError() {
      // Se zpro_dark.png não existir, usar fallback para zpro.png
      if (!this.logoError) {
        this.logoError = true;
        this.logoPath = '/zpro.png';
      }
    }
  },
  mounted () {
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      const colors = JSON.parse(storedColors).reduce((acc, colorObj) => {
        const key = colorObj.label.toLowerCase();
        acc[key] = colorObj[key];
        return acc;
      }, {});
      
      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    // Definir variável CSS para a animação (55px logo + 15px gap = 70px por logo)
    const root = document.documentElement;
    const logoWidth = 70; // 55px + 15px gap
    const totalWidth = this.logos.length * logoWidth;
    root.style.setProperty('--logo-count', this.logos.length.toString());
    root.style.setProperty('--carousel-width', `${totalWidth}px`);
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: radial-gradient(circle at top, rgba(34, 197, 94, 0.15), transparent 35%),
    radial-gradient(circle at bottom, rgba(14, 165, 233, 0.15), transparent 40%),
    linear-gradient(135deg, #050505, #12141b 60%, #030712);
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.login-section {
  width: 100%;
  max-width: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-page {
  width: 100%;
  padding: 0;
}

.login-content {
  width: 100%;
  text-align: center;
  padding: 1.5rem 2rem;
  background: rgba(40, 40, 40, 0.95);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.5s ease-out;
}

.logo-language-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
}

.language-selector {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
}

.language-selector q-avatar {
  transition: all 0.3s ease;
  border: 2px solid transparent;
  padding: 2px;
}

.language-selector q-avatar img {
  border-radius: 8px;
  width: 32px;
  height: 32px;
  object-fit: cover;
  transition: all 0.3s ease;
}

.language-selector q-avatar:hover {
  transform: translateY(-2px);
  border-color: var(--q-primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.language-toggle {
  padding: 0 0.5rem;
  border-radius: 12px;
  color: white;
}

.language-toggle:hover {
  background: rgba(255, 255, 255, 0.05);
}

.language-toggle-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.language-label {
  font-size: 14px;
  font-weight: 500;
}

.language-menu .q-item {
  min-height: 40px;
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

.logo-image:hover {
  transform: scale(1.02);
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

.email-input {
  margin-bottom: 0.5rem !important;
}

.q-input .q-field__control {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.q-input .q-field__control:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.forgot-password-link-below {
  text-align: right;
  margin-top: 8px;
  margin-bottom: 1rem;
}

.q-btn {
  border-radius: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.q-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
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

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.forgot-password-link {
  text-align: center;
}

.forgot-link {
  color: white;
  text-decoration: underline;
  font-size: 14px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.forgot-link:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
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
  .login-section {
    max-width: 100%;
  }
  
  .login-content {
    margin: 0 auto;
    padding: 1.5rem;
    max-width: 90%;
  }
  
  .login-page {
    min-height: 100vh !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 1rem 0 !important;
  }

  .carousel-item {
    width: 45px;
    height: 45px;
  }

  .integration-logo {
    padding: 6px;
  }

  .carousel-container {
    height: 70px;
  }
}

/* Estilos para o modal de redefinição de senha */
.reset-password-modal {
  width: 400px;
  max-width: 90vw;
  background: rgba(40, 40, 40, 0.95) !important;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.reset-password-title {
  color: white !important;
  text-align: left;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.reset-password-modal .q-card-section {
  padding: 1.5rem 2rem;
}

.reset-password-modal .q-card-section:first-child {
  padding-bottom: 1rem;
}

.reset-password-actions {
  padding: 1rem 2rem 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.reset-password-modal .dark-input .q-field__control {
  background: rgba(60, 60, 60, 0.8) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

.reset-password-modal .dark-input .q-field__native {
  color: white !important;
}

.reset-password-modal .dark-input .q-field__label {
  color: rgba(255, 255, 255, 0.7) !important;
}

.cancel-button {
  color: white !important;
  margin-right: 0.5rem;
}

.cancel-button:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.send-button {
  background: linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%) !important;
  color: white !important;
  border-radius: 12px;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  height: 40px;
  font-size: 14px;
}

.send-button:hover {
  background: linear-gradient(90deg, #7C3AED 0%, #DB2777 100%) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
}

body.body--dark .login-content {
  background: rgba(40, 40, 40, 0.95);
  border-color: rgba(255, 255, 255, 0.1);
}

body.body--dark .q-input .q-field__control {
  background: rgba(60, 60, 60, 0.8);
  border-color: rgba(255, 255, 255, 0.2);
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

body.body--dark .q-dialog .q-card {
  background: rgba(30, 30, 30, 0.95);
  border-color: rgba(255, 255, 255, 0.1);
}

.integrations-section {
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: -2rem;
}

.integrations-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
  text-align: center;
}

.carousel-wrapper {
  width: calc(100% + 20px);
  overflow: visible;
  position: relative;
  padding: 10px 10px;
  margin: 0 -10px;
}

.carousel-container {
  width: 100%;
  overflow: visible;
  position: relative;
  height: 70px;
  mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
}

.carousel-track {
  display: flex;
  gap: 15px;
  width: max-content;
  animation: scroll 40s linear infinite;
}

.carousel-item {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55px;
  height: 55px;
  padding: 5px;
  margin: 0 -5px;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-1 * var(--carousel-width)));
  }
}

.integration-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: block;
}

.integration-logo:hover {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
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

.forgot-password-link-below {
  text-align: right;
  margin-top: 6px;
  margin-bottom: 0.75rem;
}
</style>
