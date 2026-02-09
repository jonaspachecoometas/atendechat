<template>
  <div v-if="userProfile === 'superadmin'">
    <q-table
      flat
      bordered
      square
      hide-bottom
      style="border-radius: 8px"
      class="my-sticky-dynamic q-ma-lg"
      :title="$t('tenantApi.table.title')"
      :rows="tenantApis"
      :columns="columns"
      :loading="loading"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[0]">
      <template v-slot:top-right>
        <q-btn color="primary"
          :label="$t('common.add')"
          @click="tenantApiEdicao = {}; modalTenantApi = true" />
      </template>
      <template v-slot:body-cell-acoes="props">
        <q-td class="text-center">
          <q-btn flat
            round
            icon="edit"
            @click="editarTenantApi(props.row)" />
          <q-btn flat
            round
            icon="mdi-delete"
            @click="deletarTenantApi(props.row)" />
        </q-td>
      </template>
    </q-table>
    <div>
      <q-card class="q-ma-md">
        <q-card-section>
          <q-item-label style="word-break: break-all;">
            <h3 :class="{'text-white': $q.dark.isActive}" class="text-weight-medium text-nowrap q-pr-md">
              <span class="text-bold" >{{ $t('tenantApi.routes.createTitle') }}</span>
            </h3>
            <pre><b>{{ $t('tenantApi.routes.endpoint') }} #1: </b><a target="_blank" href="https://www.postman.com/comunidade-zdg/z-pro/request/ynl49n9/storetenant">{{ montarUrlIntegração() }}</a></pre>
            <pre><b>{{ $t('tenantApi.routes.endpoint') }} #2: </b><a target="_blank" href="https://www.postman.com/comunidade-zdg/z-pro/request/cl5jjlz/updatetenant">{{ montarUrlIntegraçãoStatus() }}</a></pre>
            <pre><b>{{ $t('tenantApi.routes.endpoint') }} #3: </b><a target="_blank" href="https://www.postman.com/comunidade-zdg/z-pro/request/mtxmwtc/showtenant">{{ montarUrlMostrarStatus() }}</a></pre>
            <pre><b>{{ $t('tenantApi.routes.endpoint') }} #4: </b><a target="_blank" href="https://www.postman.com/comunidade-zdg/z-pro/request/f7ez8fi/createsessiontenant">{{ montarUrlCreateSession() }}</a></pre>
            <pre><b>{{ $t('tenantApi.routes.endpoint') }} #5: </b><a target="_blank" href="https://www.postman.com/comunidade-zdg/z-pro/request/listtenants">{{ montarUrlListTenants() }}</a></pre>
            <pre><b>{{ $t('tenantApi.routes.bearerToken') }}:</b> Api Token</pre>
            <!-- <pre><b>{{ $t('tenantApi.routes.body') }}:</b> </pre>
            <pre>
{
  "status": "active",
  "name": "Empresa Exemplo",
  "maxUsers": 3,
  "maxConnections": 3,
  "acceptTerms": true,
  "email": "user@example.com",
  "password": "securePassword123!",
  "userName": "Pedro Bastos",
  "identity": "07122255533",
  "profile": "admin",
  "trial": "enabled",
  "trialPeriod": 3
}
            </pre> -->
          </q-item-label>
        </q-card-section>
      </q-card>
    </div>
    <!-- Other cards omitted for brevity -->
    <ModalTenantApi v-model:modalTenantApi="modalTenantApi"
      v-model:tenantApiEdicao="tenantApiEdicao"
      @modal-tenantApi:criada="tenantApiCriada"
      @modal-tenantApi:editada="tenantApiEditada" />
  </div>
</template>

