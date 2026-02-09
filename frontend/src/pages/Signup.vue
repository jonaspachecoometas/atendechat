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
              <q-separator spaced style="margin: 0.5rem 0;" />
            <div class="text-primary">
              <div class="text-h6 signup-title">{{ $t('signup.title') }}</div>
              <div>
                <div class="input-label">{{ $t('signup.namePlaceholder') }}</div>
                <q-input
                  dark
                  dense
                  :color="$q.dark.isActive ? 'white' : 'white'"
                  :input-style="{ color: 'white' }"
                  v-model="formData.name"
                  :placeholder="$t('signup.namePlaceholder')"
                  outlined
                  clearable
                  class="dark-input signup-input"
                  required
                  >
                  <template v-slot:prepend>
                    <q-icon
                      name="mdi-account-check-outline"
                      class="cursor-pointer"
                      color='primary'
                    />
                  </template>
                </q-input>

                <div class="input-label">{{ $t('signup.cpfCnpjPlaceholder') }}</div>
                <q-input
                  dark
                  dense
                  :color="$q.dark.isActive ? 'white' : 'white'"
                  :input-style="{ color: 'white' }"
                  v-model="formData.cpfCnpj"
                  :placeholder="$t('signup.cpfCnpjPlaceholder')"
                  outlined
                  clearable
                  class="dark-input signup-input"
                  required
                  >
                  <template v-slot:prepend>
                    <q-icon
                      name="mdi-card-account-details-outline"
                      class="cursor-pointer"
                      color='primary'
                    />
                  </template>
                </q-input>

                <div class="input-label">{{ $t('signup.emailPlaceholder') }}</div>
                <q-input
                  dark
                  dense
                  :color="$q.dark.isActive ? 'white' : 'white'"
                  :input-style="{ color: 'white' }"
                  v-model="formData.email"
                  :placeholder="$t('signup.emailPlaceholder')"
                  type="email"
                  outlined
                  clearable
                  class="dark-input signup-input"
                  required
                  >
                  <template v-slot:prepend>
                    <q-icon
                      name="mdi-email-outline"
                      class="cursor-pointer"
                      color='primary'
                    />
                  </template>
                </q-input>

                <div class="input-label">{{ $t('signup.mobilePhonePlaceholder') }}</div>
                <q-input
                  dark
                  dense
                  :color="$q.dark.isActive ? 'white' : 'white'"
                  :input-style="{ color: 'white' }"
                  v-model="formData.mobilePhone"
                  :placeholder="$t('signup.mobilePhonePlaceholder')"
                  outlined
                  clearable
                  class="dark-input signup-input"
                  required
                  mask="(##) #####-####"
                  fill-mask
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="mdi-cellphone-basic"
                      class="cursor-pointer"
                      color='primary'
                    />
                  </template>
                </q-input>

                <div class="input-label">{{ $t('signup.passwordPlaceholder') }}</div>
                <q-input
                  dark
                  dense
                  :color="$q.dark.isActive ? 'white' : 'white'"
                  :input-style="{ color: 'white' }"
                  v-model="formData.password"
                  :placeholder="$t('signup.passwordPlaceholder')"
                  :type="isPwd ? 'password' : 'text'"
                  outlined
                  clearable
                  class="dark-input signup-input"
                  required
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

                <div class="input-label">{{ $t('signup.selectPlanPlaceholder') }}</div>
                <q-select
                  dark
                  dense
                  :color="$q.dark.isActive ? 'white' : 'white'"
                  :input-style="{ color: 'white' }"
                  v-model="formData.selectedPlan"
                  :options="planos"
                  option-value="id"
                  :option-label="formatPlanLabel"
                  :placeholder="$t('signup.selectPlanPlaceholder')"
                  outlined
                  clearable
                  class="dark-input signup-input"
                  required
                >
                  <template v-slot:prepend>
                    <q-icon
                      name="mdi-bank-outline"
                      class="cursor-pointer"
                      color='primary'
                    />
                  </template>
                </q-select>

              </div>
              <div class="buttons-container">
                <q-btn
                  class="signup-button"
                  @click="onSubmit"
                  :loading="loading"
                  unelevated
                >
                  {{ $t('signup.submitButtonLabel') }}
                  <template v-slot:loading>
                    <q-spinner-puff class="on-left" />{{ $t('signup.loadingMessage') }}
                  </template>
                </q-btn>
                <div class="login-link-container">
                  <a href="#" @click.prevent="onCancel" class="login-link">
                    {{ $t('signup.cancelButtonLabel') }}
                  </a>
                </div>
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
      style="width: 100%; height: auto; object-fit: cover; "
    >
      <source src="../assets/110694.mp4" type="video/mp4" />
    </video>
  </div>
