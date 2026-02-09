<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super' && pageAllowed))">
    <q-card bordered>
      <q-card-section>
        <div class="text-h6 q-px-sm">{{ $t('relatorioContatosResumo.title') }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <fieldset>
          <legend class="q-px-sm">{{ $t('relatorioContatosResumo.filters') }}</legend>
          <div class="row q-gutter-md items-end">
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.startDate') }}</label>
              <DatePick
                dense
                v-model="pesquisa.startDate"
              />
            </div>
            <div class="col-grow">
              <label>{{ $t('relatorioContatosAtendimento.endDate') }}</label>
              <DatePick
                dense
                v-model="pesquisa.endDate"
              />
            </div>
            <div class="col-grow text-center">
              <q-btn
                class="q-mr-sm"
                color="primary"
                :label="$t('relatorioContatosAtendimento.generateButton')"
                icon="refresh"
                @click="gerarRelatorio"
              />
              <q-btn
                class="q-mr-sm"
                color="black"
                icon="print"
                label="Imprimir"
                @click="printReport('tRelatorioResumoAtendimentosUsuarios')"
              />
              <q-btn
                color="warning"
                label="Excel"
                @click="exportTable('tRelatorioResumoAtendimentosUsuarios')"
              />
            </div>
          </div>
        </fieldset>
      </q-card-section>
    </q-card>

    <div class="row">
      <div class="col-xs-12 q-mt-sm">
        <div
          class="tableLarge q-ma-sm q-markup-table q-table__container q-table__card q-table--cell-separator q-table--flat q-table--bordered q-table--no-wrap"
          id="tRelatorioResumoAtendimentosUsuarios"
        >
          <table
            id="tableRelatorioResumoAtendimentosUsuarios"
            class="q-pb-md q-table q-tabs--dense "
          >
            <thead>
              <tr>
                <td
                  v-for="col in bl_sintetico ? columns.filter(c => c.name == opcoesRelatorio.agrupamento) : columns"
                  :key="col.name"
                >
                  {{ col.label }}
                </td>
              </tr>
            </thead>
            <tbody>
              <template v-if="!bl_sintetico">
                <tr
                  v-for="row in dadosResumo"
                  :key="row.number"
                >
                  <td
                    v-for="col in columns"
                    :key="col.name +'-'+ row.id"
                    :class="col.class"
                    :style="col.style"
                  >
                    {{ col.format !== void 0 ? col.format(row[col.field], row) : row[col.field] }}
                  </td>
                </tr>
              </template>

            </tbody>
          </table>
        </div>
      </div>
    </div>

    <ccPrintModelLandscape
      id="slotTableRelatorioResumoAtendimentosUsuarios"
      :imprimirRelatorio="imprimir"
      title="Relatório de Resumo Atendimentos Usuários"
      :styleP="`
      table { width: 100%; font-size: 10px; border-spacing: 1; border-collapse: collapse;  }
      #tableReport tr td { border:1px solid #DDD; padding-left: 10px; padding-right: 10px;  }
      #tableReport thead tr:nth-child(1) td { text-align: center; padding: 5px; font-weight: bold; color: #000; background: lightgrey; opacity: 1; }
      #lineGroup { background: #f8f8f8; line-height: 30px; }
      #quebraAgrupamentoRelatorio { border-bottom: 1px solid black !important; }
      #st_nome, #st_tipo_atendimento, #st_status_faturamento, #st_convenio, #st_nome_profissional, #st_status, #st_nome_unidade, #st_nome_profissional { width: 200px; word-wrap: normal !important; white-space: normal !important; }
      #dt_atendimento_unidade { width: 100px; text-align: center }
      `"
    >
      <template v-slot:body>
        <table class="q-pb-md q-table q-tabs--dense ">
          <thead>
            <tr>
              <td
                v-for="col in bl_sintetico ? columns.filter(c => c.name == opcoesRelatorio.agrupamento) : columns"
                :key="col.name"
              >
                {{ col.label }}
              </td>
            </tr>
          </thead>
          <tbody>
            <template v-if="!bl_sintetico">
              <tr
                v-for="row in dadosResumo"
                :key="row.number"
              >
                <td
                  v-for="col in columns"
                  :key="col.name +'-'+ row.id"
                  :class="col.class"
                  :style="col.style"
                >
                  {{ col.format !== void 0 ? col.format(row[col.field], row) : row[col.field] }}
                </td>
              </tr>
            </template>

          </tbody>
        </table>
      </template>
    </ccPrintModelLandscape>

  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>

<script>
import { format, sub } from 'date-fns'
import ccPrintModelLandscape from './ccPrintModelLandscape.vue'
import { RelatorioResumoAtendimentosUsuarios } from 'src/service/estatisticas.js'

export default {
  name: 'RelatorioResumoAtendimentosUsuarios',
  components: { ccPrintModelLandscape },
  props: {
    moduloAtendimento: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pageAllowed: true,
      userProfile: 'user',
      data: null,
      bl_sintetico: false,
      dadosResumo: [],
      columns: [
        {
          name: 'name',
          label: this.$t('relatorioContatosResumo.tableHeaders.name'),
          field: 'name',
          align: 'left',
          style: 'width: 300px',
          format: (v) => (v ? v : this.$t('common.notProvided')),
        },
        {
          name: 'email',
          label: this.$t('relatorioContatosResumo.tableHeaders.email'),
          field: 'email',
          align: 'left',
          style: 'width: 300px',
          format: (v) => (v ? v : this.$t('common.notProvided')),
        },
        {
          name: 'qtd_pendentes',
          label: this.$t('relatorioContatosResumo.tableHeaders.pending'),
          field: 'qtd_pendentes',
          align: 'center',
          style: 'width: 300px; text-align: center;',
        },
        {
          name: 'qtd_em_atendimento',
          label: this.$t('relatorioContatosResumo.tableHeaders.inProgress'),
          field: 'qtd_em_atendimento',
          align: 'center',
          style: 'width: 300px; text-align: center;',
        },
        {
          name: 'qtd_resolvidos',
          label: this.$t('relatorioContatosResumo.tableHeaders.resolved'),
          field: 'qtd_resolvidos',
          align: 'center',
          style: 'width: 300px; text-align: center;',
        },
        {
          name: 'qtd_por_usuario',
          label: this.$t('relatorioContatosResumo.tableHeaders.total'),
          field: 'qtd_por_usuario',
          align: 'center',
          style: 'width: 300px; text-align: center;',
        },
      ],
      pesquisa: {
        startDate: format(sub(new Date(), { days: 30 }), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd')
      },
      ExibirTabela: true,
      imprimir: false
    }
  },
  methods: {
    sortObject (obj) {
      return Object.keys(obj)
        .sort().reduce((a, v) => {
          a[v] = obj[v]
          return a
        }, {})
    },
    printReport (idElemento) {
      this.imprimir = !this.imprimir
    },
    async exportTable() {
      const mod = await import('xlsx')
      const XLSX = mod.default || mod
      const json = XLSX.utils.table_to_sheet(
        document.getElementById('tableRelatorioResumoAtendimentosUsuarios'),
        { raw: true }
      );
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, json, this.$t('relatorioContatosResumo.sheetTitle'));
      XLSX.writeFile(wb, `${this.$t('relatorioContatosResumo.sheetName')}.xlsx`);
    },
    async gerarRelatorio () {
      const { data } = await RelatorioResumoAtendimentosUsuarios(this.pesquisa)
      this.dadosResumo = data
    }
  },
  async mounted () {
    this.gerarRelatorio()
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.relatorios === true;
  }
}
</script>

<style lang="scss" scoped>
.text-right {
  text-align: right;
}

.q-card {
  background: rgba(255,255,255,0.92);
  border-radius: 20px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.13);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.06);
  transition: box-shadow 0.2s, background 0.2s;
}
.q-card-section legend {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--q-primary);
  margin-bottom: 0.5rem;
}
.q-btn {
  border-radius: 8px;
  min-width: 28px;
  min-height: 28px;
  padding: 0.18rem 0.7rem;
  font-size: 0.92rem;
  transition: box-shadow 0.2s, background 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  &:hover {
    box-shadow: 0 3px 8px rgba(0,0,0,0.11);
    background: rgba(var(--q-primary-rgb), 0.09);
  }
}
.tableLarge {
  background: rgba(255,255,255,0.85);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 0.5rem;
  margin-bottom: 1rem;
  backdrop-filter: blur(6px);
  transition: box-shadow 0.2s;
}
thead tr td {
  color: #222;
  background: #eaeaff;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 1000;
}
body.body--dark .q-card {
  background: rgba(30,30,30,0.98);
  box-shadow: 0 6px 32px rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.10);
}
body.body--dark .tableLarge {
  background: rgba(40,40,40,0.92);
  box-shadow: 0 2px 12px rgba(0,0,0,0.18);
}
body.body--dark thead tr td {
  background: #23234a;
  color: #e0e0e0;
}
body.body--dark .tableLarge tbody tr td,
body.body--dark .q-table tbody tr td {
  color: #e0e0e0 !important;
  background: #232323 !important;
}
@media (max-width: 900px) {
  .q-card {
    border-radius: 12px;
    padding: 0.5rem;
  }
  .tableLarge {
    border-radius: 8px;
    padding: 0.2rem;
  }
}
</style>
