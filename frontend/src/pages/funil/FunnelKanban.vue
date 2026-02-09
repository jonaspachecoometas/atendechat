<template>
  <div class="funnel-kanban" v-if="(userProfile === 'admin' || pageAllowed)">
    <exportar-funil
      :oportunidades="oportunidades"
      :pipelines="pipelines"
      :etapas="stages"
    />
    <OpportunityAlerts 
      :oportunidades="oportunidades" 
      @view="abrirDetalhes"
      @update="abrirOportunidade"
      @advance="avancarEtapa"
      @assign="designarResponsavel"
    />
    
    <OpportunityFilter
      :pipelines="pipelines"
      :stages="stages"
      :responsaveis="responsaveis"
      @filtrar="aplicarFiltros"
    />

    <!-- Paginação no topo -->
    <div class="q-mb-md flex flex-center items-center">
      <q-pagination
        v-model="pagination.page"
        :max="totalPaginas"
        :max-pages="7"
        color="primary"
        boundary-numbers
        @update:model-value="mudarPagina"
        :disable="pagination.total <= pagination.limit"
      />
      <q-select
        class="q-ml-md"
        v-model="pagination.limit"
        :options="[10, 20, 50, 100]"
        :label="$t('funil.registrosPorPagina')"
        dense
        outlined
        style="width: 120px"
        @update:model-value="mudarLimite"
      />
      <span class="q-ml-md">{{ $t('funil.total') }}: {{ pagination.total }}</span>
    </div>

    <div class="funnel-kanban__board">
      <div
        v-for="stage in etapasVisiveis"
        :key="stage.id"
        class="funnel-kanban__column"
      >
        <div class="funnel-kanban__column-header">
          <span>{{ stage.name }}</span>
          <span class="funnel-kanban__column-count">({{ oportunidadesPorStage(stage.id).length }})</span>
        </div>
        <div class="funnel-kanban__cards">
          <OpportunityCard
            v-for="opp in oportunidadesPorStage(stage.id)"
            :key="opp.id"
            :oportunidade="opp"
            @click="abrirOportunidade(opp)"
            @deletar="deletarOportunidade"
          />
        </div>
      </div>
    </div>

    <q-btn
      @click="abrirOportunidade()"
      color="primary"
      icon="add"
      class="funnel-kanban__add-btn"
    />

    <OpportunityForm
      v-if="showOpportunityForm"
      :oportunidade="oportunidadeSelecionada"
      :pipelines="pipelines"
      :stages="stages"
      :responsaveis="responsaveis"
      :contatos="[]"
      @close="fecharOportunidade"
      @saved="onOportunidadeSalva"
    />

    <OpportunityDetails
      v-if="showOpportunityDetails"
      :show="showOpportunityDetails"
      :oportunidade="oportunidadeSelecionada"
      :pipelines="pipelines"
      :stages="stages"
      :responsaveis="responsaveis"
      @close="fecharDetalhes"
      @edit="abrirOportunidade"
    />
  </div>
</template>

<script>
import { ListarPipelines } from 'src/service/funil.js'
import { ListarStages } from 'src/service/estagio.js'
import { ListarOpportunities, DeletarOpportunity } from 'src/service/oportunidade.js'
import OpportunityForm from './OpportunityForm.vue'
import OpportunityCard from './OpportunityCard.vue'
import OpportunityDetails from './OpportunityDetails.vue'
import OpportunityFilter from './OpportunityFilter.vue'
import OpportunityAlerts from './OpportunityAlerts.vue'
import { ListarUsuarios } from 'src/service/user.js'
import ExportarFunil from './ExportarFunil.vue'

