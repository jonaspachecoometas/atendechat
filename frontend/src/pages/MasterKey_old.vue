  <template>
  <div class="container">
    <div class="login-section fixed-layout">
      <q-layout class="vertical-center full-width">
        <q-page-container>
          <q-page class="flex justify-center items-center">
            <q-ajax-bar position="top" color="primary" size="5px" />
            <div class="login-content">
              <q-img
                :src="$q.dark.isActive ? '/logo_dark.png' : '/logo.png'"
                spinner-color="white"
                class="logo-image q-mb-lg q-px-md no-cover"
                style="max-width: 100%"
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
              <q-separator spaced />
              <div class="text-primary">
                <div class="text-h6">{{ $t('login.welcome') }}</div>
                <div>
                  <q-input
                    :color="$q.dark.isActive ? 'white' : ''"
                    :input-style="{ color: 'black' }"
                    class="q-mb-md"
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

                  <q-input
                    :color="$q.dark.isActive ? 'white' : ''"
                    :input-style="{ color: 'black' }"
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

                  <div class="q-mb-md">
                    <q-checkbox
                      v-model="form.masterkey"
                      :label="$t('masterkey.masterkeyOption')"
                      color="primary"
                    />
                  </div>

                  <q-separator spaced />
                  <div class="text-primary q-mb-md" style="margin-top: 10px;">
                    <div style="font-size: 14px;">{{ $t('login.validateCaptcha') }}</div>
                    <q-slider
                      style="width: 80%; margin-top: 30px;"
                      v-model="captchaValidated"
                      :min="0"
                      :max="100"
                      color="primary"
                      label-always
                      @change="validateCaptcha"
                    />
                  </div>
                </div>
                <q-btn
                  class="q-mr-sm q-my-lg"
                  color="primary"
                  style="width: 150px"
                  :loading="loading"
                  @click="fazerLogin"
                  :disable="!isHuman"
                >
                  {{ $t('login.loginButton') }}
                  <template v-slot:loading>
                    <q-spinner-puff class="on-left" />{{ $t('login.loginLoading') }}
                  </template>
                </q-btn>
                <!-- <q-btn
                  @click="openPasswordResetModal"
                  color="negative"
                >
                  {{ $t('login.forgotPassword') }}
                </q-btn> -->
                <!-- <q-btn
                  @click="accountCreate"
                  color="negative"
                >
                  Criar Conta
                </q-btn> -->
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
        style="width: 100%; height: auto; object-fit: cover; "
      >
        <source src="../assets/110694.mp4" type="video/mp4" />
      </video>
    </div>
    <q-dialog v-model="modalEsqueciSenha">
      <q-card style="width: 300px;">
        <q-card-section>
          <div class="text-h6">{{ $t('login.resetPasswordTitle') }}</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="emailRedefinicao"
            label="Digite seu e-mail"
            type="email"
            :error="!!(v$ && v$.emailRedefinicao && v$.emailRedefinicao.$error)"
            :error-message="$t('login.validateEmailError')"
            @blur="touchEmailRedefinicao"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn 
          color="negative"
          :label="$t('common.cancel')" 
          v-close-popup 
          />
          <q-btn
            :label="$t('common.send')" 
            color="primary"
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
        masterkey: false
      },
      contasCliente: {},
      isPwd: true,
      loading: false,
      captchaValidated: 0,
      isHuman: false
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.login-content {
  max-width: 350px;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeIn 0.5s ease-out;
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

.language-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
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
  height: auto;
  max-width: 100%;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.02);
}

.q-input {
  margin-bottom: 1rem;
}

.q-input .q-field__control {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.q-input .q-field__control:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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

.q-slider {
  margin: 2rem 0;
}

.q-slider__track-container {
  height: 4px;
  border-radius: 2px;
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
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95));
  }
  
  .login-content {
    margin: 0 1rem;
    padding: 1.5rem;
  }
}

/* Estilos para o modal de redefinição de senha */
.q-dialog .q-card {
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.q-dialog .q-card-section {
  padding: 1.5rem;
}

.q-dialog .q-card-actions {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/* Estilos para o modo escuro */
body.body--dark .login-section {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.95), rgba(20, 20, 20, 0.85));
}

body.body--dark .login-content {
  background: rgba(30, 30, 30, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
}

body.body--dark .q-input .q-field__control {
  background: rgba(255, 255, 255, 0.05);
}

body.body--dark .q-dialog .q-card {
  background: rgba(30, 30, 30, 0.95);
  border-color: rgba(255, 255, 255, 0.1);
}
</style>
