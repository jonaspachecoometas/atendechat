<template>
  <div class="fullscreen bg-negative text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        {{ $t('error404.title') }}
      </div>

      <div
        class="text-h2 text-white"
        style="opacity:.4"
      >
        {{ $t('error404.subtitle') }}
      </div>

      <q-btn
        class="q-mt-xl q-pa-sm"
        color="white"
        text-color="blue"
        unelevated
        :label="$t('error404.button')"
        no-caps
        @click="$router.go(-1)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

<style lang="scss" scoped>
.fullscreen {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--q-negative), #ff6b6b);
  position: relative;
  overflow: hidden;
}

.fullscreen::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="rgba(255,255,255,0.1)"/></svg>');
  opacity: 0.1;
  animation: backgroundMove 20s linear infinite;
}

@keyframes backgroundMove {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100px 100px;
  }
}

.fullscreen > div {
  position: relative;
  z-index: 1;
  animation: fadeIn 0.5s ease-out;
}

.fullscreen > div > div:first-child {
  font-size: 30vh;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  background: linear-gradient(45deg, #fff, rgba(255, 255, 255, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.text-h2 {
  font-size: 2rem;
  font-weight: 300;
  margin: 1rem 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
}

.q-btn {
  border-radius: 50px;
  padding: 12px 30px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(0px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.q-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 1);
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

/* Estilos para o modo escuro */
body.body--dark .fullscreen {
  background: linear-gradient(135deg, #1a1a1a, var(--q-negative));
}

body.body--dark .q-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

body.body--dark .q-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Responsividade */
@media (max-width: 600px) {
  .fullscreen > div > div:first-child {
    font-size: 20vh;
  }
  
  .text-h2 {
    font-size: 1.5rem;
  }
  
  .q-btn {
    padding: 10px 25px;
  }
}
</style>
