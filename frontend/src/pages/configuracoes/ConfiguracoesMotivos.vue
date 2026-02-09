<template>
  <div v-if="userProfile === 'admin'">
    <q-table flat
      bordered
      square
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('configuracaoMotivo.title')"
      :rows="motivos"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      binary-state-sort
      :rows-per-page="0"
      :server-pagination="false">
      <template v-slot:top-right>
        <q-btn color="primary"
          :label="$t('common.add')"
          @click="motivoEdicao = {}; modalMotivo = true" />
      </template>
      <template v-slot:body-cell-isActive="props">
        <q-td class="text-center">
          <q-icon size="24px"
            :name="props.value ? 'mdi-check-circle-outline' : 'mdi-close-circle-outline'"
            :color="props.value ? 'positive' : 'negative'" />
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat
            round
            icon="edit"
            @click="editarMotivo(props.row)" />
          <q-btn flat
            round
            icon="mdi-delete"
            @click="deletarMotivo(props.row)" />
        </q-td>
      </template>
    </q-table>
    <ModalMotivos v-model:modalMotivo="modalMotivo"
      v-model:motivoEdicao="motivoEdicao"
      @modal-motivo:criada="motivoCriada"
      @modal-motivo:editada="motivoEditada" />
  </div>
</template>

<script>
import { DeletarMotivo, ListarMotivos } from 'src/service/motivos.js'
import ModalMotivos from './ModalMotivos.vue'
export default {
  name: 'Demanda',
  components: {
    ModalMotivos
  },
  data () {
    return {
      userProfile: 'user',
      motivoEdicao: {},
      modalMotivo: false,
      motivos: [],
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 0
      },
      loading: false,
      columns: [
        { 
          name: 'id', 
          label: this.$t('configuracaoMotivo.columns.id'), 
          field: 'id', 
          align: 'left', 
          sortable: true,
          required: true
        },
        { 
          name: 'name', 
          label: this.$t('configuracaoMotivo.columns.name'), 
          field: 'name', 
          align: 'left', 
          sortable: true,
          required: true
        },
        { 
          name: 'acoes', 
          label: this.$t('configuracaoMotivo.columns.actions'), 
          field: 'acoes', 
          align: 'center',
          sortable: false
        }
      ]
    }
  },
  methods: {
    async listarMotivos () {
      try {
        const { data } = await ListarMotivos();
        if (Array.isArray(data?.reasons)) {
          // Ordenar motivos por ordem alfabética baseada no campo 'name'
          data.reasons.sort((a, b) => {
            const nameA = a?.name ? a.name.toLowerCase() : ''
            const nameB = b?.name ? b.name.toLowerCase() : ''
            return nameA.localeCompare(nameB)
          });
        }
        this.motivos = data.reasons || [];
      } catch (error) {
        console.error('Erro ao listar motivos:', error);
      }
    },
    motivoCriada (motivo) {
      const newMotivos = [...this.motivos]
      newMotivos.push(motivo)
      this.motivos = [...newMotivos]
    },
    motivoEditada (motivo) {
      const newMotivos = [...this.motivos]
      const idx = newMotivos.findIndex(f => f.id === motivo.id)
      if (idx > -1) {
        newMotivos[idx] = motivo
      }
      this.motivos = [...newMotivos]
    },
    editarMotivo (motivo) {
      this.motivoEdicao = { ...motivo }
      this.modalMotivo = true
    },
    deletarMotivo (motivo) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('configuracaoMotivo.deleteConfirmation', { motivo: motivo.name }),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(() => {
        this.loading = true
        DeletarMotivo(motivo)
          .then(res => {
            let newMotivos = [...this.motivos]
            newMotivos = newMotivos.filter(f => f.id !== motivo.id)

            this.motivos = [...newMotivos]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('configuracaoMotivo.motivoDeleted', { motivo: motivo.name }),
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
        this.loading = false
      })
    }

  },
  mounted () {
    this.listarMotivos()
    this.userProfile = localStorage.getItem('profile')
  }
}
</script>

<style lang="scss" scoped>
.my-sticky-dynamic {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  margin-top: 24px;
  margin-bottom: 24px;
  overflow: hidden;
}

.q-table__top, .q-table__bottom, .q-table__title {
  background: transparent;
  box-shadow: none;
  border: none;
}

.q-table__title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--q-primary);
  padding: 16px 24px 0 24px;
}

.q-table thead tr {
  background: rgba(245, 245, 245, 0.85);
  font-weight: 600;
  font-size: 1rem;
  color: #222;
}

.q-table tbody tr {
  transition: background 0.2s;
  &:hover {
    background: rgba(0,0,0,0.03);
  }
}

.q-table th, .q-table td {
  padding: 14px 18px;
  font-size: 0.98rem;
}

/* Modo Escuro */
body.body--dark {
  .my-sticky-dynamic {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  }
  .q-table thead tr {
    background: rgba(40, 40, 40, 0.85);
    color: #fff;
  }
  .q-table__title {
    color: var(--q-primary);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .my-sticky-dynamic {
    border-radius: 10px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
  .q-table th, .q-table td {
    padding: 10px 8px;
    font-size: 0.93rem;
  }
  .q-table__title {
    padding: 10px 10px 0 10px;
    font-size: 1.05rem;
  }
}
</style>
