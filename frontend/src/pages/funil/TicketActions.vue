<template>
  <div class="ticket-actions">
    <div class="header">
      <h2>{{ $t('funilacao.acaoTicket') || 'Ações de Tickets' }}</h2>
      <div class="row q-gutter-sm">
        <q-btn
          color="primary"
          icon="add"
          :label="$t('funilacao.novo')"
          @click="openModal()"
        />
        <!-- <q-btn
          color="primary"
          icon="account_tree"
          :label="$t('funilacao.novoFluxo')"
          @click="openFlowModal()"
        /> -->
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
            {{ $t('funilacao.acaoTicket') || 'Ação de Ticket' }}
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

            <q-input
              v-model.number="form.hoursWithoutResponse"
              type="number"
              :label="$t('funilacao.horasSemResposta') || 'Horas sem Resposta'"
              :rules="[val => (val !== null && val !== undefined && val >= 0) || $t('funilacao.required')]"
              outlined
              dense
              min="0"
              hint="Horas que o ticket deve ficar sem resposta para disparar esta ação"
            />

            <div>
              <div class="row items-center q-mb-xs">
                <label class="text-caption text-weight-medium">
                  {{ $t('funilacao.dataInicio') || 'Data de Início' }}
                </label>
                <q-icon name="info" size="16px" class="q-ml-xs cursor-pointer text-primary">
                  <q-tooltip class="bg-primary" :offset="[10, 10]" max-width="300px">
                    <div class="text-body2">
                      <strong>{{ $t('funilacao.dataInicioTooltipTitulo') || 'Como funciona:' }}</strong><br/>
                      {{ $t('funilacao.dataInicioTooltipDescricao') || 'Esta data define a partir de quando a ação será aplicada aos tickets.' }}<br/><br/>
                      • {{ $t('funilacao.dataInicioTooltipPreenchida') || 'Se preenchida: apenas tickets criados após esta data receberão a ação' }}<br/>
                      • {{ $t('funilacao.dataInicioTooltipVazia') || 'Se vazia: a ação será aplicada a todos os tickets (comportamento padrão)' }}<br/><br/>
                      <strong>{{ $t('funilacao.dataInicioTooltipExemplo') || 'Exemplo: Se definir 01/01/2024, apenas tickets criados a partir desta data receberão a ação, ignorando tickets antigos.' }}</strong>
                    </div>
                  </q-tooltip>
                </q-icon>
              </div>
              <q-input
                v-model="form.startedAt"
                type="datetime-local"
                outlined
                dense
                hint="Apenas tickets criados após esta data receberão a ação (opcional)"
                clearable
              />
            </div>

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
                clearable
              >
                <template v-slot:option="{ itemProps, itemEvents, opt }">
                  <q-item v-bind="itemProps" v-on="itemEvents">
                    <q-item-section avatar>
                      <q-icon :style="{ color: opt.color }" name="mdi-pound-box-outline" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label v-html="opt.tag"></q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected>
                  <q-chip
                    v-if="form.tagId"
                    dense
                    square
                    color="white"
                    text-color="primary"
                  >
                    <q-icon 
                      :style="{ color: tags.find(t => t.id === form.tagId)?.color }" 
                      name="mdi-pound-box-outline" 
                      size="20px" 
                      class="q-mr-sm" 
                    />
                    {{ tags.find(t => t.id === form.tagId)?.tag }}
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
                clearable
              >
                <template v-slot:option="{ itemProps, itemEvents, opt }">
                  <q-item v-bind="itemProps" v-on="itemEvents">
                    <q-item-section>
                      <q-item-label v-html="opt.name"></q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected>
                  <q-chip
                    v-if="form.walletId"
                    dense
                    square
                    color="white"
                    text-color="primary"
                  >
                    {{ usuarios.find(u => u.id === form.walletId)?.name }}
                  </q-chip>
                </template>
              </q-select>
            </template>

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
            <q-input
              v-model="flowForm.name"
              :label="$t('funilacao.nome')"
              :rules="[val => !!val || $t('funilacao.required')]"
              outlined
              dense
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
                          {{ $t('funilacao.horasAposInicio', { horas: action.hoursWithoutResponse || 0 }) || `${action.hoursWithoutResponse || 0}h após início` }}
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

    <!-- Modais de configuração de ações (simplificados) -->
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
              v-model.number="messageConfig.hoursWithoutResponse"
              type="number"
              :label="$t('funilacao.horasSemResposta') || 'Horas sem Resposta'"
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

    <!-- Outros modais de configuração seguem o mesmo padrão... -->
    <!-- Por brevidade, vou incluir apenas os principais -->
  </div>
</template>

<script>
import {
  CriarTicketAction,
  ListarTicketActions,
  AlterarTicketAction,
  DeletarTicketAction,
  ToggleActiveTicketAction,
  CriarTicketActionsSequential
} from 'src/service/ticketAction'
import { ListarEtiquetas } from 'src/service/etiquetas.js'
import { ListarUsuarios } from 'src/service/user.js'
import { mapGetters } from 'vuex'

