<template>
  <div>
    <q-card flat class="q-pa-sm q-pb-md">
      <q-card-section class="q-pa-none">
        <div class="row items-center q-gutter-sm full-width">
          <q-btn round flat dense size="sm">
            <q-icon size="2em" name="mdi-variable" />
            <q-tooltip>{{ $t('webhookField.tooltip.variables') }}</q-tooltip>
            <q-menu touch-position>
              <q-list dense style="min-width: 100px">
                <q-item
                  v-for="variavel in variaveis"
                  :key="variavel.label"
                  clickable
                  @click="onInsertSelectVariable(variavel.value)"
                  v-close-popup
                >
                  <q-item-section>{{ variavel.label }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-input
            ref="inputEnvioMensagem"
            class="col-grow"
            outlined
            dense
            :placeholder="$t('webhookField.placeholder')"
            v-model="$attrs.element.data.webhook"
          />

         
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'WebhookField',
  data () {
    return {
      variaveis: [
        { label: this.$t('webhookField.variables.name'), value: '{{name}}' },
        { label: this.$t('webhookField.variables.greeting'), value: '{{greeting}}' },
        { label: this.$t('webhookField.variables.protocol'), value: '{{protocol}}' },
        { label: this.$t('webhookField.variables.email'), value: '{{email}}' },
        { label: this.$t('webhookField.variables.phoneNumber'), value: '{{phoneNumber}}' },
        { label: this.$t('webhookField.variables.kanban'), value: '{{kanban}}' },
        { label: this.$t('webhookField.variables.user'), value: '{{user}}' },
        { label: this.$t('webhookField.variables.userEmail'), value: '{{userEmail}}' },
        { label: this.$t('webhookField.variables.firstName'), value: '{{firstName}}' },
        { label: this.$t('webhookField.variables.lastName'), value: '{{lastName}}' },
        { label: this.$t('webhookField.variables.businessName'), value: '{{businessName}}' },
      ],
      // Sistema de gerenciamento de memória
      timers: []
    }
  },
  methods: {
    // Sistema de gerenciamento de memória
    addTimer(timerId) {
      this.timers.push(timerId);
    },
    clearAllTimers() {
      this.timers.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      this.timers = [];
    },
    cleanupMemory() {
      this.clearAllTimers();
    },
    onInsertSelectVariable (variable) {
      console.log('onInsertSelectVariable', variable)
      const self = this
      var tArea = this.$refs.inputEnvioMensagem
      
      // Verificar se o input existe
      if (!tArea) {
        console.warn('Input ref não encontrado')
        return
      }
      
      // filter:
      if (!variable) {
        return
      }
      
      // Obter o conteúdo atual do webhook
      const currentWebhook = this.$attrs.element.data.webhook || ''
      
      // get cursor's position:
      var startPos = tArea.selectionStart || 0,
        endPos = tArea.selectionEnd || 0,
        cursorPos = startPos
      
      // Inserir a variável na posição do cursor
      const newContent = currentWebhook.substring(0, startPos) + variable + currentWebhook.substring(endPos, currentWebhook.length)
      
      // Atualizar o conteúdo do webhook
      this.$attrs.element.data.webhook = newContent
      
      // move cursor:
      const timerId = setTimeout(() => {
        if (tArea && tArea.focus) {
          tArea.focus()
          tArea.selectionStart = tArea.selectionEnd = cursorPos + variable.length
        }
      }, 10)
      this.addTimer(timerId);
    }
  },
  
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
  }
}
</script>

<style lang="scss" scoped>

</style>
