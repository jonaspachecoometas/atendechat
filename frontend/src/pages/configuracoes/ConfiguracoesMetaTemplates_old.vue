<template>
  <div v-if="userProfile === 'admin'">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="phones" :label="$t('configuracaoMetaPanel.tabs.phones')" />
      <q-tab name="templates" :label="$t('configuracaoMetaPanel.templates.title')" />
      <q-tab name="create" :label="$t('configuracaoMetaPanel.templates.create')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <!-- Aba de Listagem de Templates -->
      <q-tab-panel name="templates" class="q-pa-none">
        <div class="q-pa-md">
          <!-- Seletor de Conexão WABA -->
          <div class="row q-mb-md">
            <div class="col-12 col-md-6" style="margin-right: 10px;">
              <q-select
                v-model="selectedWhatsapp"
                :options="cSessionsOptions"
                :label="$t('configuracaoMetaPanel.common.selectWabaConnection')"
                outlined
                dense
                option-label="label"
                option-value="value"
                @update:model-value="listarTemplates"
                :loading="loadingTemplates"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      {{ $t('configuracaoMetaPanel.common.noWabaConnectionsAvailable') }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12 col-md-5">
              <q-btn
                :label="$t('configuracaoMetaPanel.templates.refresh')"
                color="primary"
                icon="refresh"
                @click="listarTemplates"
                :loading="loadingTemplates"
                :disable="!selectedWhatsapp"
              />
            </div>
          </div>

          <!-- Filtros -->
          <div class="row q-mb-md">
            <div class="col-12 col-md-3 q-pa-sm">
              <q-select
                v-model="filtros.status"
                :options="statusOptions"
                :label="$t('configuracaoMetaPanel.templates.filters.status')"
                outlined
                dense
                clearable
                @update:model-value="aplicarFiltros"
              />
            </div>
            <div class="col-12 col-md-3 q-pa-sm">
              <q-select
                v-model="filtros.category"
                :options="categoryOptions"
                :label="$t('configuracaoMetaPanel.templates.filters.category')"
                outlined
                dense
                clearable
                @update:model-value="aplicarFiltros"
              />
            </div>
            <div class="col-12 col-md-3 q-pa-sm">
              <q-select
                v-model="filtros.language"
                :options="languageOptions"
                :label="$t('configuracaoMetaPanel.templates.filters.language')"
                outlined
                dense
                clearable
                @update:model-value="aplicarFiltros"
              />
            </div>
            <div class="col-12 col-md-3 q-pa-sm">
              <q-input
                v-model="filtros.search"
                :label="$t('configuracaoMetaPanel.templates.filters.search')"
                outlined
                dense
                clearable
                @update:model-value="aplicarFiltros"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>

          <!-- Lista de Templates -->
          <div class="row">
            <div class="col-12">
              <q-card v-if="!selectedWhatsapp" class="q-pa-md text-center">
                <q-icon name="warning" size="48px" color="orange" />
                <p class="text-grey-6 q-mt-md">{{ $t('configuracaoMetaPanel.messages.selectWabaConnection') }}</p>
              </q-card>

              <q-card v-else-if="templates.length === 0 && !loadingTemplates" class="q-pa-md text-center">
                <q-icon name="template" size="48px" color="grey-5" />
                <p class="text-grey-6 q-mt-md">{{ $t('configuracaoMetaPanel.templates.noTemplates') }}</p>
              </q-card>

              <div v-else class="row q-col-gutter-md">
                <div
                  v-for="template in templatesFiltrados"
                  :key="template.id"
                  class="col-12 col-md-6 col-lg-4"
                >
                  <q-card class="template-card">
                    <q-card-section>
                      <div class="row items-center justify-between">
                        <div class="col">
                          <h6 class="text-weight-bold">{{ template.name }}</h6>
                          <p class="text-caption text-grey-6">{{ template.language }}</p>
                          <q-chip
                            v-if="isSampleTemplate(template)"
                            color="orange"
                            text-color="white"
                            size="xs"
                            icon="info"
                          >
                            {{ $t('configuracaoMetaPanel.messages.sampleTemplateChip') }}
                          </q-chip>
                        </div>
                        <div class="col-auto">
                          <q-chip
                            :color="getStatusColor(template.status)"
                            text-color="white"
                            size="sm"
                          >
                            {{ template.status }}
                          </q-chip>
                        </div>
                      </div>
                    </q-card-section>

                    <q-separator />

                    <q-card-section>
                      <div class="row q-col-gutter-sm">
                        <div class="col-12">
                          <q-chip
                            :color="getCategoryColor(template.category)"
                            text-color="white"
                            size="sm"
                          >
                            {{ template.category }}
                          </q-chip>
                        </div>
                      </div>
                      
                      <div class="q-mt-md">
                        <p class="text-body2">{{ getTemplatePreview(template) }}</p>
                      </div>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn
                        flat
                        color="primary"
                        :label="$t('configuracaoMetaPanel.templates.actions.view')"
                        @click="visualizarTemplate(template)"
                      />
                      <!-- <q-btn
                        flat
                        color="green"
                        :label="$t('configuracaoMetaPanel.templates.actions.test')"
                        @click="abrirModalTeste(template)"
                        v-if="template.status === 'APPROVED'"
                        icon="send"
                      /> -->
                      <q-btn
                        flat
                        color="orange"
                        :label="$t('configuracaoMetaPanel.templates.actions.edit')"
                        @click="editarTemplate(template)"
                        v-if="template.status === 'APPROVED' || template.status === 'REJECTED'"
                        :disable="isSampleTemplate(template)"
                        :title="isSampleTemplate(template) ? $t('configuracaoMetaPanel.messages.sampleTemplateEditTitle') : ''"
                      />
                      <q-btn
                        flat
                        color="negative"
                        :label="$t('configuracaoMetaPanel.templates.actions.delete')"
                        @click="confirmarExclusao(template)"
                        :disable="isSampleTemplate(template)"
                        :title="isSampleTemplate(template) ? $t('configuracaoMetaPanel.messages.sampleTemplateDeleteTitle') : ''"
                      />
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <!-- Aba de Criação de Templates -->
      <q-tab-panel name="create" class="q-pa-none">
        <div class="q-pa-md" style="min-height: 800px !important;">
          <!-- Seletor de Conexão WABA -->
          <div class="row q-mb-md" style="padding-bottom: 10px;">
            <div class="col-12 col-md-6" style="margin-right: 10px;">
              <q-select
                v-model="selectedWhatsapp"
                :options="cSessionsOptions"
                :label="$t('configuracaoMetaPanel.common.selectWabaConnection')"
                outlined
                dense
                option-label="label"
                option-value="value"
                :loading="loadingCreate"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      {{ $t('configuracaoMetaPanel.common.noWabaConnectionsAvailable') }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12 col-md-5">
              <q-btn
                :label="$t('configuracaoMetaPanel.templates.refresh')"
                color="primary"
                icon="refresh"
                @click="listarTemplates"
                :loading="loadingTemplates"
                :disable="!selectedWhatsapp"
              />
            </div>
          </div>

          <!-- Mensagem quando não há conexões -->
          <div v-if="cSessions.length === 0" class="row q-mb-md">
            <div class="col-12">
              <q-banner class="bg-orange-1 text-orange-8">
                <template v-slot:avatar>
                  <q-icon name="warning" color="orange" />
                </template>
                {{ $t('configuracaoMetaPanel.messages.noWabaConnections') }}
              </q-banner>
            </div>
          </div>

          <!-- Formulário apenas se há conexão selecionada -->
          <div v-if="selectedWhatsapp">
            <div class="row q-col-gutter-lg" style="align-items: flex-start;">
              <!-- Coluna do Formulário -->
              <div class="col-12 col-md-6">
                <q-form @submit="isEditing ? editarTemplateSubmit() : criarTemplate()" class="q-gutter-md">
                  <!-- Informações Básicas -->
                  <q-card class="q-mb-md">
                    <q-card-section>
                      <h6 class="text-weight-bold">
                        {{ isEditing ? $t('configuracaoMetaPanel.common.editTemplate') : $t('configuracaoMetaPanel.templates.createForm.basicInfo') }}
                      </h6>
                      <p class="text-caption text-grey-6 q-mt-sm">
                        {{ $t('configuracaoMetaPanel.templates.createForm.requiredFieldsNote') }}
                      </p>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                      <div class="row q-col-gutter-md">
                        <div class="col-12 col-md-6">
                          <q-input
                            v-model="appId"
                            :label="$t('configuracaoMetaPanel.common.appId') + ' *'"
                            outlined
                            dense
                            placeholder="App ID"
                            :rules="[val => !!val || $t('configuracaoMetaPanel.templates.createForm.appIdRequired')]"
                            :hint="$t('configuracaoMetaPanel.common.appIdHint')"
                            persistent-hint
                          />
                        </div>
                        <div class="col-12 col-md-6">
                          <q-input
                            v-model="novoTemplate.name"
                            :label="$t('configuracaoMetaPanel.templates.createForm.name') + ' *'"
                            outlined
                            dense
                            :rules="[val => !!val || $t('configuracaoMetaPanel.templates.createForm.nameRequired')]"
                            :hint="$t('configuracaoMetaPanel.common.nameHint')"
                            persistent-hint
                          />
                        </div>
                        <div class="col-12 col-md-6">
                          <q-select
                            v-model="novoTemplate.language"
                            :options="languageOptions"
                            :label="$t('configuracaoMetaPanel.templates.createForm.language') + ' *'"
                            outlined
                            dense
                            :rules="[val => !!val || $t('configuracaoMetaPanel.templates.createForm.languageRequired')]"
                          />
                        </div>
                        <div class="col-12 col-md-6">
                          <q-select
                            v-model="novoTemplate.category"
                            :options="categoryOptions"
                            :label="$t('configuracaoMetaPanel.templates.createForm.category') + ' *'"
                            outlined
                            dense
                            :rules="[val => !!val || $t('configuracaoMetaPanel.templates.createForm.categoryRequired')]"
                          />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>

                  <!-- Componentes do Template -->
                  <q-card class="q-mb-md">
                    <q-card-section>
                      <div class="row items-center justify-between">
                        <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.templates.createForm.components') }}</h6>
                        <div class="row items-center q-gutter-sm">
                          <q-select
                            v-model="novoTipoComponente"
                            :options="componentTypeOptions"
                            :label="$t('configuracaoMetaPanel.common.type')"
                            outlined
                            dense
                            style="min-width: 150px;"
                            option-value="value"
                            option-label="label"
                            emit-value
                            map-options
                          />
                          <q-btn
                            :label="$t('configuracaoMetaPanel.templates.createForm.addComponent')"
                            color="primary"
                            icon="add"
                            @click="adicionarComponente"
                            :disable="!novoTipoComponente"
                          />
                        </div>
                      </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section>
                      <div v-for="(componente, index) in novoTemplate.components" :key="`componente-${index}-${componente.type}`" class="q-mb-md">
                        <q-card outlined>
                          <q-card-section>
                            <div class="row items-center justify-between q-mb-sm">
                              <h6 class="text-weight-medium">{{ $t('configuracaoMetaPanel.templates.createForm.component') }} {{ index + 1 }}</h6>
                              <q-btn
                                flat
                                round
                                color="negative"
                                icon="delete"
                                @click="removerComponente(index)"
                              />
                            </div>
                            
                            <div class="row q-col-gutter-md">
                              <div class="col-12 col-md-6">
                                <q-select
                                  v-model="componente.type"
                                  :options="componentTypeOptions"
                                  :label="$t('configuracaoMetaPanel.templates.createForm.componentType')"
                                  outlined
                                  dense
                                  option-value="value"
                                  option-label="label"
                                  emit-value
                                  map-options
                                  @update:model-value="onComponentTypeChange(componente)"
                                />
                              </div>
                              <div class="col-12 col-md-6" v-if="componente.type === 'HEADER'">
                                <q-select
                                  v-model="componente.format"
                                  :options="headerFormatOptions"
                                  :label="$t('configuracaoMetaPanel.templates.createForm.headerFormat')"
                                  outlined
                                  dense
                                  option-value="value"
                                  option-label="label"
                                  emit-value
                                  map-options
                                  @update:model-value="onHeaderFormatChange(componente)"
                                />
                              </div>
                            </div>

                            <!-- Campos específicos por tipo de componente -->
                            <div class="row q-col-gutter-md q-mt-md">
                              <!-- Campo de texto para HEADER, BODY e FOOTER -->
                              <div class="col-12" v-if="componente.type === 'HEADER' || componente.type === 'BODY' || componente.type === 'FOOTER'">
                                <q-input
                                  v-model="componente.text"
                                  :label="$t('configuracaoMetaPanel.templates.createForm.text')"
                                  outlined
                                  dense
                                  type="textarea"
                                  rows="3"
                                  counter
                                  :maxlength="getMaxLength(componente.type)"
                                  :hint="getCharacterLimitHint(componente.type)"
                                  persistent-hint
                                />
                              </div>
                              
                              <!-- Campos específicos para HEADER -->
                              <div class="col-12 col-md-6" v-if="componente.type === 'HEADER' && componente.format === 'IMAGE'">
                                <div class="row q-col-gutter-sm">
                                  <div class="col">
                                    <q-input
                                      v-model="componente.example"
                                      :label="$t('configuracaoMetaPanel.headerFields.imageUrl')"
                                      outlined
                                      dense
                                      :placeholder="$t('configuracaoMetaPanel.headerFields.imagePlaceholder')"
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <div class="col-12 col-md-6" v-if="componente.type === 'HEADER' && componente.format === 'DOCUMENT'">
                                <q-input
                                  v-model="componente.example"
                                  :label="$t('configuracaoMetaPanel.headerFields.documentUrl')"
                                  outlined
                                  dense
                                  :placeholder="$t('configuracaoMetaPanel.headerFields.documentPlaceholder')"
                                />
                              </div>
                              
                              <div class="col-12 col-md-6" v-if="componente.type === 'HEADER' && componente.format === 'VIDEO'">
                                <q-input
                                  v-model="componente.example"
                                  :label="$t('configuracaoMetaPanel.headerFields.videoUrl')"
                                  outlined
                                  dense
                                  :placeholder="$t('configuracaoMetaPanel.headerFields.videoPlaceholder')"
                                />
                              </div>
                              
                              <div class="col-12 col-md-6" v-if="componente.type === 'HEADER' && componente.format === 'LOCATION'">
                                <q-input
                                  v-model="componente.example.latitude"
                                  :label="$t('configuracaoMetaPanel.headerFields.latitude')"
                                  outlined
                                  dense
                                  :placeholder="$t('configuracaoMetaPanel.headerFields.latitudePlaceholder')"
                                />
                              </div>
                              
                              <div class="col-12 col-md-6" v-if="componente.type === 'HEADER' && componente.format === 'LOCATION'">
                                <q-input
                                  v-model="componente.example.longitude"
                                  :label="$t('configuracaoMetaPanel.headerFields.longitude')"
                                  outlined
                                  dense
                                  :placeholder="$t('configuracaoMetaPanel.headerFields.longitudePlaceholder')"
                                />
                              </div>
                              
                              <div class="col-12" v-if="componente.type === 'HEADER' && componente.format === 'LOCATION'">
                                <q-input
                                  v-model="componente.example.name"
                                  :label="$t('configuracaoMetaPanel.headerFields.locationName')"
                                  outlined
                                  dense
                                  :placeholder="$t('configuracaoMetaPanel.headerFields.locationNamePlaceholder')"
                                />
                              </div>
                            </div>

                            <!-- Botões -->
                            <div v-if="componente.type === 'BUTTONS'" class="q-mt-md">
                              <div class="row items-center justify-between q-mb-sm">
                                <h6 class="text-weight-medium">{{ $t('configuracaoMetaPanel.templates.createForm.buttons') }}</h6>
                                <q-btn
                                  :label="$t('configuracaoMetaPanel.templates.createForm.addButton')"
                                  color="primary"
                                  icon="add"
                                  size="sm"
                                  @click="adicionarBotao(componente)"
                                />
                              </div>
                              
                              <!-- Verificar se buttons existe, se não, inicializar -->
                              <div v-if="!componente.buttons" class="q-mb-sm">
                                <q-banner class="bg-blue-1 text-blue-8">
                                  <template v-slot:avatar>
                                    <q-icon name="info" color="blue" />
                                  </template>
                                  {{ $t('configuracaoMetaPanel.preview.addButtonToStart') }}
                                </q-banner>
                              </div>
                              
                              <div v-for="(botao, botaoIndex) in (componente.buttons || [])" :key="botaoIndex" class="q-mb-sm">
                                <q-card outlined>
                                  <q-card-section>
                                    <div class="row items-center justify-between q-mb-sm">
                                      <h6 class="text-weight-medium">{{ $t('configuracaoMetaPanel.templates.createForm.button') }} {{ botaoIndex + 1 }}</h6>
                                      <q-btn
                                        flat
                                        round
                                        color="negative"
                                        icon="delete"
                                        size="sm"
                                        @click="removerBotao(componente, botaoIndex)"
                                      />
                                    </div>
                                    
                                    <div class="row q-col-gutter-md">
                                      <div class="col-12 col-md-6">
                                        <q-select
                                          v-model="botao.type"
                                          :options="buttonTypeOptions"
                                          :label="$t('configuracaoMetaPanel.templates.createForm.buttonType')"
                                          outlined
                                          dense
                                          option-value="value"
                                          option-label="label"
                                          emit-value
                                          map-options
                                          @update:model-value="onButtonTypeChange(botao)"
                                        />
                                      </div>
                                      <div class="col-12 col-md-6">
                                        <q-input
                                          v-model="botao.text"
                                          :label="$t('configuracaoMetaPanel.templates.createForm.buttonText')"
                                          outlined
                                          dense
                                          counter
                                          :maxlength="25"
                                          :hint="$t('configuracaoMetaPanel.common.buttonTextHint')"
                                          persistent-hint
                                        />
                                      </div>
                                    </div>

                                    <!-- Campos específicos por tipo de botão -->
                                    <div class="row q-col-gutter-md q-mt-md" v-if="botao.type === 'URL'">
                                      <div class="col-12">
                                        <q-input
                                          v-model="botao.url"
                                          :label="$t('configuracaoMetaPanel.templates.createForm.url')"
                                          outlined
                                          dense
                                        />
                                      </div>
                                    </div>
                                    
                                    <div class="row q-col-gutter-md q-mt-md" v-if="botao.type === 'PHONE_NUMBER'">
                                      <div class="col-12">
                                        <q-input
                                          v-model="botao.phone_number"
                                          :label="$t('configuracaoMetaPanel.templates.createForm.phoneNumber')"
                                          outlined
                                          dense
                                        />
                                      </div>
                                    </div>
                                  </q-card-section>
                                </q-card>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </div>
                    </q-card-section>
                  </q-card>

                  <!-- Ações -->
                  <div class="row justify-end q-gutter-md">
                    <q-btn
                      :label="$t('common.cancel')"
                      color="warning"
                      @click="limparFormulario"
                    />
                    <q-btn
                      :label="isEditing ? $t('configuracaoMetaPanel.common.editTemplate') : $t('configuracaoMetaPanel.templates.createForm.submit')"
                      color="primary"
                      type="submit"
                      :loading="isEditing ? loadingEdit : loadingCreate"
                    />
                  </div>
                </q-form>
              </div>

              <!-- Coluna do Preview -->
              <div class="col-12 col-md-6">
                <div class="floating-preview-column" ref="previewColumn">
                  <div class="text-subtitle1 q-mb-sm text-center">{{ $t('configuracaoMetaPanel.preview.title') }}</div>
                  <div class="mobile-mockup q-mx-auto">
                    <div class="mobile-notch"></div>
                    <div class="mobile-screen">
                      <div
                        class="preview-message-bubble"
                        :class="{ 'bubble-max-width': shouldMaximizeBubbleWidth }"
                      >
                        <div class="preview-header" v-if="getPreviewHeaderType && getPreviewHeaderType()">
                          <q-icon
                            v-if="getPreviewHeaderType() === 'IMAGE' && (!getPreviewHeaderMediaUrl || !getPreviewHeaderMediaUrl)"
                            name="image" size="xl" color="grey-7" class="preview-header-icon"
                          />
                          <q-img
                            v-if="getPreviewHeaderType() === 'IMAGE' && getPreviewHeaderMediaUrl && getPreviewHeaderMediaUrl()"
                            :src="getPreviewHeaderMediaUrl()" spinner-color="primary" contain
                            style="max-height: 160px;" class="preview-header-image"
                          >
                            <template v-slot:error>
                              <div class="absolute-full flex flex-center bg-negative text-white text-caption q-pa-xs">
                                {{ $t('configuracaoMetaPanel.preview.imageLoadError') }}
                              </div>
                            </template>
                          </q-img>
                          <q-icon
                            v-if="getPreviewHeaderType() === 'VIDEO'"
                            name="movie" size="xl" color="grey-7" class="preview-header-icon"
                          />
                          <q-icon
                            v-if="getPreviewHeaderType() === 'DOCUMENT'"
                            name="description" size="xl" color="grey-7" class="preview-header-icon"
                          />
                          <div v-if="getPreviewHeaderType() === 'TEXT'" v-html="previewHeaderContent" class="preview-header-text"></div>
                          <div v-if="getPreviewHeaderType() === 'VIDEO' || getPreviewHeaderType() === 'DOCUMENT'" class="preview-header-caption">
                            {{ (getPreviewHeaderMediaUrl && getPreviewHeaderMediaUrl()) || $t('configuracaoMetaPanel.preview.urlNotAvailable') }}
                          </div>
                        </div>

                        <div class="preview-body" v-if="previewBodyContent" v-html="previewBodyContent"></div>

                        <div class="preview-footer" v-if="previewFooterContent">
                          {{ previewFooterContent }}
                        </div>

                        <div class="preview-buttons" v-if="previewButtonType !== 'NONE'">
                          <div v-if="previewButtonType === 'QUICK_REPLY'" class="preview-quick-reply-buttons">
                            <q-chip dense v-for="(button, index) in previewQuickReplyButtons" :key="`prev-qr-${index}`" clickable color="blue-1" text-color="blue-8" icon="reply" size="sm" class="q-ma-xs">
                              {{ button.text || $t('configuracaoMetaPanel.dynamic.buttonNumber', { index: index + 1 }) }}
                            </q-chip>
                          </div>
                          <div v-if="previewButtonType === 'CALL_TO_ACTION'" class="preview-action-buttons">
                            <q-btn v-for="(button, index) in previewActionButtons" :key="`prev-cta-${index}`" :icon="button.type === 'PHONE_NUMBER' ? 'call' : 'link'" :label="button.text || $t('configuracaoMetaPanel.dynamic.actionButton', { index: index + 1 })" no-caps flat dense size="sm" class="full-width q-my-xs preview-cta-button" align="center" />
                          </div>
                          <div v-if="previewButtonType === 'FLOW'">
                            <q-chip v-for="(button, index) in previewFlowButtons" :key="`prev-qr-${index}`" clickable color="blue-1" text-color="blue-8" icon="reply" class="q-ma-xs">
                              {{ button.text || $t('configuracaoMetaPanel.dynamic.buttonNumber', { index: index + 1 }) }}
                            </q-chip>
                          </div>
                          <div v-if="previewButtonType === 'CATALOG'">
                            <q-chip v-for="(button, index) in previewCatalogButtons" :key="`prev-qr-${index}`" clickable color="blue-1" text-color="blue-8" icon="reply" class="q-ma-xs">
                              {{ button.text || $t('configuracaoMetaPanel.dynamic.buttonNumber', { index: index + 1 }) }}
                            </q-chip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mensagem quando não há conexão selecionada -->
          <div v-else-if="cSessions.length > 0" class="row q-mb-md">
            <div class="col-12">
              <q-banner class="bg-blue-1 text-blue-8">
                <template v-slot:avatar>
                  <q-icon name="info" color="blue" />
                </template>
                {{ $t('configuracaoMetaPanel.messages.selectConnectionToManage') }}
              </q-banner>
            </div>
          </div>
        </div>
      </q-tab-panel>

      <!-- Aba de Telefones -->
      <q-tab-panel name="phones" class="q-pa-none">
        <div class="q-pa-md">
          <!-- Seletor de Conexão WABA -->
          <div class="row q-mb-md" style="padding-bottom: 10px;">
            <div class="col-12 col-md-3" style="margin-right: 10px;">
              <q-select
                v-model="selectedWhatsapp"
                :options="cSessionsOptions"
                :label="$t('configuracaoMetaPanel.common.selectWabaConnection')"
                outlined
                dense
                option-label="label"
                option-value="value"
                :loading="loadingPhoneCheck"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      {{ $t('configuracaoMetaPanel.common.noWabaConnectionsAvailable') }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12 col-md-8">
              <div class="row q-col-gutter-sm">
                <div class="col-12 col-sm-2">
                  <q-btn
                    :label="$t('configuracaoMetaPanel.buttons.checkPhone')"
                    color="info"
                    icon="phone"
                    @click="verificarTelefoneRegistrado"
                    :loading="loadingPhoneCheck"
                    :disable="!selectedWhatsapp"
                    class="full-width"
                    size="md"
                  />
                </div>
                <div class="col-12 col-sm-2">
                  <q-btn
                    :label="$t('configuracaoMetaPanel.buttons.registerPhone')"
                    color="warning"
                    icon="add_circle"
                    @click="abrirModalRegistroTelefone"
                    :disable="!selectedWhatsapp"
                    class="full-width"
                    size="md"
                  />
                </div>
                <div class="col-12 col-sm-2">
                  <q-btn
                    :label="$t('configuracaoMetaPanel.novos.configureWebhook')"
                    color="purple"
                    icon="webhook"
                    @click="abrirModalWebhook"
                    :disable="!selectedWhatsapp"
                    class="full-width"
                    size="md"
                  />
                </div>
                <div class="col-12 col-sm-2">
                  <q-btn
                    :label="$t('configuracaoMetaPanel.novos.configureSIP')"
                    color="indigo"
                    icon="phone_in_talk"
                    @click="abrirModalSIP"
                    :disable="!selectedWhatsapp"
                    class="full-width"
                    size="md"
                  />
                </div>
                <div class="col-12 col-sm-2">
                  <q-btn
                    :label="$t('configuracaoMetaPanel.profile.updateProfile')"
                    color="teal"
                    icon="edit"
                    @click="abrirModalPerfil"
                    :loading="loadingProfile"
                    :disable="!selectedWhatsapp"
                    class="full-width"
                    size="md"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Mensagem quando não há conexões -->
          <div v-if="cSessions.length === 0" class="row q-mb-md">
            <div class="col-12">
              <q-banner class="bg-orange-1 text-orange-8">
                <template v-slot:avatar>
                  <q-icon name="warning" color="orange" />
                </template>
                {{ $t('configuracaoMetaPanel.messages.noWabaConnections') }}
              </q-banner>
            </div>
          </div>

          <!-- Conteúdo da aba de telefones -->
          <div v-if="selectedWhatsapp">
            <div class="row q-col-gutter-lg">
              <!-- Informações do Telefone -->
              <div class="col-12 col-md-6">
                <q-card class="q-mb-md">
                  <q-card-section>
                    <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.phones.connectionInfo.title') }}</h6>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <q-input
                          v-model="selectedWhatsapp.tokenAPI"
                          :label="$t('configuracaoMetaPanel.phones.connectionInfo.phoneNumberId')"
                          outlined
                          dense
                          readonly
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          v-model="selectedWhatsapp.wabaId"
                          :label="$t('configuracaoMetaPanel.phones.connectionInfo.wabaId')"
                          outlined
                          dense
                          readonly
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <q-input
                          v-model="selectedWhatsapp.wabaVersion"
                          :label="$t('configuracaoMetaPanel.phones.connectionInfo.wabaVersion')"
                          outlined
                          dense
                          readonly
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>

                <!-- Status do Telefone -->
                <q-card v-if="phoneInfo">
                  <q-card-section>
                    <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.phones.phoneStatus.title') }}</h6>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <q-input
                          v-model="phoneInfo.display_phone_number"
                          :label="$t('configuracaoMetaPanel.phones.phoneStatus.phoneNumber')"
                          outlined
                          dense
                          readonly
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="phoneInfo.id"
                          :label="$t('configuracaoMetaPanel.phones.phoneStatus.phoneId')"
                          outlined
                          dense
                          readonly
                        />
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="phoneInfo.verified_name"
                          :label="$t('configuracaoMetaPanel.phones.phoneStatus.verifiedName')"
                          outlined
                          dense
                          readonly
                        />
                      </div>
                      <div class="col-12">
                        <q-chip
                          :color="phoneInfo.code_verification_status === 'VERIFIED' ? 'positive' : 'warning'"
                          text-color="white"
                          size="sm"
                        >
                          Status: {{ phoneInfo.code_verification_status || 'N/A' }}
                        </q-chip>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>

                <!-- Perfil do WhatsApp Business -->
                <q-card v-if="currentProfile && Object.keys(currentProfile).length > 0" class="q-mt-md">
                  <q-card-section>
                    <div class="row items-center justify-between">
                      <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.profile.profile') }}</h6>
                      <q-btn
                        flat
                        round
                        color="primary"
                        icon="edit"
                        size="sm"
                        @click="abrirModalPerfil"
                        :loading="loadingProfile"
                      />
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12" v-if="currentProfile.about">
                        <div class="text-caption text-grey-6">{{ $t('configuracaoMetaPanel.profile.about') }}</div>
                        <div class="text-body2">{{ currentProfile.about }}</div>
                      </div>
                      <div class="col-12" v-if="currentProfile.address">
                        <div class="text-caption text-grey-6">{{ $t('configuracaoMetaPanel.profile.address') }}</div>
                        <div class="text-body2">{{ currentProfile.address }}</div>
                      </div>
                      <div class="col-12" v-if="currentProfile.description">
                        <div class="text-caption text-grey-6">{{ $t('configuracaoMetaPanel.profile.description') }}</div>
                        <div class="text-body2">{{ currentProfile.description }}</div>
                      </div>
                      <div class="col-12" v-if="currentProfile.email">
                        <div class="text-caption text-grey-6">{{ $t('configuracaoMetaPanel.profile.email') }}</div>
                        <div class="text-body2">{{ currentProfile.email }}</div>
                      </div>
                      <div class="col-12" v-if="currentProfile.vertical">
                        <div class="text-caption text-grey-6">{{ $t('configuracaoMetaPanel.profile.vertical') }}</div>
                        <q-chip
                          :color="getVerticalColor(currentProfile.vertical)"
                          text-color="white"
                          size="sm"
                        >
                          {{ getVerticalLabel(currentProfile.vertical) }}
                        </q-chip>
                      </div>
                      <div class="col-12" v-if="currentProfile.websites && currentProfile.websites.length > 0">
                        <div class="text-caption text-grey-6">{{ $t('configuracaoMetaPanel.profile.websites') }}</div>
                        <div v-for="(website, index) in currentProfile.websites" :key="index" class="text-body2">
                          <a :href="website" target="_blank" class="text-primary">{{ website }}</a>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <!-- Painel Direito - Ações e Informações -->
              <div class="col-12 col-md-6">
                <q-card class="q-mb-md">
                  <q-card-section>
                    <div class="text-h6 q-mb-md">
                      <q-icon name="info" class="q-mr-sm" />
                      {{ $t('configuracaoMetaPanel.phones.tips.title') }}
                    </div>

                    <div class="q-gutter-md">
                      <div class="row items-center">
                        <q-icon name="info" color="primary" size="sm" class="q-mr-sm" />
                        <div>
                          <div class="text-weight-medium">{{ $t('configuracaoMetaPanel.phones.tips.phoneVerification.title') }}</div>
                          <div class="text-caption text-grey-6">
                            {{ $t('configuracaoMetaPanel.phones.tips.phoneVerification.description') }}
                          </div>
                        </div>
                      </div>

                      <div class="row items-center">
                        <q-icon name="warning" color="orange" size="sm" class="q-mr-sm" />
                        <div>
                          <div class="text-weight-medium">{{ $t('configuracaoMetaPanel.phones.tips.phoneRegistration.title') }}</div>
                          <div class="text-caption text-grey-6">
                            {{ $t('configuracaoMetaPanel.phones.tips.phoneRegistration.description') }}
                          </div>
                        </div>
                      </div>

                      <div class="row items-center">
                        <q-icon name="check_circle" color="green" size="sm" class="q-mr-sm" />
                        <div>
                          <div class="text-weight-medium">{{ $t('configuracaoMetaPanel.phones.tips.verifiedStatus.title') }}</div>
                          <div class="text-caption text-grey-6">
                            {{ $t('configuracaoMetaPanel.phones.tips.verifiedStatus.description') }}
                          </div>
                        </div>
                      </div>

                      <div class="row items-center">
                        <q-icon name="link" color="purple" size="sm" class="q-mr-sm" />
                        <div>
                          <div class="text-weight-medium">{{ $t('configuracaoMetaPanel.phones.tips.facebookBusinessManager.title') }}</div>
                          <div class="text-caption text-grey-6">
                            {{ $t('configuracaoMetaPanel.phones.tips.facebookBusinessManager.description') }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>

          <!-- Mensagem quando não há conexão selecionada -->
          <div v-else-if="cSessions.length > 0" class="row q-mb-md">
            <div class="col-12">
              <q-banner class="bg-blue-1 text-blue-8">
                <template v-slot:avatar>
                  <q-icon name="info" color="blue" />
                </template>
                {{ $t('configuracaoMetaPanel.messages.selectConnectionToManage') }}
              </q-banner>
            </div>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Modal de Visualização -->
    <q-dialog v-model="showTemplateModal" maximized>
      <q-card class="template-modal-card">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ templateSelecionado?.name }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="template-modal-content">
          <div v-if="templateSelecionado">
            <div class="row q-col-gutter-md">
              <!-- Coluna de Informações -->
              <div class="col-12 col-md-5">
                <!-- Informações Básicas -->
                <q-card class="q-mb-md">
                  <q-card-section class="q-pa-sm">
                    <h6 class="text-weight-bold q-mb-sm">{{ $t('configuracaoMetaPanel.templates.details.info') }}</h6>
                    <div class="row q-col-gutter-sm">
                      <div class="col-6">
                        <div class="text-caption text-grey-6">{{ $t('configuracaoMetaPanel.templates.details.id') }}</div>
                        <div class="text-body2">{{ templateSelecionado.id }}</div>
                      </div>
                      <div class="col-6">
                        <div class="text-caption text-grey-6">{{ $t('configuracaoMetaPanel.templates.details.status') }}</div>
                        <q-chip :color="getStatusColor(templateSelecionado.status)" text-color="white" size="sm">
                          {{ templateSelecionado.status }}
                        </q-chip>
                      </div>
                      <div class="col-6">
                        <div class="text-caption text-grey-6">{{ $t('configuracaoMetaPanel.templates.details.category') }}</div>
                        <q-chip :color="getCategoryColor(templateSelecionado.category)" text-color="white" size="sm">
                          {{ templateSelecionado.category }}
                        </q-chip>
                      </div>
                      <div class="col-6">
                        <div class="text-caption text-grey-6">{{ $t('configuracaoMetaPanel.templates.details.language') }}</div>
                        <div class="text-body2">{{ templateSelecionado.language }}</div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                
                <!-- Componentes -->
                <q-card>
                  <q-card-section class="q-pa-sm">
                    <h6 class="text-weight-bold q-mb-sm">{{ $t('configuracaoMetaPanel.templates.details.components') }}</h6>
                    <div class="template-components-list">
                      <div v-for="(componente, index) in templateSelecionado.components" :key="index" class="component-item q-mb-sm">
                        <div class="component-header">
                          <q-chip :color="getComponentColor(componente.type)" text-color="white" size="sm" class="q-mr-sm">
                            {{ componente.type }}
                          </q-chip>
                          <q-chip v-if="componente.format" size="xs" color="grey-3" text-color="grey-8">
                            {{ componente.format }}
                          </q-chip>
                        </div>
                        <div v-if="componente.text" class="component-text q-mt-xs">
                          <div class="text-body2 text-grey-8">{{ componente.text }}</div>
                        </div>
                        <div v-if="componente.buttons && componente.buttons.length > 0" class="component-buttons q-mt-xs">
                          <div v-for="(botao, botaoIndex) in componente.buttons" :key="botaoIndex" class="q-mr-xs q-mb-xs">
                            <q-chip size="xs" color="primary" text-color="white">
                              {{ botao.text }} ({{ botao.type }})
                            </q-chip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              
              <!-- Coluna do Preview -->
              <div class="col-12 col-md-7">
                <div class="preview-container">
                  <h6 class="text-weight-bold text-center q-mb-md">{{ $t('configuracaoMetaPanel.preview.title') }}</h6>
                  <div class="mobile-mockup q-mx-auto">
                    <div class="mobile-notch"></div>
                    <div class="mobile-screen">
                      <div
                        class="preview-message-bubble"
                        :class="{ 'bubble-max-width': shouldMaximizeBubbleWidth }"
                      >
                        <div class="preview-header" v-if="getTemplatePreviewHeaderType">
                          <q-icon
                            v-if="getTemplatePreviewHeaderType === 'IMAGE' && (!getTemplatePreviewHeaderMediaUrl || !getTemplatePreviewHeaderMediaUrl)"
                            name="image" size="xl" color="grey-7" class="preview-header-icon"
                          />
                          <q-img
                            v-if="getTemplatePreviewHeaderType === 'IMAGE' && getTemplatePreviewHeaderMediaUrl && getTemplatePreviewHeaderMediaUrl"
                            :src="getTemplatePreviewHeaderMediaUrl" spinner-color="primary" contain
                            style="max-height: 160px;" class="preview-header-image"
                          >
                            <template v-slot:error>
                              <div class="absolute-full flex flex-center bg-negative text-white text-caption q-pa-xs">
                                {{ $t('configuracaoMetaPanel.preview.imageLoadError') }}
                              </div>
                            </template>
                          </q-img>
                          <q-icon
                            v-if="getTemplatePreviewHeaderType === 'VIDEO'"
                            name="movie" size="xl" color="grey-7" class="preview-header-icon"
                          />
                          <q-icon
                            v-if="getTemplatePreviewHeaderType === 'DOCUMENT'"
                            name="description" size="xl" color="grey-7" class="preview-header-icon"
                          />
                          <div v-if="getTemplatePreviewHeaderType === 'TEXT'" v-html="getTemplatePreviewHeaderContent" class="preview-header-text"></div>
                          <div v-if="getTemplatePreviewHeaderType === 'VIDEO' || getTemplatePreviewHeaderType === 'DOCUMENT'" class="preview-header-caption">
                            {{ getTemplatePreviewHeaderContent }}
                          </div>
                        </div>
                        
                        <div class="preview-body" v-if="getTemplatePreviewBodyContent">
                          <div v-html="getTemplatePreviewBodyContent" class="preview-body-text"></div>
                        </div>
                        
                        <div class="preview-footer" v-if="getTemplatePreviewFooterContent">
                          <div v-html="getTemplatePreviewFooterContent" class="preview-footer-text"></div>
                        </div>
                        
                        <div class="preview-buttons" v-if="getTemplatePreviewButtonType !== 'NONE'">
                          <div v-if="getTemplatePreviewButtonType === 'QUICK_REPLY'" class="preview-quick-reply-buttons">
                            <q-chip 
                              v-for="(botao, index) in getTemplatePreviewButtons" 
                              :key="index" 
                              dense 
                              clickable 
                              color="blue-1" 
                              text-color="blue-8" 
                              icon="reply" 
                              size="sm" 
                              class="q-ma-xs"
                            >
                              {{ botao.text }}
                            </q-chip>
                          </div>
                          <div v-if="getTemplatePreviewButtonType === 'CALL_TO_ACTION'" class="preview-action-buttons">
                            <q-btn 
                              v-for="(botao, index) in getTemplatePreviewButtons" 
                              :key="index" 
                              :icon="botao.type === 'PHONE_NUMBER' ? 'call' : 'link'" 
                              :label="botao.text" 
                              no-caps 
                              flat 
                              dense 
                              size="sm" 
                              class="full-width q-my-xs preview-cta-button" 
                              align="center" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal de Teste de Template -->
    <q-dialog v-model="showTestModal" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Enviar Template de Teste</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div v-if="templateParaTeste">
            <div class="q-mb-md">
              <h6 class="text-weight-bold">{{ templateParaTeste.name }}</h6>
              <p class="text-caption text-grey-6">{{ templateParaTeste.language }} • {{ templateParaTeste.category }}</p>
            </div>

            <q-form @submit="enviarTemplateTeste" class="q-gutter-md">
              <q-input
                v-model="numeroTeste"
                :label="$t('configuracaoMetaPanel.test.phoneNumber')"
                outlined
                dense
                placeholder="5511999999999"
                :rules="[
                  val => !!val || $t('configuracaoMetaPanel.common.fieldRequired'),
                  val => /^\d{10,15}$/.test(val) || $t('configuracaoMetaPanel.test.invalidNumber')
                ]"
                :hint="$t('configuracaoMetaPanel.test.phoneNumberHint')"
                persistent-hint
              />

              <!-- Campos para variáveis do template -->
              <div v-if="variaveisTemplate.length > 0" class="q-mt-md">
                <h6 class="text-weight-medium">{{ $t('configuracaoMetaPanel.test.variables') }}</h6>
                <div v-for="(variavel, index) in variaveisTemplate" :key="index" class="q-mb-sm">
                  <q-input
                    v-model="valoresVariaveis[index]"
                    :label="$t('configuracaoMetaPanel.test.variableValue', { index: index + 1 })"
                    outlined
                    dense
                    :placeholder="$t('configuracaoMetaPanel.test.variablePlaceholder', { variable: variavel })"
                    :rules="[val => !!val || $t('configuracaoMetaPanel.common.fieldRequired')]"
                  />
                </div>
              </div>

              <div class="q-mt-md">
                <h6 class="text-weight-medium">{{ $t('configuracaoMetaPanel.test.preview') }}</h6>
                <q-card outlined class="q-pa-md">
                  <div v-for="(componente, index) in templateParaTeste.components" :key="index" class="q-mb-sm">
                    <div v-if="componente.type === 'HEADER' && componente.text" class="text-weight-medium">
                      {{ substituirVariaveis(componente.text) }}
                    </div>
                    <div v-if="componente.type === 'BODY' && componente.text" class="text-body2">
                      {{ substituirVariaveis(componente.text) }}
                    </div>
                    <div v-if="componente.type === 'FOOTER' && componente.text" class="text-caption text-grey-6">
                      {{ substituirVariaveis(componente.text) }}
                    </div>
                    <div v-if="componente.type === 'BUTTONS' && componente.buttons" class="q-mt-sm">
                      <div v-for="(botao, botaoIndex) in componente.buttons" :key="botaoIndex">
                        <q-chip size="sm" color="primary">{{ botao.text }}</q-chip>
                      </div>
                    </div>
                  </div>
                </q-card>
              </div>

              <div class="row justify-end q-gutter-md q-mt-md">
                <q-btn
                  :label="$t('configuracaoMetaPanel.buttons.cancel')"
                  color="negative"
                  flat
                  v-close-popup
                />
                <q-btn
                  :label="$t('configuracaoMetaPanel.buttons.sendTest')"
                  color="primary"
                  type="submit"
                  :loading="loadingTeste"
                  icon="send"
                />
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal de Registro de Telefone -->
    <q-dialog v-model="showPhoneRegistrationModal" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ $t('configuracaoMetaPanel.novos.registerPhone') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-md">
            <div class="text-caption text-grey-6 q-mb-md">
              <q-icon name="info" class="q-mr-xs" />
              {{ $t('configuracaoMetaPanel.phoneRegistration.description') }}
            </div>

            <q-input
              v-model="phoneRegistrationData.phoneNumberId"
              :label="$t('configuracaoMetaPanel.phoneRegistration.phoneNumberId')"
              outlined
              dense
              :placeholder="$t('configuracaoMetaPanel.common.enterPhoneNumberId')"
              :rules="[val => !!val || $t('configuracaoMetaPanel.common.phoneNumberIdRequired')]"
              :hint="$t('configuracaoMetaPanel.phoneRegistration.phoneNumberIdHint')"
              persistent-hint
            />

            <q-input
              v-model="phoneRegistrationData.wabaId"
              :label="$t('configuracaoMetaPanel.phoneRegistration.wabaId')"
              outlined
              dense
              :placeholder="$t('configuracaoMetaPanel.common.enterWabaId')"
              :rules="[val => !!val || $t('configuracaoMetaPanel.common.wabaIdRequired')]"
              :hint="$t('configuracaoMetaPanel.phoneRegistration.wabaIdHint')"
              persistent-hint
            />

            <q-input
              v-model="phoneRegistrationData.wabaVersion"
              :label="$t('configuracaoMetaPanel.phoneRegistration.wabaVersion')"
              outlined
              dense
              :placeholder="$t('configuracaoMetaPanel.common.enterWabaVersion')"
              :rules="[val => !!val || $t('configuracaoMetaPanel.common.wabaVersionRequired')]"
              :hint="$t('configuracaoMetaPanel.phoneRegistration.wabaVersionHint')"
              persistent-hint
            />

            <q-input
              v-model="phoneRegistrationData.wabaToken"
              :label="$t('configuracaoMetaPanel.phoneRegistration.wabaToken')"
              outlined
              dense
              :placeholder="$t('configuracaoMetaPanel.common.enterWabaToken')"
              :rules="[val => !!val || $t('configuracaoMetaPanel.common.wabaTokenRequired')]"
              :hint="$t('configuracaoMetaPanel.phoneRegistration.wabaTokenHint')"
              persistent-hint
              type="password"
            />

            <q-input
              v-model="phoneRegistrationData.pin"
              :label="$t('configuracaoMetaPanel.phoneRegistration.pin')"
              outlined
              dense
              :placeholder="$t('configuracaoMetaPanel.common.enterPin')"
              :rules="[
                val => !!val || $t('configuracaoMetaPanel.common.fieldRequired'),
                val => val.length === 6 || $t('configuracaoMetaPanel.messages.pinFormatError'),
                val => /^\d{6}$/.test(val) || $t('configuracaoMetaPanel.messages.pinFormatError')
              ]"
              :hint="$t('configuracaoMetaPanel.phoneRegistration.pinHint')"
              persistent-hint
              maxlength="6"
              mask="######"
            />
          </div>

          <div class="row justify-end q-gutter-md q-mt-md">
            <q-btn
              :label="$t('configuracaoMetaPanel.buttons.cancel')"
              color="negative"
              flat
              v-close-popup
            />
            <q-btn
              :label="$t('configuracaoMetaPanel.buttons.registerPhone')"
              color="primary"
              @click="registrarTelefone"
              :loading="loadingPhoneRegistration"
              icon="phone"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal de Verificação de Código -->
    <q-dialog v-model="showVerificationModal" persistent>
      <q-card style="min-width: 400px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ verificationStep === 'request' ? $t('configuracaoMetaPanel.verification.requestTitle') : $t('configuracaoMetaPanel.verification.verifyTitle') }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div v-if="verificationData">
            <!-- Etapa 1: Solicitar código -->
            <div v-if="verificationStep === 'request'">
              <div class="q-mb-md">
                <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.verification.requestTitle') }}</h6>
                <p class="text-grey-7">
                  {{ $t('configuracaoMetaPanel.verification.requestDescription') }}
                </p>
              </div>

              <!-- Configurações de verificação -->
              <div class="q-mb-lg">
                <!-- Método de código -->
                <div class="q-mb-md">
                  <div class="text-subtitle2 q-mb-sm">{{ $t('configuracaoMetaPanel.verification.methodTitle') }}</div>
                  <q-option-group
                    v-model="verificationData.codeMethod"
                    :options="[
                      { label: $t('configuracaoMetaPanel.verification.smsOption'), value: 'SMS' },
                      { label: $t('configuracaoMetaPanel.verification.voiceOption'), value: 'VOICE' }
                    ]"
                    color="primary"
                    inline
                  />
                </div>

                <!-- Localização e Idioma -->
                <div class="row q-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-select
                      v-model="verificationData.locale"
                      :options="localeOptions"
                      :label="$t('configuracaoMetaPanel.verification.locale')"
                      outlined
                      dense
                      emit-value
                      map-options
                      :hint="$t('configuracaoMetaPanel.verification.localeHint')"
                      persistent-hint
                    />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-select
                      v-model="verificationData.language"
                      :options="languageOptions"
                      :label="$t('configuracaoMetaPanel.verification.language')"
                      outlined
                      dense
                      emit-value
                      map-options
                      :hint="$t('configuracaoMetaPanel.verification.languageHint')"
                      persistent-hint
                    />
                  </div>
                </div>
              </div>

              <div class="row justify-end q-gutter-md q-mt-md">
                <q-btn
                  :label="$t('configuracaoMetaPanel.buttons.cancel')"
                  color="negative"
                  flat
                  v-close-popup
                />
                <q-btn
                  :label="$t('configuracaoMetaPanel.buttons.requestCode')"
                  color="primary"
                  @click="solicitarCodigoVerificacao"
                  :loading="loadingCodeRequest"
                  icon="send"
                />
              </div>
            </div>

            <!-- Etapa 2: Verificar código -->
            <div v-if="verificationStep === 'verify'">
              <div class="q-mb-md">
                <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.verification.verifyTitle') }}</h6>
                <p class="text-grey-7">
                  {{ $t('configuracaoMetaPanel.verification.verifyDescription') }}
                </p>
                <q-input
                  v-model="verificationData.code"
                  :label="$t('configuracaoMetaPanel.verification.code')"
                  outlined
                  dense
                  :placeholder="$t('configuracaoMetaPanel.common.enterCode')"
                  :rules="[val => !!val || $t('configuracaoMetaPanel.common.codeRequired')]"
                  :hint="$t('configuracaoMetaPanel.verification.codeHint')"
                  persistent-hint
                />
              </div>

              <div class="row justify-end q-gutter-md q-mt-md">
                <q-btn
                  :label="$t('configuracaoMetaPanel.buttons.cancel')"
                  color="negative"
                  flat
                  v-close-popup
                />
                <q-btn
                  :label="$t('configuracaoMetaPanel.buttons.requestNewCode')"
                  color="warning"
                  flat
                  @click="solicitarCodigoVerificacao"
                  :loading="loadingCodeRequest"
                  icon="refresh"
                />
                <q-btn
                  :label="$t('configuracaoMetaPanel.buttons.verify')"
                  color="primary"
                  @click="verificarCodigo"
                  :loading="loadingVerification"
                  icon="check"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal de Configuração de Webhook -->
    <q-dialog v-model="showWebhookModal" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ $t('configuracaoMetaPanel.novos.configureWebhook') }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-mb-md">
            <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.novos.configureWebhook') }}</h6>
            <p class="text-grey-7">
              {{ $t('configuracaoMetaPanel.novos.configureWebhookDescription') }}
            </p>
          </div>

          <div class="q-gutter-md">
            <q-input
              v-model="webhookData.callbackUrl"
              :label="$t('configuracaoMetaPanel.novos.callbackUrl')"
              outlined
              dense
              :placeholder="cBaseUrlIntegração + '/' + this.usuario.tenantId"
              :hint="'URL Callback (ex: ' + cBaseUrlIntegração + '/1)'"
              persistent-hint
              :rules="[val => !!val || $t('configuracaoMetaPanel.novos.callbackUrlRequired')]"
            />
            
            <q-input
              v-model="webhookData.verifyToken"
              :label="$t('configuracaoMetaPanel.novos.verifyToken')"
              outlined
              dense
              :placeholder="$t('configuracaoMetaPanel.novos.metaToken')"
              :hint="$t('configuracaoMetaPanel.novos.metaTokenHint')"
              persistent-hint
              :rules="[val => !!val || $t('configuracaoMetaPanel.novos.metaTokenRequired')]"
            />
          </div>

          <div class="row justify-end q-gutter-md q-mt-md">
            <q-btn
              :label="$t('configuracaoMetaPanel.buttons.cancel')"
              color="negative"
              flat
              v-close-popup
            />
            <q-btn
              :label="$t('configuracaoMetaPanel.novos.overrideWebhook')"
              color="primary"
              @click="sobrescreverWebhook"
              :loading="loadingWebhook"
              icon="webhook"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal de Perfil do WhatsApp Business -->
    <q-dialog v-model="showProfileModal" persistent>
      <q-card style="min-width: 600px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ $t('configuracaoMetaPanel.profile.profile') }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div v-if="loadingProfile" class="text-center q-pa-lg">
            <q-spinner-dots color="primary" size="50px" />
            <div class="text-subtitle1 q-mt-md">{{ $t('configuracaoMetaPanel.profile.loadingProfile') }}</div>
          </div>

          <div v-else>
            <div class="q-mb-md">
              <div class="row items-center justify-between">
                <div>
                  <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.profile.configureProfile') }}</h6>
                  <p class="text-grey-7">
                    {{ $t('configuracaoMetaPanel.profile.configureProfileDescription') }}
                  </p>
                </div>
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="refresh"
                  size="sm"
                  @click="recarregarPerfil"
                  :loading="loadingProfile"
                  :title="$t('configuracaoMetaPanel.profile.reloadProfile')"
                />
              </div>
            </div>

            <div class="q-gutter-md">
              <q-input
                v-model="profileData.about"
                :label="$t('configuracaoMetaPanel.profile.about')"
                outlined
                dense
                type="textarea"
                rows="2"
                :placeholder="$t('configuracaoMetaPanel.profile.aboutPlaceholder')"
                :hint="$t('configuracaoMetaPanel.profile.aboutHint')"
                persistent-hint
                counter
                maxlength="512"
              />
              
              <q-input
                v-model="profileData.address"
                :label="$t('configuracaoMetaPanel.profile.address')"
                outlined
                dense
                :placeholder="$t('configuracaoMetaPanel.profile.addressPlaceholder')"
                :hint="$t('configuracaoMetaPanel.profile.addressHint')"
                persistent-hint
              />
              
              <q-input
                v-model="profileData.description"
                :label="$t('configuracaoMetaPanel.profile.description')"
                outlined
                dense
                type="textarea"
                rows="3"
                :placeholder="$t('configuracaoMetaPanel.profile.descriptionPlaceholder')"
                :hint="$t('configuracaoMetaPanel.profile.descriptionHint')"
                persistent-hint
                counter
                maxlength="1024"
              />
              
              <q-input
                v-model="profileData.email"
                :label="$t('configuracaoMetaPanel.profile.email')"
                outlined
                dense
                type="email"
                :placeholder="$t('configuracaoMetaPanel.profile.emailPlaceholder')"
                :hint="$t('configuracaoMetaPanel.profile.emailHint')"
                persistent-hint
                :rules="[val => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Email inválido']"
              />
              
              <q-select
                v-model="profileData.vertical"
                :options="verticalOptions"
                :label="$t('configuracaoMetaPanel.profile.vertical')"
                outlined
                dense
                :placeholder="$t('configuracaoMetaPanel.profile.verticalPlaceholder')"
                :hint="$t('configuracaoMetaPanel.profile.verticalHint')"
                persistent-hint
                emit-value
                map-options
              />
              
              <q-input
                v-model="profileData.websites"
                :label="$t('configuracaoMetaPanel.profile.websites')"
                outlined
                dense
                :placeholder="$t('configuracaoMetaPanel.profile.websitesPlaceholder')"
                :hint="$t('configuracaoMetaPanel.profile.websitesHint')"
                persistent-hint
              />
            </div>

            <div class="row justify-end q-gutter-md q-mt-md">
              <q-btn
                :label="$t('configuracaoMetaPanel.profile.cancel')"
                color="negative"
                flat
                v-close-popup
              />
              <q-btn
                :label="$t('configuracaoMetaPanel.profile.saveProfile')"
                color="primary"
                @click="salvarPerfil"
                :loading="loadingProfileUpdate"
                icon="save"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Modal de Configuração SIP -->
    <q-dialog v-model="showSIPModal" persistent>
      <q-card style="min-width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ $t('configuracaoMetaPanel.novos.configureSIP') }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-mb-md">
            <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.novos.configureSIP') }}</h6>
            <p class="text-grey-7">
              {{ $t('configuracaoMetaPanel.novos.configureSIPDescription') }}
            </p>
          </div>

          <div class="q-gutter-md">
            <q-input
              v-model="sipData.hostname"
              :label="$t('configuracaoMetaPanel.novos.hostnameSIP')"
              outlined
              dense
              :placeholder="$t('configuracaoMetaPanel.novos.hostnameSIPPlaceholder')"
              :hint="$t('configuracaoMetaPanel.novos.hostnameSIPHint')"
              persistent-hint
              :rules="[
                val => !!val || $t('configuracaoMetaPanel.novos.hostnameSIPRequired'),
                val => /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) || $t('configuracaoMetaPanel.novos.hostnameSIPInvalid')
              ]"
            />
            
            <q-input
              v-model="sipData.port"
              :label="$t('configuracaoMetaPanel.novos.portSIP')"
              outlined
              dense
              :placeholder="$t('configuracaoMetaPanel.novos.portSIPPlaceholder')"
              :hint="$t('configuracaoMetaPanel.novos.portSIPHint')"
              persistent-hint
              type="number"
              min="1"
              max="65535"
              :rules="[
                val => !!val || $t('configuracaoMetaPanel.novos.portSIPRequired'),
                val => (val >= 1 && val <= 65535) || $t('configuracaoMetaPanel.novos.portSIPInvalid')
              ]"
            />

            <div class="q-mt-md">
              <q-banner class="bg-blue-1 text-blue-8">
                <template v-slot:avatar>
                  <q-icon name="info" color="blue" />
                </template>
                <div class="text-caption">
                  <strong>{{ $t('configuracaoMetaPanel.novos.important') }}:</strong> {{ $t('configuracaoMetaPanel.novos.configureSIPDescription2') }}
                </div>
              </q-banner>
            </div>
          </div>

          <div class="row justify-end q-gutter-md q-mt-md">
            <q-btn
              :label="$t('configuracaoMetaPanel.buttons.cancel')"
              color="negative"
              flat
              v-close-popup
            />
            <q-btn
              :label="$t('configuracaoMetaPanel.novos.configureSIP')"
              color="primary"
              @click="configurarSIP"
              :loading="loadingSIP"
              icon="phone"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import { 
  BuscarTemplates, 
  CriarTemplate, 
  EditarTemplate, 
  ExcluirTemplate,
  TestarTemplate,
  RegistrarTelefone,
  ObterTelefonePorId,
  SolicitarCodigoVerificacao,
  VerificarCodigo,
  OverrideCallbackUrl,
  ObterPerfil,
  AtualizarPerfil,
  ConfigurarSIP
} from 'src/service/waba'

