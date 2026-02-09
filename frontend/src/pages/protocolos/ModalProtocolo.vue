<template>
  <q-dialog
    persistent
    :model-value="modalProtocolo"
    @update:model-value="$emit('update:modalProtocolo', $event)"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">
          {{ protocoloEdicao.id ? $t('modalProtocolo.title.edit') : $t('modalProtocolo.title.create') }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="protocolo.protocol"
          :label="$t('modalProtocolo.fields.protocol')"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model="protocolo.ticketId"
          :label="$t('modalProtocolo.fields.ticketId')"
        />
      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
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
          @click="handleProtocolo"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarProtocolo, AlterarProtocolo } from 'src/service/protocolos.js'
export default {
  name: 'ModalProtocolo',
  props: {
    modalProtocolo: {
      type: Boolean,
      default: false
    },
    protocoloEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      protocolo: {
        id: null,
        protocol: null,
        ticketId: null,
      }
    }
  },
  methods: {
    resetarProtocolo () {
      this.protocolo = {
        id: null,
        protocol: null,
        ticketId: null,
      }
    },
    fecharModal () {
      this.resetarProtocolo()
      this.$emit('update:protocoloEdicao', { id: null })
      this.$emit('update:modalProtocolo', false)
    },
    abrirModal () {
      if (this.protocoloEdicao.id) {
        this.protocolo = { ...this.protocoloEdicao }
      } else {
        this.resetarProtocolo()
      }
    },
    async handleProtocolo () {
      try {
        this.loading = true
        if (this.protocolo.id) {
          const { data } = await AlterarProtocolo(this.protocolo)
          this.$emit('modal-protocolo:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('modalProtocolo.notifications.updated'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarProtocolo(this.protocolo)
          this.$emit('modal-protocolo:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalProtocolo.notifications.created'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('modalProtocolo.notifications.error'), error)
      }
    }
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

  .q-input {
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
  .q-input .q-field__control {
    background: rgba(255,255,255,0.08);
    &:hover {
      background: rgba(255,255,255,0.13);
    }
  }
  .q-input.q-field--focused .q-field__control {
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