</div>
</template>

<script>
import { criarCliente } from 'src/service/asaas.js';
import { ListarPlanos } from 'src/service/planos.js'
import { MostrarCoresPublicas } from 'src/service/empresas.js';
// import sanitizeHtml from "sanitize-html";

export default {
data() {
  return {
    planos: [],
    colors: {},
    isPwd: true,
    formData: {
      name: '',
      cpfCnpj: '',
      email: '',
      mobilePhone: '',
      password: '',
      selectedPlan: null
    },
    loading: false,
    notify: {
      visible: false,
      message: '',
      type: 'negative'
    },
    logoPath: '/logo_dark.png',
    logoError: false
  };
},
methods: {
  // sanitizeInput(input) {
  //   return sanitizeHtml(input, {
  //     allowedTags: [],
  //     allowedAttributes: {}
  //   });
  // },
  validarCpfCnpj(cpfCnpj) {
    cpfCnpj = cpfCnpj.replace(/[^\d]+/g, '');

    // Validação de CPF
    if (cpfCnpj.length === 11) {
      let soma = 0;
      let resto;

      if (/^(\d)\1+$/.test(cpfCnpj)) return false;

      for (let i = 1; i <= 9; i++) soma += parseInt(cpfCnpj.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpfCnpj.substring(9, 10))) return false;

      soma = 0;
      for (let i = 1; i <= 10; i++) soma += parseInt(cpfCnpj.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) resto = 0;
      if (resto !== parseInt(cpfCnpj.substring(10, 11))) return false;

      return true;
    }

    // Validação de CNPJ
    if (cpfCnpj.length === 14) {
      let tamanho = cpfCnpj.length - 2;
      let numeros = cpfCnpj.substring(0, tamanho);
      let digitos = cpfCnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== parseInt(digitos.charAt(0))) return false;

      tamanho = tamanho + 1;
      numeros = cpfCnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado !== parseInt(digitos.charAt(1))) return false;

      return true;
    }

    return false;
  },
  validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },
  validarSenha(senha) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:,.?/|~])[A-Za-z\d!@#$%^&*()_\-+=\[\]{};:,.?/|~]{7,}$/;
    return regex.test(senha);
  },
  formatPlanLabel(plan) {
    if (!plan) return '';
    
    const name = plan.name || '';
    const value = plan.value || '0';
    const connections = plan.connections || '0';
    const users = plan.users || '0';
    
    if (name) {
      return `${name} - ${this.$t('signup.planLabel', {
        value: value,
        connections: connections,
        users: users
      })}`;
    }
    
    return this.$t('signup.planLabel', {
      value: value,
      connections: connections,
      users: users
    });
  },
  async loadColors() {
    try {
      const response = await MostrarCoresPublicas();
      if (response.status === 200) {
        const colorsArray = response.data;

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
  async listarPlanos () {
    const { data } = await ListarPlanos()
    this.planos = data.plan
  },
  async onSubmit() {
    this.loading = true;

    // this.formData.name = this.sanitizeInput(this.formData.name);
    // this.formData.cpfCnpj = this.sanitizeInput(this.formData.cpfCnpj);
    // this.formData.email = this.sanitizeInput(this.formData.email);
    // this.formData.mobilePhone = this.sanitizeInput(this.formData.mobilePhone);
    // this.formData.password = this.sanitizeInput(this.formData.password);
    
    if(!this.formData.name
      || !this.formData.cpfCnpj
      || !this.formData.email
      || !this.formData.mobilePhone
      || !this.formData.selectedPlan
    ){
      this.$q.notify({
        type: 'negative',
        progress: true,
        position: 'top',
        timeout: 2500,
        message: this.$t('signup.validations.requiredFields'),
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      this.loading = false;
      return;
    }
    if (!this.validarCpfCnpj(this.formData.cpfCnpj)) {
      this.$q.notify({
        type: 'negative',
        progress: true,
        position: 'top',
        timeout: 2500,
        message: this.$t('signup.validations.invalidCpfCnpj'),
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      this.loading = false;
      return;
    }
    if (!this.validarEmail(this.formData.email)) {
      this.$q.notify({
        type: 'negative',
        progress: true,
        position: 'top',
        timeout: 2500,
        message: this.$t('signup.validations.invalidEmail'),
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      this.loading = false;
      return;
    }
    if (!this.validarSenha(this.formData.password)) {
      this.$q.notify({
        type: 'negative',
        progress: true,
        position: 'top',
        timeout: 2500,
        message: this.$t('signup.validations.invalidPassword'),
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      this.loading = false;
      return;
    }
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);
    const nextDueDate = currentDate.toISOString().split('T')[0];
    const payload = {
      name: this.formData.name,
      cpfCnpj: this.formData.cpfCnpj,
      email: this.formData.email,
      mobilePhone: this.formData.mobilePhone.replace(/[^\d]/g, ''),
      password: this.formData.password,
      maxUsers: this.formData.selectedPlan.users,
      maxConnections: this.formData.selectedPlan.connections,
      status: "active",
      userName: this.formData.name,
      billingType: "BOLETO",
      value: this.formData.selectedPlan.value,
      nextDueDate: nextDueDate,
      cycle: "MONTHLY",
      trial: this.formData.selectedPlan.trial,
      trialPeriod: this.formData.selectedPlan.trialPeriod
    };
    try {
      const response = await criarCliente(payload);
      this.$q.notify({
        type: 'positive',
        progress: true,
        position: 'top',
        timeout: 2500,
        message: this.$t('signup.validations.successMessage'),
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      this.$router.push('/login');
    } catch (error) {
      this.$q.notify({
        type: 'negative',
        progress: true,
        position: 'top',
        timeout: 2500,
        message: `${this.$t('signup.validations.errorMessage')}: ${error.message}`,
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
    } finally {
      this.loading = false;
    }
  },
  onCancel() {
    this.$router.push('/login'); // Redireciona para a página de login
  },
  updateLanguage(language) {
    this.$i18n.locale = language;
    localStorage.setItem('language', language);
    window.location.reload(); 
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
  this.listarPlanos()
  this.userProfile = localStorage.getItem('profile')
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
};
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
  padding-right: 2rem;
  overflow-y: auto;
  overflow-x: hidden;
}

.full-width {
width: 100%;
}

.no-cover .q-img__image {
background-size: contain !important;
}

.login-content {
  max-width: 400px;
  width: 100%;
  text-align: center;
  padding: 1rem 1.5rem;
  background: rgba(40, 40, 40, 0.95);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.5s ease-out;
  margin: 0.5rem 0;
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
  margin-bottom: 0.5rem;
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
  max-height: 27px;
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
  font-size: 12px;
  margin-bottom: 4px;
  text-align: left;
}

.signup-input {
  margin-bottom: 0.4rem !important;
}

.q-input, .q-select {
  margin-bottom: 0.4rem;
}

.q-input .q-field__control, .q-select .q-field__control {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.q-input--dense .q-field__control, .q-select--dense .q-field__control {
  min-height: 36px;
}

.q-input .q-field__control:hover, .q-select .q-field__control:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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

.q-select.dark-input .q-field__control {
  background: rgba(60, 60, 60, 0.8) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
}

.q-select.dark-input .q-field__native {
  color: white !important;
}

.q-select.dark-input .q-field__label {
  color: rgba(255, 255, 255, 0.7) !important;
}

.dark-input .q-field__prepend .q-icon {
  font-size: 18px;
}

.dark-input .q-field__append .q-icon {
  font-size: 18px;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

.signup-button {
  width: 100%;
  max-width: 300px;
  height: 40px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%);
  color: white !important;
  border: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
}

.signup-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
  background: linear-gradient(90deg, #7C3AED 0%, #DB2777 100%);
}

.signup-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-link-container {
  text-align: center;
  margin-top: 0.25rem;
}

.login-link {
  color: white;
  text-decoration: underline;
  font-size: 13px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.login-link:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.cancel-button-signup:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.text-primary {
  color: white !important;
}

.text-h6 {
  color: white !important;
  font-size: 1rem;
}

.signup-title {
  text-align: left;
  margin-bottom: 0.4rem;
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

.login-page {
  padding: 0.5rem 0;
  min-height: auto;
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
</style>
