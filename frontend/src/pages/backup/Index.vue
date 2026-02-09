<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Cabeçalho -->
      <div class="col-12">
        <div class="text-h4 q-mb-md">
          <q-icon name="backup" class="q-mr-sm" />
          {{ $t('backup.title') }}
        </div>
        <q-separator class="q-mb-lg" />
      </div>

      <!-- Cards de Status -->
      <div class="col-12">
        <div class="row q-col-gutter-md">
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-primary text-white">
              <q-card-section>
                <div class="text-h6">{{ statusData.totalBackups || 0 }}</div>
                <div class="text-subtitle2">{{ $t('backup.totalBackups') }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-positive text-white">
              <q-card-section>
                <div class="text-h6">{{ statusData.totalSize ? formatBytes(statusData.totalSize) : $t('backup.zeroBytes') }}</div>
                <div class="text-subtitle2">{{ $t('backup.totalSize') }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-info text-white">
              <q-card-section>
                <div class="text-h6">{{ statusData.lastBackup ? formatDate(statusData.lastBackup) : $t('backup.na') }}</div>
                <div class="text-subtitle2">{{ $t('backup.lastBackup') }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-3 col-sm-6">
            <q-card class="bg-warning text-white">
              <q-card-section>
                <div class="text-h6">{{ backupResults.length }}</div>
                <div class="text-subtitle2">{{ $t('backup.processedTenants') }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>

      <!-- Ações Principais -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              {{ $t('backup.backupActions') }}
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
                    <strong>{{ $t('backup.backupInfoTitle') }}</strong><br><br>
                    <strong>{{ $t('backup.includedModels') }}:</strong><br>
                    Users, Contacts, Tickets, Messages, Whatsapps, Queues, Settings, AutoReplies, ChatFlows, TodoLists, Opportunities, Pipelines, Stages, Plans, CallLogs, LogTickets, BanLists, WordLists, Kanbans, MessageUpserts, Campaigns, ContactTags, ContactWallets, Tags, TicketNotes, TicketEvaluations, TicketProtocols, TicketShareds, FastReplies, GreetingMessages, FarewellMessages, FarewellPrivateMessages, PrivateMessages, GroupMessages, GroupLinkLists, GhostLists, BirthdayMessagesSents, Notifications, Tutorials, ApiConfigs, ApiMessages, PipelineActions, PipelineActionLogs, ParticipantsLists, Reasons, UsersPushSubscriptions, TenantApis<br><br>
                    <strong>{{ $t('backup.excludedModels') }}:</strong><br>
                    MessageOffLine, CampaignContacts, ContactCustomField, UsersQueues, UserWhatsapp, StepsReply, StepsReplyAction, UserMessagesLog, AutoReplyLogs, ReadPrivateMessageGroups, Baileys, BaileysSessions, LicenseRequestLog, LicenseActivationLog, License, UsersPrivateGroups, BackupConfig, BackupResult, QueueManager
                  </div>
                </q-tooltip>
              </q-btn>
            </div>
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-md-6">
                <q-btn
                  color="primary"
                  icon="backup"
                  :label="$t('backup.backupAllTenants')"
                  class="full-width"
                  :loading="loadingAllBackup"
                  @click="executeAllBackups"
                >
                  <q-tooltip>
                    <div class="text-body2">
                      <strong>{{ $t('backup.backupAllTenantsTooltip') }}</strong><br>
                      {{ $t('backup.backupAllTenantsDescription') }}<br><br>
                      <strong>{{ $t('backup.modelsIncluded') }}:</strong> {{ includedModels.length }} {{ $t('backup.models') }}<br>
                      <strong>{{ $t('backup.modelsExcluded') }}:</strong> {{ excludedModels.length }} {{ $t('backup.models') }}
                    </div>
                  </q-tooltip>
                </q-btn>
              </div>
              <div class="col-md-6">
                <q-btn
                  color="warning"
                  icon="refresh"
                  :label="$t('backup.updateStatus')"
                  class="full-width"
                  :loading="loadingStatus"
                  @click="loadStatus"
                >
                  <q-tooltip>
                    <div class="text-body2">
                      {{ $t('backup.updateStatusDescription') }}
                    </div>
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Informações sobre Modelos de Banco de Dados -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              {{ $t('backup.databaseModelsInfo') }}
              <q-btn
                flat
                round
                color="info"
                icon="expand_more"
                size="sm"
                class="q-ml-sm"
                @click="showModelsInfo = !showModelsInfo"
              >
                <q-tooltip>{{ showModelsInfo ? $t('backup.hideDetails') : $t('backup.showDetails') }}</q-tooltip>
              </q-btn>
            </div>
            
            <div v-if="showModelsInfo" class="q-mt-md">
              <div class="row q-col-gutter-md">
                <!-- Modelos Incluídos -->
                <div class="col-md-6">
                  <q-card class="bg-positive text-white">
                    <q-card-section>
                      <div class="text-h6">{{ $t('backup.includedModelsTitle') }}</div>
                      <div class="text-caption q-mt-sm">
                        {{ $t('backup.includedModelsDescription') }}
                      </div>
                      <div class="q-mt-md">
                        <q-chip
                          v-for="model in includedModels"
                          :key="model"
                          color="white"
                          text-color="positive"
                          :label="model"
                          size="sm"
                          class="q-ma-xs"
                        />
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <!-- Modelos Excluídos -->
                <div class="col-md-6">
                  <q-card class="bg-grey-7 text-white">
                    <q-card-section>
                      <div class="text-h6">{{ $t('backup.excludedModelsTitle') }}</div>
                      <div class="text-caption q-mt-sm">
                        {{ $t('backup.excludedModelsDescription') }}
                      </div>
                      <div class="q-mt-md">
                        <q-chip
                          v-for="model in excludedModels"
                          :key="model"
                          color="white"
                          text-color="grey-7"
                          :label="model"
                          size="sm"
                          class="q-ma-xs"
                        />
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>

              <!-- Informações Adicionais -->
              <div class="q-mt-md">
                <q-banner dense class="bg-info text-white q-mb-md" icon="info">
                  <div class="text-body2">
                    <strong>{{ $t('backup.backupScope') }}</strong><br>
                    {{ $t('backup.backupScopeDescription') }}
                  </div>
                </q-banner>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Backup Individual -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ $t('backup.individualBackup') }}</div>
            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-md-8">
                <q-select
                  v-model="selectedTenant"
                  :options="tenants"
                  option-label="label"
                  option-value="value"
                  :label="$t('backup.selectTenant')"
                  emit-value
                  map-options
                  clearable
                />
              </div>
              <div class="col-md-4">
                <q-btn
                  color="green"
                  icon="backup"
                  :label="$t('backup.makeBackup')"
                  class="full-width"
                  :loading="loadingSingleBackup"
                  :disable="!selectedTenant"
                  @click="executeSingleBackup"
                >
                  <q-tooltip>
                    <div class="text-body2">
                      <strong>{{ $t('backup.singleBackupTooltip') }}</strong><br>
                      {{ $t('backup.singleBackupDescription') }}<br><br>
                      <strong>{{ $t('backup.modelsIncluded') }}:</strong> {{ includedModels.length }} {{ $t('backup.models') }}<br>
                      <strong>{{ $t('backup.modelsExcluded') }}:</strong> {{ excludedModels.length }} {{ $t('backup.models') }}
                    </div>
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Lista de Configurações de Todos os Tenants -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ $t('backup.allTenantsConfig') }}</div>
            <div class="text-caption text-grey-6 q-mb-md">
              {{ $t('backup.viewAllTenantsConfig') }}
            </div>
            
            <div class="row q-col-gutter-md q-mb-md">
              <div class="col-md-6">
                <q-btn
                  color="primary"
                  icon="refresh"
                  :label="$t('backup.updateConfigs')"
                  :loading="loadingAllConfigs"
                  @click="loadAllTenantConfigs"
                />
              </div>
              <div class="col-md-6">
                <q-input
                  v-model="configSearch"
                  :label="$t('backup.searchTenant')"
                  outlined
                  dense
                  clearable
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
            </div>

            <!-- Tabela de Configurações -->
            <q-table
              :rows="filteredAllConfigs"
              :columns="configColumns"
              row-key="id"
              :loading="loadingAllConfigs"
              :pagination="{ rowsPerPage: 10 }"
              :filter="configSearch"
            >
              <template v-slot:body-cell-storageType="props">
                <q-td :props="props">
                  <q-chip
                    :color="getStorageTypeColor(props.value)"
                    text-color="white"
                    :label="props.value.toUpperCase()"
                    size="sm"
                  />
                </q-td>
              </template>

              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-chip
                    :color="props.row.isActive ? 'positive' : 'grey'"
                    text-color="white"
                    :label="props.row.isActive ? $t('backup.active') : $t('backup.inactive')"
                    size="sm"
                  />
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <div class="row q-gutter-xs">
                    <q-btn
                      flat
                      round
                      color="primary"
                      icon="edit"
                      size="sm"
                      @click="editConfigFromList(props.row)"
                    >
                      <q-tooltip>{{ $t('backup.edit') }}</q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      round
                      color="warning"
                      icon="refresh"
                      size="sm"
                      @click="recreateConfigFromList(props.row.tenantId)"
                    >
                      <q-tooltip>{{ $t('backup.recreateDefault') }}</q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      round
                      color="negative"
                      icon="delete"
                      size="sm"
                      @click="deleteConfigFromList(props.row.id)"
                    >
                      <q-tooltip>{{ $t('backup.delete') }}</q-tooltip>
                    </q-btn>
                  </div>
                </q-td>
              </template>

              <template v-slot:no-data>
                <div class="full-width row flex-center q-pa-md">
                  <div class="text-grey-6">
                    {{ $t('backup.noConfigFound') }}
                  </div>
                </div>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <!-- Configurações por Tenant -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ $t('backup.tenantConfig') }}</div>
            
            <!-- Seleção de Tenant para Configuração -->
            <div class="row q-col-gutter-md q-mb-md">
              <div class="col-md-6">
                <q-select
                  v-model="selectedTenantForConfig"
                  :options="tenants"
                  option-label="label"
                  option-value="value"
                  :label="$t('backup.selectTenantForConfig')"
                  emit-value
                  map-options
                  clearable
                  @update:model-value="loadTenantConfigs"
                />
              </div>
              <div class="col-md-6">
                <q-btn
                  color="primary"
                  icon="add"
                  :label="$t('backup.newConfig')"
                  :disable="!selectedTenantForConfig"
                  @click="createNewConfig"
                />
              </div>
              <div class="col-md-6">
                <q-btn
                  color="warning"
                  icon="refresh"
                  :label="$t('backup.recreateDefaultConfig')"
                  :disable="!selectedTenantForConfig"
                  :loading="loadingRecreateConfig"
                  @click="recreateDefaultConfig"
                />
              </div>
            </div>

            <!-- Lista de Configurações do Tenant -->
            <div v-if="selectedTenantForConfig && tenantConfigs.length > 0" class="q-mb-md">
              <div class="text-subtitle2 q-mb-sm">{{ $t('backup.tenantConfigInfo') }}</div>
              <q-list bordered>
                <q-item v-for="config in tenantConfigs" :key="config.id">
                  <q-item-section>
                    <q-item-label>
                      <q-chip
                        color="positive"
                        text-color="white"
                        :label="$t('backup.active')"
                        size="sm"
                      />
                      {{ config.storageType.toUpperCase() }} - {{ config.description || $t('backup.withoutDescription') }}
                    </q-item-label>
                    <q-item-label caption>
                      {{ $t('backup.createdIn') }} {{ formatDate(config.createdAt) }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <div class="row q-gutter-xs">
                      <q-btn
                        flat
                        round
                        color="primary"
                        icon="edit"
                        size="sm"
                        @click="editConfig(config)"
                      >
                        <q-tooltip>{{ $t('backup.edit') }}</q-tooltip>
                      </q-btn>
                      <q-btn
                        flat
                        round
                        color="negative"
                        icon="delete"
                        size="sm"
                        @click="deleteConfig(config.id)"
                      >
                        <q-tooltip>{{ $t('backup.delete') }}</q-tooltip>
                      </q-btn>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Formulário de Configuração -->
            <div v-if="showConfigForm" class="q-mt-md">
              <q-separator class="q-mb-md" />
              <div class="text-subtitle1 q-mb-md">
                {{ editingConfig ? $t('backup.editConfig') : $t('backup.newConfigTitle') }}
              </div>

              <q-tabs
                v-model="configTab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="storage" :label="$t('backup.storage')" />
                <q-tab name="general" :label="$t('backup.general')" />
                <!-- <q-tab name="advanced" :label="$t('backup.advanced')" /> -->
              </q-tabs>

              <q-tab-panels v-model="configTab" animated>
                <!-- Configuração de Armazenamento -->
                <q-tab-panel name="storage">
                  <div class="row q-col-gutter-md">
                    <div class="col-12">
                      <q-select
                        v-model="backupConfig.storageType"
                        :options="storageTypes"
                        :label="$t('backup.storageType')"
                        emit-value
                        map-options
                        @update:model-value="updateStorageConfig"
                      />
                    </div>

                    <!-- Configuração Local -->
                    <div v-if="backupConfig.storageType === 'local'" class="col-12">
                      <q-input
                        v-model="backupConfig.storageConfig.local.path"
                        :label="$t('backup.storagePath')"
                        placeholder="/backups"
                        outlined
                        readonly
                      />
                    </div>

                    <!-- Configuração S3 -->
                    <div v-if="backupConfig.storageType === 's3'" class="col-12">
                      <div class="row q-col-gutter-md">
                        <div class="col-md-6">
                          <q-input
                            v-model="backupConfig.storageConfig.s3.bucket"
                            :label="$t('backup.bucket')"
                            outlined
                          />
                        </div>
                        <div class="col-md-6">
                          <q-input
                            v-model="backupConfig.storageConfig.s3.region"
                            :label="$t('backup.region')"
                            outlined
                          />
                        </div>
                        <div class="col-md-6">
                          <q-input
                            v-model="backupConfig.storageConfig.s3.accessKeyId"
                            :label="$t('backup.accessKeyId')"
                            outlined
                          />
                        </div>
                        <div class="col-md-6">
                          <q-input
                            v-model="backupConfig.storageConfig.s3.secretAccessKey"
                            :label="$t('backup.secretAccessKey')"
                            type="password"
                            outlined
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Configuração FTP -->
                    <div v-if="backupConfig.storageType === 'ftp'" class="col-12">
                      <div class="row q-col-gutter-md">
                        <div class="col-md-6">
                          <q-input
                            v-model="backupConfig.storageConfig.ftp.host"
                            :label="$t('backup.host')"
                            outlined
                          />
                        </div>
                        <div class="col-md-6">
                          <q-input
                            v-model.number="backupConfig.storageConfig.ftp.port"
                            :label="$t('backup.port')"
                            type="number"
                            outlined
                          />
                        </div>
                        <div class="col-md-6">
                          <q-input
                            v-model="backupConfig.storageConfig.ftp.username"
                            :label="$t('backup.username')"
                            outlined
                          />
                        </div>
                        <div class="col-md-6">
                          <q-input
                            v-model="backupConfig.storageConfig.ftp.password"
                            :label="$t('backup.password')"
                            type="password"
                            outlined
                          />
                        </div>
                        <div class="col-12">
                          <q-input
                            v-model="backupConfig.storageConfig.ftp.path"
                            :label="$t('backup.path')"
                            outlined
                          />
                        </div>
                      </div>
                    </div>

                    <!-- Configuração SFTP -->
                    <div v-if="backupConfig.storageType === 'sftp'" class="col-12">
                      <div class="row q-col-gutter-md">
                        <div class="col-md-6">
                          <q-input
                            v-model="backupConfig.storageConfig.sftp.host"
                            :label="$t('backup.host')"
                            outlined
                          />
                        </div>
                        <div class="col-md-6">
                          <q-input
                            v-model.number="backupConfig.storageConfig.sftp.port"
                            :label="$t('backup.port')"
                            type="number"
                            outlined
                          />
                        </div>
                        <div class="col-md-6">
                          <q-input
                            v-model="backupConfig.storageConfig.sftp.username"
                            :label="$t('backup.username')"
                            outlined
                          />
                        </div>
                        <div class="col-md-6">
                          <q-input
                            v-model="backupConfig.storageConfig.sftp.password"
                            :label="$t('backup.password')"
                            type="password"
                            outlined
                          />
                        </div>
                        <div class="col-12">
                          <q-input
                            v-model="backupConfig.storageConfig.sftp.path"
                            :label="$t('backup.path')"
                            outlined
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>

                <!-- Configuração Geral -->
                <q-tab-panel name="general">
                  <div class="row q-col-gutter-md">
                    <div class="col-md-6">
                      <q-input
                        v-model.number="backupConfig.retentionDays"
                        :label="$t('backup.retentionDays')"
                        type="number"
                        outlined
                        min="1"
                      />
                    </div>
                    <div class="col-md-6">
                      <q-toggle
                        v-model="backupConfig.compression"
                        :label="$t('backup.compression')"
                        color="primary"
                      />
                    </div>
                    <div class="col-12">
                      <q-input
                        v-model="backupConfig.description"
                        :label="$t('backup.description')"
                        outlined
                        :placeholder="$t('backup.configDescription')"
                      />
                    </div>
                  </div>
                </q-tab-panel>

                <!-- Configuração Avançada -->
                <!-- <q-tab-panel name="advanced">
                  <div class="row q-col-gutter-md">
                    <div class="col-md-6">
                      <q-toggle
                        v-model="backupConfig.encryption"
                        :label="$t('backup.encryption')"
                        color="primary"
                      />
                    </div>
                    <div v-if="backupConfig.encryption" class="col-md-6">
                      <q-input
                        v-model="backupConfig.encryptionPassword"
                        :label="$t('backup.encryptionPassword')"
                        type="password"
                        outlined
                      />
                    </div>
                  </div>
                </q-tab-panel> -->
              </q-tab-panels>

              <div class="row q-col-gutter-md q-mt-md">
                <div class="col-6">
                  <q-btn
                    color="primary"
                    icon="save"
                    :label="$t('backup.saveConfig')"
                    @click="saveConfiguration"
                    :loading="loadingConfig"
                  />
                </div>
                <div class="col-6">
                  <q-btn
                    color="grey"
                    icon="cancel"
                    :label="$t('backup.cancel')"
                    @click="cancelConfig"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Limpeza de Backups Antigos -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              {{ $t('backup.oldBackupsCleanup') }}
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
                    <strong>{{ $t('backup.cleanupInfoTitle') }}</strong><br><br>
                    {{ $t('backup.cleanupInfoDescription') }}<br><br>
                    <strong>{{ $t('backup.cleanupScope') }}:</strong><br>
                    {{ $t('backup.cleanupScopeDescription') }}
                  </div>
                </q-tooltip>
              </q-btn>
            </div>
            <div class="text-caption text-grey-6 q-mb-md">
              {{ $t('backup.removeOldBackups') }}
            </div>
            
            <div class="row q-col-gutter-md">
              <div class="col-md-6">
                <q-select
                  v-model="selectedTenantForCleanup"
                  :options="tenants"
                  option-label="label"
                  option-value="value"
                  :label="$t('backup.selectTenantForCleanup')"
                  emit-value
                  map-options
                  clearable
                />
                <q-btn
                  color="warning"
                  icon="cleaning_services"
                  :label="$t('backup.cleanTenantBackups')"
                  class="full-width q-mt-md"
                  :loading="loadingCleanup"
                  :disable="!selectedTenantForCleanup"
                  @click="cleanOldBackupsForTenant"
                />
              </div>
              <div class="col-md-6">
                <div class="text-caption text-warning q-mb-sm">
                  {{ $t('backup.cleanupAllWarning') }}
                </div>
                <q-btn
                  color="negative"
                  icon="cleaning_services"
                  :label="$t('backup.cleanAllTenantsBackups')"
                  class="full-width"
                  :loading="loadingCleanupAll"
                  @click="showCleanupAllModal = true"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Resultados dos Backups -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ $t('backup.backupResults') }}</div>
            <q-table
              :rows="backupResults"
              :columns="backupColumns"
              row-key="id"
              :loading="loadingResults"
              :pagination="{ rowsPerPage: 10 }"
            >
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-chip
                    :color="getStatusColor(props.row)"
                    text-color="white"
                    :label="getStatusText(props.row)"
                  />
                </q-td>
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="visibility"
                    @click="viewBackupDetails(props.row)"
                  >
                    <q-tooltip>{{ $t('backup.viewDetails') }}</q-tooltip>
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>

      <!-- Lista de Backups Disponíveis -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ $t('backup.availableBackups') }}</div>
            <q-table
              :rows="availableBackups"
              :columns="backupListColumns"
              row-key="backupPath"
              :loading="loadingBackups"
              :pagination="{ rowsPerPage: 10 }"
            >
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <div class="row q-gutter-xs">
                    <q-btn
                      flat
                      round
                      color="primary"
                      icon="download"
                      :loading="loadingDownloadBackup"
                      :disable="loadingDownloadBackup"
                      @click="downloadBackup(props.row)"
                    >
                      <q-tooltip>{{ $t('backup.downloadBackup') }}</q-tooltip>
                    </q-btn>
                    <q-btn
                      flat
                      round
                      color="negative"
                      icon="delete"
                      :loading="loadingDeleteBackup"
                      @click="deleteBackupFile(props.row)"
                    >
                      <q-tooltip>{{ $t('backup.deleteBackup') }}</q-tooltip>
                    </q-btn>
                  </div>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Modal de Detalhes -->
    <q-dialog v-model="showDetailsModal" @hide="onDialogHide">
      <q-card style="min-width: 700px">
        <q-card-section>
          <div class="text-h6">{{ $t('backup.backupDetails') }}</div>
        </q-card-section>

        <q-card-section>
          <div v-if="selectedBackupDetail">
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <strong>{{ $t('backup.tenantId') }}:</strong> {{ selectedBackupDetail.tenantId }}
              </div>
              <div class="col-6">
                <strong>{{ $t('backup.name') }}:</strong> {{ selectedBackupDetail.tenantName }}
              </div>
              <div class="col-6">
                <strong>{{ $t('backup.database') }}:</strong>
                <q-chip
                  :color="selectedBackupDetail.databaseSuccess ? 'positive' : 'negative'"
                  text-color="white"
                  :label="selectedBackupDetail.databaseSuccess ? $t('backup.success') : $t('backup.failure')"
                />
              </div>
              <div class="col-6">
                <strong>{{ $t('backup.files') }}:</strong>
                <q-chip
                  :color="selectedBackupDetail.filesSuccess ? 'positive' : 'negative'"
                  text-color="white"
                  :label="selectedBackupDetail.filesSuccess ? $t('backup.success') : $t('backup.failure')"
                />
              </div>
              <div class="col-6">
                <strong>{{ $t('backup.dbSizeLabel') }}</strong> {{ formatBytes(selectedBackupDetail.databaseSize || 0) }}
              </div>
              <div class="col-6">
                <strong>{{ $t('backup.filesSizeLabel') }}</strong> {{ formatBytes(selectedBackupDetail.filesSize || 0) }}
              </div>
              <div class="col-6">
                <strong>{{ $t('backup.totalSizeLabel') }}</strong> {{ formatBytes(selectedBackupDetail.totalSize || 0) }}
              </div>
              <div class="col-6">
                <strong>{{ $t('backup.dateLabel') }}</strong> {{ formatDate(selectedBackupDetail.createdAt) }}
              </div>
            </div>

            <div v-if="selectedBackupDetail.databaseError || selectedBackupDetail.filesError" class="q-mt-md">
              <div class="text-subtitle2 text-negative">{{ $t('backup.errors') }}</div>
              <div v-if="selectedBackupDetail.databaseError" class="q-mb-sm">
                <strong>{{ $t('backup.database') }}:</strong> {{ selectedBackupDetail.databaseError }}
              </div>
              <div v-if="selectedBackupDetail.filesError" class="q-mb-sm">
                <strong>{{ $t('backup.files') }}:</strong> {{ selectedBackupDetail.filesError }}
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('backup.close')" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Restauração -->
    <q-dialog v-model="showRestoreModal" @hide="onDialogHide">
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">{{ $t('backup.restoreBackup') }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-body2 q-mb-md">
            <strong>{{ $t('backup.tenant') }}:</strong> {{ restoreData.tenantId }}<br>
            <strong>{{ $t('backup.backupName') }}:</strong> {{ restoreData.backupName }}<br>
            <strong>{{ $t('backup.size') }}:</strong> {{ formatBytes(restoreData.size) }}
          </div>
          <div class="text-caption text-warning">
            {{ $t('backup.restoreWarning') }}
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('backup.cancel')" color="grey" v-close-popup />
          <q-btn
            :label="$t('backup.confirmRestore')"
            color="warning"
            :loading="loadingRestore"
            @click="confirmRestore"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Confirmação de Limpeza Geral -->
    <q-dialog v-model="showCleanupAllModal" @hide="onDialogHide">
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">{{ $t('backup.confirmGeneralCleanupTitle') }}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-body2 q-mb-md">
            <strong>{{ $t('backup.action') }}</strong> {{ $t('backup.cleanupAction') }}<br>
            <strong>{{ $t('backup.criteria') }}</strong> {{ $t('backup.cleanupCriteria') }}
          </div>
          <div class="text-caption text-negative">
            {{ $t('backup.cleanupWarning') }}
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('backup.cancel')" color="grey" v-close-popup />
          <q-btn
            :label="$t('backup.confirmGeneralCleanup')"
            color="negative"
            :loading="loadingCleanupAll"
            @click="confirmCleanupAll"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { 
  backupAllTenants, 
  backupTenant, 
  listBackups, 
  getBackupStatus, 
  restoreTenant, 
  configureBackupForTenant,
  getBackupConfigs,
  getAllBackupConfigs,
  getActiveBackupConfig,
  deleteBackupConfig,
  cleanOldBackupsForTenant,
  cleanOldBackupsForAllTenants,
  recreateDefaultConfig,
  downloadBackup,
  deleteBackup,
  listBackupResults,
  listBackupResultsByTenant,
  getBackupStatistics,
  createDefaultBackupConfig,
  getStorageConfigTemplate,
  formatBytes, 
  formatDate, 
  validateBackupConfig 
} from '../../service/backup';
import { ListarTenants } from 'src/service/tenants.js'

