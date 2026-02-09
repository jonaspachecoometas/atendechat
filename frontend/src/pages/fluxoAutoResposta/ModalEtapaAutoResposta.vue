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
        <div class="text-h6">{{ etapaAutoRespostaEdicao.id ? 'Editar Etapa' : 'Nova Etapa' }}</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col q-mt-md"
          outlined
          type="textarea"
          v-model="etapaAutoResposta.reply"
          label="Mensagem"
        />
        <q-toggle
          class="q-mt-md"
          v-model="etapaAutoResposta.initialStep"
          label="Etapa Inicial"
          :true-value="true"
          :false-value="false"
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
          @click="handleEtapa"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarEtapaResposta, EditarEtapaResposta } from 'src/service/autoResposta.js'
export default {
  name: 'ModalEtapaAutoResposta',
  props: {
    modalEtapaAutoResposta: {
      type: Boolean,
      default: false
    },
    etapaAutoRespostaEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    },
    autoReply: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:modalEtapaAutoResposta', 'update:etapaAutoRespostaEdicao', 'etapaAutoResposta:criada', 'etapaAutoResposta:editada'],
  data () {
    return {
      etapaAutoResposta: {
        reply: null,
        initialStep: false
      }
    }
  },
  computed: {
    showDialog: {
      get () {
        return this.modalEtapaAutoResposta
      },
      set (val) {
        this.$emit('update:modalEtapaAutoResposta', val)
      }
    }
  },
  methods: {
    resetarEtapa () {
      this.etapaAutoResposta = {
        reply: null,
        initialStep: false
      }
    },
    fecharModal () {
      this.resetarEtapa()
      this.$emit('update:etapaAutoRespostaEdicao', { id: null })
    },
    abrirModal () {
      if (this.etapaAutoRespostaEdicao.id) {
        this.etapaAutoResposta = { ...this.etapaAutoRespostaEdicao }
      } else {
        this.resetarEtapa()
      }
    },
    async handleEtapa () {
      const etapa = {
        ...this.etapaAutoResposta,
        idAutoReply: this.autoReply.id
      }
      try {
        this.loading = true
        if (etapa.id) {
          const { data } = await EditarEtapaResposta(etapa)
          this.$emit('etapaAutoResposta:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: 'Etapa editada com sucesso!',
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarEtapaResposta(etapa)
          this.$emit('etapaAutoResposta:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: 'Etapa criada com sucesso!',
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
        this.$notificarErro('Ocorreu um erro ao salvar a etapa', error)
      }
    }
  },
  watch: {
    modalEtapaAutoResposta: {
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