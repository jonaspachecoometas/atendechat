<template>
  <q-dialog
    v-model="showDialog"
    @hide="fecharModal"
    persistent
  >
    <q-card
      style="min-width: 400px; width: 60vw"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ acaoEtapaEdicao.id ? 'Editar Ação' : 'Nova Ação' }}</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col q-mt-md"
          outlined
          v-model="acao.words"
          label="Palavras Chave"
          hint="Para multiplas palavras, separe por vírgula. Ex: palavra1, palavra2"
        />
        <q-select
          outlined
          class="row col q-mt-md"
          v-model="acao.action"
          :options="acaoEtapa"
          label="Ação"
          emit-value
          map-options
        />
        <q-select
          v-if="acao.action === '0'"
          outlined
          class="row col q-mt-md"
          v-model="acao.nextStepId"
          :options="etapas"
          label="Próxima Etapa"
          emit-value
          map-options
        />
        <q-select
          v-if="acao.action === '1'"
          outlined
          class="row col q-mt-md"
          v-model="acao.queueId"
          :options="filas"
          option-value="id"
          option-label="queue"
          label="Fila"
          emit-value
          map-options
        />
        <q-select
          v-if="acao.action === '2'"
          outlined
          class="row col q-mt-md"
          v-model="acao.userIdDestination"
          :options="usuarios"
          option-value="id"
          option-label="name"
          label="Usuário"
          emit-value
          map-options
        />
        <q-input
          class="row col q-mt-md"
          outlined
          type="textarea"
          v-model="acao.replyDefinition"
          label="Mensagem de retorno"
        />

      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
        <q-btn
          flat
          label="Cancelar"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          label="Salvar"
          color="primary"
          @click="handleAcao"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarAcaoEtapa, EditarAcaoEtapa } from 'src/service/autoResposta.js'
export default {
  name: 'ModalAcaoEtapa',
  props: {
    modalAcaoEtapa: {
      type: Boolean,
      default: false
    },
    acaoEtapaEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    },
    autoReply: {
      type: Object,
      default: () => ({})
    },
    etapaAutoResposta: {
      type: Object,
      default: () => ({})
    },
    filas: {
      type: Array,
      default: () => []
    },
    usuarios: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modalAcaoEtapa', 'update:acaoEtapaEdicao', 'acaoEtapa:criada', 'acaoEtapa:editada'],
  data () {
    return {
      acao: {
        words: null,
        action: '0',
        nextStepId: null,
        queueId: null,
        userIdDestination: null,
        replyDefinition: null
      },
      acaoEtapa: [
        { value: '0', label: 'Próxima Etapa' },
        { value: '1', label: 'Encaminhar para Fila' },
        { value: '2', label: 'Ecaminhar para Usuário' }
      ]
    }
  },
  computed: {
    showDialog: {
      get () {
        return this.modalAcaoEtapa
      },
      set (val) {
        this.$emit('update:modalAcaoEtapa', val)
      }
    },
    etapas () {
      const options = this.autoReply.stepsReply.map(s => ({
        label: s.reply,
        value: s.id
      }))
      return options
    }
  },
  methods: {
    resetarAcao () {
      this.acao = {
        words: null,
        action: '0',
        nextStepId: null,
        queueId: null,
        userIdDestination: null,
        replyDefinition: null
      }
    },
    fecharModal () {
      this.resetarAcao()
      this.$emit('update:acaoEtapaEdicao', { id: null })
    },
    abrirModal () {
      if (this.acaoEtapaEdicao.id) {
        this.acao = { ...this.acaoEtapaEdicao }
      } else {
        this.resetarAcao()
      }
    },
    async handleAcao () {
      const acao = {
        ...this.acao,
        stepReplyId: this.etapaAutoResposta.id
      }
      try {
        this.loading = true
        if (acao.id) {
          const { data } = await EditarAcaoEtapa(acao)
          this.$emit('acaoEtapa:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Ação editada com sucesso!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarAcaoEtapa(acao)
          this.$emit('acaoEtapa:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Ação criada com sucesso!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.showDialog = false
      } catch (error) {
        console.error(error)
        this.$notificarErro('Ocorreu um erro ao salvar a ação', error)
      }
    }
  },
  watch: {
    modalAcaoEtapa: {
      handler (newValue, oldValue) {
        if (newValue) {
          this.abrirModal()
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>