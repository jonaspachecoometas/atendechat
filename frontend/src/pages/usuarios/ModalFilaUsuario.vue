<template>
  <q-dialog
    persistent
    v-model="dialogProxy"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card style="width: 400px">
      <q-card-section class="q-pa-none">
        <div class="full-width text-h6 row col bg-grey-4 q-pa-sm">
          {{ $t('modalFilaUsuario.title') }}
        </div>
        <div
          style="font-size: 1em"
          class="text-caption text-bold row col q-px-sm q-pt-sm"
        >
          {{ $t('modalFilaUsuario.name') }}: {{ usuarioSelecionado.name }}
        </div>
        <div
          style="font-size: 1em"
          class="text-caption text-bold row col q-px-sm"
        >
          {{ $t('modalFilaUsuario.email') }}: {{ usuarioSelecionado.email }}
        </div>
        <q-separator spaced />
      </q-card-section>
      <q-card-section>
        <template v-for="fila in filas" :key="fila.id">
          <div
            class="row col"
          >
            <q-checkbox
              :disable="!fila.isActive"
              v-model="filasUsuario"
              :label="`${fila.queue} ${!fila.isActive ? $t('modalFilaUsuario.inactive') : ''}`"
              :val="fila.id"
            />
          </div>
        </template>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          :label="$t('common.out')"
          class="q-px-md q-mr-sm"
          color="negative"
          v-close-popup
        />
        <q-btn
          :label="$t('common.save')"
          class="q-px-md"
          color="primary"
          @click="handleFilaUsuario"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { UpdateUsuarios } from 'src/service/user.js'
export default {
  name: 'ModalFilaUsuario',
  props: {
    modalFilaUsuario: {
      type: Boolean,
      default: false
    },
    usuarioSelecionado: {
      type: Object,
      default: () => { return { id: null } }
    },
    filas: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      filasUsuario: []
    }
  },
  computed: {
    dialogProxy: {
      get () { return this.modalFilaUsuario },
      set (v) { this.$emit('update:modalFilaUsuario', v) }
    }
  },
  methods: {
    abrirModal () {
      if (this.usuarioSelecionado.id) {
        this.filasUsuario = [...this.usuarioSelecionado.queues.map(f => f.id)]
      }
    },
    fecharModal () {
      this.$emit('update:usuarioSelecionado', {})
      this.$emit('update:modalFilaUsuario', false)
    },
    async handleFilaUsuario () {
      const req = {
        ...this.usuarioSelecionado,
        queues: [...this.filasUsuario]
      }
      const { data } = await UpdateUsuarios(req.id, req)
      localStorage.setItem('queues', JSON.stringify(data.queues || []))
      const usuarioAtual = JSON.parse(localStorage.getItem('usuario') || '{}')
      localStorage.setItem('usuario', JSON.stringify({ ...usuarioAtual, queues: data.queues || [] }))
      this.$emit('modalFilaUsuario:sucesso', data)
      this.$q.notify({
        type: 'positive',
        progress: true,
        position: 'top',
        message: this.$t('modalFilaUsuario.successMessage'),
        actions: [{
          icon: 'close',
          round: true,
          color: 'white'
        }]
      })
      this.fecharModal()
    }
  }

}
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-card {
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    animation: modalFadeIn 0.3s ease-out;
  }
}

.q-card-section {
  .text-h6 {
    color: var(--q-primary);
    font-weight: 600;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .text-caption {
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(var(--q-primary-rgb), 0.05);
    }
  }
}

.q-checkbox {
  margin: 8px 0;
  padding: 8px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(var(--q-primary-rgb), 0.05);
    transform: translateX(5px);
  }
  
  .q-checkbox__inner {
    transition: all 0.3s ease;
  }
  
  &:hover .q-checkbox__inner {
    transform: scale(1.1);
  }
}

.q-card-actions {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.5);
  
  .q-btn {
    border-radius: 12px;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    padding: 8px 24px;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}

/* Estilos para o modo escuro */
body.body--dark {
  .q-dialog .q-card {
    background: rgba(30, 30, 30, 0.85);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .q-card-section {
    .text-h6 {
      background: rgba(255, 255, 255, 0.05);
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    .text-caption:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }

  .q-checkbox:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .q-card-actions {
    background: rgba(255, 255, 255, 0.05);
    border-top-color: rgba(255, 255, 255, 0.1);
  }
}

/* Animações */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .q-dialog .q-card {
    width: 95vw !important;
    margin: 0.5rem;
  }

  .q-card-section {
    padding: 1rem;
  }

  .q-card-actions {
    padding: 1rem;
    
    .q-btn {
      padding: 6px 16px;
    }
  }
}
</style>
