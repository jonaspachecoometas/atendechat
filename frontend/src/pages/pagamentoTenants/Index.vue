<template>
  <div v-if="userProfile === 'superadmin'">
    <q-list class="text-weight-medium">
      <div class="row col full-width q-pa-lg">
        <div v-if="loading">{{ $t('pagamentoTenants.loading') }}</div>
        <div v-if="loading" class="loading-bar">
          <div class="bar"></div>
        </div>
      </div>
      <div v-for="(pagamentos, tenantId) in pagamentosAgrupados" :key="tenantId">
        <div class="row col full-width q-pa-lg">
          <q-card
            flat
            bordered
            class="full-width"
          >
            <q-card-section class="text-h6 text-bold">
              {{ $t('pagamentoTenants.tenantId') }} # {{ tenantId }}
              <div class="absolute-top-right q-pa-sm">
                <q-btn 
                  flat 
                  class="btn-outline"
                  color="primary"
                  icon="mdi-information-outline"
                  :label="$t('pagamentoTenants.actions.toggleTable')"
                  @click="toggleTable(tenantId)"
                />
              </div>
            </q-card-section>
          
            <q-table
              v-if="tableVisibility[tenantId]"
              flat
              bordered
              square
              hide-bottom
              class="my-sticky-dynamic q-ma-lg"
              :title="$t('pagamentoTenants.paymentInfo')"
              :rows="pagamentos"
              :columns="columns"
              :loading="loading"
              row-key="id"
              :rows-per-page-options="[0]"
            >
              <template v-slot:top="props">
                <q-toolbar>
                  <q-toolbar-title>
                    {{ $t('pagamentoTenants.paymentInfo') }}
                  </q-toolbar-title>
                  <q-space></q-space>
                </q-toolbar>
              </template>
              <template v-slot:body-cell-dueDate="props">
                <q-td :props="props">
                  {{ formatarData(props.row.dueDate) }}
                </q-td>
              </template>
              <template v-slot:body-cell-bankSlipUrl="props">
                <q-td :props="props">
                  <a :href="props.row.bankSlipUrl" target="_blank">
                    {{ $t('pagamentoTenants.columns.bankSlipUrl') }}
                  </a>
                </q-td>
              </template>
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  {{ props.row.status === 'PENDING' 
                    ? $t('pagamentoTenants.status.pending') 
                    : props.row.status === 'OVERDUE' 
                      ? $t('pagamentoTenants.status.overdue') 
                      : props.row.status }}
                </q-td>
              </template>
            </q-table>

          </q-card>
        </div>
      </div>
    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantsPorAsaas } from 'src/service/tenants.js'
import { MostrarCores } from 'src/service/empresas.js';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      userProfile: "user",
      colors: {},
      usuario,
      pagamentos: [],
      columns: [
        { name: 'id', label: this.$t('pagamentoTenants.columns.id'), field: 'id', align: 'left' },
        { name: 'status', label: this.$t('pagamentoTenants.columns.status'), field: 'status', align: 'left' },
        { name: 'dueDate', label: this.$t('pagamentoTenants.columns.dueDate'), field: 'dueDate', align: 'left' },
        { name: 'bankSlipUrl', label: this.$t('pagamentoTenants.columns.bankSlipUrl'), field: 'bankSlipUrl', align: 'left' }
      ],
      loading: false,
      tableVisibility: {},
    }
  },
  computed: {
    pagamentosAgrupados() {
      const agrupados = {};
      this.pagamentos.forEach(pagamento => {
        const tenantId = pagamento.tenantId;
        if (!agrupados[tenantId]) {
          agrupados[tenantId] = [];
        }
        agrupados[tenantId].push(...pagamento.paymentInfo.data);
      });
      return agrupados;
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
    toggleTable(tenantId) {
      if (this.tableVisibility[tenantId] === undefined) {
        this.tableVisibility[tenantId] = true;
      } else {
        this.tableVisibility[tenantId] = !this.tableVisibility[tenantId];
      }
    },
    formatarData(data) {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR');
    },
    async listarPagamentos(){
      this.loading = true; 
      try {
        const { data } = await ListarTenantsPorAsaas();
        this.pagamentos = data; // certifique-se de que esta linha está correta
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        this.loading = false;
  }
    },
  },
  created() {
    try{
      this.pagamentosAgrupados.forEach((_, tenantId) => {
        this.tableVisibility[tenantId] = false;
      });
    } catch(e){
      
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem("profile");
    await this.listarPagamentos()
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
  },
})
</script>

<style lang="sass">
.loading-bar
  width: 100%
  height: 4px
  background-color: #ccc
  position: relative
  
  .bar
    width: 0
    height: 100%
    background-color: #007bff
    position: absolute
    top: 0
    left: 0
    animation: loadingAnimation 1s infinite
  
@keyframes loadingAnimation
  0%
    width: 0
  100%
    width: 100%
  
</style>

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
