<template>
  <q-dialog
    persistent
    :model-value="modalKanban"
    @update:model-value="$emit('update:modalKanban', $event)"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ kanbanEdicao.id ? $t('configuracoesModalCampanha.edit') : $t('configuracoesModalCampanha.create') }}</div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="kanban.name"
          :label="$t('configuracoesModalCampanha.name')"
        />
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="kanban.position"
          :label="$t('configuracoesModalCampanha.position')"
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
          @click="handleKanban"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarKanban, AlterarKanban } from 'src/service/kanban.js'
export default {
  name: 'ModalKanban',
  props: {
    modalKanban: {
      type: Boolean,
      default: false
    },
    kanbanEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      kanban: {
        id: null,
        name: null,
        position: null
      }
    }
  },
  methods: {
    resetarKanban () {
      this.kanban = {
        id: null,
        name: null,
        position: null
      }
    },
    fecharModal () {
      this.resetarKanban()
      this.$emit('update:kanbanEdicao', { id: null })
      this.$emit('update:modalKanban', false)
    },
    abrirModal () {
      if (this.kanbanEdicao.id) {
        this.kanban = { ...this.kanbanEdicao }
      } else {
        this.resetarKanban()
      }
    },
    async handleKanban () {
      try {
        if (!this.kanban.position) {
          this.kanban.position = null;
        }
        this.loading = true
        if (this.kanban.id) {
          const { data } = await AlterarKanban(this.kanban)
          this.$emit('modal-kanban:editada', data)
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
          const { data } = await CriarKanban(this.kanban)
          this.$emit('modal-kanban:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('configuracoesModalCampanha.notifications.created'),
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
