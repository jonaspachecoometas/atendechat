<template>
  <div>
    <q-card flat
      class="q-pa-sm q-pb-md">
      <q-card-section class="q-pa-none">
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <q-input ref="inputEnvioMensagem"
            class="q-pa-sm bg-white col-grow"
            :placeholder="$t('chatgptField.placeholders.apiKey')"
            dense
            outlined
            v-model="$attrs.element.data.chatgptApiKey"
            :value="$attrs.element.data.chatgptApiKey">
          </q-input>
        </div>
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <q-input ref="inputEnvioMensagem"
            class="q-pa-sm bg-white col-grow"
            :placeholder="$t('chatgptField.placeholders.orgId')"
            dense
            outlined
            v-model="$attrs.element.data.chatgptOrgId"
            :value="$attrs.element.data.chatgptOrgId">
          </q-input>
        </div>
        <!-- <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <q-input ref="inputEnvioMensagem"
            class="q-pa-sm bg-white col-grow"
            :placeholder="$t('chatgptField.placeholders.offKeyword')"
            dense
            outlined
            v-model="$attrs.element.data.chatgptOff"
            :value="$attrs.element.data.chatgptOff">
          </q-input>
        </div> -->
        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <q-input ref="inputEnvioMensagem"
            class="q-pa-sm bg-white col-grow"
            :placeholder="$t('chatgptField.placeholders.prompt')"
            autogrow
            dense
            outlined
            v-model="$attrs.element.data.chatgptPrompt"
            :value="$attrs.element.data.chatgptPrompt">
          </q-input>
        </div>
      </q-card-section>
            <!-- Seção de Roteamento -->
            <q-separator class="q-my-sm" />
      
      <q-card-section class="q-pa-sm">

        <div class="text-bold q-mb-sm">
          <!-- {{ $t('nodeForm.routeTo') }}: -->
          <p>{{ $t('chatgptField.placeholders.offKeyword') }}:</p>
        </div>

        <div class="flex flex-inline full-width items-center">
          <div class="flex flex-inline text-left"
            style="width: 40px">
          </div>
          <q-input ref="inputEnvioMensagem"
            class="q-pa-sm bg-white col-grow"
            :placeholder="$t('chatgptField.placeholders.offKeyword')"
            dense
            outlined
            v-model="$attrs.element.data.chatgptOff"
            :value="$attrs.element.data.chatgptOff">
          </q-input>
        </div>

        <q-separator class="q-my-sm" />

        <!-- Opções de Comparação para Roteamento -->
        <div v-if="$attrs.element.data.routeAction !== undefined && $attrs.element.data.routeAction !== null" class="q-mb-sm">
          <div class="text-bold q-mb-sm">
            <p>{{ $t('nodeForm.labels.comparisonType') }}:</p>
          </div>
          <q-option-group
            inline
            dense
            v-model="$attrs.element.data.routeComparisonType"
            :options="optionsComparisonType"
            color="secondary"
            style="font-size: 11px;"
          />
        </div>

        <q-separator class="q-my-sm" />

        <div class="text-bold q-mb-sm">
          <!-- {{ $t('nodeForm.routeTo') }}: -->
          <p>{{ $t('nodeForm.routeToChatgpt') }}:</p>
        </div>

         <!-- Opções de Roteamento -->
         <q-option-group
          inline
          dense
          v-model="$attrs.element.data.routeAction"
          :options="optionsAcao"
          color="primary"
          class="q-mb-sm"
          style="font-size: 12px;"
        />
        
        <!-- Campos de acordo com a opção selecionada -->
        <q-card flat class="q-pa-sm q-mb-none">
          <div class="row q-mt-none q-mb-none">
            <div class="col">
              <!-- Roteamento para Etapa -->
              <q-select v-if="$attrs.element.data.routeAction === 0"
                dense
                outlined
                class="full-width"
                v-model="$attrs.element.data.nextStepId"
                :options="nodesList.nodeList.filter(n => n.type !== 'configurations')"
                option-label="name"
                option-value="id"
                :label="$t('nodeForm.labels.step')"
                map-options
                emit-value
                clearable
                @update:model-value="nextStepId => updateRouteAction('step', nextStepId)" />
              
              <!-- Roteamento para Fila -->
              <q-select v-if="$attrs.element.data.routeAction === 1"
                dense
                outlined
                class="full-width"
                v-model="$attrs.element.data.queueId"
                :options="filas"
                option-label="queue"
                option-value="id"
                :label="$t('nodeForm.labels.queue')"
                map-options
                emit-value
                clearable
                @update:model-value="() => updateRouteAction('queue')" />
              
              <!-- Roteamento para Usuário -->
              <q-select v-if="$attrs.element.data.routeAction === 2"
                dense
                outlined
                class="full-width"
                v-model="$attrs.element.data.userIdDestination"
                :options="usuarios"
                option-label="name"
                option-value="id"
                :label="$t('sessaoModalWhatsapp.user')"
                map-options
                emit-value
                clearable
                @update:model-value="() => updateRouteAction('user')" />
              
              <!-- Roteamento para Encerrar -->
              <q-input v-if="$attrs.element.data.routeAction === 3"
                v-model="$attrs.element.data.closeTicket"
                :label="$t('nodeForm.labels.endMessage')"
                type="textarea"
                autogrow
                dense
                outlined
                input-style="min-height: 6vh; max-height: 9vh;"
                debounce="700"
                @update:model-value="() => updateRouteAction('close')"/>
              
              <!-- Roteamento para Canal -->
              <q-select v-if="$attrs.element.data.routeAction === 4"
                dense
                outlined
                class="full-width"
                v-model="$attrs.element.data.channelDestination"
                :options="cSessionsOptions"
                :label="$t('nodeForm.labels.channel')"
                map-options
                clearable
                @update:model-value="() => updateRouteAction('channel')" />
            </div>
          </div>
        </q-card>

      </q-card-section>
    </q-card>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'ChatGPTField',
  props: {
    nodesList: {
      type: Object,
      default: () => ({ nodeList: [] })
    },
    filas: {
      type: Array,
      default: () => []
    },
    usuarios: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      optionsAcao: [
        // { value: 0, label: 'Etapa' },
        { value: 1, label: this.$t('nodeForm.options.routeTo.queue') },
        { value: 2, label: this.$t('nodeForm.options.routeTo.user') },
        { value: 3, label: this.$t('nodeForm.options.routeTo.close') },
        { value: 4, label: this.$t('nodeForm.options.routeTo.channel') }
      ],
      optionsComparisonType: [
        { label: this.$t('nodeForm.optionsComparisonType.equals'), value: 'equals' },
        { label: this.$t('nodeForm.optionsComparisonType.contains'), value: 'contains' },
        { label: this.$t('nodeForm.optionsComparisonType.startsWith'), value: 'startsWith' },
        { label: this.$t('nodeForm.optionsComparisonType.endsWith'), value: 'endsWith' }
      ]
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      return this.whatsapps.filter(w => !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.id, type: w.type }))
    },
  },
  methods: {
    updateRouteAction(actionType, value = null) {
      // Inicializa os campos de roteamento se não existirem
      if (!this.$attrs.element.data.routeAction) {
        this.$attrs.element.data.routeAction = 0
      }
      
      // Inicializa o tipo de comparação se não existir
      if (!this.$attrs.element.data.routeComparisonType) {
        this.$attrs.element.data.routeComparisonType = 'equals'
      }
      
      // Limpa outros campos de ação exceto o selecionado
      if (actionType !== 'step') this.$attrs.element.data.nextStepId = null
      if (actionType !== 'queue') this.$attrs.element.data.queueId = null
      if (actionType !== 'user') this.$attrs.element.data.userIdDestination = null
      if (actionType !== 'close') this.$attrs.element.data.closeTicket = null
      if (actionType !== 'channel') this.$attrs.element.data.channelDestination = null
      
      // Define o valor específico se fornecido
      if (value !== null) {
        if (actionType === 'step') {
          this.$attrs.element.data.nextStepId = value
        }
      }
      
      // Define o chatFlowId baseado no routeAction
      this.updateChatFlowId()
    },
    
    updateChatFlowId() {
      // Se há uma ação de roteamento configurada, define o chatFlowId
      if (this.$attrs.element.data.routeAction !== undefined && this.$attrs.element.data.routeAction !== null) {
        // Para roteamento, usa o ID do chatflow atual (não gera um novo)
        // O chatFlowId deve ser o ID real do chatflow, não uma string aleatória
        if (!this.$attrs.element.data.chatFlowId) {
          // Se não há chatFlowId definido, mantém null para ser definido pelo backend
          this.$attrs.element.data.chatFlowId = null
        }
      } else {
        // Se não há roteamento, limpa o chatFlowId
        this.$attrs.element.data.chatFlowId = null
      }
    },
    
    // Método para obter o objeto completo de roteamento
    getRouteActionData() {
      if (this.$attrs.element.data.routeAction === undefined || this.$attrs.element.data.routeAction === null) {
        return null
      }
      
      return {
        routeAction: this.$attrs.element.data.routeAction,
        routeComparisonType: this.$attrs.element.data.routeComparisonType || 'equals',
        nextStepId: this.$attrs.element.data.nextStepId || null,
        queueId: this.$attrs.element.data.queueId || null,
        userIdDestination: this.$attrs.element.data.userIdDestination || null,
        closeTicket: this.$attrs.element.data.closeTicket || null,
        channelDestination: this.$attrs.element.data.channelDestination || null,
        chatFlowId: this.$attrs.element.data.chatFlowId || null
      }
    },
    
  },
  mounted() {
    // Inicializa os campos de roteamento se não existirem
    if (!this.$attrs.element.data.routeAction) {
      this.$attrs.element.data.routeAction = 0
    }
    
    // Inicializa o tipo de comparação se não existir
    if (!this.$attrs.element.data.routeComparisonType) {
      this.$attrs.element.data.routeComparisonType = 'equals'
    }
    
    // Atualiza o chatFlowId baseado na configuração atual
    this.updateChatFlowId()
  }
}
</script>

<style lang="scss" scoped>

</style>
