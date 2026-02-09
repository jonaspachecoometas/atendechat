<template>
  <div class="funnel-charts">
    <!-- Filtros -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-md-4">
        <q-select
          v-model="filtroStatus"
          :options="opcoesStatus"
          :label="$t('funil.filterByStatus')"
          outlined
          dense
          emit-value
          map-options
        />
      </div>
      <div class="col-12 col-md-4">
        <q-select
          v-model="filtroPeriodo"
          :options="opcoesPeriodo"
          :label="$t('funil.filterByPeriod')"
          outlined
          dense
          emit-value
          map-options
        />
      </div>
      <div class="col-12 col-md-4">
        <q-select
          v-model="filtroResponsavel"
          :options="opcoesResponsaveis"
          :label="$t('funil.filterByResponsible')"
          outlined
          dense
          emit-value
          map-options
        />
      </div>
      <div class="col-12 col-md-4">
        <q-select
          v-model="filtroPipeline"
          :options="opcoesPipelines"
          :label="$t('funil.filterByPipeline')"
          outlined
          dense
          emit-value
          map-options
        />
      </div>
      <div class="col-12 col-md-4">
        <q-select
          v-model="filtroEtapa"
          :options="opcoesEtapas"
          :label="$t('funil.filterByStage')"
          outlined
          dense
          emit-value
          map-options
        />
      </div>
      <div class="col-12 col-md-4">
        <q-select
          v-model="limiteLocal"
          :options="opcoesLimite"
          :label="$t('funil.limiteRegistros')"
          outlined
          dense
          emit-value
          map-options
          clearable
        />
      </div>
      <div class="col-12 col-md-4">
        <q-input
          v-model="filtroDataInicio"
          type="date"
          :label="$t('funil.dataInicio')"
          outlined
          dense
          clearable
        />
      </div>
      <div class="col-12 col-md-4">
        <q-input
          v-model="filtroDataFim"
          type="date"
          :label="$t('funil.dataFim')"
          outlined
          dense
          clearable
        />
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ $t('funil.oportunidadeStatus') }}</div>
            <apexchart type="pie" height="260" :options="statusOptions" :series="statusSeries" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ $t('funil.oportunidadePorResponsavel') }}</div>
            <apexchart type="bar" height="260" :options="responsavelOptions" :series="responsavelSeries" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ $t('funil.evolucaoDasOportunidades') }}</div>
            <apexchart type="line" height="260" :options="evolucaoOptions" :series="evolucaoSeries" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ $t('funil.ticketMedio') }}</div>
            <apexchart type="bar" height="260" :options="ticketOptions" :series="ticketSeries" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import { ListarUsuarios } from 'src/service/user.js'

