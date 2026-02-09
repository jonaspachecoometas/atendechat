<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-md">
      <div class="col-12">
        <h4 class="text-h4 q-mb-md">{{ $t('googleCalendar.title') }}</h4>
      </div>
    </div>

    <!-- Configuração do Google Calendar -->
    <q-dialog v-model="showConfigModal" persistent>
      <q-card style="min-width: 800px; max-width: 1000px;" class="modal-card">
        <q-card-section class="modal-header">
          <div class="text-h6">{{ config.id ? $t('googleCalendar.config.modal.editTitle') : $t('googleCalendar.config.modal.newTitle') }}</div>
        </q-card-section>
        <q-card-section class="modal-body">
          <q-form @submit="saveConfig" class="modal-form">
            <div class="form-row">
              <div class="form-field">
                <q-banner
                  :class="isConfigValid ? 'bg-positive text-white' : 'bg-warning text-black'"
                >
                  <template v-slot:avatar>
                    <q-icon :name="isConfigValid ? 'check_circle' : 'warning'" />
                  </template>
                  {{ isConfigValid ? $t('googleCalendar.config.modal.completeMessage') : $t('googleCalendar.config.modal.incompleteMessage') }}
                </q-banner>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="config.name"
                  :label="$t('googleCalendar.config.modal.name.label')"
                  outlined
                  dense
                  :rules="[val => !!val || $t('googleCalendar.config.modal.name.required')]"
                  :hint="$t('googleCalendar.config.modal.name.hint')"
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="config.googleClientId"
                  :label="$t('googleCalendar.config.modal.clientId.label')"
                  outlined
                  dense
                  :rules="[val => !!val || $t('googleCalendar.config.modal.clientId.required')]"
                />
              </div>
              <div class="form-field">
                <q-input
                  v-model="config.googleClientSecret"
                  :label="$t('googleCalendar.config.modal.clientSecret.label')"
                  outlined
                  dense
                  :type="showClientSecret ? 'text' : 'password'"
                  :rules="[val => !!val || $t('googleCalendar.config.modal.clientSecret.required')]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="showClientSecret ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="showClientSecret = !showClientSecret"
                    />
                  </template>
                </q-input>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field">
                <q-input
                  :value="redirectUri"
                  :label="$t('googleCalendar.config.modal.redirectUri.label')"
                  outlined
                  dense
                  readonly
                  :hint="$t('googleCalendar.config.modal.redirectUri.hint')"
                >
                  <template v-slot:append>
                    <q-btn
                      flat
                      round
                      color="primary"
                      icon="content_copy"
                      @click="copyRedirectUri"
                      size="sm"
                    >
                      <q-tooltip>{{ $t('googleCalendar.config.modal.redirectUri.copyTooltip') }}</q-tooltip>
                    </q-btn>
                  </template>
                </q-input>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field">
                <q-btn
                  color="warning"
                  :label="$t('googleCalendar.config.modal.getTokensButton')"
                  @click="obterTokensAutomaticamente"
                  :loading="obtendoTokens"
                  :disable="!config.googleClientId || !config.googleClientSecret"
                  icon="mdi-google"
                  class="full-width"
                />
                <q-tooltip>
                  {{ $t('googleCalendar.config.modal.getTokensTooltip') }}
                </q-tooltip>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="config.googleAccessToken"
                  :label="$t('googleCalendar.config.modal.accessToken.label')"
                  outlined
                  dense
                  :type="showAccessToken ? 'text' : 'password'"
                  :rules="[val => !!val || $t('googleCalendar.config.modal.accessToken.required')]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="showAccessToken ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="showAccessToken = !showAccessToken"
                    />
                  </template>
                </q-input>
              </div>
              <div class="form-field">
                <q-input
                  v-model="config.googleRefreshToken"
                  :label="$t('googleCalendar.config.modal.refreshToken.label')"
                  outlined
                  dense
                  :type="showRefreshToken ? 'text' : 'password'"
                  :rules="[val => !!val || $t('googleCalendar.config.modal.refreshToken.required')]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="showRefreshToken ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="showRefreshToken = !showRefreshToken"
                    />
                  </template>
                </q-input>
              </div>
            </div>
            
            <div class="form-row form-actions">
              <div class="form-field">
                <q-btn
                  type="submit"
                  color="primary"
                  :label="$t('googleCalendar.config.modal.saveButton')"
                  :loading="loading"
                  :disable="!isConfigValid"
                />
                <q-btn
                  flat
                  :label="$t('googleCalendar.config.modal.cancelButton')"
                  @click="closeConfigModal"
                  class="q-ml-sm"
                />
                <q-btn
                  v-if="config.id"
                  flat
                  color="negative"
                  :label="$t('googleCalendar.config.modal.deleteButton')"
                  @click="deleteConfig"
                  class="q-ml-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Gerenciar Configurações -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-h6">{{ $t('googleCalendar.config.management.title') }}</div>
          <q-btn
            color="primary"
            :label="$t('googleCalendar.config.management.newButton')"
            @click="openConfigModal"
            icon="add"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="configs"
          :columns="configColumns"
          row-key="id"
          :loading="loading"
          v-model:pagination="configPagination"
          :rows-per-page-options="[5, 10, 20]"
          binary-state-sort
          flat
          bordered
          class="my-sticky-dynamic"
        >
          <template v-slot:body-cell-status="props">
            <q-td class="text-center">
              <q-chip
                :color="props.row.isActive ? 'positive' : 'grey'"
                text-color="white"
                dense
              >
                {{ props.row.isActive ? $t('googleCalendar.config.management.table.statusActive') : $t('googleCalendar.config.management.table.statusInactive') }}
              </q-chip>
            </q-td>
          </template>
          
          <template v-slot:body-cell-tokens="props">
            <q-td class="text-center">
              <q-chip
                :color="props.row.googleAccessToken && props.row.googleRefreshToken ? 'positive' : 'warning'"
                text-color="white"
                dense
              >
                {{ props.row.googleAccessToken && props.row.googleRefreshToken ? $t('googleCalendar.config.management.table.tokensComplete') : $t('googleCalendar.config.management.table.tokensPending') }}
              </q-chip>
            </q-td>
          </template>
          
          <template v-slot:body-cell-createdAt="props">
            <q-td class="text-center">
              {{ formatDate(props.row.createdAt) }}
            </q-td>
          </template>
          
          <template v-slot:body-cell-acoes="props">
            <q-td class="text-center">
              <q-btn
                flat
                round
                color="primary"
                icon="edit"
                @click="editConfig(props.row)"
                size="sm"
              >
                <q-tooltip>{{ $t('googleCalendar.config.management.actions.edit') }}</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="negative"
                icon="delete"
                @click="deleteConfigFromTable(props.row)"
                size="sm"
              >
                <q-tooltip>{{ $t('googleCalendar.config.management.actions.delete') }}</q-tooltip>
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Criar Novo Evento -->
    <q-dialog v-model="showCreateModal" persistent>
      <q-card style="min-width: 600px; max-width: 800px;" class="modal-card">
        <q-card-section class="modal-header">
          <div class="text-h6">{{ $t('googleCalendar.events.create.modal.titleCreate') }}</div>
        </q-card-section>
        <q-card-section class="modal-body">
          <q-form @submit="createEvent" class="modal-form">
            <div class="form-row">
              <div class="form-field">
                <q-select
                  v-model="selectedConfigId"
                  :options="configOptions"
                  :label="$t('googleCalendar.events.create.modal.selectCalendar')"
                  outlined
                  dense
                  emit-value
                  map-options
                  :rules="[val => !!val || $t('googleCalendar.events.create.modal.selectCalendarRequired')]"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        {{ $t('googleCalendar.events.create.modal.noConfigAvailable') }}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="newEvent.summary"
                  :label="$t('googleCalendar.events.create.modal.title.label')"
                  outlined
                  dense
                  :rules="[val => !!val || $t('googleCalendar.events.create.modal.title.required')]"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="newEvent.startDateTime"
                  :label="$t('googleCalendar.events.create.modal.startDateTime.label')"
                  outlined
                  dense
                  type="datetime-local"
                  :rules="[val => !!val || $t('googleCalendar.events.create.modal.startDateTime.required')]"
                />
              </div>
              <div class="form-field">
                <q-input
                  v-model="newEvent.endDateTime"
                  :label="$t('googleCalendar.events.create.modal.endDateTime.label')"
                  outlined
                  dense
                  type="datetime-local"
                  :rules="[val => !!val || $t('googleCalendar.events.create.modal.endDateTime.required')]"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="newEvent.description"
                  :label="$t('googleCalendar.events.create.modal.description.label')"
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
                  v-model="newEvent.location"
                  :label="$t('googleCalendar.events.create.modal.location.label')"
                  outlined
                  dense
                />
              </div>
              <div class="form-field">
                <q-input
                  v-model="newEvent.attendees"
                  :label="$t('googleCalendar.events.create.modal.attendees.label')"
                  outlined
                  dense
                  :hint="$t('googleCalendar.events.create.modal.attendees.hint')"
                />
              </div>
            </div>
            <div class="form-row form-actions">
              <div class="form-field">
                <q-btn
                  type="submit"
                  color="positive"
                  :label="$t('googleCalendar.events.create.modal.createButton')"
                  :loading="creatingEvent"
                />
                <q-btn
                  flat
                  :label="$t('googleCalendar.events.create.modal.cancelButton')"
                  @click="showCreateModal = false"
                  class="q-ml-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Lista de Eventos -->
    <q-card>
      <q-card-section>
        <div class="row items-center justify-between">
          <div class="text-h6">{{ $t('googleCalendar.events.list.title') }}</div>
          <div class="row q-gutter-md">
            <q-select
              v-model="selectedConfigId"
              :options="configOptions"
              :label="$t('googleCalendar.events.list.selectCalendar')"
              outlined
              dense
              style="min-width: 200px"
              emit-value
              map-options
              @update:model-value="onConfigChange"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    {{ $t('googleCalendar.events.list.noConfigAvailable') }}
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <q-btn
              color="positive"
              :label="$t('googleCalendar.events.list.createNewButton')"
              @click="showCreateModal = true"
              icon="add"
              class="q-mr-md"
              :disable="!selectedConfigId"
            >
              <q-tooltip>
                {{ $t('googleCalendar.events.list.createNewTooltip') }}
              </q-tooltip>
            </q-btn>
            <q-input
              v-model="filtros.dataInicio"
              :label="$t('googleCalendar.events.list.filters.startDate')"
              outlined
              dense
              type="date"
              style="min-width: 150px"
            />
            <q-input
              v-model="filtros.dataFim"
              :label="$t('googleCalendar.events.list.filters.endDate')"
              outlined
              dense
              type="date"
              style="min-width: 150px"
            />
            <q-input
              v-model.number="filtros.maxResults"
              :label="$t('googleCalendar.events.list.filters.maxResults')"
              outlined
              dense
              type="number"
              min="1"
              max="100"
              style="min-width: 120px"
            />
            <q-btn
              color="primary"
              :label="$t('googleCalendar.events.list.filters.searchButton')"
              @click="loadEvents"
              :loading="loadingEvents"
              :disable="!selectedConfigId"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="events"
          :columns="columns"
          row-key="id"
          :loading="loadingEvents"
          v-model:pagination="pagination"
          :rows-per-page-options="[0]"
          binary-state-sort
          flat
          bordered
          class="my-sticky-dynamic"
        >
          <template v-slot:body-cell-acoes="props">
            <q-td class="text-center">
              <q-btn
                flat
                round
                color="primary"
                icon="edit"
                @click="editEvent(props.row)"
                size="sm"
              >
                <q-tooltip>{{ $t('googleCalendar.events.list.actions.edit') }}</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="negative"
                icon="delete"
                @click="deleteEvent(props.row.id)"
                size="sm"
              >
                <q-tooltip>{{ $t('googleCalendar.events.list.actions.delete') }}</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="info"
                icon="open_in_new"
                @click="openEvent(props.row.htmlLink)"
                size="sm"
              >
                <q-tooltip>{{ $t('googleCalendar.events.list.actions.open') }}</q-tooltip>
              </q-btn>
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
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Modal de Edição -->
    <q-dialog v-model="showEditModal" persistent>
      <q-card style="min-width: 600px; max-width: 800px;" class="modal-card">
        <q-card-section class="modal-header">
          <div class="text-h6">{{ $t('googleCalendar.events.edit.modal.titleEdit') }}</div>
        </q-card-section>
        <q-card-section class="modal-body">
          <q-form @submit="updateEvent" class="modal-form">
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="editingEvent.summary"
                  :label="$t('googleCalendar.events.edit.modal.title.label')"
                  outlined
                  dense
                  :rules="[val => !!val || $t('googleCalendar.events.edit.modal.title.required')]"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="editingEvent.startDateTime"
                  :label="$t('googleCalendar.events.edit.modal.startDateTime.label')"
                  outlined
                  dense
                  type="datetime-local"
                  :rules="[val => !!val || $t('googleCalendar.events.edit.modal.startDateTime.required')]"
                />
              </div>
              <div class="form-field">
                <q-input
                  v-model="editingEvent.endDateTime"
                  :label="$t('googleCalendar.events.edit.modal.endDateTime.label')"
                  outlined
                  dense
                  type="datetime-local"
                  :rules="[val => !!val || $t('googleCalendar.events.edit.modal.endDateTime.required')]"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-field">
                <q-input
                  v-model="editingEvent.description"
                  :label="$t('googleCalendar.events.edit.modal.description.label')"
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
                  v-model="editingEvent.location"
                  :label="$t('googleCalendar.events.edit.modal.location.label')"
                  outlined
                  dense
                />
              </div>
              <div class="form-field">
                <q-input
                  v-model="editingEvent.attendees"
                  :label="$t('googleCalendar.events.edit.modal.attendees.label')"
                  outlined
                  dense
                  :hint="$t('googleCalendar.events.edit.modal.attendees.hint')"
                />
              </div>
            </div>
            <div class="form-row form-actions">
              <div class="form-field">
                <q-btn
                  type="submit"
                  color="primary"
                  :label="$t('googleCalendar.events.edit.modal.updateButton')"
                  :loading="updatingEvent"
                />
                <q-btn
                  flat
                  :label="$t('googleCalendar.events.edit.modal.cancelButton')"
                  @click="showEditModal = false"
                  class="q-ml-sm"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { GerarUrlAutorizacaoGoogle, TrocarCodigoPorTokens, CriarEventoGoogleCalendar, ListarEventosGoogleCalendar, AtualizarEventoGoogleCalendar, DeletarEventoGoogleCalendar, CriarConfiguracaoGoogleCalendar, ListarConfiguracoesGoogleCalendar, BuscarConfiguracaoGoogleCalendar, AtualizarConfiguracaoGoogleCalendar, DeletarConfiguracaoGoogleCalendar } from 'src/service/googleCalendar.js'

