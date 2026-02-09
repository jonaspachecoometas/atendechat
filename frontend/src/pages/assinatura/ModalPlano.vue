<!-- <template>
  <q-dialog
    persistent
    :value="modalPlano"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ planoEdicao.id ? 'Editar': 'Criar' }} Plano</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model.number="plano.value"
          label="Valor do Plano"
          type="number"
          step="0.01"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model.number="plano.connections"
          label="Conexões"
          type="number"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model.number="plano.users"
          :label="$t('common.users')"
          type="number"
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
          @click="handlePlano"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template> -->
<template>
  <q-dialog
    persistent
    :value="modalPlano"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card style="width: 500px" class="q-pa-lg">
      <q-card-section>
        <div class="text-h6">
          {{ planoEdicao.id ? $t('modalPlano.titleEdit') : $t('modalPlano.titleCreate') }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model.number="plano.value"
          :label="$t('modalPlano.valueLabel')"
          type="number"
          step="0.01"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model.number="plano.connections"
          :label="$t('modalPlano.connectionsLabel')"
          type="number"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model.number="plano.users"
          :label="$t('modalPlano.usersLabel')"
          type="number"
        />
      </q-card-section>
      <q-card-actions align="right" class="q-mt-md">
        <q-btn
          flat
          :label="$t('modalPlano.cancelButton')"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          :label="$t('modalPlano.saveButton')"
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
        value: null,
        connections: null,
        users: null
      }
    }
  },
  methods: {
    resetarPlano () {
      this.plano = {
        id: null,
        value: null,
        connections: null,
        users: null
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
            message: this.$t("modalPlano.successEdit"),
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
            message: this.$t("modalPlano.successCreate"),
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
        this.$notificarErro(this.$t("modalPlano.error"), error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    width: 500px;

    &:hover {
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .q-card-section {
      padding: 1.2rem 1.5rem;

      .text-h6 {
        color: var(--q-primary);
        font-weight: 600;
        font-size: 1.2rem;
        margin: 0;
      }
    }

    .q-input {
      margin-bottom: 1rem;

      .q-field__control {
        background: rgba(255, 255, 255, 0.7);
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.9);
        }

        .q-field__native {
          padding: 0.5rem;
        }
      }

      &.q-field--focused .q-field__control {
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      &.q-field--error .q-field__control {
        background: rgba(255, 0, 0, 0.05);
      }
    }
  }
}

/* Modo Escuro */
body.body--dark {
  .q-dialog {
    .q-card {
      background: rgba(30, 30, 30, 0.95);
      border-color: rgba(255, 255, 255, 0.1);

      .q-input {
        .q-field__control {
          background: rgba(255, 255, 255, 0.05);

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        &.q-field--focused .q-field__control {
          background: rgba(255, 255, 255, 0.15);
        }

        &.q-field--error .q-field__control {
          background: rgba(255, 0, 0, 0.1);
        }
      }
    }
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .q-dialog {
    .q-card {
      width: 95vw !important;
      margin: 1rem;
      border-radius: 12px;

      .q-card-section {
        padding: 1rem;

        .text-h6 {
          font-size: 1.1rem;
        }
      }

      .q-input {
        margin-bottom: 0.8rem;

        .q-field__control {
          .q-field__native {
            padding: 0.4rem;
          }
        }
      }
    }
  }
}
</style>
