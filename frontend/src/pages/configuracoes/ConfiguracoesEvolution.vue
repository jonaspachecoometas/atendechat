<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">
      <q-item tag="label" v-ripple @click="abrirLink">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesEvolution.labels.installApi') }}</q-item-label>
          <q-item-label caption> {{ $t('configuracoesEvolution.labels.apiIntegrationUrl') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesEvolution.labels.warningEvo') }}</q-item-label>
        </q-item-section>
        <q-tooltip content-class="bg-negative text-bold">
          API Evolution 
        </q-tooltip>
      </q-item>

      <div class="row q-px-md">
        <div class="col-12" style="margin-top: 20px;">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="evoHost"
            dense
            outlined
            :label="$t('configuracoesEvolution.labels.apiUrl')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="alterarEvolutionHost"
          />
        </div>
        <div class="col-12" style="margin-top: 20px;">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="evoToken"
            :type="showEvoToken ? 'text' : 'password'"
            dense
            outlined
            :label="$t('configuracoesEvolution.labels.globalKey')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="alterarEvolutionHost"
          >
            <template v-slot:append>
              <q-icon
                :name="showEvoToken ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showEvoToken = !showEvoToken"
              />
            </template>
          </q-input>
        </div>
        <div v-if="evoHost" class="col-12" style="margin-top: 20px;">
          <q-btn
            color="primary"
            :label="$t('configuracoesEvolution.labels.checkApiStatus')"
            @click="abrirApiHost"
            class="full-width"
          />
        </div>
      </div>
    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId, AlterarTenantEvolutionHost } from 'src/service/tenants.js'
import { defineComponent } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      usuario,
      evoHost: '',
      evoToken: '',
      loading: false,
      userProfile: 'user',
      iframeUrl: '',
      showEvoToken: false
    }
  },
  computed: {
    cBaseUrlIntegração () {
      return this.$t('configuracoesEvolution.labels.apiIntegrationUrl');
    }
  },
  methods: {
    abrirLink() {
      window.open(this.cBaseUrlIntegração, '_blank');
    },
    abrirApiHost() {
      if (this.evoHost) {
        const url = this.montarUrlAPI();
        window.open(url, '_blank');
      } else {
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesEvolution.notifications.invalidUrl'),
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
      return `${this.evoHost}/manager`
    },
    formatarData(data) {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR');
    },
    async alterarEvolutionHost(){
      try {
        await AlterarTenantEvolutionHost({
          id: this.usuario.tenantId,
          evoHost: this.evoHost,
          evoToken: this.evoToken,
        });
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracoesEvolution.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        });
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('Erro ao alterar configuração:', error);
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracoesEvolution.notifications.error'),
          });
        }
      } 
    },
    async listarTenantPorId(){
      try {
        this.loading = true; 
        const { data } = await ListarTenantPorId(this.usuario.tenantId);
        this.evoHost = data[0]?.evoHost || '';
        this.evoToken = data[0]?.evoToken || '';
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('Erro ao listar dados do Tenant:', error);
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracoesEvolution.notifications.loadError'),
          });
        }
      } finally {
        this.loading = false;
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
