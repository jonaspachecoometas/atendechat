<template>
  <div class="pipeline-actions">
    <div class="header">
      <h2>{{ $t('funilacao.acao') }}</h2>
      <div class="row q-gutter-sm">
        <q-btn
          color="primary"
          icon="add"
          :label="$t('funilacao.novo')"
          @click="openModal()"
        />
        <q-btn
          color="primary"
          icon="account_tree"
          :label="$t('funilacao.novoFluxo')"
          @click="openFlowModal()"
        />
        <q-btn
          color="info"
          icon="history"
          :label="$t('funilacao.verLogs')"
          @click="showLogsDialog = true"
        />
      </div>
    </div>

    <!-- Filtros -->
    <div class="filters q-mb-md">
      <q-input
        v-model="filters.searchTerm"
        :label="$t('funilacao.pesquisar')"
        dense
        outlined
        class="q-mr-md"
        style="width: 300px"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-select
        v-model="filters.pipelineId"
        :options="pipelines"
        :label="$t('funilacao.pipeline')"
        dense
        outlined
        class="q-mr-md"
        style="width: 200px"
        emit-value
        map-options
        option-value="id"
        option-label="name"
        clearable
      />

      <q-select
        v-model="filters.stageId"
        :options="stages"
        :label="$t('funilacao.etapa')"
        dense
        outlined
        class="q-mr-md"
        style="width: 200px"
        emit-value
        map-options
        option-value="id"
        option-label="name"
        clearable
      />

      <q-select
        v-model="filters.actionType"
        :options="actionTypes"
        :label="$t('funilacao.tipoAcao')"
        dense
        outlined
        class="q-mr-md"
        style="width: 200px"
        emit-value
        map-options
        clearable
      />

      <q-toggle
        v-model="filters.active"
        :label="$t('funilacao.ativo')"
        color="primary"
      />
    </div>

    <!-- Lista de Ações -->
    <q-table
      :rows="actions"
      :columns="columns"
      row-key="id"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
    >
      <template v-slot:body-cell-active="props">
        <q-td :props="props">
          <q-toggle
            v-model="props.row.active"
            @update:model-value="toggleActive(props.row)"
            color="primary"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn-group flat>
            <q-btn
              flat
              round
              color="primary"
              icon="edit"
              @click="openModal(props.row)"
            >
              <q-tooltip>{{ $t('funilacao.editar') }}</q-tooltip>
            </q-btn>
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="confirmDelete(props.row)"
            >
              <q-tooltip>{{ $t('funilacao.excluir') }}</q-tooltip>
            </q-btn>
          </q-btn-group>
        </q-td>
      </template>
    </q-table>

    <!-- Modal de Criação/Edição -->
    <q-dialog v-model="showModal" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">
            {{ editingAction ? $t('funilacao.editar') : $t('funilacao.novo') }}
            {{ $t('funilacao.acao') }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveAction" class="q-gutter-md">
            <q-input
              v-model="form.name"
              :label="$t('funilacao.nome')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
            />

            <q-select
              v-model="form.pipelineId"
              :options="pipelines"
              :label="$t('funilacao.pipeline')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
              emit-value
              map-options
              option-value="id"
              option-label="name"
              @update:model-value="onPipelineChange"
            />

            <q-select
              v-model="form.stageId"
              :options="filteredStages"
              :label="$t('funilacao.etapa')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
              emit-value
              map-options
              option-value="id"
              option-label="name"
            />

            <q-select
              v-model="form.actionType"
              :options="actionTypes"
              :label="$t('funilacao.tipoAcao')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
              emit-value
              map-options
            />

            <!-- Campos específicos para cada tipo de ação -->
            <template v-if="form.actionType === 'message'">
              <q-input
                v-model="form.message"
                :label="$t('funilacao.mensagem')"
                type="textarea"
                :rules="[val => !!val || $t('funilacao.required')]"
                outlined
                dense
                autogrow
              />
              <q-select
                v-model="form.whatsappId"
                :options="whatsappOptions"
                :label="$t('funilacao.whatsapp')"
                :rules="[val => !!val || $t('funilacao.required')]"
                outlined
                dense
                emit-value
                map-options
              />
            </template>

            <template v-if="form.actionType === 'stage_change'">
              <q-select
                v-model="form.targetStageId"
                :options="filteredStages"
                :label="$t('funilacao.etapaDestino')"
                :rules="[val => !!val || $t('funilacao.required')]"
                outlined
                dense
                emit-value
                map-options
                option-value="id"
                option-label="name"
              />
            </template>

            <template v-if="form.actionType === 'status_change'">
              <q-select
                v-model="form.targetStatus"
                :options="statusOptions"
                :label="$t('funilacao.statusDestino')"
                :rules="[val => !!val || $t('funilacao.required')]"
                outlined
                dense
                emit-value
                map-options
              />
            </template>

            <template v-if="form.actionType === 'add_tag'">
              <q-select
                v-model="form.tagId"
                :options="tags"
                :label="$t('funilacao.tag')"
                :rules="[val => !!val || $t('funilacao.required')]"
                outlined
                dense
                emit-value
                map-options
                option-value="id"
                option-label="tag"
                use-input
                input-debounce="700"
              >
                <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                  <q-item v-bind="itemProps" v-on="itemEvents || {}">
                    <q-item-section>
                      <q-item-label v-html="opt.tag"></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-checkbox :value="selected" @update:model-value="toggleOption(opt)" />
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected-item="{ opt }">
                  <q-chip
                    dense
                    square
                    color="white"
                    text-color="primary"
                    class="q-ma-xs row col-12 text-body1"
                  >
                    <q-icon :style="{ color: opt.color }" name="mdi-pound-box-outline" size="28px" class="q-mr-sm" />
                    {{ opt.tag }}
                  </q-chip>
                </template>
              </q-select>
            </template>

            <template v-if="form.actionType === 'add_wallet'">
              <q-select
                v-model="form.walletId"
                :options="usuarios"
                :label="$t('funilacao.carteira')"
                :rules="[val => !!val || $t('funilacao.required')]"
                outlined
                dense
                emit-value
                map-options
                option-value="id"
                option-label="name"
                use-input
                input-debounce="700"
              >
                <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                  <q-item v-bind="itemProps" v-on="itemEvents || {}">
                    <q-item-section>
                      <q-item-label v-html="opt.name"></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-checkbox :value="selected" @update:model-value="toggleOption(opt)" />
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected-item="{ opt }">
                  <q-chip
                    dense
                    square
                    color="white"
                    text-color="primary"
                    class="q-ma-xs row col-12 text-body1"
                  >
                    {{ opt.name }}
                  </q-chip>
                </template>
              </q-select>
            </template>

            <q-input
              v-model.number="form.daysToTrigger"
              type="number"
              :label="$t('funilacao.diasParaDisparar')"
              outlined
              dense
            />

            <q-input
              v-model="form.description"
              :label="$t('funilacao.descricao')"
              type="textarea"
              outlined
              dense
            />

            <div class="row justify-end q-mt-md">
              <q-btn
                :label="$t('funilacao.cancelar')"
                color="negative"
                flat
                v-close-popup
                class="q-mr-sm"
              />
              <q-btn
                :label="$t('funilacao.salvar')"
                color="primary"
                type="submit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal de Logs -->
    <PipelineActionLogsDialog
      v-model="showLogsDialog"
    />

    <!-- Modal de Fluxo -->
    <q-dialog v-model="showFlowModal" persistent>
      <q-card style="min-width: 600px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('funilacao.editorFluxo') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveFlow" class="q-gutter-md">
            <!-- Informações básicas do fluxo -->
            <q-input
              v-model="flowForm.name"
              :label="$t('funilacao.nome')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
            />

            <q-select
              v-model="flowForm.pipelineId"
              :options="pipelines"
              :label="$t('funilacao.pipeline')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
              emit-value
              map-options
              option-value="id"
              option-label="name"
              @update:model-value="onFlowPipelineChange"
            />

            <q-select
              v-model="flowForm.stageId"
              :options="filteredFlowStages"
              :label="$t('funilacao.etapa')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
              emit-value
              map-options
              option-value="id"
              option-label="name"
            />

            <q-input
              v-model="flowForm.description"
              :label="$t('funilacao.descricao')"
              type="textarea"
              outlined
              dense
            />

            <!-- Lista de ações do fluxo -->
            <div class="text-subtitle2 q-mt-md">{{ $t('funilacao.acoesDoFluxo') }}</div>
            
            <div class="flow-actions-list">
              <div v-for="(action, index) in flowForm.actions" :key="action.id" class="flow-action-item">
                <q-card class="q-mb-sm">
                  <q-card-section>
                    <div class="row items-center justify-between">
                      <div class="row items-center">
                        <q-icon :name="getActionIcon(action.actionType || action.type)" size="24px" class="q-mr-sm" />
                        <div class="text-subtitle2">{{ action.name }}</div>
                        <q-chip
                          dense
                          color="primary"
                          text-color="white"
                          class="q-ml-sm"
                        >
                          {{ $t('funilacao.diasAposInicio', { dias: action.daysToTrigger || 0 }) }}
                        </q-chip>
                      </div>
                      <div class="row items-center">
                        <q-btn
                          flat
                          round
                          dense
                          icon="arrow_upward"
                          :disable="index === 0"
                          @click="moveActionUp(index)"
                          class="q-mr-sm"
                        >
                          <q-tooltip>{{ $t('funilacao.moverParaCima') }}</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          dense
                          icon="arrow_downward"
                          :disable="index === flowForm.actions.length - 1"
                          @click="moveActionDown(index)"
                          class="q-mr-sm"
                        >
                          <q-tooltip>{{ $t('funilacao.moverParaBaixo') }}</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          dense
                          icon="edit"
                          @click="editFlowAction(index)"
                          class="q-mr-sm"
                        >
                          <q-tooltip>{{ $t('funilacao.editar') }}</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          dense
                          icon="delete"
                          @click="removeAction(index)"
                        >
                          <q-tooltip>{{ $t('funilacao.excluir') }}</q-tooltip>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <!-- Botão para adicionar nova ação -->
            <q-btn
              color="primary"
              icon="add"
              :label="$t('funilacao.adicionarAcao')"
              @click="openActionSelector"
              class="q-mt-md"
            />

            <div class="row justify-end q-mt-md">
              <q-btn
                :label="$t('funilacao.cancelar')"
                color="negative"
                flat
                v-close-popup
                class="q-mr-sm"
              />
              <q-btn
                :label="$t('funilacao.salvar')"
                color="primary"
                type="submit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal de Seleção de Ação -->
    <q-dialog v-model="showActionSelector" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('funilacao.selecionarAcao') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-y-md">
            <q-item
              v-for="action in availableActions"
              :key="action.id"
              clickable
              v-ripple
              @click="selectAction(action)"
            >
              <q-item-section avatar>
                <q-icon :name="action.icon" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ action.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal de Configuração de Mensagem -->
    <q-dialog v-model="showMessageConfig" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('funilacao.configurarMensagem') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="editingActionIndex = null" />
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveMessageConfig" class="q-gutter-md">
            <q-input
              v-model="messageConfig.name"
              :label="$t('funilacao.nome')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
            />
            <q-input
              v-model="messageConfig.message"
              :label="$t('funilacao.mensagem')"
              type="textarea"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
              autogrow
            />
            <q-select
              v-model="messageConfig.whatsappId"
              :options="whatsappOptions"
              :label="$t('funilacao.whatsapp')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
              emit-value
              map-options
            />
            <q-input
              v-model.number="messageConfig.daysToTrigger"
              type="number"
              :label="$t('funilacao.diasParaDisparar')"
              outlined
              dense
              min="0"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :label="$t('funilacao.cancelar')"
            color="negative"
            flat
            v-close-popup
          />
          <q-btn
            :label="$t('funilacao.confirmar')"
            color="primary"
            @click="saveMessageConfig"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Configuração de Mudança de Etapa -->
    <q-dialog v-model="showStageChangeConfig" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('funilacao.configurarMudancaEtapa') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="editingActionIndex = null" />
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveStageChangeConfig" class="q-gutter-md">
            <q-input
              v-model="stageChangeConfig.name"
              :label="$t('funilacao.nome')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
            />
            <q-select
              v-model="stageChangeConfig.targetStageId"
              :options="filteredFlowStages"
              :label="$t('funilacao.etapaDestino')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
              emit-value
              map-options
              option-value="id"
              option-label="name"
            />
            <q-input
              v-model.number="stageChangeConfig.daysToTrigger"
              type="number"
              :label="$t('funilacao.diasParaDisparar')"
              outlined
              dense
              min="0"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :label="$t('funilacao.cancelar')"
            color="negative"
            flat
            v-close-popup
          />
          <q-btn
            :label="$t('funilacao.confirmar')"
            color="primary"
            @click="saveStageChangeConfig"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Configuração de Mudança de Status -->
    <q-dialog v-model="showStatusChangeConfig" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('funilacao.configurarMudancaStatus') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="editingActionIndex = null" />
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveStatusChangeConfig" class="q-gutter-md">
            <q-input
              v-model="statusChangeConfig.name"
              :label="$t('funilacao.nome')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
            />
            <q-select
              v-model="statusChangeConfig.targetStatus"
              :options="statusOptions"
              :label="$t('funilacao.statusDestino')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
              emit-value
              map-options
            />
            <q-input
              v-model.number="statusChangeConfig.daysToTrigger"
              type="number"
              :label="$t('funilacao.diasParaDisparar')"
              outlined
              dense
              min="0"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :label="$t('funilacao.cancelar')"
            color="negative"
            flat
            v-close-popup
          />
          <q-btn
            :label="$t('funilacao.confirmar')"
            color="primary"
            @click="saveStatusChangeConfig"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Configuração de Adição de Tag -->
    <q-dialog v-model="showTagConfig" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('funilacao.configurarAdicaoTag') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="editingActionIndex = null" />
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveTagConfig" class="q-gutter-md">
            <q-input
              v-model="tagConfig.name"
              :label="$t('funilacao.nome')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
            />
            <q-select
              v-model="tagConfig.tagId"
              :options="tags"
              :label="$t('funilacao.tag')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
              emit-value
              map-options
              option-value="id"
              option-label="tag"
              use-input
              input-debounce="700"
            />
            <q-input
              v-model.number="tagConfig.daysToTrigger"
              type="number"
              :label="$t('funilacao.diasParaDisparar')"
              outlined
              dense
              min="0"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :label="$t('funilacao.cancelar')"
            color="negative"
            flat
            v-close-popup
          />
          <q-btn
            :label="$t('funilacao.confirmar')"
            color="primary"
            @click="saveTagConfig"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Configuração de Adição de Carteira -->
    <q-dialog v-model="showWalletConfig" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('funilacao.configurarAdicaoCarteira') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="editingActionIndex = null" />
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveWalletConfig" class="q-gutter-md">
            <q-input
              v-model="walletConfig.name"
              :label="$t('funilacao.nome')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
            />
            <q-select
              v-model="walletConfig.walletId"
              :options="usuarios"
              :label="$t('funilacao.carteira')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
              emit-value
              map-options
              option-value="id"
              option-label="name"
              use-input
              input-debounce="700"
            />
            <q-input
              v-model.number="walletConfig.daysToTrigger"
              type="number"
              :label="$t('funilacao.diasParaDisparar')"
              outlined
              dense
              min="0"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            :label="$t('funilacao.cancelar')"
            color="negative"
            flat
            v-close-popup
          />
          <q-btn
            :label="$t('funilacao.confirmar')"
            color="primary"
            @click="saveWalletConfig"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal de Configuração de Fluxo -->
    <q-dialog v-model="showFlowConfig" persistent>
      <q-card style="min-width: 800px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('funilacao.configurarFluxo') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit="saveFlowConfig" class="q-gutter-md">
            <q-input
              v-model="flowConfig.name"
              :label="$t('funilacao.nome')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
            />

            <q-input
              v-model="flowConfig.description"
              :label="$t('funilacao.descricao')"
              type="textarea"
              outlined
              dense
            />

            <!-- Lista de ações do fluxo -->
            <div class="text-subtitle2 q-mt-md">{{ $t('funilacao.acoesDoFluxo') }}</div>
            
            <div class="flow-actions-list">
              <div v-for="(action, index) in flowConfig.actions" :key="index" class="flow-action-item">
                <q-card class="q-mb-sm">
                  <q-card-section>
                    <div class="row items-center justify-between">
                      <div class="row items-center">
                        <q-icon :name="getActionIcon(action.actionType)" size="24px" class="q-mr-sm" />
                        <div class="text-subtitle2">{{ action.name }}</div>
                        <q-chip
                          dense
                          color="primary"
                          text-color="white"
                          class="q-ml-sm"
                        >
                          {{ $t('funilacao.diasAposInicio', { dias: action.relativeDay }) }}
                        </q-chip>
                      </div>
                      <div class="row items-center">
                        <q-btn
                          flat
                          round
                          dense
                          icon="arrow_upward"
                          :disable="index === 0"
                          @click="moveFlowActionUp(index)"
                          class="q-mr-sm"
                        >
                          <q-tooltip>{{ $t('funilacao.moverParaCima') }}</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          dense
                          icon="arrow_downward"
                          :disable="index === flowConfig.actions.length - 1"
                          @click="moveFlowActionDown(index)"
                          class="q-mr-sm"
                        >
                          <q-tooltip>{{ $t('funilacao.moverParaBaixo') }}</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          dense
                          icon="edit"
                          @click="editFlowAction(index)"
                          class="q-mr-sm"
                        >
                          <q-tooltip>{{ $t('funilacao.editar') }}</q-tooltip>
                        </q-btn>
                        <q-btn
                          flat
                          round
                          dense
                          icon="delete"
                          @click="removeFlowAction(index)"
                        >
                          <q-tooltip>{{ $t('funilacao.excluir') }}</q-tooltip>
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>

            <!-- Botão para adicionar nova ação -->
            <q-btn
              color="primary"
              icon="add"
              :label="$t('funilacao.adicionarAcao')"
              @click="openActionSelector"
              class="q-mt-md"
            />

            <div class="row justify-end q-mt-md">
              <q-btn
                :label="$t('funilacao.cancelar')"
                color="negative"
                flat
                v-close-popup
                class="q-mr-sm"
              />
              <q-btn
                :label="$t('funilacao.confirmar')"
                color="primary"
                type="submit"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  CriarPipelineAction,
  ListarPipelineActions,
  AlterarPipelineAction,
  DeletarPipelineAction,
  ToggleActivePipelineAction,
  CriarPipelineActionsSequential
} from 'src/service/funilacao'
import { ListarPipelines } from 'src/service/funil.js'
import { ListarStages } from 'src/service/estagio.js'
import { ListarEtiquetas } from 'src/service/etiquetas.js'
import { ListarUsuarios } from 'src/service/user.js'
import { mapGetters } from 'vuex'
import PipelineActionLogsDialog from 'src/components/PipelineActionLogsDialog.vue'

