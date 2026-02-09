<template>
  <q-banner
    v-if="updateAvailable"
    class="update-notification bg-primary text-white"
    rounded
  >
    <template v-slot:avatar>
      <q-icon name="update" size="md" class="rotate-icon" />
    </template>

    <div class="update-notification-content">
      <div class="update-notification-text">
        <div class="text-weight-bold q-mb-xs">
          {{ $t('updateNotification.title') || 'Nova Versão Disponível!' }}
        </div>
        <div class="text-body2">
          {{ $t('updateNotification.message') || 'Uma nova versão da aplicação está disponível. Clique no botão abaixo para atualizar. No desktop, atualize com o comando Ctrl+Shift+R.' }}
        </div>
      </div>
      <q-btn
        :label="$t('updateNotification.updateButton') || 'Atualizar Agora'"
        color="white"
        text-color="primary"
        class="q-ml-md update-button"
        @click="handleReload"
        unelevated
        :loading="isReloading"
      >
        <q-icon name="refresh" class="q-mr-xs" />
      </q-btn>
    </div>
  </q-banner>
</template>

<script>
import { useServiceWorkerUpdate } from 'src/composables/useServiceWorkerUpdate'

export default {
  name: 'UpdateNotification',
  data() {
    return {
      isReloading: false
    }
  },
  setup() {
    const { updateAvailable, clearCacheAndReload } = useServiceWorkerUpdate()
    return {
      updateAvailable,
      clearCacheAndReload
    }
  },
  methods: {
    async handleReload() {
      // Prevenir múltiplos cliques
      if (this.isReloading) {
        return
      }

      this.isReloading = true
      
      // Timeout de segurança - desativa loading após 5 segundos se nada acontecer
      const loadingTimeout = setTimeout(() => {
        console.warn('Timeout: desativando loading')
        this.isReloading = false
      }, 5000)

      try {
        await this.clearCacheAndReload()
        // Se chegou aqui, o reload já deveria ter acontecido
        // Mas se não aconteceu, limpar timeout e tentar novamente
        clearTimeout(loadingTimeout)
        
        // Se após 1 segundo ainda não recarregou, forçar reload
        setTimeout(() => {
          if (document.visibilityState === 'visible') {
            console.log('Reload não aconteceu, forçando manualmente...')
            window.location.reload()
          }
        }, 1000)
      } catch (error) {
        console.error('Erro ao atualizar:', error)
        clearTimeout(loadingTimeout)
        this.isReloading = false
        
        // Mesmo com erro, tentar recarregar
        setTimeout(() => {
          window.location.replace(window.location.href.split('?')[0] + '?v=' + Date.now())
        }, 500)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.update-notification
  position: fixed
  top: 20px
  left: 50%
  transform: translateX(-50%)
  z-index: 10000
  max-width: 600px
  width: calc(100% - 40px)
  animation: slideDown 0.4s ease-out
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25)
  border: 2px solid rgba(255, 255, 255, 0.3)

@keyframes slideDown
  from
    opacity: 0
    transform: translateX(-50%) translateY(-30px)
  to
    opacity: 1
    transform: translateX(-50%) translateY(0)

.update-notification-content
  display: flex
  align-items: center
  gap: 16px
  width: 100%

.update-notification-text
  flex: 1

.rotate-icon
  animation: rotate 2s linear infinite

@keyframes rotate
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

.update-button
  font-weight: 600
  padding: 8px 20px
  min-width: 140px
  transition: all 0.3s ease

  &:hover
    transform: scale(1.05)
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2)

@media (max-width: 768px)
  .update-notification
    top: 10px
    width: calc(100% - 20px)
    max-width: none

  .update-notification-content
    flex-direction: column
    text-align: center
    gap: 12px

  .update-notification-text
    width: 100%

  .update-button
    width: 100%
    margin-left: 0 !important
    min-width: auto
</style>