import { ListarTenantPorId } from 'src/service/tenants.js'
const usuario = JSON.parse(localStorage.getItem('usuario'))

export default defineComponent({
  name: 'ConfiguracoesMetaTemplates',
  data() {
    return {
      usuario,
      tab: 'phones',
      userProfile: 'user',
      loadingTemplates: false,
      loadingCreate: false,
      loadingEdit: false,
      loadingTeste: false, // Novo campo para controlar o carregamento do teste
      templates: [],
      showTemplateModal: false,
      templateSelecionado: null,
      selectedWhatsapp: null,
      isEditing: false, // Novo campo para controlar modo de edição
      templateIdToEdit: null, // Novo campo para armazenar ID do template sendo editado
      filtros: {
        status: null,
        category: null,
        language: null,
        search: ''
      },
      novoTemplate: {
        name: '',
        language: '',
        category: '',
        components: []
      },
      statusOptions: [
        { label: this.$t('configuracaoMetaPanel.label.approved'), value: 'APPROVED' },
        { label: this.$t('configuracaoMetaPanel.label.pending'), value: 'PENDING' },
        { label: this.$t('configuracaoMetaPanel.label.rejected'), value: 'REJECTED' },
        { label: this.$t('configuracaoMetaPanel.label.inAppeal'), value: 'IN_APPEAL' },
        { label: this.$t('configuracaoMetaPanel.label.disabled'), value: 'DISABLED' }
      ],
      categoryOptions: [
        { label: this.$t('configuracaoMetaPanel.label.utility'), value: 'UTILITY' },
        { label: this.$t('configuracaoMetaPanel.label.marketing'), value: 'MARKETING' },
        { label: this.$t('configuracaoMetaPanel.label.authentication'), value: 'AUTHENTICATION' }
      ],
      localeOptions: [
        { label: this.$t('configuracaoMetaPanel.label.ptBR'), value: 'pt_BR' },
        { label: this.$t('configuracaoMetaPanel.label.ptPT'), value: 'pt_PT' },
        { label: this.$t('configuracaoMetaPanel.label.enUS'), value: 'en_US' },
        { label: this.$t('configuracaoMetaPanel.label.enGB'), value: 'en_GB' },
        { label: this.$t('configuracaoMetaPanel.label.esES'), value: 'es_ES' },
        { label: this.$t('configuracaoMetaPanel.label.esMX'), value: 'es_MX' },
        { label: this.$t('configuracaoMetaPanel.label.esAR'), value: 'es_AR' },
        { label: this.$t('configuracaoMetaPanel.label.frFR'), value: 'fr_FR' },
        { label: this.$t('configuracaoMetaPanel.label.frCA'), value: 'fr_CA' },
        { label: this.$t('configuracaoMetaPanel.label.itIT'), value: 'it_IT' },
        { label: this.$t('configuracaoMetaPanel.label.deDE'), value: 'de_DE' },
        { label: this.$t('configuracaoMetaPanel.label.nlNL'), value: 'nl_NL' },
        { label: this.$t('configuracaoMetaPanel.label.ruRU'), value: 'ru_RU' },
        { label: this.$t('configuracaoMetaPanel.label.jaJP'), value: 'ja_JP' },
        { label: this.$t('configuracaoMetaPanel.label.koKR'), value: 'ko_KR' },
        { label: this.$t('configuracaoMetaPanel.label.zhCN'), value: 'zh_CN' },
        { label: this.$t('configuracaoMetaPanel.label.zhTW'), value: 'zh_TW' },
        { label: this.$t('configuracaoMetaPanel.label.arAE'), value: 'ar_AE' },
        { label: this.$t('configuracaoMetaPanel.label.arEG'), value: 'ar_EG' },
        { label: this.$t('configuracaoMetaPanel.label.arSA'), value: 'ar_SA' },
        { label: this.$t('configuracaoMetaPanel.label.arMA'), value: 'ar_MA' },
        { label: this.$t('configuracaoMetaPanel.label.arTN'), value: 'ar_TN' },
        { label: this.$t('configuracaoMetaPanel.label.arDZ'), value: 'ar_DZ' },
        { label: this.$t('configuracaoMetaPanel.label.hiIN'), value: 'hi_IN' },
        { label: this.$t('configuracaoMetaPanel.label.trTR'), value: 'tr_TR' },
        { label: this.$t('configuracaoMetaPanel.label.plPL'), value: 'pl_PL' },
        { label: this.$t('configuracaoMetaPanel.label.svSE'), value: 'sv_SE' },
        { label: this.$t('configuracaoMetaPanel.label.noNO'), value: 'no_NO' },
        { label: this.$t('configuracaoMetaPanel.label.daDK'), value: 'da_DK' },
        { label: this.$t('configuracaoMetaPanel.label.fiFI'), value: 'fi_FI' },
        { label: this.$t('configuracaoMetaPanel.label.elGR'), value: 'el_GR' },
        { label: this.$t('configuracaoMetaPanel.label.huHU'), value: 'hu_HU' },
        { label: this.$t('configuracaoMetaPanel.label.csCZ'), value: 'cs_CZ' },
        { label: this.$t('configuracaoMetaPanel.label.skSK'), value: 'sk_SK' },
        { label: this.$t('configuracaoMetaPanel.label.roRO'), value: 'ro_RO' },
        { label: this.$t('configuracaoMetaPanel.label.bgBG'), value: 'bg_BG' },
        { label: this.$t('configuracaoMetaPanel.label.hrHR'), value: 'hr_HR' },
        { label: this.$t('configuracaoMetaPanel.label.srRS'), value: 'sr_RS' },
        { label: this.$t('configuracaoMetaPanel.label.slSI'), value: 'sl_SI' },
        { label: this.$t('configuracaoMetaPanel.label.etEE'), value: 'et_EE' },
        { label: this.$t('configuracaoMetaPanel.label.lvLV'), value: 'lv_LV' },
        { label: this.$t('configuracaoMetaPanel.label.ltLT'), value: 'lt_LT' },
        { label: this.$t('configuracaoMetaPanel.label.mtMT'), value: 'mt_MT' },
        { label: this.$t('configuracaoMetaPanel.label.isIS'), value: 'is_IS' },
        { label: this.$t('configuracaoMetaPanel.label.gaIE'), value: 'ga_IE' },
        { label: this.$t('configuracaoMetaPanel.label.cyGB'), value: 'cy_GB' },
        { label: this.$t('configuracaoMetaPanel.label.euES'), value: 'eu_ES' },
        { label: this.$t('configuracaoMetaPanel.label.caES'), value: 'ca_ES' },
        { label: this.$t('configuracaoMetaPanel.label.glES'), value: 'gl_ES' },
        { label: this.$t('configuracaoMetaPanel.label.caESVALENCIA'), value: 'ca_ES_VALENCIA' },
        { label: this.$t('configuracaoMetaPanel.label.heIL'), value: 'he_IL' },
        { label: this.$t('configuracaoMetaPanel.label.faIR'), value: 'fa_IR' },
        { label: this.$t('configuracaoMetaPanel.label.thTH'), value: 'th_TH' },
        { label: this.$t('configuracaoMetaPanel.label.viVN'), value: 'vi_VN' },
        { label: this.$t('configuracaoMetaPanel.label.idID'), value: 'id_ID' },
        { label: this.$t('configuracaoMetaPanel.label.msMY'), value: 'ms_MY' },
        { label: this.$t('configuracaoMetaPanel.label.filPH'), value: 'fil_PH' },
        { label: this.$t('configuracaoMetaPanel.label.bnIN'), value: 'bn_IN' },
        { label: this.$t('configuracaoMetaPanel.label.taIN'), value: 'ta_IN' },
        { label: this.$t('configuracaoMetaPanel.label.teIN'), value: 'te_IN' },
        { label: this.$t('configuracaoMetaPanel.label.mrIN'), value: 'mr_IN' },
        { label: this.$t('configuracaoMetaPanel.label.guIN'), value: 'gu_IN' },
        { label: this.$t('configuracaoMetaPanel.label.knIN'), value: 'kn_IN' },
        { label: this.$t('configuracaoMetaPanel.label.mlIN'), value: 'ml_IN' },
        { label: this.$t('configuracaoMetaPanel.label.paIN'), value: 'pa_IN' },
        { label: this.$t('configuracaoMetaPanel.label.urPK'), value: 'ur_PK' },
        { label: this.$t('configuracaoMetaPanel.label.sdPK'), value: 'sd_PK' },
        { label: this.$t('configuracaoMetaPanel.label.psAF'), value: 'ps_AF' },
        { label: this.$t('configuracaoMetaPanel.label.prsAF'), value: 'prs_AF' },
        { label: this.$t('configuracaoMetaPanel.label.uzUZ'), value: 'uz_UZ' },
        { label: this.$t('configuracaoMetaPanel.label.kkKZ'), value: 'kk_KZ' },
        { label: this.$t('configuracaoMetaPanel.label.kyKG'), value: 'ky_KG' },
        { label: this.$t('configuracaoMetaPanel.label.tgTJ'), value: 'tg_TJ' },
        { label: this.$t('configuracaoMetaPanel.label.tkTM'), value: 'tk_TM' },
        { label: this.$t('configuracaoMetaPanel.label.mnMN'), value: 'mn_MN' },
        { label: this.$t('configuracaoMetaPanel.label.neNP'), value: 'ne_NP' },
        { label: this.$t('configuracaoMetaPanel.label.siLK'), value: 'si_LK' },
        { label: this.$t('configuracaoMetaPanel.label.myMM'), value: 'my_MM' },
        { label: this.$t('configuracaoMetaPanel.label.kmKH'), value: 'km_KH' },
        { label: this.$t('configuracaoMetaPanel.label.loLA'), value: 'lo_LA' },
        { label: this.$t('configuracaoMetaPanel.label.mnMNCYRL'), value: 'mn_MN_CYRL' },
        { label: this.$t('configuracaoMetaPanel.label.mnMNMONG'), value: 'mn_MN_MONG' },
        { label: this.$t('configuracaoMetaPanel.label.amET'), value: 'am_ET' },
        { label: this.$t('configuracaoMetaPanel.label.tiET'), value: 'ti_ET' },
        { label: this.$t('configuracaoMetaPanel.label.soSO'), value: 'so_SO' },
        { label: this.$t('configuracaoMetaPanel.label.swKE'), value: 'sw_KE' },
        { label: this.$t('configuracaoMetaPanel.label.yoNG'), value: 'yo_NG' },
        { label: this.$t('configuracaoMetaPanel.label.igNG'), value: 'ig_NG' },
        { label: this.$t('configuracaoMetaPanel.label.haNG'), value: 'ha_NG' },
        { label: this.$t('configuracaoMetaPanel.label.zuZA'), value: 'zu_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.xhZA'), value: 'xh_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.afZA'), value: 'af_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.stZA'), value: 'st_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.tnZA'), value: 'tn_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.veZA'), value: 've_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.tsZA'), value: 'ts_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.nrZA'), value: 'nr_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.ndZA'), value: 'nd_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.nsoZA'), value: 'nso_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.sstZA'), value: 'sst_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.tsZA'), value: 'ts_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.veZA'), value: 've_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.nrZA'), value: 'nr_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.ndZA'), value: 'nd_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.nsoZA'), value: 'nso_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.sstZA'), value: 'sst_ZA' }
      ],
      languageOptions: [
        { label: this.$t('configuracaoMetaPanel.label.ptBR'), value: 'pt_BR' },
        { label: this.$t('configuracaoMetaPanel.label.enUS'), value: 'en_US' },
        { label: this.$t('configuracaoMetaPanel.label.esES'), value: 'es_ES' },
        { label: this.$t('configuracaoMetaPanel.label.frFR'), value: 'fr_FR' },
        { label: this.$t('configuracaoMetaPanel.label.deDE'), value: 'de_DE' },
        { label: this.$t('configuracaoMetaPanel.label.itIT'), value: 'it_IT' },
        { label: this.$t('configuracaoMetaPanel.label.ruRU'), value: 'ru_RU' },
        { label: this.$t('configuracaoMetaPanel.label.jaJP'), value: 'ja_JP' },
        { label: this.$t('configuracaoMetaPanel.label.zhCN'), value: 'zh_CN' },
        { label: this.$t('configuracaoMetaPanel.label.arAR'), value: 'ar_AR' },
        { label: this.$t('configuracaoMetaPanel.label.ptPT'), value: 'pt_PT' },
        { label: this.$t('configuracaoMetaPanel.label.enGB'), value: 'en_GB' },
        { label: this.$t('configuracaoMetaPanel.label.esMX'), value: 'es_MX' },
        { label: this.$t('configuracaoMetaPanel.label.esAR'), value: 'es_AR' },
        { label: this.$t('configuracaoMetaPanel.label.frCA'), value: 'fr_CA' },
        { label: this.$t('configuracaoMetaPanel.label.nlNL'), value: 'nl_NL' },
        { label: this.$t('configuracaoMetaPanel.label.hiIN'), value: 'hi_IN' },
        { label: this.$t('configuracaoMetaPanel.label.trTR'), value: 'tr_TR' },
        { label: this.$t('configuracaoMetaPanel.label.plPL'), value: 'pl_PL' },
        { label: this.$t('configuracaoMetaPanel.label.svSE'), value: 'sv_SE' },
        { label: this.$t('configuracaoMetaPanel.label.noNO'), value: 'no_NO' },
        { label: this.$t('configuracaoMetaPanel.label.daDK'), value: 'da_DK' },
        { label: this.$t('configuracaoMetaPanel.label.fiFI'), value: 'fi_FI' },
        { label: this.$t('configuracaoMetaPanel.label.elGR'), value: 'el_GR' },
        { label: this.$t('configuracaoMetaPanel.label.huHU'), value: 'hu_HU' },
        { label: this.$t('configuracaoMetaPanel.label.csCZ'), value: 'cs_CZ' },
        { label: this.$t('configuracaoMetaPanel.label.skSK'), value: 'sk_SK' },
        { label: this.$t('configuracaoMetaPanel.label.roRO'), value: 'ro_RO' },
        { label: this.$t('configuracaoMetaPanel.label.bgBG'), value: 'bg_BG' },
        { label: this.$t('configuracaoMetaPanel.label.hrHR'), value: 'hr_HR' },
        { label: this.$t('configuracaoMetaPanel.label.srRS'), value: 'sr_RS' },
        { label: this.$t('configuracaoMetaPanel.label.slSI'), value: 'sl_SI' },
        { label: this.$t('configuracaoMetaPanel.label.etEE'), value: 'et_EE' },
        { label: this.$t('configuracaoMetaPanel.label.lvLV'), value: 'lv_LV' },
        { label: this.$t('configuracaoMetaPanel.label.ltLT'), value: 'lt_LT' },
        { label: this.$t('configuracaoMetaPanel.label.mtMT'), value: 'mt_MT' },
        { label: this.$t('configuracaoMetaPanel.label.isIS'), value: 'is_IS' },
        { label: this.$t('configuracaoMetaPanel.label.gaIE'), value: 'ga_IE' },
        { label: this.$t('configuracaoMetaPanel.label.cyGB'), value: 'cy_GB' },
        { label: this.$t('configuracaoMetaPanel.label.euES'), value: 'eu_ES' },
        { label: this.$t('configuracaoMetaPanel.label.caES'), value: 'ca_ES' },
        { label: this.$t('configuracaoMetaPanel.label.glES'), value: 'gl_ES' },
        { label: this.$t('configuracaoMetaPanel.label.caESVALENCIA'), value: 'ca_ES_VALENCIA' },
        { label: this.$t('configuracaoMetaPanel.label.heIL'), value: 'he_IL' },
        { label: this.$t('configuracaoMetaPanel.label.faIR'), value: 'fa_IR' },
        { label: this.$t('configuracaoMetaPanel.label.thTH'), value: 'th_TH' },
        { label: this.$t('configuracaoMetaPanel.label.viVN'), value: 'vi_VN' },
        { label: this.$t('configuracaoMetaPanel.label.idID'), value: 'id_ID' },
        { label: this.$t('configuracaoMetaPanel.label.msMY'), value: 'ms_MY' },
        { label: this.$t('configuracaoMetaPanel.label.filPH'), value: 'fil_PH' },
        { label: this.$t('configuracaoMetaPanel.label.bnIN'), value: 'bn_IN' },
        { label: this.$t('configuracaoMetaPanel.label.taIN'), value: 'ta_IN' },
        { label: this.$t('configuracaoMetaPanel.label.teIN'), value: 'te_IN' },
        { label: this.$t('configuracaoMetaPanel.label.mrIN'), value: 'mr_IN' },
        { label: this.$t('configuracaoMetaPanel.label.guIN'), value: 'gu_IN' },
        { label: this.$t('configuracaoMetaPanel.label.knIN'), value: 'kn_IN' },
        { label: this.$t('configuracaoMetaPanel.label.mlIN'), value: 'ml_IN' },
        { label: this.$t('configuracaoMetaPanel.label.paIN'), value: 'pa_IN' },
        { label: this.$t('configuracaoMetaPanel.label.urPK'), value: 'ur_PK' },
        { label: this.$t('configuracaoMetaPanel.label.sdPK'), value: 'sd_PK' },
        { label: this.$t('configuracaoMetaPanel.label.psAF'), value: 'ps_AF' },
        { label: this.$t('configuracaoMetaPanel.label.prsAF'), value: 'prs_AF' },
        { label: this.$t('configuracaoMetaPanel.label.uzUZ'), value: 'uz_UZ' },
        { label: this.$t('configuracaoMetaPanel.label.kkKZ'), value: 'kk_KZ' },
        { label: this.$t('configuracaoMetaPanel.label.kyKG'), value: 'ky_KG' },
        { label: this.$t('configuracaoMetaPanel.label.tgTJ'), value: 'tg_TJ' },
        { label: this.$t('configuracaoMetaPanel.label.tkTM'), value: 'tk_TM' },
        { label: this.$t('configuracaoMetaPanel.label.mnMN'), value: 'mn_MN' },
        { label: this.$t('configuracaoMetaPanel.label.neNP'), value: 'ne_NP' },
        { label: this.$t('configuracaoMetaPanel.label.siLK'), value: 'si_LK' },
        { label: this.$t('configuracaoMetaPanel.label.myMM'), value: 'my_MM' },
        { label: this.$t('configuracaoMetaPanel.label.kmKH'), value: 'km_KH' },
        { label: this.$t('configuracaoMetaPanel.label.loLA'), value: 'lo_LA' },
        { label: this.$t('configuracaoMetaPanel.label.mnMNCYRL'), value: 'mn_MN_CYRL' },
        { label: this.$t('configuracaoMetaPanel.label.mnMNMONG'), value: 'mn_MN_MONG' },
        { label: this.$t('configuracaoMetaPanel.label.amET'), value: 'am_ET' },
        { label: this.$t('configuracaoMetaPanel.label.tiET'), value: 'ti_ET' },
        { label: this.$t('configuracaoMetaPanel.label.soSO'), value: 'so_SO' },
        { label: this.$t('configuracaoMetaPanel.label.swKE'), value: 'sw_KE' },
        { label: this.$t('configuracaoMetaPanel.label.yoNG'), value: 'yo_NG' },
        { label: this.$t('configuracaoMetaPanel.label.igNG'), value: 'ig_NG' },
        { label: this.$t('configuracaoMetaPanel.label.haNG'), value: 'ha_NG' },
        { label: this.$t('configuracaoMetaPanel.label.zuZA'), value: 'zu_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.xhZA'), value: 'xh_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.afZA'), value: 'af_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.stZA'), value: 'st_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.tnZA'), value: 'tn_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.veZA'), value: 've_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.tsZA'), value: 'ts_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.nrZA'), value: 'nr_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.ndZA'), value: 'nd_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.nsoZA'), value: 'nso_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.sstZA'), value: 'sst_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.tsZA'), value: 'ts_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.tshivenda'), value: 've_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.isiNdebeleSu'), value: 'nr_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.isiNdebeleNo'), value: 'nd_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.Sepedi'), value: 'nso_ZA' },
        { label: this.$t('configuracaoMetaPanel.label.Sesotho'), value: 'sst_ZA' }
      ],
      componentTypeOptions: [
        { label: this.$t('configuracaoMetaPanel.label.header'), value: 'HEADER' },
        { label: this.$t('configuracaoMetaPanel.label.body'), value: 'BODY' },
        { label: this.$t('configuracaoMetaPanel.label.footer'), value: 'FOOTER' },
        { label: this.$t('configuracaoMetaPanel.label.buttons'), value: 'BUTTONS' }
      ],
      headerFormatOptions: [
        { label: this.$t('configuracaoMetaPanel.label.texto'), value: 'TEXT' },
        { label: this.$t('configuracaoMetaPanel.label.imagem'), value: 'IMAGE' },
        { label: this.$t('configuracaoMetaPanel.label.documento'), value: 'DOCUMENT' },
        { label: this.$t('configuracaoMetaPanel.label.video'), value: 'VIDEO' },
        { label: this.$t('configuracaoMetaPanel.label.localizacao'), value: 'LOCATION' }
      ],
      buttonTypeOptions: [
        { label: this.$t('configuracaoMetaPanel.label.quickReply'), value: 'QUICK_REPLY' },
        { label: this.$t('configuracaoMetaPanel.label.url'), value: 'URL' },
        { label: this.$t('configuracaoMetaPanel.label.telefone'), value: 'PHONE_NUMBER' },
        { label: this.$t('configuracaoMetaPanel.label.otp'), value: 'OTP' }
      ],
      novoTipoComponente: null, // Novo campo para controlar o tipo do componente sendo adicionado
      showTestModal: false, // Novo campo para controlar a visibilidade do modal de teste
      templateParaTeste: null, // Novo campo para armazenar o template selecionado para teste
      numeroTeste: '', // Novo campo para armazenar o número de telefone para teste
      variaveisTemplate: [], // Novo campo para armazenar as variáveis do template
      valoresVariaveis: [], // Novo campo para armazenar os valores das variáveis
      loadingUpload: false, // Novo campo para controlar o carregamento do upload manual
      appId: '', // Novo campo para armazenar o App ID
      previewData: { // Novo campo para armazenar dados do preview
        headerType: null,
        headerContent: '',
        headerMediaUrl: null,
        bodyContent: '',
        footerContent: '',
        buttonType: 'NONE',
        quickReplyButtons: [],
        actionButtons: [],
        flowButtons: [],
        catalogButtons: []
      },
      previewHeaderContent: '',
      previewBodyContent: '',
      previewFooterContent: '',
      previewButtonType: 'NONE',
      previewQuickReplyButtons: [],
      previewActionButtons: [],
      previewFlowButtons: [],
      previewCatalogButtons: [],
      shouldMaximizeBubbleWidth: false,
      // Campos para verificação e registro de telefone
      showPhoneRegistrationModal: false,
      phoneRegistrationData: {
        phoneNumberId: '',
        wabaId: '',
        wabaVersion: '',
        wabaToken: '',
        pin: ''
      },
      phoneInfo: null,
      loadingPhoneCheck: false,
      loadingPhoneRegistration: false,
      // Campos para verificação de código
      showVerificationModal: false,
      verificationData: {
        phoneNumberId: '',
        wabaVersion: '',
        wabaToken: '',
        code: '',
        codeMethod: 'SMS',
        locale: 'pt_BR',
        language: 'pt_BR'
      },
      loadingVerification: false,
      loadingCodeRequest: false,
      verificationStep: 'request', // 'request' ou 'verify'
      showWebhookModal: false,
      webhookData: {
        callbackUrl: '',
        verifyToken: ''
      },
      loadingWebhook: false,
      // Campos para perfil do WhatsApp Business
      showProfileModal: false,
      profileData: {
        about: '',
        address: '',
        description: '',
        email: '',
        vertical: '',
        websites: []
      },
      loadingProfile: false,
      loadingProfileUpdate: false,
      currentProfile: null,
      verticalOptions: [
        { label: this.$t('configuracaoMetaPanel.profile.retail'), value: 'RETAIL' },
        { label: this.$t('configuracaoMetaPanel.profile.services'), value: 'SERVICES' },
        { label: this.$t('configuracaoMetaPanel.profile.restaurant'), value: 'RESTAURANT' },
        { label: this.$t('configuracaoMetaPanel.profile.education'), value: 'EDUCATION' },
        { label: this.$t('configuracaoMetaPanel.profile.health'), value: 'HEALTH' },
        { label: this.$t('configuracaoMetaPanel.profile.technology'), value: 'TECHNOLOGY' },
        { label: this.$t('configuracaoMetaPanel.profile.beauty'), value: 'BEAUTY' },
        { label: this.$t('configuracaoMetaPanel.profile.automotive'), value: 'AUTOMOTIVE' },
        { label: this.$t('configuracaoMetaPanel.profile.realEstate'), value: 'REAL_ESTATE' },
        { label: this.$t('configuracaoMetaPanel.profile.financial'), value: 'FINANCIAL' },
        { label: this.$t('configuracaoMetaPanel.profile.sports'), value: 'SPORTS' },
        { label: this.$t('configuracaoMetaPanel.profile.entertainment'), value: 'ENTERTAINMENT' },
        { label: this.$t('configuracaoMetaPanel.profile.travel'), value: 'TRAVEL' },
        { label: this.$t('configuracaoMetaPanel.profile.wellness'), value: 'WELLNESS' },
        { label: this.$t('configuracaoMetaPanel.profile.pet'), value: 'PET' },
        { label: this.$t('configuracaoMetaPanel.profile.other'), value: 'OTHER' }
      ],
      // Sistema de gerenciamento de memória
      timers: [],
      eventListeners: [],
      
      // Modal SIP
      showSIPModal: false,
      sipData: {
        hostname: '',
        port: 5061
      },
      loadingSIP: false
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      return this.whatsapps.filter(w => w.type === 'waba' && !w.isDeleted && w.status === 'CONNECTED');
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ 
        label: w.name, 
        value: w.id, 
        tokenAPI: w.tokenAPI, 
        wabaId: w.wabaId, 
        bmToken: w.bmToken, 
        wabaVersion: w.wabaVersion 
      }))
    },
    templatesFiltrados() {
      let filtrados = this.templates

      if (this.filtros.status) {
        filtrados = filtrados.filter(t => t.status === this.filtros.status.value)
      }

      if (this.filtros.category) {
        filtrados = filtrados.filter(t => t.category === this.filtros.category.value)
      }

      if (this.filtros.language) {
        filtrados = filtrados.filter(t => t.language === this.filtros.language.value)
      }

      if (this.filtros.search) {
        const search = this.filtros.search.toLowerCase()
        filtrados = filtrados.filter(t => 
          t.name.toLowerCase().includes(search) ||
          (t.components && t.components.some(c => 
            c.text && c.text.toLowerCase().includes(search)
          ))
        )
      }

      return filtrados
    },
    
    cBaseUrlIntegração() {
      return `${process.env.URL_API}/metaWebhook`
    },
    
    // Computed properties para preview do template selecionado
    getTemplatePreviewHeaderType() {
      if (this.templateSelecionado) {
        const headerComponent = this.templateSelecionado.components?.find(c => c.type === 'HEADER');
        if (headerComponent && headerComponent.format) {
          return headerComponent.format;
        }
      }
      return null;
    },

    getTemplatePreviewHeaderMediaUrl() {
      if (this.templateSelecionado) {
        const headerComponent = this.templateSelecionado.components?.find(c => c.type === 'HEADER');
        if (headerComponent && headerComponent.example) {
          if (typeof headerComponent.example === 'string') {
            return headerComponent.example;
          } else if (typeof headerComponent.example === 'object' && headerComponent.example.header_handle) {
            return headerComponent.example.header_handle[0];
          }
        }
      }
      return null;
    },

    getTemplatePreviewHeaderContent() {
      if (this.templateSelecionado) {
        const headerComponent = this.templateSelecionado.components?.find(c => c.type === 'HEADER');
        if (headerComponent && headerComponent.text) {
          return this.substituirVariaveis(headerComponent.text);
        }
      }
      return '';
    },

    getTemplatePreviewBodyContent() {
      if (this.templateSelecionado) {
        const bodyComponent = this.templateSelecionado.components?.find(c => c.type === 'BODY');
        if (bodyComponent && bodyComponent.text) {
          return this.substituirVariaveis(bodyComponent.text);
        }
      }
      return '';
    },

    getTemplatePreviewFooterContent() {
      if (this.templateSelecionado) {
        const footerComponent = this.templateSelecionado.components?.find(c => c.type === 'FOOTER');
        if (footerComponent && footerComponent.text) {
          return this.substituirVariaveis(footerComponent.text);
        }
      }
      return '';
    },

    getTemplatePreviewButtonType() {
      if (this.templateSelecionado) {
        const buttonsComponent = this.templateSelecionado.components?.find(c => c.type === 'BUTTONS');
        if (buttonsComponent && buttonsComponent.buttons && buttonsComponent.buttons.length > 0) {
          
          // Determinar o tipo baseado no primeiro botão
          const firstButton = buttonsComponent.buttons[0];
          
          if (firstButton.type === 'QUICK_REPLY') {
            return 'QUICK_REPLY';
          } else if (firstButton.type === 'PHONE_NUMBER' || firstButton.type === 'URL') {
            return 'CALL_TO_ACTION';
          }
        }
      }
      return 'NONE';
    },

    getTemplatePreviewButtons() {
      if (this.templateSelecionado) {
        const buttonsComponent = this.templateSelecionado.components?.find(c => c.type === 'BUTTONS');
        if (buttonsComponent && buttonsComponent.buttons) {
          
          return buttonsComponent.buttons.map(b => ({
            text: b.text || 'Botão',
            type: b.type || 'QUICK_REPLY'
          }));
        }
      }
      return [];
    },
  },
  watch: {
    'novoTemplate.components': {
      handler(newComponents) {
        // Verificar e corrigir estrutura de componentes
        newComponents.forEach(componente => {
          this.garantirEstruturaComponente(componente)
        })
        // Atualizar preview
        this.atualizarPreview()
        // Ajustar posição do preview
        this.$nextTick(() => {
          this.atualizarPosicaoPreview()
        })
      },
      deep: true
    },
    'novoTemplate.name': {
      handler() {
        this.atualizarPreview()
      }
    },
    'novoTemplate.language': {
      handler() {
        this.atualizarPreview()
      }
    },
    'novoTemplate.category': {
      handler() {
        this.atualizarPreview()
      }
    }
  },
  methods: {
    // Sistema de gerenciamento de memória
    addTimer(timerId) {
      this.timers.push(timerId);
    },
    addEventListener(element, event, handler, options = {}) {
      element.addEventListener(event, handler, options);
      this.eventListeners.push({ element, event, handler, options });
    },
    clearAllTimers() {
      this.timers.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      this.timers = [];
    },
    removeAllEventListeners() {
      this.eventListeners.forEach(({ element, event, handler, options }) => {
        element.removeEventListener(event, handler, options);
      });
      this.eventListeners = [];
    },
    cleanupMemory() {
      this.clearAllTimers();
      this.removeAllEventListeners();
    },
    async listarTemplates() {
      try {
        this.loadingTemplates = true
        
        // Verificar se há conexões WABA disponíveis
        if (this.cSessions.length === 0) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.noWabaConnectionsFound'),
            timeout: 5000
          })
          return
        }

        // Se não há WhatsApp selecionado, usar o primeiro disponível
        if (!this.selectedWhatsapp && this.cSessionsOptions.length > 0) {
          this.selectedWhatsapp = this.cSessionsOptions[0]
        }

        if (!this.selectedWhatsapp) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.selectWabaToList'),
            timeout: 3000
          })
          return
        }

        const response = await BuscarTemplates(this.selectedWhatsapp.tokenAPI)
        // Ordenar templates por ordem alfabética
        const templatesOrdenados = (response.data.data || []).sort((a, b) => {
          const nameA = a.name ? a.name.toLowerCase() : '';
          const nameB = b.name ? b.name.toLowerCase() : '';
          return nameA.localeCompare(nameB);
        });
        this.templates = templatesOrdenados
      } catch (error) {
        console.error('Erro ao listar templates:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMetaPanel.templates.errors.listError'),
          timeout: 3000
        })
      } finally {
        this.loadingTemplates = false
      }
    },

    async criarTemplate() {
      try {
        this.loadingCreate = true
        
        // Verificar se há WhatsApp selecionado
        if (!this.selectedWhatsapp) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.selectWabaToCreate'),
            timeout: 5000
          })
          return
        }

        // Verificar se todos os campos obrigatórios estão preenchidos
        if (!this.appId || !this.appId.trim()) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.templates.createForm.appIdRequired'),
            timeout: 5000
          })
          return
        }

        if (!this.novoTemplate.name || !this.novoTemplate.name.trim()) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.templates.createForm.nameRequired'),
            timeout: 5000
          })
          return
        }

        if (!this.novoTemplate.language) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.templates.createForm.languageRequired'),
            timeout: 5000
          })
          return
        }

        if (!this.novoTemplate.category) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.templates.createForm.categoryRequired'),
            timeout: 5000
          })
          return
        }
        
        // Preparar dados do template, extraindo apenas os valores
        const templateData = {
          wabaId: this.selectedWhatsapp.wabaId,
          wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
          wabaToken: this.selectedWhatsapp.bmToken,
          tenantId: JSON.parse(localStorage.getItem('usuario')).tenantId,
          appId: this.appId, // Adicionar o appId
          template: {
            name: this.novoTemplate.name,
            language: this.novoTemplate.language?.value || this.novoTemplate.language,
            category: this.novoTemplate.category?.value || this.novoTemplate.category,
            components: this.novoTemplate.components
          }
        }


        await CriarTemplate(templateData)
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.templates.notifications.created'),
          timeout: 3000
        })

        this.limparFormulario()
        this.tab = 'templates'
        await this.listarTemplates()
      } catch (error) {
        console.error('Erro ao criar template:', error)
        
        // Verificar se é um erro sobre formato do nome
        if (error.response?.data?.error === 'Formato do nome inválido') {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMetaPanel.notifications.nameFormatted'),
            timeout: 8000
          })
        } else if (error.response?.data?.error === 'Limite de caracteres excedido' || error.response?.data?.error === 'Limites de caracteres excedidos') {
          // Mostrar detalhes específicos dos erros de limite
          const details = error.response.data.details || [];
          const message = details.length > 0 
            ? this.$t('configuracaoMetaPanel.notifications.characterLimitsExceeded', { details: details.join(', ') })
            : this.$t('configuracaoMetaPanel.notifications.characterLimitExceeded');
          
          this.$q.notify({
            type: 'warning',
            message: message,
            timeout: 8000
          })
        } else {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.createError'),
            timeout: 3000
          })
        }
      } finally {
        this.loadingCreate = false
      }
    },

    async editarTemplate(template) {
      this.templateSelecionado = template
      this.isEditing = true
      this.templateIdToEdit = template.id
      this.tab = 'create'
      
      // Preencher formulário com dados do template
      this.novoTemplate = {
        name: template.name,
        language: template.language,
        category: template.category,
        components: JSON.parse(JSON.stringify(template.components))
      }
    },

    async editarTemplateSubmit() {
      try {
        this.loadingEdit = true
        
        // Verificar se há WhatsApp selecionado
        if (!this.selectedWhatsapp) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.selectWabaToEdit'),
            timeout: 5000
          })
          return
        }

        // Verificar se todos os campos obrigatórios estão preenchidos
        if (!this.appId || !this.appId.trim()) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.templates.createForm.appIdRequired'),
            timeout: 5000
          })
          return
        }

        if (!this.novoTemplate.name || !this.novoTemplate.name.trim()) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.templates.createForm.nameRequired'),
            timeout: 5000
          })
          return
        }

        if (!this.novoTemplate.language) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.templates.createForm.languageRequired'),
            timeout: 5000
          })
          return
        }

        if (!this.novoTemplate.category) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.templates.createForm.categoryRequired'),
            timeout: 5000
          })
          return
        }
        
        // Preparar dados do template, extraindo apenas os valores
        const templateData = {
          wabaId: this.selectedWhatsapp.wabaId,
          wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
          wabaToken: this.selectedWhatsapp.bmToken,
          tenantId: JSON.parse(localStorage.getItem('usuario')).tenantId,
          templateId: this.templateIdToEdit,
          appId: this.appId, // Adicionar o appId
          template: {
            name: this.novoTemplate.name,
            language: this.novoTemplate.language?.value || this.novoTemplate.language,
            category: this.novoTemplate.category?.value || this.novoTemplate.category,
            components: this.novoTemplate.components
          }
        }

        await EditarTemplate(templateData)
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.templates.notifications.updated'),
          timeout: 3000
        })

        this.limparFormulario()
        this.tab = 'templates'
        await this.listarTemplates()
      } catch (error) {
        console.error('Erro ao editar template:', error)
        
        // Verificar se é um erro específico sobre templates de exemplo
        if (error.response?.data?.error === 'Template de exemplo não pode ser editado') {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMetaPanel.notifications.sampleTemplateEdit'),
            timeout: 5000
          })
        } else if (error.response?.data?.error === 'Formato do nome inválido') {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMetaPanel.notifications.nameFormatted'),
            timeout: 8000
          })
        } else if (error.response?.data?.error === 'Limite de caracteres excedido' || error.response?.data?.error === 'Limites de caracteres excedidos') {
          // Mostrar detalhes específicos dos erros de limite
          const details = error.response.data.details || [];
          const message = details.length > 0 
            ? this.$t('configuracaoMetaPanel.notifications.characterLimitsExceeded', { details: details.join(', ') })
            : this.$t('configuracaoMetaPanel.notifications.characterLimitExceeded');
          
          this.$q.notify({
            type: 'warning',
            message: message,
            timeout: 8000
          })
        } else {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.updateError'),
            timeout: 3000
          })
        }
      } finally {
        this.loadingEdit = false
      }
    },

    async confirmarExclusao(template) {
      this.$q.dialog({
        title: this.$t('configuracaoMetaPanel.templates.delete.confirmTitle'),
        message: this.$t('configuracaoMetaPanel.templates.delete.confirmMessage', { name: template.name }),
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          if (!this.selectedWhatsapp) {
            this.$q.notify({
              type: 'negative',
              message: this.$t('configuracaoMetaPanel.notifications.selectWabaToDelete'),
              timeout: 5000
            })
            return
          }
          await ExcluirTemplate({
            wabaId: this.selectedWhatsapp.wabaId,
            wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
            wabaToken: this.selectedWhatsapp.bmToken,
            tenantId: JSON.parse(localStorage.getItem('usuario')).tenantId,
            templateId: template.id,
            templateName: template.name
          })

          this.$q.notify({
            type: 'positive',
            message: this.$t('configuracaoMetaPanel.templates.notifications.deleted'),
            timeout: 3000
          })

          await this.listarTemplates()
        } catch (error) {
          console.error('Erro ao excluir template:', error)
          
          // Verificar se é um erro específico sobre templates de exemplo
          if (error.response?.data?.error === 'Template de exemplo não pode ser excluído') {
            this.$q.notify({
              type: 'warning',
              message: this.$t('configuracaoMetaPanel.notifications.sampleTemplateDelete'),
              timeout: 5000
            })
          } else {
            this.$q.notify({
              type: 'negative',
              message: this.$t('configuracaoMetaPanel.notifications.deleteError'),
              timeout: 3000
            })
          }
        }
      })
    },

    visualizarTemplate(template) {
      this.templateSelecionado = template
      this.showTemplateModal = true
    },

    abrirModalTeste(template) {
      this.templateParaTeste = template
      this.showTestModal = true
      this.numeroTeste = '' // Limpar o campo de número de telefone
      this.variaveisTemplate = [] // Limpar variáveis
      this.valoresVariaveis = [] // Limpar valores
      
      
      // Detectar variáveis no template
      this.detectarVariaveis(template)
    },

    detectarVariaveis(template) {
      const variaveis = new Set()
      
      
      // Procurar por variáveis {{1}}, {{2}}, etc. em todos os componentes
      if (template.components && Array.isArray(template.components)) {
        template.components.forEach(componente => {
          if (componente.text) {
            const matches = componente.text.match(/\{\{(\d+)\}\}/g)
            if (matches) {
              matches.forEach(match => {
                const numero = match.match(/\{\{(\d+)\}\}/)[1]
                variaveis.add(parseInt(numero))
              })
            }
          }
        })
      }
      
      // Também verificar se há variáveis no campo 'body' do template
      if (template.body) {
        const matches = template.body.match(/\{\{(\d+)\}\}/g)
        if (matches) {
          matches.forEach(match => {
            const numero = match.match(/\{\{(\d+)\}\}/)[1]
            variaveis.add(parseInt(numero))
          })
        }
      }
      
      // Ordenar variáveis e criar array
      this.variaveisTemplate = Array.from(variaveis).sort((a, b) => a - b).map(num => `Variável ${num}`)
      this.valoresVariaveis = new Array(this.variaveisTemplate.length).fill('')
      
    },

    aplicarFiltros() {
      // Os filtros são aplicados automaticamente via computed
    },

    adicionarComponente() {
      
      const novoComponente = {
        type: this.novoTipoComponente,
        text: ''
      }
      
      // Inicializar campos específicos baseado no tipo
      if (novoComponente.type === 'HEADER') {
        novoComponente.format = 'TEXT'
        novoComponente.example = null
      }
      if (novoComponente.type === 'BODY') {
        // BODY só precisa do texto
        delete novoComponente.format
        delete novoComponente.example
      }
      if (novoComponente.type === 'FOOTER') {
        // FOOTER só precisa do texto
        delete novoComponente.format
        delete novoComponente.example
      }
      if (novoComponente.type === 'BUTTONS') {
        // BUTTONS não precisa de texto, format ou example
        delete novoComponente.text
        delete novoComponente.format
        delete novoComponente.example
      }
      
      this.novoTemplate.components.push(novoComponente)
      
      // Garantir reatividade para o campo buttons
      if (novoComponente.type === 'BUTTONS') {
        this.$nextTick(() => {
          novoComponente.buttons = []
        })
      }
      
      this.novoTipoComponente = null // Limpar o seletor após adicionar
      
      // Atualizar preview após adicionar componente
      this.atualizarPreview()
      
      // Ajustar posição do preview após adicionar componente
      this.$nextTick(() => {
        this.atualizarPosicaoPreview()
      })
    },

    removerComponente(index) {
      this.novoTemplate.components.splice(index, 1)
      
      // Atualizar preview após remover componente
      this.atualizarPreview()
    },

    adicionarBotao(componente) {
      if (!componente.buttons) {
        componente.buttons = []
      }
      componente.buttons.push({
        type: 'QUICK_REPLY',
        text: ''
      })
      
      // Atualizar preview após adicionar botão
      this.atualizarPreview()
    },

    removerBotao(componente, index) {
      componente.buttons.splice(index, 1)
      
      // Atualizar preview após remover botão
      this.atualizarPreview()
    },

    onComponentTypeChange(componente) {
      // Resetar campos específicos quando o tipo muda
      if (componente.type === 'HEADER') {
        componente.format = 'TEXT'
        componente.text = ''
        componente.example = null
        // Remover campos que não são do HEADER
        delete componente.buttons
      }
      if (componente.type === 'BODY') {
        componente.text = ''
        // Remover campos que não são do BODY
        delete componente.format
        delete componente.example
        delete componente.buttons
      }
      if (componente.type === 'FOOTER') {
        componente.text = ''
        // Remover campos que não são do FOOTER
        delete componente.format
        delete componente.example
        delete componente.buttons
      }
      if (componente.type === 'BUTTONS') {
        // Remover campos que não são do BUTTONS
        delete componente.text
        delete componente.format
        delete componente.example
        // Garantir reatividade para o campo buttons
        this.$nextTick(() => {
          componente.buttons = []
        })
      }
      
      // Atualizar preview após alterar tipo do componente
      this.atualizarPreview()
    },

    onButtonTypeChange(botao) {
      // Resetar campos específicos quando o tipo do botão muda
      if (botao.type === 'URL') {
        botao.url = ''
      }
      if (botao.type === 'PHONE_NUMBER') {
        botao.phone_number = ''
      }
    },

    onHeaderFormatChange(componente) {
      // Resetar o campo example quando o formato muda
      if (componente.format === 'TEXT') {
        componente.example = null
      } else if (componente.format === 'LOCATION') {
        componente.example = {
          latitude: '',
          longitude: '',
          name: ''
        }
      } else {
        componente.example = ''
      }
    },

    garantirEstruturaComponente(componente) {
      // Garantir que o componente tenha a estrutura correta
      if (componente.type === 'BUTTONS' && !componente.buttons) {
        componente.buttons = []
      }
    },

    limparFormulario() {
      this.novoTemplate = {
        name: '',
        language: '',
        category: '',
        components: []
      }
      this.isEditing = false
      this.templateIdToEdit = null
      this.templateSelecionado = null
      this.novoTipoComponente = null // Limpar o seletor de tipo de componente
      this.appId = '' // Limpar o campo de App ID
    },

    getStatusColor(status) {
      const colors = {
        'APPROVED': 'positive',
        'PENDING': 'warning',
        'REJECTED': 'negative',
        'IN_APPEAL': 'orange',
        'DISABLED': 'grey'
      }
      return colors[status] || 'grey'
    },

    getCategoryColor(category) {
      const colors = {
        'UTILITY': 'blue',
        'MARKETING': 'purple',
        'AUTHENTICATION': 'green'
      }
      return colors[category] || 'grey'
    },

    getComponentColor(type) {
      const colors = {
        'HEADER': 'blue',
        'BODY': 'green',
        'FOOTER': 'orange',
        'BUTTONS': 'purple'
      }
      return colors[type] || 'grey'
    },

    getTemplatePreview(template) {
      // Retorna uma prévia do template baseada nos componentes
      const bodyComponent = template.components?.find(c => c.type === 'BODY')
      if (bodyComponent && bodyComponent.text) {
        return bodyComponent.text.substring(0, 100) + (bodyComponent.text.length > 100 ? '...' : '')
      }
      return this.$t('configuracaoMetaPanel.templates.noPreview')
    },

    isSampleTemplate(template) {
      // Verifica se o template é um template de exemplo fornecido pelo Facebook
      return template.name && template.name.startsWith('sample_');
    },

    getMaxLength(type) {
      if (type === 'HEADER') return 60;
      if (type === 'BODY') return 1024;
      if (type === 'FOOTER') return 60;
      if (type === 'BUTTONS') return 25; // Limite para o texto do botão
      return 0;
    },

    getCharacterLimitHint(type) {
      const maxLength = this.getMaxLength(type);
      if (maxLength === 0) return '';
      return `Máximo ${maxLength} caracteres`;
    },

    async enviarTemplateTeste() {
      try {
        this.loadingTeste = true
        if (!this.selectedWhatsapp) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.selectWabaToTest'),
            timeout: 5000
          })
          return
        }
        if (!this.numeroTeste) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.enterPhoneNumber'),
            timeout: 3000
          })
          return
        }

        // Validar se todas as variáveis foram preenchidas
        if (this.variaveisTemplate.length > 0) {
          const camposVazios = this.valoresVariaveis.some((valor, index) => !valor.trim())
          if (camposVazios) {
            this.$q.notify({
              type: 'warning',
              message: this.$t('configuracaoMetaPanel.notifications.fillVariables'),
              timeout: 5000
            })
            return
          }
        }

        const payload = {
          wabaId: this.selectedWhatsapp.tokenAPI, // Usar tokenAPI como phone_number_id
          wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
          wabaToken: this.selectedWhatsapp.bmToken,
          tenantId: JSON.parse(localStorage.getItem('usuario')).tenantId,
          templateId: this.templateParaTeste.id,
          phoneNumber: this.numeroTeste,
          templateName: this.templateParaTeste.name,
          language: this.templateParaTeste.language,
          parameters: this.prepararParametrosTemplate() // Adicionar parâmetros
        }


        await TestarTemplate(payload)

        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.notifications.testSent'),
          timeout: 5000
        })

        this.showTestModal = false
        this.templateParaTeste = null
        this.numeroTeste = ''
      } catch (error) {
        console.error('Erro ao enviar template de teste:', error)
        
        // Verificar se é um erro específico sobre formato do número
        if (error.response?.data?.error === 'Formato de número inválido') {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMetaPanel.notifications.invalidNumber'),
            timeout: 5000
          })
        } else {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.testError'),
            timeout: 5000
          })
        }
      } finally {
        this.loadingTeste = false
      }
    },

    substituirVariaveis(texto) {
      if (!texto) return texto;
      let result = texto;
      this.variaveisTemplate.forEach((variavel, index) => {
        const numeroVariavel = index + 1;
        const regex = new RegExp(`{{${numeroVariavel}}}`, 'g');
        const valor = this.valoresVariaveis[index] || `{{${numeroVariavel}}}`;
        result = result.replace(regex, valor);
      });
      return result;
    },

    prepararParametrosTemplate() {
      if (this.variaveisTemplate.length === 0) {
        return null;
      }
      
      const parametros = []
      this.variaveisTemplate.forEach((variavel, index) => {
        if (this.valoresVariaveis[index]) {
          parametros.push({
            type: 'text',
            text: this.valoresVariaveis[index]
          })
        }
      })
      
      return parametros
    },

    atualizarPreview() {
      // Reset preview data
      this.previewData = {
        headerType: null,
        headerContent: '',
        headerMediaUrl: null,
        bodyContent: '',
        footerContent: '',
        buttonType: 'NONE',
        quickReplyButtons: [],
        actionButtons: [],
        flowButtons: [],
        catalogButtons: []
      };
      this.previewHeaderContent = '';
      this.previewBodyContent = '';
      this.previewFooterContent = '';
      this.previewButtonType = 'NONE';
      this.previewQuickReplyButtons = [];
      this.previewActionButtons = [];
      this.previewFlowButtons = [];
      this.previewCatalogButtons = [];
      this.shouldMaximizeBubbleWidth = false;

      if (!this.novoTemplate.name || !this.novoTemplate.language || !this.novoTemplate.category) {
        return;
      }

      // Process components
      this.novoTemplate.components.forEach(componente => {
        if (componente.type === 'HEADER') {
          this.previewData.headerType = componente.format;
          if (componente.format === 'IMAGE' || componente.format === 'VIDEO' || componente.format === 'DOCUMENT') {
            this.previewData.headerMediaUrl = componente.example;
          } else if (componente.format === 'TEXT') {
            this.previewHeaderContent = componente.text || '';
          }
        } else if (componente.type === 'BODY') {
          this.previewBodyContent = componente.text || '';
        } else if (componente.type === 'FOOTER') {
          this.previewFooterContent = componente.text || '';
        } else if (componente.type === 'BUTTONS') {
          if (componente.buttons && componente.buttons.length > 0) {
            this.previewButtonType = 'QUICK_REPLY';
            this.previewQuickReplyButtons = componente.buttons.map(b => ({
              text: b.text || `Botão ${componente.buttons.indexOf(b) + 1}`,
              type: b.type || 'QUICK_REPLY'
            }));
          }
        }
      });

      // Simulate bubble width maximization for preview
      this.shouldMaximizeBubbleWidth = true;
    },

    getPreviewHeaderMediaUrl() {
      return this.previewData.headerMediaUrl;
    },

    getPreviewHeaderType() {
      return this.previewData.headerType;
    },

    adicionarScrollListener() {
      this.handleScroll = () => {
        this.atualizarPosicaoPreview()
      }
      
      this.addEventListener(window, 'scroll', this.handleScroll, { passive: true })
      this.addEventListener(window, 'resize', this.handleScroll, { passive: true })
      
      // Testar imediatamente
      this.$nextTick(() => {
        this.atualizarPosicaoPreview()
      })
    },
    
    removerScrollListener() {
      if (this.handleScroll) {
        // Os event listeners serão removidos automaticamente pelo cleanupMemory()
      }
    },
    
    atualizarPosicaoPreview() {
      const previewColumn = this.$refs.previewColumn
      if (!previewColumn) {
        return
      }
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const columnHeight = previewColumn.offsetHeight
      
      // Calcular posição que acompanha o scroll da página
      let topPosition = scrollTop + 20
      
      // Garantir que o preview não saia da tela
      const maxTop = windowHeight - columnHeight - 20
      const minTop = 20
      
      // Aplicar limites para manter o preview sempre visível
      topPosition = Math.max(minTop, Math.min(maxTop, topPosition))
      
      // Aplicar posição com transição suave
      previewColumn.style.setProperty('top', `${topPosition}px`, 'important')
    },

    // Método para verificar se o telefone está registrado
    async verificarTelefoneRegistrado() {
      try {
        this.loadingPhoneCheck = true
        
        if (!this.selectedWhatsapp) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.selectWabaToCheck'),
            timeout: 3000
          })
          return
        }

        const response = await ObterTelefonePorId({
          phoneNumberId: this.selectedWhatsapp.tokenAPI,
          wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
          wabaToken: this.selectedWhatsapp.bmToken
        })

        this.phoneInfo = response.data
        
        // Carregar perfil do WhatsApp Business
        try {
          const profileResponse = await ObterPerfil({
            phoneNumberId: this.selectedWhatsapp.tokenAPI,
            wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
            wabaToken: this.selectedWhatsapp.bmToken
          })
          
          this.currentProfile = profileResponse.data?.data?.[0] || {}
          
        } catch (profileError) {
          this.currentProfile = {}
          
          // Notificar sobre o erro do perfil, mas não interromper o fluxo
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMetaPanel.profile.profileLoadError'),
            timeout: 3000
          })
        }
        
        // Verificar se o telefone está registrado no WABA atual
        if (response.data.waba_id && response.data.waba_id === this.selectedWhatsapp.wabaId) {
          this.$q.notify({
            type: 'positive',
            message: this.$t('configuracaoMetaPanel.notifications.phoneAlreadyRegistered'),
            timeout: 3000
          })
        } else {
          // Verificar o status de verificação do código
          const verificationStatus = response.data.code_verification_status
          
          if (verificationStatus === 'EXPIRED') {
            this.$q.notify({
              type: 'warning',
              message: this.$t('configuracaoMetaPanel.notifications.codeExpired'),
              timeout: 5000
            })
            
            // Mostrar opção para solicitar novo código
            this.$q.dialog({
              title: this.$t('configuracaoMetaPanel.notifications.codeExpiredDialog.title'),
              message: this.$t('configuracaoMetaPanel.notifications.codeExpiredDialog.message'),
              cancel: true,
              persistent: true
            }).onOk(() => {
              this.abrirModalVerificacao()
            })
          } else if (verificationStatus === 'VERIFIED') {
            this.$q.notify({
              type: 'positive',
              message: this.$t('configuracaoMetaPanel.notifications.phoneVerifiedNotRegistered'),
              timeout: 3000
            })
          } else if (verificationStatus === 'NOT_VERIFIED') {
            this.$q.notify({
              type: 'warning',
              message: this.$t('configuracaoMetaPanel.notifications.phoneNotVerified'),
              timeout: 3000
            })
            
            // Mostrar opção para solicitar código
            this.$q.dialog({
              title: this.$t('configuracaoMetaPanel.notifications.phoneNotVerifiedDialog.title'),
              message: this.$t('configuracaoMetaPanel.notifications.phoneNotVerifiedDialog.message'),
              cancel: true,
              persistent: true
            }).onOk(() => {
              this.abrirModalVerificacao()
            })
          } else {
            this.$q.notify({
              type: 'warning',
              message: this.$t('configuracaoMetaPanel.notifications.phoneNotRegistered'),
              timeout: 3000
            })
          }
        }
      } catch (error) {
        console.error('Erro ao verificar telefone:', error)
        
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || this.$t('configuracaoMetaPanel.notifications.phoneCheckError'),
          timeout: 5000
        })
      } finally {
        this.loadingPhoneCheck = false
      }
    },

    // Método para abrir modal de registro de telefone
    abrirModalRegistroTelefone() {
      if (!this.selectedWhatsapp) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMetaPanel.notifications.selectWabaFirst'),
          timeout: 3000
        })
        return
      }

      this.phoneRegistrationData = {
        phoneNumberId: this.selectedWhatsapp.tokenAPI,
        wabaId: this.selectedWhatsapp.wabaId,
        wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
        wabaToken: this.selectedWhatsapp.bmToken,
        pin: ''
      }
      
      this.showPhoneRegistrationModal = true
    },

    // Método para registrar telefone
    async registrarTelefone() {
      try {
        this.loadingPhoneRegistration = true
        
        // Validar se todos os campos estão preenchidos
        if (!this.phoneRegistrationData.phoneNumberId || 
            !this.phoneRegistrationData.wabaId || 
            !this.phoneRegistrationData.wabaVersion || 
            !this.phoneRegistrationData.wabaToken ||
            !this.phoneRegistrationData.pin) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.allFieldsRequired'),
            timeout: 3000
          })
          return
        }

        // Validar formato do PIN
        if (!/^\d{6}$/.test(this.phoneRegistrationData.pin)) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.pinFormatError'),
            timeout: 3000
          })
          return
        }
        
        const response = await RegistrarTelefone({
          phoneNumberId: this.phoneRegistrationData.phoneNumberId,
          wabaId: this.phoneRegistrationData.wabaId,
          wabaVersion: this.phoneRegistrationData.wabaVersion,
          wabaToken: this.phoneRegistrationData.wabaToken,
          pin: this.phoneRegistrationData.pin
        })
        
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.notifications.phoneRegistered'),
          timeout: 5000
        })
        
        this.showPhoneRegistrationModal = false
        
        // Limpar dados do formulário
        this.phoneRegistrationData = {
          phoneNumberId: '',
          wabaId: '',
          wabaVersion: '',
          wabaToken: '',
          pin: ''
        }
        
        // Atualizar informações do telefone
        await this.verificarTelefoneRegistrado()
        
      } catch (error) {
        console.error('Erro ao registrar telefone:', error)
        
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || this.$t('configuracaoMetaPanel.notifications.phoneRegistrationError'),
          timeout: 5000
        })
      } finally {
        this.loadingPhoneRegistration = false
      }
    },

    // Método para abrir modal de verificação de código
    abrirModalVerificacao() {
      if (!this.selectedWhatsapp) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMetaPanel.notifications.selectWabaFirst'),
          timeout: 3000
        })
        return
      }

      this.verificationData = {
        phoneNumberId: this.selectedWhatsapp.tokenAPI,
        wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
        wabaToken: this.selectedWhatsapp.bmToken,
        code: '',
        codeMethod: 'SMS',
        locale: 'pt_BR',
        language: 'pt_BR'
      }
      
      this.verificationStep = 'request'
      this.showVerificationModal = true
    },

    // Método para solicitar código de verificação
    async solicitarCodigoVerificacao() {
      try {
        
        this.loadingCodeRequest = true
        
        const requestData = {
          phoneNumberId: this.verificationData.phoneNumberId,
          wabaVersion: this.verificationData.wabaVersion,
          wabaToken: this.verificationData.wabaToken,
          codeMethod: this.verificationData.codeMethod,
          locale: this.verificationData.locale,
          language: this.verificationData.language
        }
        
        
        const response = await SolicitarCodigoVerificacao(requestData)
        
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.notifications.codeSent'),
          timeout: 5000
        })
        
        // Mudar para o passo de verificação
        this.verificationStep = 'verify'
        
      } catch (error) {
        console.error('Erro ao solicitar código:', error)
        console.error('Detalhes do erro:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        })
        
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || this.$t('configuracaoMetaPanel.notifications.codeRequestError'),
          timeout: 5000
        })
      } finally {
        this.loadingCodeRequest = false
      }
    },

    // Método para verificar código
    async verificarCodigo() {
      try {
        this.loadingVerification = true
        
        if (!this.verificationData.code || this.verificationData.code.length < 4) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.notifications.enterCode'),
            timeout: 3000
          })
          return
        }
        
        const response = await VerificarCodigo({
          phoneNumberId: this.verificationData.phoneNumberId,
          wabaVersion: this.verificationData.wabaVersion,
          wabaToken: this.verificationData.wabaToken,
          code: this.verificationData.code
        })
        
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.notifications.codeVerified'),
          timeout: 5000
        })
        
        this.showVerificationModal = false
        
        // Atualizar informações do telefone
        await this.verificarTelefoneRegistrado()
        
      } catch (error) {
        console.error('Erro ao verificar código:', error)
        
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || this.$t('configuracaoMetaPanel.notifications.codeVerificationError'),
          timeout: 5000
        })
      } finally {
        this.loadingVerification = false
      }
    },

    // sobrescreverWebhook() {
    //   // Implemente a lógica para sobrescrever o webhook aqui
    //   this.loadingWebhook = true
    //   this.loadingWebhook = false
    // },

    // Método para abrir modal de webhook
    async abrirModalWebhook() {
      if (!this.selectedWhatsapp) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMetaPanel.notifications.selectWabaFirst'),
          timeout: 3000
        })
        return
      }

      try {
        // Buscar o metaToken do tenant
        const { data } = await ListarTenantPorId(this.usuario.tenantId)
        const metaToken = data[0]?.metaToken

        if (!metaToken) {
          this.$q.notify({
            type: 'negative',
            message: 'Meta Token não encontrado. Configure o token na seção de configurações.',
            timeout: 5000
          })
          return
        }

        this.webhookData = {
          callbackUrl: this.cBaseUrlIntegração + '/' + this.usuario.tenantId,
          verifyToken: metaToken
        }
        
        this.showWebhookModal = true
        
      } catch (error) {
        console.error('Erro ao buscar metaToken:', error)
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao buscar configurações do tenant. Tente novamente.',
          timeout: 5000
        })
      }
    },

    // Método para sobrescrever webhook
    async sobrescreverWebhook() {
      try {
        if (!this.webhookData.callbackUrl || !this.webhookData.verifyToken) {
          this.$q.notify({
            type: 'negative',
            message: 'Preencha todos os campos obrigatórios',
            timeout: 3000
          })
          return
        }

        this.loadingWebhook = true
        
        const requestData = {
          wabaId: this.selectedWhatsapp.wabaId,
          wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
          wabaToken: this.selectedWhatsapp.bmToken,
          overrideCallbackUri: this.webhookData.callbackUrl,
          verifyToken: this.webhookData.verifyToken
        }
        
        
        const response = await OverrideCallbackUrl(requestData)
        
        
        this.$q.notify({
          type: 'positive',
          message: 'Webhook configurado com sucesso!',
          timeout: 5000
        })
        
        this.showWebhookModal = false
        
      } catch (error) {
        console.error('Erro ao sobrescrever webhook:', error)
        console.error('Detalhes do erro:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        })
        
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || 'Erro ao configurar webhook. Verifique os dados e tente novamente.',
          timeout: 5000
        })
      } finally {
        this.loadingWebhook = false
      }
    },

    // Método para abrir modal de perfil do WhatsApp Business
    async abrirModalPerfil() {
      if (!this.selectedWhatsapp) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMetaPanel.notifications.selectWabaFirst'),
          timeout: 3000
        })
        return
      }

      // Abrir modal primeiro
      this.showProfileModal = true
      
      try {
        this.loadingProfile = true
        
        // Obter perfil atual
        const response = await ObterPerfil({
          phoneNumberId: this.selectedWhatsapp.tokenAPI,
          wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
          wabaToken: this.selectedWhatsapp.bmToken
        })

        this.currentProfile = response.data?.data?.[0] || {}
        
        // Preencher formulário com dados atuais
        this.profileData = {
          about: this.currentProfile.about || '',
          address: this.currentProfile.address || '',
          description: this.currentProfile.description || '',
          email: this.currentProfile.email || '',
          vertical: this.currentProfile.vertical || '',
          websites: this.currentProfile.websites ? this.currentProfile.websites.join(', ') : ''
        }
        
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMetaPanel.profile.profileLoadError'),
          timeout: 5000
        })
        
        // Fechar modal em caso de erro
        this.showProfileModal = false
      } finally {
        this.loadingProfile = false
      }
    },

    // Método para salvar perfil do WhatsApp Business
    async salvarPerfil() {
      try {
        this.loadingProfileUpdate = true
        
        // Validar campos obrigatórios
        if (!this.profileData.about || !this.profileData.address || !this.profileData.description || !this.profileData.email || !this.profileData.vertical) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.profile.requiredFieldsError'),
            timeout: 3000
          })
          return
        }

        // Validar formato do email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.profileData.email)) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.profile.invalidEmailFormat'),
            timeout: 3000
          })
          return
        }

        // Processar websites (separar por vírgula e limpar espaços)
        const websites = this.profileData.websites 
          ? this.profileData.websites.split(',').map(url => url.trim()).filter(url => url)
          : []

        const profileDataToSend = {
          phoneNumberId: this.selectedWhatsapp.tokenAPI,
          wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
          wabaToken: this.selectedWhatsapp.bmToken,
          profileData: {
            about: this.profileData.about,
            address: this.profileData.address,
            description: this.profileData.description,
            email: this.profileData.email,
            vertical: this.profileData.vertical,
            websites: websites
          }
        }

        const response = await AtualizarPerfil(profileDataToSend)
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.profile.profileUpdatedSuccess'),
          timeout: 3000
        })

        this.showProfileModal = false
        
        // Atualizar dados locais
        this.currentProfile = {
          ...this.currentProfile,
          ...this.profileData,
          websites: websites
        }
        
      } catch (error) {
        console.error('Erro ao salvar perfil:', error)
        
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || this.$t('configuracaoMetaPanel.profile.profileUpdateError'),
          timeout: 5000
        })
      } finally {
        this.loadingProfileUpdate = false
      }
    },

    // Método para obter cor do vertical
    getVerticalColor(vertical) {
      const colors = {
        'RETAIL': 'blue',
        'SERVICES': 'green',
        'RESTAURANT': 'orange',
        'EDUCATION': 'purple',
        'HEALTH': 'red',
        'TECHNOLOGY': 'cyan',
        'BEAUTY': 'pink',
        'AUTOMOTIVE': 'grey',
        'REAL_ESTATE': 'brown',
        'FINANCIAL': 'teal',
        'SPORTS': 'deep-orange',
        'ENTERTAINMENT': 'deep-purple',
        'TRAVEL': 'light-blue',
        'WELLNESS': 'light-green',
        'PET': 'amber',
        'OTHER': 'grey'
      }
      return colors[vertical] || 'grey'
    },

    // Método para obter label do vertical
    getVerticalLabel(vertical) {
      const labels = {
        'RETAIL': this.$t('configuracaoMetaPanel.profile.retail'),
        'SERVICES': this.$t('configuracaoMetaPanel.profile.services'),
        'RESTAURANT': this.$t('configuracaoMetaPanel.profile.restaurant'),
        'EDUCATION': this.$t('configuracaoMetaPanel.profile.education'),
        'HEALTH': this.$t('configuracaoMetaPanel.profile.health'),
        'TECHNOLOGY': this.$t('configuracaoMetaPanel.profile.technology'),
        'BEAUTY': this.$t('configuracaoMetaPanel.profile.beauty'),
        'AUTOMOTIVE': this.$t('configuracaoMetaPanel.profile.automotive'),
        'REAL_ESTATE': this.$t('configuracaoMetaPanel.profile.realEstate'),
        'FINANCIAL': this.$t('configuracaoMetaPanel.profile.financial'),
        'SPORTS': this.$t('configuracaoMetaPanel.profile.sports'),
        'ENTERTAINMENT': this.$t('configuracaoMetaPanel.profile.entertainment'),
        'TRAVEL': this.$t('configuracaoMetaPanel.profile.travel'),
        'WELLNESS': this.$t('configuracaoMetaPanel.profile.wellness'),
        'PET': this.$t('configuracaoMetaPanel.profile.pet'),
        'OTHER': this.$t('configuracaoMetaPanel.profile.other')
      }
      return labels[vertical] || vertical
    },

    // Método para recarregar perfil do WhatsApp Business
    async recarregarPerfil() {
      if (!this.selectedWhatsapp) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMetaPanel.notifications.selectWabaFirst'),
          timeout: 3000
        })
        return
      }

      try {
        this.loadingProfile = true
        
        const response = await ObterPerfil({
          phoneNumberId: this.selectedWhatsapp.tokenAPI,
          wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
          wabaToken: this.selectedWhatsapp.bmToken
        })

        this.currentProfile = response.data?.data?.[0] || {}
        
        // Preencher formulário com dados atuais
        this.profileData = {
          about: this.currentProfile.about || '',
          address: this.currentProfile.address || '',
          description: this.currentProfile.description || '',
          email: this.currentProfile.email || '',
          vertical: this.currentProfile.vertical || '',
          websites: this.currentProfile.websites ? this.currentProfile.websites.join(', ') : ''
        }
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.profile.profileReloadedSuccess'),
          timeout: 2000
        })
        
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMetaPanel.profile.profileReloadError'),
          timeout: 3000
        })
      } finally {
        this.loadingProfile = false
      }
    },

    // Método para abrir modal de configuração SIP
    abrirModalSIP() {
      if (!this.selectedWhatsapp) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMetaPanel.notifications.selectWabaFirst'),
          timeout: 3000
        })
        return
      }

      // Resetar dados do formulário
      this.sipData = {
        hostname: '',
        port: 5061
      }
      
      this.showSIPModal = true
    },

    // Método para configurar SIP
    async configurarSIP() {
      try {
        this.loadingSIP = true
        
        // Validar campos
        if (!this.sipData.hostname || !this.sipData.port) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.novos.fillRequiredFields'),
            timeout: 3000
          })
          return
        }

        // Validar formato da porta
        const port = parseInt(this.sipData.port)
        if (isNaN(port) || port < 1 || port > 65535) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.novos.portSIPInvalidMessage'),
            timeout: 3000
          })
          return
        }

        // Validar hostname
        if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.sipData.hostname)) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.novos.hostnameSIPInvalidMessage'),
            timeout: 3000
          })
          return
        }

        const requestData = {
          phoneNumberId: this.selectedWhatsapp.tokenAPI,
          wabaVersion: this.selectedWhatsapp.wabaVersion || 'v23.0',
          wabaToken: this.selectedWhatsapp.bmToken,
          sipConfig: {
            hostname: this.sipData.hostname,
            port: port
          }
        }

        const response = await ConfigurarSIP(requestData)
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.novos.SIPConfiguredSuccess'),
          timeout: 5000
        })
        
        this.showSIPModal = false
        
        // Limpar dados do formulário
        this.sipData = {
          hostname: '',
          port: 5061
        }
        
      } catch (error) {
        console.error('Erro ao configurar SIP:', error)
        
        let errorMessage = this.$t('configuracaoMetaPanel.novos.SIPConfiguredError')
        
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error
          
          // Adicionar detalhes específicos se disponíveis
          if (error.response.data.facebookError) {
            errorMessage += ` - ${error.response.data.facebookError}`
          }
        }
        
        this.$q.notify({
          type: 'negative',
          message: errorMessage,
          timeout: 5000
        })
      } finally {
        this.loadingSIP = false
      }
    },
  },

  async mounted() {
    this.userProfile = localStorage.getItem('profile')
    if (this.userProfile === 'admin') {
      // Selecionar automaticamente a primeira conexão WABA disponível
      if (this.cSessionsOptions.length > 0) {
        this.selectedWhatsapp = this.cSessionsOptions[0]
      }
      // Inicializar preview
      this.atualizarPreview()
      
      // Adicionar listener para scroll
      this.adicionarScrollListener()
    }
  },
  
  beforeUnmount() {
    // Remover listener de scroll
    this.removerScrollListener()
  },
  
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
})
</script>