export default {
  name: 'PipelineActions',
  components: {
    PipelineActionLogsDialog
  },

  data() {
    return {
      loading: false,
      actions: [],
      pipelines: [],
      stages: [],
      tags: [],
      usuarios: [],
      showModal: false,
      showLogsDialog: false,
      editingAction: null,
      showFlowModal: false,
      showActionSelector: false,
      showMessageConfig: false,
      showStageChangeConfig: false,
      showStatusChangeConfig: false,
      showTagConfig: false,
      showWalletConfig: false,
      showFlowConfig: false,
      __modalTimer: null,
      flowConfig: {
        name: '',
        description: '',
        actions: []
      },
      currentActionType: null,
      currentConfig: null,
      filters: {
        searchTerm: '',
        pipelineId: null,
        stageId: null,
        actionType: null,
        active: true
      },
      form: {
        name: '',
        pipelineId: null,
        stageId: null,
        actionType: null,
        daysToTrigger: 0,
        description: '',
        active: true,
        whatsappId: null,
        message: '',
        targetStageId: null,
        targetStatus: null,
        tagId: null,
        walletId: null
      },
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      actionTypes: [
        { label: this.$t('funilacao.tipoAcaoMensagem'), value: 'message' },
        { label: this.$t('funilacao.tipoAcaoMudarEtapa'), value: 'stage_change' },
        { label: this.$t('funilacao.tipoAcaoMudarStatus'), value: 'status_change' },
        { label: this.$t('funilacao.tipoAcaoAdicionarTag'), value: 'add_tag' },
        { label: this.$t('funilacao.tipoAcaoAdicionarCarteira'), value: 'add_wallet' },
        { label: this.$t('funilacao.tipoAcaoFluxo'), value: 'flow' }
      ],
      statusOptions: [
        { label: this.$t('funilacao.aberto'), value: 'open' },
        { label: this.$t('funilacao.ganho'), value: 'win' },
        { label: this.$t('funilacao.perdido'), value: 'lose' }
      ],
      columns: [
        {
          name: 'name',
          required: true,
          label: this.$t('funilacao.nome'),
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'pipeline',
          required: true,
          label: this.$t('funilacao.pipeline'),
          align: 'left',
          field: row => row.pipeline?.name,
          sortable: true,
          sort: (a, b) => {
            const nameA = a.pipeline?.name || '';
            const nameB = b.pipeline?.name || '';
            return nameA.localeCompare(nameB);
          }
        },
        {
          name: 'stage',
          required: true,
          label: this.$t('funilacao.etapa'),
          align: 'left',
          field: row => row.stage?.name,
          sortable: true,
          sort: (a, b) => {
            const nameA = a.stage?.name || '';
            const nameB = b.stage?.name || '';
            return nameA.localeCompare(nameB);
          }
        },
        {
          name: 'actionType',
          required: true,
          label: this.$t('funilacao.tipoAcao'),
          align: 'left',
          field: 'actionType',
          sortable: true,
          format: (val) => this.actionTypes.find(t => t.value === val)?.label,
          sort: (a, b) => {
            const labelA = this.actionTypes.find(t => t.value === a.actionType)?.label || '';
            const labelB = this.actionTypes.find(t => t.value === b.actionType)?.label || '';
            return labelA.localeCompare(labelB);
          }
        },
        {
          name: 'daysToTrigger',
          required: true,
          label: this.$t('funilacao.diasParaDisparar'),
          align: 'left',
          field: 'daysToTrigger',
          sortable: true
        },
        {
          name: 'whatsapp',
          required: true,
          label: this.$t('funilacao.whatsapp'),
          align: 'left',
          field: row => row.whatsapp?.name,
          sortable: true,
          sort: (a, b) => {
            const nameA = a.whatsapp?.name || '';
            const nameB = b.whatsapp?.name || '';
            return nameA.localeCompare(nameB);
          }
        },
        {
          name: 'active',
          required: true,
          label: this.$t('funilacao.ativo'),
          align: 'center',
          field: 'active'
        },
        {
          name: 'actions',
          required: true,
          label: this.$t('funilacao.acoes'),
          align: 'center',
          field: 'actions'
        }
      ],
      availableActions: [],
      flowForm: {
        name: '',
        pipelineId: null,
        stageId: null,
        description: '',
        actions: []
      },
      messageConfig: {
        name: '',
        message: '',
        whatsappId: null
      },
      stageChangeConfig: {
        name: '',
        targetStageId: null
      },
      statusChangeConfig: {
        name: '',
        targetStatus: null
      },
      tagConfig: {
        name: '',
        tagId: null
      },
      walletConfig: {
        name: '',
        walletId: null
      },
      editingActionIndex: null
    }
  },

  computed: {
    ...mapGetters(['whatsapps']),
    whatsappOptions() {
      return this.whatsapps
        .filter(w => ['baileys', 'whatsapp', 'evo', 'meow', 'zapi', 'uazapi'].includes(w.type) && !w.isDeleted && w.status === 'CONNECTED')
        .map(w => ({
          label: w.name,
          value: w.id
        }))
    },
    filteredStages() {
      if (!this.form.pipelineId) return []
      return this.stages.filter(stage => stage.pipelineId === this.form.pipelineId)
    },
    filteredFlowStages() {
      if (!this.flowForm.pipelineId) return []
      return this.stages.filter(stage => stage.pipelineId === this.flowForm.pipelineId)
    }
  },

  methods: {
    closeAllModals () {
      this.showModal = false
      this.showFlowModal = false
      this.showActionSelector = false
      this.showMessageConfig = false
      this.showStageChangeConfig = false
      this.showStatusChangeConfig = false
      this.showTagConfig = false
      this.showWalletConfig = false
      this.showFlowConfig = false
    },
    openDialog (key) {
      this.closeAllModals()
      this.$nextTick(() => {
        clearTimeout(this.__modalTimer)
        this.__modalTimer = setTimeout(() => { this[key] = true }, 10)
      })
    },
    getActionIcon(type) {
      const icons = {
        message: 'mdi-message',
        stage_change: 'mdi-arrow-right-bold-box',
        status_change: 'mdi-check-circle',
        add_tag: 'mdi-tag',
        add_wallet: 'mdi-wallet'
      }
      return icons[type] || 'mdi-help-circle'
    },
    async loadData() {
      this.loading = true
      try {
        const response = await ListarPipelineActions({
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          orderBy: this.pagination.sortBy,
          orderDirection: this.pagination.descending ? 'DESC' : 'ASC',
          ...this.filters
        })
        this.actions = response.data.data
        this.pagination.rowsNumber = response.data.pagination.total
      } catch (error) {
        console.error('Erro ao carregar ações:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroCarregarDados')
        })
      } finally {
        this.loading = false
      }
    },

    async loadPipelines() {
      try {
        const response = await ListarPipelines()
        this.pipelines = response.data.data || []
      } catch (error) {
        console.error('Erro ao carregar pipelines:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroCarregarDados')
        })
      }
    },

    async loadStages() {
      try {
        const response = await ListarStages()
        this.stages = response.data.data || []
      } catch (error) {
        console.error('Erro ao carregar etapas:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroCarregarDados')
        })
      }
    },

    async listarEtiquetas() {
      try {
        const { data } = await ListarEtiquetas(true)
        // Ordenar etiquetas por ordem alfabética baseada no campo 'tag'
        this.tags = data.sort((a, b) => {
          const tagA = a.tag ? a.tag.toLowerCase() : ''
          const tagB = b.tag ? b.tag.toLowerCase() : ''
          return tagA.localeCompare(tagB)
        })
      } catch (error) {
        console.error(error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroCarregarDados')
        })
      }
    },

    async listarUsuarios() {
      try {
        const { data } = await ListarUsuarios()
        this.usuarios = data.users
      } catch (error) {
        console.error(error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroCarregarDados')
        })
      }
    },

    openModal(action = null) {
      if (action && action.actionType === 'flow') {
        this.editingAction = action
        this.flowForm = {
          name: action.name,
          pipelineId: action.pipelineId,
          stageId: action.stageId,
          description: action.description,
          actions: []
        }
        if (action.actionContent) {
          try {
            const parsed = JSON.parse(action.actionContent)
            this.flowForm.actions = parsed.actions.map(action => {
              // Inferir o tipo da ação com base no nome
              let actionType = action.actionType || action.type
              if (!actionType) {
                if (action.name.includes('Mensagem')) {
                  actionType = 'message'
                } else if (action.name.includes('Etapa')) {
                  actionType = 'stage_change'
                } else if (action.name.includes('Status')) {
                  actionType = 'status_change'
                } else if (action.name.includes('Tag')) {
                  actionType = 'add_tag'
                } else if (action.name.includes('Carteira')) {
                  actionType = 'add_wallet'
                }
              }
              
              if (!actionType) {
                console.error('Não foi possível inferir o tipo da ação:', action)
                return null
              }

              // Mapear os campos para o formato correto
              const mappedAction = {
                ...action,
                actionType: actionType
              }

              // Adicionar campos específicos baseado no tipo
              switch (actionType) {
                case 'message':
                  mappedAction.actionContent = action.actionContent || action.message || ''
                  mappedAction.whatsappId = action.whatsappId
                  break
                case 'stage_change':
                  mappedAction.targetStageId = action.targetStageId || action.targetStage
                  break
                case 'status_change':
                  mappedAction.targetStatus = action.targetStatus || action.status
                  break
                case 'add_tag':
                  mappedAction.tagId = action.tagId || action.tag
                  break
                case 'add_wallet':
                  mappedAction.walletId = action.walletId || action.wallet
                  break
              }

              return mappedAction
            }).filter(action => action !== null)
            this.updateRelativeDays()
          } catch (e) {
            console.error('Erro ao parsear actionContent:', e)
            this.flowForm.actions = []
          }
        }
        this.openDialog('showFlowModal')
        return
      }
      this.editingAction = action
      if (action) {
        this.form = { 
          ...action
        }
        
        // Preencher campos específicos baseado no tipo de ação
        if (action.actionType === 'message') {
          this.form.message = action.actionContent
        } else if (action.actionType === 'status_change') {
          this.form.targetStatus = action.actionContent
        } else if (action.actionType === 'stage_change') {
          this.form.targetStageId = action.actionContent
        } else if (action.actionType === 'add_tag') {
          this.form.tagId = action.actionContent
        } else if (action.actionType === 'add_wallet') {
          this.form.walletId = action.actionContent
        }
      } else {
        this.form = {
          name: '',
          pipelineId: null,
          stageId: null,
          actionType: null,
          daysToTrigger: 0,
          description: '',
          active: true,
          whatsappId: null,
          message: '',
          targetStageId: null,
          targetStatus: null,
          tagId: null,
          walletId: null
        }
      }
      this.openDialog('showModal')
    },

    async saveAction() {
      try {
        const formData = { ...this.form }
        
        if (formData.actionType === 'message') {
          formData.actionContent = formData.message
        } else if (formData.actionType === 'status_change') {
          formData.actionContent = formData.targetStatus
        } else if (formData.actionType === 'stage_change') {
          formData.actionContent = formData.targetStageId
        } else if (formData.actionType === 'add_tag') {
          formData.actionContent = formData.tagId
        } else if (formData.actionType === 'add_wallet') {
          formData.actionContent = formData.walletId
        }
        
        if (this.editingAction) {
          await AlterarPipelineAction(formData)
        } else {
          await CriarPipelineAction(formData)
        }
        this.showModal = false
        this.loadData()
        this.$q.notify({
          type: 'positive',
          message: this.$t('funilacao.salvoComSucesso')
        })
      } catch (error) {
        console.error('Erro ao salvar ação:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroSalvar')
        })
      }
    },

    async toggleActive(action) {
      try {
        await ToggleActivePipelineAction(action.id)
        this.$q.notify({
          type: 'positive',
          message: this.$t('funilacao.alteradoComSucesso')
        })
      } catch (error) {
        console.error('Erro ao alterar status:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroAlterar')
        })
        // Reverter o toggle visualmente
        action.active = !action.active
      }
    },

    confirmDelete(action) {
      this.$q.dialog({
        title: this.$t('funilacao.confirmar'),
        message: this.$t('funilacao.confirmarExclusao'),
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await DeletarPipelineAction(action.id)
          this.loadData()
          this.$q.notify({
            type: 'positive',
            message: this.$t('funilacao.excluidoComSucesso')
          })
        } catch (error) {
          console.error('Erro ao excluir ação:', error)
          this.$q.notify({
            type: 'negative',
            message: this.$t('funilacao.erroExcluir')
          })
        }
      })
    },

    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination
      this.pagination = props.pagination
      this.loadData()
    },

    onPipelineChange() {
      this.form.stageId = null
      this.form.targetStageId = null
    },

    onFlowPipelineChange() {
      this.flowForm.stageId = null
      // Limpar também as etapas de destino em todas as ações do tipo stage_change
      this.flowForm.actions.forEach(action => {
        if (action.actionType === 'stage_change') {
          action.targetStageId = null
        }
      })
    },

    async localizarTag(search, update, abort) {
      if (!search || search.length < 2) {
        abort()
        return
      }
      try {
        const { data } = await ListarEtiquetas({ search })
        update(() => {
          this.tags = data || []
        })
      } catch (error) {
        console.error('Erro ao buscar tags:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroCarregarDados')
        })
      }
    },

    async localizarCarteira(search, update, abort) {
      if (!search || search.length < 2) {
        abort()
        return
      }
      try {
        const { data } = await ListarUsuarios({ search })
        update(() => {
          this.usuarios = data.users || []
        })
      } catch (error) {
        console.error('Erro ao buscar usuários:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroCarregarDados')
        })
      }
    },

    openFlowModal() {
      this.editingAction = null
      this.openDialog('showFlowModal')
      this.flowForm = {
        name: '',
        pipelineId: null,
        stageId: null,
        description: '',
        actions: []
      }
    },

    openActionSelector() {
      this.showActionSelector = true
    },

    selectAction(action) {
      // Não fechar o modal do fluxo, apenas fechar o seletor de ações
      this.showActionSelector = false
      this.currentActionType = action.type
      
      switch (action.type) {
        case 'message':
          this.messageConfig = { 
            name: '',
            message: '', 
            whatsappId: null,
            daysToTrigger: 0
          }
          this.showMessageConfig = true
          break
        case 'stage_change':
          this.stageChangeConfig = { 
            name: '',
            targetStageId: null,
            daysToTrigger: 0
          }
          this.showStageChangeConfig = true
          break
        case 'status_change':
          this.statusChangeConfig = { 
            name: '',
            targetStatus: null,
            daysToTrigger: 0
          }
          this.showStatusChangeConfig = true
          break
        case 'add_tag':
          this.tagConfig = { 
            name: '',
            tagId: null,
            daysToTrigger: 0
          }
          this.showTagConfig = true
          break
        case 'add_wallet':
          this.walletConfig = { 
            name: '',
            walletId: null,
            daysToTrigger: 0
          }
          this.showWalletConfig = true
          break
      }
    },

    editFlowAction(index) {
      const action = this.flowForm.actions[index]
      // console.log('Ação sendo editada:', action)
      this.editingActionIndex = index
      
      // Verifica se a ação tem actionType ou type
      let actionType = action.actionType || action.type
      
      // Se não tiver tipo definido, tenta inferir pelo nome
      if (!actionType) {
        if (action.name.includes('Mensagem')) {
          actionType = 'message'
        } else if (action.name.includes('Etapa')) {
          actionType = 'stage_change'
        } else if (action.name.includes('Status')) {
          actionType = 'status_change'
        } else if (action.name.includes('Tag')) {
          actionType = 'add_tag'
        } else if (action.name.includes('Carteira')) {
          actionType = 'add_wallet'
        }
      }
      
      // console.log('Tipo da ação:', actionType)
      
      if (!actionType) {
        console.error('Não foi possível inferir o tipo da ação:', action)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroAcaoSemTipo')
        })
        return
      }
      
      switch (actionType) {
        case 'message':
          this.messageConfig = {
            name: action.name || '',
            message: action.actionContent || action.message || '',
            whatsappId: action.whatsappId,
            daysToTrigger: action.daysToTrigger || 0
          }
          this.openDialog('showMessageConfig')
          break
        case 'stage_change':
          this.stageChangeConfig = {
            name: action.name || '',
            targetStageId: action.targetStageId || action.targetStage,
            daysToTrigger: action.daysToTrigger || 0
          }
          this.openDialog('showStageChangeConfig')
          break
        case 'status_change':
          this.statusChangeConfig = {
            name: action.name || '',
            targetStatus: action.targetStatus || action.status,
            daysToTrigger: action.daysToTrigger || 0
          }
          this.openDialog('showStatusChangeConfig')
          break
        case 'add_tag':
          this.tagConfig = {
            name: action.name || '',
            tagId: action.tagId || action.tag,
            daysToTrigger: action.daysToTrigger || 0
          }
          this.openDialog('showTagConfig')
          break
        case 'add_wallet':
          this.walletConfig = {
            name: action.name || '',
            walletId: action.walletId || action.wallet,
            daysToTrigger: action.daysToTrigger || 0
          }
          this.openDialog('showWalletConfig')
          break
        default:
          console.error('Tipo de ação não reconhecido:', actionType)
          this.$q.notify({
            type: 'negative',
            message: this.$t('funilacao.tipoAcaoNaoReconhecido')
          })
      }
    },

    saveMessageConfig() {
      if (this.editingActionIndex !== null) {
        // Atualizar ação existente
        this.flowForm.actions[this.editingActionIndex] = {
          ...this.flowForm.actions[this.editingActionIndex],
          actionType: 'message',
          name: this.messageConfig.name,
          actionContent: this.messageConfig.message,
          whatsappId: this.messageConfig.whatsappId,
          daysToTrigger: this.messageConfig.daysToTrigger || 0
        }
      } else {
        // Adicionar nova ação
        const newAction = {
          id: `message_${Date.now()}`,
          actionType: 'message',
          name: this.messageConfig.name,
          actionContent: this.messageConfig.message,
          whatsappId: this.messageConfig.whatsappId,
          daysToTrigger: this.messageConfig.daysToTrigger || 0
        }
        this.flowForm.actions.push(newAction)
      }
      this.updateRelativeDays()
      this.showMessageConfig = false
      this.editingActionIndex = null
      // Reabrir o modal do fluxo
      this.showFlowModal = true
    },

    saveStageChangeConfig() {
      if (this.editingActionIndex !== null) {
        // Atualizar ação existente
        this.flowForm.actions[this.editingActionIndex] = {
          ...this.flowForm.actions[this.editingActionIndex],
          actionType: 'stage_change',
          name: this.stageChangeConfig.name,
          targetStageId: this.stageChangeConfig.targetStageId,
          daysToTrigger: this.stageChangeConfig.daysToTrigger || 0
        }
      } else {
        // Adicionar nova ação
        const newAction = {
          id: `stage_change_${Date.now()}`,
          actionType: 'stage_change',
          name: this.stageChangeConfig.name,
          targetStageId: this.stageChangeConfig.targetStageId,
          daysToTrigger: this.stageChangeConfig.daysToTrigger || 0
        }
        this.flowForm.actions.push(newAction)
      }
      this.updateRelativeDays()
      this.showStageChangeConfig = false
      this.editingActionIndex = null
      // Reabrir o modal do fluxo
      this.showFlowModal = true
    },

    saveStatusChangeConfig() {
      if (this.editingActionIndex !== null) {
        // Atualizar ação existente
        this.flowForm.actions[this.editingActionIndex] = {
          ...this.flowForm.actions[this.editingActionIndex],
          actionType: 'status_change',
          name: this.statusChangeConfig.name,
          targetStatus: this.statusChangeConfig.targetStatus,
          daysToTrigger: this.statusChangeConfig.daysToTrigger || 0
        }
      } else {
        // Adicionar nova ação
        const newAction = {
          id: `status_change_${Date.now()}`,
          actionType: 'status_change',
          name: this.statusChangeConfig.name,
          targetStatus: this.statusChangeConfig.targetStatus,
          daysToTrigger: this.statusChangeConfig.daysToTrigger || 0
        }
        this.flowForm.actions.push(newAction)
      }
      this.updateRelativeDays()
      this.showStatusChangeConfig = false
      this.editingActionIndex = null
      // Reabrir o modal do fluxo
      this.showFlowModal = true
    },

    saveTagConfig() {
      if (this.editingActionIndex !== null) {
        // Atualizar ação existente
        this.flowForm.actions[this.editingActionIndex] = {
          ...this.flowForm.actions[this.editingActionIndex],
          actionType: 'add_tag',
          name: this.tagConfig.name,
          tagId: this.tagConfig.tagId,
          daysToTrigger: this.tagConfig.daysToTrigger || 0
        }
      } else {
        // Adicionar nova ação
        const newAction = {
          id: `add_tag_${Date.now()}`,
          actionType: 'add_tag',
          name: this.tagConfig.name,
          tagId: this.tagConfig.tagId,
          daysToTrigger: this.tagConfig.daysToTrigger || 0
        }
        this.flowForm.actions.push(newAction)
      }
      this.updateRelativeDays()
      this.showTagConfig = false
      this.editingActionIndex = null
      // Reabrir o modal do fluxo
      this.showFlowModal = true
    },

    saveWalletConfig() {
      if (this.editingActionIndex !== null) {
        // Atualizar ação existente
        this.flowForm.actions[this.editingActionIndex] = {
          ...this.flowForm.actions[this.editingActionIndex],
          actionType: 'add_wallet',
          name: this.walletConfig.name,
          walletId: this.walletConfig.walletId,
          daysToTrigger: this.walletConfig.daysToTrigger || 0
        }
      } else {
        // Adicionar nova ação
        const newAction = {
          id: `add_wallet_${Date.now()}`,
          actionType: 'add_wallet',
          name: this.walletConfig.name,
          walletId: this.walletConfig.walletId,
          daysToTrigger: this.walletConfig.daysToTrigger || 0
        }
        this.flowForm.actions.push(newAction)
      }
      this.updateRelativeDays()
      this.showWalletConfig = false
      this.editingActionIndex = null
      // Reabrir o modal do fluxo
      this.showFlowModal = true
    },

    updateRelativeDays() {
      let accumulatedDays = 0
      this.flowForm.actions.forEach((action, index) => {
        // Para cada ação, o relativeDay é a soma acumulativa dos daysToTrigger anteriores
        action.relativeDay = accumulatedDays
        // Adiciona os dias da ação atual para a próxima iteração
        accumulatedDays += action.daysToTrigger || 0
      })
    },

    moveActionUp(index) {
      if (index > 0) {
        const action = this.flowForm.actions[index]
        this.flowForm.actions.splice(index, 1)
        this.flowForm.actions.splice(index - 1, 0, action)
        this.updateRelativeDays()
      }
    },

    moveActionDown(index) {
      if (index < this.flowForm.actions.length - 1) {
        const action = this.flowForm.actions[index]
        this.flowForm.actions.splice(index, 1)
        this.flowForm.actions.splice(index + 1, 0, action)
        this.updateRelativeDays()
      }
    },

    removeAction(index) {
      this.flowForm.actions.splice(index, 1)
      this.updateRelativeDays()
    },

    removeFlowAction(index) {
      this.flowForm.actions.splice(index, 1)
      this.updateRelativeDays()
    },

    async saveFlow() {
      if (!this.flowForm.pipelineId || !this.flowForm.stageId) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.selecionePipelineEtapa')
        })
        return
      }

      if (this.flowForm.actions.length === 0) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.adicioneAcoes')
        })
        return
      }

      // O daysToTrigger do flow principal deve ser sempre 0
      // O flow começa imediatamente quando a oportunidade entra no estágio
      // As ações dentro do flow têm seus próprios daysToTrigger relativos ao início do flow

      // Filtrar ações para não enviar nenhum tipo 'flow'
      // As ações devem manter seus daysToTrigger originais (relativos ao início do flow)
      const actions = this.flowForm.actions
        .filter(action => action.actionType !== 'flow')
        .map((action) => {
          // Garante que a ação tenha actionType
          const actionType = action.actionType || action.type
          
          // Usar o nome da ação se definido, senão usar um nome padrão
          const actionName = action.name || `${this.flowForm.name} - Ação`
          
          return {
            name: actionName,
            description: action.description || this.flowForm.description,
            actionType: actionType,
            // Manter o daysToTrigger original da ação (relativo ao início do flow)
            daysToTrigger: action.daysToTrigger || 0,
            pipelineId: this.flowForm.pipelineId,
            stageId: this.flowForm.stageId,
            active: true,
            actionContent: action.actionContent,
            whatsappId: action.whatsappId,
            targetStageId: action.targetStageId,
            targetStatus: action.targetStatus,
            tagId: action.tagId,
            walletId: action.walletId
          }
        })

      try {
        if (this.editingAction) {
          // Se estiver editando, atualiza o fluxo existente
          // O daysToTrigger do flow principal é sempre 0 - o flow começa imediatamente
          await AlterarPipelineAction({
            id: this.editingAction.id,
            name: this.flowForm.name,
            description: this.flowForm.description,
            actionType: 'flow',
            pipelineId: this.flowForm.pipelineId,
            stageId: this.flowForm.stageId,
            active: true,
            daysToTrigger: 0, // Flow sempre começa imediatamente quando a oportunidade entra no estágio
            actionContent: JSON.stringify({
              actions: this.flowForm.actions.map((action, index) => {
                // Garante que a ação tenha actionType
                const actionType = action.actionType || action.type
                // Calcular relativeDay (dias acumulados até esta ação)
                const relativeDay = index === 0 ? 0 : this.flowForm.actions.slice(0, index).reduce((acc, a) => acc + (a.daysToTrigger || 0), 0)
                return {
                  ...action,
                  actionType: actionType,
                  relativeDay: relativeDay,
                  // Manter o daysToTrigger original da ação (relativo ao início do flow)
                  daysToTrigger: action.daysToTrigger || 0
                }
              })
            })
          })
        } else {
          // Se for novo fluxo, cria um novo
          await CriarPipelineActionsSequential({
            pipelineId: this.flowForm.pipelineId,
            stageId: this.flowForm.stageId,
            actions,
            flowName: this.flowForm.name
          })
        }

        this.showFlowModal = false
        this.loadData()
        this.$q.notify({
          type: 'positive',
          message: this.$t('funilacao.fluxoSalvoComSucesso')
        })
      } catch (error) {
        console.error('Erro ao salvar fluxo:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.erroSalvarFluxo')
        })
      }
    },

    moveFlowActionUp(index) {
      if (index > 0) {
        const action = this.flowConfig.actions[index]
        this.flowConfig.actions.splice(index, 1)
        this.flowConfig.actions.splice(index - 1, 0, action)
        this.updateRelativeDays()
      }
    },

    moveFlowActionDown(index) {
      if (index < this.flowConfig.actions.length - 1) {
        const action = this.flowConfig.actions[index]
        this.flowConfig.actions.splice(index, 1)
        this.flowConfig.actions.splice(index + 1, 0, action)
        this.updateRelativeDays()
      }
    },

    saveFlowConfig() {
      if (this.editingActionIndex === this.flowConfig.actions.length) {
        this.flowConfig.actions.push({
          id: `action_${Date.now()}`,
          type: this.currentActionType,
          name: this.getActionName(this.currentActionType),
          config: { ...this.currentConfig }
        })
      } else {
        this.$set(this.flowConfig.actions[this.editingActionIndex], 'config', { ...this.currentConfig })
      }
      this.showFlowConfig = false
    },

    updateCurrentConfig(config) {
      this.currentConfig = { ...config }
      this.currentActionType = config.type
    },

    getActionName(type) {
      const actionType = this.actionTypes.find(t => t.value === type)
      return actionType ? actionType.label : type
    }
  },

  watch: {
    filters: {
      handler() {
        this.loadData()
      },
      deep: true
    }
  },

  mounted() {
    this.loadData()
    this.loadPipelines()
    this.loadStages()
    this.listarEtiquetas()
    this.listarUsuarios()
    this.availableActions = [
      { id: 'message', name: this.$t('funilacao.tipoAcaoMensagem'), type: 'message', icon: 'mdi-message' },
      { id: 'stage_change', name: this.$t('funilacao.tipoAcaoMudarEtapa'), type: 'stage_change', icon: 'mdi-arrow-right-bold-box' },
      { id: 'status_change', name: this.$t('funilacao.tipoAcaoMudarStatus'), type: 'status_change', icon: 'mdi-check-circle' },
      { id: 'add_tag', name: this.$t('funilacao.tipoAcaoAdicionarTag'), type: 'add_tag', icon: 'mdi-tag' },
      { id: 'add_wallet', name: this.$t('funilacao.tipoAcaoAdicionarCarteira'), type: 'add_wallet', icon: 'mdi-wallet' }
    ]
  }
}
</script>

