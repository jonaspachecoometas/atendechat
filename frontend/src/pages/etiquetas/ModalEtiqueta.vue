<template>
  <q-dialog
    persistent
    v-model="showDialog"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg modern-modal"
    >
      <q-card-section class="modal-header">
        <div class="text-h6">
          {{ etiquetaEdicao.id ? $t('modalEtiqueta.titleEdit') : $t('modalEtiqueta.titleCreate') }}
        </div>
      </q-card-section>
      <q-card-section class="modal-body">
        <q-input
          class="row col q-mb-md"
          square
          outlined
          v-model="etiqueta.tag"
          :label="$t('modalEtiqueta.nameLabel')"
        />
        <q-input
          filled
          hide-bottom-space
          :style="`background: ${etiqueta.color} `"
          v-model="etiqueta.color"
          :rules="['anyColor']"
          class="q-my-md color-input"
        >
          <template v-slot:append>
            <q-icon
              name="colorize"
              class="cursor-pointer"
            >
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color
                  format-model="hex"
                  square
                  default-view="palette"
                  no-header
                  bordered
                  v-model="etiqueta.color"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-checkbox
          v-model="etiqueta.isActive"
          :label="$t('modalEtiqueta.activeLabel')"
          class="modern-checkbox"
        />
      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
        <q-btn
          flat
          :label="$t('modalEtiqueta.cancelButton')"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          :label="$t('modalEtiqueta.saveButton')"
          color="primary"
          @click="handleEtiqueta"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarEtiqueta, AlterarEtiqueta } from 'src/service/etiquetas.js'
export default {
  name: 'ModalEtiqueta',
  props: {
    modalEtiqueta: {
      type: Boolean,
      default: false
    },
    etiquetaEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  emits: ['update:modalEtiqueta', 'update:etiquetaEdicao', 'modal-etiqueta:criada', 'modal-etiqueta:editada'],
  data () {
    return {
      etiqueta: {
        id: null,
        tag: null,
        color: '#4c4c4c',
        isActive: true
      }
    }
  },
  computed: {
    showDialog: {
      get () {
        return this.modalEtiqueta
      },
      set (val) {
        this.$emit('update:modalEtiqueta', val)
      }
    }
  },
  methods: {
    resetarEtiqueta () {
      this.etiqueta = {
        id: null,
        tag: null,
        color: '#4c4c4c',
        isActive: true
      }
    },
    fecharModal () {
      this.resetarEtiqueta()
      this.$emit('update:etiquetaEdicao', { id: null })
    },
    abrirModal () {
      if (this.etiquetaEdicao.id) {
        this.etiqueta = { ...this.etiquetaEdicao }
      } else {
        this.resetarEtiqueta()
      }
    },
    async handleEtiqueta () {
      try {
        this.loading = true
        if (this.etiqueta.id) {
          const { data } = await AlterarEtiqueta(this.etiqueta)
          this.$emit('modal-etiqueta:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('modalEtiqueta.notifications.updated'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarEtiqueta(this.etiqueta)
          this.$emit('modal-etiqueta:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalEtiqueta.notifications.created'),
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
        this.$notificarErro(this.$t('modalEtiqueta.notifications.error'), error)
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
    :deep(.color-input) {
      input {
        font-weight: bold;
        letter-spacing: 1px;
      }
    }
    :deep(.modern-checkbox) {
      display: flex;
      align-items: center;
      margin-top: 1.2rem;
      margin-bottom: 0.5rem;
      .q-checkbox__inner {
        width: 24px;
        height: 24px;
        min-width: 24px;
        min-height: 24px;
        border-radius: 6px;
        border: 2px solid #bfc9d1;
        background: #f8f9fa;
        transition: border-color 0.2s, box-shadow 0.2s;
        margin-right: 10px;
      }
      .q-checkbox__inner--truthy {
        border-color: var(--q-primary);
        background: var(--q-primary);
        box-shadow: 0 0 0 2px rgba(var(--q-primary-rgb), 0.10);
      }
      .q-checkbox__icon {
        font-size: 1.2rem;
      }
      .q-checkbox__label {
        font-size: 1.08rem;
        color: #2c3e50;
        font-weight: 500;
        margin-left: 4px;
      }
      &:focus-within .q-checkbox__inner {
        border-color: var(--q-primary);
        box-shadow: 0 0 0 2px rgba(var(--q-primary-rgb), 0.18);
      }
    }
  }
}
:deep(.q-dialog__backdrop) {
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.4);
}
</style>