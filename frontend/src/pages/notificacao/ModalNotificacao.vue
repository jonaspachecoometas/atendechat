<template>
  <q-dialog
    persistent
    :model-value="modalNotificacao"
    @update:model-value="$emit('update:modalNotificacao', $event)"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">
          {{ notificacaoEdicao.id ? $t('modalNotificacao.title.edit') : $t('modalNotificacao.title.create') }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          style="margin-bottom: 15px; margin-right: 5px;"
          v-model="notificacao.message"
          :label="$t('modalNotificacao.fields.message')"
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
          @click="handleNotificacao"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { criarNotificacao, alterarNotificacao } from 'src/service/notificacao.js'

export default {
  name: 'ModalNotificacao',
  props: {
    modalNotificacao: {
      type: Boolean,
      default: false
    },
    notificacaoEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data() {
    return {
      notificacao: {
        id: null,
      }
    }
  },
  methods: {
    resetarNotificacao() {
      this.notificacao = {
        id: null
      }
    },
    fecharModal() {
      this.resetarNotificacao();
      this.$emit('update:notificacaoEdicao', { id: null });
      this.$emit('update:modalNotificacao', false);
    },
    abrirModal() {
      if (this.notificacaoEdicao.id) {
        this.notificacao = { ...this.notificacaoEdicao };
      } else {
        this.resetarNotificacao();
      }
    },
    async handleNotificacao() {
      try {
        this.loading = true;
        if (this.notificacao.id) {
          const { data } = await alterarNotificacao(this.notificacao);
          this.$emit('modal-notificacao:editada', data);
          this.$emit('reload-notificacoes');
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('modalNotificacao.notifications.updated'),
            actions: [{ icon: 'close', round: true, color: 'white' }]
          });
        } else {
          const { data } = await criarNotificacao(this.notificacao);
          this.$emit('modal-notificacao:criada', data);
          this.$emit('reload-notificacoes');
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalNotificacao.notifications.created'),
            actions: [{ icon: 'close', round: true, color: 'white' }]
          });
        }
        this.loading = false;
        this.fecharModal();
      } catch (error) {
        console.error(error);
        this.$q.notify({
          type: 'negative',
          progress: true,
          position: 'top',
          message: this.$t('modalNotificacao.notifications.error'),
          actions: [{ icon: 'close', round: true, color: 'white' }]
        });
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