<style lang="scss" scoped>
.pipeline-actions {
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
      color: var(--q-primary);
    }
  }

  .filters {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
}

.actions-panel {
  min-height: 300px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
  padding: 8px;
}

.action-card {
  background: #f5f5f5;
  border-radius: 6px;
  cursor: grab;
  transition: box-shadow 0.2s;
}
.action-card:hover {
  box-shadow: 0 4px 16px #0002;
}

.flow-editor {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  .actions-panel {
    padding: 16px;
    background-color: var(--q-background);
  }

  .flow-area {
    padding: 16px;
    background-color: var(--q-background);
  }

  .flow-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .flow-node {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .flow-arrow {
    margin-top: 8px;
  }
}

.draggable-action-item {
  display: flex;
  align-items: center;
  background: #fffbe6;
  border: 2px solid #fbc02d;
  color: #333;
  margin: 12px 0;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.08rem;
  box-shadow: 0 2px 8px #fbc02d22;
  cursor: grab;
  transition: box-shadow 0.2s, background 0.2s;
  user-select: none;
}
.draggable-action-item:hover {
  background: #fff3c0;
  box-shadow: 0 4px 16px #fbc02d44;
}
.action-label {
  flex: 1;
}

.flow-actions-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.flow-action-item {
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(4px);
  }
}
</style>
