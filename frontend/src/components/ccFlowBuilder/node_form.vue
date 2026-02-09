<template>
  <div :class="inModal ? 'q-pa-md' : 'q-px-md q-py-sm'">
    <!-- BOTOES -->
    <div v-if="!hideToolbar" class="row justify-between col q-mb-sm">
      <div class="row q-gutter-sm">
        <q-btn class="bg-padrao"
          flat
          color="primary"
          icon="mdi-plus"
          size="12px"
          :label="$t('nodeForm.buttons.addStep')"
          @click="addNode" 
        />
        <q-btn class="bg-padrao"
          flat
          color="positive"
          icon="mdi-content-save-outline"
          size="12px"
          :label="$t('common.save')"
          @click="saveFlowWithSync" 
        />
      </div>
      <div class="row q-gutter-sm">
        <q-btn class="bg-padrao"
          flat
          color="primary"
          icon="mdi-download"
          size="12px"
          :label="$t('common.download')"
          @click="$emit('downloadData')"
        />
        <q-btn class="bg-padrao"
          flat
          color="primary"
          size="12px"
          :label="$t('common.fullscreen')"
          :icon="isFullScreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'"
          @click="toggleFullScreen"
        />
      </div>
    </div>

    <!-- BODY -->
    <q-card 
      :bordered="!inModal"
      :flat="inModal"
      :class="inModal ? '' : 'fit'"
      :style="inModal ? 'box-shadow: none;' : ''">
      <!-- <div class="ef-node-form-header">
        {{ $t('nodeForm.labels.flow') }}
      </div> -->

      <!-- HEADER -->
      <div class="row items-center q-mb-sm">
        <q-input 
          style="margin-left: 5px;"
          outlined
          filled
          :label="$t('nodeForm.labels.stepName')"
          v-model="node.name"
          class="q-my-sm col-grow"
          @blur="syncOnBlur"
          :disable="['start', 'configurations'].includes(node.type)" />



        <q-tabs 
        v-if="node.type === 'node'" 
        v-model="tabNodeForm" 
        narrow-indicator class="q-ml-md"
        style="margin-right: 5px;"
        >
          <q-tab name="interacoes" :label="$t('nodeForm.labels.interactions')" />
          <q-tab name="condicoes" :label="$t('nodeForm.labels.conditions')" />
        </q-tabs>
      </div>

      <!-- INT E COND -->
      <q-card-section class="q-pa-none"
        v-if="node.type === 'node'">
        <div>
          <!-- <q-tabs v-model="tabNodeForm"
            narrow-indicator
            class="text-grey-8 bg-">
            <q-tab name="interacoes"
            :label="$t('nodeForm.labels.interactions')" />
            <q-tab name="condicoes"
            :label="$t('nodeForm.labels.conditions')" />
          </q-tabs> -->


          <!-- PAINEIS -->
          <q-tab-panels v-model="tabNodeForm"
            animated
            keep-alive
            infinite
            class="q-pa-none rounded-borders">

            <!-- INTERACOES -->
            <q-tab-panel class="q-pa-none"
              name="interacoes">
              <div class="text-center ">
                <!-- BOTOES INTERACAO -->
                <div class="row q-mt-sm col justify-center">
                  <q-btn flat
                    size="10px"
                    icon="mdi-message-text-outline"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addMessage">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.message') }}
                    </q-tooltip>
                  </q-btn>
                   <q-btn @click="addMediaField"
                    size="10px"
                    flat
                    icon="mdi-file-document-outline"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.media') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-transit-connection-variant"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addTypebot">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.typebot') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-transit-connection-variant"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addChatGPT">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.chatgpt') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-timer-outline"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addDelay">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.delay') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-cog-outline"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addN8n">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.n8n') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-tag-outline"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addTags">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.tag') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-developer-board"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addKanbans">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.kanban') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-block-helper"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addChatBotBlock">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.chatbotBlock') }}
                    </q-tooltip>
                  </q-btn>
                                     <q-btn flat
                     size="10px"
                     icon="mdi-webhook"
                     class="bg-padrao btn-rounded q-mx-xs"
                     :color="$q.dark.isActive ? 'white' : ''"
                     @click="addWebhook">
                     <q-tooltip content-class="text-bold">
                       {{ $t('nodeForm.buttons.addInteraction.webhook') }}
                     </q-tooltip>
                   </q-btn>
                   <q-btn flat
                     size="10px"
                     icon="mdi-webhook"
                     class="bg-padrao btn-rounded q-mx-xs"
                     :color="$q.dark.isActive ? 'white' : ''"
                     @click="addWebhookAll">
                     <q-tooltip content-class="text-bold">
                       {{ $t('nodeForm.buttons.addInteraction.webhookAll') }}
                     </q-tooltip>
                   </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-robot"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addNewFlow">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.newFlow') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-briefcase-outline"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addOpportunity">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.opportunity') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-calendar-plus"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addGoogleAgenda">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.googleAgenda') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-clock-outline"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addSchedule">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.schedule') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-tag-text"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addReasons">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.reasons') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-message-text"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addSMS">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.sms') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-phone"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addVapi">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.vapi') }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn flat
                    size="10px"
                    icon="mdi-note-text"
                    class="bg-padrao btn-rounded q-mx-xs"
                    :color="$q.dark.isActive ? 'white' : ''"
                    @click="addNotes">
                    <q-tooltip content-class="text-bold">
                      {{ $t('nodeForm.buttons.addInteraction.notes') }}
                    </q-tooltip>
                  </q-btn>
                </div>
                <!-- ELEMENTOS -->
                <div 
                  :class="['row', 'bg-grey-3', 'q-pa-sm', 'q-my-md', 'justify-center', inModal ? '' : 'scroll']"
                  :style="inModal ? 'max-height: none; overflow: visible;' : 'height: calc(100vh - 289px)'">
                  <div class="col-xs-12">
                    <div v-for="(element, idx) in node.interactions"
                      :key="element.id"
                      v-bind="element">
                      <div class="q-my-md">
                        <div class="bg-white full-width row col justify-between ">
                          <q-btn round
                            class="q-pa-xs" 
                            size="12px"
                            dense
                            disable
                            :color="$q.dark.isActive ? 'grey-3' : 'black'"
                            :label="`${idx + 1} - ${formatType(element.type)}`"
                            style="z-index: 999; margin-top: 5px; " />
                          <q-space />
                          <q-btn round
                            size="12px"
                            dense
                            icon="mdi-arrow-up-bold"
                            flat
                            color="positive"
                            class="bg-padrao q-mr-md"
                            style="z-index: 999; margin-top: 5px;"
                            :disable="idx === 0"
                            @click="changePosition(node.interactions, idx, idx - 1)">
                            <q-tooltip>
                              {{ $t('nodeForm.buttons.reorder') }}
                            </q-tooltip>
                          </q-btn>
                          <q-btn round
                            dense
                            icon="mdi-arrow-down-bold"
                            flat
                            :color="$q.dark.isActive ? 'grey-3' : 'black'"
                            class="bg-padrao q-mr-md"
                            size="12px"
                            style="z-index: 999; margin-top: 5px;"
                            @click="changePosition(node.interactions, idx, idx + 1)">
                            <q-tooltip>
                              {{ $t('nodeForm.buttons.reorder') }}
                            </q-tooltip>
                          </q-btn>
                          <q-btn round
                            size="12px"
                            dense
                            icon="mdi-close"
                            flat
                            color="negative"
                            class="bg-padrao"
                            style="z-index: 999; margin-top: 5px;"
                            @click="removeItem(element, idx + 1)" />
                        </div>
                        <component :is="element.type"
                          :key="element.id"
                          :element="element"
                          :nodesList="nodesList"
                          :filas="filas"
                          :usuarios="usuarios"
                          :chatFlowId="$store.state.chatFlow.flow.id"
                          @update:element="updateElementData(element.id, $event)">
                        </component>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- CONDICOES -->
            <q-tab-panel class="q-pa-none"
              name="condicoes">
              <div v-show="type === 'node'">
                <!-- Configuração de Captura de Variável por Passo + Botão Adicionar Condição -->
                <div class="row q-mt-sm q-mb-md items-center q-gutter-md">
                  <!-- Card de Captura de Variável -->
                  <div class="col-grow">
                    <q-card flat class="q-pa-md bg-grey-2" :class="{ 'dark-mode-card': $q.dark.isActive }">
                      <div class="text-caption text-grey-7 q-mb-xs">
                        <q-icon name="mdi-variable" size="16px" />
                        {{ $t('nodeForm.labels.captureVariable') }}
                        <span class="text-caption text-grey-5 q-ml-xs">({{ node.variableKey || 'vazio' }})</span>
                      </div>
                      
                      <div class="row q-gutter-sm">
                        <!-- Campo para chave da variável -->
                        <div class="col">
                          <q-input
                            dense
                            outlined
                            v-model="node.variableKey"
                            :label="$t('nodeForm.labels.captureVariable')"
                            :hint="$t('nodeForm.hints.captureVariable')"
                            clearable
                            @blur="syncOnBlur"
                            @clear="clearStepVariableKey" />
                        </div>
                        
                        <!-- Campo para nome amigável da variável -->
                        <!-- <div class="col" v-if="node.variableKey">
                          <q-input
                            dense
                            outlined
                            v-model="node.variableLabel"
                            :label="$t('nodeForm.labels.variableLabel')"
                            :hint="$t('nodeForm.hints.variableLabel')"
                            clearable />
                        </div> -->
                        
                        <!-- Campo para tipo da variável -->
                        <div class="col" v-if="node.variableKey">
                          <q-select
                            dense
                            outlined
                            v-model="node.variableType"
                            :options="optionsVariableType"
                            :label="$t('nodeForm.labels.variableType')"
                            map-options
                            emit-value />
                        </div>
                        
                        <!-- Campo para validação personalizada -->
                        <!-- <div class="col" v-if="node.variableType === 'custom'">
                          <q-input
                            dense
                            outlined
                            v-model="node.variableValidation"
                            :label="$t('nodeForm.labels.variableValidation')"
                            :hint="$t('nodeForm.hints.variableValidation')"
                            clearable />
                        </div> -->
                      </div>
                    </q-card>
                  </div>
                  
                  <!-- Botão Adicionar Condição -->
                  <div class="col-auto">
                    <q-btn 
                      flat
                      size="md"
                      icon="mdi-vector-polyline-plus"
                      class="bg-padrao"
                      :color="$q.dark.isActive ? 'white' : 'primary'"
                      :label="$t('nodeForm.buttons.addCondition')"
                      @click="addCondiction">
                      <q-tooltip content-class="text-bold">
                        {{ $t('nodeForm.buttons.addCondition') }}
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
                <!-- ELEMENTOS -->
                <div 
                  :style="inModal ? 'max-height: none; overflow: visible;' : 'height: calc(100vh - 273px)'"
                  :class="['row', 'bg-grey-3', 'q-pa-sm', inModal ? '' : 'scroll', 'q-mt-md', 'col', 'justify-start']">
                  <template v-for="(condition, idx) in node.conditions" :key="condition.id || idx">
                    <q-card bordered
                      flat
                      class="full-width q-my-sm"
                      style="min-height: 250px;">
                      <!-- BOTOES ALTERAR CONDICAO -->
                      <div class="full-width row col justify-between text-left q-pa-xs">
                        <q-btn round
                          dense
                          disable
                          :color="$q.dark.isActive ? 'grey-3' : 'black'"
                          :label="idx + 1" />
                        <q-space />
                        <q-btn round
                          dense
                          icon="mdi-arrow-up-bold"
                          flat
                          color="positive"
                          class="bg-padrao q-mr-md"
                          size="12px"
                          style="z-index: 999; margin-top: 5px;"
                          :disable="idx === 0"
                          @click="changePosition(node.conditions, idx, idx - 1)">
                          <q-tooltip>
                            {{ $t('nodeForm.buttons.reorder') }}
                          </q-tooltip>
                        </q-btn>
                        <q-btn round
                          dense
                          icon="mdi-arrow-down-bold"
                          flat
                          :color="$q.dark.isActive ? 'grey-3' : 'black'"
                          class="bg-padrao q-mr-md"
                          size="12px"
                          style="z-index: 999; margin-top: 5px;"
                          @click="changePosition(node.conditions, idx, idx + 1)">
                          <q-tooltip>
                            {{ $t('nodeForm.buttons.reorder') }}
                          </q-tooltip>
                        </q-btn>
                        <q-btn round
                          dense
                          icon="mdi-close"
                          flat
                          color="negative"
                          class="bg-padrao"
                          size="12px"
                            style="z-index: 999; margin-top: 5px;"
                          @click="removeConditionItem(condition, idx, node)" />
                      </div>

                      <!-- SELECT DO TIPO DE RESPOSTA -->
                      <q-card-section class="q-pa-sm q-gutter-sm">
                        <q-select outlined
                          dense
                          v-model="condition.type"
                          :options="optionsSe"
                          :label="$t('nodeForm.labels.if')"
                          map-options
                          emit-value />
                        <!-- Campo para Respostas (tipo R) -->
                        <div v-if="condition.type === 'R'">
                          <!-- Seletor do tipo de comparação -->
                          <q-select
                            dense
                            outlined
                            v-model="condition.comparisonType"
                            :options="optionsComparisonType"
                            :label="$t('nodeForm.labels.comparisonType')"
                            class="q-mb-sm"
                            map-options
                            emit-value />
                          
                          <!-- Campo para as respostas -->
                          <q-select
                            dense
                            :label="$t('nodeForm.labels.responses')"
                            outlined
                            v-model="condition.condition"
                            use-input
                            use-chips
                            multiple
                            hide-dropdown-icon
                            input-debounce="0"
                            new-value-mode="add-unique"
                            :hint="getComparisonHint(condition.comparisonType)"
                            />
                          

                        </div>
                      </q-card-section>
                      <q-separator inset
                        spaced />

                      <!-- ROTEAR PARA -->
                      <q-card-section class="q-pa-sm">
                        <div class="row items-center q-gutter-sm">
                          <div class="text-bold q-px-sm"> 
                            {{ $t('nodeForm.routeTo') }}:
                          </div>

                          <!-- OPCOES RADIO BUTTON -->
                          <q-option-group
                            inline
                            dense
                            v-model="condition.action"
                            :options="optionsAcao"
                            color="primary"
                            class="q-mt-none"
                            style="font-size: 12px;"
                          />
                        </div>

                        <!-- CAMPOS DE ACORDO COM A OPCAO SELECIONADA -->
                        <q-card flat class="q-pa-sm q-mb-none">
                          <div class="row q-mt-none q-mb-none">
                            <div class="col">
                              <q-select v-if="condition.action === 0"
                                dense
                                outlined
                                class="full-width"
                                v-model="condition.nextStepId"
                                :options="nodesList.nodeList.filter(n => n.type !== 'configurations')"
                                option-label="name"
                                option-value="id"
                                :label="$t('nodeForm.labels.step')"
                                map-options
                                emit-value
                                clearable
                                @update:model-value="nextStepId => addLineStep(nextStepId, idx)" />
                              <q-select v-if="condition.action === 1"
                                dense
                                outlined
                                class="full-width"
                                v-model="condition.queueId"
                                :options="filas"
                                option-label="queue"
                                option-value="id"
                                :label="$t('nodeForm.labels.queue')"
                                :key="condition.queueId"
                                map-options
                                emit-value
                                clearable
                                @update:model-value="clearActionFields(condition, idx, 'queue')" />
                              <q-select v-if="condition.action === 2"
                                dense
                                outlined
                                class="full-width"
                                v-model="condition.userIdDestination"
                                :options="usuarios"
                                option-label="name"
                                option-value="id"
                                :label="$t('sessaoModalWhatsapp.user')"
                                map-options
                                emit-value
                                clearable
                                @update:model-value="clearActionFields(condition, idx, 'user')" />
                              <q-input v-if="condition.action === 3"
                                v-model="condition.closeTicket"
                                :label="$t('nodeForm.labels.endMessage')"
                                type="textarea"
                                autogrow
                                dense
                                outlined
                                input-style="min-height: 6vh; max-height: 9vh;"
                                debounce="700"
                                @update:model-value="clearActionFields(condition, idx, 'close')"/>
                              <q-select v-if="condition.action === 4"
                                dense
                                outlined
                                class="full-width"
                                v-model="condition.channelDestination"
                                :options="cSessionsOptions"
                                :label="$t('nodeForm.labels.channel')"
                                map-options
                                clearable
                                @update:model-value="clearActionFields(condition, idx, 'channel')" />
                            </div>
                        </div>
                        </q-card>
                      </q-card-section>
                    </q-card>
                  </template>
                </div>
              </div>
            </q-tab-panel>

          </q-tab-panels>

          <!-- ACOES -->
          <div class="q-pa-sm q-gutter-md"
            v-show="type === 'line'">
            <q-input outlined
              :label="$t('nodeForm.key')"
              v-model="line.label" />
            <q-btn icon="mdi-close"
            :label="$t('nodeForm.redefine')" />
            <q-btn type="primary"
              icon="mdi-content-save"
              @click="saveLine"
              :label="$t('common.save')" />
          </div>
         </div>
      </q-card-section>

      <!-- CONFIGS -->
      <q-card-section 
        :style="inModal ? 'max-height: none; overflow: visible;' : 'height: calc(100vh - 222px)'"
        :class="['row', 'bg-grey-5', 'q-pa-sm', inModal ? '' : 'scroll', 'col', 'justify-start']"
        v-if="node.type === 'configurations'">

        <!-- SAUDACAO -->
        <!-- <q-card class="full-width q-my-sm"
          style="height: 280px;">
          <div class="full-width bg-grey-3 text-bold row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.welcomeMessage') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.welcomeMessage2') }}
            </div>
          </div>
          <q-card-section class="q-pa-sm">
            <div class="row ">
              <div class="col">
                <label class="text-subtitle1 text-bold q-mb-sm"
                  for="inputEnvioMensagem"> {{ $t('nodeForm.message') }}: </label>
                <div class="flex flex-inline full-width items-center">
                  <div class="flex flex-inline text-left"
                    style="width: 40px">
                    <q-btn round
                      flat
                      dense>
                      <q-icon size="2em"
                        name="mdi-emoticon-happy-outline" />
                      <q-tooltip>
                        {{ $t('nodeForm.emoji') }}
                      </q-tooltip>
                      <q-menu anchor="top right"
                        self="bottom middle"
                        :offset="[5, 40]">
                        <VEmojiPicker style="width: 40vw"
                          :showSearch="false"
                          :emojisByRow="20"
                          :labelSearch="$t('common.search')"
                          lang="pt-BR"
                          @select="onInsertSelectEmojiSaudacao" />
                      </q-menu>
                    </q-btn>
                  </div>
                  <textarea ref="inputEnvioMensagemSaudacao"
                    id="inputEnvioMensagem"
                    style="min-height: 10vh; max-height: 15vh; flex: auto"
                    class="q-pa-sm bg-white"
                    :placeholder="$t('sessaoModalWhatsapp.typeMessage')"
                    autogrow
                    dense
                    outlined
                    @update:model-value="(v) => node.configurations.welcomeMessage.message = v.target.value"
                    :value="node.configurations.welcomeMessage.message" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card> -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 180px;">
          <div class="full-width bg-grey-3 text-bold row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.welcomeMessage') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.welcomeMessage2') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <div class="row">
              <div class="col">
                <label class="text-subtitle1 text-bold q-mb-sm"
                  for="inputEnvioMensagem"> {{ $t('nodeForm.message') }}: </label>

                <q-input
                  ref="inputEnvioMensagemSaudacao"
                  id="inputEnvioMensagem"
                  class="bg-white"
                  :placeholder="$t('sessaoModalWhatsapp.typeMessage')"
                  autogrow
                  dense
                  outlined
                  input-style="min-height: 5vh; max-height: 10vh;"
                  v-model="node.configurations.welcomeMessage.message"
                  @blur="syncOnBlur"
                  :value="node.configurations.welcomeMessage.message"
                >
                  <!-- Botão de Emoji dentro do Input -->
                  <template v-slot:append>
                    <q-btn round flat dense>
                      <q-icon size="1.5em" name="mdi-emoticon-happy-outline" />
                      <q-tooltip>{{ $t('nodeForm.emoji') }}</q-tooltip>
                      <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                        <VEmojiPicker style="width: 40vw"
                          :showSearch="false"
                          :emojisByRow="20"
                          :labelSearch="$t('common.search')"
                          lang="pt-BR"
                          @select="onInsertSelectEmojiSaudacao" />
                      </q-menu>
                    </q-btn>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- FALLBACK -->
        <!-- <q-card class="full-width q-my-sm"
          style="height: 300px;">
          <div class="full-width bg-grey-3 text-bold row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.fallbackMessage') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.fallbackMessage2') }}
            </div>
          </div>
          <q-card-section class="q-pa-sm">
            <div class="row ">
              <div class="col">
                <label class="text-subtitle1 text-bold q-mb-sm"
                  for="inputEnvioMensagem"> {{ $t('nodeForm.message2') }}: </label>
                <div class="flex flex-inline full-width items-center">
                  <div class="flex flex-inline text-left"
                    style="width: 40px">
                    <q-btn round
                      flat
                      dense>
                      <q-icon size="2em"
                        name="mdi-emoticon-happy-outline" />
                      <q-tooltip>
                        {{ $t('nodeForm.emoji') }}
                      </q-tooltip>
                      <q-menu anchor="top right"
                        self="bottom middle"
                        :offset="[5, 40]">
                        <VEmojiPicker style="width: 40vw"
                          :showSearch="false"
                          :emojisByRow="20"
                          :labelSearch="$t('common.search')"
                          lang="pt-BR"
                          @select="onInsertSelectEmojiNotOptionsSelectMessage" />
                      </q-menu>
                    </q-btn>
                  </div>
                  <textarea ref="inputEnvioMensagemnotOptionsSelectMessage"
                    id="inputEnvioMensagem"
                    style="min-height: 10vh; max-height: 15vh; flex: auto"
                    class="q-pa-sm bg-white"
                    :placeholder="$t('sessaoModalWhatsapp.typeMessage')"
                    autogrow
                    dense
                    outlined
                    @update:model-value="(v) => node.configurations.notOptionsSelectMessage.message = v.target.value"
                    :value="node.configurations.notOptionsSelectMessage.message" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card> -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 180px;">
          <div class="full-width bg-grey-3 text-bold row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.fallbackMessage') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.fallbackMessage2') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <div class="row">
              <div class="col">
                <label class="text-subtitle1 text-bold q-mb-sm"
                  for="inputEnvioMensagem"> {{ $t('nodeForm.message2') }}: </label>
                <q-input
                  ref="inputEnvioMensagemnotOptionsSelectMessage"
                  id="inputEnvioMensagem"
                  class="bg-white"
                  :placeholder="$t('sessaoModalWhatsapp.typeMessage')"
                  autogrow
                  dense
                  outlined
                  input-style="min-height: 5vh; max-height: 10vh;"
                  v-model="node.configurations.notOptionsSelectMessage.message"
                  @blur="syncOnBlur"
                  :value="node.configurations.notOptionsSelectMessage.message"
                >
                  <!-- Botão de Emoji dentro do Input -->
                  <template v-slot:append>
                    <q-btn round flat dense>
                      <q-icon size="1.5em" name="mdi-emoticon-happy-outline" />
                      <q-tooltip>{{ $t('nodeForm.emoji') }}</q-tooltip>
                      <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                        <VEmojiPicker style="width: 40vw"
                          :showSearch="false"
                          :emojisByRow="20"
                          :labelSearch="$t('common.search')"
                          lang="pt-BR"
                          @select="onInsertSelectEmojiNotOptionsSelectMessage" />
                      </q-menu>
                    </q-btn>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- KEYWORD -->
        <!-- <q-card class="full-width q-my-sm"
          style="height: 330px;" v-if="node.configurations.keyword">
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.keyWord') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.keyWord2') }}
              
            </div>
          </div>
          <q-card-section class="q-pa-sm">
            <div class="row q-mt-sm">
              <div class="col">
                <label class="text-subtitle1 text-bold q-mb-sm"
                  for="inputEnvioMensagem"> Palavra Gatilho: </label>
                <div class="flex flex-inline full-width items-center">
                <textarea ref="inputEnvioMensagemGatilho"
                  id="inputEnvioMensagem"
                  style="min-height: 10vh; max-height: 15vh; flex: auto"
                  class="q-pa-sm bg-white"
                  :placeholder="$t('nodeForm.placeholders.keyword')"
                  autogrow
                  dense
                  outlined
                  @update:model-value="(v) => node.configurations.keyword.message = v.target.value"
                  :value="node.configurations.keyword.message" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card> -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 150px;" 
          v-if="node.configurations.keyword">
          
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.keyWord') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.keyWord2') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <div class="row q-mt-none">
              <div class="col">
                <label class="text-subtitle1 text-bold q-mb-sm"
                  for="inputEnvioMensagem"> Palavra Gatilho: </label>

                <q-input
                  ref="inputEnvioMensagemGatilho"
                  id="inputEnvioMensagem"
                  class="bg-white"
                  :placeholder="$t('nodeForm.placeholders.keyword')"
                  autogrow
                  dense
                  outlined
                  input-style="min-height: 5vh; max-height: 10vh;"
                  v-model="node.configurations.keyword.message"
                  @blur="syncOnBlur"
                  :value="node.configurations.keyword.message"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- NO ANSWER -->
        <!-- <q-card class="full-width q-my-sm"
          style="height: 290px;">
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.noAnswer') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.noAnswer2') }}
            </div>
          </div>
          <q-card-section class="q-pa-sm">
            <div class="row q-mt-sm">
              <div class="col">
                <q-input dense
                  outlined
                  mask="###"
                  v-model.number="node.configurations.notResponseMessage.time"
                  :label="$t('nodeForm.labels.time')" />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col">
                <q-option-group class="text-center"
                  inline
                  v-model="node.configurations.notResponseMessage.type"
                  :options="[
                    { value: 1, label: $t('nodeForm.options.routeTo.queue') },
                    { value: 2, label: $t('nodeForm.options.routeTo.user') },
                    { value: 3, label: $t('nodeForm.options.routeTo.close') },
                    { value: 4, label: $t('nodeForm.options.routeTo.channel') },
                  ]"
                  color="primary" />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col">
                <q-select v-if="node.configurations.notResponseMessage.type === 1"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.notResponseMessage.destiny"
                  :options="filas"
                  option-label="queue"
                  option-value="id"
                  :label="$t('nodeForm.labels.queue')"
                  map-options
                  emit-value
                  clearable />
                <q-select v-if="node.configurations.notResponseMessage.type === 2"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.notResponseMessage.destiny"
                  :options="usuarios"
                  option-label="name"
                  option-value="id"
                  :label="$t('sessaoModalWhatsapp.user')"
                  map-options
                  emit-value
                  clearable />
                <q-select v-if="node.configurations.notResponseMessage.type === 4"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.notResponseMessage.destiny"
                  :options="cSessionsOptions"
                  label="Canal"
                  map-options
                  clearable />
              </div>
            </div>
          </q-card-section>
        </q-card> -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 150px;">
          
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.noAnswer') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.noAnswer2') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <div class="row q-mt-none">
              <div class="col">
                <q-input dense
                  outlined
                  mask="###"
                  v-model.number="node.configurations.notResponseMessage.time"
                  :label="$t('nodeForm.labels.time')" />
              </div>
            </div>

            <div class="row q-mt-none">
              <div class="col">
                <q-option-group class="text-center"
                  inline
                  dense
                  v-model="node.configurations.notResponseMessage.type"
                  :options="[  
                    { value: 1, label: $t('nodeForm.options.routeTo.queue') },
                    { value: 2, label: $t('nodeForm.options.routeTo.user') },
                    { value: 3, label: $t('nodeForm.options.routeTo.close') },
                    { value: 4, label: $t('nodeForm.options.routeTo.channel') },
                  ]"
                  color="primary" />
              </div>
            </div>

            <div class="row q-mt-none">
              <div class="col">
                <q-select v-if="node.configurations.notResponseMessage.type === 1"
                  dense
                  outlined
                  v-model="node.configurations.notResponseMessage.destiny"
                  :options="filas"
                  option-label="queue"
                  option-value="id"
                  :label="$t('nodeForm.labels.queue')"
                  map-options
                  emit-value
                  clearable />

                <q-select v-if="node.configurations.notResponseMessage.type === 2"
                  dense
                  outlined
                  v-model="node.configurations.notResponseMessage.destiny"
                  :options="usuarios"
                  option-label="name"
                  option-value="id"
                  :label="$t('sessaoModalWhatsapp.user')"
                  map-options
                  emit-value
                  clearable />

                <q-select v-if="node.configurations.notResponseMessage.type === 4"
                  dense
                  outlined
                  v-model="node.configurations.notResponseMessage.destiny"
                  :options="cSessionsOptions"
                  label="Canal"
                  map-options
                  clearable />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- MENSAGEM NO ANSWER -->
        <!-- <q-card class="full-width q-my-sm"
          style="height: 290px;"
          v-if="node.type === 'configurations'">
          <q-card class="full-width q-my-sm"
            style="height: 280px;">
            <div class="full-width bg-grey-3 text-bold row col justify-between text-left q-pa-md">
              {{ $t('nodeForm.hourMessage') }}
              <div class="row text-subtitle2">
                {{ $t('nodeForm.hourMessage2') }}
              </div>
            </div>
            <q-card-section class="q-pa-sm">
              <div class="row ">
                <div class="col">
                  <label class="text-subtitle1 text-bold q-mb-sm"
                    for="inputEnvioMensagem"> {{ $t('nodeForm.message') }}: </label>
                  <div class="flex flex-inline full-width items-center">
                    <div class="flex flex-inline text-left"
                      style="width: 40px">
                      <q-btn round
                        flat
                        dense>
                        <q-icon size="2em"
                          name="mdi-emoticon-happy-outline" />
                        <q-tooltip>
                          {{ $t('nodeForm.emoji') }}
                        </q-tooltip>
                        <q-menu anchor="top right"
                          self="bottom middle"
                          :offset="[5, 40]">
                          <VEmojiPicker style="width: 40vw"
                            :showSearch="false"
                            :emojisByRow="20"
                            :labelSearch="$t('common.search')"
                            lang="pt-BR"
                            @select="onInsertSelectEmojiTempo" />
                        </q-menu>
                      </q-btn>
                    </div>
                    <textarea ref="inputEnvioMensagemTempo"
                      id="inputEnvioMensagem"
                      style="min-height: 10vh; max-height: 15vh; flex: auto"
                      class="q-pa-sm bg-white"
                      :placeholder="$t('sessaoModalWhatsapp.typeMessage')"
                      autogrow
                      dense
                      outlined
                      @update:model-value="(v) => node.configurations.notResponseMessage.message = v.target.value"
                      :value="node.configurations.notResponseMessage.message" />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-card> -->
        
        <!-- MENSAGEM NO ANSWER WARNING -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 150px;"
          v-if="node.type === 'configurations'">

          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.hourMessageWarning') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.hourMessageWarning2') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <!-- Checkbox para habilitar/desabilitar a mensagem de aviso -->
            <div class="row q-mb-md">
              <div class="col">
                <q-checkbox
                  v-model="node.configurations.notResponseMessage.messageWarningEnabled"
                  :label="$t('nodeForm.messageWarningEnabled')"
                  @update:model-value="syncOnBlur"
                  color="primary"
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <label class="text-subtitle1 text-bold q-mb-sm"
                  for="inputEnvioMensagem"> {{ $t('nodeForm.message') }}: </label>

                <q-input
                  ref="inputEnvioMensagemWarning"
                  id="inputEnvioMensagem"
                  class="bg-white"
                  :placeholder="$t('sessaoModalWhatsapp.typeMessage')"
                  autogrow
                  dense
                  outlined
                  input-style="min-height: 5vh; max-height: 10vh;"
                  v-model="node.configurations.notResponseMessage.messageWarning"
                  @blur="syncOnBlur"
                  :value="node.configurations.notResponseMessage.messageWarning"
                >
                  <!-- Botão de Emoji dentro do Input -->
                  <template v-slot:append>
                    <q-btn round flat dense>
                      <q-icon size="1.5em" name="mdi-emoticon-happy-outline" />
                      <q-tooltip>{{ $t('nodeForm.emoji') }}</q-tooltip>
                      <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                        <VEmojiPicker style="width: 40vw"
                          :showSearch="false"
                          :emojisByRow="20"
                          :labelSearch="$t('common.search')"
                          lang="pt-BR"
                          @select="onInsertSelectEmojiWarning" />
                      </q-menu>
                    </q-btn>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- MENSAGEM NO ANSWER -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 150px;"
          v-if="node.type === 'configurations'">

          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.hourMessage') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.hourMessage2') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <div class="row">
              <div class="col">
                <label class="text-subtitle1 text-bold q-mb-sm"
                  for="inputEnvioMensagem"> {{ $t('nodeForm.message') }}: </label>

                <q-input
                  ref="inputEnvioMensagemTempo"
                  id="inputEnvioMensagem"
                  class="bg-white"
                  :placeholder="$t('sessaoModalWhatsapp.typeMessage')"
                  autogrow
                  dense
                  outlined
                  input-style="min-height: 5vh; max-height: 10vh;"
                  v-model="node.configurations.notResponseMessage.message"
                  @blur="syncOnBlur"
                  :value="node.configurations.notResponseMessage.message"
                >
                  <!-- Botão de Emoji dentro do Input -->
                  <template v-slot:append>
                    <q-btn round flat dense>
                      <q-icon size="1.5em" name="mdi-emoticon-happy-outline" />
                      <q-tooltip>{{ $t('nodeForm.emoji') }}</q-tooltip>
                      <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                        <VEmojiPicker style="width: 40vw"
                          :showSearch="false"
                          :emojisByRow="20"
                          :labelSearch="$t('common.search')"
                          lang="pt-BR"
                          @select="onInsertSelectEmojiTempo" />
                      </q-menu>
                    </q-btn>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- MAX ATTEMPTS -->
        <!-- <q-card class="full-width q-my-sm"
          style="height: 330px;">
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.maxAttempts') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.maxAttempts2') }}
            </div>
          </div>
          <q-card-section class="q-pa-sm">
            <div class="row q-mt-sm">
              <div class="col">
                <q-input dense
                  outlined
                  mask="##"
                  v-model.number="node.configurations.maxRetryBotMessage.number"
                  :label="$t('nodeForm.labels.timesAttempted')" />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col">
                <q-option-group class="text-center"
                  inline
                  v-model="node.configurations.maxRetryBotMessage.type"
                  :options="[
                    { value: 1, label: $t('nodeForm.options.routeTo.queue') },
                    { value: 2, label: $t('nodeForm.options.routeTo.user') },
                    { value: 3, label: $t('nodeForm.options.routeTo.close') },
                    { value: 4, label: $t('nodeForm.options.routeTo.channel') },
                  ]"
                  color="primary" />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col">
                <q-select v-if="node.configurations.maxRetryBotMessage.type === 1"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.maxRetryBotMessage.destiny"
                  :options="filas"
                  option-label="queue"
                  option-value="id"
                  :label="$t('nodeForm.labels.queue')"
                  map-options
                  emit-value
                  clearable />
                <q-select v-if="node.configurations.maxRetryBotMessage.type === 2"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.maxRetryBotMessage.destiny"
                  :options="usuarios"
                  option-label="name"
                  option-value="id"
                  :label="$t('sessaoModalWhatsapp.user')"
                  map-options
                  emit-value
                  clearable />
                <q-select v-if="node.configurations.maxRetryBotMessage.type === 4"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.maxRetryBotMessage.destiny"
                  :options="cSessionsOptions"
                  label="Canal"
                  map-options
                  clearable />
              </div>
            </div>
          </q-card-section>
        </q-card> -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 150px;">
          
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.maxAttempts') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.maxAttempts2') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <div class="row q-mt-none">
              <div class="col">
                <q-input dense
                  outlined
                  mask="##"
                  v-model.number="node.configurations.maxRetryBotMessage.number"
                  :label="$t('nodeForm.labels.timesAttempted')" />
              </div>
            </div>

            <div class="row q-mt-none">
              <div class="col">
                <q-option-group class="text-center"
                  inline
                  dense
                  v-model="node.configurations.maxRetryBotMessage.type"
                  :options="[  
                    { value: 1, label: $t('nodeForm.options.routeTo.queue') },
                    { value: 2, label: $t('nodeForm.options.routeTo.user') },
                    { value: 3, label: $t('nodeForm.options.routeTo.close') },
                    { value: 4, label: $t('nodeForm.options.routeTo.channel') },
                  ]"
                  color="primary" />
              </div>
            </div>

            <div class="row q-mt-none">
              <div class="col">
                <q-select v-if="node.configurations.maxRetryBotMessage.type === 1"
                  dense
                  outlined
                  v-model="node.configurations.maxRetryBotMessage.destiny"
                  :options="filas"
                  option-label="queue"
                  option-value="id"
                  :label="$t('nodeForm.labels.queue')"
                  map-options
                  emit-value
                  clearable />

                <q-select v-if="node.configurations.maxRetryBotMessage.type === 2"
                  dense
                  outlined
                  v-model="node.configurations.maxRetryBotMessage.destiny"
                  :options="usuarios"
                  option-label="name"
                  option-value="id"
                  :label="$t('sessaoModalWhatsapp.user')"
                  map-options
                  emit-value
                  clearable />

                <q-select v-if="node.configurations.maxRetryBotMessage.type === 4"
                  dense
                  outlined
                  v-model="node.configurations.maxRetryBotMessage.destiny"
                  :options="cSessionsOptions"
                  label="Canal"
                  map-options
                  clearable />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- FIRST INTERACTION -->
        <!-- <q-card class="full-width q-my-sm"
          style="height: 330px;" v-if="node.configurations.firstInteraction">
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.firstInteraction') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.firstInteraction2') }}
            </div>
          </div>
          <q-card-section class="q-pa-sm">
            <div class="row q-mt-sm">
              <div class="col">
                <q-option-group class="text-center"
                  inline
                  v-model="node.configurations.firstInteraction.type"
                  :options="[
                    { value: 1, label: $t('nodeForm.options.routeTo.queue') },
                    { value: 2, label: $t('nodeForm.options.routeTo.user') },
                    { value: 3, label: $t('nodeForm.options.routeTo.close') },
                    { value: 4, label: 'Canal' }
                  ]"
                  color="primary" />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col">
                <q-select v-if="node.configurations.firstInteraction.type === 1"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.firstInteraction.destiny"
                  :options="filas"
                  option-label="queue"
                  option-value="id"
                  :label="$t('nodeForm.labels.queue')"
                  map-options
                  emit-value
                  clearable />
                <q-select v-if="node.configurations.firstInteraction.type === 2"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.firstInteraction.destiny"
                  :options="usuarios"
                  option-label="name"
                  option-value="id"
                  :label="$t('sessaoModalWhatsapp.user')"
                  map-options
                  emit-value
                  clearable />
                <q-select v-if="node.configurations.firstInteraction.type === 4"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.firstInteraction.destiny"
                  :options="cSessionsOptions"
                  label="Canal"
                  map-options
                  clearable />
              </div>
            </div>
          </q-card-section>
        </q-card> -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 150px;"
          v-if="node.configurations.firstInteraction">
          
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.firstInteraction') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.firstInteraction2') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <div class="row q-mt-none">
              <div class="col">
                <q-option-group class="text-center"
                  inline
                  dense
                  v-model="node.configurations.firstInteraction.type"
                  :options="[  
                    { value: 1, label: $t('nodeForm.options.routeTo.queue') },
                    { value: 2, label: $t('nodeForm.options.routeTo.user') },
                    { value: 3, label: $t('nodeForm.options.routeTo.close') },
                    { value: 4, label: 'Canal' }
                  ]"
                  color="primary" />
              </div>
            </div>

            <div class="row q-mt-none">
              <div class="col">
                <q-select v-if="node.configurations.firstInteraction.type === 1"
                  dense
                  outlined
                  v-model="node.configurations.firstInteraction.destiny"
                  :options="filas"
                  option-label="queue"
                  option-value="id"
                  :label="$t('nodeForm.labels.queue')"
                  map-options
                  emit-value
                  clearable />

                <q-select v-if="node.configurations.firstInteraction.type === 2"
                  dense
                  outlined
                  v-model="node.configurations.firstInteraction.destiny"
                  :options="usuarios"
                  option-label="name"
                  option-value="id"
                  :label="$t('sessaoModalWhatsapp.user')"
                  map-options
                  emit-value
                  clearable />

                <q-select v-if="node.configurations.firstInteraction.type === 4"
                  dense
                  outlined
                  v-model="node.configurations.firstInteraction.destiny"
                  :options="cSessionsOptions"
                  label="Canal"
                  map-options
                  clearable />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- FORA HORA -->
        <!-- <q-card class="full-width q-my-sm"
          style="height: 330px;" v-if="node.configurations.outOpenHours">
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.outBussinesHour') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.outBussinesHour2') }}
            </div>
          </div>
          <q-card-section class="q-pa-sm">
            <div class="row q-mt-sm">
              <div class="col">
                <q-option-group class="text-center"
                  inline
                  v-model="node.configurations.outOpenHours.type"
                  :options="[
                    { value: 1, label: $t('nodeForm.options.routeTo.queue') },
                    { value: 2, label: $t('nodeForm.options.routeTo.user') },
                    { value: 3, label: $t('nodeForm.options.routeTo.close') },
                    { value: 4, label: $t('nodeForm.options.routeTo.channel') },
                  ]"
                  color="primary" />
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col">
                <q-select v-if="node.configurations.outOpenHours.type === 1"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.outOpenHours.destiny"
                  :options="filas"
                  option-label="queue"
                  option-value="id"
                  :label="$t('nodeForm.labels.queue')"
                  map-options
                  emit-value
                  clearable />
                <q-select v-if="node.configurations.outOpenHours.type === 2"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.outOpenHours.destiny"
                  :options="usuarios"
                  option-label="name"
                  option-value="id"
                  :label="$t('sessaoModalWhatsapp.user')"
                  map-options
                  emit-value
                  clearable />
                <q-select v-if="node.configurations.outOpenHours.type === 4"
                  dense
                  outlined
                  class="full-width"
                  v-model="node.configurations.outOpenHours.destiny"
                  :options="cSessionsOptions"
                  label="Canal"
                  map-options
                  clearable />  
              </div>
            </div>
          </q-card-section>
        </q-card> -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 150px;" 
          v-if="node.configurations.outOpenHours">
          
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.outBussinesHour') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.outBussinesHour2') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <div class="row q-mt-none">
              <div class="col">
                <q-option-group class="text-center"
                  inline
                  dense
                  v-model="node.configurations.outOpenHours.type"
                  :options="[  
                    { value: 1, label: $t('nodeForm.options.routeTo.queue') },
                    { value: 2, label: $t('nodeForm.options.routeTo.user') },
                    { value: 3, label: $t('nodeForm.options.routeTo.close') },
                    { value: 4, label: $t('nodeForm.options.routeTo.channel') },
                  ]"
                  color="primary" />
              </div>
            </div>

            <div class="row q-mt-none">
              <div class="col">
                <q-select v-if="node.configurations.outOpenHours.type === 1"
                  dense
                  outlined
                  v-model="node.configurations.outOpenHours.destiny"
                  :options="filas"
                  option-label="queue"
                  option-value="id"
                  :label="$t('nodeForm.labels.queue')"
                  map-options
                  emit-value
                  clearable />

                <q-select v-if="node.configurations.outOpenHours.type === 2"
                  dense
                  outlined
                  v-model="node.configurations.outOpenHours.destiny"
                  :options="usuarios"
                  option-label="name"
                  option-value="id"
                  :label="$t('sessaoModalWhatsapp.user')"
                  map-options
                  emit-value
                  clearable />

                <q-select v-if="node.configurations.outOpenHours.type === 4"
                  dense
                  outlined
                  v-model="node.configurations.outOpenHours.destiny"
                  :options="cSessionsOptions"
                  label="Canal"
                  map-options
                  clearable />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- AUTO DISTRIBUIR -->
        <!-- <q-card class="full-width q-my-sm"
          style="height: 330px;">
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.selfDistribution') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.selfDistribution2') }}
              <br />
              {{ $t('nodeForm.selfDistribution3') }}
              <br />
              {{ $t('nodeForm.selfDistribution7') }}
            </div>
          </div>
          <q-card-section class="q-pa-sm">
            <div class="row q-mt-sm">
              <div class="col">
                <q-option-group class="text-center"
                  inline
                  v-model="node.configurations.autoDistributeTickets"
                  :options="[
                    { value: 'N', label: $t('nodeForm.selfDistribution4') },
                    { value: 'R', label: $t('nodeForm.selfDistribution5') },
                    { value: 'B', label: $t('nodeForm.selfDistribution6') }
                  ]"
                  color="primary" />
              </div>
            </div>
          </q-card-section>
        </q-card> -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 150px;">
          
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.selfDistribution') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.selfDistribution2') }} <br />
              {{ $t('nodeForm.selfDistribution3') }} <br />
              {{ $t('nodeForm.selfDistribution7') }} <br />
              {{ $t('nodeForm.selfDistribution9') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <div class="row q-mt-none">
              <div class="col">
                <q-option-group class="text-center"
                  inline
                  dense
                  v-model="node.configurations.autoDistributeTickets"
                  :options="[
                    { value: 'N', label: $t('nodeForm.selfDistribution4') },
                    { value: 'R', label: $t('nodeForm.selfDistribution5') },
                    { value: 'B', label: $t('nodeForm.selfDistribution6') },
                    { value: 'S', label: $t('nodeForm.selfDistribution8') }
                  ]"
                  color="primary" />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- CLOSE TOCKET -->
        <!-- <q-card class="full-width q-my-sm"
          style="height: 330px;">
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.closeTicket') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.closeTicket2') }}
            </div>
          </div>
          <q-card-section class="q-pa-sm">
            <div class="row q-mt-sm">
              <div class="col">
                <q-select dense
                  label="Parâmetros"
                  outlined
                  v-model="node.configurations.answerCloseTicket"
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                  :hint="$t('nodeForm.hints.typeValue')" />
              </div>
            </div>
          </q-card-section>
        </q-card> -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 150px;">
          <div class="full-width bg-grey-3 text-bold text-body1 row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.closeTicket') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.closeTicket2') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <div class="row q-mt-none">
              <div class="col">
                <q-select dense
                  label="Parâmetros"
                  outlined
                  v-model="node.configurations.answerCloseTicket"
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                  :hint="$t('nodeForm.hints.typeValue')" />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- END MESSAGE -->
        <!-- <q-card class="full-width q-my-sm"
          style="height: 290px;"
          v-if="node.type === 'configurations'">
          <q-card class="full-width q-my-sm"
            style="height: 280px;">
            <div class="full-width bg-grey-3 text-bold row col justify-between text-left q-pa-md">
              {{ $t('nodeForm.endMessage') }}
              <div class="row text-subtitle2">
                {{ $t('nodeForm.endMessage2') }}
              </div>
            </div>
            <q-card-section class="q-pa-sm">
              <div class="row ">
                <div class="col">
                  <label class="text-subtitle1 text-bold q-mb-sm"
                    for="inputEnvioMensagem"> {{ $t('nodeForm.message') }}: </label>
                  <div class="flex flex-inline full-width items-center">
                    <div class="flex flex-inline text-left"
                      style="width: 40px">
                      <q-btn round
                        flat
                        dense>
                        <q-icon size="2em"
                          name="mdi-emoticon-happy-outline" />
                        <q-tooltip>
                          {{ $t('nodeForm.emoji') }}
                        </q-tooltip>
                        <q-menu anchor="top right"
                          self="bottom middle"
                          :offset="[5, 40]">
                          <VEmojiPicker style="width: 40vw"
                            :showSearch="false"
                            :emojisByRow="20"
                            :labelSearch="$t('common.search')"
                            lang="pt-BR"
                            @select="onInsertSelectEmojincerramento" />
                        </q-menu>
                      </q-btn>
                    </div>
                    <textarea ref="inputEnvioMensagemEncerramento"
                      id="inputEnvioMensagem"
                      style="min-height: 10vh; max-height: 15vh; flex: auto"
                      class="q-pa-sm bg-white"
                      :placeholder="$t('sessaoModalWhatsapp.typeMessage')"
                      autogrow
                      dense
                      outlined
                      @update:model-value="(v) => node.configurations.farewellMessage.message = v.target.value"
                      :value="node.configurations.farewellMessage.message" />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-card> -->
        <q-card class="full-width q-my-sm"
          style="height: auto; min-height: 180px;"
          v-if="node.type === 'configurations'">

          <div class="full-width bg-grey-3 text-bold row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.endMessage') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.endMessage2') }}
            </div>
          </div>

          <q-card-section class="q-pa-sm">
            <div class="row">
              <div class="col">
                <label class="text-subtitle1 text-bold q-mb-sm"
                  for="inputEnvioMensagem"> {{ $t('nodeForm.message') }}: </label>
                <q-input
                  ref="inputEnvioMensagemEncerramento"
                  id="inputEnvioMensagem"
                  class="bg-white"
                  :placeholder="$t('sessaoModalWhatsapp.typeMessage')"
                  autogrow
                  dense
                  outlined
                  input-style="min-height: 5vh; max-height: 10vh;"
                  v-model="node.configurations.farewellMessage.message"
                  @blur="syncOnBlur"
                  :value="node.configurations.farewellMessage.message"
                >
                  <!-- Botão de Emoji dentro do Input -->
                  <template v-slot:append>
                    <q-btn round flat dense>
                      <q-icon size="1.5em" name="mdi-emoticon-happy-outline" />
                      <q-tooltip>{{ $t('nodeForm.emoji') }}</q-tooltip>
                      <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                        <VEmojiPicker style="width: 40vw"
                          :showSearch="false"
                          :emojisByRow="20"
                          :labelSearch="$t('common.search')"
                          lang="pt-BR"
                          @select="onInsertSelectEmojincerramento" />
                      </q-menu>
                    </q-btn>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>

      </q-card-section>

      <!-- INFOS -->
      <!-- <q-card-section style="height: calc(100vh - 200px)"
        class="row bg-grey-3 q-pa-sm scroll col justify-start"
        v-if="node.type === 'start'">
        <q-card class="full-width q-my-sm">
          <div class="full-width bg-grey-3 text-bold row col justify-between text-left q-pa-md">
            {{ $t('nodeForm.warning1') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.warning2') }}
              {{ $t('nodeForm.warning3') }}
            </div>
            <div class="row text-subtitle2">
              {{ $t('nodeForm.warning4') }}
            </div>
            <div class="row text-subtitle2">
              {{ $t('nodeForm.warning5') }}
            </div>
          </div>
        </q-card>
      </q-card-section> -->
      <q-card-section 
        :class="['row', 'bg-grey-3', 'q-pa-sm', inModal ? '' : 'scroll', 'col', 'justify-start']"
        :style="inModal ? 'max-height: none; overflow: visible;' : 'height: calc(100vh - 500px)'"
        v-if="node.type === 'start'">

        <q-card class="full-width q-my-none">
          <div class="full-width bg-grey-3 text-bold row col justify-between text-left q-pa-sm">
            {{ $t('nodeForm.warning1') }}
            <div class="row text-subtitle2">
              {{ $t('nodeForm.warning2') }} <br />
              {{ $t('nodeForm.warning3') }} <br />
              {{ $t('nodeForm.warning4') }} <br />
              {{ $t('nodeForm.warning5') }} <br />
              {{ $t('nodeForm.warning6') }} <br />
              {{ $t('nodeForm.warning7') }} <br />
            </div>
          </div>
        </q-card>
      </q-card-section>

    </q-card>
  </div>
</template>

<script>
import { uid } from 'quasar'
import { cloneDeep } from 'lodash'
import MessageField from './messageField.vue'
import WebhookField from './webhookField.vue'
import WebhookAllField from './webhookAllField.vue'
import ChatFlowField from './chatflowField.vue'
// import MessageOptionsField from './messageOptionsField.vue'
import MediaField from './mediaField.vue'
import DelayField from './delayField.vue'
import N8nField from './n8nField.vue'
import TagField from './tagField.vue'
import TypebotField from './typebotField.vue'
import ChatGPTField from './chatgptField.vue'
import KanbanField from './kanbanField.vue'
import ChatBotBlockField from './chatBotBlockField.vue'
import OpportunityField from './opportunityField.vue'
import GoogleAgendaField from './googleAgendaField.vue'
import ScheduleField from './scheduleField.vue'
import ReasonsField from './reasonsField.vue'
import SmsField from './smsField.vue'
import VapiField from './vapiField.vue'
import NotesField from './notesField.vue'
import { VEmojiPicker } from 'src/components/VEmojiPicker.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    MessageField,
    VEmojiPicker,
    // MessageOptionsField,
    MediaField,
    DelayField,
    N8nField,
    TagField,
    TypebotField,
    WebhookField,
    ChatFlowField,
    ChatGPTField,
    KanbanField,
    ChatBotBlockField,
    OpportunityField,
    GoogleAgendaField,
    ScheduleField,
    WebhookAllField,
    ReasonsField,
    SmsField,
    VapiField,
    NotesField
  },
  props: {
    nodesList: {
      type: Object,
      default: () => { }
    },
    filas: {
      type: Array,
      default: () => []
    },
    usuarios: {
      type: Array,
      default: () => []
    },
    hideToolbar: {
      type: Boolean,
      default: false
    },
    inModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isFullScreen: false,
      // onInsertSelectEmojincerramento: '',
      visible: true,
      tabNodeForm: 'interacoes',
      elements: [],
      optionsAcao: [
        { value: 0, label: 'Etapa' },
        { value: 1, label: this.$t('nodeForm.options.routeTo.queue') },
        { value: 2, label: this.$t('nodeForm.options.routeTo.user') },
        { value: 3, label: this.$t('nodeForm.options.routeTo.close') },
        { value: 4, label: 'Canal' }
      ],
      optionsSe: [
        { label: 'Qualquer resposta', value: 'US' },
        { label: 'Respostas', value: 'R' }
      ],
      optionsComparisonType: [
        { label: this.$t('nodeForm.optionsComparisonType.equals'), value: 'equals' },
        { label: this.$t('nodeForm.optionsComparisonType.contains'), value: 'contains' },
        { label: this.$t('nodeForm.optionsComparisonType.startsWith'), value: 'startsWith' },
        { label: this.$t('nodeForm.optionsComparisonType.endsWith'), value: 'endsWith' },
        { label: this.$t('nodeForm.optionsComparisonType.regex'), value: 'regex' }
      ],
      // Opções para tipos de variável
      optionsVariableType: [
        { label: this.$t('nodeForm.optionsVariableType.text'), value: 'text' },
        { label: this.$t('nodeForm.optionsVariableType.number'), value: 'number' },
        // { label: 'Email', value: 'email' },
        // { label: 'Telefone', value: 'phone' },
        // { label: 'Data', value: 'date' },
        // { label: 'Personalizado', value: 'custom' }
      ],
      // node 或 line
      type: 'node',
      node: {},
      line: {},
      data: {},
      stateList: [{
        state: 'success',
        label: '成功'
      }, {
        state: 'warning',
        label: '警告'
      }, {
        state: 'error',
        label: '错误'
      }, {
        state: 'running',
        label: '运行中'
      }],
      // Sistema de gerenciamento de memória
      timers: [],
      // Timeout para sincronização debounced
      syncTimeout: null,
      // Cache para elementos em edição
      elementCache: new Map()
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
      // Limpar timeout de sincronização
      if (this.syncTimeout) {
        clearTimeout(this.syncTimeout);
        this.syncTimeout = null;
      }
    },
    cleanupMemory() {
      this.clearAllTimers();
      // Limpar cache de elementos
      this.elementCache.clear();
    },
    formatType(type) {
      const types = {
        'MessageField': this.$t('nodeForm.MessageField'),
        'WebhookField': this.$t('nodeForm.WebhookField'),
        'WebhookAllField': this.$t('nodeForm.WebhookAllField'),
        'TypebotField': this.$t('nodeForm.TypebotField'),
        'ChatGPTField': this.$t('nodeForm.ChatGPTField'),
        'MediaField': this.$t('nodeForm.MediaField'),
        'KanbanField': this.$t('nodeForm.KanbanField'),
        'ChatBotBlockField': this.$t('nodeForm.ChatBotBlockField'),
        'OpportunityField': this.$t('nodeForm.OpportunityField'),
        'GoogleAgendaField': this.$t('nodeForm.GoogleAgendaField'),
        'ScheduleField': this.$t('nodeForm.ScheduleField'),
        'ReasonsField': this.$t('nodeForm.ReasonsField'),
        'SmsField': this.$t('nodeForm.SmsField'),
        'VapiField': this.$t('nodeForm.VapiField'),
        'NotesField': this.$t('nodeForm.NotesField'),
        'TagField': this.$t('nodeForm.TagField'),
        'DelayField': this.$t('nodeForm.DelayField'),
        'N8nField': this.$t('nodeForm.N8nField'),
        'ChatFlowField': this.$t('nodeForm.ChatFlowField')
      };
      return types[type] || type;
    },
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
      this.$emit("toggleFullScreen", this.isFullScreen);
    },
    gerarUID () {
      return uid()
    },
    addMessage () {
      this.node.interactions.push({
        type: 'MessageField',
        data: { message: '' },
        id: this.gerarUID()
      })
    },
    addWebhook () {
      this.node.interactions.push({
        type: 'WebhookField',
        data: { webhook: '' },
        id: this.gerarUID()
      })
    },
    addWebhookAll () {
      this.node.interactions.push({
        type: 'WebhookAllField',
        data: {
          webhookUrl: '',
          httpMethod: 'POST',
          headers: [],
          bodyType: 'json',
          bodyContent: '',
          timeout: 10000,
          retryAttempts: 0,
          retryDelay: 5000
        },
        id: this.gerarUID()
      })
    },
    addNewFlow () {
      this.node.interactions.push({
        type: 'ChatFlowField',
        data: { chatFlow: null },
        id: this.gerarUID()
      })
    },
    addMediaField () {
      this.node.interactions.push({
        type: 'MediaField',
        data: {
          ext: '',
          mediaUrl: '',
          media: '',
          type: '',
          name: '',
          caption: ''
        },
        id: this.gerarUID()
      })
    },
    addDelay () {
      this.node.interactions.push({
        type: 'DelayField',
        data: { time: null },
        id: this.gerarUID()
      })
    },
    addN8n () {
      this.node.interactions.push({
        type: 'N8nField',
        data: { n8nfield: '' },
        id: this.gerarUID()
      })
    },
    addTypebot () {
      this.node.interactions.push({
        type: 'TypebotField',
        data: { typebotUrl: '', typebotName: '', typebotOff: '', typebotRestart: '' },
        id: this.gerarUID()
      })
    },
    addChatGPT () {
      this.node.interactions.push({
        type: 'ChatGPTField',
        data: { chatgptApiKey: '', chatgptOrgId: '', chatgptOff: '', chatgptPrompt: '' },
        id: this.gerarUID()
      })
    },
    addTags () {
      this.node.interactions.push({
        type: 'TagField',
        data: { tag: null },
        id: this.gerarUID()
      })
    },
    addKanbans () {
      this.node.interactions.push({
        type: 'KanbanField',
        data: { kanban: null },
        id: this.gerarUID()
      })
    },
    addChatBotBlock () {
      this.node.interactions.push({
        type: 'ChatBotBlockField',
        data: { chatbotBlocked: false },
        id: this.gerarUID()
      })
    },
    addOpportunity () {
      this.node.interactions.push({
        type: 'OpportunityField',
        data: {
          name: '',
          stageId: '',
          responsibleId: '',
          value: 0,
          closingForecast: '',
          opportunityStatus: 'open',
          opportunityDescription: '',
          pipelineId: ''
        },
        id: this.gerarUID()
      })
    },
    addGoogleAgenda () {
      this.node.interactions.push({
        type: 'GoogleAgendaField',
        data: {
          googleConfigId: '',
          eventSummary: '',
          eventStartDateTime: '',
          eventEndDateTime: '',
          eventDescription: '',
          eventLocation: '',
          eventAttendees: '',
          sendNotifications: true,
          reminderBefore: false,
          reminderMinutes: 15
        },
        id: this.gerarUID()
      })
    },
    addSchedule () {
      this.node.interactions.push({
        type: 'ScheduleField',
        data: {
          scheduleType: 'custom',
          scheduleDate: '',
          scheduleMessage: '',
          sendSignature: true,
          includeContactInfo: false,
          delayBeforeSend: 0
        },
        id: this.gerarUID()
      })
    },
    addReasons () {
      this.node.interactions.push({
        type: 'ReasonsField',
        data: {
          reasonId: null
        },
        id: this.gerarUID()
      })
    },
    addSMS () {
      this.node.interactions.push({
        type: 'SmsField',
        data: {
          smsMessage: '',
          smsService: ''
        },
        id: this.gerarUID()
      })
    },
    addVapi () {
      this.node.interactions.push({
        type: 'VapiField',
        data: {
          assistantId: '',
          phoneNumberId: '',
          customerNumber: ''
        },
        id: this.gerarUID()
      })
    },
    addNotes () {
      this.node.interactions.push({
        type: 'NotesField',
        data: {
          notes: ''
        },
        id: this.gerarUID()
      })
    },
    addCondiction () {
      this.node.conditions.push({
        type: '',
        condition: [],
        comparisonType: 'equals', // Tipo de comparação padrão para respostas
        id: this.gerarUID()
      })
    },
    changePosition (arr, from, to) {
      arr.splice(to, 0, arr.splice(from, 1)[0])
      return arr
    },
    addNode () {
      const nodeMenu = {
        id: this.gerarUID(),
        nodeId: this.gerarUID(),
        name: 'Nova etapa',
        type: 'node',
        left: '100px',
        top: '40px',
        interactions: [],
        conditions: [],
        actions: [],
        variableKey: '', // Chave da variável para capturar no passo
        variableLabel: '', // Nome amigável da variável (comentado)
        variableType: 'text', // Tipo da variável
        variableValidation: '' // Validação personalizada (comentado)
        // ico: 'el-icon-present'
      }
      const evt = {
        originalEvent: {
          clientX: '100px',
          clientY: '10px'
        }
      }

      this.$emit('addNode', evt, nodeMenu, null)
    },
    removeConditionItem (condition, idx, node) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('common.confirmDeleteCondition', { idx: idx + 1 }),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        const nConditions = this.node.conditions.filter(c => c.id !== condition.id)
        this.node.conditions = nConditions
        
        // Remove apenas a linha específica se a condição tinha uma etapa de destino
        if (condition.nextStepId) {
          this.$emit('deleteLine', node.id, condition.nextStepId)
        }
      })
    },
    onInsertSelectEmojiSaudacao (emoji) {
      if (!emoji.data) {
        return
      }
      
      // Obter o valor atual da mensagem
      const currentMessage = this.node.configurations.welcomeMessage.message || ''
      
      // Adicionar o emoji ao final da mensagem
      const newMessage = currentMessage + emoji.data
      
      // Atualizar a mensagem
      this.node.configurations.welcomeMessage.message = newMessage
      
      // Sincronizar as mudanças
      this.syncOnBlur()
    },
    onInsertSelectEmojiEncerramento (emoji) {
      if (!emoji.data) {
        return
      }
      
      // Obter o valor atual da mensagem
      const currentMessage = this.node.configurations.farewellMessage.message || ''
      
      // Adicionar o emoji ao final da mensagem
      const newMessage = currentMessage + emoji.data
      
      // Atualizar a mensagem
      this.node.configurations.farewellMessage.message = newMessage
      
      // Sincronizar as mudanças
      this.syncOnBlur()
    },
    onInsertSelectEmojiNotOptionsSelectMessage (emoji) {
      if (!emoji.data) {
        return
      }
      
      // Obter o valor atual da mensagem
      const currentMessage = this.node.configurations.notOptionsSelectMessage.message || ''
      
      // Adicionar o emoji ao final da mensagem
      const newMessage = currentMessage + emoji.data
      
      // Atualizar a mensagem
      this.node.configurations.notOptionsSelectMessage.message = newMessage
      
      // Sincronizar as mudanças
      this.syncOnBlur()
    },
    onInsertSelectEmojiTempo (emoji) {
      if (!emoji.data) {
        return
      }
      
      // Obter o valor atual da mensagem
      const currentMessage = this.node.configurations.notResponseMessage.message || ''
      
      // Adicionar o emoji ao final da mensagem
      const newMessage = currentMessage + emoji.data
      
      // Atualizar a mensagem
      this.node.configurations.notResponseMessage.message = newMessage
      
      // Sincronizar as mudanças
      this.syncOnBlur()
    },
    onInsertSelectEmojiWarning (emoji) {
      if (!emoji.data) {
        return
      }
      
      // Obter o valor atual da mensagem
      const currentMessage = this.node.configurations.notResponseMessage.messageWarning || ''
      
      // Adicionar o emoji ao final da mensagem
      const newMessage = currentMessage + emoji.data
      
      // Atualizar a mensagem
      this.node.configurations.notResponseMessage.messageWarning = newMessage
      
      // Sincronizar as mudanças
      this.syncOnBlur()
    },
    onInsertSelectEmojincerramento (emoji) {
      if (!emoji.data) {
        return
      }
      
      // Obter o valor atual da mensagem
      const currentMessage = this.node.configurations.farewellMessage.message || ''
      
      // Adicionar o emoji ao final da mensagem
      const newMessage = currentMessage + emoji.data
      
      // Atualizar a mensagem
      this.node.configurations.farewellMessage.message = newMessage
      
      // Sincronizar as mudanças
      this.syncOnBlur()
    },
    addLineStep (nextStepId, idx) {
      if (this.node.conditions[idx]?.queueId) {
        this.node.conditions[idx].queueId = null
      }
      if (this.node.conditions[idx]?.userIdDestination) {
        this.node.conditions[idx].userIdDestination = null
      }
      if (this.node.conditions[idx]?.closeTicket) {
        this.node.conditions[idx].closeTicket = null
      }
      if (this.node.conditions[idx]?.channelDestination) {
        this.node.conditions[idx].channelDestination = null
      }
      // Limpa outros campos de ação quando seleciona uma etapa
      this.clearActionFields(this.node.conditions[idx], idx, 'step')
      const oldToLine = this.node.conditions[idx].nextStepId
      this.node.conditions[idx].nextStepId = nextStepId
      
      // Sempre emitir evento quando uma etapa é selecionada (mesmo que seja a mesma)
      // Isso garante que a linha seja criada/atualizada
      this.$emit('addNewLineCondition', this.node.id, nextStepId, oldToLine)
    },
    removeItem (el, idx) {
      this.$q.dialog({
        title: this.$t('common.attention'),
        message: this.$t('common.confirmDeleteElement', { idx }),
        cancel: {
          label: this.$t('common.no'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('common.yes'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        const idx = this.node.interactions.findIndex(e => e.id === el.id)
        this.node.interactions.splice(idx, 1)
      })
    },
    nodeInit (data, id) {
      this.type = 'node'
      this.data = data
      const foundNode = data.nodeList.find((node) => node.id === id)
      if (foundNode) {
        // Criar uma cópia profunda para evitar referência direta
        this.node = cloneDeep(foundNode)
        // Garantir que as propriedades existam
        if (!this.node.interactions) this.node.interactions = []
        if (!this.node.conditions) this.node.conditions = []
        if (!this.node.configurations) this.node.configurations = {
          welcomeMessage: { message: '' },
          notOptionsSelectMessage: { message: '' },
          keyword: { message: '' },
          notResponseMessage: { message: '', time: 0, type: 1, destiny: null, messageWarning: '', messageWarningEnabled: false },
          maxRetryBotMessage: { number: 0, type: 1, destiny: null },
          firstInteraction: { type: 1, destiny: null },
          outOpenHours: { type: 1, destiny: null },
          autoDistributeTickets: 'N',
          answerCloseTicket: [],
          farewellMessage: { message: '' }
        }
        
        // Garantir que messageWarningEnabled sempre tenha um valor booleano definido
        if (this.node.configurations.notResponseMessage && typeof this.node.configurations.notResponseMessage.messageWarningEnabled === 'undefined') {
          this.node.configurations.notResponseMessage.messageWarningEnabled = false
        }
        // Garantir propriedades de variável
        if (!this.node.variableKey) this.node.variableKey = ''
        if (!this.node.variableType) this.node.variableType = 'text'
      }
    },
    lineInit (line) {
      this.type = 'line'
      this.line = line
    },
    // 修改连线
    saveLine () {
      this.$emit('setLineLabel', this.line.from, this.line.to, this.line.label)
    },
    // Método para sincronizar mudanças de volta para o objeto original
    syncNodeChanges() {
      if (!this.node || !this.node.id) return
      
      const originalNode = this.data.nodeList.find(n => n.id === this.node.id)
      if (originalNode) {
        // Sincronizar todas as propriedades importantes
        originalNode.name = this.node.name
        originalNode.left = this.node.left
        originalNode.top = this.node.top
        originalNode.ico = this.node.ico
        originalNode.state = this.node.state
        originalNode.actions = this.node.actions
        originalNode.conditions = this.node.conditions
        originalNode.interactions = this.node.interactions
        originalNode.configurations = this.node.configurations
        // Sincronizar propriedades de variável
        originalNode.variableKey = this.node.variableKey || ''
        originalNode.variableType = this.node.variableType || 'text'
        originalNode.variableLabel = this.node.variableLabel || ''
        originalNode.variableValidation = this.node.variableValidation || ''
        
        // Log para debug (apenas em desenvolvimento)
        if (process.env.NODE_ENV === 'development') {
          console.log(`[SYNC] Node ${this.node.id} - variableKey: ${originalNode.variableKey}`)
        }
        
        // Emitir evento para repintar se necessário
        this.$emit('repaintEverything')
      }
    },
    
    save () {
      this.syncNodeChanges()
    },
    
    // Método para salvar com sincronização
    saveFlowWithSync() {
      // Sincronizar todas as mudanças antes de salvar
      this.syncNodeChanges()
      // Emitir evento de salvamento
      this.$emit('saveFlow')
    },
    
    // Método para sincronizar quando perde o foco (debounced)
    syncOnBlur() {
      // Usar debounce para evitar muitas chamadas
      if (this.syncTimeout) {
        clearTimeout(this.syncTimeout)
      }
      this.syncTimeout = setTimeout(() => {
        this.syncNodeChanges()
      }, 300)
    },
    
    // Método para atualizar dados de um elemento específico
    updateElementData(elementId, newData) {
      const elementIndex = this.node.interactions.findIndex(el => el.id === elementId)
      if (elementIndex !== -1) {
        // Atualizar os dados do elemento
        this.node.interactions[elementIndex].data = { ...this.node.interactions[elementIndex].data, ...newData }
        // Salvar no cache
        this.elementCache.set(elementId, this.node.interactions[elementIndex])
        // Sincronizar imediatamente
        this.syncNodeChanges()
      }
    },
    
    // Método para restaurar dados do cache
    restoreElementFromCache(elementId) {
      if (this.elementCache.has(elementId)) {
        const cachedElement = this.elementCache.get(elementId)
        const elementIndex = this.node.interactions.findIndex(el => el.id === elementId)
        if (elementIndex !== -1) {
          this.node.interactions[elementIndex] = { ...cachedElement }
        }
      }
    },
    
    // Métodos para comparações de texto
    getComparisonHint(type) {
      const hints = {
        'equals': this.$t('nodeForm.hints.typeEqual'),
        'contains': this.$t('nodeForm.hints.typeContains'),
        'startsWith': this.$t('nodeForm.hints.typeStartsWith'),
        'endsWith': this.$t('nodeForm.hints.typeEndsWith'),
        'regex': this.$t('nodeForm.hints.typeRegex')
      }
      return hints[type] || this.$t('nodeForm.hints.typeValue')
    },
    
    clearActionFields(condition, idx, actionType) {
      // Limpa todos os campos de ação exceto o selecionado
      if (actionType !== 'step') condition.nextStepId = null
      if (actionType !== 'queue') condition.queueId = null
      if (actionType !== 'user') condition.userIdDestination = null
      if (actionType !== 'close') condition.closeTicket = null
      if (actionType !== 'channel') condition.channelDestination = null
      
      // Limpa o campo condition apenas se não for do tipo 'R' (respostas)
      if (condition.type !== 'R') {
        condition.condition = null
      }
    },
    

     clearStepVariableKey() {
       this.node.variableKey = ''
       this.node.variableLabel = ''
       this.node.variableType = 'text'
       this.node.variableValidation = ''
       
       // Força atualização da interface
       this.$nextTick(() => {
         this.$forceUpdate()
       })
     },
     
     // Método para validar chave da variável do passo
     validateStepVariableKey(key) {
       if (!key) return true
       // Apenas letras, números e underscore
       return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(key)
     },
     
     // Método para gerar chave automática para o passo
     generateStepVariableKey(label) {
       if (!label) return ''
       return label
         .toLowerCase()
         .replace(/[^a-z0-9]/g, '_')
         .replace(/_+/g, '_')
         .replace(/^_|_$/g, '')
     },
     
     // Método para forçar atualização da interface (removido para melhorar performance)
     forceUpdateInterface() {
       // Método mantido para compatibilidade, mas sem implementação
       // para evitar travamentos durante a digitação
     }
  },
  watch: {
    // Auto-completar chave da variável quando nome do passo muda
    'node.name': {
      handler(newName) {
        if (newName && !this.node.variableKey) {
          this.node.variableKey = this.generateStepVariableKey(newName)
        }
        // Sincronizar mudanças automaticamente
        this.syncNodeChanges()
      }
    },
    
    // Watcher para as propriedades de variável
    'node.variableKey': {
      handler(newValue) {
        this.syncNodeChanges()
      }
    },
    
    'node.variableType': {
      handler(newValue) {
        this.syncNodeChanges()
      }
    },
    
    // Watcher para interações (campos adicionados)
    'node.interactions': {
      handler() {
        this.syncNodeChanges()
      },
      deep: true
    },
    
    // Watcher para condições
    'node.conditions': {
      handler() {
        this.syncNodeChanges()
      },
      deep: true
    },
    
    // Watcher para configurações
    'node.configurations': {
      handler() {
        this.syncNodeChanges()
      },
      deep: true
    },
    
    // Watcher para o objeto node (simplificado)
    'node': {
      handler(newNode) {
        // Não sincronizar aqui para evitar loops infinitos
        // A sincronização é feita nos watchers específicos
      },
      deep: true
    },
    
    // Watcher para mudança de aba
    'tabNodeForm': {
      handler(newTab, oldTab) {
        // Sincronizar dados quando muda de aba
        this.syncNodeChanges()
      }
    }
  },
  mounted () {
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

<style scoped>
.el-node-form-tag {
  position: absolute;
  top: 50%;
  margin-left: -15px;
  height: 40px;
  width: 15px;
  background-color: #fbfbfb;
  border: 1px solid rgb(220, 227, 232);
  border-right: none;
  z-index: 0;
}
.btn-rounded {
  margin-bottom: 3px;
}

/* ============================================
   ESTILOS PARA DARK MODE - NODE FORM
   ============================================ */

/* Cards e seções no dark mode */
body.body--dark :deep(.q-card) {
  background: #2d2d2d !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}

body.body--dark :deep(.q-card:hover) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
  border-color: #666666 !important;
}

/* Cards de configuração no dark mode */
body.body--dark :deep(.bg-grey-3),
body.body--dark :deep(.bg-grey-5) {
  background: #2d2d2d !important;
  border-color: #555555 !important;
}

/* Cards de interações e condições no dark mode */
body.body--dark :deep(.q-card.bordered) {
  background: #2d2d2d !important;
  border-color: #555555 !important;
}

body.body--dark :deep(.q-card.bordered:hover) {
  border-color: #666666 !important;
}

/* Inputs no dark mode */
body.body--dark :deep(.q-input .q-field__control) {
  background: #3a3a3a !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}

body.body--dark :deep(.q-input .q-field__control:hover) {
  border-color: #666666 !important;
}

body.body--dark :deep(.q-input .q-field--focused .q-field__control) {
  border-color: #8b9aff !important;
  box-shadow: 0 0 0 3px rgba(139, 154, 255, 0.2) !important;
}

body.body--dark :deep(.q-input .q-field__label) {
  color: #b0b0b0 !important;
}

body.body--dark :deep(.q-input .q-field__native) {
  color: #e5e5e5 !important;
}

/* Tabs no dark mode */
body.body--dark :deep(.q-tabs) {
  border-bottom-color: #555555 !important;
}

body.body--dark :deep(.q-tab) {
  color: #b0b0b0 !important;
}

body.body--dark :deep(.q-tab:hover) {
  color: #8b9aff !important;
}

body.body--dark :deep(.q-tab--active) {
  color: #8b9aff !important;
}

body.body--dark :deep(.q-tabs__indicator) {
  background: #8b9aff !important;
}

/* Área de interações - toolbar de ícones no dark mode */
body.body--dark :deep(.row.bg-grey-3) {
  background: #252525 !important;
  border-color: #555555 !important;
}

/* Cards de interação individual no dark mode */
body.body--dark :deep(.bg-white.full-width) {
  background: #2d2d2d !important;
  border-color: #555555 !important;
}

body.body--dark :deep(.bg-white.full-width:hover) {
  border-color: #666666 !important;
}

/* Labels e títulos no dark mode */
body.body--dark :deep(.text-bold) {
  color: #e5e5e5 !important;
}

/* Textarea e inputs de texto no dark mode */
body.body--dark :deep(textarea) {
  background: #3a3a3a !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}

body.body--dark :deep(textarea:focus) {
  border-color: #8b9aff !important;
  box-shadow: 0 0 0 3px rgba(139, 154, 255, 0.2) !important;
}

/* Dropdowns e selects no dark mode */
body.body--dark :deep(.q-select .q-field__control) {
  background: #3a3a3a !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}

body.body--dark :deep(.q-select .q-field__native) {
  color: #e5e5e5 !important;
}

body.body--dark :deep(.q-menu) {
  background: #2d2d2d !important;
  border-color: #555555 !important;
}

body.body--dark :deep(.q-item) {
  color: #e5e5e5 !important;
}

body.body--dark :deep(.q-item:hover) {
  background-color: #3a3a3a !important;
}

/* Seção de informações do início no dark mode */
body.body--dark :deep(.q-card.flat) {
  background: #252525 !important;
  border-color: #555555 !important;
}

/* Cards de informações com bg-grey-3 no dark mode */
body.body--dark :deep(.bg-grey-3.text-bold) {
  background: #252525 !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}

body.body--dark :deep(.bg-grey-3.text-bold .text-subtitle2) {
  color: #b0b0b0 !important;
}

/* Cards internos de configuração no dark mode */
body.body--dark .q-card.flat.bg-grey-2 {
  background: #2d2d2d !important;
  background-color: #2d2d2d !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}

body.body--dark :deep(.q-card.flat.bg-grey-2) {
  background: #2d2d2d !important;
  background-color: #2d2d2d !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}

/* Seção "Capturar resposta como variável" no dark mode */
body.body--dark :deep(.q-card.flat.bg-grey-2 .text-caption) {
  color: #e5e5e5 !important;
}

body.body--dark :deep(.q-card.flat.bg-grey-2 .text-grey-7) {
  color: #b0b0b0 !important;
}

body.body--dark :deep(.q-card.flat.bg-grey-2 .text-grey-5) {
  color: #888888 !important;
}

body.body--dark :deep(.q-card.flat.bg-grey-2 .q-icon) {
  color: #8b9aff !important;
}

/* Inputs dentro do card de captura de variável no dark mode */
body.body--dark :deep(.q-card.flat.bg-grey-2 .q-input .q-field__control) {
  background: #3a3a3a !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}

body.body--dark :deep(.q-card.flat.bg-grey-2 .q-input .q-field__native) {
  color: #e5e5e5 !important;
}

body.body--dark :deep(.q-card.flat.bg-grey-2 .q-input .q-field__label) {
  color: #b0b0b0 !important;
}

body.body--dark :deep(.q-card.flat.bg-grey-2 .q-input .q-field--focused .q-field__control) {
  border-color: #8b9aff !important;
  box-shadow: 0 0 0 3px rgba(139, 154, 255, 0.2) !important;
}

body.body--dark :deep(.q-card.flat.bg-grey-2 .q-select .q-field__control) {
  background: #3a3a3a !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}

body.body--dark :deep(.q-card.flat.bg-grey-2 .q-select .q-field__native) {
  color: #e5e5e5 !important;
}

body.body--dark :deep(.q-card.flat.bg-grey-2 .q-select .q-field__label) {
  color: #b0b0b0 !important;
}

body.body--dark :deep(.q-card.flat.bg-grey-2 .q-select .q-field--focused .q-field__control) {
  border-color: #8b9aff !important;
  box-shadow: 0 0 0 3px rgba(139, 154, 255, 0.2) !important;
}

/* Hint text no dark mode */
body.body--dark :deep(.q-card.flat.bg-grey-2 .q-field__messages) {
  color: #888888 !important;
}

/* Botão "Nova Condição" no dark mode */
body.body--dark :deep(.q-btn.bg-padrao) {
  background: #3a3a3a !important;
  color: #e5e5e5 !important;
  border: 1px solid #555555 !important;
}

body.body--dark :deep(.q-btn.bg-padrao:hover) {
  background: #4a4a4a !important;
  border-color: #666666 !important;
}

body.body--dark :deep(.q-btn.bg-padrao .q-icon) {
  color: #8b9aff !important;
}

/* Labels e descrições no dark mode */
body.body--dark :deep(.text-subtitle2) {
  color: #b0b0b0 !important;
}

/* Inputs com melhor espaçamento no dark mode */
body.body--dark :deep(.q-input .q-field__label) {
  color: #b0b0b0 !important;
}

/* Radio buttons e checkboxes no dark mode */
body.body--dark :deep(.q-radio__label),
body.body--dark :deep(.q-checkbox__label) {
  color: #e5e5e5 !important;
}

/* Badges e labels de número no dark mode */
body.body--dark :deep(.q-btn.round.disable) {
  background: linear-gradient(135deg, #8b9aff 0%, #a78bfa 100%) !important;
  color: #ffffff !important;
}
</style>

<style>
/* Estilos globais para dark mode - Seção Capturar resposta como variável */
/* Forçar background escuro no card bg-grey-2 */
body.body--dark .q-card.bg-grey-2,
body.body--dark .q-card.flat.bg-grey-2 {
  background: #2d2d2d !important;
  background-color: #2d2d2d !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}

/* Garantir que todos os elementos filhos herdem a cor */
body.body--dark .q-card.bg-grey-2 .text-caption,
body.body--dark .q-card.flat.bg-grey-2 .text-caption {
  color: #e5e5e5 !important;
}

body.body--dark .q-card.bg-grey-2 .text-grey-7,
body.body--dark .q-card.flat.bg-grey-2 .text-grey-7 {
  color: #b0b0b0 !important;
}

body.body--dark .q-card.bg-grey-2 .text-grey-5,
body.body--dark .q-card.flat.bg-grey-2 .text-grey-5 {
  color: #888888 !important;
}

body.body--dark .q-card.bg-grey-2 .q-icon,
body.body--dark .q-card.flat.bg-grey-2 .q-icon {
  color: #8b9aff !important;
}

/* Classe específica para garantir o estilo no dark mode */
body.body--dark .q-card.dark-mode-card,
body.body--dark .q-card.dark-mode-card.bg-grey-2 {
  background: #2d2d2d !important;
  background-color: #2d2d2d !important;
  border-color: #555555 !important;
  color: #e5e5e5 !important;
}
</style>
