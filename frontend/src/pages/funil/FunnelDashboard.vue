<template>
  <div class="funnel-dashboard" v-if="(userProfile === 'admin' || pageAllowed)">
    <div class="dashboard-cards row q-gutter-md justify-center q-mb-md">
    <FunnelCharts 
      :oportunidades="oportunidades" 
      :etapas="etapas" 
      :pipelines="pipelines"
      :limite="limite" 
      @limite-change="onLimiteChange" 
    />

  </div>
    <div class="dashboard-cards row q-gutter-md justify-center q-mb-md">
      <div
        class="col-xs-12 col-sm-shrink"
        v-for="card in cards"
        :key="card.label"
      >
        <q-card flat bordered class="my-card full-height" :style="cardStyle">
          <q-card-section class="text-center">
            <div class="row items-center">
              <div class="col">
                <p class="text-h4 text-bold text-center text-branco">
                  {{ card.value }}
                </p>
                <p class="text-caption text-branco">{{ card.label }}</p>
              </div>
              <div class="col">
                <q-icon :name="card.icon" size="lg" color="white" class="text-white" v-if="card.icon" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ListarOpportunities } from 'src/service/oportunidade.js'
import { ListarStages } from 'src/service/estagio.js'
import { ListarPipelines } from 'src/service/funil.js'
import FunnelCharts from './FunnelCharts.vue'

export default {
  name: 'FunnelDashboard',
  components: { FunnelCharts },
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      cards: [],
      etapas: [],
      oportunidades: [],
      stages: [],
      pipelines: [],
      loading: false,
      pagination: {
        page: 1,
        limit: 100,
        total: 0
      },
      limite: 100
    }
  },
  async created() {
    await this.carregarDados()
  },
  methods: {
    async carregarDados() {
      this.loading = true
      try {
        const [resOpp, resStages, resPipes] = await Promise.all([
          ListarOpportunities({
            page: 1,
            limit: this.limite === 0 ? 10000 : this.limite,
            ordenacao: 'data_desc'
          }),
          ListarStages({
            page: 1,
            limit: 100
          }),
          ListarPipelines({
            page: 1,
            limit: 100
          })
        ])
        this.oportunidades = resOpp.data.data
        this.pagination.total = resOpp.data.pagination.total
        this.stages = resStages.data.data
        this.pipelines = resPipes.data.data
        this.montarIndicadores()
        this.montarEtapas()
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
    onLimiteChange(novoLimite) {
      this.limite = novoLimite
      this.carregarDados()
    },
    montarIndicadores() {
      const totalNegocios = this.oportunidades.length
      const totalValor = this.oportunidades.reduce((acc, o) => acc + (Number(o.value) || 0), 0)
      const ganhos = this.oportunidades.filter(o => o.status === 'win').length
      const perdidos = this.oportunidades.filter(o => o.status === 'lose').length
      const abertos = this.oportunidades.filter(o => o.status === 'open').length
      const ticketMedio = totalNegocios ? (totalValor / totalNegocios) : 0
      this.cards = [
        { label: this.$t('funil.criado'), value: totalNegocios, icon: 'mdi-briefcase-outline' },
        { label: this.$t('funil.emAberto'), value: abertos, icon: 'mdi-playlist-plus' },
        { label: this.$t('funil.negocioGanho'), value: ganhos, icon: 'mdi-trophy' },
        { label: this.$t('funil.negocioPerdido'), value: perdidos, icon: 'mdi-close-circle-outline' },
        { label: this.$t('funil.ticketMedio'), value: `R$ ${ticketMedio.toFixed(2)}`, icon: 'mdi-cash-multiple' },
        { label: this.$t('funil.taxaNegociosGanhos'), value: totalNegocios ? ((ganhos / totalNegocios) * 100).toFixed(2) + '%': '0,00%', icon: 'mdi-percent' }
      ]
    },
    montarEtapas() {
      // Monta dados para o gráfico de valor por etapa
      const valoresPorEtapa = {}
      this.stages.forEach(stage => { valoresPorEtapa[stage.id] = 0 })
      this.oportunidades.forEach(o => {
        if (valoresPorEtapa[o.stageId] !== undefined) {
          valoresPorEtapa[o.stageId] += o.value || 0
        }
      })
      const maxValor = Math.max(...Object.values(valoresPorEtapa), 1)
      this.etapas = this.stages.map(stage => ({
        id: stage.id,
        name: stage.name,
        value: Number(valoresPorEtapa[stage.id] || 0),
        percent: (valoresPorEtapa[stage.id] / maxValor) * 100
      }))
    }
  },
  computed: {
    cardStyle() {
      if (this.$q.dark.isActive) {
        return {
          backgroundColor: 'var(--q-dark-page, #23272e)',
          color: 'var(--q-light, #fff)'
        }
      }
      return {
        backgroundColor: 'var(--q-primary)',
        color: 'white'
      }
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
  }
}
</script>

<style lang="scss" scoped>
.funnel-dashboard {
  padding: 24px;
}

.my-card {
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10);
  transition: all 0.3s ease;
  background: var(--q-primary);
  color: white;
}
.my-card .q-card-section {
  padding: 1.2rem 1.5rem;
}
.text-branco, .text-white {
  color: #fff !important;
}

.dashboard-cards {
  margin-bottom: 32px;
}

/* Remove estilos antigos dos cards */
.dashboard-card, .dashboard-card__value, .dashboard-card__label {
  all: unset;
}
</style> 