export default {
  name: 'TicketActions',

  data() {
    return {
      loading: false,
      actions: [],
      tags: [],
      usuarios: [],
      showModal: false,
      editingAction: null,
      showFlowModal: false,
      showActionSelector: false,
      showMessageConfig: false,
      filters: {
        searchTerm: '',
        actionType: null,
        active: true
      },
      form: {
        name: '',
        hoursWithoutResponse: 0,
        actionType: null,
        description: '',
        active: true,
        whatsappId: null,
        message: '',
        tagId: null,
        walletId: null,
        startedAt: null
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
        { label: this.$t('funilacao.tipoAcaoAdicionarTag'), value: 'add_tag' },
        { label: this.$t('funilacao.tipoAcaoAdicionarCarteira'), value: 'add_wallet' },
        // { label: this.$t('funilacao.tipoAcaoFluxo'), value: 'flow' }
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
          name: 'actionType',
          required: true,
          label: this.$t('funilacao.tipoAcao'),
          align: 'left',
          field: 'actionType',
          sortable: true,
          format: (val) => this.actionTypes.find(t => t.value === val)?.label
        },
        {
          name: 'hoursWithoutResponse',
          required: true,
          label: this.$t('funilacao.horasSemResposta') || 'Horas sem Resposta',
          align: 'left',
          field: 'hoursWithoutResponse',
          sortable: true
        },
        {
          name: 'startedAt',
          required: false,
          label: this.$t('funilacao.dataInicio') || 'Data de Início',
          align: 'left',
          field: 'startedAt',
          sortable: true,
          format: (val) => val ? new Date(val).toLocaleString('pt-BR') : '-'
        },
        {
          name: 'whatsapp',
          required: false,
          label: this.$t('funilacao.whatsapp'),
          align: 'left',
          field: row => row.whatsapp?.name
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
        description: '',
        actions: []
      },
      messageConfig: {
        name: '',
        message: '',
        whatsappId: null,
        hoursWithoutResponse: 0
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
    }
  },

  methods: {
    getActionIcon(type) {
      const icons = {
        message: 'mdi-message',
        add_tag: 'mdi-tag',
        add_wallet: 'mdi-wallet',
        flow: 'mdi-account-tree'
      }
      return icons[type] || 'mdi-help-circle'
    },
    async loadData() {
      this.loading = true
      try {
        const response = await ListarTicketActions({
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

    async listarEtiquetas() {
      try {
        const { data } = await ListarEtiquetas(true)
        this.tags = data.sort((a, b) => {
          const tagA = a.tag ? a.tag.toLowerCase() : ''
          const tagB = b.tag ? b.tag.toLowerCase() : ''
          return tagA.localeCompare(tagB)
        })
      } catch (error) {
        console.error(error)
      }
    },

    async listarUsuarios() {
      try {
        const { data } = await ListarUsuarios()
        this.usuarios = data.users
      } catch (error) {
        console.error(error)
      }
    },

    openModal(action = null) {
      this.editingAction = action
      if (action) {
        this.form = { 
          ...action
        }
        
        // Converter startedAt para formato datetime-local se existir
        if (action.startedAt) {
          const date = new Date(action.startedAt)
          const year = date.getFullYear()
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')
          const hours = String(date.getHours()).padStart(2, '0')
          const minutes = String(date.getMinutes()).padStart(2, '0')
          this.form.startedAt = `${year}-${month}-${day}T${hours}:${minutes}`
        } else {
          this.form.startedAt = null
        }
        
        if (action.actionType === 'message') {
          this.form.message = action.actionContent
        } else if (action.actionType === 'add_tag') {
          this.form.tagId = action.tagId
        } else if (action.actionType === 'add_wallet') {
          this.form.walletId = action.walletId
        }
      } else {
        this.form = {
          name: '',
          hoursWithoutResponse: 0,
          actionType: null,
          description: '',
          active: true,
          whatsappId: null,
          message: '',
          tagId: null,
          walletId: null,
          startedAt: null
        }
      }
      this.showModal = true
    },

    async saveAction() {
      try {
        const formData = { ...this.form }
        
        // Converter startedAt de datetime-local para ISO string se existir
        if (formData.startedAt) {
          formData.startedAt = new Date(formData.startedAt).toISOString()
        } else {
          formData.startedAt = null
        }
        
        if (formData.actionType === 'message') {
          formData.actionContent = formData.message
        } else if (formData.actionType === 'add_tag') {
          formData.actionContent = formData.tagId
        } else if (formData.actionType === 'add_wallet') {
          formData.actionContent = formData.walletId
        }
        
        if (this.editingAction) {
          await AlterarTicketAction(formData)
        } else {
          await CriarTicketAction(formData)
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
        await ToggleActiveTicketAction(action.id)
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
          await DeletarTicketAction(action.id)
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
      this.pagination = props.pagination
      this.loadData()
    },

    openFlowModal() {
      this.editingAction = null
      this.showFlowModal = true
      this.flowForm = {
        name: '',
        description: '',
        actions: []
      }
    },

    openActionSelector() {
      this.showActionSelector = true
    },

    selectAction(action) {
      this.showActionSelector = false
      this.currentActionType = action.type
      
      if (action.type === 'message') {
        this.messageConfig = { 
          name: '',
          message: '', 
          whatsappId: null,
          hoursWithoutResponse: 0
        }
        this.showMessageConfig = true
      }
      // Adicionar outros tipos de ação conforme necessário
    },

    saveMessageConfig() {
      if (this.editingActionIndex !== null) {
        this.flowForm.actions[this.editingActionIndex] = {
          ...this.flowForm.actions[this.editingActionIndex],
          actionType: 'message',
          name: this.messageConfig.name,
          actionContent: this.messageConfig.message,
          whatsappId: this.messageConfig.whatsappId,
          hoursWithoutResponse: this.messageConfig.hoursWithoutResponse || 0
        }
      } else {
        const newAction = {
          id: `message_${Date.now()}`,
          actionType: 'message',
          name: this.messageConfig.name,
          actionContent: this.messageConfig.message,
          whatsappId: this.messageConfig.whatsappId,
          hoursWithoutResponse: this.messageConfig.hoursWithoutResponse || 0
        }
        this.flowForm.actions.push(newAction)
      }
      this.showMessageConfig = false
      this.editingActionIndex = null
      this.showFlowModal = true
    },

    editFlowAction(index) {
      const action = this.flowForm.actions[index]
      this.editingActionIndex = index
      
      if (action.actionType === 'message') {
        this.messageConfig = {
          name: action.name || '',
          message: action.actionContent || action.message || '',
          whatsappId: action.whatsappId,
          hoursWithoutResponse: action.hoursWithoutResponse || 0
        }
        this.showMessageConfig = true
      }
    },

    moveActionUp(index) {
      if (index > 0) {
        const action = this.flowForm.actions[index]
        this.flowForm.actions.splice(index, 1)
        this.flowForm.actions.splice(index - 1, 0, action)
      }
    },

    moveActionDown(index) {
      if (index < this.flowForm.actions.length - 1) {
        const action = this.flowForm.actions[index]
        this.flowForm.actions.splice(index, 1)
        this.flowForm.actions.splice(index + 1, 0, action)
      }
    },

    removeAction(index) {
      this.flowForm.actions.splice(index, 1)
    },

    async saveFlow() {
      if (this.flowForm.actions.length === 0) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('funilacao.adicioneAcoes')
        })
        return
      }

      const actions = this.flowForm.actions
        .filter(action => action.actionType !== 'flow')
        .map((action) => {
          const actionType = action.actionType || action.type
          const actionName = action.name || `${this.flowForm.name} - Ação`
          
          return {
            name: actionName,
            description: action.description || this.flowForm.description,
            actionType: actionType,
            hoursWithoutResponse: action.hoursWithoutResponse || 0,
            active: true,
            actionContent: action.actionContent,
            whatsappId: action.whatsappId,
            tagId: action.tagId,
            walletId: action.walletId
          }
        })

      try {
        if (this.editingAction) {
          await AlterarTicketAction({
            id: this.editingAction.id,
            name: this.flowForm.name,
            description: this.flowForm.description,
            actionType: 'flow',
            active: true,
            hoursWithoutResponse: 0,
            actionContent: JSON.stringify({
              actions: this.flowForm.actions.map((action, index) => {
                const actionType = action.actionType || action.type
                const relativeHour = index === 0 ? 0 : this.flowForm.actions.slice(0, index).reduce((acc, a) => acc + (a.hoursWithoutResponse || 0), 0)
                return {
                  ...action,
                  actionType: actionType,
                  relativeHour: relativeHour,
                  hoursWithoutResponse: action.hoursWithoutResponse || 0
                }
              })
            })
          })
        } else {
          await CriarTicketActionsSequential({
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
    this.listarEtiquetas()
    this.listarUsuarios()
    this.availableActions = [
      { id: 'message', name: this.$t('funilacao.tipoAcaoMensagem'), type: 'message', icon: 'mdi-message' },
      { id: 'add_tag', name: this.$t('funilacao.tipoAcaoAdicionarTag'), type: 'add_tag', icon: 'mdi-tag' },
      { id: 'add_wallet', name: this.$t('funilacao.tipoAcaoAdicionarCarteira'), type: 'add_wallet', icon: 'mdi-wallet' }
    ]
  }
}
</script>

<style lang="scss" scoped>
.ticket-actions {
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

