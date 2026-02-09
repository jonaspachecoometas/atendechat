<template>
  <div class="funnel-calendar" v-if="(userProfile === 'admin' || pageAllowed)">
    <div class="calendar-header">
      <q-btn flat icon="chevron_left" @click="mudarMes(-1)" />
      <div class="calendar-title">
        {{ mesAtualFormatado }}
      </div>
      <q-btn flat icon="chevron_right" @click="mudarMes(1)" />
      <q-select
        v-model="limiteLocal"
        :options="opcoesLimite"
        :label="$t('funil.limiteRegistros')"
        outlined
        dense
        emit-value
        map-options
        clearable
        class="q-ml-md"
        style="width: 150px"
      />
      <q-btn
        v-if="hasActiveCalendarConfigs"
        flat
        icon="mdi-calendar"
        label="Eventos Google Calendar"
        color="positive"
        @click="openCalendarEvents"
        class="q-ml-md"
      >
        <q-tooltip>
          {{ $t('funil.viewGoogleCalendar') }}
        </q-tooltip>
      </q-btn>
    </div>

    <div class="calendar-grid">
      <!-- Cabeçalho dos dias da semana -->
      <div class="calendar-weekdays">
        <div v-for="dia in diasSemana" :key="dia" class="weekday">
          {{ dia }}
        </div>
      </div>

      <!-- Grid do calendário -->
      <div class="calendar-days">
        <div
          v-for="(dia, index) in diasDoMes"
          :key="index"
          class="calendar-day"
          :class="{
            'other-month': !dia.pertenceAoMes,
            'has-opportunities': dia.opportunities?.length > 0,
            'selected': diaSelecionado === dia.data
          }"
          @click="selecionarDia(dia)"
        >
          <div class="day-number">{{ dia.numero }}</div>
          <div v-if="dia.opportunities?.length > 0" class="opportunity-count">
            {{ dia.opportunities.length }}
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de oportunidades do dia selecionado -->
    <q-dialog v-model="dialogAberto" persistent maximized>
      <q-card class="opportunities-modal">
        <div class="list-header">
          <h3 v-if="diaSelecionado">{{ formatarData(diaSelecionado) }}</h3>
          <div class="header-actions">
            <div style="display: inline-block; position: relative;">
              <q-btn
                color="primary"
                icon="add"
                :label="$t('funil.novaOportunidade')"
                @click="abrirOportunidade()"
                class="q-mr-sm"
              />
              <q-tooltip v-if="isDataPassada">
                {{ $t('funil.dataAnteriorNaoPermitida') }}
              </q-tooltip>
            </div>
            <q-btn flat icon="close" @click="fecharDialog" />
          </div>
        </div>
        <div class="opportunities-grid">
          <OpportunityCard
            v-for="opp in oportunidadesDoDiaSelecionado"
            :key="opp.id"
            :oportunidade="opp"
            @click="abrirOportunidade(opp)"
          />
        </div>
      </q-card>
    </q-dialog>

    <OpportunityForm
      v-if="showOpportunityForm"
      :key="oportunidadeSelecionada?.id || oportunidadeSelecionada?.closingForecast || 'new'"
      :oportunidade="oportunidadeSelecionada"
      :pipelines="pipelines"
      :stages="stages"
      :responsaveis="responsaveis"
      :contatos="[]"
      @close="fecharOportunidade"
      @saved="onOportunidadeSalva"
    />

    <!-- Eventos do Google Calendar -->
    <q-dialog v-model="showCalendarEvents" persistent maximized>
      <q-card class="calendar-events-modal">
        <div class="list-header">
          <h3>{{ $t('funil.googleCalendarEvents') }}</h3>
          <div class="header-actions">
            <q-btn flat icon="close" @click="showCalendarEvents = false" />
          </div>
        </div>
        
        <!-- Filtros -->
        <div class="filters-section" v-if="hasActiveCalendarConfigs">
          <div class="row q-gutter-md items-center">
            <q-select
              v-model="selectedCalendarConfigId"
              :options="calendarConfigOptions"
              label="Selecionar Agenda"
              outlined
              dense
              style="min-width: 200px"
              emit-value
              map-options
              @update:model-value="onCalendarConfigChange"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{ $t('funil.noCalendarConfig') }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            
            <q-input
              v-model="calendarFiltros.dataInicio"
              label="Data de Início"
              outlined
              dense
              type="date"
              style="min-width: 150px"
            />
            
            <q-input
              v-model="calendarFiltros.dataFim"
              label="Data de Fim"
              outlined
              dense
              type="date"
              style="min-width: 150px"
            />
            
            <q-input
              v-model.number="calendarFiltros.maxResults"
              label="Número de Resultados"
              outlined
              dense
              type="number"
              min="1"
              max="100"
              style="min-width: 120px"
            />
            
            <q-btn
              color="primary"
              label="Buscar"
              @click="loadCalendarEvents"
              :loading="loadingCalendarEvents"
              :disable="!selectedCalendarConfigId"
            />
          </div>
        </div>
        
        <!-- Tabela de Eventos -->
        <div class="events-table-section">
          <q-table
            :rows="calendarEvents"
            :columns="calendarEventColumns"
            row-key="id"
            :loading="loadingCalendarEvents"
            v-model:pagination="calendarEventPagination"
            :rows-per-page-options="[10, 20, 50]"
            binary-state-sort
            flat
            bordered
            class="my-sticky-dynamic"
          >
            <template v-slot:body-cell-start="props">
              <q-td class="text-center">
                {{ formatDateTime(props.row.start) }}
              </q-td>
            </template>
            
            <template v-slot:body-cell-end="props">
              <q-td class="text-center">
                {{ formatDateTime(props.row.end) }}
              </q-td>
            </template>
            
            <template v-slot:body-cell-status="props">
              <q-td class="text-center">
                <q-chip
                  :color="getStatusColor(props.row.status)"
                  text-color="white"
                  dense
                >
                  {{ props.row.status }}
                </q-chip>
              </q-td>
            </template>
            
            <template v-slot:body-cell-acoes="props">
              <q-td class="text-center">
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="edit"
                  @click="editCalendarEvent(props.row)"
                  size="sm"
                >
                  <q-tooltip>{{ $t('funil.editCalendarEvent') }}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  color="info"
                  icon="open_in_new"
                  @click="openCalendarEvent(props.row.htmlLink)"
                  size="sm"
                >
                  <q-tooltip>{{ $t('funil.openCalendarEvent') }}</q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </div>
      </q-card>
    </q-dialog>

    <!-- Modal de Edição de Evento do Google Calendar -->
    <q-dialog v-model="showEditCalendarEventModal" persistent>
      <q-card style="min-width: 700px; max-width: 900px;" class="modal-card">
        <q-card-section class="modal-header">
          <div class="text-h6">{{ $t('funil.editCalendarEvent') }}</div>
        </q-card-section>
        <q-card-section class="modal-body">
          <q-form @submit="updateCalendarEvent" class="modal-form">
            <div class="form-row">
              <div class="form-field full-width">
                <q-input
                  v-model="editingCalendarEvent.summary"
                  :label="$t('funil.eventTitle')"
                  outlined
                  dense
                  :rules="[val => !!val || $t('funil.eventTitleRequired')]"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="editingCalendarEvent.startDateTime"
                  :label="$t('funil.eventStartDate')"
                  outlined
                  dense
                  type="datetime-local"
                  :rules="[val => !!val || $t('funil.eventStartDateRequired')]"
                />
              </div>
              <div class="form-field">
                <q-input
                  v-model="editingCalendarEvent.endDateTime"
                  :label="$t('funil.eventEndDate')"
                  outlined
                  dense
                  type="datetime-local"
                  :rules="[val => !!val || $t('funil.eventEndDateRequired')]"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field full-width">
                <q-input
                  v-model="editingCalendarEvent.description"
                  :label="$t('funil.eventDescription')"
                  outlined
                  dense
                  type="textarea"
                  rows="3"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="editingCalendarEvent.location"
                  :label="$t('funil.eventLocation')"
                  outlined
                  dense
                />
              </div>
              <div class="form-field">
                <q-input
                  v-model="editingCalendarEvent.attendees"
                  :label="$t('funil.eventAttendees')"
                  outlined
                  dense
                  :hint="$t('funil.eventAttendeesHint')"
                />
              </div>
            </div>
            <div class="form-row form-actions">
              <div class="form-field">
                <q-btn
                  type="submit"
                  color="primary"
                  :label="$t('funil.updateEvent')"
                  :loading="updatingCalendarEvent"
                />
                <q-btn
                  flat
                  :label="$t('funil.cancelUpdateEvent')"
                  @click="showEditCalendarEventModal = false"
                  class="q-ml-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ListarPipelines } from 'src/service/funil.js'