export default {
  name: 'GoogleCalendar',
  data() {
    return {
      loading: false,
      loadingEvents: false,
      creatingEvent: false,
      updatingEvent: false,
      showEditModal: false,
      showCreateModal: false, // Novo estado para controlar a visibilidade do modal de criação
      obtendoTokens: false,
      showClientSecret: false, // Novo estado para controlar a visibilidade do Client Secret
      showAccessToken: false, // Novo estado para controlar a visibilidade do Access Token
      showRefreshToken: false, // Novo estado para controlar a visibilidade do Refresh Token
      showConfigModal: false, // Novo estado para controlar a visibilidade do modal de configuração
      
      config: {
        id: null, // ID da configuração no banco
        name: '', // Nome da configuração
        googleClientId: '',
        googleClientSecret: '',
        googleAccessToken: '',
        googleRefreshToken: ''
      },
      
      configs: [], // Lista de todas as configurações
      selectedConfigId: null, // ID da configuração selecionada para uso
      
      newEvent: {
        summary: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        location: '',
        attendees: ''
      },
      
      editingEvent: {
        id: '',
        summary: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        location: '',
        attendees: ''
      },
      
      events: [],
      filtros: {
        dataInicio: '',
        dataFim: '',
        maxResults: 50
      },
      
      columns: [], // Definido no mounted
      pagination: {
        sortBy: 'start',
        descending: false,
        page: 1,
        rowsPerPage: 0,
        rowsNumber: 0
      },

      // Configurações para a tabela de gerenciamento
      configPagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 0
      },
      configColumns: [], // Definido no mounted
    }
  },
  
  computed: {
    configOptions() {
      return this.configs.map(config => ({
        label: config.name,
        value: config.id
      }))
    },
    isConfigValid() {
      return (
        this.config.name &&
        this.config.googleClientId &&
        this.config.googleClientSecret &&
        this.config.googleAccessToken &&
        this.config.googleRefreshToken
      );
    },
    redirectUri() {
      return `${window.location.origin}/google-callback.html`;
    }
  },
  
  watch: {
    showCreateModal(newValue) {
      if (!newValue) {
        // Limpar formulário quando o modal for fechado
        this.clearNewEventForm()
      }
    },
    showConfigModal(newValue) {
      if (!newValue) {
        // Limpar formulário quando o modal de configuração for fechado
        this.clearConfigForm()
      }
    },
    '$route'(to, from) {
      // Recarregar configurações quando retornar do callback
      if (from && from.path.includes('/auth/google/callback')) {
        // console.log('Retornando do callback, recarregando configurações...')
        this.loadGoogleCalendarConfig()
      }
    }
  },
  
  mounted() {
    // console.log('Componente GoogleCalendar montado');
    // console.log('Query params:', this.$route.query);
    
    // Inicializar colunas das tabelas com traduções
    this.initializeTableColumns();
    
    // Carregar configuração salva do banco de dados
    this.loadGoogleCalendarConfig()
    
    // Inicializar filtros com valores padrão
    this.filtros.dataInicio = new Date().toISOString().split('T')[0] // Data atual
    this.filtros.dataFim = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 dias à frente
    this.filtros.maxResults = 50
  },
  
  methods: {
    initializeTableColumns() {
      this.columns = [
        {
          name: 'summary',
          label: this.$t('googleCalendar.events.list.table.title'),
          field: 'summary',
          align: 'left',
          sortable: true
        },
        {
          name: 'start',
          label: this.$t('googleCalendar.events.list.table.start'),
          field: 'start',
          align: 'center',
          sortable: true
        },
        {
          name: 'end',
          label: this.$t('googleCalendar.events.list.table.end'),
          field: 'end',
          align: 'center',
          sortable: true
        },
        {
          name: 'location',
          label: this.$t('googleCalendar.events.list.table.location'),
          field: 'location',
          align: 'left'
        },
        {
          name: 'status',
          label: this.$t('googleCalendar.events.list.table.status'),
          field: 'status',
          align: 'center'
        },
        {
          name: 'acoes',
          label: this.$t('googleCalendar.events.list.table.actions'),
          field: 'acoes',
          align: 'center'
        }
      ];

      this.configColumns = [
        {
          name: 'name',
          label: this.$t('googleCalendar.config.management.table.name'),
          field: 'name',
          align: 'left',
          sortable: true
        },
        {
          name: 'status',
          label: this.$t('googleCalendar.config.management.table.status'),
          field: 'isActive',
          align: 'center',
          sortable: true
        },
        {
          name: 'tokens',
          label: this.$t('googleCalendar.config.management.table.tokens'),
          field: 'tokens',
          align: 'center'
        },
        {
          name: 'createdAt',
          label: this.$t('googleCalendar.config.management.table.createdAt'),
          field: 'createdAt',
          align: 'center',
          sortable: true,
          format: (val) => this.formatDate(val)
        },
        {
          name: 'acoes',
          label: this.$t('googleCalendar.config.management.table.actions'),
          field: 'acoes',
          align: 'center'
        }
      ];
    },

    async loadGoogleCalendarConfig() {
      try {
        const response = await ListarConfiguracoesGoogleCalendar()
        if (response.data && response.data.configs && response.data.configs.length > 0) {
          this.configs = response.data.configs // Preencha a lista de configurações
          this.selectedConfigId = response.data.configs[0].id // Selecione a primeira configuração como padrão
          this.config = {
            id: response.data.configs[0].id,
            name: response.data.configs[0].name,
            googleClientId: response.data.configs[0].googleClientId,
            googleClientSecret: response.data.configs[0].googleClientSecret,
            googleAccessToken: response.data.configs[0].googleAccessToken || '',
            googleRefreshToken: response.data.configs[0].googleRefreshToken || ''
          }
        } else {
          this.configs = []
        }
      } catch (error) {
        // console.log('Nenhuma configuração encontrada ou erro ao carregar:', error)
        this.configs = []
      }
    },

    async saveConfig() {
      this.loading = true
      try {
        // Validar dados antes de enviar
        if (!this.config.name || !this.config.googleClientId || !this.config.googleClientSecret) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('googleCalendar.config.errors.fillRequiredFields')
          })
          return
        }
        
        const configData = {
          name: this.config.name,
          googleClientId: this.config.googleClientId,
          googleClientSecret: this.config.googleClientSecret,
          googleAccessToken: this.config.googleAccessToken || '',
          googleRefreshToken: this.config.googleRefreshToken || '',
          isActive: Boolean(this.isConfigValid) // Converter para boolean explicitamente
        }
        
        // console.log('Dados para salvar:', configData)
        // console.log('isConfigValid:', this.isConfigValid, 'type:', typeof this.isConfigValid)
        // console.log('isActive value:', configData.isActive, 'type:', typeof configData.isActive)
        
        if (this.config.id) {
          // Atualizar configuração existente
          await AtualizarConfiguracaoGoogleCalendar(this.config.id, configData)
        } else {
          // Criar nova configuração
          const response = await CriarConfiguracaoGoogleCalendar(configData)
          this.config.id = response.data.id
        }
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('googleCalendar.config.success.saved')
        })
        
        // Recarregar lista de configurações
        await this.loadGoogleCalendarConfig()
        this.closeConfigModal()
      } catch (error) {
        console.error('Erro ao salvar configuração:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('googleCalendar.config.errors.saveError', { 
            error: error.response?.data?.error || error.message 
          })
        })
      } finally {
        this.loading = false
      }
    },
    
    async obterTokensAutomaticamente() {
      if (!this.config.googleClientId || !this.config.googleClientSecret) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.config.errors.fillClientCredentials')
        })
        return
      }
      
      if (!this.config.name) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.config.errors.fillConfigName')
        })
        return
      }
      
      this.obtendoTokens = true
      try {
        // Salvar configuração temporária no banco (sem tokens)
        if (!this.config.id) {
          const response = await CriarConfiguracaoGoogleCalendar({
            name: this.config.name,
            googleClientId: this.config.googleClientId,
            googleClientSecret: this.config.googleClientSecret,
            isActive: false // Inativo até obter os tokens
          })
          this.config.id = response.data.id
        }
        
        // Gerar URL de autorização
        const response = await GerarUrlAutorizacaoGoogle({
          clientId: this.config.googleClientId,
          clientSecret: this.config.googleClientSecret,
          state: this.config.name // Incluir o nome da configuração como estado
        })
        
        this.authUrl = response.data.authUrl
        
        this.$q.notify({
          type: 'info',
          message: this.$t('googleCalendar.config.errors.redirectingAuth')
        })
        
        // Redirecionar para a URL de autorização
        window.location.href = this.authUrl
        
      } catch (error) {
        console.error('Erro ao gerar URL de autorização:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('googleCalendar.config.errors.generateAuthUrlError', { 
            error: error.response?.data?.error || error.message 
          })
        })
      } finally {
        this.obtendoTokens = false
      }
    },
    
    async createEvent() {
      if (!this.selectedConfigId) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.events.create.errors.selectConfig')
        })
        return
      }

      // Buscar a configuração selecionada
      const selectedConfig = this.configs.find(c => c.id === this.selectedConfigId)
      if (!selectedConfig) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.events.create.errors.configNotFound')
        })
        return
      }

      if (!selectedConfig.googleAccessToken) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.events.create.errors.configureCredentials')
        })
        return
      }
      
      this.creatingEvent = true
      try {
        const attendees = this.newEvent.attendees
          ? this.newEvent.attendees.split(',').map(email => email.trim())
          : []
        
        const response = await CriarEventoGoogleCalendar({
          summary: this.newEvent.summary,
          description: this.newEvent.description,
          startDateTime: this.newEvent.startDateTime,
          endDateTime: this.newEvent.endDateTime,
          location: this.newEvent.location,
          attendees,
          googleAccessToken: selectedConfig.googleAccessToken,
          googleRefreshToken: selectedConfig.googleRefreshToken,
          googleClientId: selectedConfig.googleClientId,
          googleClientSecret: selectedConfig.googleClientSecret
        })
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('googleCalendar.events.create.success.created')
        })
        
        // Limpar formulário e fechar modal
        this.clearNewEventForm()
        this.showCreateModal = false
        
        // Recarregar eventos
        await this.loadEvents()
        
      } catch (error) {
        console.error('Erro ao criar evento:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('googleCalendar.events.create.errors.createError', { 
            error: error.response?.data?.error || error.message 
          })
        })
      } finally {
        this.creatingEvent = false
      }
    },

    clearNewEventForm() {
      this.newEvent = {
        summary: '',
        description: '',
        startDateTime: '',
        endDateTime: '',
        location: '',
        attendees: ''
      }
    },
    
    async loadEvents() {
      if (!this.selectedConfigId) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.events.list.errors.selectConfig')
        })
        return
      }

      // Buscar a configuração selecionada
      const selectedConfig = this.configs.find(c => c.id === this.selectedConfigId)
      if (!selectedConfig) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.events.list.errors.configNotFound')
        })
        return
      }

      if (!selectedConfig.googleAccessToken) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.events.list.errors.configureCredentials')
        })
        return
      }
      
      this.loadingEvents = true
      try {
        const requestData = {
          timeMin: this.filtros.dataInicio ? new Date(this.filtros.dataInicio).toISOString() : new Date().toISOString(),
          timeMax: this.filtros.dataFim ? new Date(this.filtros.dataFim).toISOString() : new Date().toISOString(),
          maxResults: this.filtros.maxResults || 50,
          googleAccessToken: selectedConfig.googleAccessToken,
          googleRefreshToken: selectedConfig.googleRefreshToken,
          googleClientId: selectedConfig.googleClientId,
          googleClientSecret: selectedConfig.googleClientSecret
        }
        
        const response = await ListarEventosGoogleCalendar(
          {
            timeMin: this.filtros.dataInicio ? new Date(this.filtros.dataInicio).toISOString() : new Date().toISOString(),
            timeMax: this.filtros.dataFim ? new Date(this.filtros.dataFim).toISOString() : new Date().toISOString(),
            maxResults: this.filtros.maxResults || 50
          },
          requestData
        )
        
        this.events = response.data.events || []
        
      } catch (error) {
        console.error('Erro ao carregar eventos:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('googleCalendar.events.list.errors.loadError', { 
            error: error.response?.data?.error || error.message 
          })
        })
      } finally {
        this.loadingEvents = false
      }
    },
    
    editEvent(event) {
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
      
      this.editingEvent = {
        id: event.id,
        summary: event.summary || '',
        description: event.description || '',
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        location: event.location || '',
        attendees: event.attendees ? event.attendees.join(', ') : ''
      }
      
      this.showEditModal = true
    },
    
    async updateEvent() {
      if (!this.selectedConfigId) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.events.edit.errors.selectConfig')
        })
        return
      }

      // Buscar a configuração selecionada
      const selectedConfig = this.configs.find(c => c.id === this.selectedConfigId)
      if (!selectedConfig) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.events.edit.errors.configNotFound')
        })
        return
      }

      this.updatingEvent = true
      try {
        const attendees = this.editingEvent.attendees
          ? this.editingEvent.attendees.split(',').map(email => email.trim())
          : []
        
        await AtualizarEventoGoogleCalendar(this.editingEvent.id, {
          summary: this.editingEvent.summary,
          description: this.editingEvent.description,
          startDateTime: this.editingEvent.startDateTime,
          endDateTime: this.editingEvent.endDateTime,
          location: this.editingEvent.location,
          attendees,
          googleAccessToken: selectedConfig.googleAccessToken,
          googleRefreshToken: selectedConfig.googleRefreshToken,
          googleClientId: selectedConfig.googleClientId,
          googleClientSecret: selectedConfig.googleClientSecret
        })
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('googleCalendar.events.edit.success.updated')
        })
        
        this.showEditModal = false
        await this.loadEvents()
        
      } catch (error) {
        console.error('Erro ao atualizar evento:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('googleCalendar.events.edit.errors.updateError', { 
            error: error.response?.data?.error || error.message 
          })
        })
      } finally {
        this.updatingEvent = false
      }
    },
    
    deleteEvent(eventId) {
      if (!this.selectedConfigId) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.events.delete.errors.selectConfig')
        })
        return
      }

      // Buscar a configuração selecionada
      const selectedConfig = this.configs.find(c => c.id === this.selectedConfigId)
      if (!selectedConfig) {
        this.$q.notify({
          type: 'warning',
          message: this.$t('googleCalendar.events.delete.errors.configNotFound')
        })
        return
      }

      this.$q.dialog({
        title: this.$t('googleCalendar.events.delete.confirm.title'),
        message: this.$t('googleCalendar.events.delete.confirm.message'),
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await DeletarEventoGoogleCalendar(eventId, {
            googleAccessToken: selectedConfig.googleAccessToken,
            googleRefreshToken: selectedConfig.googleRefreshToken,
            googleClientId: selectedConfig.googleClientId,
            googleClientSecret: selectedConfig.googleClientSecret
          })
          
          this.$q.notify({
            type: 'positive',
            message: this.$t('googleCalendar.events.delete.success.deleted')
          })
          
          await this.loadEvents()
          
        } catch (error) {
          console.error('Erro ao excluir evento:', error)
          this.$q.notify({
            type: 'negative',
            message: this.$t('googleCalendar.events.delete.errors.deleteError', { 
              error: error.response?.data?.error || error.message 
            })
          })
        }
      })
    },
    
    openEvent(url) {
      window.open(url, '_blank')
    },

    formatDateTime(dateString) {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        return date.toLocaleString('pt-br', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        });
      } catch (e) {
        console.error('Erro ao formatar data:', e);
        return dateString; // Retorna a string original em caso de erro
      }
    },

    formatDate(dateString) {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-br');
      } catch (e) {
        console.error('Erro ao formatar data:', e);
        return dateString;
      }
    },

    getStatusColor(status) {
      switch (status) {
        case 'confirmed':
          return 'positive';
        case 'tentative':
          return 'warning';
        case 'cancelled':
          return 'negative';
        default:
          return 'info';
      }
    },

    onConfigChange() {
      // Recarregar eventos com a nova configuração
      if (this.selectedConfigId) {
        this.loadEvents()
      }
    },

    openConfigModal() {
      this.config = {
        id: null,
        name: '',
        googleClientId: '',
        googleClientSecret: '',
        googleAccessToken: '',
        googleRefreshToken: ''
      };
      this.showClientSecret = false;
      this.showAccessToken = false;
      this.showRefreshToken = false;
      this.showConfigModal = true;
    },

    closeConfigModal() {
      this.showConfigModal = false;
    },

    clearConfigForm() {
      this.config = {
        id: null,
        name: '',
        googleClientId: '',
        googleClientSecret: '',
        googleAccessToken: '',
        googleRefreshToken: ''
      };
      this.showClientSecret = false;
      this.showAccessToken = false;
      this.showRefreshToken = false;
    },

    async deleteConfig() {
      this.$q.dialog({
        title: this.$t('googleCalendar.config.confirm.deleteTitle'),
        message: this.$t('googleCalendar.config.confirm.deleteCalendarMessage'),
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await DeletarConfiguracaoGoogleCalendar(this.config.id)
          
          this.$q.notify({
            type: 'positive',
            message: this.$t('googleCalendar.config.success.deleted')
          })
          
          // Recarregar lista de configurações
          await this.loadGoogleCalendarConfig()
          
          // Fechar o modal
          this.closeConfigModal()
          
        } catch (error) {
          console.error('Erro ao excluir configuração:', error)
          this.$q.notify({
            type: 'negative',
            message: this.$t('googleCalendar.config.errors.deleteError', { 
              error: error.response?.data?.error || error.message 
            })
          })
        }
      })
    },

    // Métodos para gerenciamento de configurações
    editConfig(config) {
      this.config = {
        id: config.id,
        name: config.name,
        googleClientId: config.googleClientId,
        googleClientSecret: config.googleClientSecret,
        googleAccessToken: config.googleAccessToken || '',
        googleRefreshToken: config.googleRefreshToken || ''
      };
      this.showClientSecret = false;
      this.showAccessToken = false;
      this.showRefreshToken = false;
      this.showConfigModal = true; // Abrir o modal de configuração
      this.$q.notify({
        type: 'info',
        message: this.$t('googleCalendar.config.success.selectedForEdit')
      });
    },

    async deleteConfigFromTable(config) {
      this.$q.dialog({
        title: this.$t('googleCalendar.config.confirm.deleteTitle'),
        message: this.$t('googleCalendar.config.confirm.deleteMessage'),
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await DeletarConfiguracaoGoogleCalendar(config.id);
          this.$q.notify({
            type: 'positive',
            message: this.$t('googleCalendar.config.success.deleted')
          });
          await this.loadGoogleCalendarConfig();
        } catch (error) {
          console.error('Erro ao excluir configuração:', error);
          this.$q.notify({
            type: 'negative',
            message: this.$t('googleCalendar.config.errors.deleteError', { 
              error: error.response?.data?.error || error.message 
            })
          });
        }
      });
    },

    async copyRedirectUri() {
      try {
        await navigator.clipboard.writeText(this.redirectUri);
        this.$q.notify({
          type: 'positive',
          message: this.$t('googleCalendar.config.modal.redirectUri.copySuccess')
        });
      } catch (error) {
        console.error('Erro ao copiar para área de transferência:', error);
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = this.redirectUri;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          this.$q.notify({
            type: 'positive',
            message: this.$t('googleCalendar.config.modal.redirectUri.copySuccess')
          });
        } catch (fallbackError) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('googleCalendar.config.modal.redirectUri.copyError')
          });
        }
        document.body.removeChild(textArea);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.q-page {
  background-color: #f5f5f5;
}

