<template>
  <q-dialog
    persistent
    v-model="showDialog"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      :style="$q.screen.width < 500 ? 'width: 95vw' : 'min-width: 700px; max-width: 700px'"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">
          {{ mensagemRapida.id ? $t('modalMensagemRapida.editTitle') : $t('modalMensagemRapida.createTitle') }}
          {{ mensagemRapida.id ? `(${$t('modalMensagemRapida.idLabel')}: ${mensagemRapida.id})` : '' }}
        </div>
      </q-card-section>
      <q-card-section class="q-pa-none">
        <div class="row q-my-md">
          <div class="col">
            <q-input
              style="width: 200px; margin-left: 62px"
              square
              outlined
              v-model="mensagemRapida.key"
              :label="$t('modalMensagemRapida.keyLabel')"
            />
            <p style="margin-left: 62px; font-size: 10px; margin-top: 3px;">
              {{ $t('modalMensagemRapida.keyHint') }}
            </p>
          </div>
        </div>
        <div class="row items-center">
          <div class="col-xs-3 col-sm-2 col-md-1">
            <q-btn round flat>
              <q-icon size="2em" name="mdi-emoticon-happy-outline" />
              <q-tooltip>{{ $t('modalMensagemRapida.emojiLabel') }}</q-tooltip>
              <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                <VEmojiPicker
                  style="width: 40vw"
                  :showSearch="false"
                  :emojisByRow="20"
                  :labelSearch="$t('common.search')"
                  lang="pt-BR"
                  @select="onInsertSelectEmoji"
                />
              </q-menu>
            </q-btn>
            <q-btn round flat dense>
              <q-icon size="2em" name="mdi-variable" />
              <q-tooltip>{{ $t('modalMensagemRapida.variablesLabel') }}</q-tooltip>
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
          </div>
          <div class="col-xs-8 col-sm-10 col-md-11 q-pl-sm">
            <label class="text-caption">{{ $t('modalMensagemRapida.messageLabel') }}</label>
            <textarea
              ref="inputEnvioMensagem"
              style="min-height: 15vh; max-height: 15vh;"
              class="q-pa-sm bg-white full-width"
              :placeholder="$t('modalMensagemRapida.placeholder')"
              autogrow
              dense
              outlined
              v-model="mensagemRapida.message"
            />
          </div>
          <div class="col-xs-3 col-sm-2 col-md-1">
            <q-checkbox v-model="isVoz" />
            <q-tooltip>{{ $t('modalMensagemRapida.sendAsAudio') }}</q-tooltip>
          </div>
          <div class="col-xs-8 col-sm-10 col-md-11 q-pl-sm">
            <q-file
              dense
              outlined
              v-model="arquivoCarregado"
              :label="$t('modalMensagemRapida.fileLabel')"
              filled
            />
          </div>
          <div
            class="col-12 q-pl-sm q-mt-sm"
            v-if="podeCompartilharMensagens"
          >
            <q-toggle
              v-model="isPublic"
              color="primary"
              :label="$t('modalMensagemRapida.publicLabel')"
            />
            <div class="text-caption text-grey-7 q-ml-sm">
              {{ $t('modalMensagemRapida.publicHint') }}
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="q-mt-md">
        <q-btn flat :label="$t('modalMensagemRapida.removeFile')" color="primary" @click="limparArquivo" />
        <q-btn
          flat
          :label="$t('common.cancel')"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          :label="$t('common.save')"
          color="primary"
          @click="handleMensagemRapida"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { VEmojiPicker } from 'src/components/VEmojiPicker.js'

