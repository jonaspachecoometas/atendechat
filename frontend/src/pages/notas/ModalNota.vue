<template>
  <q-dialog
    persistent
    :value="modalNota"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card style="width: 500px" class="q-pa-lg">
      <q-card-section>
        <div class="text-h6">
          {{ notaEdicao.id ? $t('modalNotas.titleEdit') : $t('modalNotas.titleCreate') }}
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="nota.notes"
          :label="$t('modalNotas.noteLabel')"
        />
        <q-input
          class="row col"
          square
          outlined
          v-model="nota.ticketId"
          :label="$t('modalNotas.ticketLabel')"
        />
      </q-card-section>
      <q-card-actions align="right" class="q-mt-md">
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
          @click="handleNota"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarNota, AlterarNota } from 'src/service/notas.js'
export default {
  name: 'ModalNota',
  props: {
    modalNota: {
      type: Boolean,
      default: false
    },
    notaEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      nota: {
        id: null,
        notes: null,
        ticketId: null,
      }
    }
  },
  methods: {
    resetarNota () {
      this.nota = {
        id: null,
        notes: null,
        ticketId: null,
      }
    },
    fecharModal () {
      this.resetarNota()
      this.$emit('update:notaEdicao', { id: null })
      this.$emit('update:modalNota', false)
    },
    abrirModal () {
      if (this.notaEdicao.id) {
        this.nota = { ...this.notaEdicao }
      } else {
        this.resetarNota()
      }
    },
    async handleNota () {
      try {
        this.loading = true
        if (this.nota.id) {
          const { data } = await AlterarNota(this.nota)
          this.$emit('modal-nota:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('modalNotas.saveSuccess'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarNota(this.nota)
          this.$emit('modal-nota:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalNotas.saveSuccess'),
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
        this.$notificarErro(this.$t('modalNotas.saveError'), error)
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
