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
                  <q-btn flat dense @click="updateLanguage('pt')">
                    <q-avatar size="24px">
                      <img src="/flags/pt.png" alt="Português" />
                    </q-avatar>
                  </q-btn>
                  <q-btn flat dense @click="updateLanguage('en')">
                    <q-avatar size="24px">
                      <img src="/flags/en.png" alt="English" />
                    </q-avatar>
                  </q-btn>
                  <q-btn flat dense @click="updateLanguage('es')">
                    <q-avatar size="24px">
                      <img src="/flags/es.png" alt="Español" />
                    </q-avatar>
                  </q-btn>
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

                  <div class="masterkey-checkbox">
                    <q-checkbox
                      v-model="form.masterkey"
                      :label="$t('masterkey.masterkeyOption')"
                      color="primary"
                      dark
                    />
                  </div>

                  <q-separator spaced style="margin: 0.75rem 0;" />
                  <div class="text-primary captcha-container">
                    <div style="font-size: 13px;">{{ $t('login.validateCaptcha') }}</div>
                    <q-slider
                      class="captcha-slider"
                      style="width: 80%; margin-top: 15px;"
                      v-model="captchaValidated"
                      :min="0"
                      :max="100"
                      color="primary"
                      label-always
                      label-text-color="white"
                      @change="validateCaptcha"
                    />
                  </div>
                </div>
                <div class="buttons-container">
                  <q-btn
                    class="login-button"
                    :loading="loading"
                    @click="fazerLogin"
                    :disable="!isHuman"
                    unelevated
                  >
                    {{ $t('login.loginButton') }}
                    <template #loading>
                      <q-spinner-puff class="on-left" />{{ $t('login.loginLoading') }}
                    </template>
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
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { MostrarCoresPublicas } from 'src/service/empresas.js';
import { RealizarLogin } from 'src/service/login.js';
// import sanitizeHtml from "sanitize-html"; 

export default {
  name: 'Login',
  setup () { return { v$: useVuelidate() } },
  data () {
    return {
      colors: {},
      modalEsqueciSenha: false,
      emailRedefinicao: null,
      form: {
        email: null,
        password: null,
        masterkey: true
      },
      contasCliente: {},
      isPwd: true,
      loading: false,
      captchaValidated: 0,
      isHuman: false,
      logoPath: '/logo_dark.png',
      logoError: false
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
      masterkey: { required }
    },
    emailRedefinicao: { required, email }
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
      this.$i18n.locale = language;
      localStorage.setItem('language', language);
      window.location.reload(); 
    },
    validateCaptcha(value) {
      if (value === 100) {
        this.isHuman = true;
        this.$q.notify({
          message: this.$t('login.captchaValidationMessage'),
          color: "positive",
        });
      } else {
        this.isHuman = false;
      }
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
      if (!this.isHuman) {
        this.$q.notify({
          message: this.$t('login.captchaErrorMessage'),
          color: "negative",
        });
        return;
      }
      try { this.v$ && this.v$.form && this.v$.form.$touch() } catch (e) {}
      // this.form.email = this.sanitizeInput(this.form.email);
      // this.form.password = this.sanitizeInput(this.form.password);
      if (this.v$ && this.v$.form && this.v$.form.$error) {
        this.$q.notify(this.$t('login.errorMessage'));
        return
      }
      this.loading = true
      
      try {
        // Garantir que masterkey está true para login com masterkey
        const loginData = {
          ...this.form,
          masterkey: true
        }
        
        // Use the encrypted login function
        const response = await RealizarLogin(loginData);
        
        // Com masterkey, NUNCA deve ir para 2FA (backend já trata isso)
        // Se não precisar de 2FA, continuar com login normal
        if (response && response.status === 200) {
          // Handle successful login - passar os dados do response para o store
          await this.$store.dispatch('user/UserLogin', { ...loginData, ...response.data })
        }
        this.loading = false
      } catch (err) {
        console.error('exStore', err)
        console.error('Error response:', err?.response)
        console.error('Error response data:', err?.response?.data)
        
        this.loading = false
        const serverData = err && err.response ? err.response.data : null
        
        // Verificar se o erro é OUT_RANGE (fora do horário de atendimento)
        // Verificar em diferentes possíveis estruturas do erro
        const errorCode = serverData?.error || err?.response?.data?.error || err?.data?.error
        // Verificar também se o erro vem como string direta
        const errorString = typeof serverData === 'string' ? serverData : (typeof err?.data === 'string' ? err.data : null)
        
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
        
        // Tratamento genérico de erro
        let detailedMessage = ''
        if (typeof serverData === 'string') {
          detailedMessage = serverData
        } else if (serverData && typeof serverData === 'object') {
          detailedMessage = serverData.error || serverData.message || ''
        } else if (err && err.message) {
          detailedMessage = err.message
        }
        const finalMessage = detailedMessage || this.$t('login.errorMessage')
        this.$q.notify({
          message: finalMessage,
          color: "negative",
        })
      }
    },
    openPasswordResetModal() {
      this.modalEsqueciSenha = true;
    },
    async requestPasswordReset() {
      try { this.v$ && this.v$.emailRedefinicao && this.v$.emailRedefinicao.$touch() } catch (e) {}
      if (this.v$ && this.v$.emailRedefinicao && this.v$.emailRedefinicao.$error) {
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
      this.form.masterkey = false
      try { this.v$ && this.v$.form && this.v$.form.$reset() } catch (e) {}
    },
    onLogoError() {
      // Se logo_dark.png não existir, usar fallback para logo.png
      if (!this.logoError) {
        this.logoError = true;
        this.logoPath = '/logo.png';
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
    // this.loadColors()
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

@media (max-width: 600px) {
  .login-section {
    justify-content: center;
  }
  
  .login-page {
    min-height: 100vh !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
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

.video-container:hover video {
  transform: scale(1.05);
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
  gap: 10px;
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

.masterkey-checkbox {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: left;
}

.masterkey-checkbox .q-checkbox {
  color: white;
}

.masterkey-checkbox .q-checkbox__label {
  color: white;
  font-size: 14px;
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

.captcha-container {
  margin-bottom: 0.25rem;
  margin-top: 0.5rem;
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

.q-slider {
  padding-top: 25px;
}

.captcha-slider .q-slider__track-container {
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.3) !important;
}

.captcha-slider .q-slider__track {
  background: var(--q-primary);
  border-radius: 2px;
}

.q-slider__track-container {
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.3) !important;
}

.q-slider__track {
  background: var(--q-primary);
  border-radius: 2px;
}

.q-slider__thumb {
  width: 20px;
  height: 20px;
  background: var(--q-primary);
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
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
  
  .login-page {
    min-height: 100vh !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 1rem 0 !important;
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

/* Estilos para o modo escuro */
body.body--dark .login-section {
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.98), rgba(30, 30, 30, 0.95));
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
</style>
