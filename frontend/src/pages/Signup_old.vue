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
                style="max-width: 120%"
              />
              <q-separator spaced />
              <div class="text-primary">
                <div class="text-h6">{{ $t('signup.title') }}</div>
                <div>
                  <q-input
                    :color="$q.dark.isActive ? 'white' : ''"
                    :input-style="{ color: 'black' }"
                    v-model="formData.name"
                    :label="$t('signup.namePlaceholder')"
                    outlined
                    clearable
                    class="q-mb-md"
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

                  <q-input
                    :color="$q.dark.isActive ? 'white' : ''"
                    :input-style="{ color: 'black' }"
                    v-model="formData.cpfCnpj"
                    :label="$t('signup.cpfCnpjPlaceholder')"
                    outlined
                    clearable
                    class="q-mb-md"
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

                  <q-input
                    :color="$q.dark.isActive ? 'white' : ''"
                    :input-style="{ color: 'black' }"
                    v-model="formData.email"
                    :label="$t('signup.emailPlaceholder')"
                    type="email"
                    outlined
                    clearable
                    class="q-mb-md"
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

                  <q-input
                    :color="$q.dark.isActive ? 'white' : ''"
                    :input-style="{ color: 'black' }"
                    v-model="formData.mobilePhone"
                    :label="$t('signup.mobilePhonePlaceholder')"
                    outlined
                    clearable
                    class="q-mb-md"
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

                  <q-input
                    :color="$q.dark.isActive ? 'white' : ''"
                    :input-style="{ color: 'black' }"
                    v-model="formData.password"
                    :label="$t('signup.passwordPlaceholder')"
                    :type="isPwd ? 'password' : 'text'"
                    outlined
                    clearable
                    class="q-mb-md"
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

                  <q-select
                    :color="$q.dark.isActive ? 'white' : ''"
                    :input-style="{ color: 'black' }"
                    v-model="formData.selectedPlan"
                    :options="planos"
                    option-value="id"
                    :option-label="formatPlanLabel"
                    :label="$t('signup.selectPlanPlaceholder')"
                    outlined
                    clearable
                    class="q-mb-md"
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
                <q-btn
                  class="q-mr-sm q-my-lg"
                  color="primary"
                  @click="onSubmit"
                  style="width: 150px"
                  :loading="loading"
                >
                {{ $t('signup.submitButtonLabel') }}
                  <template v-slot:loading>
                    <q-spinner-puff class="on-left" />{{ $t('signup.loadingMessage') }}
                  </template>
                </q-btn>
                <q-btn  
                  @click="onCancel"
                  color="negative"
                >
                {{ $t('signup.cancelButtonLabel') }}
                </q-btn>
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
      }
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
      this.$router.push('/'); // Redireciona para a página inicial ou login
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.full-width {
  width: 100%;
}

.no-cover .q-img__image {
  background-size: contain !important;
}

.login-content {
  width: 350px;
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

.logo-image {
  height: auto;
  max-width: 100%;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.02);
}

.q-input, .q-select {
  margin-bottom: 1rem;
}

.q-input .q-field__control, .q-select .q-field__control {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.q-input .q-field__control:hover, .q-select .q-field__control:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.q-input .q-field__native, .q-select .q-field__native {
  padding: 8px 12px;
}

.q-btn {
  border-radius: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  margin: 0.5rem;
}

.q-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.q-btn--negative {
  background: rgba(244, 67, 54, 0.1);
  color: var(--q-negative);
}

.q-btn--negative:hover {
  background: rgba(244, 67, 54, 0.2);
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

/* Estilos para o modo escuro */
body.body--dark .login-section {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.95), rgba(20, 20, 20, 0.85));
}

body.body--dark .login-content {
  background: rgba(30, 30, 30, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
}

body.body--dark .q-input .q-field__control,
body.body--dark .q-select .q-field__control {
  background: rgba(255, 255, 255, 0.05);
}

body.body--dark .q-btn--negative {
  background: rgba(244, 67, 54, 0.2);
  color: #ff6b6b;
}

body.body--dark .q-btn--negative:hover {
  background: rgba(244, 67, 54, 0.3);
}
</style>
