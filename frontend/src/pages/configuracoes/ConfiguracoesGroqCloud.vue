<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">
      <q-item tag="label" v-ripple @click="abrirLink">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesgroqCloud.labels.installApi') }}</q-item-label>
          <q-item-label caption> {{ $t('configuracoesgroqCloud.labels.apiIntegrationUrl') }}</q-item-label>
        </q-item-section>
        <q-tooltip content-class="bg-negative text-bold">
          Groq Cloud API
        </q-tooltip>
      </q-item>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesgroqCloud.labels.enableGroqCloud') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesgroqCloud.labels.enableGroqCloudDescription') }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-toggle
            v-model="groqCloud"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="groqCloud === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('groqCloud')"
          />
        </q-item-section>
      </q-item>

      <div class="row q-px-md">
        <div class="col-12" style="margin-top: 20px;">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="groqCloudApiKey"
            :type="showGroqCloudApiKey ? 'text' : 'password'"
            dense
            outlined
            :label="$t('configuracoesgroqCloud.labels.apiKey')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="atualizarConfiguracao('groqCloudApiKey')"
          >
            <template v-slot:append>
              <q-icon
                :name="showGroqCloudApiKey ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showGroqCloudApiKey = !showGroqCloudApiKey"
              />
            </template>
          </q-input>
        </div>
        <div class="col-12" style="margin-top: 20px;">
          <q-select
            class="blur-effect"
            v-model="groqCloudLanguage"
            :options="languageOptions"
            dense
            outlined
            :label="$t('configuracoesgroqCloud.labels.language')"
            debounce="700"
            @update:model-value="atualizarConfiguracao('groqCloudLanguage')"
          />
        </div>
        <div class="col-12" style="margin-top: 20px;">
          <q-select
            class="blur-effect"
            v-model="groqCloudModel"
            :options="modelOptions"
            dense
            outlined
            :label="$t('configuracoesgroqCloud.labels.model')"
            debounce="700"
            @update:model-value="atualizarConfiguracao('groqCloudModel')"
          />
        </div>
      </div>
    </q-list>
  </div>
</template>

<script>
import { AlterarTenantGroqCloud, ListarTenantPorId } from 'src/service/tenants.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfiguracoesgroqCloud',
  data() {
    return {
      userProfile: 'user',
      groqCloud: 'disabled',
      groqCloudApiKey: '',
      groqCloudLanguage: '',
      groqCloudModel: '',
      loading: false,
      languageOptions: [
        'mt', 'as', 'tr', 'uk', 'bg', 'sr', 'haw', 'pl', 'he', 'no', 'br', 'is', 'mr', 'sa', 'ar', 'hi', 'mi', 'kn', 'sq', 'yue', 'cy', 'am', 'uz', 'jv', 'de', 'ru', 'id', 'ur', 'hr', 'sk', 'ba', 'cs', 'la', 'eu', 'gu', 'ht', 'bo', 'es', 'ca', 'bs', 'pa', 'my', 'mg', 'tt', 'it', 'fi', 'ro', 'da', 'bn', 'km', 'lb', 'vi', 'el', 'hu', 'th', 'mk', 'hy', 'yo', 'af', 'sv', 'fa', 'az', 'ne', 'sd', 'su', 'zh', 'lt', 'ml', 'ka', 'ps', 'tk', 'en', 'nl', 'be', 'lo', 'ms', 'te', 'lv', 'kk', 'gl', 'tg', 'yi', 'tl', 'ja', 'pt', 'ta', 'nn', 'ln', 'ha', 'fr', 'et', 'sw', 'si', 'so', 'oc', 'ko', 'sl', 'mn', 'sn', 'fo'
      ],
      modelOptions: ['whisper-large-v3'],
      showGroqCloudApiKey: false
    }
  },
  computed: {
    cBaseUrlIntegração () {
      return this.$t('configuracoesgroqCloud.labels.apiIntegrationUrl');
    }
  },
  methods: {
    abrirLink() {
      window.open(this.cBaseUrlIntegração, '_blank');
    },
    async listarTenantPorId() {
      try {
        this.loading = true;
        const { data } = await ListarTenantPorId(this.usuario.tenantId);
        this.groqCloud = data[0]?.groqCloud || 'disabled';
        this.groqCloudApiKey = data[0]?.groqCloudApiKey || '';
        this.groqCloudLanguage = data[0]?.groqCloudLanguage || '';
        this.groqCloudModel = data[0]?.groqCloudModel || '';
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('Erro ao listar dados do Tenant:', error);
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracoesgroqCloud.notifications.loadError'),
          });
        }
      } finally {
        this.loading = false;
      }
    },
    async atualizarConfiguracao(key) {
      try {
        await AlterarTenantGroqCloud({
          id: this.usuario.tenantId,
          groqCloud: this.groqCloud,
          groqCloudApiKey: this.groqCloudApiKey,
          groqCloudLanguage: this.groqCloudLanguage,
          groqCloudModel: this.groqCloudModel
        });
        this.$q.notify({
          type: 'positive',
          message: this.$t('configuracoesgroqCloud.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        });
      } catch (error) {
        // Silenciar erros de timeout - não mostrar no console
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('Erro ao alterar configuração:', error);
          this.$q.notify({
            type: 'negative',
            message: this.$t('configuracoesgroqCloud.notifications.error'),
          });
        }
      }
    }
  },
  async mounted() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    await this.listarTenantPorId();
    this.userProfile = localStorage.getItem('profile');
  }
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

.q-input, .q-select {
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
  .q-input, .q-select {
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