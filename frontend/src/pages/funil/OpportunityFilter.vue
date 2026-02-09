<template>
  <div class="opportunity-filter">
    <q-form @submit.prevent="emitirFiltro">
      <!-- Primeira linha: Filtros principais -->
      <div class="row q-col-gutter-md q-mb-sm">
        <div class="col-12 col-md-3">
          <q-select
            class="filter-field"
            v-model.number="filtros.pipelineId"
            :options="pipelineOptions"
            :label="$t('funil.pipeline')"
            outlined
            dense
            clearable
            @update:model-value="onPipelineChange"
          >
            <template v-slot:prepend>
              <q-icon name="account_tree" />
            </template>
          </q-select>
        </div>
        <div class="col-12 col-md-3">
          <q-select
            class="filter-field"
            v-model.number="filtros.stageId"
            :options="stageOptions"
            :label="$t('funil.etapa')"
            outlined
            dense
            clearable
            @update:model-value="emitirFiltro"
          >
            <template v-slot:prepend>
              <q-icon name="flag" />
            </template>
          </q-select>
        </div>
        <div class="col-12 col-md-3">
          <q-select
            class="filter-field"
            v-model="filtros.responsibleId"
            :options="responsaveis"
            :label="$t('funil.responsavel')"
            outlined
            dense
            clearable
            emit-value
            map-options
            @update:model-value="emitirFiltro"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-select>
        </div>
        <div class="col-12 col-md-3">
          <q-select
            class="filter-field"
            v-model="filtros.status"
            :options="statusOptions"
            :label="$t('funil.status')"
            outlined
            dense
            clearable
            @update:model-value="emitirFiltro"
          >
            <template v-slot:prepend>
              <q-icon name="info" />
            </template>
          </q-select>
        </div>
      </div>
      <!-- Campo de busca por termo -->
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12">
          <q-input
            class="filter-field"
            v-model="filtros.searchTerm"
            :label="$t('funil.buscarPorTermo')"
            :placeholder="$t('funil.buscarPorTermoPlaceholder')"
            outlined
            dense
            clearable
            @update:model-value="onSearchTermChange"
            @blur="emitirFiltro"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
      <!-- Segunda linha: Valores e Datas -->
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-3">
          <q-input
            class="filter-field"
            v-model.number="filtros.valorMin"
            type="number"
            :label="$t('funil.valorMinimo')"
            outlined
            dense
            clearable
            @update:model-value="emitirFiltro"
            @blur="emitirFiltro"
          >
            <template v-slot:prepend>
              <q-icon name="payments" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-3">
          <q-input
            class="filter-field"
            v-model.number="filtros.valorMax"
            type="number"
            :label="$t('funil.valorMaximo')"
            outlined
            dense
            clearable
            @update:model-value="emitirFiltro"
            @blur="emitirFiltro"
          >
            <template v-slot:prepend>
              <q-icon name="payments" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-3">
          <q-input
            class="filter-field"
            dense
            outlined
            stack-label
            :label="$t('funil.dataInicio')"
            :model-value="filtros.dataInicioBR"
            readonly
          >
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="filtros.dataInicioBR" mask="DD/MM/YYYY" @update:model-value="onDataInicioChange" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-12 col-md-3">
          <q-input
            class="filter-field"
            dense
            outlined
            stack-label
            :label="$t('funil.dataFim')"
            :model-value="filtros.dataFimBR"
            readonly
          >
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="filtros.dataFimBR" mask="DD/MM/YYYY" @update:model-value="onDataFimChange" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <!-- Terceira linha: Botões -->
      <div class="row q-mt-md">
        <div class="col-12 flex justify-end">
          <q-btn
            flat
            color="primary"
            :label="$t('funil.limparFiltros')"
            @click="limparFiltros"
            class="q-mr-sm"
          />
          <q-btn
            color="primary"
            label="Filtrar"
            type="submit"
            icon="search"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'OpportunityFilter',
  props: {
    pipelines: { 
      type: Array, 
      default: () => [],
      validator: (value) => Array.isArray(value)
    },
    stages: { 
      type: Array, 
      default: () => [],
      validator: (value) => Array.isArray(value)
    },
    responsaveis: { 
      type: Array, 
      default: () => [],
      validator: (value) => Array.isArray(value)
    }
  },
  data() {
    return {
      filtros: {
        pipelineId: null,
        stageId: null,
        responsibleId: null,
        status: 'open',
        valorMin: null,
        valorMax: null,
        dataInicio: null,    // ISO
        dataFim: null,       // ISO
        dataInicioBR: null,  // BR
        dataFimBR: null,     // BR
        periodo: null,
        ordenacao: null,
        searchTerm: null     // Termo de busca
      },
      searchTermTimeout: null,
      statusOptions: [
        { label: this.$t('funil.aberto'), value: 'open' },
        { label: this.$t('funil.ganho'), value: 'win' },
        { label: this.$t('funil.perdido'), value: 'lose' }
      ],
      periodoOptions: [
        { label: this.$t('funil.hoje'), value: 'hoje' },
        { label: this.$t('funil.ultimos7dias'), value: '7dias' },
        { label: this.$t('funil.ultimos30dias'), value: '30dias' },
        { label: this.$t('funil.ultimos90dias'), value: '90dias' },
        { label: this.$t('funil.esteMes'), value: 'mes_atual' },
        { label: this.$t('funil.mesAnterior'), value: 'mes_anterior' }
      ],
      ordenacaoOptions: [
        { label: this.$t('funil.valorDesc'), value: 'valor_desc' },
        { label: this.$t('funil.valorAsc'), value: 'valor_asc' },
        { label: this.$t('funil.criacaoDesc'), value: 'data_desc' },
        { label: this.$t('funil.criacaoAsc'), value: 'data_asc' },
        { label: this.$t('funil.previsaoFechamento'), value: 'fechamento' }
      ]
    }
  },
  computed: {
    stagesFiltradas() {
      if (!this.filtros.pipelineId) return this.stages
      return this.stages.filter(s => s.pipelineId === this.filtros.pipelineId)
    },
    pipelineOptions() {
      return this.pipelines.map(p => ({
        label: p.name,
        value: Number(p.id)
      }))
    },
    stageOptions() {
      return this.stagesFiltradas.map(s => ({
        label: s.name,
        value: Number(s.id)
      }))
    }
  },
  methods: {
    emitirFiltro() {
      const filtrosParaEmitir = {
        ...this.filtros,
        pipelineId: this.filtros.pipelineId?.value || this.filtros.pipelineId || null,
        stageId: this.filtros.stageId?.value || this.filtros.stageId || null,
        responsibleId: this.filtros.responsibleId?.value || this.filtros.responsibleId || null,
        status: this.filtros.status?.value || this.filtros.status || null,
        valorMin: this.filtros.valorMin ? Number(this.filtros.valorMin) : null,
        valorMax: this.filtros.valorMax ? Number(this.filtros.valorMax) : null,
        // datas já estão em formato YYYY-MM-DD pelo QDate
        dataInicio: this.filtros.dataInicio || null,
        dataFim: this.filtros.dataFim || null,
        periodo: this.filtros.periodo?.value || this.filtros.periodo || null,
        searchTerm: this.filtros.searchTerm || null
      }
      this.$emit('filtrar', filtrosParaEmitir)
    },
    onPipelineChange() {
      this.filtros.stageId = null
      this.emitirFiltro()
    },
    onPeriodoChange() {
      const hoje = new Date()
      const inicio = new Date()
      const fim = new Date()

      switch (this.filtros.periodo?.value || this.filtros.periodo) {
        case 'hoje':
          inicio.setHours(0, 0, 0, 0)
          fim.setHours(23, 59, 59, 999)
          break
        case '7dias':
          inicio.setDate(hoje.getDate() - 7)
          fim.setHours(23, 59, 59, 999)
          break
        case '30dias':
          inicio.setDate(hoje.getDate() - 30)
          fim.setHours(23, 59, 59, 999)
          break
        case '90dias':
          inicio.setDate(hoje.getDate() - 90)
          fim.setHours(23, 59, 59, 999)
          break
        case 'mes_atual':
          inicio.setDate(1)
          fim.setMonth(fim.getMonth() + 1)
          fim.setDate(0)
          fim.setHours(23, 59, 59, 999)
          break
        case 'mes_anterior':
          inicio.setMonth(inicio.getMonth() - 1)
          inicio.setDate(1)
          fim.setDate(0)
          fim.setHours(23, 59, 59, 999)
          break
      }

      const toISO = (d) => {
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const da = String(d.getDate()).padStart(2, '0')
        return `${y}-${m}-${da}`
      }
      const toBR = (d) => {
        const da = String(d.getDate()).padStart(2, '0')
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const y = d.getFullYear()
        return `${da}/${m}/${y}`
      }
      this.filtros.dataInicio = toISO(inicio)
      this.filtros.dataFim = toISO(fim)
      this.filtros.dataInicioBR = toBR(inicio)
      this.filtros.dataFimBR = toBR(fim)
      this.emitirFiltro()
    },
    onDataInicioChange() {
      if (!this.filtros.dataInicioBR) { 
        this.filtros.dataInicio = null
        this.emitirFiltro()
        return 
      }
      this.filtros.dataInicio = this.convertBRToISO(this.filtros.dataInicioBR)
      this.emitirFiltro()
    },
    onDataFimChange() {
      if (!this.filtros.dataFimBR) { 
        this.filtros.dataFim = null
        this.emitirFiltro()
        return 
      }
      this.filtros.dataFim = this.convertBRToISO(this.filtros.dataFimBR)
      this.emitirFiltro()
    },
    convertBRToISO (br) {
      // br: DD/MM/YYYY -> YYYY-MM-DD
      if (!br) return null
      const [d, m, y] = String(br).split('/')
      if (d && m && y) return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`
      return null
    },
    onSearchTermChange() {
      // Debounce para o campo de busca - aguarda 500ms após parar de digitar
      if (this.searchTermTimeout) {
        clearTimeout(this.searchTermTimeout)
      }
      this.searchTermTimeout = setTimeout(() => {
        this.emitirFiltro()
      }, 500)
    },
    limparFiltros() {
      if (this.searchTermTimeout) {
        clearTimeout(this.searchTermTimeout)
      }
      this.filtros = {
        pipelineId: null,
        stageId: null,
        responsibleId: null,
        status: null,
        valorMin: null,
        valorMax: null,
        dataInicio: null,
        dataFim: null,
        dataInicioBR: null,
        dataFimBR: null,
        periodo: null,
        ordenacao: null,
        searchTerm: null
      }
      this.emitirFiltro()
    }
  }
}
</script>

<style lang="scss" scoped>
.opportunity-filter {
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  .q-field {
    &__control {
      border-radius: 12px;
      transition: all 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.3);

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
    }

    &__prepend {
      .q-icon {
        color: #00a300;
        opacity: 0.8;
      }
    }
  }

  .q-btn {
    border-radius: 12px;
    font-weight: 500;
    letter-spacing: 0.3px;
    transition: all 0.3s ease;

    &--flat {
      &:hover {
        background: rgba(0, 163, 0, 0.05);
      }
    }

    &:not(.q-btn--flat) {
      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .row {
    margin: 0 -8px;

    > div {
      padding: 8px;
    }
  }
}

.filter-field {
  width: 100%;
}
</style> 
