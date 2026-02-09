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
      <q-tab name="facebook" :label="$t('configuracaoMeta.tabs.facebook') || 'Facebook Login'" />
      <q-tab name="config" :label="$t('configuracaoMeta.tabs.config')" />
      <q-tab name="templates" :label="$t('configuracaoMeta.tabs.templates')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <!-- Aba de Configurações -->
      <q-tab-panel name="config" class="q-pa-none">
        <q-list class="text-weight-medium">

          <q-item tag="label" v-ripple>
            <q-item-section @click="copiarLink">
              <q-item-label>{{ $t('configuracaoMeta.webhookMeta') }}</q-item-label>
              <q-item-label caption>{{ montarUrlIntegração() }}</q-item-label>
            </q-item-section>
            <q-tooltip content-class="bg-negative text-bold">
              {{ $t('configuracaoMeta.webhookTooltip') }}
            </q-tooltip>

            <q-item-section avatar @click.stop="copiarLink">
              <q-icon name="content_copy" color="primary" class="cursor-pointer" />
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section @click="copiarLinkInstagram">
              <q-item-label>{{ $t('configuracaoMeta.webhookInstagram') }}</q-item-label>
              <q-item-label caption>{{ montarUrlIntegraçãoInstagram() }}</q-item-label>
            </q-item-section>
            <q-tooltip content-class="bg-negative text-bold">
              {{ $t('configuracaoMeta.webhookInstagramTooltip') }}
            </q-tooltip>

            <q-item-section avatar @click.stop="copiarLinkInstagram">
              <q-icon name="content_copy" color="primary" class="cursor-pointer" />
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section @click="copiarLinkMessenger">
              <q-item-label>{{ $t('configuracaoMeta.webhookMessenger') }}</q-item-label>
              <q-item-label caption>{{ montarUrlIntegraçãoMessenger() }}</q-item-label>
            </q-item-section>
            <q-tooltip content-class="bg-negative text-bold">
              {{ $t('configuracaoMeta.webhookMessengerTooltip') }}
            </q-tooltip>

            <q-item-section avatar @click.stop="copiarLinkMessenger">
              <q-icon name="content_copy" color="primary" class="cursor-pointer" />
            </q-item-section>
          </q-item>

          <div class="row q-px-md">
            <div class="col-12" style="margin-top: 20px;">
              <q-input
                class="blur-effect custom-input-padding"
                v-model="metaToken"
                :type="showMetaToken ? 'text' : 'password'"
                dense
                outlined
                :label="$t('configuracaoMeta.metaTokenLabel')"
                input-style="min-height: 40px; max-height: 60px;"
                debounce="700"
                @update:model-value="alterarMetaToken()"
              >
                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    flat
                    icon="refresh"
                    @click="gerarNovoMetaToken"
                    :loading="loadingToken"
                  >
                    <q-tooltip>{{ $t('configuracoesWebchat.generateNewToken') || 'Gerar novo token' }}</q-tooltip>
                  </q-btn>
                  <q-icon
                    :name="showMetaToken ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer q-ml-sm"
                    @click="showMetaToken = !showMetaToken"
                  />
                </template>
              </q-input>
            </div>
          </div>

          <q-item tag="label" v-ripple style="margin-top: 20px;">
            <q-item-section>
              <q-item-label>{{ $t('configuracaoMeta.testBMTitle') }}</q-item-label>
              <q-item-label caption>{{ $t('configuracaoMeta.testBMDescription') }}</q-item-label>
            </q-item-section>
            <q-tooltip content-class="bg-negative text-bold">
              {{ $t('configuracaoMeta.testBMTooltip') }}
            </q-tooltip>
          </q-item>

          <div class="row q-px-md">
            <div class="col-12 q-mt-md">
              <q-input
                v-model="wabaId"
                class="custom-input-padding"
                outlined
                dense
                :label="$t('configuracaoMeta.wabaIdLabel')"
              />
            </div>
            <div class="col-12 q-mt-md">
              <q-input
                v-model="wabaVersion"
                class="custom-input-padding"
                outlined
                dense
                :label="$t('configuracaoMeta.wabaVersionLabel')"	
              />
            </div>
            <div class="col-12 q-mt-md">
              <q-input
                v-model="wabaToken"
                class="custom-input-padding"
                outlined
                dense
                :label="$t('configuracaoMeta.wabaTokenLabel')"
              />
            </div>
            <div class="col-12 q-mt-md">
              <q-btn
                :label="$t('configuracaoMeta.verifyBMButton')"
                color="primary"
                @click="verificarBM()"
              />
            </div>
            <div class="col-12 q-mt-md">
              <q-card v-if="wabaResponse && wabaResponse.data" class="q-pa-md bg-grey-1">
                <q-card-section>
                  <h4 class="text-primary text-bold">{{ $t('configuracaoMeta.verificationResultTitle') }}</h4>
                </q-card-section>

                <q-separator spaced />

                <q-card-section v-for="(item, index) in wabaResponse.data" :key="index" class="q-mb-md">
                  <q-list>
                    <q-item>
                      <q-item-section>
                        <p><strong>{{ $t('configuracaoMeta.verification.verifiedName') }}:</strong> {{ item.verified_name }}</p>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                      <q-item-section>
                        <p><strong>{{ $t('configuracaoMeta.verification.verificationStatus') }}:</strong> {{ item.code_verification_status }}</p>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                      <q-item-section>
                        <p><strong>{{ $t('configuracaoMeta.verification.phoneNumber') }}:</strong> {{ item.display_phone_number }}</p>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                      <q-item-section>
                        <p><strong>{{ $t('configuracaoMeta.verification.qualityRating') }}:</strong> {{ item.quality_rating }}</p>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                      <q-item-section>
                        <p><strong>{{ $t('configuracaoMeta.verification.platformType') }}:</strong> {{ item.platform_type }}</p>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                      <q-item-section>
                        <p><strong>{{ $t('configuracaoMeta.verification.throughputLevel') }}:</strong> {{ item.throughput?.level || $t('configuracaoMeta.notConfigured') }}</p>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                      <q-item-section>
                        <p><strong>{{ $t('configuracaoMeta.verification.webhookConfigured') }}:</strong> {{ item.webhook_configuration?.application || $t('configuracaoMeta.notConfigured') }}</p>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                      <q-item-section>
                        <p><strong>{{ $t('configuracaoMeta.verification.id') }}:</strong> {{ item.id }}</p>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </div>
          </div>

        </q-list>
      </q-tab-panel>

      <!-- Aba de Templates -->
      <q-tab-panel name="templates" class="q-pa-none">
        <ConfiguracoesMetaTemplates />
      </q-tab-panel>

      <!-- Aba de Facebook Login -->
      <q-tab-panel name="facebook" class="q-pa-none">
        <q-tabs
          v-model="facebookSubTab"
          dense
          class="text-grey q-px-md q-pt-md"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" :label="$t('configuracaoMeta.facebook.loginTab') || 'Login'" />
          <q-tab name="phones" :label="$t('configuracaoMetaPanel.tabs.phones') || 'Wabas'" />
          <q-tab name="instagram" :label="$t('configuracaoMetaPanel.tabs.instagram') || 'Instagram'" />
          <q-tab name="facebook" :label="$t('configuracaoMetaPanel.tabs.facebook') || 'Facebook'" />
          <!-- <q-tab name="messenger" :label="$t('configuracaoMetaPanel.tabs.messenger') || 'Messenger'" /> -->
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="facebookSubTab" animated class="q-pa-none">
          <!-- Sub-aba de Login -->
          <q-tab-panel name="login" class="q-pa-md">
            <!-- Login com Facebook - Compacto -->
            <q-card class="q-mb-sm">
              <q-card-section class="q-pa-sm">
                <div class="row items-center q-gutter-sm">
                  <div class="col-auto">
                    <q-select
                      v-model="selectedAppWaba"
                      :options="appWabaOptions"
                      :label="$t('configuracaoMeta.facebook.selectApp') || 'Selecionar App'"
                      outlined
                      dense
                      option-value="id"
                      option-label="label"
                      emit-value
                      map-options
                      clearable
                      :loading="loadingAppWabas"
                      style="min-width: 250px;"
                      @update:model-value="onAppWabaSelected"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            {{ $t('configuracaoMeta.facebook.noAppsAvailable') || 'Nenhum app disponível' }}
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="col-auto">
                    <q-input
                      v-model="facebookAppId"
                      :label="$t('configuracaoMeta.facebook.appId') || 'App ID'"
                      outlined
                      dense
                      readonly
                      style="min-width: 200px;"
                    />
                  </div>
                  <div class="col-auto">
                    <q-input
                      v-model="facebookApiVersion"
                      :label="$t('configuracaoMeta.facebook.apiVersion') || 'API Version'"
                      outlined
                      dense
                      readonly
                      style="min-width: 120px;"
                    />
                  </div>
                  <div class="col-auto">
                    <q-input
                      v-model="embeddedSignupConfigId"
                      :label="$t('configuracaoMeta.facebook.embeddedSignupConfigId') || 'Config ID (Cadastro Incorporado)'"
                      outlined
                      dense
                      readonly
                      persistent-hint
                      style="min-width: 200px;"
                    />
                  </div>
                  <div class="col-auto q-ml-auto flex items-center">
                    <!-- Botão de Login do Facebook -->
                    <div 
                      v-if="(!facebookStatus || facebookStatus.status !== 'connected') && facebookAppId && facebookSDKLoaded" 
                      id="fb-login-button-container"
                      style="padding-top: 10px !important; padding-bottom: 10px !important;"
                      class="fb-login-button-wrapper flex items-center"
                    />
                    <q-btn
                      v-if="!facebookStatus || facebookStatus.status !== 'connected'"
                      :label="$t('configuracaoMeta.facebook.login') || 'Fazer Login'"
                      color="primary"
                      icon="login"
                      @click="fazerLoginFacebook"
                      :loading="loadingFacebook"
                      size="sm"
                      :class="facebookAppId && facebookSDKLoaded ? 'q-ml-sm' : ''"
                    />
                    <q-btn
                      v-else
                      :label="$t('configuracaoMeta.facebook.logout') || 'Fazer Logout'"
                      color="negative"
                      icon="logout"
                      @click="fazerLogoutFacebook"
                      :loading="loadingFacebook"
                      size="sm"
                    />
                    <q-btn
                      :label="$t('configuracaoMeta.facebook.checkStatus') || 'Verificar Status'"
                      color="info"
                      icon="refresh"
                      @click="verificarStatusFacebook"
                      :loading="loadingFacebook"
                      size="sm"
                      class="q-ml-sm"
                    />
                    <q-btn
                      :label="$t('configuracaoMeta.facebook.embeddedSignup') || 'Cadastro Incorporado'"
                      color="positive"
                      icon="add_business"
                      @click="launchWhatsAppSignup"
                      :loading="loadingEmbeddedSignup"
                      :disable="!facebookSDKLoaded || !facebookAppId"
                      size="sm"
                      class="q-ml-sm"
                    />
                    <q-btn
                      :label="$t('configuracaoMeta.instagram.login') || 'Login Instagram'"
                      color="purple"
                      icon="camera_alt"
                      @click="fazerLoginInstagram"
                      size="sm"
                      class="q-ml-sm"
                    />
                    <q-btn
                      :label="$t('configuracaoMeta.facebook.loginOAuth') || 'Login Facebook OAuth'"
                      color="blue"
                      icon="facebook"
                      @click="fazerLoginFacebookOAuth"
                      size="sm"
                      class="q-ml-sm"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <!-- Status de Login - Compacto -->
            <q-card v-if="facebookStatus" class="q-mb-sm">
              <q-card-section class="q-pa-sm">
                <div class="row items-center q-gutter-sm">
                  <div class="col-auto">
                    <q-chip
                      :color="getFacebookStatusColor(facebookStatus.status)"
                      text-color="white"
                      size="sm"
                      :icon="getFacebookStatusIcon(facebookStatus.status)"
                    >
                      {{ getFacebookStatusLabel(facebookStatus.status) }}
                    </q-chip>
                  </div>
                  <div class="col-auto" v-if="facebookStatus.status === 'connected' && facebookStatus.authResponse">
                    <div class="text-caption text-grey-6">{{ $t('configuracaoMeta.facebook.userId') || 'User ID' }}</div>
                    <div class="text-body2">{{ facebookStatus.authResponse.userID }}</div>
                  </div>
                  <div class="col-auto" v-if="facebookStatus.status === 'connected' && facebookStatus.authResponse">
                    <div class="text-caption text-grey-6">{{ $t('configuracaoMeta.facebook.expiresIn') || 'Expira em' }}</div>
                    <div class="text-body2">{{ formatExpiresIn(facebookStatus.authResponse.expiresIn) }}</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <!-- Informações do Usuário - Compacto -->
            <q-card v-if="facebookUserInfo" class="q-mb-sm">
              <q-card-section class="q-pa-sm">
                <div class="row items-center q-gutter-md">
                  <div class="col-auto" v-if="facebookUserInfo.picture">
                    <q-img
                      :src="facebookUserInfo.picture.data?.url || facebookUserInfo.picture"
                      style="width: 50px; height: 50px; border-radius: 50%;"
                      spinner-color="primary"
                    />
                  </div>
                  <div class="col-auto" v-if="facebookUserInfo.name">
                    <div class="text-caption text-grey-6">{{ $t('configuracaoMeta.facebook.name') || 'Nome' }}</div>
                    <div class="text-body2">{{ facebookUserInfo.name }}</div>
                  </div>
                  <div class="col-auto" v-if="facebookUserInfo.email">
                    <div class="text-caption text-grey-6">{{ $t('configuracaoMeta.facebook.email') || 'Email' }}</div>
                    <div class="text-body2">{{ facebookUserInfo.email }}</div>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <!-- Access Token - Compacto -->
            <q-card v-if="facebookStatus && facebookStatus.status === 'connected' && facebookStatus.authResponse" class="q-mb-sm">
              <q-card-section class="q-pa-sm">
                <div class="text-caption text-grey-6 q-mb-xs">{{ $t('configuracaoMeta.facebook.accessToken') || 'Access Token' }}</div>
                <div class="text-body2 text-grey-7" style="word-break: break-all; font-size: 0.75rem;">
                  {{ truncateToken(facebookStatus.authResponse.accessToken) }}
                </div>
              </q-card-section>
            </q-card>

            <!-- Mensagem de Erro -->
            <q-banner
              v-if="facebookError"
              class="bg-negative text-white q-mt-sm"
              dense
            >
              <template v-slot:avatar>
                <q-icon name="error" />
              </template>
              {{ facebookError }}
            </q-banner>

            <!-- Gerenciamento de WABAs e Números -->
            <q-card v-if="facebookStatus && facebookStatus.status === 'connected'" class="q-mt-sm">
              <q-card-section class="q-pa-sm">
                <div class="row items-center justify-between">
                  <h6 class="text-weight-bold q-ma-none">{{ $t('configuracaoMeta.facebook.wabaManagement') || 'Gerenciar WABAs e Números' }}</h6>
                  <div class="q-gutter-xs">
                    <q-btn
                      :label="$t('configuracaoMeta.facebook.loadWabas') || 'Carregar WABAs'"
                      color="primary"
                      icon="refresh"
                      @click="carregarWABAs"
                      :loading="loadingWABAs"
                      size="sm"
                    />
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section class="q-pa-sm">
                <!-- Lista de WABAs -->
                <div v-if="wabasList.length === 0 && !loadingWABAs" class="text-center q-pa-sm">
                  <q-icon name="business" size="32px" color="grey-5" />
                  <p class="text-grey-6 q-mt-sm text-caption">{{ $t('configuracaoMeta.facebook.noWabas') || 'Nenhum WABA encontrado. Clique em "Carregar WABAs" para buscar.' }}</p>
                </div>

                <div v-else class="q-gutter-sm">
                  <q-card
                    v-for="waba in wabasList"
                    :key="waba.id"
                    flat
                    bordered
                    class="q-pa-sm"
                  >
                    <div class="row items-center justify-between">
                      <div class="col">
                        <div class="text-weight-medium">{{ waba.name || waba.id }}</div>
                        <div class="text-caption text-grey-6">ID: {{ waba.id }}</div>
                        <q-chip
                          v-if="waba.account_review_status"
                          :color="waba.account_review_status === 'APPROVED' ? 'positive' : 'warning'"
                          text-color="white"
                          size="xs"
                          class="q-mt-xs"
                        >
                          {{ waba.account_review_status }}
                        </q-chip>
                      </div>
                      <div class="col-auto q-gutter-xs">
                        <q-btn
                          :label="$t('configuracaoMeta.facebook.loadPhones') || 'Carregar Números'"
                          color="info"
                          icon="phone"
                          @click="carregarNumerosWABA(waba.id)"
                          :loading="loadingPhones === waba.id"
                          size="xs"
                          dense
                        />
                      </div>
                    </div>

                    <!-- Números de Telefone do WABA -->
                    <div v-if="waba.phoneNumbers && waba.phoneNumbers.length > 0" class="q-mt-sm q-pt-sm" style="border-top: 1px solid rgba(0,0,0,0.12);">
                      <div class="text-caption text-weight-medium q-mb-xs">{{ $t('configuracaoMeta.facebook.phoneNumbers') || 'Números de Telefone' }}</div>
                      <div class="q-gutter-xs">
                        <q-card
                          v-for="phone in waba.phoneNumbers"
                          :key="phone.id"
                          flat
                          bordered
                          class="q-pa-xs"
                        >
                          <div class="row items-center justify-between">
                            <div class="col">
                              <div class="text-body2 text-weight-medium">{{ phone.display_phone_number || phone.id }}</div>
                              <div class="text-caption text-grey-6">ID: {{ phone.id }}</div>
                              <q-chip
                                v-if="phone.code_verification_status"
                                :color="getPhoneStatusColor(phone.code_verification_status)"
                                text-color="white"
                                size="xs"
                                class="q-mt-xs"
                              >
                                {{ phone.code_verification_status }}
                              </q-chip>
                            </div>
                            <div class="col-auto">
                              <q-btn
                                :label="$t('configuracaoMeta.facebook.createChannel') || 'Criar Canal'"
                                color="positive"
                                icon="add"
                                @click.prevent="criarCanalWABA(waba, phone)"
                                size="xs"
                                dense
                                type="button"
                                :loading="creatingChannels[`${waba.id}-${phone.id}`]"
                                :disable="creatingChannels[`${waba.id}-${phone.id}`]"
                              />
                            </div>
                          </div>
                        </q-card>
                      </div>
                    </div>
                  </q-card>
                </div>
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <!-- Sub-aba de Telefones -->
          <q-tab-panel name="phones" class="q-pa-none">
            <ConfiguracoesMetaTemplates :show-only-phones="true" />
          </q-tab-panel>

          <!-- Sub-aba de Instagram -->
          <q-tab-panel name="instagram" class="q-pa-none">
            <div class="q-pa-md">
              <!-- Seletor de Conexão Instagram -->
              <div class="row q-mb-md" style="padding-bottom: 10px;">
                <div class="col-12 col-md-3" style="margin-right: 10px;">
                  <q-select
                    v-model="selectedInstagram"
                    :options="cInstagramSessionsOptions"
                    :label="$t('configuracaoMetaPanel.instagram.selectInstagramConnection')"
                    outlined
                    dense
                    option-label="label"
                    option-value="value"
                    :loading="loadingInstagramCheck"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          {{ $t('configuracaoMetaPanel.instagram.noInstagramConnectionsAvailable') }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col-12 col-md-8">
                  <div class="row q-col-gutter-sm">
                    <div class="col-12 col-sm-2">
                      <q-btn
                        :label="$t('configuracaoMetaPanel.instagram.verifyAccount')"
                        color="info"
                        icon="verified"
                        @click="verificarContaInstagram"
                        :loading="loadingInstagramCheck"
                        :disable="!selectedInstagram"
                        class="full-width"
                        size="md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mensagem quando não há conexões -->
              <div v-if="cInstagramSessions.length === 0" class="row q-mb-md">
                <div class="col-12">
                  <q-banner class="bg-orange-1 text-orange-8">
                    <template v-slot:avatar>
                      <q-icon name="warning" color="orange" />
                    </template>
                    {{ $t('configuracaoMetaPanel.instagram.noInstagramConnections') }}
                  </q-banner>
                </div>
              </div>

              <!-- Conteúdo da aba de Instagram -->
              <div v-if="selectedInstagram">
                <div class="row q-col-gutter-lg">
                  <!-- Informações da Conta Instagram -->
                  <div class="col-12 col-md-6">
                    <q-card class="q-mb-md">
                      <q-card-section>
                        <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.instagram.connectionInfo.title') }}</h6>
                      </q-card-section>
                      <q-separator />
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-12">
                            <q-input
                              v-model="selectedInstagram.fbPageId"
                              :label="$t('configuracaoMetaPanel.instagram.connectionInfo.instagramPageId')"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12 col-md-6">
                            <q-input
                              v-model="selectedInstagram.wabaId"
                              :label="$t('configuracaoMetaPanel.instagram.connectionInfo.wabaId')"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12 col-md-6">
                            <q-input
                              v-model="selectedInstagram.wabaVersion"
                              :label="$t('configuracaoMetaPanel.instagram.connectionInfo.wabaVersion')"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>

                    <!-- Informações da Conta Instagram -->
                    <q-card v-if="instagramAccountInfo">
                      <q-card-section>
                        <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.instagram.accountInfo.title') }}</h6>
                      </q-card-section>
                      <q-separator />
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-12" v-if="instagramAccountInfo.profile_picture_url">
                            <div class="text-caption text-grey-6 q-mb-xs">{{ $t('configuracaoMetaPanel.instagram.accountInfo.profilePicture') }}</div>
                            <q-img
                              :src="instagramAccountInfo.profile_picture_url"
                              spinner-color="primary"
                              style="max-width: 150px; max-height: 150px; border-radius: 8px;"
                            />
                          </div>
                          <div class="col-12">
                            <q-input
                              v-model="instagramAccountInfo.id"
                              :label="$t('configuracaoMetaPanel.instagram.accountInfo.accountId')"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12">
                            <q-input
                              v-model="instagramAccountInfo.username"
                              :label="$t('configuracaoMetaPanel.instagram.accountInfo.username')"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12">
                            <q-input
                              v-model="instagramAccountInfo.name"
                              :label="$t('configuracaoMetaPanel.instagram.accountInfo.name')"
                              outlined
                              dense
                              readonly
                            />
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
                          {{ $t('configuracaoMetaPanel.instagram.tips.title') }}
                        </div>

                        <div class="q-gutter-md">
                          <div class="row items-center">
                            <q-icon name="info" color="primary" size="sm" class="q-mr-sm" />
                            <div>
                              <div class="text-weight-medium">{{ $t('configuracaoMetaPanel.instagram.tips.accountVerification.title') }}</div>
                              <div class="text-caption text-grey-6">
                                {{ $t('configuracaoMetaPanel.instagram.tips.accountVerification.description') }}
                              </div>
                            </div>
                          </div>

                          <div class="row items-center">
                            <q-icon name="link" color="purple" size="sm" class="q-mr-sm" />
                            <div>
                              <div class="text-weight-medium">{{ $t('configuracaoMetaPanel.instagram.tips.facebookBusinessManager.title') }}</div>
                              <div class="text-caption text-grey-6">
                                {{ $t('configuracaoMetaPanel.instagram.tips.facebookBusinessManager.description') }}
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
              <div v-else-if="cInstagramSessions.length > 0" class="row q-mb-md">
                <div class="col-12">
                  <q-banner class="bg-blue-1 text-blue-8">
                    <template v-slot:avatar>
                      <q-icon name="info" color="blue" />
                    </template>
                    {{ $t('configuracaoMetaPanel.instagram.selectConnectionToManage') }}
                  </q-banner>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <!-- Sub-aba de Facebook -->
          <q-tab-panel name="facebook" class="q-pa-none">
            <div class="q-pa-md">
              <!-- Seletor de Conexão Facebook -->
              <div class="row q-mb-md" style="padding-bottom: 10px;">
                <div class="col-12 col-md-3" style="margin-right: 10px;">
                  <q-select
                    v-model="selectedFacebook"
                    :options="cFacebookSessionsOptions"
                    :label="$t('configuracaoMetaPanel.facebook.selectFacebookConnection') || 'Selecionar Conexão Facebook'"
                    outlined
                    dense
                    option-label="label"
                    option-value="value"
                    :loading="loadingFacebookCheck"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          {{ $t('configuracaoMetaPanel.facebook.noFacebookConnectionsAvailable') || 'Nenhuma conexão Facebook disponível' }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col-12 col-md-8">
                  <div class="row q-col-gutter-sm">
                    <div class="col-12 col-sm-2">
                      <q-btn
                        :label="$t('configuracaoMetaPanel.facebook.verifyPage') || 'Verificar Página'"
                        color="info"
                        icon="verified"
                        @click="verificarContaFacebook"
                        :loading="loadingFacebookCheck"
                        :disable="!selectedFacebook"
                        class="full-width"
                        size="md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mensagem quando não há conexões -->
              <div v-if="cFacebookSessions.length === 0" class="row q-mb-md">
                <div class="col-12">
                  <q-banner class="bg-orange-1 text-orange-8">
                    <template v-slot:avatar>
                      <q-icon name="warning" color="orange" />
                    </template>
                    {{ $t('configuracaoMetaPanel.facebook.noFacebookConnections') || 'Nenhuma conexão Facebook encontrada' }}
                  </q-banner>
                </div>
              </div>

              <!-- Conteúdo da aba de Facebook -->
              <div v-if="selectedFacebook">
                <div class="row q-col-gutter-lg">
                  <!-- Informações da Página Facebook -->
                  <div class="col-12 col-md-6">
                    <q-card class="q-mb-md">
                      <q-card-section>
                        <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.facebook.connectionInfo.title') || 'Informações da Conexão' }}</h6>
                      </q-card-section>
                      <q-separator />
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-12">
                            <q-input
                              v-model="selectedFacebook.fbPageId"
                              :label="$t('configuracaoMetaPanel.facebook.connectionInfo.pageId') || 'Page ID'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12 col-md-6">
                            <q-input
                              v-model="selectedFacebook.wabaId"
                              :label="$t('configuracaoMetaPanel.facebook.connectionInfo.wabaId') || 'WABA ID'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12 col-md-6">
                            <q-input
                              v-model="selectedFacebook.wabaVersion"
                              :label="$t('configuracaoMetaPanel.facebook.connectionInfo.wabaVersion') || 'WABA Version'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>

                    <!-- Informações da Página Facebook -->
                    <q-card v-if="facebookAccountInfo">
                      <q-card-section>
                        <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.facebook.pageInfo.title') || 'Informações da Página' }}</h6>
                      </q-card-section>
                      <q-separator />
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-12" v-if="facebookAccountInfo.picture?.data?.url">
                            <div class="text-caption text-grey-6 q-mb-xs">{{ $t('configuracaoMetaPanel.facebook.pageInfo.profilePicture') || 'Foto de Perfil' }}</div>
                            <q-img
                              :src="facebookAccountInfo.picture.data.url"
                              spinner-color="primary"
                              style="max-width: 150px; max-height: 150px; border-radius: 8px;"
                            />
                          </div>
                          <div class="col-12">
                            <q-input
                              v-model="facebookAccountInfo.id"
                              :label="$t('configuracaoMetaPanel.facebook.pageInfo.pageId') || 'Page ID'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12">
                            <q-input
                              v-model="facebookAccountInfo.name"
                              :label="$t('configuracaoMetaPanel.facebook.pageInfo.name') || 'Nome'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12" v-if="facebookAccountInfo.category">
                            <q-input
                              v-model="facebookAccountInfo.category"
                              :label="$t('configuracaoMetaPanel.facebook.pageInfo.category') || 'Categoria'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12" v-if="facebookAccountInfo.about">
                            <q-input
                              v-model="facebookAccountInfo.about"
                              :label="$t('configuracaoMetaPanel.facebook.pageInfo.about') || 'Sobre'"
                              outlined
                              dense
                              readonly
                              type="textarea"
                              rows="3"
                            />
                          </div>
                          <div class="col-12" v-if="facebookAccountInfo.website">
                            <q-input
                              v-model="facebookAccountInfo.website"
                              :label="$t('configuracaoMetaPanel.facebook.pageInfo.website') || 'Website'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12" v-if="facebookAccountInfo.phone">
                            <q-input
                              v-model="facebookAccountInfo.phone"
                              :label="$t('configuracaoMetaPanel.facebook.pageInfo.phone') || 'Telefone'"
                              outlined
                              dense
                              readonly
                            />
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
                          {{ $t('configuracaoMetaPanel.facebook.tips.title') || 'Dicas' }}
                        </div>

                        <div class="q-gutter-md">
                          <div class="row items-center">
                            <q-icon name="info" color="primary" size="sm" class="q-mr-sm" />
                            <div>
                              <div class="text-weight-medium">{{ $t('configuracaoMetaPanel.facebook.tips.pageVerification.title') || 'Verificação da Página' }}</div>
                              <div class="text-caption text-grey-6">
                                {{ $t('configuracaoMetaPanel.facebook.tips.pageVerification.description') || 'Certifique-se de que a página do Facebook está verificada e tem as permissões necessárias.' }}
                              </div>
                            </div>
                          </div>

                          <div class="row items-center">
                            <q-icon name="link" color="blue" size="sm" class="q-mr-sm" />
                            <div>
                              <div class="text-weight-medium">{{ $t('configuracaoMetaPanel.facebook.tips.facebookBusinessManager.title') || 'Facebook Business Manager' }}</div>
                              <div class="text-caption text-grey-6">
                                {{ $t('configuracaoMetaPanel.facebook.tips.facebookBusinessManager.description') || 'A página deve estar vinculada ao Facebook Business Manager e ter as permissões configuradas.' }}
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
              <div v-else-if="cFacebookSessions.length > 0" class="row q-mb-md">
                <div class="col-12">
                  <q-banner class="bg-blue-1 text-blue-8">
                    <template v-slot:avatar>
                      <q-icon name="info" color="blue" />
                    </template>
                    {{ $t('configuracaoMetaPanel.facebook.selectConnectionToManage') || 'Selecione uma conexão para gerenciar' }}
                  </q-banner>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <!-- Sub-aba de Messenger -->
          <q-tab-panel name="messenger" class="q-pa-none">
            <div class="q-pa-md">
              <!-- Seletor de Conexão Messenger -->
              <div class="row q-mb-md" style="padding-bottom: 10px;">
                <div class="col-12 col-md-3" style="margin-right: 10px;">
                  <q-select
                    v-model="selectedMessenger"
                    :options="cMessengerSessionsOptions"
                    :label="$t('configuracaoMetaPanel.messenger.selectMessengerConnection') || 'Selecionar Conexão Messenger'"
                    outlined
                    dense
                    option-label="label"
                    option-value="value"
                    :loading="loadingMessengerCheck"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          {{ $t('configuracaoMetaPanel.messenger.noMessengerConnectionsAvailable') || 'Nenhuma conexão Messenger disponível' }}
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <div class="col-12 col-md-8">
                  <div class="row q-col-gutter-sm">
                    <div class="col-12 col-sm-2">
                      <q-btn
                        :label="$t('configuracaoMetaPanel.messenger.verifyPage') || 'Verificar Página'"
                        color="info"
                        icon="verified"
                        @click="verificarContaMessenger"
                        :loading="loadingMessengerCheck"
                        :disable="!selectedMessenger"
                        class="full-width"
                        size="md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mensagem quando não há conexões -->
              <div v-if="cMessengerSessions.length === 0" class="row q-mb-md">
                <div class="col-12">
                  <q-banner class="bg-orange-1 text-orange-8">
                    <template v-slot:avatar>
                      <q-icon name="warning" color="orange" />
                    </template>
                    {{ $t('configuracaoMetaPanel.messenger.noMessengerConnections') || 'Nenhuma conexão Messenger encontrada' }}
                  </q-banner>
                </div>
              </div>

              <!-- Conteúdo da aba de Messenger -->
              <div v-if="selectedMessenger">
                <div class="row q-col-gutter-lg">
                  <!-- Informações da Página Messenger -->
                  <div class="col-12 col-md-6">
                    <q-card class="q-mb-md">
                      <q-card-section>
                        <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.messenger.connectionInfo.title') || 'Informações da Conexão' }}</h6>
                      </q-card-section>
                      <q-separator />
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-12">
                            <q-input
                              v-model="selectedMessenger.fbPageId"
                              :label="$t('configuracaoMetaPanel.messenger.connectionInfo.pageId') || 'Page ID'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12 col-md-6">
                            <q-input
                              v-model="selectedMessenger.wabaId"
                              :label="$t('configuracaoMetaPanel.messenger.connectionInfo.wabaId') || 'WABA ID'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12 col-md-6">
                            <q-input
                              v-model="selectedMessenger.wabaVersion"
                              :label="$t('configuracaoMetaPanel.messenger.connectionInfo.wabaVersion') || 'WABA Version'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>

                    <!-- Informações da Página Messenger -->
                    <q-card v-if="messengerAccountInfo">
                      <q-card-section>
                        <h6 class="text-weight-bold">{{ $t('configuracaoMetaPanel.messenger.pageInfo.title') || 'Informações da Página' }}</h6>
                      </q-card-section>
                      <q-separator />
                      <q-card-section>
                        <div class="row q-col-gutter-md">
                          <div class="col-12" v-if="messengerAccountInfo.picture?.data?.url">
                            <div class="text-caption text-grey-6 q-mb-xs">{{ $t('configuracaoMetaPanel.messenger.pageInfo.profilePicture') || 'Foto de Perfil' }}</div>
                            <q-img
                              :src="messengerAccountInfo.picture.data.url"
                              spinner-color="primary"
                              style="max-width: 150px; max-height: 150px; border-radius: 8px;"
                            />
                          </div>
                          <div class="col-12">
                            <q-input
                              v-model="messengerAccountInfo.id"
                              :label="$t('configuracaoMetaPanel.messenger.pageInfo.pageId') || 'Page ID'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12">
                            <q-input
                              v-model="messengerAccountInfo.name"
                              :label="$t('configuracaoMetaPanel.messenger.pageInfo.name') || 'Nome'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12" v-if="messengerAccountInfo.category">
                            <q-input
                              v-model="messengerAccountInfo.category"
                              :label="$t('configuracaoMetaPanel.messenger.pageInfo.category') || 'Categoria'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12" v-if="messengerAccountInfo.about">
                            <q-input
                              v-model="messengerAccountInfo.about"
                              :label="$t('configuracaoMetaPanel.messenger.pageInfo.about') || 'Sobre'"
                              outlined
                              dense
                              readonly
                              type="textarea"
                              rows="3"
                            />
                          </div>
                          <div class="col-12" v-if="messengerAccountInfo.website">
                            <q-input
                              v-model="messengerAccountInfo.website"
                              :label="$t('configuracaoMetaPanel.messenger.pageInfo.website') || 'Website'"
                              outlined
                              dense
                              readonly
                            />
                          </div>
                          <div class="col-12" v-if="messengerAccountInfo.phone">
                            <q-input
                              v-model="messengerAccountInfo.phone"
                              :label="$t('configuracaoMetaPanel.messenger.pageInfo.phone') || 'Telefone'"
                              outlined
                              dense
                              readonly
                            />
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
                          {{ $t('configuracaoMetaPanel.messenger.tips.title') || 'Dicas' }}
                        </div>

                        <div class="q-gutter-md">
                          <div class="row items-center">
                            <q-icon name="info" color="primary" size="sm" class="q-mr-sm" />
                            <div>
                              <div class="text-weight-medium">{{ $t('configuracaoMetaPanel.messenger.tips.pageVerification.title') || 'Verificação da Página' }}</div>
                              <div class="text-caption text-grey-6">
                                {{ $t('configuracaoMetaPanel.messenger.tips.pageVerification.description') || 'Certifique-se de que a página do Facebook está verificada e tem as permissões necessárias para o Messenger.' }}
                              </div>
                            </div>
                          </div>

                          <div class="row items-center">
                            <q-icon name="link" color="blue" size="sm" class="q-mr-sm" />
                            <div>
                              <div class="text-weight-medium">{{ $t('configuracaoMetaPanel.messenger.tips.facebookBusinessManager.title') || 'Facebook Business Manager' }}</div>
                              <div class="text-caption text-grey-6">
                                {{ $t('configuracaoMetaPanel.messenger.tips.facebookBusinessManager.description') || 'A página deve estar vinculada ao Facebook Business Manager e ter as permissões de Messenger configuradas.' }}
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
              <div v-else-if="cMessengerSessions.length > 0" class="row q-mb-md">
                <div class="col-12">
                  <q-banner class="bg-blue-1 text-blue-8">
                    <template v-slot:avatar>
                      <q-icon name="info" color="blue" />
                    </template>
                    {{ $t('configuracaoMetaPanel.messenger.selectConnectionToManage') || 'Selecione uma conexão para gerenciar' }}
                  </q-banner>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-tab-panel>
    </q-tab-panels>
  </div>

</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId, AlterarTenantMeta } from 'src/service/tenants.js'
import { defineComponent } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { VerificarBM, VerificarTelefone, OverrideCallbackUrl } from 'src/service/waba.js'
import { CriarWhatsapp } from 'src/service/sessoesWhatsapp.js'
import { ListarAppWabaAtivos } from 'src/service/appWaba.js'
import { v4 as uuidv4 } from 'uuid'
import ConfiguracoesMetaTemplates from './ConfiguracoesMetaTemplates.vue'
import { GetChannelInfoInstagram } from 'src/service/instagram.js'
import { GetChannelInfoMessenger, GetChannelInfoFacebook } from 'src/service/messenger.js'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'IndexConfiguracoes',
  components: {
    ConfiguracoesMetaTemplates
  },
  data() {
    return {
      tab: 'facebook',
      facebookSubTab: 'login',
      usuario,
      metaToken: '',
      webhookChecked: '',
      wabaId: '',
      wabaVersion: '',
      wabaToken: '',
      wabaResponse: null,
      loading: false,
      userProfile: 'user',
      loadingToken: false,
      showMetaToken: false,
      // Facebook Login
      selectedAppWaba: null,
      appWabaOptions: [],
      loadingAppWabas: false,
      facebookAppId: '',
      facebookApiVersion: 'v24.0',
      facebookStatus: null,
      facebookUserInfo: null,
      facebookError: null,
      loadingFacebook: false,
      facebookSDKLoaded: false,
      // WABA Management
      wabasList: [],
      loadingWABAs: false,
      loadingPhones: null,
      loadingOnboarding: null,
      showCreateChannelModal: false,
      showOnboardingModal: false,
      onboardingWaba: null,
      onboardingPhoneNumber: '',
      onboardingCountryCode: 'BR',
      novoCanal: {
        name: '',
        wabaId: '',
        phoneNumberId: '',
        displayPhoneNumber: '',
        wabaVersion: 'v24.0'
      },
      loadingCreateChannel: false,
      creatingChannels: {}, // Rastreia quais canais estão sendo criados: { 'wabaId-phoneId': true }
      // Embedded Signup
      loadingEmbeddedSignup: false,
      embeddedSignupConfigId: '', // Config ID do Cadastro Incorporado - pode ser configurável
      embeddedSignupData: null, // Armazena os dados recebidos do fluxo
      embeddedSignupListenerSetup: false, // Flag para garantir que o listener seja configurado apenas uma vez
      embeddedSignupBusinessToken: null, // Armazena o business token obtido via troca do código
      // Instagram
      selectedInstagram: null, // Instagram selecionado
      instagramAccountInfo: null, // Informações da conta Instagram
      loadingInstagramCheck: false, // Loading para verificação de conta Instagram
      // Messenger
      selectedMessenger: null, // Messenger selecionado
      messengerAccountInfo: null, // Informações da página Messenger
      loadingMessengerCheck: false, // Loading para verificação de página Messenger
      // Facebook
      selectedFacebook: null, // Facebook selecionado
      facebookAccountInfo: null, // Informações da página Facebook
      loadingFacebookCheck: false // Loading para verificação de página Facebook
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cBaseUrlIntegração () {
      return `${process.env.URL_API}/metaWebhook`
    },
    cBaseUrlIntegraçãoInstagram () {
      return `${process.env.URL_API}/instagramWebhook`
    },
    cBaseUrlIntegraçãoMessenger () {
      return `${process.env.URL_API}/messengerWebhook`
    },
    cInstagramSessions() {
      return this.whatsapps.filter(w => w.type === 'instagram' && !w.isDeleted && w.status === 'CONNECTED');
    },
    cInstagramSessionsOptions() {
      return this.cInstagramSessions.map(w => ({ 
        label: w.name, 
        value: w.id, 
        fbPageId: w.fbPageId || w.tokenAPI, 
        wabaId: w.wabaId, 
        wabaVersion: w.wabaVersion 
      }))
    },
    cMessengerSessions() {
      return this.whatsapps.filter(w => w.type === 'messenger' && !w.isDeleted && w.status === 'CONNECTED');
    },
    cMessengerSessionsOptions() {
      return this.cMessengerSessions.map(w => ({ 
        label: w.name, 
        value: w.id, 
        fbPageId: w.fbPageId || w.tokenAPI, 
        wabaId: w.wabaId, 
        wabaVersion: w.wabaVersion 
      }))
    },
    cFacebookSessions() {
      return this.whatsapps.filter(w => w.type === 'messenger' && !w.isDeleted && w.status === 'CONNECTED' && w.fbPageId);
    },
    cFacebookSessionsOptions() {
      return this.cFacebookSessions.map(w => ({ 
        label: w.name, 
        value: w.id, 
        fbPageId: w.fbPageId || w.tokenAPI, 
        wabaId: w.wabaId, 
        wabaVersion: w.wabaVersion 
      }))
    }
  },
  methods: {
    // Helper para sanitizar wabaVersion: remover "v" se estiver presente
    sanitizeWabaVersion(version) {
      if (!version) return '24.0'
      // Remover "v" ou "V" do início se presente
      return version.startsWith('v') || version.startsWith('V') 
        ? version.substring(1) 
        : version
    },
    async verificarBM() {
      try {
        const data = {
          wabaId: this.wabaId,
          wabaVersion: this.wabaVersion,
          wabaToken: this.wabaToken,
        };
        const response = await VerificarBM(data);
        this.wabaResponse = { data: response.data.data };
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMeta.notifications.successVerify'),
          timeout: 2000,
        });
      } catch (error) {
        console.error('Erro na verificação:', error);
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMeta.notifications.errorVerify'),
          timeout: 2000,
        });
      }
    },
    copiarLink() {
      const link = `${this.cBaseUrlIntegração}/${this.usuario.tenantId}`;
      
      const tempInput = document.createElement('input');
      tempInput.value = link;
      document.body.appendChild(tempInput);

      tempInput.select();
      document.execCommand('copy');

      document.body.removeChild(tempInput);

      this.$q.notify({
        message: this.$t('configuracaoMeta.notifications.successCopy'),
        color: 'positive',
        position: 'top',
        timeout: 2000
      });
    },
    copiarLinkInstagram() {
      const link = `${this.cBaseUrlIntegraçãoInstagram}/${this.usuario.tenantId}`;
      
      const tempInput = document.createElement('input');
      tempInput.value = link;
      document.body.appendChild(tempInput);

      tempInput.select();
      document.execCommand('copy');

      document.body.removeChild(tempInput);

      this.$q.notify({
        message: this.$t('configuracaoMeta.webhookInstagramCopied'),
        color: 'positive',
        position: 'top',
        timeout: 2000
      });
    },
    copiarLinkMessenger() {
      const link = `${this.cBaseUrlIntegraçãoMessenger}/${this.usuario.tenantId}`;
      
      const tempInput = document.createElement('input');
      tempInput.value = link;
      document.body.appendChild(tempInput);

      tempInput.select();
      document.execCommand('copy');

      document.body.removeChild(tempInput);

      this.$q.notify({
        message: this.$t('configuracaoMeta.webhookMessengerCopied'),
        color: 'positive',
        position: 'top',
        timeout: 2000
      });
    },
    formatarDataBrasil(data) {
      const dataObjeto = new Date(data);
      return format(dataObjeto, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
    },
    montarUrlIntegração() {
      return `${this.cBaseUrlIntegração}/${this.usuario.tenantId}`
    },
    montarUrlIntegraçãoInstagram() {
      return `${this.cBaseUrlIntegraçãoInstagram}/${this.usuario.tenantId}`
    },
    montarUrlIntegraçãoMessenger() {
      return `${this.cBaseUrlIntegraçãoMessenger}/${this.usuario.tenantId}`
    },
    formatarData(data) {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR');
    },
    async alterarMetaToken(){
      try {
        await AlterarTenantMeta({
          id: this.usuario.tenantId,
          metaToken: this.metaToken,
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$notificarErro(this.$t('common.notifications.error'), error)
      } 
    },
    async listarTenantPorId(){
      this.loading = true; 
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      this.metaToken = data[0].metaToken
      this.webhookChecked = data[0].webhookChecked
    },
    async carregarAppWabas() {
      try {
        this.loadingAppWabas = true
        const { data } = await ListarAppWabaAtivos()
        this.appWabaOptions = data.map(app => ({
          id: app.id,
          label: `${app.appId} (${app.apiVersion})${app.description ? ' - ' + app.description : ''}`,
          appId: app.appId,
          apiVersion: app.apiVersion,
          token: app.token,
          configId: app.configId,
          appSecret: app.appSecret,
          redirectUri: app.redirectUri,
          appInstagramId: app.appInstagramId,
          appInstagramSecret: app.appInstagramSecret,
          redirectUriInstagram: app.redirectUriInstagram
        }))
        
        // Sempre selecionar o primeiro app da lista e popular os campos
        if (this.appWabaOptions.length > 0) {
          this.selectedAppWaba = this.appWabaOptions[0].id
          this.onAppWabaSelected(this.appWabaOptions[0].id)
        }
      } catch (error) {
        console.error('Erro ao carregar apps WABA:', error)
        this.$q.notify({
          type: 'warning',
          message: this.$t('configuracaoMeta.facebook.errorLoadingApps') || 'Erro ao carregar apps disponíveis',
          timeout: 3000
        })
      } finally {
        this.loadingAppWabas = false
      }
    },
    onAppWabaSelected(appId) {
      if (!appId) {
        // Se limpar a seleção, resetar para valores padrão
        this.facebookAppId = ''
        this.facebookApiVersion = 'v24.0'
        // Resetar status do SDK para forçar recarregamento
        this.facebookSDKLoaded = false
        return
      }
      
      const selectedApp = this.appWabaOptions.find(app => app.id === appId)
      if (selectedApp) {
        const newAppId = selectedApp.appId
        const newApiVersion = selectedApp.apiVersion
        const newConfigId = selectedApp.configId || this.embeddedSignupConfigId
        
        // Atualizar o Config ID se o app tiver um configurado
        if (newConfigId) {
          this.embeddedSignupConfigId = newConfigId
        }
        
        // Se o App ID ou API Version mudaram, precisamos reinicializar o SDK
        if (this.facebookAppId !== newAppId || this.facebookApiVersion !== newApiVersion) {
          this.facebookAppId = newAppId
          this.facebookApiVersion = newApiVersion
          
          // Se o SDK já estiver carregado, precisamos recarregá-lo com os novos valores
          if (this.facebookSDKLoaded && window.FB) {
            // Remover o script antigo e resetar o SDK
            this.resetarFacebookSDK().then(() => {
              // Recarregar o SDK com os novos valores
              return this.carregarFacebookSDK()
            }).then(() => {
              // Verificar status após recarregar
              this.verificarStatusFacebook()
              // Renderizar o botão novamente
              this.$nextTick(() => {
                this.renderizarBotaoFacebook()
              })
            }).catch((error) => {
              console.error('Erro ao reinicializar Facebook SDK:', error)
              this.facebookError = error.message || 'Erro ao reinicializar o SDK do Facebook'
            })
          } else if (this.facebookSDKLoaded) {
            // Se o SDK já está carregado, apenas renderizar o botão novamente
            this.$nextTick(() => {
              this.renderizarBotaoFacebook()
            })
          }
        }
      }
    },
    resetarFacebookSDK() {
      return new Promise((resolve) => {
        // Remover o script do Facebook SDK se existir
        const existingScript = document.getElementById('facebook-jssdk')
        if (existingScript) {
          existingScript.remove()
        }
        
        // Remover o callback global se existir
        if (window.fbAsyncInit) {
          delete window.fbAsyncInit
        }
        
        // Remover o objeto FB se existir
        if (window.FB) {
          delete window.FB
        }
        
        // Resetar flag
        this.facebookSDKLoaded = false
        
        // Aguardar um pouco para garantir que tudo foi limpo
        setTimeout(() => {
          resolve()
        }, 100)
      })
    },
    async gerarNovoMetaToken() {
      try {
        this.loadingToken = true
        const novoToken = uuidv4()
        await AlterarTenantMeta({
          id: this.usuario.tenantId,
          metaToken: novoToken,
        })
        this.metaToken = novoToken
        this.$q.notify({
          color: 'positive',
          message: this.$t('configuracaoMeta.tokenUpdated') || 'Token atualizado com sucesso!',
          icon: 'check'
        })
      } catch (error) {
        console.error('Erro ao gerar novo token:', error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('configuracaoMeta.tokenError') || 'Erro ao gerar novo token',
          icon: 'error'
        })
      } finally {
        this.loadingToken = false
      }
    },
    // Facebook Login Methods
    carregarFacebookSDK() {
      return new Promise((resolve, reject) => {
        // Verificar se o App ID está configurado
        if (!this.facebookAppId) {
          reject(new Error('App ID não configurado'))
          return
        }

        // Verificar se o SDK já foi carregado e inicializado
        if (window.FB && this.facebookSDKLoaded) {
          // Verificar se o SDK precisa ser reinicializado com um novo app_id
          // Como o Facebook SDK não expõe o appId atual, vamos verificar se o appId mudou
          // Se mudou, precisamos reinicializar
          try {
            // Tentar obter o status de login para verificar se o SDK está funcionando
            window.FB.getLoginStatus(() => {
              // SDK está funcionando, resolver
              resolve()
            })
            return
          } catch (e) {
            // Se houver erro, o SDK não está pronto ou precisa ser reinicializado
            console.warn('SDK pode precisar ser reinicializado:', e)
            // Continuar com o carregamento/reinicialização
          }
        }

        // Se já existe um script carregando, verificar se precisa reinicializar
        if (document.getElementById('facebook-jssdk')) {
          // Se o SDK já está carregado mas pode estar com app_id diferente
          // Vamos aguardar e verificar se funciona
          let attempts = 0
          const maxAttempts = 50 // 5 segundos máximo
          const checkInterval = setInterval(() => {
            attempts++
            if (window.FB && window.FB.getLoginStatus) {
              clearInterval(checkInterval)
              // Verificar se o SDK está funcionando corretamente
              try {
                window.FB.getLoginStatus(() => {
                  this.facebookSDKLoaded = true
                  resolve()
                })
              } catch (e) {
                // Se houver erro, pode ser que o app_id seja diferente
                // Vamos reinicializar
                console.warn('SDK pode estar com app_id incorreto, reinicializando...')
                clearInterval(checkInterval)
                this.resetarFacebookSDK().then(() => {
                  // Continuar com o carregamento abaixo
                  this.carregarFacebookSDK().then(resolve).catch(reject)
                })
              }
            } else if (attempts >= maxAttempts) {
              clearInterval(checkInterval)
              reject(new Error('Timeout ao aguardar o SDK do Facebook carregar'))
            }
          }, 100)
          return
        }

        // Guardar os valores atuais para usar no callback
        const appId = this.facebookAppId
        const apiVersion = this.facebookApiVersion

        // Inicializar o SDK do Facebook
        window.fbAsyncInit = () => {
          try {
            window.FB.init({
              appId: appId,
              cookie: true,
              xfbml: true,
              version: apiVersion
            })

            window.FB.AppEvents.logPageView()
            this.facebookSDKLoaded = true
            // Renderizar o botão do Facebook após o SDK carregar
            this.$nextTick(() => {
              this.renderizarBotaoFacebook()
            })
            resolve()
          } catch (error) {
            console.error('Erro ao inicializar Facebook SDK:', error)
            reject(error)
          }
        }

        // Carregar o script do SDK
        const script = document.createElement('script')
        script.id = 'facebook-jssdk'
        script.src = 'https://connect.facebook.net/pt_BR/sdk.js'
        script.async = true
        script.defer = true
        script.onerror = () => {
          reject(new Error('Erro ao carregar o SDK do Facebook'))
        }
        script.onload = () => {
          // Se o script carregou mas fbAsyncInit não foi chamado ainda, aguardar
          if (!window.FB) {
            let attempts = 0
            const maxAttempts = 50
            const checkInterval = setInterval(() => {
              attempts++
              if (window.FB && window.FB.getLoginStatus) {
                clearInterval(checkInterval)
                this.facebookSDKLoaded = true
                resolve()
              } else if (attempts >= maxAttempts) {
                clearInterval(checkInterval)
                reject(new Error('Timeout ao aguardar o SDK do Facebook inicializar'))
              }
            }, 100)
          }
        }
        const firstScript = document.getElementsByTagName('script')[0]
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(script, firstScript)
        } else {
          document.head.appendChild(script)
        }
      })
    },
    checkLoginState() {
      // Método chamado pelo botão do Facebook
      if (!window.FB) {
        console.error('Facebook SDK não está carregado')
        return
      }
      
      window.FB.getLoginStatus((response) => {
        this.statusChangeCallback(response)
        // Se o login foi bem-sucedido, abrir o modal do app sem dados de email
        if (response.status === 'connected') {
          this.abrirModalAppSemEmail()
        }
      })
    },
    renderizarBotaoFacebook() {
      // Método para renderizar o botão do Facebook usando o SDK
      if (!window.FB || !this.facebookAppId) {
        return
      }

      const container = document.getElementById('fb-login-button-container')
      if (!container) {
        return
      }

      // Criar função global para o callback do botão
      const self = this
      window.checkLoginStateFacebook = function() {
        self.checkLoginState()
      }

      // Limpar conteúdo anterior
      container.innerHTML = ''

      // Criar o elemento do botão do Facebook
      const loginButton = document.createElement('div')
      loginButton.className = 'fb-login-button'
      // Usar app_id se config_id não estiver disponível
      loginButton.setAttribute('data-app_id', this.facebookAppId)
      loginButton.setAttribute('data-scope', 'email,public_profile,business_management,whatsapp_business_management')
      loginButton.setAttribute('data-onlogin', 'checkLoginStateFacebook')
      loginButton.setAttribute('data-size', 'small')
      loginButton.setAttribute('data-button-type', 'login_with')
      loginButton.setAttribute('data-layout', 'default')
      loginButton.setAttribute('data-auto-logout-link', 'false')
      loginButton.setAttribute('data-use-continue-as', 'false')

      container.appendChild(loginButton)

      // Processar o componente XFBML
      if (window.FB && window.FB.XFBML) {
        window.FB.XFBML.parse(container)
      }
    },
    abrirModalAppSemEmail() {
      // Método para abrir o modal do app sem buscar dados de email
      // Este método é chamado quando o login é feito pelo botão do Facebook
      try {
        if (!this.facebookStatus || this.facebookStatus.status !== 'connected') {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMeta.facebook.notConnected') || 'Você precisa estar conectado ao Facebook',
            timeout: 3000
          })
          return
        }

        // Não buscar informações do usuário (sem email)
        // Apenas notificar que o login foi bem-sucedido
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMeta.facebook.loginSuccess') || 'Login realizado com sucesso!',
          timeout: 2000
        })

        // Opcionalmente, você pode carregar os WABAs automaticamente após o login
        // this.carregarWABAs()
      } catch (error) {
        console.error('Erro ao abrir modal do app:', error)
        this.facebookError = error.message || 'Erro ao processar login'
        this.$q.notify({
          type: 'negative',
          message: this.facebookError,
          timeout: 3000
        })
      }
    },
    async verificarStatusFacebook() {
      try {
        this.loadingFacebook = true
        this.facebookError = null

        // Carregar SDK se necessário
        if (!this.facebookSDKLoaded) {
          await this.carregarFacebookSDK()
        }

        // Verificar status de login
        window.FB.getLoginStatus((response) => {
          this.statusChangeCallback(response)
          this.loadingFacebook = false
        })
      } catch (error) {
        console.error('Erro ao verificar status do Facebook:', error)
        this.facebookError = error.message || 'Erro ao verificar status do Facebook'
        this.loadingFacebook = false
        this.$q.notify({
          type: 'negative',
          message: this.facebookError,
          timeout: 3000
        })
      }
    },
    statusChangeCallback(response) {
      this.facebookStatus = response
      
      if (response.status === 'connected') {
        // Usuário está logado e autorizou o app
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMeta.facebook.connected') || 'Conectado ao Facebook com sucesso!',
          timeout: 2000
        })
        // Buscar informações do usuário
        this.buscarInformacoesUsuario(response.authResponse.accessToken)
      } else if (response.status === 'not_authorized') {
        // Usuário está logado no Facebook, mas não autorizou o app
        this.facebookUserInfo = null
        this.$q.notify({
          type: 'warning',
          message: this.$t('configuracaoMeta.facebook.notAuthorized') || 'Você precisa autorizar o aplicativo',
          timeout: 3000
        })
      } else {
        // Usuário não está logado no Facebook
        this.facebookUserInfo = null
      }
    },
    async fazerLoginFacebook() {
      try {
        this.loadingFacebook = true
        this.facebookError = null

        // Carregar SDK se necessário
        if (!this.facebookSDKLoaded) {
          await this.carregarFacebookSDK()
        }

        // Fazer login
        window.FB.login((response) => {
          this.statusChangeCallback(response)
          this.loadingFacebook = false
        }, {
          scope: 'email,public_profile,business_management,whatsapp_business_management'
        })
      } catch (error) {
        console.error('Erro ao fazer login no Facebook:', error)
        this.facebookError = error.message || 'Erro ao fazer login no Facebook'
        this.loadingFacebook = false
        this.$q.notify({
          type: 'negative',
          message: this.facebookError,
          timeout: 3000
        })
      }
    },
    async fazerLogoutFacebook() {
      try {
        this.loadingFacebook = true
        this.facebookError = null

        // Carregar SDK se necessário
        if (!this.facebookSDKLoaded) {
          await this.carregarFacebookSDK()
        }

        // Fazer logout
        window.FB.logout((response) => {
          this.facebookStatus = response
          this.facebookUserInfo = null
          this.loadingFacebook = false
          this.$q.notify({
            type: 'positive',
            message: this.$t('configuracaoMeta.facebook.loggedOut') || 'Logout realizado com sucesso!',
            timeout: 2000
          })
        })
      } catch (error) {
        console.error('Erro ao fazer logout do Facebook:', error)
        this.facebookError = error.message || 'Erro ao fazer logout do Facebook'
        this.loadingFacebook = false
        this.$q.notify({
          type: 'negative',
          message: this.facebookError,
          timeout: 3000
        })
      }
    },
    fazerLoginFacebookOAuth() {
      try {
        // Verificar se há um app selecionado
        if (!this.selectedAppWaba) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMeta.facebook.noAppSelected') || 'Por favor, selecione um app primeiro',
            timeout: 3000
          })
          return
        }

        // Obter o app selecionado
        const selectedApp = this.appWabaOptions.find(app => app.id === this.selectedAppWaba)
        if (!selectedApp) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMeta.facebook.appNotFound') || 'App não encontrado',
            timeout: 3000
          })
          return
        }

        // Usar o appId do app selecionado como client_id para Facebook
        const clientId = selectedApp.appId
        if (!clientId) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMeta.facebook.facebookAppIdRequired') || 'Facebook App ID não configurado para este app',
            timeout: 3000
          })
          return
        }

        // Salvar dados do app no localStorage para a página HTML acessar
        const appData = {
          appId: selectedApp.appId,
          appSecret: selectedApp.appSecret,
          apiVersion: selectedApp.apiVersion || this.facebookApiVersion,
          token: selectedApp.token,
          redirectUri: selectedApp.redirectUriFacebook || window.location.origin + '/facebook-oauth-callback.html'
        }
        localStorage.setItem('embeddedSignupAppData', JSON.stringify(appData))
        
        // Salvar URL da API também
        const apiUrl = process.env.URL_API
        localStorage.setItem('apiUrl', apiUrl)
        localStorage.setItem('windowOrigin', window.location.origin)
        
        console.log('Dados do app salvos no localStorage:', { 
          appId: appData.appId, 
          hasAppSecret: !!appData.appSecret, 
          hasToken: !!appData.token, 
          apiUrl: apiUrl 
        })

        // URL de autorização OAuth do Facebook
        // Usar redirectUriFacebook se disponível, senão construir com URL_API
        const redirectUri = selectedApp.redirectUriFacebook || window.location.origin + '/facebook-oauth-callback.html'
        const encodedRedirectUri = encodeURIComponent(redirectUri)
        const responseType = 'token' // Facebook usa implicit flow (token)
        const scopes = [
          'pages_messaging',
          'pages_utility_messaging',
          'pages_show_list',
          'pages_read_engagement'
        ].join('%2C')
        
        // Preparar parâmetros para passar via query string
        const params = new URLSearchParams()
        params.set('client_id', clientId)
        params.set('tenantId', this.usuario.tenantId)
        params.set('metaToken', this.metaToken)
        
        // URL da página de callback com parâmetros
        const callbackUrl = `/facebook-oauth-callback.html?${params.toString()}`
        
        console.log('Redirecionando para página de callback:', callbackUrl)
        console.log('URL de autorização do Facebook será construída na página de callback')
        
        // Redirecionar para a página de callback que iniciará o OAuth
        window.location.href = callbackUrl
        
        this.$q.notify({
          type: 'info',
          message: this.$t('configuracaoMeta.facebook.loginRedirect') || 'Redirecionando para login do Facebook...',
          timeout: 2000
        })
      } catch (error) {
        console.error('Erro ao abrir login do Facebook:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMeta.facebook.loginError') || 'Erro ao abrir login do Facebook',
          timeout: 3000
        })
      }
    },
    fazerLoginInstagram() {
      try {
        // Verificar se há um app selecionado
        if (!this.selectedAppWaba) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMeta.instagram.noAppSelected') || 'Por favor, selecione um app primeiro',
            timeout: 3000
          })
          return
        }

        // Obter o app selecionado
        const selectedApp = this.appWabaOptions.find(app => app.id === this.selectedAppWaba)
        if (!selectedApp) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMeta.instagram.appNotFound') || 'App não encontrado',
            timeout: 3000
          })
          return
        }

        // Usar o appInstagramId do app selecionado como client_id para Instagram
        const clientId = selectedApp.appInstagramId
        if (!clientId) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMeta.instagram.configIdRequired') || 'Instagram App ID não configurado para este app',
            timeout: 3000
          })
          return
        }

        // Verificar se appInstagramSecret está configurado
        if (!selectedApp.appInstagramSecret) {
          this.$q.notify({
            type: 'negative',
            message: 'Instagram App Secret não configurado para este app',
            timeout: 3000
          })
          return
        }

        // Salvar dados do app no localStorage para a página HTML acessar
        // IMPORTANTE: Para Instagram, usar appInstagramId e appInstagramSecret
        const appData = {
          appId: selectedApp.appInstagramId, // Usar appInstagramId como appId para Instagram
          appSecret: selectedApp.appInstagramSecret, // Usar appInstagramSecret como appSecret para Instagram
          apiVersion: selectedApp.apiVersion || this.facebookApiVersion,
          token: selectedApp.token,
          redirectUri: selectedApp.redirectUriInstagram || window.location.origin + '/instagram-oauth-callback.html'
        }
        localStorage.setItem('embeddedSignupAppData', JSON.stringify(appData))
        
        // Salvar URL da API também
        const apiUrl = process.env.URL_API
        localStorage.setItem('apiUrl', apiUrl)
        localStorage.setItem('windowOrigin', window.location.origin)
        
        console.log('Dados do app salvos no localStorage:', { 
          appId: appData.appId, 
          hasAppSecret: !!appData.appSecret, 
          hasToken: !!appData.token, 
          apiUrl: apiUrl 
        })

        // URL de autorização OAuth do Instagram
        // Usar redirectUriInstagram se disponível, senão construir com URL_API
        const redirectUri = selectedApp.redirectUriInstagram || window.location.origin + '/instagram-oauth-callback.html'
        const encodedRedirectUri = encodeURIComponent(redirectUri)
        const responseType = 'code'
        const scopes = [
          'instagram_business_basic',
          'instagram_business_manage_messages',
          'instagram_business_manage_comments',
          'instagram_business_content_publish',
          'instagram_business_manage_insights'
        ].join('%2C')
        
        // Preparar parâmetros para passar via query string
        const params = new URLSearchParams()
        params.set('client_id', clientId)
        params.set('tenantId', this.usuario.tenantId)
        params.set('metaToken', this.metaToken)
        
        // URL da página de callback com parâmetros
        const callbackUrl = `/instagram-oauth-callback.html?${params.toString()}`
        
        // URL de autorização OAuth do Instagram
        const instagramAuthUrl = `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=${clientId}&redirect_uri=${encodedRedirectUri}&response_type=${responseType}&scope=${scopes}`
        
        console.log('Redirecionando para página de callback:', callbackUrl)
        console.log('URL de autorização do Instagram:', instagramAuthUrl.replace(clientId, 'CLIENT_ID'))
        
        // Redirecionar para a página de callback que iniciará o OAuth
        window.location.href = callbackUrl
        
        this.$q.notify({
          type: 'info',
          message: this.$t('configuracaoMeta.instagram.loginRedirect') || 'Redirecionando para login do Instagram...',
          timeout: 2000
        })
      } catch (error) {
        console.error('Erro ao abrir login do Instagram:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracaoMeta.instagram.loginError') || 'Erro ao abrir login do Instagram',
          timeout: 3000
        })
      }
    },
    async criarCanalInstagram(instagramPageId, pageName = null) {
      try {
        // Validar se está conectado ao Facebook
        if (!this.facebookStatus || this.facebookStatus.status !== 'connected') {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMeta.facebook.notConnected') || 'Você precisa estar conectado ao Facebook',
            timeout: 3000
          })
          return
        }

        // Obter o token do app selecionado, ou usar o accessToken do usuário como fallback
        const selectedApp = this.appWabaOptions.find(app => app.id === this.selectedAppWaba)
        const bmToken = selectedApp?.token || this.facebookStatus.authResponse.accessToken
        
        if (!selectedApp?.token) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMeta.facebook.noTokenConfigured') || 'Nenhum token configurado para este app. Usando token do usuário.',
            timeout: 3000
          })
        }

        // Criar nome do canal
        const channelName = pageName || `Instagram - ${instagramPageId}`

        // Preparar dados do canal Instagram
        const whatsappData = {
          name: channelName,
          type: 'instagram',
          fbPageId: instagramPageId, // Instagram Page ID
          tokenAPI: instagramPageId, // Instagram Page ID
          bmToken: bmToken, // Business Manager Token
          wabaVersion: this.sanitizeWabaVersion(this.facebookApiVersion),
          status: 'CONNECTED',
          isDefault: false
        }

        // Criar o canal usando CriarWhatsapp
        const response = await CriarWhatsapp(whatsappData)
        const createdWhatsapp = response?.data || response?.data?.whatsapp || whatsappData

        // Configurar webhook após criar o canal
        if (this.metaToken && this.usuario?.tenantId && createdWhatsapp?.id) {
          try {
            const callbackUrl = `${process.env.URL_API}/metaWebhook/${this.usuario.tenantId}`
            const webhookData = {
              wabaId: instagramPageId, // Para Instagram, usar o Page ID
              wabaVersion: whatsappData.wabaVersion || 'v24.0',
              wabaToken: whatsappData.bmToken,
              overrideCallbackUri: callbackUrl,
              verifyToken: this.metaToken
            }
            await OverrideCallbackUrl(webhookData)
            console.log('Webhook configurado com sucesso para o canal Instagram:', createdWhatsapp.id)
          } catch (webhookError) {
            console.warn('Erro ao configurar webhook do Instagram:', webhookError)
            // Não bloquear a criação se a configuração do webhook falhar
            this.$q.notify({
              type: 'warning',
              message: this.$t('configuracaoMeta.instagram.webhookConfigError') || 'Canal criado, mas houve um aviso ao configurar o webhook',
              timeout: 5000
            })
          }
        }

        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMeta.instagram.channelCreated') || 'Canal Instagram criado com sucesso!',
          timeout: 3000
        })

        return createdWhatsapp
      } catch (error) {
        console.error('Erro ao criar canal Instagram:', error)
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || error.response?.data?.message || error.message || 'Erro ao criar canal Instagram',
          timeout: 5000
        })
        throw error
      }
    },
    async buscarInformacoesUsuario(accessToken) {
      try {
        // Carregar SDK se necessário
        if (!this.facebookSDKLoaded) {
          await this.carregarFacebookSDK()
        }

        // Buscar informações do usuário
        window.FB.api('/me', {
          fields: 'id,name,email,picture',
          access_token: accessToken
        }, (response) => {
          if (response && !response.error) {
            this.facebookUserInfo = response
          } else {
            console.error('Erro ao buscar informações do usuário:', response.error)
            this.facebookError = response.error?.message || 'Erro ao buscar informações do usuário'
          }
        })
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error)
        this.facebookError = error.message || 'Erro ao buscar informações do usuário'
      }
    },
    getFacebookStatusColor(status) {
      const colors = {
        'connected': 'positive',
        'not_authorized': 'warning',
        'unknown': 'grey'
      }
      return colors[status] || 'grey'
    },
    getFacebookStatusIcon(status) {
      const icons = {
        'connected': 'check_circle',
        'not_authorized': 'warning',
        'unknown': 'help'
      }
      return icons[status] || 'help'
    },
    getFacebookStatusLabel(status) {
      const labels = {
        'connected': this.$t('configuracaoMeta.facebook.statusConnected') || 'Conectado',
        'not_authorized': this.$t('configuracaoMeta.facebook.statusNotAuthorized') || 'Não Autorizado',
        'unknown': this.$t('configuracaoMeta.facebook.statusUnknown') || 'Desconhecido'
      }
      return labels[status] || status
    },
    truncateToken(token) {
      if (!token) return ''
      if (token.length <= 20) return token
      return token.substring(0, 20) + '...'
    },
    formatExpiresIn(expiresIn) {
      if (!expiresIn) return this.$t('configuracaoMeta.facebook.noExpiration') || 'Não expira'
      const seconds = parseInt(expiresIn)
      const days = Math.floor(seconds / 86400)
      const hours = Math.floor((seconds % 86400) / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      
      if (days > 0) {
        return `${days} ${days === 1 ? 'dia' : 'dias'}`
      } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hora' : 'horas'}`
      } else {
        return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`
      }
    },
    // WABA Management Methods
    async carregarWABAs() {
      try {
        this.loadingWABAs = true
        this.facebookError = null

        // Obter token: primeiro tenta o token do usuário, depois o token do app
        let accessToken = null
        
        if (this.facebookStatus && this.facebookStatus.status === 'connected' && this.facebookStatus.authResponse?.accessToken) {
          accessToken = this.facebookStatus.authResponse.accessToken
        } else {
          // Se não houver token do usuário, usar o token do app (System User Access Token)
          const selectedApp = this.appWabaOptions.find(app => app.id === this.selectedAppWaba)
          if (selectedApp?.token) {
            accessToken = selectedApp.token
          } else {
            this.$q.notify({
              type: 'warning',
              message: this.$t('configuracaoMeta.facebook.noTokenAvailable') || 'Nenhum token disponível. Por favor, faça login ou configure um token no app.',
              timeout: 3000
            })
            return
          }
        }

        if (!accessToken) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMeta.facebook.noTokenAvailable') || 'Nenhum token disponível. Por favor, faça login ou configure um token no app.',
            timeout: 3000
          })
          return
        }

        // Buscar WABAs usando a Graph API
        // Primeiro, buscar os Business Accounts do usuário
        const businessAccountsResponse = await this.chamarGraphAPI('/me/businesses', accessToken)
        
        if (!businessAccountsResponse || !businessAccountsResponse.data || businessAccountsResponse.data.length === 0) {
          this.$q.notify({
            type: 'info',
            message: this.$t('configuracaoMeta.facebook.noBusinessAccounts') || 'Nenhuma conta comercial encontrada',
            timeout: 3000
          })
          this.wabasList = []
          return
        }

        // Para cada Business Account, buscar os WABAs
        const wabasPromises = businessAccountsResponse.data.map(async (business) => {
          try {
            const wabasResponse = await this.chamarGraphAPI(`/${business.id}/owned_whatsapp_business_accounts`, accessToken, {
              fields: 'id,name,account_review_status,message_template_namespace,timezone_id'
            })
            
          return (wabasResponse?.data || []).map(waba => ({
            ...waba,
            businessId: business.id,
            businessName: business.name
          }))
          } catch (error) {
            console.error(`Erro ao buscar WABAs da conta ${business.id}:`, error)
            return []
          }
        })

        const wabasArrays = await Promise.all(wabasPromises)
        this.wabasList = wabasArrays.flat()

        if (this.wabasList.length === 0) {
          this.$q.notify({
            type: 'info',
            message: this.$t('configuracaoMeta.facebook.noWabasFound') || 'Nenhum WABA encontrado nas suas contas comerciais',
            timeout: 3000
          })
        } else {
          this.$q.notify({
            type: 'positive',
            message: `${this.wabasList.length} ${this.wabasList.length === 1 ? 'WABA encontrado' : 'WABAs encontrados'}`,
            timeout: 2000
          })
        }
      } catch (error) {
        console.error('Erro ao carregar WABAs:', error)
        this.facebookError = error.message || 'Erro ao carregar WABAs'
        this.$q.notify({
          type: 'negative',
          message: this.facebookError,
          timeout: 5000
        })
      } finally {
        this.loadingWABAs = false
      }
    },
    async carregarNumerosWABA(wabaId) {
      try {
        this.loadingPhones = wabaId
        this.facebookError = null

        // Obter token: primeiro tenta o token do usuário, depois o token do app
        let accessToken = null
        
        if (this.facebookStatus && this.facebookStatus.status === 'connected' && this.facebookStatus.authResponse?.accessToken) {
          accessToken = this.facebookStatus.authResponse.accessToken
        } else {
          // Se não houver token do usuário, usar o token do app (System User Access Token)
          const selectedApp = this.appWabaOptions.find(app => app.id === this.selectedAppWaba)
          if (selectedApp?.token) {
            accessToken = selectedApp.token
          } else {
            this.$q.notify({
              type: 'warning',
              message: this.$t('configuracaoMeta.facebook.noTokenAvailable') || 'Nenhum token disponível. Por favor, faça login ou configure um token no app.',
              timeout: 3000
            })
            return
          }
        }

        if (!accessToken) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMeta.facebook.noTokenAvailable') || 'Nenhum token disponível. Por favor, faça login ou configure um token no app.',
            timeout: 3000
          })
          return
        }

        // Buscar números de telefone do WABA
        const phonesResponse = await this.chamarGraphAPI(`/${wabaId}/phone_numbers`, accessToken, {
          fields: 'id,display_phone_number,verified_name,code_verification_status,quality_rating,throughput,account_mode'
        })

        // Atualizar a lista de WABAs com os números encontrados
        const wabaIndex = this.wabasList.findIndex(w => w.id === wabaId)
        if (wabaIndex !== -1) {
          this.wabasList[wabaIndex].phoneNumbers = phonesResponse?.data || []
          
          if (phonesResponse?.data && phonesResponse.data.length > 0) {
            this.$q.notify({
              type: 'positive',
              message: `${phonesResponse.data.length} ${phonesResponse.data.length === 1 ? 'número encontrado' : 'números encontrados'}`,
              timeout: 2000
            })
          } else {
            this.$q.notify({
              type: 'info',
              message: this.$t('configuracaoMeta.facebook.noPhonesFound') || 'Nenhum número de telefone encontrado neste WABA',
              timeout: 3000
            })
          }
        }
      } catch (error) {
        console.error('Erro ao carregar números do WABA:', error)
        this.facebookError = error.message || 'Erro ao carregar números de telefone'
        this.$q.notify({
          type: 'negative',
          message: this.facebookError,
          timeout: 5000
        })
      } finally {
        this.loadingPhones = null
      }
    },
    async chamarGraphAPI(endpoint, accessToken, params = {}) {
      try {
        // Validar se o token está disponível
        if (!accessToken) {
          throw new Error('Access token não fornecido ou inválido')
        }

        const baseUrl = 'https://graph.facebook.com'
        const version = this.facebookApiVersion
        const queryParams = new URLSearchParams({
          access_token: accessToken,
          ...params
        })
        
        const url = `${baseUrl}/${version}${endpoint}?${queryParams.toString()}`
        // console.log('Chamando Graph API:', url.replace(accessToken, 'TOKEN_HIDDEN'))
        
        const response = await fetch(url)
        const data = await response.json()
        
        if (!response.ok || data.error) {
          const errorMessage = data.error?.message || `Erro HTTP ${response.status}`
          console.error('Erro na Graph API:', data.error || response.statusText)
          throw new Error(errorMessage)
        }
        
        return data
      } catch (error) {
        console.error('Erro ao chamar Graph API:', error)
        throw error
      }
    },
    async criarCanalWABA(waba, phone) {
      // Gerar chave única para este canal
      const channelKey = `${waba.id}-${phone.id}`
      
      // Verificar se já está criando este canal
      if (this.creatingChannels[channelKey]) {
        return
      }

      // Marcar como criando
      this.creatingChannels[channelKey] = true
      
      try {
        // Validar se está conectado ao Facebook
        if (!this.facebookStatus || this.facebookStatus.status !== 'connected') {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMeta.facebook.notConnected') || 'Você precisa estar conectado ao Facebook',
            timeout: 3000
          })
          this.creatingChannels[channelKey] = false
          return
        }

        // Obter o token do app selecionado, ou usar o accessToken do usuário como fallback
        const selectedApp = this.appWabaOptions.find(app => app.id === this.selectedAppWaba)
        const bmToken = selectedApp?.token || this.facebookStatus.authResponse.accessToken
        
        if (!selectedApp?.token) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMeta.facebook.noTokenConfigured') || 'Nenhum token configurado para este app. Usando token do usuário.',
            timeout: 3000
          })
        }

        // Criar nome do canal
        const channelName = `${waba.name || waba.id} - ${phone.display_phone_number || phone.id}`

        // Preparar dados do canal (mesmo padrão do ModalWhatsapp.vue)
        const whatsappData = {
          name: channelName,
          type: 'waba',
          tokenAPI: phone.id, // Phone Number ID
          wabaId: waba.id, // WABA ID
          bmToken: bmToken, // Business Manager Token
          wabaVersion: this.sanitizeWabaVersion(this.facebookApiVersion),
          status: 'CONNECTED',
          isDefault: false
        }

        // Criar o canal usando CriarWhatsapp (mesmo serviço usado no ModalWhatsapp.vue)
        const response = await CriarWhatsapp(whatsappData)
        const createdWhatsapp = response?.data || response?.data?.whatsapp || whatsappData

        // Verificar o telefone após criar (apenas se tiver bmToken configurado)
        // Não verificar se estiver usando o token do usuário, pois pode não ter permissões
        const appForVerification1 = this.appWabaOptions.find(app => app.id === this.selectedAppWaba)
        const hasBmToken1 = appForVerification1?.token && appForVerification1.token !== this.facebookStatus?.authResponse?.accessToken
        
        if (createdWhatsapp && createdWhatsapp.id && hasBmToken1) {
          try {
            const verificationData = {
              tokenAPI: whatsappData.tokenAPI,
              wabaId: whatsappData.wabaId,
              bmToken: whatsappData.bmToken,
              wabaVersion: whatsappData.wabaVersion
            }
            await VerificarTelefone(verificationData)
            
            // Configurar webhook após verificar o telefone
            if (this.metaToken && this.usuario?.tenantId) {
              try {
                const callbackUrl = `${process.env.URL_API}/metaWebhook/${this.usuario.tenantId}`
                const webhookData = {
                  wabaId: whatsappData.wabaId,
                  wabaVersion: whatsappData.wabaVersion || 'v23.0',
                  wabaToken: whatsappData.bmToken,
                  overrideCallbackUri: callbackUrl,
                  verifyToken: this.metaToken
                }
                await OverrideCallbackUrl(webhookData)
                console.log('Webhook configurado com sucesso para o canal:', createdWhatsapp.id)
              } catch (webhookError) {
                console.warn('Erro ao configurar webhook:', webhookError)
                // Não bloquear a criação se a configuração do webhook falhar
                this.$q.notify({
                  type: 'warning',
                  message: this.$t('configuracaoMeta.facebook.webhookConfigError') || 'Canal criado, mas houve um aviso ao configurar o webhook',
                  timeout: 5000
                })
              }
            }
          } catch (error) {
            console.warn('Erro ao verificar telefone WABA:', error)
            // Não bloquear a criação se a verificação falhar
            if (error.response?.status === 401) {
              this.$q.notify({
                type: 'warning',
                message: this.$t('configuracaoMeta.facebook.phoneVerificationUnauthorized') || 'Canal criado, mas não foi possível verificar o telefone. O token pode não ter as permissões necessárias.',
                timeout: 6000
              })
            } else if (error.response && error.response.status === 400) {
              this.$q.notify({
                type: 'warning',
                message: error.response?.data?.message || this.$t('configuracaoMeta.facebook.phoneVerificationError') || 'Canal criado, mas houve um aviso na verificação do telefone',
                timeout: 5000
              })
            } else {
              this.$q.notify({
                type: 'warning',
                message: this.$t('configuracaoMeta.facebook.phoneVerificationError') || 'Canal criado, mas houve um aviso na verificação do telefone',
                timeout: 5000
              })
            }
          }
        }

        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMeta.facebook.channelCreated') || 'Canal criado com sucesso!',
          timeout: 3000
        })

      } catch (error) {
        console.error('Erro ao criar canal:', error)
        console.error('Detalhes do erro:', {
          message: error.message,
          response: error.response,
          stack: error.stack
        })
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || error.response?.data?.message || error.message || 'Erro ao criar canal',
          timeout: 5000
        })
      } finally {
        // Remover o estado de criação
        this.creatingChannels[channelKey] = false
      }
    },
    getPhoneStatusColor(status) {
      const colors = {
        'VERIFIED': 'positive',
        'NOT_VERIFIED': 'warning',
        'UNVERIFIED': 'grey',
        'EXPIRED': 'negative'
      }
      return colors[status] || 'grey'
    },
    async chamarGraphAPIPOST(endpoint, accessToken, data = {}) {
      try {
        const baseUrl = 'https://graph.facebook.com'
        const version = this.facebookApiVersion
        const url = `${baseUrl}/${version}${endpoint}?access_token=${accessToken}`
        
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        
        const responseData = await response.json()
        
        if (!response.ok || responseData.error) {
          const errorMessage = responseData.error?.message || `Erro HTTP ${response.status}`
          console.error('Erro na Graph API POST:', responseData.error || response.statusText)
          throw new Error(errorMessage)
        }
        
        return responseData
      } catch (error) {
        console.error('Erro ao chamar Graph API POST:', error)
        throw error
      }
    },
    launchWhatsAppSignup() {
      try {
        this.loadingEmbeddedSignup = true
        this.facebookError = null

        // Verificar se o App ID está configurado
        if (!this.facebookAppId) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMeta.facebook.appIdRequired') || 'App ID não configurado. Por favor, selecione um app.',
            timeout: 5000
          })
          this.loadingEmbeddedSignup = false
          return
        }

        // Verificar se o Config ID está configurado
        if (!this.embeddedSignupConfigId) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMeta.facebook.configIdRequired') || 'Config ID não configurado. Por favor, configure o Config ID do Cadastro Incorporado.',
            timeout: 5000
          })
          this.loadingEmbeddedSignup = false
          return
        }

        // Verificar se o SDK está carregado
        if (!this.facebookSDKLoaded || !window.FB) {
          this.$q.notify({
            type: 'warning',
            message: this.$t('configuracaoMeta.facebook.sdkNotLoaded') || 'SDK do Facebook não está carregado. Aguarde...',
            timeout: 3000
          })
          
          // Tentar carregar o SDK
          this.carregarFacebookSDK().then(() => {
            this.launchWhatsAppSignup()
          }).catch((error) => {
            console.error('Erro ao carregar SDK:', error)
            this.loadingEmbeddedSignup = false
          })
          return
        }

        // Verificar se o SDK está funcionando corretamente antes de chamar login
        try {
          // Testar se o SDK responde
          window.FB.getLoginStatus(() => {
            // SDK está funcionando
          })
        } catch (error) {
          console.error('Erro ao verificar status do SDK:', error)
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMeta.facebook.sdkError') || 'Erro ao verificar SDK do Facebook. Tente recarregar a página.',
            timeout: 5000
          })
          this.loadingEmbeddedSignup = false
          return
        }

        // CRÍTICO: Redirecionar para a página HTML dedicada para garantir que o fallback_redirect_uri
        // seja a própria página (sem hash), não a página Vue com hash routing.
        // Isso força o Facebook a usar a URL correta como fallback_redirect_uri.
        
        // Obter dados do app selecionado para salvar no localStorage
        const selectedApp = this.appWabaOptions.find(app => app.id === this.selectedAppWaba)
        if (!selectedApp) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMeta.facebook.noAppSelected') || 'Nenhum app selecionado. Por favor, selecione um app.',
            timeout: 5000
          })
          this.loadingEmbeddedSignup = false
          return
        }
        
        // Salvar dados do app no localStorage para a página HTML acessar
        const appData = {
          appId: selectedApp.appId,
          appSecret: selectedApp.appSecret,
          apiVersion: selectedApp.apiVersion || this.facebookApiVersion,
          token: selectedApp.token,
          redirectUri: selectedApp.redirectUri || window.location.origin + '/facebook-embedded-signup.html'
        }
        localStorage.setItem('embeddedSignupAppData', JSON.stringify(appData))
        
        // Salvar URL da API também
        const apiUrl = process.env.URL_API
        localStorage.setItem('apiUrl', apiUrl)
        localStorage.setItem('windowOrigin', window.location.origin)
        
        console.log('Dados do app salvos no localStorage:', { appId: appData.appId, hasAppSecret: !!appData.appSecret, hasToken: !!appData.token, apiUrl: apiUrl })
        
        // Preparar parâmetros para passar via query string
        const params = new URLSearchParams()
        params.set('app_id', this.facebookAppId)
        params.set('api_version', this.facebookApiVersion)
        params.set('config_id', this.embeddedSignupConfigId)
        params.set('tenantId', this.usuario.tenantId)
        params.set('metaToken', this.metaToken)
        
        // URL da página dedicada com parâmetros
        const embeddedSignupUrl = `/facebook-embedded-signup.html?${params.toString()}`
        
        console.log('Redirecionando para página dedicada:', embeddedSignupUrl)
        console.log('Esta página iniciará o FB.login() garantindo que o fallback_redirect_uri seja:', window.location.origin + '/facebook-embedded-signup.html')
        
        // Redirecionar para a página dedicada
        window.location.href = embeddedSignupUrl
      } catch (error) {
        console.error('Erro ao lançar Cadastro Incorporado:', error)
        this.facebookError = error.message || 'Erro ao lançar cadastro incorporado'
        this.loadingEmbeddedSignup = false
        this.$q.notify({
          type: 'negative',
          message: this.facebookError,
          timeout: 5000
        })
      }
    },
    async verificarContaInstagram() {
      try {
        this.loadingInstagramCheck = true
        
        if (!this.selectedInstagram) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.instagram.selectInstagramFirst'),
            timeout: 3000
          })
          return
        }

        const response = await GetChannelInfoInstagram(this.selectedInstagram.value)
        
        this.instagramAccountInfo = response.data
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.instagram.accountInfoLoaded'),
          timeout: 3000
        })
        
      } catch (error) {
        console.error('Erro ao verificar conta Instagram:', error)
        
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || this.$t('configuracaoMetaPanel.instagram.accountCheckError'),
          timeout: 5000
        })
      } finally {
        this.loadingInstagramCheck = false
      }
    },
    async verificarContaMessenger() {
      try {
        this.loadingMessengerCheck = true
        
        if (!this.selectedMessenger) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.messenger.selectMessengerFirst') || 'Por favor, selecione uma conexão Messenger primeiro',
            timeout: 3000
          })
          return
        }

        const response = await GetChannelInfoMessenger(this.selectedMessenger.value)
        
        this.messengerAccountInfo = response.data
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.messenger.pageInfoLoaded') || 'Informações da página carregadas com sucesso!',
          timeout: 3000
        })
        
      } catch (error) {
        console.error('Erro ao verificar página Messenger:', error)
        
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || this.$t('configuracaoMetaPanel.messenger.pageCheckError') || 'Erro ao verificar página Messenger',
          timeout: 5000
        })
      } finally {
        this.loadingMessengerCheck = false
      }
    },
    async verificarContaFacebook() {
      try {
        this.loadingFacebookCheck = true
        
        if (!this.selectedFacebook) {
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracaoMetaPanel.facebook.selectFacebookFirst') || 'Por favor, selecione uma conexão Facebook primeiro',
            timeout: 3000
          })
          return
        }

        const response = await GetChannelInfoFacebook(this.selectedFacebook.value)
        
        this.facebookAccountInfo = response.data
        
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracaoMetaPanel.facebook.pageInfoLoaded') || 'Informações da página carregadas com sucesso!',
          timeout: 3000
        })
        
      } catch (error) {
        console.error('Erro ao verificar página Facebook:', error)
        
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.error || this.$t('configuracaoMetaPanel.facebook.pageCheckError') || 'Erro ao verificar página Facebook',
          timeout: 5000
        })
      } finally {
        this.loadingFacebookCheck = false
      }
    },
  },
  async mounted() {
    await this.listarTenantPorId()
    this.userProfile = localStorage.getItem('profile')
    
    // Carregar apps WABA disponíveis
    if (this.userProfile === 'admin') {
      await this.carregarAppWabas()
      // Selecionar automaticamente a primeira conexão Instagram disponível
      if (this.cInstagramSessionsOptions.length > 0) {
        this.selectedInstagram = this.cInstagramSessionsOptions[0]
      }
      // Selecionar automaticamente a primeira conexão Messenger disponível
      if (this.cMessengerSessionsOptions.length > 0) {
        this.selectedMessenger = this.cMessengerSessionsOptions[0]
      }
      // Selecionar automaticamente a primeira conexão Facebook disponível
      if (this.cFacebookSessionsOptions.length > 0) {
        this.selectedFacebook = this.cFacebookSessionsOptions[0]
      }
    }
    
    this.$watch('tab', (newTab) => {
      if (newTab === 'facebook') {
        if (!this.facebookSDKLoaded) {
          this.carregarFacebookSDK().then(() => {
            // Verificar status automaticamente após carregar o SDK
            this.verificarStatusFacebook()
          }).catch((error) => {
            console.error('Erro ao carregar Facebook SDK:', error)
            this.facebookError = error.message || 'Erro ao carregar o SDK do Facebook'
          })
        } else {
          // Se o SDK já está carregado, apenas renderizar o botão
          this.$nextTick(() => {
            this.renderizarBotaoFacebook()
          })
        }
      }
    }, { immediate: true })
  },
})
</script>

<style lang="scss" scoped>
.q-list {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  padding: 18px 18px 10px 18px;
  margin-top: 18px;
  margin-bottom: 18px;
}

.q-item {
  border-radius: 8px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(0,0,0,0.03);
  }
  .q-item__label {
    font-weight: 500;
  }
  .q-item__label--caption {
    opacity: 0.7;
  }
}

.row.q-px-md {
  margin-bottom: 18px;
  &:last-of-type {
    margin-bottom: 0;
  }
  .col-12 {
    margin-bottom: 0;
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
}

.q-card.bg-grey-1 {
  background: rgba(245,245,245,0.85) !important;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  margin-top: 12px;
  margin-bottom: 12px;
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

/* Modo Escuro */
body.body--dark {
  .q-list {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  }
  .q-item {
    &:hover {
      background: rgba(255,255,255,0.07);
    }
  }
  .q-input {
    .q-field__control {
      background: rgba(255,255,255,0.05);
      &:hover {
        background: rgba(255,255,255,0.1);
      }
    }
    &.q-field--focused .q-field__control {
      background: rgba(255,255,255,0.15);
    }
  }
  .q-card.bg-grey-1 {
    background: rgba(40,40,40,0.95) !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }
  .q-tabs {
    background: rgba(30, 30, 30, 0.95);
  }
  
  .q-tab-panels {
    background: rgba(30, 30, 30, 0.95);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .q-list {
    padding: 10px 6px 6px 6px;
    border-radius: 10px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .q-item {
    margin-bottom: 10px;
  }
  .row.q-px-md {
    margin-bottom: 10px;
  }
  .q-card.bg-grey-1 {
    border-radius: 8px;
    margin-top: 6px;
    margin-bottom: 6px;
  }
}

.custom-input-padding .q-field__native {
  padding-bottom: 16px !important;
  padding-top: 16px !important;
  padding-left: 12px !important;
  padding-right: 12px !important;
  line-height: 1.6 !important;
  font-size: 1.1em;
  box-sizing: border-box;
}

.fb-login-button-wrapper {
  height: 36px !important;
  min-height: 36px !important;
  display: inline-flex !important;
  align-items: center !important;
  align-self: center !important;
  vertical-align: middle !important;
  line-height: 36px !important;
  
  * {
    box-sizing: border-box;
  }
  
  .fb-login-button {
    height: 36px !important;
    min-height: 36px !important;
    display: inline-block !important;
    vertical-align: middle !important;
    line-height: 36px !important;
    
    iframe {
      height: 36px !important;
      min-height: 36px !important;
      max-height: 36px !important;
      width: auto !important;
    }
  }
  
  span {
    height: 36px !important;
    min-height: 36px !important;
    line-height: 36px !important;
    display: inline-flex !important;
    align-items: center !important;
    vertical-align: middle !important;
  }
  
  // Ajustar o botão do Facebook para corresponder ao tamanho dos botões Quasar
  :deep(span) {
    height: 36px !important;
    min-height: 36px !important;
    line-height: 36px !important;
  }
  
  :deep(iframe) {
    height: 36px !important;
    min-height: 36px !important;
    max-height: 36px !important;
  }
  
  // Sobrescrever estilos do Facebook SDK
  :deep(.fb_iframe_widget) {
    height: 36px !important;
    min-height: 36px !important;
  }
  
  :deep(.fb_iframe_widget span) {
    height: 36px !important;
    min-height: 36px !important;
    line-height: 36px !important;
  }
  
  :deep(.fb_iframe_widget iframe) {
    height: 36px !important;
    min-height: 36px !important;
    max-height: 36px !important;
  }
}
</style>