import { CriarMensagemRapida, AlterarMensagemRapida } from 'src/service/mensagensRapidas.js'
export default {
  name: 'ModalMensagemRapida',
  components: { VEmojiPicker },
  props: {
    modalMensagemRapida: {
      type: Boolean,
      default: false
    },
    mensagemRapidaEmEdicao: {
      type: Object,
      default: () => {
        return { id: null, key: '', message: '', medias: '', voice: '', isPublic: false }
      }
    },
    mensagensExistentes: {
      type: Array,
      default: () => []
    },
    usuarioLogado: {
      type: Object,
      default: () => null
    }
  },
  emits: ['update:modalMensagemRapida', 'update:mensagemRapidaEmEdicao', 'mensagemRapida:criada', 'mensagemRapida:editada'],
  data () {
    return {
      mensagemRapida: {
        key: null,
        message: null,
        medias: null,
        voice: null,
        isPublic: false
      },
      arquivoCarregado: null,
      arquivoOriginal: null, // Rastreia se havia arquivo original ao abrir o modal
      isVoz: false,
      isPublic: false,
      // variaveis: this.$t('modalMensagemRapida.variablesList'),
      variaveis: [
        { label: 'Nome', value: '{{name}}' },
        { label: 'Saudação', value: '{{greeting}}' },
        { label: 'Protocolo', value: '{{protocol}}' },
        { label: 'E-mail (se existir)', value: '{{email}}' },
        { label: 'Telefone', value: '{{phoneNumber}}' },
        { label: 'Kanban (se existir)', value: '{{kanban}}' },
        { label: 'Atendente (se em atendimento)', value: '{{user}}' },
        { label: 'E-mail Atendente (se em atendimento)', value: '{{userEmail}}' },
        { label: 'Primeiro Nome (se existir)', value: '{{firstName}}' },
        { label: 'Sobrenome (se existir)', value: '{{lastName}}' },
        { label: 'Empresa (se existir)', value: '{{businessName}}' }
      ],
      // Sistema de gerenciamento de memória
      timers: []
    }
  },
  computed: {
    showDialog: {
      get () {
        return this.modalMensagemRapida
      },
      set (val) {
        this.$emit('update:modalMensagemRapida', val)
      }
    },
    usuarioAtual () {
      if (this.usuarioLogado && Object.keys(this.usuarioLogado).length) {
        return this.usuarioLogado
      }
      try {
        const armazenado = localStorage.getItem('usuario')
        return armazenado ? JSON.parse(armazenado) : null
      } catch (error) {
        console.error('Erro ao recuperar usuário do storage', error)
        return null
      }
    },
    perfilAtual () {
      return String(this.usuarioAtual?.profile || '').toLowerCase()
    },
    podeCompartilharMensagens () {
      return ['admin', 'super', 'supervisor', 'superadmin'].includes(this.perfilAtual)
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
    limparArquivo(){
      this.arquivoCarregado = null
      // Mantém arquivoOriginal para saber que havia arquivo e foi removido
      this.mensagemRapida.medias = null
      this.mensagemRapida.media = null
    },
    onInsertSelectEmoji (emoji) {
      const tArea = this.$refs.inputEnvioMensagem
      // get cursor's position:
      const startPos = tArea.selectionStart,
        endPos = tArea.selectionEnd,
        cursorPos = startPos,
        tmpStr = this.mensagemRapida.message || ''
      
      // filter:
      if (!emoji.data) {
        return
      }
      
      // insert:
      const newContent = tmpStr.substring(0, startPos) + emoji.data + tmpStr.substring(endPos, tmpStr.length)
      this.mensagemRapida.message = newContent
      
      // move cursor:
      const timerId = setTimeout(() => {
        tArea.selectionStart = tArea.selectionEnd = cursorPos + emoji.data.length
        tArea.focus()
      }, 10)
      this.addTimer(timerId);
    },
    resetFormulario () {
      this.mensagemRapida = {
        id: null,
        key: null,
        message: null,
        medias: null,
        voice: null,
        isPublic: false
      }
      this.arquivoCarregado = null
      this.arquivoOriginal = null
      this.isVoz = false
      this.isPublic = false
    },
    isMensagemPublica (mensagem = {}) {
      const valor = mensagem?.isPublic ?? mensagem?.is_public ?? mensagem?.public ?? mensagem?.publico
      if (typeof valor === 'string') {
        return ['true', '1', 'enabled', 'public', 'sim'].includes(valor.toLowerCase())
      }
      return Boolean(valor)
    },
    obterArquivoParaEnvio () {
      if (!this.arquivoCarregado) {
        return null
      }
      const arquivo = Array.isArray(this.arquivoCarregado)
        ? this.arquivoCarregado[0]
        : this.arquivoCarregado
      if (!arquivo) {
        return null
      }
      // Verifica se é um arquivo válido (tem propriedade size)
      if (typeof arquivo.size === 'number') {
        return arquivo
      }
      if (arquivo?.file && typeof arquivo.file.size === 'number') {
        return arquivo.file
      }
      const possuiTipoArquivo = (typeof File !== 'undefined' && arquivo instanceof File) || (typeof Blob !== 'undefined' && arquivo instanceof Blob)
      return possuiTipoArquivo ? arquivo : null
    },
    temArquivoValido () {
      // Verifica se há um arquivo válido selecionado (não apenas o objeto fake do arquivo original)
      return this.obterArquivoParaEnvio() !== null
    },
    valorPublicoParaEnvio () {
      if (this.podeCompartilharMensagens) {
        return Boolean(this.isPublic)
      }
      return this.isMensagemPublica(this.mensagemRapida)
    },
    fecharModal () {
      this.resetFormulario()
      this.$emit('update:mensagemRapidaEmEdicao', { id: null })
    },
    abrirModal () {
      if (this.mensagemRapidaEmEdicao.id) {
        this.mensagemRapida = { ...this.mensagemRapidaEmEdicao }
        this.isVoz = this.mensagemRapidaEmEdicao.voice === 'enabled'
        this.isPublic = this.isMensagemPublica(this.mensagemRapidaEmEdicao)
        // Rastreia se havia arquivo original
        this.arquivoOriginal = this.mensagemRapidaEmEdicao.media || null
        this.arquivoCarregado = this.mensagemRapidaEmEdicao.media
          ? [{ name: this.mensagemRapidaEmEdicao.media }]
          : null
      } else {
        this.resetFormulario()
      }
    },
    async handleMensagemRapida () {
      this.loading = true;
      try {
        let data;
        const arquivo = this.obterArquivoParaEnvio()
        const isPublic = this.valorPublicoParaEnvio()
        if (this.mensagemRapida.id) {
          const formData = new FormData();
          formData.append("key", this.mensagemRapida.key);
          formData.append("message", this.mensagemRapida.message || "");
          // Se há um novo arquivo válido selecionado, enviar ele
          if (this.temArquivoValido()) {
            formData.append("medias", arquivo);
          } 
          // Se não há novo arquivo mas havia arquivo original e foi removido explicitamente
          else if (this.arquivoOriginal && !this.arquivoCarregado) {
            // Enviar "null" como string para remover o arquivo
            formData.append("medias", "null");
          }
          // Se não há novo arquivo mas havia arquivo original (não foi removido)
          // Não enviar o campo medias para preservar o arquivo existente no backend
          // Se não havia arquivo original e não há novo arquivo, também não enviar o campo
          formData.append("voice", this.isVoz ? "enabled" : "disabled");
          formData.append('isPublic', isPublic ? 'true' : 'false')
          data = await AlterarMensagemRapida(this.mensagemRapida.id, formData);
          this.$emit('mensagemRapida:editada', { ...this.mensagemRapida, ...data.data })
        } else {
          const usuario = this.usuarioAtual || {}
          const formData = new FormData();
          formData.append("key", this.mensagemRapida.key);
          formData.append("message", this.mensagemRapida.message || "");
          if (arquivo) {
            formData.append("medias", arquivo);
          } else {
            formData.append("medias", null);
          }
          formData.append('voice', this.isVoz ? "enabled" : "disabled");
          formData.append('isPublic', isPublic ? 'true' : 'false')
          if (usuario?.id) {
            formData.append('userId', usuario.id)
          }
          if (usuario?.tenantId) {
            formData.append('tenantId', usuario.tenantId)
          }
          data = await CriarMensagemRapida(formData);
          this.$emit('mensagemRapida:criada', { ...this.mensagemRapida, ...data.data })
        }
        this.mensagemRapida.isPublic = isPublic
        this.$q.notify({
          type: 'positive',
          message: this.mensagemRapida.id ? this.$t('modalMensagemRapida.saveSuccess.update') : this.$t('modalMensagemRapida.saveSuccess.create')
        });
        // this.$emit('updateListaMensagens');
        this.showDialog = false
      } catch (error) {
        console.error(error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('modalMensagemRapida.saveError')
        });
      }
      this.loading = false;
    },
    onInsertSelectVariable (variable) {
      const tArea = this.$refs.inputEnvioMensagem
      // get cursor's position:
      const startPos = tArea.selectionStart,
        endPos = tArea.selectionEnd,
        cursorPos = startPos,
        tmpStr = this.mensagemRapida.message || ''
      
      // filter:
      if (!variable) {
        return
      }
      
      // insert:
      const newContent = tmpStr.substring(0, startPos) + variable + tmpStr.substring(endPos, tmpStr.length)
      this.mensagemRapida.message = newContent
      
      // move cursor:
      const timerId2 = setTimeout(() => {
        tArea.selectionStart = tArea.selectionEnd = cursorPos + variable.length
        tArea.focus()
      }, 10)
      this.addTimer(timerId2);
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

<style scoped lang="scss">
.q-dialog {
  .q-card {
    background: rgba(255,255,255,0.92);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.18);
    transition: all 0.3s;
    max-width: 95vw;
    margin: 0 auto;
  }

  .q-card-section {
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
    .text-h6 {
      color: var(--q-primary);
      font-weight: 600;
      font-size: 1.2rem;
    }
  }

  .q-input, .q-file, textarea {
    margin-bottom: 1rem;
    .q-field__control {
      border-radius: 10px;
      background: rgba(255,255,255,0.7);
      transition: background 0.2s;
      &:hover {
        background: rgba(255,255,255,0.9);
      }
    }
    &.q-field--focused .q-field__control {
      background: rgba(255,255,255,0.95);
      box-shadow: 0 4px 12px rgba(0,0,0,0.10);
    }
  }

  .q-card-actions {
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(0,0,0,0.05);
    .q-btn {
      border-radius: 8px;
      padding: 0.3rem 1rem;
      font-size: 0.9rem;
      min-height: 32px;
      transition: box-shadow 0.2s;
      &:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.13);
      }
    }
  }
}

body.body--dark {
  .q-dialog .q-card {
    background: rgba(30,30,30,0.97);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .q-card-section .text-h6 {
    color: var(--q-primary);
  }
  .q-input .q-field__control, .q-file .q-field__control, textarea {
    background: rgba(255,255,255,0.08);
    &:hover {
      background: rgba(255,255,255,0.13);
    }
  }
  .q-input.q-field--focused .q-field__control, .q-file.q-field--focused .q-field__control, textarea:focus {
    background: rgba(255,255,255,0.15);
  }
}

@media (max-width: 600px) {
  .q-dialog .q-card {
    width: 98vw !important;
    border-radius: 12px;
    padding: 0.5rem;
  }
  .q-card-section {
    padding: 1rem !important;
  }
  .q-card-actions {
    padding: 0.7rem 1rem !important;
    flex-direction: column;
    gap: 0.5rem;
    .q-btn {
      width: 100%;
    }
  }
}
</style>
