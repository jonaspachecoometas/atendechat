<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 800px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('funilacao.logAcao') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="logs"
          :columns="columns"
          row-key="id"
          :loading="loading"
          v-model:pagination="pagination"
          @request="onRequest"
          binary-state-sort
          :rows-per-page-options="[0]"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="createdAt" :props="props">
                {{ formatDate(props.row.createdAt) }}
              </q-td>
              <q-td key="opportunity" :props="props">
                {{ props.row.opportunity?.name || '-' }}
              </q-td>
              <q-td key="contact" :props="props">
                {{ props.row.opportunity?.contact?.name || '-' }}
              </q-td>
              <q-td key="number" :props="props">
                {{ props.row.opportunity?.contact?.number || '-' }}
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.opportunity?.contact?.email || '-' }}
              </q-td>
              <q-td key="pipelineAction" :props="props">
                {{ props.row.pipelineAction?.name || '-' }}
              </q-td>
              <q-td key="status" :props="props">
                <q-chip
                  :color="getStatusColor(props.row.status)"
                  text-color="white"
                  dense
                >
                  {{ props.row.status }}
                </q-chip>
              </q-td>
              <q-td key="errorMessage" :props="props">
                {{ props.row.errorMessage || '-' }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ListarPipelineActionLogs } from 'src/service/funilacao.js'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default {
  name: 'PipelineActionLogsDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      logs: [],
      usuario: null,
      pagination: {
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0
      },
      columns: [
        {
          name: 'createdAt',
          label: this.$t('funilacao.data'),
          field: 'createdAt',
          align: 'left'
        },
        {
          name: 'opportunity',
          label: this.$t('funilacao.oportunidade'),
          field: row => row.opportunity?.name,
          align: 'left'
        },
        {
          name: 'contact',
          label: this.$t('funilacao.contato'),
          field: row => row.opportunity?.contact?.name,
          align: 'left'
        },
        {
          name: 'number',
          label: this.$t('funilacao.numero'),
          field: row => row.opportunity?.contact?.number,
          align: 'left'
        },
        {
          name: 'email',
          label: this.$t('funilacao.email'),
          field: row => row.opportunity?.contact?.email,
          align: 'left'
        },
        {
          name: 'pipelineAction',
          label: this.$t('funilacao.acao'),
          field: row => row.pipelineAction?.name,
          align: 'left'
        },
        {
          name: 'status',
          label: this.$t('funilacao.status'),
          field: 'status',
          align: 'left'
        },
        {
          name: 'errorMessage',
          label: this.$t('funilacao.mensagemErro'),
          field: 'errorMessage',
          align: 'left'
        }
      ]
    }
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
    },
    getStatusColor(status) {
      const colors = {
        success: 'positive',
        error: 'negative',
        pending: 'warning'
      }
      return colors[status] || 'grey'
    },
    async loadLogs(page = 1) {
      try {
        this.loading = true
        const response = await ListarPipelineActionLogs(this.usuario.tenantId, page)
        if (response && response.data) {
          this.logs = response.data.data || []
          this.pagination.rowsNumber = response.data.pagination?.total || 0
          this.pagination.page = response.data.pagination?.page || 1
        }
      } catch (error) {
        console.error('Erro ao carregar logs:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroCarregarLogs')
        })
      } finally {
        this.loading = false
      }
    },
    onRequest(props) {
      const { page } = props.pagination
      this.loadLogs(page)
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.loadLogs()
      }
    }
  },
  mounted() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
  }
}
</script>

<style scoped>
.q-card {
  max-height: 80vh;
}
</style> 
