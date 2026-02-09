<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{ $t('configuracoesWebchat.title') }}</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-banner :class="getBannerClass()">
              <template v-slot:avatar>
                <q-icon :name="getBannerIcon()" />
              </template>
              <template v-if="webchatConfigurado && wssUrlFuncionando">
                {{ $t('configuracoesWebchat.webchatConfigurado') }}
                <br>
                {{ $t('configuracoesWebchat.wssFuncionando') }}
                <br>
                {{ $t('configuracoesWebchat.gerarWidget') }}
              </template>
              <template v-else-if="webchatConfigurado && !wssUrlFuncionando">
                {{ $t('configuracoesWebchat.wssNaoFuncionando') }}
                <br>
                {{ $t('configuracoesWebchat.verificarWss') }}
                <br>
                URL: {{ wssUrl }}
              </template>
              <template v-else>
                {{ $t('configuracoesWebchat.solicitarInstalacao') }}
                <br>
                {{ $t('configuracoesWebchat.configurarAmbiente') }}
              </template>
            </q-banner>

            <!-- Campo para o websocketToken -->
            <div class="q-mt-md">
              <q-input
                v-model="websocketToken"
                class="custom-input-padding"
                :label="$t('configuracoesWebchat.autenticationToken')"
                filled
                :rules="[val => !!val || $t('configuracoesWebchat.tokenWarning')]"
                :readonly="!webchatConfigurado"
                :loading="loadingToken"
              >
                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    flat
                    icon="refresh"
                    @click="gerarNovoToken"
                    :loading="loadingToken"
                  >
                    <q-tooltip>{{ $t('configuracoesWebchat.generateNewToken') }}</q-tooltip>
                  </q-btn>
                </template>
              </q-input>
              <div class="text-caption text-grey q-mt-xs">
                {{ $t('configuracoesWebchat.tokenWarning2') }}
              </div>
            </div>

            <!-- Seleção do canal -->
            <div class="q-mt-md">
              <q-select
                v-model="selectedChannel"
                :options="cSessionsOptions"
                :label="$t('configuracoesWebchat.selecionarCanal')"
                filled
                :disable="!webchatConfigurado || !wssUrlFuncionando"
              />
            </div>

            <q-btn
              color="primary"
              :label="$t('configuracoesWebchat.gerarWidgetBtn')"
              @click="gerarWidget"
              :loading="loading"
              :disable="!webchatConfigurado || !wssUrlFuncionando || !selectedChannel"
              class="q-mt-md"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Modal para mostrar o código -->
    <q-dialog v-model="showModal">
      <q-card style="min-width: 80vw">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ $t('configuracoesWebchat.widgetCode') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-btn
                color="primary"
                :label="$t('configuracoesWebchat.copyCode')"
                @click="copiarCodigo"
                :loading="copying"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="widgetCode"
                type="textarea"
                filled
                autogrow
                readonly
                class="code-textarea custom-input-padding"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ObterWidgetWebChat, VerificarConfiguracaoWebchat } from 'src/service/webchat.js'
import { AlterarTenantWebsocketToken, ListarTenantPorId } from 'src/service/tenants.js'
import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex';

export default {
  name: 'ConfiguracoesWebchat',
  data() {
    return {
      usuario,
      loading: false,
      loadingToken: false,
      showModal: false,
      widgetCode: '',
      copying: false,
      webchatConfigurado: false,
      wssUrlFuncionando: false,
      wssUrl: process.env.WSS_URL || '',
      websocketToken: '',
      selectedChannel: null
    }
  },
  computed: {
    ...mapGetters(['whatsapps']),
    cSessions() {
      return this.whatsapps.filter(w => ["webchat"].includes(w.type) && !w.isDeleted);
    },
    cSessionsOptions() {
      return this.cSessions.map(w => ({ label: w.name, value: w.wabaId, type: w.type }))
    }
  },
  mounted() {
    this.listarTenantPorId()
    this.verificarConfiguracaoWebchat()
  },
  methods: {
    async listarTenantPorId() {
      try {
        this.loading = true
        const { data } = await ListarTenantPorId(this.usuario.tenantId)
        if (data && data[0].websocketToken) {
          this.websocketToken = data[0].websocketToken
        }
      } catch (error) {
        console.error('Erro ao carregar dados do tenant:', error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('configuracoesWebchat.tenantErro'),
          icon: 'error'
        })
      } finally {
        this.loading = false
      }
    },
    getBannerClass() {
      if (!this.webchatConfigurado) return 'bg-warning text-black'
      if (!this.wssUrlFuncionando) return 'bg-negative text-black'
      return 'bg-positive text-black'
    },
    getBannerIcon() {
      if (!this.webchatConfigurado) return 'warning'
      if (!this.wssUrlFuncionando) return 'error'
      return 'check_circle'
    },
    async verificarConfiguracaoWebchat() {
      try {
        const response = await VerificarConfiguracaoWebchat()
        this.webchatConfigurado = response.data.configurado
        this.wssUrlFuncionando = response.data.wssUrlFuncionando
      } catch (error) {
        console.error('Erro ao verificar configuração do webchat:', error)
        this.webchatConfigurado = false
        this.wssUrlFuncionando = false
      }
    },
    async gerarNovoToken() {
      try {
        this.loadingToken = true
        const novoToken = uuidv4()
        await AlterarTenantWebsocketToken({
          id: this.usuario.tenantId,
          websocketToken: novoToken
        })
        this.websocketToken = novoToken
        this.$q.notify({
          color: 'positive',
          message: this.$t('configuracoesWebchat.tokenUpdated'),
          icon: 'check'
        })
      } catch (error) {
        console.error('Erro ao gerar novo token:', error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('configuracoesWebchat.tokenError'),
          icon: 'error'
        })
      } finally {
        this.loadingToken = false
      }
    },
    async gerarWidget() {
      try {
        this.loading = true
        const tenantId = this.usuario.tenantId
        const wabaId = this.selectedChannel.value
        console.log(tenantId, wabaId, this.websocketToken)
        const response = await ObterWidgetWebChat(tenantId, wabaId, this.websocketToken)
        
        // Criar um link para download do arquivo
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `webchat-widget-${tenantId}-${wabaId}.js`)
        document.body.appendChild(link)
        link.click()
        link.remove()

        // Converter o blob para texto e mostrar no modal
        const reader = new FileReader()
        reader.onload = () => {
          this.widgetCode = reader.result
          this.showModal = true
        }
        reader.readAsText(response.data)
        
        this.$q.notify({
          color: 'positive',
          message: this.$t('configuracoesWebchat.widgetGerado'),
          icon: 'check'
        })
      } catch (error) {
        console.error('Erro ao gerar widget:', error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('configuracoesWebchat.erroGerarWidget'),
          icon: 'error'
        })
      } finally {
        this.loading = false
      }
    },
    async copiarCodigo() {
      try {
        this.copying = true
        await navigator.clipboard.writeText(this.widgetCode)
        this.$q.notify({
          color: 'positive',
          message: this.$t('configuracoesWebchat.sucessCopy'),
          icon: 'content_copy'
        })
      } catch (error) {
        console.error('Erro ao copiar código:', error)
        this.$q.notify({
          color: 'negative',
          message: this.$t('configuracoesWebchat.copyCodeError'),
          icon: 'error'
        })
      } finally {
        this.copying = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-card {
  max-width: 600px;
  margin: 0 auto;
}
.code-textarea {
  font-family: monospace;
  font-size: 14px;
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
</style> 
