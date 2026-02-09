<template>
  <q-dialog
    persistent
    :model-value="modalPlano"
    @update:model-value="v => $emit('update:modalPlano', v)"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ planoEdicao.id ? $t('modalPlanos.title.edit') : $t('modalPlanos.title.create') }}</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="plano.name"
          :label="$t('modalPlanos.labels.name')"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model.number="plano.value"
          :label="$t('modalPlanos.labels.value')"
          type="number"
          step="0.01"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model.number="plano.connections"
          :label="$t('modalPlanos.labels.connections')"
          type="number"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model.number="plano.users"
          :label="$t('modalPlanos.labels.users')"
          type="number"
        />
        <q-toggle
          class="row col"
          v-model="plano.trial"
          :label="$t('modalPlanos.labels.trial')"
          :true-value="'enabled'"
          :false-value="'disabled'"
        />
        <q-banner class="bg-yellow text-black" inline-actions style="margin-bottom: 10px;">
          <p><b>{{ $t('common.attention') }}</b>: {{ $t('modalPlanos.warnings.trial') }}</p>
        </q-banner>
        <q-input
          class="row col"
          square
          outlined
          v-model.number="plano.trialPeriod"
          :label="$t('modalPlanos.labels.trialPeriod')"
          type="number"
        />
      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
        <q-btn
          flat
          :label="$t('modalPlanos.buttons.cancel')"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          :label="$t('modalPlanos.buttons.save')"
          color="primary"
          @click="handlePlano"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarPlano, AlterarPlano } from 'src/service/planos.js'
export default {
  name: 'ModalPlano',
  props: {
    modalPlano: {
      type: Boolean,
      default: false
    },
    planoEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      plano: {
        id: null,
        name: null,
        value: null,
        connections: null,
        users: null,
        trial: 'disabled',
        trialPeriod: 3
      }
    }
  },
  watch: {
    planoEdicao: {
      handler (newVal) {
        if (this.modalPlano) {
          if (newVal && newVal.id) {
            this.plano = { ...newVal }
          } else {
            this.resetarPlano()
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    resetarPlano () {
      this.plano = {
        id: null,
        name: null,
        value: null,
        connections: null,
        users: null,
        trial: 'disabled',
        trialPeriod: 3
      }
    },
    fecharModal () {
      this.resetarPlano()
      this.$emit('update:planoEdicao', { id: null })
      this.$emit('update:modalPlano', false)
    },
    abrirModal () {
      if (this.planoEdicao.id) {
        this.plano = { ...this.planoEdicao }
      } else {
        this.resetarPlano()
      }
    },
    async handlePlano () {
      if (this.plano.trialPeriod === '') {
        this.plano.trialPeriod = null;
      }
      try {
        this.loading = true
        if (this.plano.id) {
          const { data } = await AlterarPlano(this.plano)
          this.$emit('modal-plano:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('modalPlanos.notifications.updated'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarPlano(this.plano)
          this.$emit('modal-plano:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalPlanos.notifications.created'),
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

.q-banner.bg-yellow {
  background: #fffbe6 !important;
  color: #222 !important;
  border: 1px solid #ffe58f !important;
}

body.body--dark {
  .q-banner.bg-yellow {
    background: #fffbe6 !important;
    color: #222 !important;
    border: 1px solid #ffe58f !important;
  }
}
</style>
