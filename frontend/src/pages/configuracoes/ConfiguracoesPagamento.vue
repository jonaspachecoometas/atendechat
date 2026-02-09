<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">
      <q-table
        flat
        bordered
        square
        hide-bottom
        class="my-sticky-dynamic q-ma-lg"
        :title="$t('configuracaoPagamento.title')"
        :rows="pagamentos"
        :columns="columns"
        :loading="loading"
        row-key="id"
        :rows-per-page-options="[0]"
      >
        <template v-slot:top="props">
          <q-toolbar>
            <q-toolbar-title>
              {{ $t('configuracaoPagamento.toolbarTitle') }}
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
              {{ $t('configuracaoPagamento.paymentLink') }}
            </a>
          </q-td>
        </template>
        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            {{ props.row.status === 'PENDING' ? $t('configuracaoPagamento.pending') : props.row.status === 'OVERDUE' ? $t('configuracaoPagamento.overdue') : props.row.status }}
          </q-td>
        </template>
      </q-table>
    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId, ListarTenantPorAsaas } from 'src/service/tenants.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      userProfile: 'user',
      usuario,
      pagamentos: [],
      columns: [
        { name: 'id', label: this.$t('configuracaoPagamento.paymentId'), field: 'id', align: 'left' },
        { name: 'status', label: this.$t('configuracaoPagamento.status'), field: 'status', align: 'left' },
        { name: 'dueDate', label: this.$t('configuracaoPagamento.dueDate'), field: 'dueDate', align: 'left' },
        { name: 'bankSlipUrl', label: this.$t('configuracaoPagamento.paymentLink'), field: 'bankSlipUrl', align: 'left' }
      ],
      loading: false, 
    }
  },
  methods: {
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
          console.error(this.$t('configuracaoPagamento.notifications.errorFetch'));
          this.loading = false; 
        }
      } else{
        this.loading = false; 
      }
    },
  },
  async mounted() {
    await this.listarTenantPorId()
    this.userProfile = localStorage.getItem('profile')
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