export default {
  name: 'BackupManager',
  data() {
    return {
      // Estados de carregamento
      loadingAllBackup: false,
      loadingSingleBackup: false,
      loadingStatus: false,
      loadingResults: false,
      loadingBackups: false,
      loadingConfig: false,
      loadingRestore: false,
      loadingCleanup: false,
      loadingCleanupAll: false,
      loadingRecreateConfig: false,
      loadingAllConfigs: false, // Novo estado de carregamento para configurações de todos os tenants
      loadingDeleteBackup: false, // Estado de carregamento para deletar backup
      loadingDownloadBackup: false, // Estado de carregamento para download de backup

      // Dados
      statusData: {},
      backupResults: [],
      availableBackups: [],
      tenants: [],
      selectedTenant: null,
      selectedTenantForConfig: null,
      tenantConfigs: [],
      selectedTenantForCleanup: null,
      allTenantConfigs: [], // Armazena todas as configurações de todos os tenants
      configSearch: '', // Para busca de configurações

      // Configuração
      configTab: 'storage',
      showConfigForm: false,
      editingConfig: null,
      backupConfig: createDefaultBackupConfig(),

      // Modais
      showDetailsModal: false,
      showRestoreModal: false,
      selectedBackupDetail: null,
      restoreData: {},
      showCleanupAllModal: false,

      // Opções
      storageTypes: [
        { label: 'Local', value: 'local', icon: 'folder' },
        // { label: 'Amazon S3', value: 's3', icon: 'cloud' },
        // { label: 'FTP', value: 'ftp', icon: 'cloud_upload' },
        // { label: 'SFTP', value: 'sftp', icon: 'cloud_upload' }
      ],

      // Colunas das tabelas
      backupColumns: [
        { name: 'tenantId', label: this.$t('backup.id'), field: 'tenantId', align: 'left' },
        { name: 'tenantName', label: this.$t('backup.tenant'), field: 'tenantName', align: 'left' },
        { name: 'status', label: this.$t('backup.status'), field: 'status', align: 'center' },
        { name: 'databaseSize', label: this.$t('backup.dbSize'), field: row => this.formatBytes(row.databaseSize || 0), align: 'right' },
        { name: 'filesSize', label: this.$t('backup.filesSize'), field: row => this.formatBytes(row.filesSize || 0), align: 'right' },
        { name: 'totalSize', label: this.$t('backup.totalSize'), field: row => this.formatBytes(row.totalSize || 0), align: 'right' },
        { name: 'duration', label: this.$t('backup.duration'), field: row => row.duration ? `${row.duration}s` : this.$t('backup.na'), align: 'center' },
        { name: 'backupType', label: this.$t('backup.type'), field: row => row.backupType?.toUpperCase() || this.$t('backup.na'), align: 'center' },
        { name: 'createdAt', label: this.$t('backup.date'), field: row => this.formatDate(row.createdAt), align: 'center' },
        { name: 'actions', label: this.$t('backup.actions'), field: 'actions', align: 'center' }
      ],

      backupListColumns: [
        { name: 'tenantId', label: this.$t('backup.tenantId'), field: 'tenantId', align: 'left' },
        { name: 'backupName', label: this.$t('backup.backupName'), field: 'backupName', align: 'left' },
        { name: 'size', label: this.$t('backup.size'), field: row => this.formatBytes(row.size), align: 'right' },
        { name: 'createdAt', label: this.$t('backup.createdAt'), field: row => this.formatDate(row.createdAt), align: 'center' },
        { name: 'actions', label: this.$t('backup.actions'), field: 'actions', align: 'center' }
      ],

      // Colunas para a tabela de configurações de todos os tenants
      configColumns: [
        { name: 'tenantId', label: this.$t('backup.id'), field: 'tenantId', align: 'left' },
        { name: 'tenantName', label: this.$t('backup.tenant'), field: row => row.tenant?.name || `${this.$t('backup.tenantPrefix')}${row.tenantId}`, align: 'left' },
        { name: 'storageType', label: this.$t('backup.storageType'), field: 'storageType', align: 'left' },
        { name: 'retentionDays', label: this.$t('backup.retentionDays'), field: 'retentionDays', align: 'center' },
        { name: 'compression', label: this.$t('backup.compression'), field: row => row.compression ? this.$t('backup.yes') : this.$t('backup.no'), align: 'center' },
        // { name: 'encryption', label: this.$t('backup.encryption'), field: row => row.encryption ? this.$t('backup.yes') : this.$t('backup.no'), align: 'center' },
        { name: 'description', label: this.$t('backup.description'), field: 'description', align: 'left' },
        { name: 'status', label: this.$t('backup.status'), field: 'isActive', align: 'center' },
        { name: 'createdAt', label: this.$t('backup.createdAt'), field: row => this.formatDate(row.createdAt), align: 'center' },
        { name: 'actions', label: this.$t('backup.actions'), field: 'actions', align: 'center' }
      ],

      // Dados para a seção de modelos de banco de dados
      showModelsInfo: false,
      includedModels: [
        'Users', 'Contacts', 'Tickets', 'Messages', 'Whatsapps', 'Queues', 'Settings', 'AutoReplies', 'ChatFlows', 'TodoLists', 'Opportunities', 'Pipelines', 'Stages', 'Plans', 'CallLogs', 'LogTickets', 'BanLists', 'WordLists', 'Kanbans', 'MessageUpserts', 'Campaigns', 'ContactTags', 'ContactWallets', 'Tags', 'TicketNotes', 'TicketEvaluations', 'TicketProtocols', 'TicketShareds', 'FastReplies', 'GreetingMessages', 'FarewellMessages', 'FarewellPrivateMessages', 'PrivateMessages', 'GroupMessages', 'GroupLinkLists', 'GhostLists', 'BirthdayMessagesSents', 'Notifications', 'Tutorials', 'ApiConfigs', 'ApiMessages', 'PipelineActions', 'PipelineActionLogs', 'ParticipantsLists', 'Reasons', 'UsersPushSubscriptions', 'TenantApis'
      ],
      excludedModels: [
        'MessageOffLine', 'CampaignContacts', 'ContactCustomField', 'UsersQueues', 'UserWhatsapp', 'StepsReply', 'StepsReplyAction', 'UserMessagesLog', 'AutoReplyLogs', 'ReadPrivateMessageGroups', 'Baileys', 'BaileysSessions', 'LicenseRequestLog', 'LicenseActivationLog', 'License', 'UsersPrivateGroups', 'BackupConfig', 'BackupResult', 'QueueManager'
      ]
    };
  },

  computed: {
    filteredAllConfigs() {
      if (!Array.isArray(this.allTenantConfigs)) {
        return [];
      }
      
      if (!this.configSearch) {
        return this.allTenantConfigs;
      }
      
      const search = this.configSearch.toLowerCase();
      return this.allTenantConfigs.filter(config => {
        const tenantName = config.tenant?.name || `Tenant ${config.tenantId}`;
        return (
          tenantName.toLowerCase().includes(search) ||
          config.storageType.toLowerCase().includes(search) ||
          (config.description && config.description.toLowerCase().includes(search))
        );
      });
    }
  },

  mounted() {
    this.loadInitialData();
  },

  methods: {
    onDialogHide () {
      // Evita warning de aria-hidden com foco retido em backdrop durante a transição
      this.$nextTick(() => {
        try {
          if (document && document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur()
          }
        } catch (_) { /* ignore */ }
      })
    },
    async loadInitialData() {
      try {
        // Executar sequencialmente para evitar conflitos
        await this.loadStatus();
        await this.loadTenants();
        await this.loadBackups();
        await this.loadAllTenantConfigs();
        await this.loadBackupResults();
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorLoadingInitialData'),
          caption: error.message
        });
      }
    },

    async loadStatus() {
      this.loadingStatus = true;
      try {
        const response = await getBackupStatus();
        this.statusData = response.data.data || {};
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorLoadingStatus'),
          caption: error.message
        });
        this.statusData = {};
      } finally {
        this.loadingStatus = false;
      }
    },

    async loadTenants() {
      try {
        const response = await ListarTenants();
        
        // Verificar a estrutura correta dos dados
        const tenantsData = response.data || [];
        
        this.tenants = Array.isArray(tenantsData) ? tenantsData.map(tenant => ({
          label: `${tenant.name} (ID: ${tenant.id})`,
          value: tenant.id,
          name: tenant.name,
          id: tenant.id
        })) : [];
      } catch (error) {
        console.error('Erro ao carregar tenants:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorLoadingTenants'),
          caption: error.message
        });
        this.tenants = []; // Garantir que seja array mesmo em caso de erro
      }
    },

    async loadBackups() {
      this.loadingBackups = true;
      try {
        const response = await listBackups();
        this.availableBackups = Array.isArray(response.data.data?.backups) ? response.data.data.backups : [];
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorLoadingBackups'),
          caption: error.message
        });
        this.availableBackups = []; // Garantir que seja array mesmo em caso de erro
      } finally {
        this.loadingBackups = false;
      }
    },

    async loadBackupResults() {
      this.loadingResults = true;
      try {
        const response = await listBackupResults(100, 0);
        this.backupResults = Array.isArray(response.data.data) ? response.data.data : [];
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorLoadingResults'),
          caption: error.message
        });
        this.backupResults = [];
      } finally {
        this.loadingResults = false;
      }
    },

    async loadAllTenantConfigs() {
      this.loadingAllConfigs = true;
      try {
        const response = await getAllBackupConfigs();
        this.allTenantConfigs = Array.isArray(response.data.data) ? response.data.data : [];
        this.configSearch = ''; // Limpar busca ao atualizar
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorLoadingAllConfigs'),
          caption: error.message
        });
        this.allTenantConfigs = []; // Garantir que seja array mesmo em caso de erro
      } finally {
        this.loadingAllConfigs = false;
      }
    },

    getStorageTypeColor(type) {
      switch (type) {
        case 'local': return 'info';
        case 's3': return 'purple';
        case 'ftp': return 'orange';
        case 'sftp': return 'deep-orange';
        default: return 'grey';
      }
    },

    editConfigFromList(config) {
      this.editingConfig = config;
      this.backupConfig = {
        storageType: config.storageType,
        storageConfig: getStorageConfigTemplate(config.storageType),
        compression: config.compression,
        // encryption: config.encryption,
        // encryptionPassword: config.encryptionPassword || '',
        retentionDays: config.retentionDays,
        description: config.description || ''
      };

      // Preencher dados específicos do tipo de armazenamento
      switch (config.storageType) {
        case 'local':
          this.backupConfig.storageConfig.local.path = config.localPath;
          break;
        case 's3':
          this.backupConfig.storageConfig.s3 = {
            bucket: config.s3Bucket,
            region: config.s3Region,
            accessKeyId: config.s3AccessKeyId,
            secretAccessKey: config.s3SecretAccessKey
          };
          break;
        case 'ftp':
          this.backupConfig.storageConfig.ftp = {
            host: config.ftpHost,
            port: config.ftpPort,
            username: config.ftpUsername,
            password: config.ftpPassword,
            path: config.ftpPath
          };
          break;
        case 'sftp':
          this.backupConfig.storageConfig.sftp = {
            host: config.sftpHost,
            port: config.sftpPort,
            username: config.sftpUsername,
            password: config.sftpPassword,
            privateKey: config.sftpPrivateKey,
            path: config.sftpPath
          };
          break;
      }

      this.showConfigForm = true;
    },

    async recreateConfigFromList(tenantId) {
      this.loadingRecreateConfig = true;
      try {
        await recreateDefaultConfig(tenantId);
        this.$q.notify({
          type: 'positive',
          message: this.$t('backup.defaultConfigRecreated')
        });
        await this.loadAllTenantConfigs(); // Atualizar a lista de configurações
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorRecreatingDefaultConfig'),
          caption: error.message
        });
      } finally {
        this.loadingRecreateConfig = false;
      }
    },

    async deleteConfigFromList(configId) {
      try {
        await this.$q.dialog({
          title: this.$t('backup.confirmDeleteConfigTitle'),
          message: this.$t('backup.confirmDeleteConfigMessage'),
          cancel: true,
          persistent: true
        });

        await deleteBackupConfig(configId);
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('backup.configDeleted')
        });

        await this.loadAllTenantConfigs();
      } catch (error) {
        if (error !== 'cancel') {
          this.$q.notify({
            type: 'negative',
            message: this.$t('backup.errorDeletingConfig'),
            caption: error.message
          });
        }
      }
    },

    async loadTenantConfigs() {
      if (!this.selectedTenantForConfig) {
        this.tenantConfigs = [];
        return;
      }

      try {
        const response = await getBackupConfigs(this.selectedTenantForConfig);
        this.tenantConfigs = Array.isArray(response.data.data) ? response.data.data : [];
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorLoadingTenantConfigs'),
          caption: error.message
        });
        this.tenantConfigs = []; // Garantir que seja array mesmo em caso de erro
      }
    },

    createNewConfig() {
      this.editingConfig = null;
      this.backupConfig = createDefaultBackupConfig();
      this.showConfigForm = true;
    },

    editConfig(config) {
      this.editingConfig = config;
      this.backupConfig = {
        storageType: config.storageType,
        storageConfig: getStorageConfigTemplate(config.storageType),
        compression: config.compression,
        // encryption: config.encryption,
        // encryptionPassword: config.encryptionPassword || '',
        retentionDays: config.retentionDays,
        description: config.description || ''
      };

      // Preencher dados específicos do tipo de armazenamento
      switch (config.storageType) {
        case 'local':
          this.backupConfig.storageConfig.local.path = config.localPath;
          break;
        case 's3':
          this.backupConfig.storageConfig.s3 = {
            bucket: config.s3Bucket,
            region: config.s3Region,
            accessKeyId: config.s3AccessKeyId,
            secretAccessKey: config.s3SecretAccessKey
          };
          break;
        case 'ftp':
          this.backupConfig.storageConfig.ftp = {
            host: config.ftpHost,
            port: config.ftpPort,
            username: config.ftpUsername,
            password: config.ftpPassword,
            path: config.ftpPath
          };
          break;
        case 'sftp':
          this.backupConfig.storageConfig.sftp = {
            host: config.sftpHost,
            port: config.sftpPort,
            username: config.sftpUsername,
            password: config.sftpPassword,
            privateKey: config.sftpPrivateKey,
            path: config.sftpPath
          };
          break;
      }

      this.showConfigForm = true;
    },

    updateStorageConfig() {
      this.backupConfig.storageConfig = getStorageConfigTemplate(this.backupConfig.storageType);
    },

    async saveConfiguration() {
      if (!this.selectedTenantForConfig) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.selectTenantToConfigure')
        });
        return;
      }

      const validation = validateBackupConfig(this.backupConfig);
      if (!validation.valid) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.invalidConfig'),
          caption: validation.errors.join(', ')
        });
        return;
      }

      this.loadingConfig = true;
      try {
        await configureBackupForTenant(this.selectedTenantForConfig, this.backupConfig);
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('backup.configSaved')
        });

        this.showConfigForm = false;
        await this.loadTenantConfigs();
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorSavingConfig'),
          caption: error.message
        });
      } finally {
        this.loadingConfig = false;
      }
    },

    cancelConfig() {
      this.showConfigForm = false;
      this.editingConfig = null;
      this.backupConfig = createDefaultBackupConfig();
    },

    async deleteConfig(configId) {
      try {
        await this.$q.dialog({
          title: this.$t('backup.confirmDeleteConfigTitle'),
          message: this.$t('backup.confirmDeleteConfigMessage'),
          cancel: true,
          persistent: true
        });

        await deleteBackupConfig(configId);
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('backup.configDeleted')
        });

        await this.loadTenantConfigs();
      } catch (error) {
        if (error !== 'cancel') {
          this.$q.notify({
            type: 'negative',
            message: this.$t('backup.errorDeletingConfig'),
            caption: error.message
          });
        }
      }
    },

    async executeAllBackups() {
      this.loadingAllBackup = true;
      try {
        const response = await backupAllTenants();
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('backup.allBackupsExecuted'),
          caption: `${response.data.data?.successfulBackups || 0}/${response.data.data?.totalTenants || 0} ${this.$t('backup.tenantsWithSuccess')}`
        });

        // Recarrega os resultados de backup do banco
        await this.loadBackupResults();
        await this.loadStatus();
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorExecutingAllBackups'),
          caption: error.message
        });
      } finally {
        await this.loadBackups();
        this.loadingAllBackup = false;
      }
    },

    async executeSingleBackup() {
      if (!this.selectedTenant) return;

      this.loadingSingleBackup = true;
      try {
        const response = await backupTenant(this.selectedTenant);
        
        this.$q.notify({
          type: response.success ? 'positive' : 'warning',
          message: this.$t('backup.singleBackupExecuted'),
          caption: response.data.tenantName
        });

        // Recarrega os resultados de backup do banco
        await this.loadBackupResults();
        await this.loadStatus();
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorExecutingSingleBackup'),
          caption: error.message
        });
      } finally {
        await this.loadBackups();
        this.loadingSingleBackup = false;
      }
    },

    viewBackupDetails(backup) {
      this.selectedBackupDetail = backup;
      this.showDetailsModal = true;
    },

    restoreBackup(backup) {
      this.restoreData = backup;
      this.showRestoreModal = true;
    },

    async confirmRestore() {
      this.loadingRestore = true;
      try {
        await restoreTenant(this.restoreData.tenantId, this.restoreData.backupPath);
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('backup.restoreCompleted')
        });

        this.showRestoreModal = false;
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorRestoringBackup'),
          caption: error.message
        });
      } finally {
        this.loadingRestore = false;
      }
    },

    async cleanOldBackupsForTenant() {
      this.loadingCleanup = true;
      try {
        if (!this.selectedTenantForCleanup) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('backup.selectTenantToCleanBackups')
          });
          return;
        }
        await cleanOldBackupsForTenant(this.selectedTenantForCleanup);
        this.$q.notify({
          type: 'positive',
          message: this.$t('backup.oldBackupsCleaned')
        });
        await this.loadBackups(); // Atualiza a lista de backups disponíveis
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorCleaningOldBackups'),
          caption: error.message
        });
      } finally {
        this.loadingCleanup = false;
      }
    },

    async confirmCleanupAll() {
      this.loadingCleanupAll = true;
      try {
        await cleanOldBackupsForAllTenants();
        this.$q.notify({
          type: 'positive',
          message: this.$t('backup.allOldBackupsCleaned')
        });
        await this.loadBackups(); // Atualiza a lista de backups disponíveis
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorCleaningAllBackups'),
          caption: error.message
        });
      } finally {
        this.loadingCleanupAll = false;
        this.showCleanupAllModal = false;
      }
    },

    async recreateDefaultConfig() {
      this.loadingRecreateConfig = true;
      try {
        if (!this.selectedTenantForConfig) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('backup.selectTenantToRecreateDefaultConfig')
          });
          return;
        }
        await recreateDefaultConfig(this.selectedTenantForConfig);
        this.$q.notify({
          type: 'positive',
          message: this.$t('backup.defaultConfigRecreated')
        });
        await this.loadTenantConfigs();
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorRecreatingDefaultConfig'),
          caption: error.message
        });
      } finally {
        this.loadingRecreateConfig = false;
      }
    },

    getStatusColor(backup) {
      if (backup.databaseSuccess && backup.filesSuccess) return 'positive';
      if (backup.databaseSuccess || backup.filesSuccess) return 'warning';
      return 'negative';
    },

    getStatusText(backup) {
      if (backup.databaseSuccess && backup.filesSuccess) return this.$t('backup.complete');
      if (backup.databaseSuccess || backup.filesSuccess) return this.$t('backup.partial');
      return this.$t('backup.failure');
    },

    formatBytes(bytes) {
      return formatBytes(bytes);
    },

    formatDate(dateString) {
      return formatDate(dateString);
    },

    async downloadBackup(backup) {
      this.loadingDownloadBackup = true;
      try {
        const response = await downloadBackup(backup.tenantId, backup.backupPath);
        
        // Criar blob e fazer download
        const blob = new Blob([response.data], { type: 'application/zip' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Usar apenas o nome original do arquivo, sem duplicar
        link.download = backup.backupName;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        this.$q.notify({
          type: 'positive',
          message: this.$t('backup.backupDownloaded')
        });
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('backup.errorDownloadingBackup'),
          caption: error.message
        });
      } finally {
        this.loadingDownloadBackup = false;
      }
    },

    async deleteBackupFile(backup) {
      try {
        this.$q.dialog({
          title: this.$t('backup.confirmDeleteBackupTitle'),
          message: this.$t('backup.confirmDeleteBackupMessage'),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('backup.delete'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        await deleteBackup(backup.tenantId, backup.backupPath);

        this.$q.notify({
          type: 'positive',
          message: this.$t('backup.backupDeleted')
        });

        await this.loadBackups();
      })
      } catch (error) {
        // Se o usuário cancelou, não faz nada
        if (error !== 'cancel') {
          this.$q.notify({
            type: 'negative',
            message: this.$t('backup.errorDeletingBackup'),
            caption: error.message
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.q-card {
  border-radius: 8px;
}

.q-table {
  border-radius: 8px;
}
</style> 