export default {
  name: 'FunnelKanban',
  components: { 
    OpportunityForm,
    OpportunityCard,
    OpportunityDetails,
    OpportunityFilter,
    OpportunityAlerts,
    ExportarFunil
  },
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      pipelines: [],
      stages: [],
      oportunidades: [],
      responsaveis: [],
      showOpportunityForm: false,
      showOpportunityDetails: false,
      oportunidadeSelecionada: null,
      loading: false,
      filtros: {
        pipelineId: null,
        stageId: null,
        responsibleId: null,
        status: 'open',
        valorMin: null,
        valorMax: null,
        dataInicio: null,
        dataFim: null,
        searchTerm: null,
        periodo: null,
        ordenacao: 'data_desc'
      },
      pagination: {
        page: 1,
        limit: 100,
        total: 0
      },
      dadosCarregados: false,
      // Sistema de gerenciamento de memória
      timers: []
    }
  },
  computed: {
    etapasVisiveis() {
      if (this.filtros.stageId !== null && this.filtros.stageId !== undefined) {
        const filtroStageId = Number(this.filtros.stageId)
        if (!isNaN(filtroStageId)) {
          return this.stages.filter(s => Number(s.id) === filtroStageId)
        }
      }
      if (this.filtros.pipelineId !== null && this.filtros.pipelineId !== undefined) {
        const filtroPipelineId = Number(this.filtros.pipelineId)
        if (!isNaN(filtroPipelineId)) {
          return this.stages.filter(s => Number(s.pipelineId) === filtroPipelineId)
        }
      }
      return this.stages
    },
    totalPaginas() {
      return Math.ceil(this.pagination.total / this.pagination.limit) || 1
    },
    oportunidadesFiltradas() {
      
      const filtradas = this.oportunidades.filter(opp => {
        // Converter IDs para números para comparação
        const oppPipelineId = Number(opp.pipelineId)
        const oppStageId = Number(opp.stageId)
        const oppResponsibleId = Number(opp.responsibleId)
        const oppValue = Number(opp.value)
        
        // Verificação robusta para stageId e pipelineId
        const filtroStageId = (this.filtros.stageId !== null && this.filtros.stageId !== undefined) 
          ? Number(this.filtros.stageId) 
          : null
        const filtroPipelineId = (this.filtros.pipelineId !== null && this.filtros.pipelineId !== undefined) 
          ? Number(this.filtros.pipelineId) 
          : null

        // Pipeline e Stage - stageId tem prioridade sobre pipelineId
        if (filtroStageId !== null && !isNaN(filtroStageId)) {
          if (oppStageId !== filtroStageId) {
            return false
          }
        } else if (filtroPipelineId !== null && !isNaN(filtroPipelineId)) {
          if (oppPipelineId !== filtroPipelineId) {
            return false
          }
        }

        // Responsável
        if (this.filtros.responsibleId) {
          const filtroResponsibleId = Number(this.filtros.responsibleId)
          if (oppResponsibleId !== filtroResponsibleId) {
            return false
          }
        }

        // Status
        if (this.filtros.status && opp.status !== this.filtros.status) {
          return false
        }

        // Valores
        if (this.filtros.valorMin && oppValue < this.filtros.valorMin) {
          return false
        }
        if (this.filtros.valorMax && oppValue > this.filtros.valorMax) {
          return false
        }

        // Datas
        if (this.filtros.dataInicio || this.filtros.dataFim) {
          const dataOportunidade = new Date(opp.createdAt)
          dataOportunidade.setHours(0, 0, 0, 0)

          if (this.filtros.dataInicio) {
            const dataInicio = new Date(this.filtros.dataInicio)
            dataInicio.setHours(0, 0, 0, 0)
            if (dataOportunidade < dataInicio) {
              return false
            }
          }

          if (this.filtros.dataFim) {
            const dataFim = new Date(this.filtros.dataFim)
            dataFim.setHours(0, 0, 0, 0)
            if (dataOportunidade > dataFim) {
              return false
            }
          }
        }

        return true
      })

      return filtradas
    }
  },
  async created() {
    await this.carregarDados()
  },
  methods: {
    // Sistema de gerenciamento de memória
    addTimer(timerId) {
      this.timers.push(timerId);
    },
    clearAllTimers() {
      this.timers.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      this.timers = [];
    },
    cleanupMemory() {
      this.clearAllTimers();
    },
    async carregarDados() {
      this.loading = true
      try {
        const [resOpp, resStages, resPipes, resUsers] = await Promise.all([
          ListarOpportunities({
            ...this.filtros,
            startDate: this.filtros.dataInicio,
            endDate: this.filtros.dataFim,
            page: this.pagination.page,
            limit: this.pagination.limit
          }),
          ListarStages({
            page: 1,
            limit: 100
          }),
          ListarPipelines({
            page: 1,
            limit: 100
          }),
          ListarUsuarios()
        ])
        this.oportunidades = resOpp.data.data.map(o => ({
          ...o,
          stageId: Number(o.stageId),
          pipelineId: Number(o.pipelineId),
          value: Number(o.value),
          status: o.status ? o.status.toLowerCase() : ''
        }))
        this.pagination.total = resOpp.data.pagination.total
        this.stages = resStages.data.data
        this.pipelines = resPipes.data.data
        this.responsaveis = (resUsers.data.users || [])
          .filter(user => user.profile !== 'superadmin')
          .map(user => ({
            label: user.name,
            value: user.id
          }))
        this.dadosCarregados = true
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.loadError')
        })
      } finally {
        this.loading = false
      }
    },
    oportunidadesPorStage(stageId) {
      const stageIdNum = Number(stageId)
      const filtradas = this.oportunidadesFiltradas.filter(opp => Number(opp.stageId) === stageIdNum)
      return filtradas
    },
    abrirOportunidade(opp = null) {
      this.oportunidadeSelecionada = opp;
      this.showOpportunityForm = true;
    },
    fecharOportunidade() {
      this.showOpportunityForm = false
      this.oportunidadeSelecionada = null
    },
    async onOportunidadeSalva() {
      await this.carregarDados()
      this.fecharOportunidade()
    },
    aplicarFiltros(filtros) {
      this.filtros = {
        ...this.filtros,
        ...filtros,
        pipelineId: (filtros.pipelineId !== null && filtros.pipelineId !== undefined) ? Number(filtros.pipelineId) : null,
        stageId: (filtros.stageId !== null && filtros.stageId !== undefined) ? Number(filtros.stageId) : null,
        responsibleId: (filtros.responsibleId !== null && filtros.responsibleId !== undefined) ? Number(filtros.responsibleId) : null,
        status: filtros.status || 'open',
        valorMin: (filtros.valorMin !== null && filtros.valorMin !== undefined) ? Number(filtros.valorMin) : null,
        valorMax: (filtros.valorMax !== null && filtros.valorMax !== undefined) ? Number(filtros.valorMax) : null,
        dataInicio: filtros.dataInicio || null,
        dataFim: filtros.dataFim || null,
        searchTerm: filtros.searchTerm || null,
        periodo: filtros.periodo || null,
        ordenacao: filtros.ordenacao || 'data_desc'
      }
      this.pagination.page = 1 // Reset page when applying new filters
      this.carregarDados()
    },
    abrirDetalhes(opp) {
      if (!this.dadosCarregados) {
        const timerId = setTimeout(() => this.abrirDetalhes(opp), 100);
        this.addTimer(timerId);
        return;
      }
      this.oportunidadeSelecionada = opp;
      this.showOpportunityDetails = true;
    },
    fecharDetalhes() {
      this.showOpportunityDetails = false
    },
    avancarEtapa(opp) {
      // Encontrar a próxima etapa
      const etapaAtual = this.stages.find(s => s.id === opp.stageId)
      const etapasDoPipeline = this.stages.filter(s => s.pipelineId === etapaAtual.pipelineId)
      const indexAtual = etapasDoPipeline.findIndex(s => s.id === etapaAtual.id)
      const proximaEtapa = etapasDoPipeline[indexAtual + 1]

      if (proximaEtapa) {
        this.oportunidadeSelecionada = {
          ...opp,
          stageId: proximaEtapa.id
        }
        this.showOpportunityForm = true
      } else {
        this.$q.notify({
          type: 'warning',
          message: this.$t('funil.ultimaEtapa')
        })
      }
    },
    designarResponsavel(opp) {
      this.oportunidadeSelecionada = opp
      this.showOpportunityForm = true
    },
    deletarOportunidade(opp) {
      this.$q
        .dialog({
          title: this.$t('funil.atencao'),
          message: this.$t('funil.deletarOportunidade'),
          cancel: {
            label: this.$t('funil.nao'),
            color: 'primary',
            push: true,
          },
          ok: {
            label: this.$t('funil.sim'),
            color: 'negative',
            push: true,
          },
          persistent: true,
        })
        .onOk(() => {
          this.loading = true;
          DeletarOpportunity(opp.id)
            .then(() => {
              this.loading = false;
              this.carregarDados();
              this.$q.notify({
                type: 'positive',
                message: this.$t('funil.oportunidadeDeletada')
              });
            })
            .catch(error => {
              this.loading = false;
              console.error(error);
              this.$q.notify({
                type: 'negative',
                message: this.$t('funil.erroAoDeletar')
              });
            });
        })
        .onCancel(() => {});
    },
    mudarPagina(pagina) {
      this.pagination.page = pagina
      this.carregarDados()
    },
    mudarLimite() {
      this.pagination.page = 1
      this.carregarDados()
    }
  },
  async mounted() {
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
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.kanban === true;
  },
  
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
  }
}
</script>

<style lang="scss" scoped>
.funnel-kanban {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.funnel-kanban__board {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 0;
  flex: 1;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
}

.funnel-kanban__column {
  min-width: 320px;
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
}

.funnel-kanban__column-header {
  font-weight: 600;
  padding: 12px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #2c3e50;
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
}

.funnel-kanban__column-count {
  background: rgba(0, 163, 0, 0.1);
  color: #00a300;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.9em;
  font-weight: 500;
}

.funnel-kanban__cards {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
}

.funnel-kanban__add-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
}
</style> 