<style lang="scss" scoped>
.template-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
}

.q-tabs {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 8px 8px 0 0;
  margin-bottom: 0;
}

.q-tab-panels {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 0 0 8px 8px;
  min-height: 400px;
}

/* Estilos do Preview */
.mobile-mockup {
  width: 280px;
  height: 500px;
  background: #1a1a1a;
  border-radius: 25px;
  padding: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  position: relative;
  margin: 0 auto;
}

.mobile-notch {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 25px;
  background: #000;
  border-radius: 0 0 15px 15px;
  z-index: 10;
}

.mobile-screen {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  border-radius: 17px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 20px 15px;
  box-sizing: border-box;
}

.preview-message-bubble {
  background: #dcf8c6;
  border-radius: 15px 15px 5px 15px;
  padding: 12px;
  max-width: 85%;
  word-wrap: break-word;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 10px;
  
  &.bubble-max-width {
    max-width: 95%;
  }
}

.preview-header {
  margin-bottom: 8px;
  
  .preview-header-icon {
    display: block;
    margin: 0 auto 8px;
    text-align: center;
  }
  
  .preview-header-image {
    border-radius: 8px;
    margin-bottom: 8px;
  }
  
  .preview-header-text {
    font-weight: 600;
    font-size: 16px;
    color: #1a1a1a;
    margin-bottom: 8px;
  }
  
  .preview-header-caption {
    font-size: 12px;
    color: #666;
    background: rgba(0,0,0,0.05);
    padding: 4px 8px;
    border-radius: 4px;
    word-break: break-all;
  }
}

