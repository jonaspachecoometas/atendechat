<template>
  <q-dialog
    persistent
    :model-value="modalDespedida"
    @update:model-value="$emit('update:modalDespedida', $event)"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg modern-modal"
    >
      <q-card-section class="modal-header">
        <div class="text-h6">
          {{ despedidaEdicao.id ? $t('modalDespedida.titleEdit') : $t('modalDespedida.titleCreate') }}
        </div>
      </q-card-section>
      <q-card-section class="modal-body">
        <q-input
          class="row col q-mb-md"
          square
          outlined
          v-model="despedida.name"
          :label="$t('modalDespedida.nameLabel')"
        />
        <q-input
          class="row col q-mb-md"
          square
          outlined
          v-model="despedida.message"
          :label="$t('modalDespedida.label')"
          autogrow
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
          @click="handleDespedida"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarDespedidaPrivada, AlterarDespedidaPrivada } from 'src/service/despedidaprivada.js'

export default {
  name: 'ModalDespedida',
  props: {
    modalDespedida: {
      type: Boolean,
      default: false
    },
    despedidaEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      despedida: {
        id: null,
        name: '',
        message: ''
      }
    }
  },
  methods: {
    resetarDespedida () {
      this.despedida = {
        id: null,
        name: '',
        message: ''
      }
    },
    fecharModal () {
      this.resetarDespedida()
      this.$emit('update:despedidaEdicao', { id: null })
      this.$emit('update:modalDespedida', false)
    },
    abrirModal () {
      if (this.despedidaEdicao.id) {
        this.despedida = { ...this.despedidaEdicao }
      } else {
        this.resetarDespedida()
      }
    },
    async handleDespedida () {
      try {
        this.loading = true
        if (this.despedida.id) {
          const { data } = await AlterarDespedidaPrivada(this.despedida)
          this.$emit('modal-despedida:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('modalDespedida.notifications.updated'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarDespedidaPrivada(this.despedida)
          this.$emit('modal-despedida:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalDespedida.notifications.created'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
        // setTimeout(() => {
        //   window.location.reload();
        // }, 300);
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('modalDespedida.notifications.error'), error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.modern-modal {
  border-radius: 16px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
    border-bottom: 1px solid #e9ecef;

    .text-h6 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--q-primary);
    }
  }

  .modal-body {
    padding: 1.5rem;

    :deep(.q-field) {
      .q-field__control {
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
          border-color: var(--q-primary);
        }
      }

      &.q-field--focused .q-field__control {
        border-color: var(--q-primary);
        box-shadow: 0 0 0 2px rgba(var(--q-primary-rgb), 0.1);
      }
    }
  }
}

:deep(.q-dialog__backdrop) {
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.4);
}
</style>
