<template>
  <div>
    <q-table
      flat
      bordered
      square
      hide-bottom
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('provedorGlobal.title')"
      :rows="provedoresGlobais"
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
          @click="abrirModalCriarProvedor"
        />
        <q-select
          v-model="filtroProviderType"
          :options="providerTypes"
          option-label="label"
          option-value="value"
          emit-value
          map-options
          :label="$t('provedorGlobal.filters.providerType')"
          clearable
          style="min-width: 200px; margin: 5px"
          @update:model-value="listarProvedoresGlobais"
        />
        <q-select
          v-model="filtroStatus"
          :options="statusOptions"
          option-label="label"
          option-value="value"
          emit-value
          map-options
          :label="$t('provedorGlobal.filters.status')"
          clearable
          style="min-width: 150px; margin: 5px"
          @update:model-value="listarProvedoresGlobais"
        />
      </template>
      <template v-slot:body-cell-status="props">
        <q-td class="text-center">
          <q-toggle
            v-model="props.row.status"
            :true-value="'active'"
            :false-value="'inactive'"
            color="positive"
            :label="props.row.status === 'active' ? $t('provedorGlobal.status.active') : $t('provedorGlobal.status.inactive')"
            @update:model-value="() => atualizarStatus(props.row)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-isGlobal="props">
        <q-td class="text-center">
          <q-icon
            :name="props.row.isGlobal ? 'mdi-check-circle' : 'mdi-close-circle'"
            :color="props.row.isGlobal ? 'positive' : 'negative'"
            size="24px"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-host="props">
        <q-td class="text-center">
          {{ props.row.host?.length > 30 ? props.row.host?.substring(0, 30) + '...' : props.row.host || '' }}
        </q-td>
      </template>
      <template v-slot:body-cell-token="props">
        <q-td class="text-center">
          {{ props.row.token?.length > 20 ? props.row.token?.substring(0, 20) + '...' : props.row.token || '' }}
        </q-td>
      </template>
      <template v-slot:body-cell-tenants="props">
        <q-td class="text-center">
          <div v-if="props.row.tenants && props.row.tenants.length > 0" class="q-gutter-xs">
            <q-chip
              v-for="tenant in props.row.tenants.slice(0, 3)"
              :key="tenant.id"
              size="sm"
              color="primary"
              text-color="white"
              :label="tenant.name"
            />
            <q-chip
              v-if="props.row.tenants.length > 3"
              size="sm"
              color="grey"
              text-color="white"
              :label="`+${props.row.tenants.length - 3}`"
            />
          </div>
          <span v-else-if="props.row.isGlobal" class="text-grey-6">{{ $t('provedorGlobal.allTenants') }}</span>
          <span v-else class="text-grey-6">{{ $t('provedorGlobal.noTenants') }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn
            flat
            round
            icon="edit"
            @click="editarProvedor(props.row)"
          >
            <q-tooltip>{{ $t('provedorGlobal.actions.edit') }}</q-tooltip>
          </q-btn>
          <q-btn
            v-if="!isMetaType(props.row.providerType)"
            flat
            round
            icon="mdi-account-plus"
            @click="abrirModalTenants(props.row)"
          >
            <q-tooltip>{{ $t('provedorGlobal.actions.manageTenants') }}</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            icon="mdi-delete"
            @click="deletarProvedor(props.row)"
          >
            <q-tooltip>{{ $t('provedorGlobal.actions.delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <!-- Modal de Provedor -->
    <q-dialog v-model="modalProvedor">
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">
            {{ provedorEdicao.id ? $t('provedorGlobal.modal.editTitle') : $t('provedorGlobal.modal.createTitle') }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="provedorEdicao.name"
            :label="$t('provedorGlobal.form.name')"
            :rules="[val => !!val || $t('provedorGlobal.form.nameRequired')]"
          />
          <q-select
            v-model="provedorEdicao.providerType"
            :options="providerTypes"
            option-label="label"
            option-value="value"
            emit-value
            map-options
            :label="$t('provedorGlobal.form.providerType')"
            :rules="[val => !!val || $t('provedorGlobal.form.providerTypeRequired')]"
            class="q-mt-md"
            @update:model-value="atualizarHostPorProviderType"
          />
          <template v-if="!isGroqCloudType(provedorEdicao.providerType)">
            <q-input
              v-model="provedorEdicao.host"
              :label="$t('provedorGlobal.form.host')"
              :rules="[val => !!val || $t('provedorGlobal.form.hostRequired')]"
              :readonly="isHostTravado"
              :hint="isHostTravado ? $t('provedorGlobal.form.hostLocked') : ''"
              class="q-mt-md"
            />
            <q-input
              v-model="provedorEdicao.token"
              :label="$t('provedorGlobal.form.token')"
              :rules="[val => !!val || $t('provedorGlobal.form.tokenRequired')]"
              class="q-mt-md"
            />
          </template>
          <template v-else>
            <div class="text-subtitle2 q-mb-sm q-mt-md">{{ $t('provedorGlobal.form.groqCloudSection') }}</div>
            <q-toggle
              v-model="provedorEdicao.groqCloud"
              :true-value="'enabled'"
              :false-value="'disabled'"
              :label="provedorEdicao.groqCloud === 'enabled' ? $t('provedorGlobal.form.groqCloudEnabled') : $t('provedorGlobal.form.groqCloudDisabled')"
              color="positive"
              class="q-mt-md"
            />
            <q-input
              v-if="provedorEdicao.groqCloud === 'enabled'"
              v-model="provedorEdicao.groqCloudApiKey"
              :label="$t('provedorGlobal.form.groqCloudApiKey')"
              type="password"
              class="q-mt-md"
            />
            <q-input
              v-if="provedorEdicao.groqCloud === 'enabled'"
              v-model="provedorEdicao.groqCloudLanguage"
              :label="$t('provedorGlobal.form.groqCloudLanguage')"
              hint="pt, en, es, etc."
              class="q-mt-md"
            />
            <q-input
              v-if="provedorEdicao.groqCloud === 'enabled'"
              v-model="provedorEdicao.groqCloudModel"
              :label="$t('provedorGlobal.form.groqCloudModel')"
              hint="whisper-large-v3, whisper-large-v2, etc."
              class="q-mt-md"
            />
          </template>
          <q-toggle
            v-model="provedorEdicao.status"
            :true-value="'active'"
            :false-value="'inactive'"
            :label="provedorEdicao.status === 'active' ? $t('provedorGlobal.status.active') : $t('provedorGlobal.status.inactive')"
            color="positive"
            class="q-mt-md"
          />
          <q-toggle
            v-model="provedorEdicao.isGlobal"
            :label="$t('provedorGlobal.form.isGlobal')"
            :disable="isMetaType(provedorEdicao.providerType)"
            class="q-mt-md"
          />
          <div v-if="isMetaType(provedorEdicao.providerType)" class="text-grey-6 q-mt-xs q-ml-md">
            {{ $t('provedorGlobal.form.metaAlwaysGlobal') }}
          </div>
          <q-input
            v-model="provedorEdicao.description"
            :label="$t('provedorGlobal.form.description')"
            type="textarea"
            rows="3"
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" color="primary" v-close-popup />
          <q-btn flat :label="$t('common.save')" color="primary" @click="salvarProvedor" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Gerenciar Tenants -->
    <q-dialog v-model="modalTenants">
      <q-card style="min-width: 600px">
        <q-card-section>
          <div class="text-h6">{{ $t('provedorGlobal.tenantsModal.title') }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="provedorSelecionado?.isGlobal" class="text-grey-6 q-mb-md">
            {{ $t('provedorGlobal.tenantsModal.globalInfo') }}
          </div>
          <q-select
            v-model="tenantSelecionado"
            :options="tenantsDisponiveis"
            :label="$t('provedorGlobal.tenantsModal.selectTenant')"
            option-label="name"
            option-value="id"
            emit-value
            map-options
            clearable
            class="q-mb-md"
          />
          <q-list v-if="provedorSelecionado?.tenants && provedorSelecionado.tenants.length > 0">
            <q-item
              v-for="tenant in provedorSelecionado.tenants"
              :key="tenant.id"
            >
              <q-item-section>
                <q-item-label>{{ tenant.name }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  round
                  icon="mdi-delete"
                  color="negative"
                  @click="removerTenant(tenant.id)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.close')" color="primary" v-close-popup />
          <q-btn
            v-if="tenantSelecionado && !provedorSelecionado?.isGlobal"
            flat
            :label="$t('provedorGlobal.tenantsModal.add')"
            color="primary"
            @click="adicionarTenant"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  CriarProvedorGlobal,
  ListarProvedoresGlobais,
  AlterarProvedorGlobal,
  DeletarProvedorGlobal,
  AdicionarTenantAoProvedorGlobal,
  RemoverTenantDoProvedorGlobal
} from 'src/service/provedorglobal.js'
import { ListarTenants } from 'src/service/tenants.js'

export default {
  name: 'ProvedoresGlobais',
  data () {
    return {
      provedoresGlobais: [],
      tenantsDisponiveis: [],
      provedorEdicao: {},
      provedorSelecionado: null,
      tenantSelecionado: null,
      modalProvedor: false,
      modalTenants: false,
      loading: false,
      filtroProviderType: null,
      filtroStatus: null,
      providerTypes: [
        { label: 'Z-API', value: 'zapi' },
        { label: 'Evolution', value: 'evo' },
        { label: 'Wuzapi', value: 'wuzapi' },
        { label: 'Uazapi', value: 'uazapi' },
        { label: 'Hub', value: 'hub' },
        { label: 'WABA (Meta)', value: 'waba' },
        { label: 'Instagram (Meta)', value: 'instagram' },
        { label: 'Messenger (Meta)', value: 'messenger' },
        { label: 'GroqCloud', value: 'groqcloud' }
      ],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      columns: [
        { name: 'id', label: '#', field: 'id', align: 'left' },
        { name: 'name', label: this.$t('provedorGlobal.columns.name'), field: 'name', align: 'center' },
        { name: 'providerType', label: this.$t('provedorGlobal.columns.providerType'), field: 'providerType', align: 'center', format: val => this.formatProviderType(val) },
        { name: 'host', label: this.$t('provedorGlobal.columns.host'), field: 'host', align: 'center' },
        { name: 'token', label: this.$t('provedorGlobal.columns.token'), field: 'token', align: 'center' },
        { name: 'status', label: this.$t('provedorGlobal.columns.status'), field: 'status', align: 'center' },
        { name: 'isGlobal', label: this.$t('provedorGlobal.columns.isGlobal'), field: 'isGlobal', align: 'center' },
        { name: 'tenants', label: this.$t('provedorGlobal.columns.tenants'), field: 'tenants', align: 'center' },
        { name: 'acoes', label: this.$t('provedorGlobal.columns.actions'), field: 'acoes', align: 'center' }
      ]
    }
  },
  computed: {
    statusOptions () {
      return [
        {
          label: this.$t('provedorGlobal.status.active'),
          value: 'active'
        },
        {
          label: this.$t('provedorGlobal.status.inactive'),
          value: 'inactive'
        }
      ]
    },
    isHostTravado () {
      const metaTypes = ['waba', 'instagram', 'messenger']
      return metaTypes.includes(this.provedorEdicao.providerType)
    },
    hostBaseUrl () {
      const providerType = this.provedorEdicao.providerType
      const baseUrl = process.env.URL_API || window.location.origin
      
      if (providerType === 'waba') {
        return `${baseUrl}/metaWebhook`
      } else if (providerType === 'instagram') {
        return `${baseUrl}/instagramWebhook`
      } else if (providerType === 'messenger') {
        return `${baseUrl}/messengerWebhook`
      }
      return ''
    }
  },
  watch: {
    'provedorEdicao.providerType' (newVal) {
      // Se for tipo Meta, forçar isGlobal = true
      if (this.isMetaType(newVal)) {
        this.provedorEdicao.isGlobal = true
      }
    }
  },
  mounted () {
    this.listarProvedoresGlobais()
    this.listarTenants()
  },
  methods: {
    isMetaType (providerType) {
      const metaTypes = ['waba', 'instagram', 'messenger']
      return metaTypes.includes(providerType)
    },
    isGroqCloudType (providerType) {
      return providerType === 'groqcloud'
    },
    formatStatus (value) {
      return value === 'active' ? this.$t('provedorGlobal.status.active') : this.$t('provedorGlobal.status.inactive')
    },
    formatProviderType (value) {
      const labels = {
        'zapi': 'Z-API',
        'evo': 'Evolution',
        'wuzapi': 'Wuzapi',
        'uazapi': 'Uazapi',
        'hub': 'Hub',
        'waba': 'WABA (Meta)',
        'instagram': 'Instagram (Meta)',
        'messenger': 'Messenger (Meta)',
        'groqcloud': 'GroqCloud'
      }
      return labels[value] || value
    },
    atualizarHostPorProviderType (providerType) {
      const metaTypes = ['waba', 'instagram', 'messenger']
      if (providerType && metaTypes.includes(providerType)) {
        const baseUrl = process.env.URL_API || window.location.origin
        if (providerType === 'waba') {
          this.provedorEdicao.host = `${baseUrl}/metaWebhook`
        } else if (providerType === 'instagram') {
          this.provedorEdicao.host = `${baseUrl}/instagramWebhook`
        } else if (providerType === 'messenger') {
          this.provedorEdicao.host = `${baseUrl}/messengerWebhook`
        }
        // Tipos Meta são sempre globais
        this.provedorEdicao.isGlobal = true
      } else if (providerType === 'groqcloud') {
        // GroqCloud não precisa de host/token
        this.provedorEdicao.host = ''
        this.provedorEdicao.token = ''
        // Habilitar GroqCloud por padrão
        this.provedorEdicao.groqCloud = 'enabled'
      }
    },
    async listarProvedoresGlobais () {
      this.loading = true
      try {
        const params = {}
        if (this.filtroProviderType) {
          params.providerType = this.filtroProviderType
        }
        if (this.filtroStatus) {
          params.status = typeof this.filtroStatus === 'object' ? this.filtroStatus.value : this.filtroStatus
        }
        const { data } = await ListarProvedoresGlobais(params)
        this.provedoresGlobais = data
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('provedorGlobal.errors.listError')
        })
      } finally {
        this.loading = false
      }
    },
    async listarTenants () {
      try {
        const { data } = await ListarTenants()
        this.tenantsDisponiveis = data
      } catch (error) {
        console.error('Erro ao listar tenants:', error)
      }
    },
    abrirModalCriarProvedor () {
      this.provedorEdicao = {
        isGlobal: true,
        status: 'active',
        groqCloud: 'disabled'
      }
      this.modalProvedor = true
    },
    editarProvedor (provedor) {
      this.provedorEdicao = {
        ...provedor,
        status: provedor.status || 'active'
      }
      // Se for um tipo Meta, garantir que o host está correto e isGlobal é true
      const metaTypes = ['waba', 'instagram', 'messenger']
      if (metaTypes.includes(provedor.providerType)) {
        this.atualizarHostPorProviderType(provedor.providerType)
        // Forçar isGlobal = true para tipos Meta
        this.provedorEdicao.isGlobal = true
      } else if (provedor.providerType === 'groqcloud') {
        // Se for GroqCloud, habilitar por padrão se não tiver definido
        this.provedorEdicao.groqCloud = provedor.groqCloud || 'enabled'
      } else {
        // Para outros tipos, usar disabled se não tiver definido
        this.provedorEdicao.groqCloud = provedor.groqCloud || 'disabled'
      }
      this.modalProvedor = true
    },
    async atualizarStatus (provedor) {
      try {
        await AlterarProvedorGlobal({
          id: provedor.id,
          status: provedor.status
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('provedorGlobal.success.updated')
        })
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || this.$t('provedorGlobal.errors.saveError')
        })
        // Reverter o status em caso de erro
        provedor.status = provedor.status === 'active' ? 'inactive' : 'active'
      }
    },
    async salvarProvedor () {
      try {
        // Garantir que providerType seja sempre o value (string) e não o objeto
        const providerType = typeof this.provedorEdicao.providerType === 'object' 
          ? this.provedorEdicao.providerType.value 
          : this.provedorEdicao.providerType

        // Validar se é tipo Meta e já existe um provedor global do mesmo tipo
        if (this.isMetaType(providerType)) {
          const existingMetaProvider = this.provedoresGlobais.find(
            p => p.providerType === providerType && (!this.provedorEdicao.id || p.id !== this.provedorEdicao.id)
          )
          
          if (existingMetaProvider) {
            this.$q.notify({
              type: 'negative',
              message: this.$t('provedorGlobal.errors.metaTypeAlreadyExists', { type: this.formatProviderType(providerType) })
            })
            return
          }
          
          // Forçar isGlobal = true para tipos Meta
          this.provedorEdicao.isGlobal = true
        }

        const dadosParaEnviar = {
          ...this.provedorEdicao,
          providerType
        }
        
        if (this.provedorEdicao.id) {
          await AlterarProvedorGlobal(dadosParaEnviar)
          this.$q.notify({
            type: 'positive',
            message: this.$t('provedorGlobal.success.updated')
          })
        } else {
          await CriarProvedorGlobal(dadosParaEnviar)
          this.$q.notify({
            type: 'positive',
            message: this.$t('provedorGlobal.success.created')
          })
        }
        this.modalProvedor = false
        this.provedorEdicao = {}
        await this.listarProvedoresGlobais()
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || this.$t('provedorGlobal.errors.saveError')
        })
      }
    },
    deletarProvedor (provedor) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('provedorGlobal.delete.confirm', { name: provedor.name }),
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
        this.loading = true
        try {
          await DeletarProvedorGlobal(provedor.id)
          this.$q.notify({
            type: 'positive',
            message: this.$t('provedorGlobal.delete.success')
          })
          await this.listarProvedoresGlobais()
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: error.response?.data?.error || this.$t('provedorGlobal.delete.error')
          })
        } finally {
          this.loading = false
        }
      })
    },
    abrirModalTenants (provedor) {
      this.provedorSelecionado = { ...provedor }
      this.tenantSelecionado = null
      this.modalTenants = true
    },
    async adicionarTenant () {
      if (!this.tenantSelecionado) return
      try {
        await AdicionarTenantAoProvedorGlobal(this.provedorSelecionado.id, this.tenantSelecionado)
        this.$q.notify({
          type: 'positive',
          message: this.$t('provedorGlobal.tenantsModal.addSuccess')
        })
        this.tenantSelecionado = null
        await this.listarProvedoresGlobais()
        // Atualizar o provedor selecionado
        const updated = this.provedoresGlobais.find(p => p.id === this.provedorSelecionado.id)
        if (updated) {
          this.provedorSelecionado = updated
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || this.$t('provedorGlobal.tenantsModal.addError')
        })
      }
    },
    async removerTenant (tenantId) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('provedorGlobal.tenantsModal.removeConfirm'),
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
        try {
          await RemoverTenantDoProvedorGlobal(this.provedorSelecionado.id, tenantId)
          this.$q.notify({
            type: 'positive',
            message: this.$t('provedorGlobal.tenantsModal.removeSuccess')
          })
          await this.listarProvedoresGlobais()
          // Atualizar o provedor selecionado
          const updated = this.provedoresGlobais.find(p => p.id === this.provedorSelecionado.id)
          if (updated) {
            this.provedorSelecionado = updated
          }
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: error.response?.data?.error || this.$t('provedorGlobal.tenantsModal.removeError')
          })
        }
      })
    }
  }
}
</script>


