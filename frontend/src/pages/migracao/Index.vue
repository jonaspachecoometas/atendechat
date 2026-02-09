<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Cabeçalho -->
      <div class="col-12">
        <div class="text-h4 q-mb-md">
          <q-icon name="swap_horiz" class="q-mr-sm" />
          {{ $t('migration.title') }}
        </div>
        <q-separator class="q-mb-lg" />
      </div>

      <!-- Cards de Status -->
      <div class="col-12">
        <div class="row q-col-gutter-md">
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-primary text-white">
              <q-card-section>
                <div class="text-h6">{{ migrations.length }}</div>
                <div class="text-subtitle2">{{ $t('migration.totalMigrations') }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-positive text-white">
              <q-card-section>
                <div class="text-h6">{{ completedMigrations }}</div>
                <div class="text-subtitle2">{{ $t('migration.completed') }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-info text-white">
              <q-card-section>
                <div class="text-h6">{{ inProgressMigrations }}</div>
                <div class="text-subtitle2">{{ $t('migration.inProgress') }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-negative text-white">
              <q-card-section>
                <div class="text-h6">{{ failedMigrations }}</div>
                <div class="text-subtitle2">{{ $t('migration.failed') }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Formulário de Migração -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="row items-center q-mb-md">
              <div class="text-h6">
                {{ $t('migration.newMigration') }}
                <q-btn
                  flat
                  round
                  color="info"
                  icon="info"
                  size="sm"
                  class="q-ml-sm"
                >
                  <q-tooltip>
                    <div class="text-body2">
                      <strong>{{ $t('migration.migrationInfoTitle') }}</strong><br><br>
                      {{ $t('migration.migrationInfoDescription') }}<br><br>
                      <strong>{{ $t('migration.requirements') }}:</strong><br>
                      - Versões do package.json devem ser idênticas<br>
                      - Acesso SSH à máquina remota<br>
                      - Acesso ao banco de dados remoto<br>
                      - Permissões de leitura/escrita nas pastas
                    </div>
                  </q-tooltip>
                </q-btn>
              </div>
              <q-space />
              <div class="row q-gutter-xs">
                <q-btn
                  v-if="hasSavedConfig"
                  flat
                  round
                  icon="save"
                  color="positive"
                  @click="loadSavedConfig"
                >
                  <q-tooltip>{{ $t('migration.loadSavedConfig') }}</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  icon="bookmark"
                  color="primary"
                  @click="saveConfig"
                >
                  <q-tooltip>{{ $t('migration.saveConfig') }}</q-tooltip>
                </q-btn>
                <q-btn
                  v-if="hasSavedConfig"
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="clearSavedConfig"
                >
                  <q-tooltip>{{ $t('migration.clearSavedConfig') }}</q-tooltip>
                </q-btn>
              </div>
            </div>

            <q-banner
              v-if="hasSavedConfig"
              class="bg-info text-white q-mb-md"
              rounded
            >
              <template v-slot:avatar>
                <q-icon name="info" />
              </template>
              {{ $t('migration.savedConfigAvailable') }}
            </q-banner>

            <q-form @submit="startMigration" class="q-mt-md">
              <div class="row q-col-gutter-md">
                <!-- Configuração do Banco Remoto -->
                <div class="col-12">
                  <q-card flat bordered class="q-pa-md">
                    <div class="text-subtitle2 q-mb-md">{{ $t('migration.remoteDatabase') }}</div>
                    <div class="row q-col-gutter-md">
                      <div class="col-md-6">
                        <q-input
                          v-model="migrationForm.remoteDbConfig.host"
                          :label="$t('migration.dbHost')"
                          outlined
                          required
                          hint="IP ou hostname da máquina remota"
                        />
                      </div>
                      <div class="col-md-3">
                        <q-input
                          v-model.number="migrationForm.remoteDbConfig.port"
                          :label="$t('migration.dbPort')"
                          type="number"
                          outlined
                          :value="5432"
                        />
                      </div>
                      <div class="col-md-3">
                        <q-input
                          v-model="migrationForm.remoteDbConfig.dialect"
                          :label="$t('migration.dbDialect')"
                          outlined
                          :value="'postgres'"
                        />
                      </div>
                      <div class="col-md-4">
                        <q-input
                          v-model="migrationForm.remoteDbConfig.database"
                          :label="$t('migration.dbName')"
                          outlined
                          required
                        />
                      </div>
                      <div class="col-md-4">
                        <q-input
                          v-model="migrationForm.remoteDbConfig.username"
                          :label="$t('migration.dbUser')"
                          outlined
                          required
                        />
                      </div>
                      <div class="col-md-4">
                        <q-input
                          v-model="migrationForm.remoteDbConfig.password"
                          :label="$t('migration.dbPassword')"
                          type="password"
                          outlined
                          required
                        />
                      </div>
                    </div>
                  </q-card>
                </div>

                <!-- Configuração SSH -->
                <div class="col-12">
                  <q-card flat bordered class="q-pa-md">
                    <div class="text-subtitle2 q-mb-md">{{ $t('migration.sshConfig') }}</div>
                    <div class="row q-col-gutter-md">
                      <div class="col-md-4">
                        <q-input
                          v-model="migrationForm.sshConfig.host"
                          :label="$t('migration.sshHost')"
                          outlined
                          required
                          hint="Mesmo IP do banco de dados"
                        />
                      </div>
                      <div class="col-md-2">
                        <q-input
                          v-model.number="migrationForm.sshConfig.port"
                          :label="$t('migration.sshPort')"
                          type="number"
                          outlined
                          :value="22"
                        />
                      </div>
                      <div class="col-md-3">
                        <q-input
                          v-model="migrationForm.sshConfig.username"
                          :label="$t('migration.sshUser')"
                          outlined
                          required
                        />
                      </div>
                      <div class="col-md-3">
                        <q-input
                          v-model="migrationForm.sshConfig.password"
                          :label="$t('migration.sshPassword')"
                          type="password"
                          outlined
                          :hint="$t('migration.sshPasswordOrKey')"
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="migrationForm.sshConfig.zproBasePath"
                          :label="$t('migration.zproBasePath')"
                          outlined
                          hint="Ex: /home/deployzdg/zpro2/zpro.io ou /home/deployzdg/zpro.io"
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="migrationForm.sshConfig.publicFolderPath"
                          :label="$t('migration.publicFolderPath')"
                          outlined
                          required
                          hint="Caminho completo da pasta public (ex: /home/deployzdg/zpro2/zpro.io/backend/public)"
                        />
                      </div>
                      <!-- <div class="col-12">
                        <q-input
                          v-model="migrationForm.sshConfig.privateKey"
                          :label="$t('migration.sshPrivateKey')"
                          type="textarea"
                          outlined
                          rows="4"
                          hint="Chave privada SSH (alternativa à senha)"
                        />
                      </div> -->
                    </div>
                  </q-card>
                </div>

                <!-- Configuração da Migração -->
                <div class="col-12">
                  <q-card flat bordered class="q-pa-md">
                    <div class="text-subtitle2 q-mb-md">{{ $t('migration.migrationConfig') }}</div>
                    <div class="row q-col-gutter-md">
                      <div class="col-md-12">
                        <q-input
                          v-model.number="migrationForm.sourceTenantId"
                          :label="$t('migration.sourceTenantId')"
                          type="number"
                          outlined
                          required
                          hint="ID da tenant na máquina remota"
                        />
                      </div>
                      <!-- <div class="col-md-6">
                        <q-input
                          v-model.number="migrationForm.targetTenantId"
                          :label="$t('migration.targetTenantId')"
                          type="number"
                          outlined
                          disabled
                          hint="Sempre será criada uma nova tenant automaticamente"
                        />
                      </div> -->
                    </div>
                  </q-card>
                </div>

                <!-- Botões de Iniciar -->
                <div class="col-12">
                  <div class="text-subtitle2 q-mb-md">{{ $t('migration.chooseMigrationType') }}</div>
                  <div class="row q-col-gutter-md">
                    <div class="col-12">
                      <q-btn
                        @click="startMigration"
                        color="primary"
                        icon="play_arrow"
                        :label="$t('migration.fullMigration')"
                        class="full-width"
                        size="md"
                        :loading="loadingMigration"
                      />
                    </div>
                    <!-- <div class="col-md-6">
                      <q-btn
                        @click="startDatabaseMigration"
                        color="warning"
                        icon="storage"
                        :label="$t('migration.databaseOnly')"
                        class="full-width"
                        size="md"
                        :loading="loadingDatabase"
                      />
                    </div>
                    <div class="col-md-6">
                      <q-btn
                        @click="startFilesMigration"
                        color="positive"
                        icon="folder"
                        :label="$t('migration.filesOnly')"
                        class="full-width"
                        size="md"
                        :loading="loadingFiles"
                      />
                    </div> -->
                  </div>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>

      <!-- Lista de Migrações -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ $t('migration.migrationsList') }}</div>
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-md-4">
                <q-btn
                  color="info"
                  icon="refresh"
                  :label="$t('migration.refresh')"
                  @click="loadMigrations"
                  :loading="loadingMigrations"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <q-table
              :rows="migrations"
              :columns="migrationColumns"
              row-key="id"
              :loading="loadingMigrations"
              :pagination="{ rowsPerPage: 10 }"
            >
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-chip
                    :color="getStatusColor(props.row.status)"
                    text-color="white"
                    :label="getStatusText(props.row.status)"
                  />
                </q-td>
              </template>

              <template v-slot:body-cell-progress="props">
                <q-td :props="props">
                  <div class="row items-center q-gutter-sm">
                    <div class="col">
                      <q-linear-progress
                        :value="calculateProgress(props.row)"
                        :color="getProgressColor(props.row.status)"
                        class="q-mt-sm"
                      />
                    </div>
                    <div class="text-caption">
                      {{ Math.round(calculateProgress(props.row) * 100) }}%
                    </div>
                  </div>
                  <div v-if="props.row.currentModel" class="text-caption text-grey-6 q-mt-xs">
                    {{ $t('migration.currentModel') }}: {{ props.row.currentModel }}
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-files="props">
                <q-td :props="props">
                  <div class="text-caption">
                    {{ props.row.filesDownloaded || 0 }} / {{ props.row.totalFiles || 0 }}
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <div class="row q-gutter-xs">
                    <q-btn
                      flat
                      round
                      color="primary"
                      icon="visibility"
                      @click="viewMigrationDetails(props.row)"
                    >
                      <q-tooltip>{{ $t('migration.viewDetails') }}</q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="props.row.status === 'failed' || props.row.status === 'paused'"
                      flat
                      round
                      color="positive"
                      icon="play_arrow"
                      @click="resumeMigrationAction(props.row.id)"
                      :loading="loadingResume"
                    >
                      <q-tooltip>{{ $t('migration.resume') }}</q-tooltip>
                    </q-btn>
                  </div>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Modal de Detalhes da Migração -->
    <q-dialog v-model="showDetailsModal" maximized>
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ $t('migration.migrationDetails') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section v-if="selectedMigration">
          <div class="row q-col-gutter-md">
            <div class="col-md-6">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm">{{ $t('migration.basicInfo') }}</div>
                  <div class="q-mb-xs">
                    <strong>{{ $t('migration.sourceTenantId') }}:</strong> {{ selectedMigration.sourceTenantId }}
                  </div>
                  <div class="q-mb-xs">
                    <strong>{{ $t('migration.targetTenantId') }}:</strong> {{ selectedMigration.targetTenantId }}
                  </div>
                  <div class="q-mb-xs">
                    <strong>{{ $t('migration.status') }}:</strong>
                    <q-chip
                      :color="getStatusColor(selectedMigration.status)"
                      text-color="white"
                      :label="getStatusText(selectedMigration.status)"
                      size="sm"
                    />
                  </div>
                  <div class="q-mb-xs">
                    <strong>{{ $t('migration.createdAt') }}:</strong> {{ formatDate(selectedMigration.createdAt) }}
                  </div>
                  <div class="q-mb-xs">
                    <strong>{{ $t('migration.updatedAt') }}:</strong> {{ formatDate(selectedMigration.updatedAt) }}
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-md-6">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm">{{ $t('migration.progressInfo') }}</div>
                  <div class="q-mb-xs">
                    <strong>{{ $t('migration.currentStep') }}:</strong> {{ selectedMigration.currentStep }} / {{ selectedMigration.totalSteps }}
                  </div>
                  <div class="q-mb-xs">
                    <strong>{{ $t('migration.progress') }}:</strong>
                    <q-linear-progress
                      :value="calculateProgress(selectedMigration)"
                      :color="getProgressColor(selectedMigration.status)"
                      class="q-mt-xs"
                    />
                    <div class="text-caption text-right">{{ Math.round(calculateProgress(selectedMigration) * 100) }}%</div>
                  </div>
                  <div class="q-mb-xs" v-if="selectedMigration.currentModel">
                    <strong>{{ $t('migration.currentModel') }}:</strong> {{ selectedMigration.currentModel }}
                  </div>
                  <div class="q-mb-xs">
                    <strong>{{ $t('migration.files') }}:</strong> {{ selectedMigration.filesDownloaded || 0 }} / {{ selectedMigration.totalFiles || 0 }}
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12" v-if="selectedMigration.completedModels && selectedMigration.completedModels.length > 0">
              <q-card flat bordered>
                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm">{{ $t('migration.completedModels') }}</div>
                  <div class="q-gutter-xs">
                    <q-chip
                      v-for="model in selectedMigration.completedModels"
                      :key="model"
                      color="positive"
                      text-color="white"
                      :label="model"
                      size="sm"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12" v-if="selectedMigration.errorMessage">
              <q-card flat bordered class="bg-negative text-white">
                <q-card-section>
                  <div class="text-subtitle2 q-mb-sm">{{ $t('migration.error') }}</div>
                  <div>{{ selectedMigration.errorMessage }}</div>
                </q-card-section>
              </q-card>
            </div>

            <!-- Seção de Logs -->
            <div class="col-12">
              <q-card flat bordered>
                <q-card-section>
                  <div class="row items-center q-mb-md">
                    <div class="text-subtitle2">{{ $t('migration.migrationLogs') }}</div>
                    <q-space />
                    <q-btn
                      flat
                      round
                      icon="refresh"
                      @click="loadMigrationLogs(selectedMigration.id)"
                      :loading="loadingLogs"
                    >
                      <q-tooltip>{{ $t('migration.refreshLogs') }}</q-tooltip>
                    </q-btn>
                  </div>
                  
                  <div v-if="migrationLogs.length === 0" class="text-grey-6 text-center q-pa-md">
                    {{ $t('migration.noLogsAvailable') }}
                  </div>
                  
                  <div v-else class="q-gutter-sm">
                    <q-card
                      v-for="log in migrationLogs"
                      :key="log.name"
                      flat
                      bordered
                      class="q-pa-sm"
                    >
                      <div class="row items-center">
                        <div class="col">
                          <div class="text-weight-medium">{{ log.name }}</div>
                          <div class="text-caption text-grey-6">
                            {{ formatBytes(log.size) }} • 
                            {{ formatDate(log.modifiedAt) }}
                          </div>
                        </div>
                        <div class="col-auto">
                          <q-btn
                            flat
                            round
                            icon="download"
                            color="primary"
                            @click="downloadLog(selectedMigration.id, log.type)"
                          >
                            <q-tooltip>{{ $t('migration.downloadLog') }}</q-tooltip>
                          </q-btn>
                        </div>
                      </div>
                    </q-card>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <!-- Botões de retomar migrações específicas quando falhou -->
          <div v-if="selectedMigration && selectedMigration.status === 'failed'" class="row q-gutter-sm">
            <q-btn
              v-if="shouldShowRetryDatabase(selectedMigration)"
              color="warning"
              icon="storage"
              :label="$t('migration.retryDatabase')"
              @click="retryDatabaseMigration(selectedMigration)"
              :loading="loadingRetryDatabase"
            />
            <q-btn
              v-if="shouldShowRetryFiles(selectedMigration)"
              color="positive"
              icon="folder"
              :label="$t('migration.retryFiles')"
              @click="retryFilesMigration(selectedMigration)"
              :loading="loadingRetryFiles"
            />
          </div>
          
          <!-- Botão de retomar migração completa -->
          <q-btn
            v-if="selectedMigration && (selectedMigration.status === 'failed' || selectedMigration.status === 'paused') && !shouldShowRetryDatabase(selectedMigration) && !shouldShowRetryFiles(selectedMigration)"
            color="positive"
            icon="play_arrow"
            :label="$t('migration.resume')"
            @click="resumeMigrationAction(selectedMigration.id)"
            :loading="loadingResume"
          />
          <q-btn flat :label="$t('migration.close')" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import {
  migrateTenant,
  listMigrations,
  getMigrationProgress,
  resumeMigration,
  formatBytes,
  formatDate,
  getStatusColor,
  getStatusText,
  migrateDatabase,
  migrateFiles,
  listMigrationLogs,
  downloadMigrationLog
} from '../../service/migration.js'
import socket from 'src/utils/socket.js'

export default {
  name: 'MigrationManager',
  data() {
    return {
      migrations: [],
      loadingMigrations: false,
      loadingMigration: false,
      loadingDatabase: false,
      loadingFiles: false,
      loadingResume: false,
      loadingRetryDatabase: false,
      loadingRetryFiles: false,
      showDetailsModal: false,
      selectedMigration: null,
      migrationLogs: [],
      loadingLogs: false,
      hasSavedConfig: false,
      migrationForm: {
        remoteDbConfig: {
          host: '',
          port: 5432,
          database: '',
          username: '',
          password: '',
          dialect: 'postgres'
        },
        sshConfig: {
          host: '',
          port: 22,
          username: '',
          password: '',
          privateKey: '',
          publicFolderPath: '',
          zproBasePath: ''
        },
        sourceTenantId: null,
        targetTenantId: null
      },
      migrationColumns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'left'
        },
        {
          name: 'sourceTenantId',
          label: 'Tenant Origem',
          field: 'sourceTenantId',
          align: 'left'
        },
        {
          name: 'targetTenantId',
          label: 'Tenant Destino',
          field: 'targetTenantId',
          align: 'left'
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'center'
        },
        {
          name: 'progress',
          label: 'Progresso',
          field: 'progress',
          align: 'left'
        },
        {
          name: 'files',
          label: 'Arquivos',
          field: 'files',
          align: 'center'
        },
        {
          name: 'createdAt',
          label: 'Criado em',
          field: 'createdAt',
          format: (val) => formatDate(val),
          align: 'left'
        },
        {
          name: 'actions',
          label: 'Ações',
          field: 'actions',
          align: 'center'
        }
      ],
      progressInterval: null
    }
  },
  computed: {
    completedMigrations() {
      return this.migrations.filter(m => m.status === 'completed').length
    },
    inProgressMigrations() {
      return this.migrations.filter(m => m.status === 'in_progress').length
    },
    failedMigrations() {
      return this.migrations.filter(m => m.status === 'failed').length
    }
  },
  mounted() {
    this.loadMigrations()
    this.setupProgressPolling()
    this.setupSocketListeners()
    this.checkSavedConfig()
    // Auto-carregar apenas se o formulário estiver vazio
    if (this.isFormEmpty()) {
      this.loadSavedConfig()
    }
  },
  beforeUnmount() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval)
    }
  },
  methods: {
    async loadMigrations() {
      this.loadingMigrations = true
      try {
        const response = await listMigrations()
        this.migrations = response.data || []
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao carregar migrações',
          caption: error.message
        })
      } finally {
        this.loadingMigrations = false
      }
    },
    async startMigration() {
      this.loadingMigration = true
      try {
        // Sempre criar nova tenant (não enviar targetTenantId)
        const formData = {
          ...this.migrationForm,
          targetTenantId: undefined // Não enviar para sempre criar nova
        }
        const response = await migrateTenant(formData)
        
        this.$q.notify({
          type: 'positive',
          message: response.data.message || 'Migração iniciada com sucesso',
          caption: `ID da migração: ${response.data.migrationId}`
        })

        // Limpar formulário
        this.migrationForm = {
          remoteDbConfig: {
            host: '',
            port: 5432,
            database: '',
            username: '',
            password: '',
            dialect: 'postgres'
          },
          sshConfig: {
            host: '',
            port: 22,
            username: '',
            password: '',
            privateKey: '',
            publicFolderPath: '',
            zproBasePath: ''
          },
          sourceTenantId: null,
          targetTenantId: null
        }

        await this.loadMigrations()
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao iniciar migração',
          caption: error.response?.data?.message || error.message
        })
      } finally {
        this.loadingMigration = false
      }
    },
    async viewMigrationDetails(migration) {
      try {
        const response = await getMigrationProgress(migration.id)
        this.selectedMigration = response.data
        this.showDetailsModal = true
        // Carregar logs automaticamente
        await this.loadMigrationLogs(migration.id)
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao carregar detalhes da migração',
          caption: error.message
        })
      }
    },
    async resumeMigrationAction(migrationId) {
      this.loadingResume = true
      try {
        await resumeMigration(migrationId)
        this.$q.notify({
          type: 'positive',
          message: 'Migração retomada com sucesso'
        })
        await this.loadMigrations()
        if (this.selectedMigration && this.selectedMigration.id === migrationId) {
          await this.viewMigrationDetails({ id: migrationId })
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao retomar migração',
          caption: error.response?.data?.message || error.message
        })
      } finally {
        this.loadingResume = false
      }
    },
    async startDatabaseMigration() {
      this.loadingDatabase = true
      try {
        // Sempre criar nova tenant (não enviar targetTenantId)
        const response = await migrateDatabase({
          remoteDbConfig: this.migrationForm.remoteDbConfig,
          sourceTenantId: this.migrationForm.sourceTenantId
          // Não enviar targetTenantId para sempre criar nova
        })
        
        this.$q.notify({
          type: 'positive',
          message: response.data.message || this.$t('migration.databaseMigrationStarted'),
          caption: `ID da migração: ${response.data.migrationId}`
        })

        await this.loadMigrations()
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('migration.databaseMigrationError'),
          caption: error.response?.data?.message || error.message
        })
      } finally {
        this.loadingDatabase = false
      }
    },
    async startFilesMigration() {
      this.loadingFiles = true
      try {
        // Preparar dados - não enviar targetTenantId se estiver vazio (backend vai buscar automaticamente)
        const data = {
          sshConfig: this.migrationForm.sshConfig,
          sourceTenantId: this.migrationForm.sourceTenantId
        }
        
        // Só enviar targetTenantId se tiver valor
        if (this.migrationForm.targetTenantId) {
          data.targetTenantId = this.migrationForm.targetTenantId
        }
        
        const response = await migrateFiles(data)
        
        this.$q.notify({
          type: 'positive',
          message: response.data.message || this.$t('migration.filesMigrationStarted'),
          caption: `ID da migração: ${response.data.migrationId}`
        })

        await this.loadMigrations()
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('migration.filesMigrationError'),
          caption: error.response?.data?.message || error.message
        })
      } finally {
        this.loadingFiles = false
      }
    },
    async loadMigrationLogs(migrationId) {
      this.loadingLogs = true
      try {
        const response = await listMigrationLogs(migrationId)
        this.migrationLogs = response.data.logs || []
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('migration.logsLoadError'),
          caption: error.message
        })
      } finally {
        this.loadingLogs = false
      }
    },
    async downloadLog(migrationId, logType) {
      try {
        const response = await downloadMigrationLog(migrationId, logType)
        const blob = new Blob([response.data], { type: 'text/plain' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `migration_${migrationId}_${logType}.log`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('migration.logDownloadSuccess')
        })
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('migration.logDownloadError'),
          caption: error.message
        })
      }
    },
    getStatusColor(status) {
      return getStatusColor(status)
    },
    getStatusText(status) {
      return getStatusText(status)
    },
    getProgressColor(status) {
      if (status === 'completed') return 'positive'
      if (status === 'failed') return 'negative'
      if (status === 'in_progress') return 'info'
      return 'grey'
    },
    formatBytes,
    formatDate,
    calculateProgress(migration) {
      if (!migration) return 0
      if (migration.status === 'completed') return 1
      if (migration.status === 'failed') return 0
      // Se o backend já calculou o progresso, usar esse valor
      if (migration.progress !== undefined && migration.progress !== null) {
        return migration.progress / 100
      }
      // Caso contrário, calcular baseado em currentStep/totalSteps
      if (migration.totalSteps && migration.totalSteps > 0) {
        return Math.min(migration.currentStep / migration.totalSteps, 1)
      }
      return 0
    },
    setupProgressPolling() {
      // Atualizar progresso a cada 3 segundos para migrações em andamento
      this.progressInterval = setInterval(() => {
        const inProgress = this.migrations.filter(m => m.status === 'in_progress')
        if (inProgress.length > 0) {
          this.loadMigrations()
        }
      }, 3000)
    },
    setupSocketListeners() {
      // Escutar eventos de progresso via WebSocket
      if (socket && socket.connected) {
        socket.on('migration:progress', (data) => {
          const migrationIndex = this.migrations.findIndex(m => m.id === data.migrationId)
          if (migrationIndex !== -1) {
            // Atualizar a migração específica
            this.$set(this.migrations, migrationIndex, {
              ...this.migrations[migrationIndex],
              ...data
            })
            // Se o modal de detalhes estiver aberto para esta migração, atualizar também
            if (this.selectedMigration && this.selectedMigration.id === data.migrationId) {
              this.selectedMigration = { ...this.selectedMigration, ...data }
            }
          } else {
            // Se não encontrou, recarregar a lista
            this.loadMigrations()
          }
        })
      }
    },
    saveConfig() {
      try {
        const configToSave = {
          remoteDbConfig: this.migrationForm.remoteDbConfig,
          sshConfig: this.migrationForm.sshConfig,
          sourceTenantId: this.migrationForm.sourceTenantId,
          targetTenantId: this.migrationForm.targetTenantId,
          savedAt: new Date().toISOString()
        }
        localStorage.setItem('migration_config', JSON.stringify(configToSave))
        this.hasSavedConfig = true
        this.$q.notify({
          type: 'positive',
          message: this.$t('migration.configSavedSuccess'),
          caption: this.$t('migration.configSavedMessage')
        })
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('migration.configSaveError'),
          caption: error.message
        })
      }
    },
    loadSavedConfig() {
      try {
        const savedConfig = localStorage.getItem('migration_config')
        if (savedConfig) {
          const config = JSON.parse(savedConfig)
          this.migrationForm.remoteDbConfig = { ...this.migrationForm.remoteDbConfig, ...config.remoteDbConfig }
          this.migrationForm.sshConfig = { ...this.migrationForm.sshConfig, ...config.sshConfig }
          this.migrationForm.sourceTenantId = config.sourceTenantId
          this.migrationForm.targetTenantId = config.targetTenantId
          
          this.$q.notify({
            type: 'positive',
            message: this.$t('migration.configLoadedSuccess'),
            caption: config.savedAt ? `${this.$t('migration.configSavedAt')} ${formatDate(config.savedAt)}` : ''
          })
        } else {
          this.$q.notify({
            type: 'info',
            message: this.$t('migration.noSavedConfig')
          })
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('migration.configLoadError'),
          caption: error.message
        })
      }
    },
    clearSavedConfig() {
      this.$q.dialog({
        title: this.$t('migration.confirm'),
        message: this.$t('migration.confirmClearConfig'),
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          localStorage.removeItem('migration_config')
          this.hasSavedConfig = false
          this.$q.notify({
            type: 'positive',
            message: this.$t('migration.configClearedSuccess')
          })
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('migration.configClearError'),
            caption: error.message
          })
        }
      })
    },
    checkSavedConfig() {
      try {
        const savedConfig = localStorage.getItem('migration_config')
        this.hasSavedConfig = !!savedConfig
      } catch (error) {
        this.hasSavedConfig = false
      }
    },
    isFormEmpty() {
      return (
        !this.migrationForm.remoteDbConfig.host &&
        !this.migrationForm.sshConfig.host &&
        !this.migrationForm.sourceTenantId
      )
    },
    shouldShowRetryDatabase(migration) {
      // Mostrar se falhou e não completou modelos ou se não tem targetTenantId (não criou tenant)
      if (migration.status !== 'failed') return false
      
      // Se não tem targetTenantId, significa que falhou antes de criar a tenant
      if (!migration.targetTenantId || migration.targetTenantId === 0) return true
      
      // Se tem poucos ou nenhum modelo completado, provavelmente falhou no banco
      const completedModels = migration.completedModels || []
      if (Array.isArray(completedModels) && completedModels.length < 5) return true
      
      // Se errorMessage indica erro de banco
      if (migration.errorMessage) {
        const dbErrors = ['database', 'banco', 'tenant', 'sequelize', 'connection', 'query']
        const errorLower = migration.errorMessage.toLowerCase()
        if (dbErrors.some(err => errorLower.includes(err))) return true
      }
      
      return false
    },
    shouldShowRetryFiles(migration) {
      // Mostrar se falhou e tem targetTenantId mas não completou arquivos
      if (migration.status !== 'failed') return false
      
      // Precisa ter targetTenantId (tenant criada)
      if (!migration.targetTenantId || migration.targetTenantId === 0) return false
      
      // Se não completou nenhum dos arquivos, mostrar opção
      if (!migration.publicFilesCompleted && !migration.sessionsFilesCompleted && !migration.wwebjsAuthFilesCompleted) {
        return true
      }
      
      // Se errorMessage indica erro de arquivos/SSH
      if (migration.errorMessage) {
        const fileErrors = ['ssh', 'sftp', 'download', 'arquivo', 'file', 'connection reset', 'econnreset']
        const errorLower = migration.errorMessage.toLowerCase()
        if (fileErrors.some(err => errorLower.includes(err))) return true
      }
      
      return false
    },
    async retryDatabaseMigration(migration) {
      this.loadingRetryDatabase = true
      try {
        // Extrair configs da migração
        const remoteDbConfig = migration.remoteDbConfig ? JSON.parse(migration.remoteDbConfig) : null
        
        if (!remoteDbConfig || !remoteDbConfig.host) {
          throw new Error('Configuração de banco de dados não encontrada na migração')
        }
        
        // Se a migração anterior tinha targetTenantId, usar ele; senão criar nova
        const data = {
          remoteDbConfig: remoteDbConfig,
          sourceTenantId: migration.sourceTenantId
        }
        
        // Só enviar targetTenantId se existir (para reutilizar tenant existente)
        if (migration.targetTenantId && migration.targetTenantId > 0) {
          data.targetTenantId = migration.targetTenantId
        }
        
        const response = await migrateDatabase(data)
        
        this.$q.notify({
          type: 'positive',
          message: response.data.message || this.$t('migration.databaseMigrationStarted'),
          caption: `ID da migração: ${response.data.migrationId}`
        })
        
        await this.loadMigrations()
        this.showDetailsModal = false
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('migration.databaseMigrationError'),
          caption: error.response?.data?.message || error.message
        })
      } finally {
        this.loadingRetryDatabase = false
      }
    },
    async retryFilesMigration(migration) {
      this.loadingRetryFiles = true
      try {
        // Extrair configs da migração
        const sshConfig = migration.sshConfig ? JSON.parse(migration.sshConfig) : null
        
        if (!sshConfig || !sshConfig.host) {
          throw new Error('Configuração SSH não encontrada na migração')
        }
        
        if (!migration.targetTenantId) {
          throw new Error('Tenant de destino não encontrada. Execute a migração de banco primeiro.')
        }
        
        const data = {
          sshConfig: sshConfig,
          sourceTenantId: migration.sourceTenantId,
          targetTenantId: migration.targetTenantId
        }
        
        const response = await migrateFiles(data)
        
        this.$q.notify({
          type: 'positive',
          message: response.data.message || this.$t('migration.filesMigrationStarted'),
          caption: `ID da migração: ${response.data.migrationId}`
        })
        
        await this.loadMigrations()
        this.showDetailsModal = false
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('migration.filesMigrationError'),
          caption: error.response?.data?.message || error.message
        })
      } finally {
        this.loadingRetryFiles = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  border-radius: 8px;
}

.q-table {
  border-radius: 8px;
}
</style>

