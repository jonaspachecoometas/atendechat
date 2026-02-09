<template>
  <div>
    <q-list class="text-weight-medium">
      <q-table
        flat
        bordered
        square
        hide-bottom
        class="my-sticky-dynamic q-ma-lg"
        :title="$t('configuracaoPagamentoAtraso.title')"
        :rows="pagamentos"
        :columns="columns"
        :loading="loading"
        row-key="id"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top="props">
          <q-toolbar>
            <q-toolbar-title>
              {{ $t('configuracaoPagamentoAtraso.title') }}
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
              {{ $t('configuracaoPagamentoAtraso.paymentLink') }}
            </a>
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            {{ $t('configuracaoPagamentoAtraso.status.' + props.row.status.toLowerCase()) }}
          </q-td>
        </template>
      </q-table>
    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId, ListarTenantPorAsaas } from 'src/service/tenants.js'
import { MostrarCores } from 'src/service/empresas.js';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      colors: {},
      usuario,
      pagamentos: [],
      columns: [
        { name: 'id', label: 'ID do Pagamento', field: 'id', align: 'left' },
        { name: 'status', label: this.$t('configuracaoPagamentoAtraso.status'), field: 'status', align: 'left' },
        { name: 'dueDate', label: this.$t('configuracaoPagamentoAtraso.dueDate'), field: 'dueDate', align: 'left' },
        { name: 'bankSlipUrl', label: this.$t('configuracaoPagamentoAtraso.paymentLink'), field: 'bankSlipUrl', align: 'left' }
      ],
      loading: false, 
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
    formatarData(data) {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR');
    },
    async listarTenantPorId(){
      this.loading = true; 
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      if (data[0].asaas === 'enabled'){
        try{
          const { data } = await ListarTenantPorAsaas(this.usuario.tenantId)
          this.pagamentos = data.data; 
          this.loading = false; 
        } catch(e){
          console.log('Não foi possível listar as opções de pagamento')
          this.loading = false; 
        }
      } else{
        this.loading = false; 
      }
    },
  },
  async mounted() {
    await this.listarTenantPorId()
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

.q-list {
  background: transparent;
  box-shadow: none;
  border: none;
  padding: 0;
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
