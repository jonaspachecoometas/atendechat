<template>
  <q-dialog
    persistent
    :model-value="modalMotivo"
    @update:model-value="$emit('update:modalMotivo', $event)"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ motivoEdicao.id ? $t('configuracoesModalMotivos.edit') : $t('configuracoesModalMotivos.create') }}</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="motivo.name"
          :label="$t('configuracoesModalMotivos.name')"
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
          @click="handleMotivo"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarMotivo, AlterarMotivo } from 'src/service/motivos.js'
export default {
  name: 'ModalMotivo',
  props: {
    modalMotivo: {
      type: Boolean,
      default: false
    },
    motivoEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      motivo: {
        id: null,
        name: null
      }
    }
  },
  methods: {
    resetarMotivo () {
      this.motivo = {
        id: null,
        name: null
      }
    },
    fecharModal () {
      this.resetarMotivo()
      this.$emit('update:motivoEdicao', { id: null })
      this.$emit('update:modalMotivo', false)
    },
    abrirModal () {
      if (this.motivoEdicao.id) {
        this.motivo = { ...this.motivoEdicao }
      } else {
        this.resetarMotivo()
      }
    },
    async handleMotivo () {
      try {
        this.loading = true
        if (this.motivo.id) {
          const { data } = await AlterarMotivo(this.motivo)
          this.$emit('modal-motivo:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('common.updated'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          console.log('this.motivo', this.motivo)
          const { data } = await CriarMotivo(this.motivo)
          this.$emit('modal-motivo:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('configuracoesModalMotivos.notifications.created'),
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
        this.$notificarErro(this.$t('common.notifications.error'), error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.q-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
}

.q-card-section {
  padding: 18px 24px;
}

.q-input {
  .q-field__control {
    background: rgba(255,255,255,0.7);
    border-radius: 8px;
    transition: all 0.3s ease;
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
  padding: 16px 24px;
  border-top: 1px solid rgba(0,0,0,0.06);
}

/* Modo Escuro */
body.body--dark {
  .q-card {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  }
  .q-input {
    .q-field__control {
      background: rgba(255,255,255,0.05);
      &:hover {
        background: rgba(255,255,255,0.10);
      }
    }
    &.q-field--focused .q-field__control {
      background: rgba(255,255,255,0.15);
    }
  }
}

@media (max-width: 600px) {
  .q-card {
    width: 98vw !important;
    min-width: unset !important;
    border-radius: 10px;
    padding: 0;
  }
  .q-card-section, .q-card-actions {
    padding: 10px 8px;
  }
}
</style>