.preview-body {
  font-size: 14px;
  line-height: 1.4;
  color: #1a1a1a;
  margin-bottom: 8px;
  white-space: pre-wrap;
}

.preview-footer {
  font-size: 12px;
  color: #666;
  font-style: italic;
  margin-bottom: 8px;
}

.preview-buttons {
  margin-top: 8px;
  
  .preview-quick-reply-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  
  .preview-action-buttons {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .preview-cta-button {
    background: #007bff;
    color: white;
    border-radius: 8px;
    
    &:hover {
      background: #0056b3;
    }
  }
}

/* Modo Escuro */
body.body--dark {
  .q-tabs {
    background: rgba(30, 30, 30, 0.95);
  }
  
  .q-tab-panels {
    background: rgba(30, 30, 30, 0.95);
  }
  
  .template-card {
    background: rgba(40, 40, 40, 0.95);
    border-color: rgba(255,255,255,0.1);
  }
  
  .mobile-screen {
    background: #2a2a2a;
  }
  
  .preview-message-bubble {
    background: #2d5a2d;
    color: #fff;
  }
  
  .preview-header-text {
    color: #fff;
  }
  
  .preview-body {
    color: #fff;
  }
  
  .preview-footer {
    color: #ccc;
  }
  
  .floating-preview-column {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  /* Títulos dos templates em branco */
  .template-card h6 {
    color: #fff !important;
  }
  
  /* Títulos das seções em branco */
  .q-card h6.text-weight-bold {
    color: #fff !important;
  }
  
  /* Título do preview em branco */
  .floating-preview-column .text-subtitle1 {
    color: #fff !important;
  }
  
  /* Fundo do preview mais escuro */
  .floating-preview-column {
    background: rgba(20, 20, 20, 0.95) !important;
    border-color: rgba(255, 255, 255, 0.2) !important;
  }
  
  /* Mobile mockup com fundo mais escuro */
  .mobile-mockup {
    background: #000 !important;
  }
  
  .mobile-screen {
    background: #1a1a1a !important;
  }
}

.floating-preview-column {
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  z-index: 9999 !important;
  width: 340px !important;
  max-height: calc(100vh - 40px) !important;
  overflow-y: auto !important;
  padding: 20px !important;
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px) !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  transition: top 0.1s ease-out !important;
  will-change: top !important;
}

.floating-preview-column:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15) !important;
  transform: scale(1.02) !important;
}

