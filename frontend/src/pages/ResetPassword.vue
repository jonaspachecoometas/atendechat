<template>
  <div class="container">
    <div class="reset-section fixed-layout">
      <q-layout class="vertical-center full-width">
        <q-page-container>
          <q-page class="flex justify-center items-center reset-page">
            <q-ajax-bar position="top" color="primary" size="5px" />
            <div class="reset-content">
              <div class="logo-language-row">
                <img
                  :src="logoPath"
                  class="logo-image"
                  alt="Logo"
                  @error="onLogoError"
                />
              </div>
              <q-separator spaced style="margin: 0.5rem 0;" />
              <div class="text-primary">
                <div class="text-h6 reset-title">{{ $t('resetPassword.title') }}</div>
                <div>
                  <div class="input-label">{{ $t('resetPassword.newPasswordPlaceholder') }}</div>
                  <q-input
                    dark
                    dense
                    :color="$q.dark.isActive ? 'white' : 'white'"
                    :input-style="{ color: 'white' }"
                    outlined
                    v-model="password"
                    :type="isPwd ? 'password' : 'text'"
                    :placeholder="$t('resetPassword.newPasswordPlaceholder')"
                    @keypress.enter="resetPassword"
                    class="dark-input reset-input"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="mdi-lock-reset"
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

                  <div class="input-label">{{ $t('resetPassword.confirmPasswordPlaceholder') }}</div>
                  <q-input
                    dark
                    dense
                    :color="$q.dark.isActive ? 'white' : 'white'"
                    :input-style="{ color: 'white' }"
                    outlined
                    v-model="confirmPassword"
                    :type="isConfirmPwd ? 'password' : 'text'"
                    :placeholder="$t('resetPassword.confirmPasswordPlaceholder')"
                    @keypress.enter="resetPassword"
                    class="dark-input reset-input"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="mdi-lock-check-outline"
                        class="cursor-pointer"
                        color='primary'
                      />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isConfirmPwd = !isConfirmPwd"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="buttons-container">
                  <q-btn
                    class="reset-button"
                    :loading="loading"
                    @click="resetPassword"
                    unelevated
                  >
                    {{ $t('resetPassword.resetButtonLabel') }}
                    <template v-slot:loading>
                      <q-spinner-puff class="on-left" />{{ $t('resetPassword.loadingMessage') }}
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
        style="width: 100%; height: auto; object-fit: cover; "
      >
        <source src="../assets/110694.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script>
import { RedefinirSenha } from 'src/service/login.js'
// import sanitizeHtml from "sanitize-html";

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      isPwd: true,
      isConfirmPwd: true,
      loading: false,
      logoPath: '/logo_dark.png'
    }
  },
  mounted() {
    this.loadColors();
  },
  methods: {
    onLogoError() {
      this.logoPath = '/logo.png';
    },
    async loadColors() {
      try {
        const storedColors = localStorage.getItem('themeColors');
        if (storedColors) {
          const colors = JSON.parse(storedColors);
          const root = document.documentElement;
          Object.keys(colors).forEach(key => {
            root.style.setProperty(`--q-${key}`, colors[key]);
          });
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    // sanitizeInput(input) {
    //   return sanitizeHtml(input, {
    //     allowedTags: [],
    //     allowedAttributes: {},
    //   });
    // },
    async resetPassword() {
      // this.password = this.sanitizeInput(this.password);
      // this.confirmPassword = this.sanitizeInput(this.confirmPassword);
      if (this.password !== this.confirmPassword) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('resetPassword.errorMismatch'),
        })
        return
      }
      try {
        this.loading = true;
        const token = this.$route.params.token;
        await RedefinirSenha({ token, password: this.password });
        this.$q.notify({
          type: 'positive',
          message: this.$t('resetPassword.successMessage'),
        });
        this.$router.push('/login');
        this.loading = false;
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('resetPassword.errorMessage'),
        });
        this.loading = false;
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

.reset-section {
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

.reset-content {
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

.reset-input {
  margin-bottom: 0.4rem !important;
}

.q-input .q-field__control, .q-select .q-field__control {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.q-input--dense .q-field__control, .q-select--dense .q-field__control {
  min-height: 36px;
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

.dark-input .q-field__prepend .q-icon {
  font-size: 18px;
}

.dark-input .q-field__append .q-icon {
  font-size: 18px;
}

.text-h6 {
  color: white !important;
  font-size: 1rem;
}

.reset-title {
  text-align: left;
  margin-bottom: 0.4rem;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
}

.reset-button {
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

.reset-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
  background: linear-gradient(90deg, #7C3AED 0%, #DB2777 100%);
}

.reset-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

.reset-page {
  padding: 0.5rem 0;
  min-height: auto;
}

@media (max-width: 600px) {
  .video-container {
    display: none;
  }
  
  .reset-section {
    width: 100%;
    background: linear-gradient(135deg, rgba(20, 20, 20, 0.98), rgba(30, 30, 30, 0.95));
    padding-right: 1rem;
    align-items: center;
    justify-content: center;
  }
  
  .reset-content {
    margin: 0 auto;
    padding: 1rem 1.5rem;
    max-width: 90%;
  }

  .reset-page {
    min-height: 100vh !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
}
</style>
