<template>
  <div v-if="userProfile === 'admin'">
    <q-card class="q-ma-md" style="border-radius: 8px;">
      <q-card-section>
        <div class="text-h6">
          {{ $t('api.title') }}
          <div class="float-right q-gutter-xs">
            <q-btn 
              color="primary"
              :label="$t('api.postmanButton')"
              size="sm"
              class="gt-xs"
              @click="download" />
            <q-btn 
              color="primary"
              :label="$t('api.addButton')"
              size="sm"
              class="gt-xs"
              @click="apiEdicao = {}; modalApi = true" />
            <!-- Botões para mobile -->
            <q-btn 
              color="primary"
              icon="mdi-download"
              size="sm"
              class="lt-sm"
              @click="download">
              <q-tooltip>{{ $t('api.postmanButton') }}</q-tooltip>
            </q-btn>
            <q-btn 
              color="primary"
              icon="add"
              size="sm"
              class="lt-sm"
              @click="apiEdicao = {}; modalApi = true">
              <q-tooltip>{{ $t('api.addButton') }}</q-tooltip>
            </q-btn>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="scroll"
        :style="`height: ${$q.screen.lt.sm ? 'calc(100vh - 150px)' : 'calc(100vh - 200px)'}`">
        <q-item v-for="api in apis"
          :key="api.token"
          class="q-my-md shadow-2">

          <q-item-section top>
            <q-item-label class="text-bold text-h6 q-my-sm">
              <div class="row items-center justify-between">
                <div class="col-12 col-sm-8">
                  {{ $t('api.columns.name') }}: {{ api.name }}
                </div>
                <div class="col-12 col-sm-4 text-right">
                  <div class="text-grey-8 q-gutter-xs">
                    <q-btn class="gt-xs"
                      size="12px"
                      flat
                      dense
                      round
                      icon="mdi-content-copy"
                      @click="copy(api.token)">
                      <q-tooltip>
                        {{ $t('api.copyToken') }}
                      </q-tooltip>
                    </q-btn>
                    <q-btn class="gt-xs"
                      size="12px"
                      flat
                      dense
                      round
                      icon="edit"
                      @click="editarAPI(api)">
                      <q-tooltip>
                        {{ $t('api.editConfig') }}
                      </q-tooltip>
                    </q-btn>
                    <q-btn class="gt-xs"
                      size="12px"
                      flat
                      dense
                      round
                      icon="mdi-autorenew"
                      @click="gerarNovoToken(api)">
                      <q-tooltip>
                        {{ $t('api.newToken') }}
                      </q-tooltip>
                    </q-btn>
                    <q-btn class="gt-xs"
                      size="12px"
                      flat
                      dense
                      round
                      icon="delete"
                      @click="deletarApi(api)">
                      <q-tooltip>
                        {{ $t('api.deleteConfig') }}
                      </q-tooltip>
                    </q-btn>
                    <!-- Botões para mobile -->
                    <q-btn class="lt-sm"
                      size="sm"
                      flat
                      dense
                      round
                      icon="mdi-content-copy"
                      @click="copy(api.token)">
                      <q-tooltip>
                        {{ $t('api.copyToken') }}
                      </q-tooltip>
                    </q-btn>
                    <q-btn class="lt-sm"
                      size="sm"
                      flat
                      dense
                      round
                      icon="edit"
                      @click="editarAPI(api)">
                      <q-tooltip>
                        {{ $t('api.editConfig') }}
                      </q-tooltip>
                    </q-btn>
                    <q-btn class="lt-sm"
                      size="sm"
                      flat
                      dense
                      round
                      icon="mdi-autorenew"
                      @click="gerarNovoToken(api)">
                      <q-tooltip>
                        {{ $t('api.newToken') }}
                      </q-tooltip>
                    </q-btn>
                    <q-btn class="lt-sm"
                      size="sm"
                      flat
                      dense
                      round
                      icon="delete"
                      @click="deletarApi(api)">
                      <q-tooltip>
                        {{ $t('api.deleteConfig') }}
                      </q-tooltip>
                    </q-btn>
                  </div>
                </div>
              </div>
            </q-item-label>
            <q-item-label lines="4"
              style="word-break: break-all;">
              <p class="text-weight-medium q-pr-md blur-effect">
                <span class="text-bold">{{ $t('api.url') }}:
                </span>
                <span class="text-caption text-grey-7 lt-sm">{{ montarUrlIntegração(api.id) }}</span>
                <span class="text-body2 gt-xs">{{ montarUrlIntegração(api.id) }}</span>
              </p>
            </q-item-label>
            <q-item-label style="word-break: break-all;">
              <p class="text-weight-medium q-pr-md blur-effect">
                <span class="text-bold">{{ $t('api.bearerToken') }}:
                </span>
                <span class="text-caption text-grey-7 lt-sm">{{ api.token }}</span>
                <span class="text-body2 gt-xs">{{ api.token }}</span>
              </p>
            </q-item-label>
            <!-- <q-item-label caption>
              <p class="text-weight-medium">
                <span class="text-bold">WebHook Status Whatsapp:</span> <span> {{ api.urlServiceStatus }} </span>
              </p>
            </q-item-label>
            <q-item-label caption>
              <p class="text-weight-medium">
                <span class="text-bold">WebHook Status Mensagem:</span> <span> {{ api.urlMessageStatus }} </span>
              </p>
            </q-item-label> -->
            <!-- <q-item-label style="word-break: break-all;">
              <p class="text-weight-medium text-nowrap q-pr-md">
                <span class="text-bold">{{ $t('api.key') }}:
                </span>
                {{ api.authToken }}
              </p>
            </q-item-label> -->
            <q-item-label lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            </q-item-label>
            <!-- <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Envio de Mídia por URL:</span> <span> {{ montarUrlIntegraçãoMidiaUrl(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "mediaUrl": "https://comunidadezdg.com.br/wp-content/uploads/2022/07/icon100.png", "body": "Mensagem", "number": "destino", "externalKey": "externalKeydd211"  } </span>
              </p>
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Setar Fila:</span> <span> {{ montarUrlIntegraçãoFila(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "ticketId": 4, "queueId": 1 } </span>
              </p>
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Buscar informações do ticket:</span> <span> {{ montarUrlIntegraçãoTicket(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "number": "551191234567" } </span>
              </p>
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Buscar informações do ticket:</span> <span> {{ montarUrlIntegraçãoUrl(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "mediaUrl": "https://comunidadezdg.com.br/wp-content/uploads/2022/07/icon100.png", "body": "A mensagem desejada", "number": "5515998566622", "externalKey": "externalKeydd211" } </span>
              </p>
            </q-item-label>
            <q-item-label class="item-label" caption>
              <p class="text-weight-medium">
                <span class="text-bold">Buscar informações do ticket:</span> <span> {{ montarUrlIntegraçãoVoice(api.id) }} </span>
              </p>
              <p>
                <span class="text-bold">Exemplo de Carga (POST):</span> <span> { "audio": "https://comunidadezdg.com.br/wp-content/uploads/2022/12/audio.ogg", "number": "5515998566622", "externalKey": "externalKeydd211" } </span>
              </p>
            </q-item-label> -->
          </q-item-section>
        </q-item>

      </q-card-section>
    </q-card>

    <ModalApi v-model:modalApi="modalApi"
      v-model:apiEdicao="apiEdicao"
      @modal-api:criada="apiCriada"
      @modal-api:editada="apiEditada" />

  </div>
</template>

<script>
import { ListarAPIs, ApagarAPI, NovoTokenAPI } from 'src/service/api.js'
import { copyToClipboard } from 'quasar'
import ModalApi from './ModalApi.vue'
import { MostrarCores } from 'src/service/empresas.js';
export default {
  name: 'APIs',
  components: {
    ModalApi
  },
  data () {
    return {
      colors: {},
      userProfile: 'user',
      apiEdicao: {},
      modalApi: false,
      apis: [],
      pagination: {
        rowsPerPage: 40,
        rowsNumber: 0,
        lastIndex: 0
      },
      loading: false,
      columns: [
        { name: 'name', label: this.$t('api.columns.name'), field: 'name', align: 'left' },
        { name: 'token', label: this.$t('api.columns.token'), field: 'token', align: 'left' },
        { name: 'isActive', label: this.$t('api.columns.isActive'), field: 'isActive', align: 'center' },
        { name: 'acoes', label: this.$t('api.columns.actions'), field: 'acoes', align: 'center' },
      ]
    }
  },
  computed: {
    cBaseUrlIntegração () {
      return `${process.env.URL_API}/v2/api/external`
    }
  },
  methods: {
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
            const rawLabel =
              (typeof colorObj.label === 'string' && colorObj.label) ||
              (typeof colorObj.name === 'string' && colorObj.name) ||
              (typeof colorObj.key === 'string' && colorObj.key) ||
              ''

            if (!rawLabel) return acc
            const key = rawLabel.toLowerCase().trim()
            const value =
              colorObj.value ??
              (rawLabel in colorObj ? colorObj[rawLabel] : undefined) ??
              colorObj.hex ??
              colorObj.color ??
              null

            if (typeof value === 'string' && value) {
              acc[key] = value
            }
            return acc
          }, {})

          

          const root = document.documentElement;
          root.style.setProperty("--q-neutral", this.colors.neutral);
          root.style.setProperty("--q-primary", this.colors.primary);
          root.style.setProperty("--q-secondary", this.colors.secondary);
          root.style.setProperty("--q-accent", this.colors.accent);
          root.style.setProperty("--q-warning", this.colors.warning);
          root.style.setProperty("--q-negative", this.colors.negative);
          root.style.setProperty("--q-positive", this.colors.positive);
          root.style.setProperty("--q-light", this.colors.light);

          

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    download() {
      const postmanLink = JSON.parse(localStorage.getItem('postmanLink')) || 'https://www.postman.com/comunidade-zdg/z-pro/collection/s16subg/postman-v3-x-x-x?action=share&creator=25151510';
      window.open(postmanLink, '_blank'); 
    },
    montarUrlIntegração (id) {
      return `${this.cBaseUrlIntegração}/${id}`
    },
    montarUrlIntegraçãoMidiaUrl (id) {
      return `${this.cBaseUrlIntegração}/${id}/url`
    },
    montarUrlIntegraçãoFila (id) {
      return `${this.cBaseUrlIntegração}/${id}/updatequeue`
    },
    montarUrlIntegraçãoTicket (id) {
      return `${this.cBaseUrlIntegração}/${id}/showticket`
    },
    montarUrlIntegraçãoUrl (id) {
      return `${this.cBaseUrlIntegração}/${id}/url`
    },
    montarUrlIntegraçãoVoice (id) {
      return `${this.cBaseUrlIntegração}/${id}/voice`
    },
    copy (text) {
      copyToClipboard(text)
        .then(this.$notificarSucesso(this.$t('api.tokenCopied')))
        .catch()
    },
    async listarAPIs () {
      const { data } = await ListarAPIs()
      this.apis = data.apis
    },
    apiCriada (api) {
      const newApis = [...this.apis]
      newApis.push(api)
      this.apis = [...newApis]
    },
    apiEditada (api) {
      const newApis = [...this.apis]
      const idx = newApis.findIndex(f => f.id === api.id)
      if (idx > -1) {
        newApis[idx] = api
      }
      this.apis = [...newApis]
    },
    editarAPI (api) {
      this.apiEdicao = { ...api }
      this.modalApi = true
    },
    gerarNovoToken (api) {
      this.$q.dialog({
        title: this.$t('api.dialogDeleteTitle'),
        message: `${this.$t('api.dialogNewTokenMessage')}"${api.name}"?`,
        cancel: {
          label: this.$t('api.dialogCancel'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('api.dialogConfirm'),
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(async () => {
        try {
          const { data } = await NovoTokenAPI(api)
          this.apiEditada(data)
          this.$notificarSucesso(this.$t('api.tokenUpdated'))
        } catch (error) {
          this.$notificarErro(
            this.$t('api.tokenUpdateError'),
            error
          )
        }
      })
    },
    deletarApi (api) {
      this.$q.dialog({
        title: this.$t('api.dialogDeleteTitle'),
        message: `${this.$t('api.dialogDeleteMessage')}"${api.name}"?`,
        cancel: {
          label: this.$t('api.dialogCancel'),
          color: 'primary',
          push: true
        },
        ok: {
          label: this.$t('api.dialogConfirm') ,
          color: 'negative',
          push: true
        },
        persistent: true
      }).onOk(() => {
        this.loading = true
        ApagarAPI(api)
          .then(res => {
            let newApis = [...this.apis]
            newApis = newApis.filter(a => a.id !== api.id)
            this.apis = [...newApis]
            this.$notificarSucesso(`${api.name} ${this.$t('api.deleteSuccess')}`)
          })
          .catch(error => this.$notificarErro(`${this.$t('api.deleteError')} ${api.name}`, error))
        this.loading = false
      })
    }

  },
  mounted () {
    this.listarAPIs()
    this.userProfile = localStorage.getItem('profile')
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try {
        const parsed = JSON.parse(storedColors)
        list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : [])
      } catch (_) { list = [] }

      const colors = list.reduce((acc, colorObj = {}) => {
        const rawLabel =
          (typeof colorObj.label === 'string' && colorObj.label) ||
          (typeof colorObj.name === 'string' && colorObj.name) ||
          (typeof colorObj.key === 'string' && colorObj.key) ||
          ''

        if (!rawLabel) return acc
        const key = rawLabel.toLowerCase().trim()
        const value =
          colorObj.value ??
          (rawLabel in colorObj ? colorObj[rawLabel] : undefined) ??
          colorObj.hex ??
          colorObj.color ??
          null

        if (typeof value === 'string' && value) acc[key] = value
        return acc
      }, {})

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    // this.loadColors()
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .q-card-section {
    padding: 1.2rem 1.5rem;

    .text-h6 {
      color: var(--q-primary);
      font-weight: 600;
      font-size: 1.2rem;
      margin: 0;
    }
  }

  .q-separator {
    background: rgba(255, 255, 255, 0.1);
  }

  .scroll {
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(var(--q-primary-rgb), 0.3);
      border-radius: 4px;

      &:hover {
        background: rgba(var(--q-primary-rgb), 0.5);
      }
    }
  }
}

.q-item {
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  margin: 0.8rem 0;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .q-item__section {
    .text-h6 {
      color: var(--q-primary);
      font-weight: 600;
      font-size: 1.1rem;
    }

    .text-weight-medium {
      color: var(--q-primary);
      opacity: 0.9;
      font-size: 0.9rem;
      line-height: 1.5;

      .text-bold {
        font-weight: 600;
      }
    }
  }
}

.q-tooltip {
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  font-size: 0.85rem;
  padding: 0.5rem 0.8rem;
}

.blur-effect {
  filter: blur(0px);
  transition: all 0.3s ease;
}

.item-label {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  &:last-child {
    border-bottom: none;
  }
}

/* Modo Escuro */
body.body--dark {
  .q-card {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);

    .scroll {
      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);

        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }

  .q-item {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .item-label {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .q-card {
    margin: 0.25rem;
    border-radius: 12px;

    .q-card-section {
      padding: 0.75rem;

      .text-h6 {
        font-size: 1rem;
        line-height: 1.3;
      }
    }
  }

  .q-item {
    margin: 0.4rem 0;
    padding: 0.6rem;
    border-radius: 8px;

    .q-item__section {
      .text-h6 {
        font-size: 0.9rem;
        line-height: 1.2;
      }

      .text-weight-medium {
        font-size: 0.8rem;
        line-height: 1.4;
      }

      .text-caption {
        font-size: 0.7rem;
        line-height: 1.3;
      }
    }
  }

  .q-btn {
    min-height: 32px;
    min-width: 32px;
  }

  .q-tooltip {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }
}

/* Ajustes específicos para telas muito pequenas */
@media (max-width: 400px) {
  .q-card {
    margin: 0.1rem;
    
    .q-card-section {
      padding: 0.5rem;
    }
  }

  .q-item {
    margin: 0.3rem 0;
    padding: 0.5rem;

    .q-item__section {
      .text-h6 {
        font-size: 0.85rem;
      }

      .text-weight-medium {
        font-size: 0.75rem;
      }

      .text-caption {
        font-size: 0.65rem;
      }
    }
  }
}
</style>