/* Responsividade para telas menores */
@media (max-width: 1023px) {
  .floating-preview-column {
    position: relative !important;
    top: auto !important;
    right: auto !important;
    margin-top: 20px;
    max-height: none;
    overflow-y: visible;
    width: 100% !important;
  }
  
  .floating-preview-column:hover {
    transform: none;
  }
}

/* Garantir que a coluna do preview acompanhe o scroll */
.col-12.col-md-6:last-child {
  position: relative;
}

.floating-preview-column {
  position: sticky;
  top: 20px;
  z-index: 10;
  height: fit-content;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  align-self: flex-start;
}

.template-modal-card {
  width: 100%;
  max-width: 100%;
  border-radius: 0;
  overflow: hidden;
}

.template-modal-content {
  padding: 20px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.component-item {
  border-bottom: 1px solid #f0f0f0;
  padding: 8px 0;
}

.component-item:last-child {
  border-bottom: none;
}

.component-header {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.component-text {
  margin: 4px 0;
  word-break: break-word;
}

.component-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.preview-container {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

/* Modo Escuro para o modal */
body.body--dark {
  .template-modal-content {
    background: rgba(30, 30, 30, 0.95);
  }
  
  .component-item {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  
  .preview-container {
    background-color: rgba(40, 40, 40, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style> 