export default {
  name: 'FunnelCharts',
  components: { apexchart: VueApexCharts },
  props: {
    oportunidades: { type: Array, default: () => [] },
    etapas: { type: Array, default: () => [] },
    pipelines: { type: Array, default: () => [] },
    limite: { type: Number, default: 100 }
  },
  data() {
    const { theme, chartColors, pieColors } = this.setupThemes();
    return {
      filtroStatus: 'open',
      filtroPeriodo: '7dias',
      filtroResponsavel: 'todos',
      filtroPipeline: 'todos',
      filtroEtapa: 'todos',
      filtroDataInicio: null,
      filtroDataFim: null,
      limiteLocal: this.limite,
      opcoesStatus: [
        { label: this.$t('funil.todosLabel'), value: 'todos' },
        { label: this.$t('funil.abertosLabel'), value: 'open' },
        { label: this.$t('funil.ganhosLabel'), value: 'win' },
        { label: this.$t('funil.perdidosLabel'), value: 'lose' }
      ],
      opcoesPeriodo: [
        { label: this.$t('funil.todosLabel'), value: 'todos' },
        { label: this.$t('funil.seteDiasLabel'), value: '7dias' },
        { label: this.$t('funil.trintaDiasLabel'), value: '30dias' },
        { label: this.$t('funil.noventaDiasLabel'), value: '90dias' }
      ],
      opcoesLimite: [10, 20, 30, 50, 100, 1000, 5000, { label: 'Todos', value: 0 }],
      usuarios: [],
      theme,
      chartColors,
      pieColors
    }
  },
  watch: {
    '$q.dark.isActive'() {
      const { theme, chartColors, pieColors } = this.setupThemes();
      this.theme = theme;
      this.chartColors = chartColors;
      this.pieColors = pieColors;
    },
    limite(newVal) {
      this.limiteLocal = newVal
    },
    limiteLocal(newVal) {
      this.$emit('limite-change', newVal)
    }
  },
  async created() {
    const resUsers = await ListarUsuarios()
    this.usuarios = (resUsers.data.users || []).filter(user => user.profile !== 'superadmin')
  },
  methods: {
    setupThemes() {
      const mode = this.$q.dark.isActive ? 'dark' : 'light';
      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--q-primary').trim();
      const theme = {
        mode,
        palette: 'palette1',
        primary: primaryColor,
        monochrome: {
          enabled: true,
          color: primaryColor,
          shadeTo: mode,
          shadeIntensity: 0.95
        }
      };

      const getColor = (name) =>
        getComputedStyle(document.documentElement).getPropertyValue(`--q-${name}`).trim();

      const chartColors = [
        getColor('primary'),
        getColor('secondary'),
        getColor('accent'),
        getColor('positive'),
        getColor('warning'),
        getColor('negative'),
        getColor('dark'),
        getColor('light')
      ];

      const pieColors = [
        getColor('primary'),
        getColor('primary'),
        getColor('primary'),
        getColor('primary'),
        getColor('primary')
      ];
      
      return { theme, chartColors, pieColors };
    }
  },
  computed: {
    opcoesResponsaveis() {
      return [
        { label: this.$t('funil.todosLabel'), value: 'todos' },
        ...this.usuarios.map(user => ({ label: user.name, value: user.id }))
      ]
    },
    oportunidadesComResponsavel() {
      const usuariosMap = {}
      this.usuarios.forEach(u => { usuariosMap[u.id] = u.name })
      return this.oportunidades.map(o => ({
        ...o,
        responsibleName: usuariosMap[o.responsibleId] || this.$t('funil.noResponsible')
      }))
    },
    oportunidadesFiltradas() {
      let filtradas = this.oportunidadesComResponsavel.filter(o => {
        // Filtro por status
        if (this.filtroStatus !== 'todos' && o.status !== this.filtroStatus) {
          return false
        }
        // Filtro por responsável
        if (this.filtroResponsavel !== 'todos' && String(o.responsibleId) !== String(this.filtroResponsavel)) {
          return false
        }
        // Filtro por pipeline
        if (this.filtroPipeline !== 'todos' && String(o.pipelineId) !== String(this.filtroPipeline)) {
          return false
        }
        // Filtro por etapa
        if (this.filtroEtapa !== 'todos' && String(o.stageId) !== String(this.filtroEtapa)) {
          return false
        }
        // Filtro por período
        if (this.filtroPeriodo !== 'todos' && o.createdAt) {
          const dataCriacao = new Date(o.createdAt)
          const hoje = new Date()
          const dias = parseInt(this.filtroPeriodo)
          const dataLimite = new Date(hoje.setDate(hoje.getDate() - dias))
          if (dataCriacao < dataLimite) {
            return false
          }
        }
        // Filtro por data início
        if (this.filtroDataInicio && o.createdAt) {
          if (new Date(o.createdAt) < new Date(this.filtroDataInicio)) return false
        }
        // Filtro por data fim
        if (this.filtroDataFim && o.createdAt) {
          const dataFim = new Date(this.filtroDataFim)
          dataFim.setDate(dataFim.getDate() + 1)
          if (new Date(o.createdAt) >= dataFim) return false
        }
        return true
      })
      if (this.limiteLocal && this.limiteLocal > 0) {
        filtradas = filtradas.slice(0, this.limiteLocal)
      }
      return filtradas
    },
    statusSeries() {
      const abertos = this.oportunidadesFiltradas.filter(o => o.status === 'open').length
      const ganhos = this.oportunidadesFiltradas.filter(o => o.status === 'win').length
      const perdidos = this.oportunidadesFiltradas.filter(o => o.status === 'lose').length
      return [abertos, ganhos, perdidos]
    },
    statusOptions() {
      return {
        ...this.theme,
        labels: [this.$t('funil.abertosLabel'), this.$t('funil.ganhosLabel'), this.$t('funil.perdidosLabel')],
        legend: { position: 'bottom' },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        colors: this.pieColors,
        tooltip: {
          theme: this.$q.dark.isActive ? 'dark' : 'light',
          style: {
            fontSize: '14px',
            color: this.$q.dark.isActive ? '#fff' : '#222'
          }
        }
      }
    },
    responsavelSeries() {
      const mapa = {}
      this.oportunidadesFiltradas.forEach(o => {
        const nome = o.responsibleName || this.$t('funil.noResponsible')
        mapa[nome] = (mapa[nome] || 0) + 1
      })
      return [{ name: this.$t('funil.oportunidades'), data: Object.values(mapa) }]
    },
    responsavelOptions() {
      const mapa = {}
      this.oportunidadesFiltradas.forEach(o => {
        const nome = o.responsibleName || this.$t('funil.noResponsible')
        mapa[nome] = (mapa[nome] || 0) + 1
      })
      return {
        ...this.theme,
        chart: { toolbar: { show: false } },
        xaxis: { categories: Object.keys(mapa) },
        dataLabels: { enabled: true },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        colors: this.chartColors,
        tooltip: {
          theme: this.$q.dark.isActive ? 'dark' : 'light',
          style: {
            fontSize: '14px',
            color: this.$q.dark.isActive ? '#fff' : '#222'
          }
        }
      }
    },
    evolucaoSeries() {
      const mapa = {}
      this.oportunidadesFiltradas.forEach(o => {
        if (!o.createdAt) return
        const data = new Date(o.createdAt)
        const mes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`
        mapa[mes] = (mapa[mes] || 0) + 1
      })
      return [{ name: this.$t('funil.oportunidades'), data: Object.values(mapa) }]
    },
    evolucaoOptions() {
      const mapa = {}
      this.oportunidadesFiltradas.forEach(o => {
        if (!o.createdAt) return
        const data = new Date(o.createdAt)
        const mes = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`
        mapa[mes] = (mapa[mes] || 0) + 1
      })
      return {
        ...this.theme,
        chart: { toolbar: { show: false } },
        xaxis: { categories: Object.keys(mapa) },
        dataLabels: { enabled: true },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        stroke: {
          width: [4]
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        colors: this.chartColors,
        tooltip: {
          theme: this.$q.dark.isActive ? 'dark' : 'light',
          style: {
            fontSize: '14px',
            color: this.$q.dark.isActive ? '#fff' : '#222'
          }
        }
      }
    },
    ticketSeries() {
      // Mapeia todos os responsáveis cadastrados
      const todosResponsaveis = this.usuarios.map(u => u.name)
      const mapa = {}
      const counts = {}

      this.oportunidadesFiltradas.forEach(o => {
        const nome = o.responsibleName || this.$t('funil.noResponsible')
        // Converte o value para número
        const valor = Number(o.value) || 0
        mapa[nome] = (mapa[nome] || 0) + valor
        counts[nome] = (counts[nome] || 0) + 1
      })

      // Garante que todos os responsáveis estejam presentes, mesmo sem oportunidades
      todosResponsaveis.forEach(nome => {
        if (!(nome in mapa)) {
          mapa[nome] = 0
          counts[nome] = 0
        }
      })

      const tickets = todosResponsaveis.map(nome =>
        counts[nome] ? mapa[nome] / counts[nome] : 0
      )

      return [{ name: this.$t('funil.ticketMedio'), data: tickets }]
    },
    ticketOptions() {
      const todosResponsaveis = this.usuarios.map(u => u.name)
      return {
        ...this.theme,
        chart: { toolbar: { show: false } },
        xaxis: { categories: todosResponsaveis },
        dataLabels: { 
          enabled: true,
          formatter: function (val) {
            return Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        colors: this.chartColors,
        tooltip: {
          theme: this.$q.dark.isActive ? 'dark' : 'light',
          style: {
            fontSize: '14px',
            color: this.$q.dark.isActive ? '#fff' : '#222'
          },
          y: {
            formatter: function (val) {
              return Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            }
          }
        }
      }
    },
    totalOportunidades() {
      return this.oportunidadesFiltradas.length
    },
    totalGanhos() {
      return this.oportunidadesFiltradas.filter(o => o.status === 'win').length
    },
    totalPerdidas() {
      return this.oportunidadesFiltradas.filter(o => o.status === 'lose').length
    },
    ticketMedioFormatado() {
      // Calcula o ticket médio das oportunidades filtradas
      const valores = this.oportunidadesFiltradas.map(o => o.value || 0)
      if (!valores.length) return '0'
      const media = valores.reduce((a, b) => a + b, 0) / valores.length
      return media.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    totalResponsaveis() {
      // Conta responsáveis únicos nas oportunidades filtradas
      const ids = new Set(this.oportunidadesFiltradas.map(o => o.responsibleId))
      return ids.size
    },
    opcoesPipelines() {
      return [
        { label: this.$t('funil.todosLabel'), value: 'todos' },
        ...this.pipelines.map(pipeline => ({
          label: pipeline.name,
          value: pipeline.id
        }))
      ]
    },
    opcoesEtapas() {
      return [
        { label: this.$t('funil.todosLabel'), value: 'todos' },
        ...this.etapas.map(etapa => ({
          label: etapa.name,
          value: etapa.id
        }))
      ]
    }
  },
  beforeMount() {
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try {
        const parsed = JSON.parse(storedColors)
        list = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsed?.colors)
            ? parsed.colors
            : []
      } catch (_) {
        list = []
      }

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

        if (typeof value === 'string' && value) {
          acc[key] = value
        }
        return acc
      }, {})

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });

      // Atualiza as cores após carregar do localStorage
      const { theme, chartColors, pieColors } = this.setupThemes();
      this.theme = theme;
      this.chartColors = chartColors;
      this.pieColors = pieColors;
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
  },
}
</script>

<style lang="scss" scoped>
.funnel-charts {
  margin-top: 18px;

  .row {
    .q-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      overflow: hidden;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
      }

      .q-card-section {
        padding: 20px;

        .text-h6 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;

          &::before {
            content: '';
            display: block;
            width: 4px;
            height: 16px;
            background: var(--q-primary);
            border-radius: 2px;
          }
        }
      }
    }
  }

  .q-select {
    .q-field__control {
      border-radius: 12px;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.3);

      &:hover {
        background: rgba(255, 255, 255, 0.9);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
    }
  }
}
body.body--dark .funnel-charts .q-card {
  background: rgba(30, 30, 30, 0.92) !important;
  border: 1px solid rgba(60, 60, 60, 0.5) !important;
}

</style> 
