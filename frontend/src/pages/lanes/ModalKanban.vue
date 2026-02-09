<template>
  <q-dialog
    persistent
    :value="modalKanban"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">
          {{ kanbanEdicao.id ? $t('modalLanesKanban.editTitle') : $t('modalLanesKanban.createTitle') }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="kanban.name"
          :label="$t('modalLanesKanban.nameLabel')"
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
        name: null
      }
    }
  },
  methods: {
    resetarKanban () {
      this.kanban = {
        id: null,
        name: null
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
        this.loading = true
        if (this.kanban.id) {
          const { data } = await AlterarKanban(this.kanban)
          this.$emit('modal-kanban:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t("modalLanesKanban.updateSuccess"),
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
            message: this.$t("modalLanesKanban.createSuccess"),
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
        this.$notificarErro(this.$t('modalLanesKanban.notifications.error'), error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.q-card {
  background: rgba(255,255,255,0.92);
  border-radius: 20px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.13);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.06);
  transition: box-shadow 0.2s, background 0.2s;
}

.q-card-section .text-h6 {
  font-weight: 700;
  color: var(--q-primary);
}

.q-btn {
  border-radius: 4px;
  min-width: 20px;
  min-height: 20px;
  padding: 0.08rem 0.4rem;
  font-size: 0.78rem;
  transition: box-shadow 0.2s, background 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
}

.q-btn:hover {
  box-shadow: 0 2px 4px rgba(0,0,0,0.11);
  background: rgba(var(--q-primary-rgb), 0.09);
}

.q-input {
  border-radius: 8px;
}

body.body--dark .q-card {
  background: rgba(30,30,30,0.98);
  box-shadow: 0 6px 32px rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.10);
}

@media (max-width: 900px) {
  .q-card {
    border-radius: 12px;
    padding: 0.5rem;
  }
}
</style>
