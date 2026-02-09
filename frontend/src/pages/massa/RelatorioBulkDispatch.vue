<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <q-card bordered class="q-ma-md">
      <q-card-section>
        <div class="row items-center q-gutter-sm">
          <div class="text-h6 q-px-sm">{{ $t('relatorioBulkDispatch.title') }}</div>
          <q-icon name="info" color="info" size="sm">
            <q-tooltip class="bg-info text-white" style="font-size: 12px;">
              {{ $t('relatorioBulkDispatch.tooltip.description') }}
            </q-tooltip>
          </q-icon>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row q-gutter-md items-end q-mb-md">
          <div class="col-auto">
            <q-select
              v-model="filtros.status"
              :options="statusOptions"
              :label="$t('relatorioBulkDispatch.filters.status')"
              dense
              outlined
              clearable
              emit-value
              map-options
            />
          </div>
          <div class="col-auto">
            <q-select
              v-model="filtros.dispatchType"
              :options="dispatchTypeOptions"
              :label="$t('relatorioBulkDispatch.filters.dispatchType')"
              dense
              outlined
              clearable
              emit-value
              map-options
            />
          </div>
          <div class="col-auto">
            <q-btn
              color="primary"
              :label="$t('relatorioBulkDispatch.actions.search')"
              icon="search"
              @click="carregarRelatorios"
            />
          </div>
          <div class="col-auto">
            <q-btn
              color="warning"
              :label="$t('relatorioBulkDispatch.actions.clear')"
              icon="clear"
              @click="limparFiltros"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card bordered class="q-ma-md">
      <q-card-section>
        <q-table
          flat
          bordered
          :rows="relatorios"
          :columns="columns"
          :loading="loading"
          row-key="id"
          :pagination="pagination"
          @request="onRequest"
          :rows-per-page-options="[10, 20, 50, 100]"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge
                :color="getStatusColor(props.value)"
                :label="getStatusLabel(props.value)"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-dispatchType="props">
            <q-td :props="props">
              <q-badge
                color="info"
                :label="getDispatchTypeLabel(props.value)"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-progress="props">
            <q-td :props="props">
              <div class="q-gutter-xs">
                <q-linear-progress
                  :value="Math.min(props.row.sentMessages, props.row.totalMessages) / props.row.totalMessages"
                  color="positive"
                  size="20px"
                />
                <div class="text-caption text-center">
                  {{ Math.min(props.row.sentMessages, props.row.totalMessages) }} / {{ props.row.totalMessages }}
                </div>
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                dense
                round
                icon="visibility"
                color="primary"
                @click="visualizarDetalhes(props.row)"
              >
                <q-tooltip>{{ $t('relatorioBulkDispatch.actions.viewDetails') }}</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Modal de Detalhes -->
    <q-dialog v-model="modalDetalhes" maximized>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ $t('relatorioBulkDispatch.details.title') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section v-if="detalhesSelecionado">
          <div class="row q-gutter-md">
            <div class="col-12 col-md-6">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm">{{ $t('relatorioBulkDispatch.details.general') }}</div>
                  <div class="q-gutter-sm">
                    <div><strong>{{ $t('relatorioBulkDispatch.details.id') }}:</strong> {{ detalhesSelecionado.id }}</div>
                    <div><strong>{{ $t('relatorioBulkDispatch.details.status') }}:</strong> 
                      <q-badge :color="getStatusColor(detalhesSelecionado.status)" :label="getStatusLabel(detalhesSelecionado.status)" />
                    </div>
                    <div><strong>{{ $t('relatorioBulkDispatch.details.dispatchType') }}:</strong> 
                      <q-badge color="info" :label="getDispatchTypeLabel(detalhesSelecionado.dispatchType)" />
                    </div>
                    <div><strong>{{ $t('relatorioBulkDispatch.details.createdAt') }}:</strong> {{ formatDate(detalhesSelecionado.createdAt) }}</div>
                    <div v-if="detalhesSelecionado.startedAt">
                      <strong>{{ $t('relatorioBulkDispatch.details.startedAt') }}:</strong> {{ formatDate(detalhesSelecionado.startedAt) }}
                    </div>
                    <div v-if="detalhesSelecionado.completedAt">
                      <strong>{{ $t('relatorioBulkDispatch.details.completedAt') }}:</strong> {{ formatDate(detalhesSelecionado.completedAt) }}
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12 col-md-6">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm">{{ $t('relatorioBulkDispatch.details.statistics') }}</div>
                  <div class="q-gutter-sm">
                    <div><strong>{{ $t('relatorioBulkDispatch.details.totalMessages') }}:</strong> {{ detalhesSelecionado.totalMessages }}</div>
                    <div><strong>{{ $t('relatorioBulkDispatch.details.sentMessages') }}:</strong> 
                      <q-badge color="positive" :label="Math.min(detalhesSelecionado.sentMessages, detalhesSelecionado.totalMessages)" />
                    </div>
                    <div><strong>{{ $t('relatorioBulkDispatch.details.notSentMessages') }}:</strong> 
                      <q-badge color="warning" :label="(detalhesSelecionado.pendingMessages || 0) + (detalhesSelecionado.failedMessages || 0)" />
                    </div>
                    <!-- <div><strong>{{ $t('relatorioBulkDispatch.details.failedMessages') }}:</strong> 
                      <q-badge color="warning" :label="detalhesSelecionado.failedMessages || 0" />
                    </div>
                    <div><strong>{{ $t('relatorioBulkDispatch.details.pendingMessages') }}:</strong> 
                      <q-badge color="warning" :label="detalhesSelecionado.pendingMessages || 0" />
                    </div> -->
                    <!-- Mostrar conteúdo da mensagem quando não é template -->
                    <div v-if="!detalhesSelecionado.templateName && detalhesSelecionado.message">
                      <strong>{{ $t('relatorioBulkDispatch.details.message') }}:</strong> 
                      <div class="q-mt-xs q-pa-sm message-content rounded-borders" style="max-height: 150px; overflow-y: auto;">
                        {{ detalhesSelecionado.message }}
                      </div>
                    </div>
                    <div v-if="!detalhesSelecionado.templateName && detalhesSelecionado.mediaUrl">
                      <strong>{{ $t('relatorioBulkDispatch.details.mediaUrl') }}:</strong> 
                      <a :href="detalhesSelecionado.mediaUrl" target="_blank" class="text-primary">{{ detalhesSelecionado.mediaUrl }}</a>
                    </div>
                    <div v-if="!detalhesSelecionado.templateName && detalhesSelecionado.mediaDescription">
                      <strong>{{ $t('relatorioBulkDispatch.details.mediaDescription') }}:</strong> 
                      <div class="q-mt-xs q-pa-sm message-content rounded-borders" style="max-height: 150px; overflow-y: auto;">
                        {{ detalhesSelecionado.mediaDescription }}
                      </div>
                    </div>
                    <div v-if="!detalhesSelecionado.templateName && detalhesSelecionado.voiceUrl">
                      <strong>{{ $t('relatorioBulkDispatch.details.voiceUrl') }}:</strong> 
                      <a :href="detalhesSelecionado.voiceUrl" target="_blank" class="text-primary">{{ detalhesSelecionado.voiceUrl }}</a>
                    </div>
                    <div v-if="detalhesSelecionado.minDelay && detalhesSelecionado.maxDelay">
                      <strong>{{ $t('relatorioBulkDispatch.details.delay') }}:</strong> {{ detalhesSelecionado.minDelay }}s - {{ detalhesSelecionado.maxDelay }}s
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-12" v-if="detalhesSelecionado.errors && detalhesSelecionado.errors.length > 0">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm">{{ $t('relatorioBulkDispatch.details.errors') }}</div>
                  <q-list bordered separator>
                    <q-item v-for="(error, index) in detalhesSelecionado.errors" :key="index">
                      <q-item-section>
                        <q-item-label>{{ error.contact }}</q-item-label>
                        <q-item-label caption>{{ error.error }}</q-item-label>
                        <q-item-label caption>{{ formatDate(error.timestamp) }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import { ListarBulkDispatches, ObterBulkDispatch } from 'src/service/bulkDispatch.js'

export default {
  name: 'RelatorioBulkDispatch',
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      loading: false,
      relatorios: [],
      modalDetalhes: false,
      detalhesSelecionado: null,
      filtros: {
        status: null,
        dispatchType: null
      },
      statusOptions: [],
      dispatchTypeOptions: [],
      columns: [],
      pagination: {
        sortBy: 'createdAt',
        descending: true,
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0
      }
    }
  },
  methods: {
    async onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      
      this.pagination.page = page
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.sortBy = sortBy
      this.pagination.descending = descending

      await this.carregarRelatorios()
    },
    async carregarRelatorios() {
      this.loading = true
      try {
        const params = {
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          sortBy: this.pagination.sortBy,
          order: this.pagination.descending ? 'DESC' : 'ASC'
        }

        if (this.filtros.status) {
          params.status = this.filtros.status
        }
        if (this.filtros.dispatchType) {
          params.dispatchType = this.filtros.dispatchType
        }

        const { data } = await ListarBulkDispatches(params)
        this.relatorios = data.rows || []
        this.pagination.rowsNumber = data.count || 0
      } catch (error) {
        console.error('Erro ao carregar relatórios:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('relatorioBulkDispatch.notifications.errorLoading'),
          position: 'top'
        })
      } finally {
        this.loading = false
      }
    },
    async visualizarDetalhes(row) {
      try {
        const { data } = await ObterBulkDispatch(row.id)
        this.detalhesSelecionado = data
        this.modalDetalhes = true
      } catch (error) {
        console.error('Erro ao carregar detalhes:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('relatorioBulkDispatch.notifications.errorLoadingDetails'),
          position: 'top'
        })
      }
    },
    limparFiltros() {
      this.filtros = {
        status: null,
        dispatchType: null
      }
      this.carregarRelatorios()
    },
    getStatusColor(status) {
      const colors = {
        pending: 'warning',
        processing: 'warning',
        completed: 'positive',
        failed: 'warning',
        cancelled: 'grey'
      }
      return colors[status] || 'grey'
    },
    getStatusLabel(status) {
      // Mostrar "Incompleto" para status pending ou processing
      if (status === 'pending' || status === 'processing') {
        return this.$t('relatorioBulkDispatch.status.incomplete')
      }
      return this.$t(`relatorioBulkDispatch.status.${status}`) || status
    },
    getDispatchTypeLabel(type) {
      return this.$t(`relatorioBulkDispatch.dispatchType.${type}`) || type
    },
    initializeOptions() {
      this.statusOptions = [
        { label: this.$t('relatorioBulkDispatch.status.pending'), value: 'pending' },
        { label: this.$t('relatorioBulkDispatch.status.processing'), value: 'processing' },
        { label: this.$t('relatorioBulkDispatch.status.completed'), value: 'completed' },
        { label: this.$t('relatorioBulkDispatch.status.failed'), value: 'failed' },
        { label: this.$t('relatorioBulkDispatch.status.cancelled'), value: 'cancelled' }
      ]
      this.dispatchTypeOptions = [
        { label: this.$t('relatorioBulkDispatch.dispatchType.template'), value: 'template' },
        { label: this.$t('relatorioBulkDispatch.dispatchType.template_variable'), value: 'template_variable' },
        { label: this.$t('relatorioBulkDispatch.dispatchType.text'), value: 'text' },
        { label: this.$t('relatorioBulkDispatch.dispatchType.text_variable'), value: 'text_variable' }
      ]
      this.columns = [
        {
          name: 'id',
          label: this.$t('relatorioBulkDispatch.columns.id'),
          field: 'id',
          align: 'left',
          sortable: true
        },
        {
          name: 'status',
          label: this.$t('relatorioBulkDispatch.columns.status'),
          field: 'status',
          align: 'center',
          sortable: true
        },
        {
          name: 'dispatchType',
          label: this.$t('relatorioBulkDispatch.columns.dispatchType'),
          field: 'dispatchType',
          align: 'center',
          sortable: true
        },
        {
          name: 'templateName',
          label: this.$t('relatorioBulkDispatch.columns.templateName'),
          field: 'templateName',
          align: 'left',
          sortable: true,
          format: (val) => val || '-'
        },
        {
          name: 'progress',
          label: this.$t('relatorioBulkDispatch.columns.progress'),
          field: 'progress',
          align: 'center'
        },
        {
          name: 'createdAt',
          label: this.$t('relatorioBulkDispatch.columns.createdAt'),
          field: 'createdAt',
          align: 'center',
          sortable: true,
          format: (val) => this.formatDate(val)
        },
        {
          name: 'actions',
          label: this.$t('relatorioBulkDispatch.columns.actions'),
          field: 'actions',
          align: 'center'
        }
      ]
    },
    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleString('pt-BR')
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions') || '{}')
    this.pageAllowed = menuPermissions?.relatorios === true
    this.initializeOptions()
    await this.carregarRelatorios()
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
}

body.body--dark .q-card {
  background: rgba(30,30,30,0.98);
  box-shadow: 0 6px 32px rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.10);
}

.message-content {
  background-color: #f5f5f5;
  color: #212121;
}

body.body--dark .message-content {
  background-color: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.87);
}
</style>

