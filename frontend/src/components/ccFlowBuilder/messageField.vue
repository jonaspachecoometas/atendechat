<template>
  <div>
    <q-card flat class="q-pa-sm q-pb-md">
      <q-card-section class="q-pa-none">
        <div class="row items-start full-width q-gutter-sm">
          <!-- Coluna para os botões -->
          <div class="column items-center q-gutter-xs">
            <q-btn round flat dense size="sm">
              <q-icon size="2em" name="mdi-emoticon-happy-outline" />
              <q-tooltip>{{ $t('messageField.tooltips.emoji') }}</q-tooltip>
              <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                <VEmojiPicker style="width: 30vw" :showSearch="false" :emojisByRow="15"
                  :labelSearch="$t('common.search')" lang="pt-BR"
                  @select="onInsertSelectEmoji" />
              </q-menu>
            </q-btn>

            <q-btn round flat dense size="sm">
              <q-icon size="2em" name="mdi-variable" />
              <q-tooltip>{{ $t('messageField.tooltips.variables') }}</q-tooltip>
              <q-menu touch-position>
                <q-list dense style="min-width: 100px">
                  <q-item v-for="variavel in variaveis" :key="variavel.label"
                    clickable @click="onInsertSelectVariable(variavel.value)"
                    v-close-popup>
                    <q-item-section>{{ variavel.label }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>

          <!-- Input ao lado -->
          <textarea ref="inputEnvioMensagem"
            class="q-pa-sm bg-white col-grow"
            style="min-height: 10vh; max-height: 30vh;"
            :placeholder="$t('sessaoModalWhatsapp.typeMessage')"
            v-model="messageText"
            @input="updateMessage"
            @blur="onBlur">
          </textarea>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { VEmojiPicker } from 'src/components/VEmojiPicker.js'

export default {
  name: 'MessageField',
  components: { VEmojiPicker },
  data () {
    return {
      variaveis: [
        { label: this.$t('messageField.variables.name'), value: '{{name}}' },
        { label: this.$t('messageField.variables.greeting'), value: '{{greeting}}' },
        { label: this.$t('messageField.variables.protocol'), value: '{{protocol}}' },
        { label: this.$t('messageField.variables.email'), value: '{{email}}' },
        { label: this.$t('messageField.variables.phoneNumber'), value: '{{phoneNumber}}' },
        { label: this.$t('messageField.variables.kanban'), value: '{{kanban}}' },
        { label: this.$t('messageField.variables.user'), value: '{{user}}' },
        { label: this.$t('messageField.variables.userEmail'), value: '{{userEmail}}' },
        { label: this.$t('messageField.variables.firstName'), value: '{{firstName}}' },
        { label: this.$t('messageField.variables.lastName'), value: '{{lastName}}' },
        { label: this.$t('messageField.variables.businessName'), value: '{{businessName}}' },
      ],
      // Sistema de gerenciamento de memória
      timers: [],
      // Propriedade local para o texto da mensagem
      localMessageText: ''
    }
  },
  computed: {
    messageText: {
      get() {
        return this.$attrs.element?.data?.message || ''
      },
      set(value) {
        this.localMessageText = value
      }
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
    
    // Método para atualizar a mensagem
    updateMessage() {
      if (this.$attrs.element?.data) {
        this.$attrs.element.data.message = this.localMessageText
        // Emitir evento para o componente pai
        this.$emit('update:element', { message: this.localMessageText })
      }
    },
    
    // Método para quando perde o foco
    onBlur() {
      this.updateMessage()
    },
    onInsertSelectEmoji (emoji) {
      const self = this
      var tArea = this.$refs.inputEnvioMensagem
      // get cursor's position:
      var startPos = tArea.selectionStart,
        endPos = tArea.selectionEnd,
        cursorPos = startPos,
        tmpStr = tArea.value
      // filter:
      if (!emoji.data) {
        return
      }
      // insert:
      self.txtContent = tmpStr.substring(0, startPos) + emoji.data + tmpStr.substring(endPos, tmpStr.length)
      this.localMessageText = self.txtContent
      this.updateMessage()
      // move cursor:
      const timerId = setTimeout(() => {
        tArea.selectionStart = tArea.selectionEnd = cursorPos + emoji.data.length
      }, 10)
      this.addTimer(timerId);
    },
    onInsertSelectVariable (variable) {
      console.log('onInsertSelectVariable', variable)
      const self = this
      var tArea = this.$refs.inputEnvioMensagem
      // get cursor's position:
      var startPos = tArea.selectionStart,
        endPos = tArea.selectionEnd,
        cursorPos = startPos,
        tmpStr = tArea.value
      // filter:
      if (!variable) {
        return
      }
      // insert:
      self.txtContent = tmpStr.substring(0, startPos) + variable + tmpStr.substring(endPos, tmpStr.length)
      this.localMessageText = self.txtContent
      this.updateMessage()
      // move cursor:
      const timerId2 = setTimeout(() => {
        tArea.selectionStart = tArea.selectionEnd = cursorPos + variable.length
      }, 10)
      this.addTimer(timerId2);
    }
  },
  
  watch: {
    // Watcher para sincronizar quando o elemento muda
    '$attrs.element.data.message': {
      handler(newValue) {
        if (newValue !== this.localMessageText) {
          this.localMessageText = newValue || ''
        }
      },
      immediate: true
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