.my-sticky-dynamic {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .q-table__top {
    padding: 1.2rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: transparent !important;
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

  .q-table__bottom {
    background: transparent !important;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.8rem 1.5rem;
    color: var(--q-primary);
    font-size: 0.9rem;
  }
}

.q-chip {
  font-size: 0.8rem;
  font-weight: 500;
}

/* Modo Escuro */
body.body--dark {
  .q-page {
    background-color: #1a1a1a;
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

    .q-table__bottom {
      border-top-color: rgba(255, 255, 255, 0.1);
    }
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .my-sticky-dynamic {
    margin: 0.5rem;
    border-radius: 12px !important;

    .q-table__top {
      padding: 1rem;
    }

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

    .q-table__bottom {
      padding: 0.6rem 1rem;
      font-size: 0.85rem;
    }
  }
}

/* Estilos do Modal */
.modal-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
}

.modal-header {
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .text-h6 {
    color: var(--q-primary);
    font-weight: 600;
    font-size: 1.2rem;
    margin: 0;
  }
}

.modal-body {
  padding: 1.5rem 2rem 2rem 2rem;
}

.modal-form {
  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    .form-field {
      flex: 1;
      min-width: 0; // Evita overflow em telas pequenas
    }
  }

  .form-actions {
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    .form-field {
      flex: none;
    }
  }

  .q-input {
    .q-field__control {
      background: rgba(255, 255, 255, 0.7);
      border-radius: 8px;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.9);
      }
    }

    &.q-field--focused .q-field__control {
      background: rgba(255, 255, 255, 0.95);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &.q-field--outlined .q-field__control {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  .q-textarea {
    .q-field__control {
      min-height: 80px;
    }
  }

  .full-width {
    width: 100%;
  }
}

/* Modo Escuro para o Modal */
body.body--dark {
  .modal-card {
    background: rgba(30, 30, 30, 0.95);
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

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }

      &.q-field--focused .q-field__control {
        background: rgba(255, 255, 255, 0.15);
      }

      &.q-field--outlined .q-field__control {
        border-color: rgba(255, 255, 255, 0.1);
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

/* Estilos para ícones de visibilidade */
.q-input {
  .q-field__append {
    .q-icon {
      color: var(--q-primary);
      transition: all 0.3s ease;
      padding: 4px;
      border-radius: 4px;

      &:hover {
        background: rgba(var(--q-primary-rgb), 0.1);
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }
}

/* Modo escuro para ícones */
body.body--dark {
  .q-input {
    .q-field__append {
      .q-icon {
        color: var(--q-primary);

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}
</style> 
