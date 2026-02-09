<template>
  <div>
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('tenant.title')"
      :rows="tenants"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      style="border-radius: 8px"
    >
      <template v-slot:top-right>
        <q-btn
          style="margin: 5px"
          color="primary"
          :label="$t('common.add')"
          @click="tenantEdicao = {}; modalTenant = true"
        />
        <q-btn
          style="margin: 5px"
          color="primary"
          :label="$t('tenant.modals.asaasToken.title')"
          @click="openAsaasModal"
        />
      </template>
      <template v-slot:body-cell-hideUnoficial="props">
        <q-td class="text-center">
          <q-toggle
            v-model="props.row.hideUnoficial"
            color="primary"
            :label="$t('tenant.actions.toggleHideUnoficial')"
            @update:model-value="() => toggleHideUnoficial(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-asaasToken="props">
        <q-td class="text-center blur-effect">
          {{ props.row.asaasToken?.length > 20 ? props.row.asaasToken?.substring(0, 20) + '...' : props.row?.asaasToken || '' }}
        </q-td>
      </template>
      <template v-slot:body-cell-asaasCustomerId="props">
        <q-td class="text-center blur-effect">
          {{ props.row.asaasCustomerId }}
        </q-td>
      </template>
      <template v-slot:body-cell-allowedChannels="props">
        <q-td class="text-center">
          <div v-if="props.row.allowedChannels && props.row.allowedChannels.length > 0" class="q-gutter-xs">
            <q-chip
              v-for="channel in props.row.allowedChannels.slice(0, 3)"
              :key="channel"
              size="sm"
              color="primary"
              text-color="white"
              :label="getChannelLabel(channel)"
            />
            <q-chip
              v-if="props.row.allowedChannels.length > 3"
              size="sm"
              color="grey"
              text-color="white"
              :label="`+${props.row.allowedChannels.length - 3}`"
            />
          </div>
          <span v-else class="text-grey-6">{{ $t('tenant.channels.none') }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="edit"
            @click="editarTenant(props.row)"
          >
            <q-tooltip>{{ $t('tenant.actions.edit') }}</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarTenant(props.row)"
          >
            <q-tooltip>{{ $t('tenant.actions.delete') }}</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="mdi-folder-search-outline"
            @click="calcular(props.row)"
          >
            <q-tooltip>{{ $t('tenant.actions.calculateFiles') }}</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="mdi-chart-bar"
            @click="mostrarMetricas(props.row)"
          >
            <q-tooltip>{{ $t('tenant.metrics.actions') }}</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="mdi-delete-alert"
            @click="limparTenant(props.row)"
          >
            <q-tooltip>{{ $t('tenant.actions.deleteFiles') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <ModalTenant
      v-model:modalTenant="modalTenant"
      v-model:tenantEdicao="tenantEdicao"
      @modal-tenant:criada="tenantCriada"
      @modal-tenant:editada="tenantEditada"
    />
    <q-dialog v-model="isAsaasModalOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t('tenant.modals.asaasToken.title') }}</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="asaasToken"
            :label="$t('tenant.modals.asaasToken.tokenLabel')"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="$t('tenant.modals.asaasToken.cancel')"
            color="negative"
            @click="closeAsaasModal"
          />
          <q-btn
            flat
            :label="$t('tenant.modals.asaasToken.save')"
            color="primary"
            @click="saveAsaasToken"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="isMetricsModalOpen">
      <q-card style="min-width: 500px; position: relative;">
        <q-card-section class="bg-primary text-white q-pa-md">
          <div class="row items-center justify-between no-wrap">
            <div class="text-h6 row items-center">
              <q-icon name="mdi-chart-bar" size="28px" class="q-mr-sm" />
              {{ $t('tenant.metrics.title') }} - {{ tenantEdicao.name }}
            </div>
            <q-btn flat dense round icon="mdi-close" color="white" @click="isMetricsModalOpen = false" class="q-ml-md"/>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md">
            <!-- Mensagens -->
            <div class="col-12">
              <q-card flat bordered class="metrics-card">
                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm row items-center">
                    <q-icon name="mdi-message-text" color="primary" size="24px" class="q-mr-sm" />
                    {{ $t('tenant.metrics.messages') }}
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-6">
                      <q-card flat bordered class="metric-item">
                        <q-card-section class="text-center">
                          <q-icon name="mdi-send" color="positive" size="24px" class="q-mb-xs" />
                          <div class="text-caption">{{ $t('tenant.metrics.sent') }}</div>
                          <div class="text-h6 text-positive">{{ metricas?.totalMessages?.sent || 0 }}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="col-6">
                      <q-card flat bordered class="metric-item">
                        <q-card-section class="text-center">
                          <q-icon name="mdi-message-reply-text" color="primary" size="24px" class="q-mb-xs" />
                          <div class="text-caption">{{ $t('tenant.metrics.received') }}</div>
                          <div class="text-h6 text-primary">{{ metricas?.totalMessages?.received || 0 }}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Tickets -->
            <div class="col-12">
              <q-card flat bordered class="metrics-card">
                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm row items-center">
                    <q-icon name="mdi-ticket" color="warning" size="24px" class="q-mr-sm" />
                    {{ $t('tenant.metrics.tickets') }}
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-3">
                      <q-card flat bordered class="metric-item">
                        <q-card-section class="text-center">
                          <q-icon name="mdi-ticket-outline" color="warning" size="24px" class="q-mb-xs" />
                          <div class="text-caption">{{ $t('tenant.metrics.open') }}</div>
                          <div class="text-h6 text-warning">{{ metricas?.tickets?.open || 0 }}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="col-3">
                      <q-card flat bordered class="metric-item">
                        <q-card-section class="text-center">
                          <q-icon name="mdi-ticket-confirmation" color="positive" size="24px" class="q-mb-xs" />
                          <div class="text-caption">{{ $t('tenant.metrics.closed') }}</div>
                          <div class="text-h6 text-positive">{{ metricas?.tickets?.closed || 0 }}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="col-3">
                      <q-card flat bordered class="metric-item">
                        <q-card-section class="text-center">
                          <q-icon name="mdi-ticket-account" color="primary" size="24px" class="q-mb-xs" />
                          <div class="text-caption">{{ $t('tenant.metrics.pending') }}</div>
                          <div class="text-h6 text-primary">{{ metricas?.tickets?.pending || 0 }}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="col-3">
                      <q-card flat bordered class="metric-item">
                        <q-card-section class="text-center">
                          <q-icon name="mdi-ticket" color="negative" size="24px" class="q-mb-xs" />
                          <div class="text-caption">{{ $t('tenant.metrics.scheduled') }}</div>
                          <div class="text-h6 text-negative">{{ metricas?.tickets?.schedule || 0 }}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Contatos -->
            <div class="col-12">
              <q-card flat bordered class="metrics-card">
                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm row items-center">
                    <q-icon name="mdi-account-group" color="negative" size="24px" class="q-mr-sm" />
                    {{ $t('tenant.metrics.contacts') }}
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-12">
                      <q-card flat bordered class="metric-item">
                        <q-card-section class="text-center">
                          <q-icon name="mdi-account-multiple" color="negative" size="24px" class="q-mb-xs" />
                          <div class="text-caption">{{ $t('tenant.metrics.total') }}</div>
                          <div class="text-h6 text-negative">{{ metricas?.contacts?.total || 0 }}</div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { DeletarTenant, ListarTenants, AlterarTenantAsaasToken, AlterarTenantNaoOficial, ListarMetricasTenant } from 'src/service/tenants.js'
import { MostrarCores } from 'src/service/empresas.js';
import { LimparArquivosTenant, CalcularArquivosTenant } from 'src/service/customizar.js'
import ModalTenant from './ModalTenant.vue'
export default {
  name: 'Tenants',
  components: {
    ModalTenant
  },
  data () {
    return {
      isAsaasModalOpen: false,
      isMetricsModalOpen: false,
      asaasToken: '',
      colors: {},
      tenantEdicao: {},
      modalTenant: false,
      tenants: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      metricas: null,
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'status', label: this.$t('tenant.columns.status'), field: 'status', align: 'left', format: val => this.formatStatus(val) },
        // { name: 'ownerId', label: 'Usuário Admin', field: 'ownerId', align: 'center' },
        { name: 'name', label: this.$t('tenant.columns.name'), field: 'name', align: 'center' },
        { name: 'maxUsers', label: this.$t('tenant.columns.maxUsers'), field: 'maxUsers', align: 'center' },
        { name: 'maxConnections', label: this.$t('tenant.columns.maxConnections'), field: 'maxConnections', align: 'center' },
        { name: 'hideUnoficial', label: this.$t('tenant.columns.hideUnoficial'), align: 'center', field: 'hideUnoficial' },
        { name: 'asaas', label: this.$t('tenant.columns.asaas'), field: 'asaas', align: 'center', format: val => this.formatAsaasStatus(val) },
        { name: 'asaasToken', label: this.$t('tenant.columns.asaasToken'), field: 'asaasToken', align: 'center', format: val => val && val.length > 20 ? `${val.substring(0, 20)}...` : val },
        { name: 'asaasCustomerId', label: this.$t('tenant.columns.asaasCustomerId'), field: 'asaasCustomerId', align: 'center' },
        { name: 'identity', label: this.$t('tenant.columns.identity'), field: 'identity', align: 'center' },
        { name: 'trial', label: this.$t('tenant.columns.trial'), field: 'trial', align: 'center', format: val => this.formatTrialStatus(val) },
        { name: 'trialPeriod', label: this.$t('tenant.columns.trialPeriod'), field: 'trialPeriod', align: 'center' },
        { name: 'allowedChannels', label: this.$t('tenant.columns.allowedChannels'), field: 'allowedChannels', align: 'center', format: val => this.formatAllowedChannels(val) },
        // { name: 'metaToken', label: 'Token WABA Meta', field: 'metaToken', align: 'center', format: val => val && val.length > 20 ? `${val.substring(0, 20)}...` : val  },
        // { name: 'bmToken', label: 'Token Business Manager', field: 'bmToken', align: 'center', format: val => val && val.length > 20 ? `${val.substring(0, 20)}...` : val  },
        { name: 'createdAt', label: this.$t('tenant.columns.createdAt'), field: 'createdAt', align: 'center' },
        { name: 'acoes', label: this.$t('tenant.columns.actions'), field: 'acoes', align: 'center' }
      ]
    }
  },
  methods: {
    async toggleHideUnoficial(row) {
      try {
        const updatedData = { id: row.id, hideUnoficial: row.hideUnoficial };
        await AlterarTenantNaoOficial(updatedData);
        this.$q.notify({
          type: 'positive',
          message: this.$t('tenant.hideUnoficial.updated', { id: row.id }),
        });
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('tenant.hideUnoficial.updateError', { id: row.id }),
        });
        row.hideUnoficial = !row.hideUnoficial;
      }
    },
    openAsaasModal() {
      this.isAsaasModalOpen = true;
    },
    closeAsaasModal() {
      this.isAsaasModalOpen = false;
    },
    async saveAsaasToken() {
      try {
        await AlterarTenantAsaasToken({ token: this.asaasToken });
        this.$q.notify({ type: 'positive', message: this.$t('tenant.asaasToken.updated'), });
        this.closeAsaasModal();
        this.listarTenants()
      } catch (error) {
        this.$q.notify({ type: 'negative', message: this.$t('tenant.asaasToken.updateError')});
      }
    },
    async calcular(tenant) {
    try {
      const response = await CalcularArquivosTenant(tenant.id);
      const folderSize = response.data.folderSizeMB; 
      
      this.$q.notify({
        type: 'info',
        position: 'top',
        color: 'warning',
        message: this.$t('tenant.calcular.size', { size: folderSize }),
        actions: [
          {
            icon: 'close',
            round: true,
            color: 'white'
          }
        ]
      });
    } catch (e) {
      console.log(e);
      
      this.$q.notify({
        type: 'negative',
        position: 'top',
        message: this.$t('tenant.calcular.error'),
        actions: [
          {
            icon: 'close',
            round: true,
            color: 'white'
          }
        ]
      });
    }
    },
    async limparTenant(tenant){
      try{
        this.$q.dialog({
          title: this.$t('tenant.limpar.title'),
          message: this.$t('tenant.limpar.confirmMessage', { id: tenant.id }),
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
        }).onOk(async () => {
          await LimparArquivosTenant(tenant.id)
        })
      } catch(e){
        console.log(e)
      }
    },
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
            const rawLabel =
              (typeof colorObj.label === 'string' && colorObj.label) ||
              (typeof colorObj.name === 'string' && colorObj.name) ||
              (typeof colorObj.key === 'string' && colorObj.key) ||
              ''

            if (!rawLabel) return acc
            const key = rawLabel.toLowerCase().trim()
            const value =
              colorObj.value ??
              (rawLabel in colorObj ? colorObj[rawLabel] : undefined) ??
              colorObj.hex ??
              colorObj.color ??
              null

            if (typeof value === 'string' && value) {
              acc[key] = value
            }
            return acc
          }, {})

          

          const root = document.documentElement;
          root.style.setProperty("--q-neutral", this.colors.neutral);
          root.style.setProperty("--q-primary", this.colors.primary);
          root.style.setProperty("--q-secondary", this.colors.secondary);
          root.style.setProperty("--q-accent", this.colors.accent);
          root.style.setProperty("--q-warning", this.colors.warning);
          root.style.setProperty("--q-negative", this.colors.negative);
          root.style.setProperty("--q-positive", this.colors.positive);
          root.style.setProperty("--q-light", this.colors.light);

          

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    getColClass(row) {
      return row.status === 'active' ? 'bg-active' : 'bg-inactive';
    },
    formatStatus(value) {
      return value === 'active' ? this.$t('tenant.status.active') : this.$t('tenant.status.inactive');
    },
    formatAsaasStatus(value) {
      return value === 'enabled' ? this.$t('tenant.asaas.enabled') : this.$t('tenant.asaas.disabled');
    },
    formatTrialStatus(value) {
      return value === 'enabled' ? this.$t('tenant.trial.enabled') : this.$t('tenant.trial.disabled');
    },
    formatAllowedChannels(channels) {
      if (!channels || !Array.isArray(channels) || channels.length === 0) {
        return this.$t('tenant.channels.none');
      }
      
      const channelLabels = {
        'waba': 'WABA',
        'baileys': 'Baileys',
        'whatsapp': 'WebJs',
        'meow': 'Meow',
        'evo': 'Evolution',
        'zapi': 'Z-API',
        'uazapi': 'Uazapi',
        'telegram': 'Telegram',
        'hub': 'Hub',
        'webchat': 'WebChat',
        'webmail': 'WebMail'
      };
      
      const labels = channels.map(channel => channelLabels[channel] || channel);
      return labels.length > 3 ? labels.slice(0, 3).join(', ') + '...' : labels.join(', ');
    },
    getChannelLabel(channel) {
      const channelLabels = {
        'waba': 'WABA',
        'baileys': 'Baileys',
        'whatsapp': 'WebJs',
        'meow': 'Meow',
        'evo': 'Evolution',
        'zapi': 'Z-API',
        'uazapi': 'Uazapi',
        'telegram': 'Telegram',
        'hub': 'Hub',
        'webchat': 'WebChat',
        'webmail': 'WebMail'
      };
      return channelLabels[channel] || channel;
    },
    async listarTenants () {
      const { data } = await ListarTenants()
      this.tenants = data
    },
    tenantCriada (tenant) {
      const newTenants = [...this.tenants]
      newTenants.push(tenant)
      this.tenants = [...newTenants]
    },
    tenantEditada (tenant) {
      const newTenants = [...this.tenants]
      const idx = newTenants.findIndex(f => f.id === tenant.id)
      if (idx > -1) {
        newTenants[idx] = tenant
      }
      this.tenants = [...newTenants]
    },
    editarTenant (tenant) {
      this.tenantEdicao = { ...tenant }
      this.modalTenant = true
    },
    deletarTenant(tenant) {
      if(tenant.id === 1){
        this.$q.dialog({
          title: this.$t('common.attention'),
          message: this.$t('tenant.delete.protected'),
        })
      return
      }
      this.$q.dialog({
        title: this.$t('confirmation.irreversibleAction'),
        message: this.$t('confirmation.deleteTenant', { id: tenant.id }),
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
        DeletarTenant(tenant)
          .then(res => {
            let newTenants = [...this.tenants]
            newTenants = newTenants.filter(f => f.id !== tenant.id)

            this.tenants = [...newTenants]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('tenant.delete.success', { id: tenant.id }),
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
          .catch(error => {
            console.log(error.data.error)
            this.$q.notify({
              type: 'negative',
              progress: true,
              position: 'top',
              message: this.$t('tenant.delete.error', { error: error.data?.error || error }),
              actions: [{
                icon: 'close',
                round: true,
                color: 'white'
              }]
            })
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    async mostrarMetricas(tenant) {
      try {
        this.tenantEdicao = tenant;
        this.isMetricsModalOpen = true;
        const { data } = await ListarMetricasTenant(tenant.id);
        this.metricas = data;
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('tenant.metrics.error'),
          position: 'top'
        });
      }
    }
  },
  mounted () {
    this.listarTenants()
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try {
        const parsed = JSON.parse(storedColors)
        list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : [])
      } catch (_) { list = [] }

      const colors = list.reduce((acc, colorObj = {}) => {
        const rawLabel =
          (typeof colorObj.label === 'string' && colorObj.label) ||
          (typeof colorObj.name === 'string' && colorObj.name) ||
          (typeof colorObj.key === 'string' && colorObj.key) ||
          ''

        if (!rawLabel) return acc
        const key = rawLabel.toLowerCase().trim()
        const value =
          colorObj.value ??
          (rawLabel in colorObj ? colorObj[rawLabel] : undefined) ??
          colorObj.hex ??
          colorObj.color ??
          null

        if (typeof value === 'string' && value) acc[key] = value
        return acc
      }, {})

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    // this.loadColors()
  }
}
</script>

<style lang="scss" scoped>
.my-sticky-dynamic {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: auto;

  /* Estilização do scroll */
  &::-webkit-scrollbar {
    height: 12px;
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--q-primary);
    border-radius: 6px;
    border: 2px solid rgba(255, 255, 255, 0.8);
    
    &:hover {
      background: var(--q-secondary);
    }
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--q-primary) rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .q-table__top {
    background: transparent;
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .q-table__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--q-primary);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .q-table thead tr th {
    background: rgba(var(--q-primary-rgb), 0.1);
    color: var(--q-primary);
    font-weight: 600;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .q-table tbody tr {
    transition: all 0.3s ease;

    &:hover {
      background: rgba(var(--q-primary-rgb), 0.05);
    }

    td {
      padding: 0.8rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .q-btn {
    border-radius: 6px;
    padding: 0.15rem 0.4rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 0.75rem;
    min-height: 24px;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    &--flat {
      padding: 0.15rem;
      min-height: auto;
    }
  }

  .q-toggle {
    .q-toggle__track {
      opacity: 0.7;
    }
  }

  .blur-effect {
    filter: blur(0px);
    transition: filter 0.3s ease;
    
    &:hover {
      filter: blur(0);
    }
  }
}

/* Modo Escuro */
body.body--dark {
  .my-sticky-dynamic {
    background: rgba(30, 30, 30, 0.85);
    border-color: rgba(255, 255, 255, 0.1);

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    &::-webkit-scrollbar-thumb {
      border-color: rgba(30, 30, 30, 0.8);
    }

    .q-table thead tr th {
      background: rgba(255, 255, 255, 0.05);
    }

    .q-table tbody tr:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .my-sticky-dynamic {
    margin: 0.5rem;
    border-radius: 12px !important;

    .q-table__top {
      padding: 1rem;
      flex-direction: column;
      gap: 0.5rem;
    }

    .q-table__control {
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.3rem;
    }

    .q-btn {
      width: auto;
      min-width: 80px;
      margin: 0;
    }
  }
}

.metrics-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  padding: 8px 0;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.metric-item {
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  
  &:hover {
    background: rgba(var(--q-primary-rgb), 0.05);
  }
  
  .text-h6 {
    font-weight: 600;
    margin-top: 2px;
  }
}

/* Modo Escuro */
body.body--dark {
  .metrics-card {
    background: rgba(255, 255, 255, 0.05);
    
    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }
  
  .metric-item {
    background: rgba(255, 255, 255, 0.02);
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
