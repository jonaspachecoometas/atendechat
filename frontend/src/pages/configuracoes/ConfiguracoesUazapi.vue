<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">
      <q-item tag="label" v-ripple @click="abrirLink">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesUazapi.installApiLabel') }}</q-item-label>
          <q-item-label caption>{{ montarUrlIntegração() }}</q-item-label>
        </q-item-section>
        <q-tooltip content-class="bg-negative text-bold">
          {{ $t('configuracoesUazapi.installApiTooltip') }}
        </q-tooltip>
      </q-item>

      <div class="row q-px-md">
        <div class="col-12" style="margin-top: 20px;">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="uazapiHost"
            dense
            outlined
            :label="$t('configuracoesUazapi.apiUrlLabel')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="alterarUazapiHost()"
          />
        </div>
        <div class="col-12" style="margin-top: 20px;">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="uazapiToken"
            :type="showUazapiToken ? 'text' : 'password'"
            dense
            outlined
            :label="$t('configuracoesUazapi.globalKeyLabel')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="alterarUazapiHost()"
          >
            <template v-slot:append>
              <q-icon
                :name="showUazapiToken ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showUazapiToken = !showUazapiToken"
              />
            </template>
          </q-input>
        </div>
        <!-- <div v-if="uazapiHost" class="col-12" style="margin-top: 20px;">
          <q-btn
            color="primary"
            :label="$t('configuracoesUazapi.checkApiStatus')"
            @click="abrirApiHost"
            class="full-width"
          />
        </div> -->
      </div>
    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId, AlterarTenantUazapiHost } from 'src/service/tenants.js'
import { defineComponent } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default defineComponent({
  name: 'IndexConfiguracoesUazapi',
  data() {
    return {
      usuario,
      uazapiHost: '',
      uazapiToken: '',
      loading: false,
      userProfile: 'user',
      iframeUrl: '',
      showUazapiToken: false
    }
  },
  computed: {
    cBaseUrlIntegração () {
      return `https://uazapi.dev`
    }
  },
  methods: {
    abrirLink() {
      window.open('https://uazapi.dev', '_blank');
    },
    abrirApiHost() {
      if (this.uazapiHost) {
        const url = this.montarUrlAPI();
        window.open(url, '_blank');
      } else {
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesUazapi.invalidUrlMessage'),
        });
      }
    },
    formatarDataBrasil(data) {
      const dataObjeto = new Date(data);
      return format(dataObjeto, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
    },
    montarUrlIntegração() {
      return `${this.cBaseUrlIntegração}`
    },
    montarUrlAPI() {
      return `${this.uazapiHost}/api/#/`
    },
    formatarData(data) {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR');
    },
    async alterarUazapiHost(){
      try {
        await AlterarTenantUazapiHost({
          id: this.usuario.tenantId,
          uazapiHost: this.uazapiHost,
          uazapiToken: this.uazapiToken,
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
      try {
        this.loading = true; 
        const { data } = await ListarTenantPorId(this.usuario.tenantId)
        this.uazapiHost = data[0]?.uazapiHost || ''
        this.uazapiToken = data[0]?.uazapiToken || ''
      } catch (error) {
        console.error('Erro ao listar dados do Tenant:', error)
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesUazapi.loadError'),
        })
      } finally {
        this.loading = false
      }
    },
  },
  async mounted() {
    await this.listarTenantPorId()
    this.userProfile = localStorage.getItem('profile')
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