import { ListarStages } from 'src/service/estagio.js'
import { ListarOpportunities } from 'src/service/oportunidade.js'
import { ListarUsuarios } from 'src/service/user.js'
import { ListarConfiguracoesGoogleCalendar, ListarEventosGoogleCalendar, AtualizarEventoGoogleCalendar } from 'src/service/googleCalendar.js'
import OpportunityForm from './OpportunityForm.vue'
import OpportunityCard from './OpportunityCard.vue'

export default {
  name: 'FunnelCalendar',
  components: {
    OpportunityForm,
    OpportunityCard
  },
  data() {
    return {
      userProfile: 'user',
      pageAllowed: true,
      dataAtual: new Date(),
      diaSelecionado: null,
      dialogAberto: false,
      pipelines: [],
      stages: [],
      responsaveis: [],
      oportunidades: [],
      showOpportunityForm: false,
      oportunidadeSelecionada: null,
      limiteLocal: 1000,
      opcoesLimite: [10, 20, 30, 50, 100, 1000, 5000, { label: 'Todos', value: 0 }],
      // Google Calendar
      calendarConfigs: [],
      selectedCalendarConfigId: null,
      calendarEvents: [],
      loadingCalendarEvents: false,
      showCalendarEvents: false,
      calendarFiltros: {
        dataInicio: '',
        dataFim: '',
        maxResults: 50
      },
      // Edição de eventos
      showEditCalendarEventModal: false,
      editingCalendarEvent: {
        id: '',
        summary: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        location: '',
        attendees: ''
      },
      updatingCalendarEvent: false,
      // Colunas da tabela de eventos do Google Calendar
      calendarEventColumns: [
        {
          name: 'summary',
          label: this.$t('funil.eventTitle'),
          field: 'summary',
          align: 'left',
          sortable: true
        },
        {
          name: 'start',
          label: this.$t('funil.eventStartDate'),
          field: 'start',
          align: 'center',
          sortable: true
        },
        {
          name: 'end',
          label: this.$t('funil.eventEndDate'),
          field: 'end',
          align: 'center',
          sortable: true
        },
        {
          name: 'location',
          label: this.$t('funil.eventLocation'),
          field: 'location',
          align: 'left'
        },
        {
          name: 'status',
          label: this.$t('funil.eventStatus'),
          field: 'status',
          align: 'center'
        },
        {
          name: 'acoes',
          label: this.$t('funil.eventActions'),
          field: 'acoes',
          align: 'center'
        }
      ],
      calendarEventPagination: {
        sortBy: 'start',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      }
    }
  },
  computed: {
    diasSemana() {
      return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    },
    mesAtualFormatado() {
      return this.dataAtual.toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric'
      })
    },
    diasDoMes() {
      const ano = this.dataAtual.getFullYear()
      const mes = this.dataAtual.getMonth()
      
      const primeiroDia = new Date(ano, mes, 1)
      const ultimoDia = new Date(ano, mes + 1, 0)
      
      const dias = []
      
      // Adiciona dias do mês anterior
      const primeiroDiaSemana = primeiroDia.getDay()
      for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
        const data = new Date(ano, mes, -i)
        dias.push({
          data: data,
          numero: data.getDate(),
          pertenceAoMes: false,
          opportunities: []
        })
      }
      
      // Adiciona dias do mês atual
      for (let i = 1; i <= ultimoDia.getDate(); i++) {
        const data = new Date(ano, mes, i)
        dias.push({
          data: data,
          numero: i,
          pertenceAoMes: true,
          opportunities: this.oportunidadesDoDia(data)
        })
      }
      
      // Adiciona dias do próximo mês
      const ultimoDiaSemana = ultimoDia.getDay()
      for (let i = 1; i < 7 - ultimoDiaSemana; i++) {
        const data = new Date(ano, mes + 1, i)
        dias.push({
          data: data,
          numero: data.getDate(),
          pertenceAoMes: false,
          opportunities: []
        })
      }
      
      return dias
    },
    oportunidadesDoDia() {
      return (data) => {
        return this.oportunidades.filter(opp => {
          const dataOpp = new Date(opp.closingForecast)
          return this.mesmaDataUTC(dataOpp, data)
        })
      }
    },
    oportunidadesDoDiaSelecionado() {
      if (!this.diaSelecionado) return []
      return this.oportunidades.filter(opp => {
        const dataOpp = new Date(opp.closingForecast)
        return this.mesmaDataUTC(dataOpp, this.diaSelecionado)
      })
    },
    isDataPassada() {
      if (!this.diaSelecionado) return false;
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataSel = new Date(this.diaSelecionado);
      dataSel.setHours(0, 0, 0, 0);
      return dataSel < hoje;
    },
    hasActiveCalendarConfigs() {
      return this.calendarConfigs.some(config => 
        config.isActive && config.googleAccessToken && config.googleRefreshToken
      )
    },
    calendarConfigOptions() {
      return this.calendarConfigs
        .filter(config => config.isActive && config.googleAccessToken && config.googleRefreshToken)
        .map(config => ({
          label: config.name,
          value: config.id
        }))
    }
  },
  watch: {
    limiteLocal(newVal) {
      this.carregarDados()
    },
    showEditCalendarEventModal(newValue) {
      if (!newValue) {
        // Limpar formulário quando o modal for fechado
        this.editingCalendarEvent = {
          id: '',
          summary: '',
          description: '',
          startDateTime: '',
          endDateTime: '',
          location: '',
          attendees: ''
        }
      }
    }
  },
  async created() {
    await this.carregarDados()
    await this.carregarConfiguracoesGoogleCalendar()
  },
  methods: {
    mesmaDataUTC(date1, date2) {
      if (!date1 || !date2) return false;
      return (
        date1.getUTCFullYear() === date2.getUTCFullYear() &&
        date1.getUTCMonth() === date2.getUTCMonth() &&
        date1.getUTCDate() === date2.getUTCDate()
      );
    },
    async carregarDados() {
      try {
        // Calcula o primeiro e último dia do mês selecionado
        const primeiroDia = new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth(), 1)
        const ultimoDia = new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth() + 1, 0)
        
        // Ajusta para o início e fim do dia em UTC
        primeiroDia.setUTCHours(0, 0, 0, 0)
        ultimoDia.setUTCHours(23, 59, 59, 999)
        
        // Formata as datas para o formato ISO
        const dataInicio = primeiroDia.toISOString()
        const dataFim = ultimoDia.toISOString()

        // Primeiro, busca todas as oportunidades do mês sem limite
        const [resOpp, resStages, resPipes, resUsers] = await Promise.all([
          ListarOpportunities({
            page: 1,
            limit: 1000, // Busca todas as oportunidades do mês
            dataInicio,
            dataFim
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

        // Filtra as oportunidades para garantir que estão no mês correto
        let oportunidadesFiltradas = resOpp.data.data.filter(opp => {
          const dataOpp = new Date(opp.closingForecast)
          return dataOpp >= primeiroDia && dataOpp <= ultimoDia
        })

        // Aplica o limite local após filtrar
        if (this.limiteLocal && this.limiteLocal > 0) {
          oportunidadesFiltradas = oportunidadesFiltradas.slice(0, this.limiteLocal)
        }

        this.oportunidades = oportunidadesFiltradas.map(o => ({
          ...o,
          stageId: Number(o.stageId),
          pipelineId: Number(o.pipelineId),
          value: Number(o.value),
          status: o.status ? o.status.toLowerCase() : ''
        }))

        this.stages = resStages.data.data
        this.pipelines = resPipes.data.data
        this.responsaveis = (resUsers.data.users || [])
          .filter(user => user.profile !== 'superadmin')
          .map(user => ({
            label: user.name,
            value: user.id
          }))
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.loadError')
        })
      }
    },
    mudarMes(incremento) {
      const novoMes = new Date(this.dataAtual)
      novoMes.setMonth(novoMes.getMonth() + incremento)
      this.dataAtual = novoMes
      this.carregarDados() // Recarrega os dados ao mudar o mês
    },
    selecionarDia(dia) {
      // Permite abrir o dialog para qualquer data
      this.diaSelecionado = dia.data
      this.dialogAberto = true
    },
    formatarData(data) {
      return data.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    },
    abrirOportunidade(opp = null) {
      if (opp) {
        this.oportunidadeSelecionada = opp
      } else {
        // Se for uma nova oportunidade, inclui a data selecionada
        const dataSelecionada = this.diaSelecionado ? new Date(this.diaSelecionado) : new Date()
        
        // Verifica se a data é anterior ao dia atual
        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)
        
        if (dataSelecionada < hoje) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('funil.dataAnteriorNaoPermitida')
          })
          return
        }
        
        // Ajusta para o fuso horário local
        const ano = dataSelecionada.getFullYear()
        const mes = String(dataSelecionada.getMonth() + 1).padStart(2, '0')
        const dia = String(dataSelecionada.getDate()).padStart(2, '0')
        
        this.oportunidadeSelecionada = {
          closingForecast: `${ano}-${mes}-${dia}`,
          closingForecastBR: `${dia}/${mes}/${ano}` // DD/MM/YYYY para exibição
        }
      }
      // Fechar o diálogo de dia antes de abrir o formulário (evita sobreposição/z-index)
      this.dialogAberto = false
      this.$nextTick(() => {
        // Pequeno atraso para garantir que o backdrop do primeiro dialog foi removido
        setTimeout(() => {
          this.showOpportunityForm = true
        }, 10)
      })
    },
    fecharOportunidade() {
      this.showOpportunityForm = false
      this.oportunidadeSelecionada = null
      // Não fecha o dialog, apenas o formulário
    },
    fecharDialog() {
      this.dialogAberto = false
      this.diaSelecionado = null
    },
    async onOportunidadeSalva() {
      await this.carregarDados()
      this.fecharOportunidade()
      // Não fecha o dialog, apenas atualiza as oportunidades
      if (this.diaSelecionado) {
        // Força a atualização do computed property
        this.$forceUpdate()
      }
    },
    openCalendarEvents() {
      this.showCalendarEvents = true;
      this.selectedCalendarConfigId = null; // Resetar para permitir seleção
      this.calendarFiltros = {
        dataInicio: new Date().toISOString().split('T')[0], // Data atual
        dataFim: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 dias à frente
        maxResults: 50
      };
      this.calendarEvents = [];
      this.loadingCalendarEvents = false;
    },
    async loadCalendarEvents() {
      if (!this.selectedCalendarConfigId) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('funil.selectCalendarConfig')
        });
        return;
      }

      // Buscar a configuração selecionada
      const selectedConfig = this.calendarConfigs.find(c => c.id === this.selectedCalendarConfigId)
      if (!selectedConfig) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('funil.configNotFound')
        })
        return
      }

      if (!selectedConfig.googleAccessToken) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('funil.configureGoogleCalendar')
        })
        return
      }
      
      this.loadingCalendarEvents = true
      try {
        const requestData = {
          timeMin: this.calendarFiltros.dataInicio ? new Date(this.calendarFiltros.dataInicio).toISOString() : new Date().toISOString(),
          timeMax: this.calendarFiltros.dataFim ? new Date(this.calendarFiltros.dataFim).toISOString() : new Date().toISOString(),
          maxResults: this.calendarFiltros.maxResults || 50,
          googleAccessToken: selectedConfig.googleAccessToken,
          googleRefreshToken: selectedConfig.googleRefreshToken,
          googleClientId: selectedConfig.googleClientId,
          googleClientSecret: selectedConfig.googleClientSecret
        }
        
        const response = await ListarEventosGoogleCalendar(
          {
            timeMin: this.calendarFiltros.dataInicio ? new Date(this.calendarFiltros.dataInicio).toISOString() : new Date().toISOString(),
            timeMax: this.calendarFiltros.dataFim ? new Date(this.calendarFiltros.dataFim).toISOString() : new Date().toISOString(),
            maxResults: this.calendarFiltros.maxResults || 50
          },
          requestData
        )
        
        this.calendarEvents = response.data.events || []
        
      } catch (error) {
        console.error('Erro ao carregar eventos:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.eventError') + ': ' + (error.response?.data?.error || error.message)
        })
      } finally {
        this.loadingCalendarEvents = false
      }
    },
    formatDateTime(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        hour: 'numeric',
        minute: 'numeric'
      });
    },
    getStatusColor(status) {
      switch (status) {
        case 'confirmed':
          return 'primary';
        case 'tentative':
          return 'warning';
        case 'cancelled':
          return 'negative';
        default:
          return 'info';
      }
    },
    openCalendarEvent(url) {
      window.open(url, '_blank');
    },
    async carregarConfiguracoesGoogleCalendar() {
      try {
        const response = await ListarConfiguracoesGoogleCalendar();
        this.calendarConfigs = response.data.configs || [];
      } catch (error) {
        console.error('Erro ao carregar configurações do Google Calendar:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.calendarConfigError')
        });
      }
    },
    onCalendarConfigChange(val) {
      this.selectedCalendarConfigId = val;
      this.loadCalendarEvents(); // Recarrega eventos quando a configuração muda
    },
    async updateCalendarEvent() {
      if (!this.selectedCalendarConfigId) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('funil.selectCalendarConfig')
        })
        return
      }

      // Buscar a configuração selecionada
      const selectedConfig = this.calendarConfigs.find(c => c.id === this.selectedCalendarConfigId)
      if (!selectedConfig) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('funil.configNotFound')
        })
        return
      }

      this.updatingCalendarEvent = true
      try {
        const attendees = this.editingCalendarEvent.attendees
          ? this.editingCalendarEvent.attendees.split(',').map(email => email.trim())
          : []
        
        await AtualizarEventoGoogleCalendar(this.editingCalendarEvent.id, {
          summary: this.editingCalendarEvent.summary,
          description: this.editingCalendarEvent.description,
          startDateTime: this.editingCalendarEvent.startDateTime,
          endDateTime: this.editingCalendarEvent.endDateTime,
          location: this.editingCalendarEvent.location,
          attendees,
          googleAccessToken: selectedConfig.googleAccessToken,
          googleRefreshToken: selectedConfig.googleRefreshToken,
          googleClientId: selectedConfig.googleClientId,
          googleClientSecret: selectedConfig.googleClientSecret
        })
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('funil.eventUpdatedSuccess')
        })
        
        this.showEditCalendarEventModal = false
        await this.loadCalendarEvents()
        
      } catch (error) {
        console.error('Erro ao atualizar evento:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funil.eventUpdateError') + ': ' + (error.response?.data?.error || error.message)
        })
      } finally {
        this.updatingCalendarEvent = false
      }
    },
    editCalendarEvent(event) {
      // Converter datas para formato datetime-local
      let startDateTime = ''
      let endDateTime = ''
      
      if (event.start) {
        try {
          // Se for apenas data, adicionar hora padrão
          const startDate = new Date(event.start)
          if (event.start.length === 10) { // Formato YYYY-MM-DD
            startDate.setHours(9, 0, 0, 0) // 9:00 AM
          }
          startDateTime = startDate.toISOString().slice(0, 16)
        } catch (e) {
          console.error('Erro ao converter data de início:', e)
        }
      }
      
      if (event.end) {
        try {
          // Se for apenas data, adicionar hora padrão
          const endDate = new Date(event.end)
          if (event.end.length === 10) { // Formato YYYY-MM-DD
            endDate.setHours(10, 0, 0, 0) // 10:00 AM
          }
          endDateTime = endDate.toISOString().slice(0, 16)
        } catch (e) {
          console.error('Erro ao converter data de fim:', e)
        }
      }
      
      this.editingCalendarEvent = {
        id: event.id,
        summary: event.summary || '',
        description: event.description || '',
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        location: event.location || '',
        attendees: event.attendees ? event.attendees.join(', ') : ''
      }
      
      this.showEditCalendarEventModal = true
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
.funnel-calendar {
  padding: 12px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  flex-wrap: wrap;
}

.calendar-title {
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
}

.calendar-grid {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 12px;
  flex: 1;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.weekday {
  text-align: center;
  font-weight: 600;
  color: var(--q-primary);
  padding: 4px;
  font-size: 0.9rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  height: 40px;
  padding: 4px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &.other-month {
    opacity: 0.5;
  }

  &.has-opportunities {
    background: rgba(0, 163, 0, 0.1);
    border: 1px solid rgba(0, 163, 0, 0.2);
  }

  &.selected {
    background: var(--q-primary);
    color: white;
  }
}

.day-number {
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1;
}

.opportunity-count {
  position: absolute;
  top: 1px;
  right: 1px;
  background: var(--q-primary);
  color: white;
  font-size: 0.65rem;
  padding: 1px 3px;
  border-radius: 6px;
  line-height: 1;
}

.opportunities-modal {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px;
  border-radius: 20px;
  background: rgba(255,255,255,0.98);
  min-height: 300px;
  position: relative;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--q-primary);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.funnel-calendar__add-btn {
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

@media (max-width: 600px) {
  .opportunities-modal {
    padding: 12px 4px;
    border-radius: 0;
  }
}

/* Estilos para o modal de eventos do Google Calendar */
.calendar-events-modal {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  border-radius: 20px;
  background: rgba(255,255,255,0.98);
  min-height: 400px;
  position: relative;
}

.filters-section {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.events-table-section {
  flex: 1;
  min-height: 300px;
}

.my-sticky-dynamic {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 16px !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  thead {
    tr {
      th {
        background: rgba(var(--q-primary-rgb), 0.1) !important;
        color: var(--q-primary);
        font-weight: 600;
        font-size: 0.9rem;
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        position: sticky;
        z-index: 1;
      }
    }
  }

  tbody {
    tr {
      transition: all 0.3s ease;

      &:hover {
        background: rgba(var(--q-primary-rgb), 0.05);
      }

      td {
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
    }
  }
}

/* Modo Escuro */
body.body--dark {
  .calendar-events-modal {
    background: rgba(30, 30, 30, 0.98);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .filters-section {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .my-sticky-dynamic {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);

    thead {
      tr {
        th {
          background: rgba(255, 255, 255, 0.05) !important;
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }
      }
    }

    tbody {
      tr {
        &:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        td {
          border-bottom-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .calendar-events-modal {
    padding: 16px 12px;
    border-radius: 12px;
  }

  .filters-section {
    .row {
      flex-direction: column;
      gap: 12px;
    }
  }

  .my-sticky-dynamic {
    margin: 0.5rem;
    border-radius: 12px !important;

    thead {
      tr {
        th {
          padding: 0.8rem;
          font-size: 0.85rem;
        }
      }
    }

    tbody {
      tr {
        td {
          padding: 0.8rem;
          font-size: 0.85rem;
        }
      }
    }
  }
}

/* Estilos do Modal */
.modal-card {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
}

.modal-header {
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .text-h6 {
    color: var(--q-primary);
    font-weight: 600;
    font-size: 1.3rem;
    margin: 0;
  }
}

.modal-body {
  padding: 1.5rem 2rem 2rem 2rem;
}

.modal-form {
  .form-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    .form-field {
      flex: 1;
      min-width: 0;

      &.full-width {
        flex: 1 1 100%;
      }
    }
  }

  .form-actions {
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);

    .form-field {
      flex: none;
      display: flex;
      gap: 0.75rem;
    }
  }

  .q-input {
    .q-field__control {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      transition: all 0.3s ease;
      border: 1px solid rgba(0, 0, 0, 0.1);

      &:hover {
        background: rgba(255, 255, 255, 1);
        border-color: rgba(0, 0, 0, 0.2);
      }
    }

    &.q-field--focused .q-field__control {
      background: rgba(255, 255, 255, 1);
      border-color: var(--q-primary);
      box-shadow: 0 0 0 2px rgba(var(--q-primary-rgb), 0.1);
    }

    &.q-field--outlined .q-field__control {
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .q-field__label {
      color: rgba(0, 0, 0, 0.7);
      font-weight: 500;
    }

    .q-field__hint {
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.8rem;
    }
  }

  .q-textarea {
    .q-field__control {
      min-height: 80px;
    }
  }
}

/* Modo Escuro para o Modal */
body.body--dark {
  .modal-card {
    background: rgba(30, 30, 30, 0.98);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .modal-header {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .modal-form {
    .form-actions {
      border-top-color: rgba(255, 255, 255, 0.1);
    }

    .q-input {
      .q-field__control {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
      }

      &.q-field--focused .q-field__control {
        background: rgba(255, 255, 255, 0.15);
        border-color: var(--q-primary);
      }

      .q-field__label {
        color: rgba(255, 255, 255, 0.8);
      }

      .q-field__hint {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
}

/* Responsividade do Modal */
@media (max-width: 768px) {
  .modal-card {
    margin: 1rem;
    min-width: auto !important;
    max-width: calc(100vw - 2rem) !important;
  }

  .modal-header,
  .modal-body {
    padding: 1rem 1.5rem;
  }

  .modal-form {
    .form-row {
      flex-direction: column;
      gap: 1rem;

      .form-field {
        flex: none;
      }
    }

    .form-actions {
      justify-content: center;
      flex-direction: column;
      gap: 0.5rem;

      .form-field {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
      }
    }
  }
}
</style> 
