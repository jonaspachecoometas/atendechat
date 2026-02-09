<template>
  <div class="container">
    <div class="reset-section fixed-layout">
      <q-layout class="vertical-center full-width">
        <q-page-container>
          <q-page class="flex justify-center items-center">
            <q-ajax-bar position="top" color="primary" size="5px" />
            <div class="reset-content">
              <q-img
                :src="$q.dark.isActive ? '/logo_dark.png' : '/logo.png'"
                spinner-color="white"
                class="logo-image q-mb-lg q-px-md"
                style="max-width: 120%"
              />
              <q-separator spaced />
              <div class="text-primary">
                <div class="text-h6">{{ $t('resetPassword.title') }}</div>
                <div>
                  <q-input
                    :color="$q.dark.isActive ? 'white ' : 'black'"
                    outlined
                    v-model="password"
                    :type="isPwd ? 'password' : 'text'"
                    :placeholder="$t('resetPassword.newPasswordPlaceholder')"
                    @keypress.enter="resetPassword"
                    class="q-mb-md"
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

                  <q-input
                    :color="$q.dark.isActive ? 'white ' : 'black'"
                    outlined
                    v-model="confirmPassword"
                    :type="isConfirmPwd ? 'password' : 'text'"
                    :placeholder="$t('resetPassword.confirmPasswordPlaceholder')"
                    @keypress.enter="resetPassword"
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
                <q-btn
                  class="q-mr-sm q-my-lg"
                  color="primary"
                  style="width: 150px"
                  :loading="loading"
                  @click="resetPassword"
                >
                {{ $t('resetPassword.resetButtonLabel') }}
                  <template v-slot:loading>
                    <q-spinner-puff class="on-left" />{{ $t('resetPassword.loadingMessage') }}
                  </template>
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
import { RedefinirSenha } from 'src/service/login.js'
// import sanitizeHtml from "sanitize-html";

export default {
  data() {
    return {
      password: '',
      confirmPassword: '',
      isPwd: true,
      isConfirmPwd: true,
      loading: false
    }
  },
  methods: {
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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.full-width {
  width: 100%;
}

.reset-content {
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
  
  .reset-section {
    width: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.95));
  }
  
  .reset-content {
    margin: 0 1rem;
    padding: 1.5rem;
  }
}

/* Estilos para o modo escuro */
body.body--dark .reset-section {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.95), rgba(20, 20, 20, 0.85));
}

body.body--dark .reset-content {
  background: rgba(30, 30, 30, 0.9);
  border-color: rgba(255, 255, 255, 0.1);
}

body.body--dark .q-input .q-field__control {
  background: rgba(255, 255, 255, 0.05);
}
</style>