<script>
import { DeletarApiTenant, ListarApisTenant } from 'src/service/tenantApi.js'
import ModalTenantApi from './ModalTenantApi.vue'
import { MostrarCores } from 'src/service/empresas.js';
export default {
  name: 'TenantApis',
  components: {
    ModalTenantApi
  },
  data () {
    return {
      colors: {},
      userProfile: 'user',
      tenantApiEdicao: {},
      modalTenantApi: false,
      tenantApis: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'id', label: this.$t('tenantApi.table.columns.id'), field: 'id', align: 'left' },
        { name: 'apiToken', label: this.$t('tenantApi.table.columns.apiToken'), field: 'apiToken', align: 'left' },
        { name: 'acoes', label: this.$t('tenantApi.table.columns.actions'), field: 'acoes', align: 'center' }
      ]
    }
  },
  computed: {
    cBaseUrlIntegração () {
      return `${process.env.URL_API}/tenantApiStoreTenant`
    },
    cBaseUrlIntegraçãoStatus () {
      return `${process.env.URL_API}/tenantApiUpdateTenant`
    },
    cBaseUrlMostrarStatus () {
      return `${process.env.URL_API}/tenantApiShowTenant`
    },
    cBaseUrlCreateSession () {
      return `${process.env.URL_API}/tenantApiCreateSession`
    },
    cBaseUrlListTenants () {
      return `${process.env.URL_API}/tenantApiListTenants`
    }
  },
  methods: {
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
    montarUrlIntegração (id) {
      return `${this.cBaseUrlIntegração}`
    },
    montarUrlIntegraçãoStatus (id) {
      return `${this.cBaseUrlIntegraçãoStatus}`
    },
    montarUrlMostrarStatus (id) {
      return `${this.cBaseUrlMostrarStatus}`
    },
    montarUrlCreateSession (id) {
      return `${this.cBaseUrlCreateSession}`
    },
    montarUrlListTenants (id) {
      return `${this.cBaseUrlListTenants}`
    },
    async listarTenantApis () {
      const { data } = await ListarApisTenant()
      this.tenantApis = data.tenantApi
    },
    tenantApiCriada (tenantApi) {
      const newTenantApis = [...this.tenantApis]
      newTenantApis.push(tenantApi)
      this.tenantApis = [...newTenantApis]
    },
    tenantApiEditada (tenantApi) {
      const newTenantApis = [...this.tenantApis]
      const idx = newTenantApis.findIndex(f => f.id === tenantApi.id)
      if (idx > -1) {
        newTenantApis[idx] = tenantApi
      }
      this.tenantApis = [...newTenantApis]
    },
    editarTenantApi (tenantApi) {
      this.tenantApiEdicao = { ...tenantApi }
      this.modalTenantApi = true
    },
    deletarTenantApi (tenantApi) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('tenantApi.modal.confirmDelete', { id: tenantApi.id }),
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
        DeletarApiTenant(tenantApi)
          .then(res => {
            let newTenantApis = [...this.tenantApis]
            newTenantApis = newTenantApis.filter(f => f.id !== tenantApi.id)

            this.tenantApis = [...newTenantApis]
            this.$q.notify({
              type: 'positive',
              progress: true,
              position: 'top',
              message: this.$t('tenantApi.modal.notifications.deleted'),
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
    this.listarTenantApis()
    this.userProfile = localStorage.getItem('profile')
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

<style scoped lang="scss">
.my-sticky-dynamic {
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
  overflow: hidden;

  .q-table__top,
  .q-table__bottom,
  .q-table__title {
    background: transparent;
    border: none;
  }

  thead tr {
    background: rgba(var(--q-primary-rgb), 0.08);
    font-weight: 600;
  }

  tbody tr {
    transition: background 0.2s;
    &:hover {
      background: rgba(var(--q-primary-rgb), 0.07);
    }
  }

  .q-btn {
    border-radius: 8px;
    min-width: 32px;
    min-height: 32px;
    padding: 0.2rem 0.7rem;
    font-size: 0.9rem;
    transition: box-shadow 0.2s, background 0.2s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07);

    &:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.13);
      background: rgba(var(--q-primary-rgb), 0.08);
    }
  }
}

.q-card {
  border-radius: 16px;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  backdrop-filter: blur(8px);
  margin-bottom: 1.5rem;
}

body.body--dark {
  .my-sticky-dynamic,
  .q-card {
    background: rgba(30,30,30,0.92);
    box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  }
  .q-table thead tr {
    background: rgba(var(--q-primary-rgb), 0.18);
  }
}
</style>
