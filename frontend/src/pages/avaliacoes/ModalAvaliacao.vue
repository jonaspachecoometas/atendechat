<!-- <template>
  <q-dialog
    persistent
    :value="modalAvaliacao"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ avaliacaoEdicao.id ? 'Editar': 'Criar' }} Avaliação</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="avaliacao.evaluation"
          label="Avaliação"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model="avaliacao.attempts"
          label="Tentativas"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model="avaliacao.ticketId"
          label="Atendimento"
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
          @click="handleAvaliacao"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template> -->
<template>
  <q-dialog
    persistent
    :value="modalAvaliacao"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">
          {{ avaliacaoEdicao.id ? $t("modalAvaliacao.editTitle") : $t("modalAvaliacao.createTitle") }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="avaliacao.evaluation"
          :label="$t('modalAvaliacao.evaluationLabel')"
          dense
        />
        <q-input
          class="row col"
          square
          outlined
          v-model.number="avaliacao.attempts"
          :label="$t('modalAvaliacao.attemptsLabel')"
          type="number"
          dense
        />
        <q-input
          class="row col"
          square
          outlined
          v-model.number="avaliacao.ticketId"
          :label="$t('modalAvaliacao.ticketLabel')"
          type="number"
          dense
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
          @click="handleAvaliacao"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarAvaliacao, AlterarAvaliacao } from 'src/service/avaliacoes.js'
export default {
  name: 'ModalAvaliacao',
  props: {
    modalAvaliacao: {
      type: Boolean,
      default: false
    },
    avaliacaoEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      avaliacao: {
        id: null,
        evaluation: null,
        attempts: null,
        ticketId: null,
      }
    }
  },
  methods: {
    resetarAvaliacao () {
      this.avaliacao = {
        id: null,
        evaluation: null,
        attempts: null,
        ticketId: null,
      }
    },
    fecharModal () {
      this.resetarAvaliacao()
      this.$emit('update:avaliacaoEdicao', { id: null })
      this.$emit('update:modalAvaliacao', false)
    },
    abrirModal () {
      if (this.avaliacaoEdicao.id) {
        this.avaliacao = { ...this.avaliacaoEdicao }
      } else {
        this.resetarAvaliacao()
      }
    },
    async handleAvaliacao () {
      try {
        this.loading = true
        if (this.avaliacao.id) {
          const { data } = await AlterarAvaliacao(this.avaliacao)
          this.$emit('modal-avaliacao:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t("modalAvaliacao.updateSuccess"),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarAvaliacao(this.avaliacao)
          this.$emit('modal-avaliacao:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t("modalAvaliacao.createSuccess"),
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
        this.$notificarErro(this.$t("modalAvaliacao.errorMessage"), error)
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
  }

  &.q-field--focused .q-field__control {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.filled {
    .q-field__control {
      background: rgba(var(--q-primary-rgb), 0.05);
    }
  }

  &.q-field--error {
    .q-field__control {
      border-color: var(--q-negative);
      background: rgba(var(--q-negative-rgb), 0.05);
    }
  }
}

/* Modo Escuro */
body.body--dark {
  .q-dialog {
    .q-card {
      background: rgba(30, 30, 30, 0.95);
      border-color: rgba(255, 255, 255, 0.1);

      .text-h6 {
        color: var(--q-primary);
      }
    }
  }

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

    &.filled {
      .q-field__control {
        background: rgba(255, 255, 255, 0.05);
      }
    }

    &.q-field--error {
      .q-field__control {
        background: rgba(var(--q-negative-rgb), 0.1);
      }
    }
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .q-dialog {
    .q-card {
      width: 90vw !important;
      margin: 1rem;
      border-radius: 12px;

      .q-card-section {
        padding: 1rem;
      }
    }
  }

  .q-input {
    margin-bottom: 0.8rem;
  }
}
</style>
