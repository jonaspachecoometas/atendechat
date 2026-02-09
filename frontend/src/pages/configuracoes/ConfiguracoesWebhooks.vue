<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesWebhook.enableWebhook') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesWebhook.enableWebhookCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="webhook"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="webhook === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('webhook')"
          />
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="webhook === 'enabled'">
        <div class="col-12">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="webhookUrl"
            dense
            outlined
            :label="$t('configuracoesWebhook.webhookUrlLabel')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="atualizarConfiguracao('webhookUrl')"
          />
        </div>
      </div>

      <q-item tag="label" v-ripple v-if="webhook === 'enabled'">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesWebhook.webhookMessage') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesWebhook.enableWebhookCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="webhookMessage"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="webhookMessage === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('webhookMessage')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple v-if="webhook === 'enabled'">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesWebhook.webhookCreateChannel') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesWebhook.enableWebhookCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="webhookCreateChannel"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="webhookCreateChannel === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('webhookCreateChannel')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple v-if="webhook === 'enabled'">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesWebhook.webhookUpdateChannel') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesWebhook.enableWebhookCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="webhookUpdateChannel"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="webhookUpdateChannel === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('webhookUpdateChannel')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple v-if="webhook === 'enabled'">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesWebhook.webhookCreateUser') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesWebhook.enableWebhookCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="webhookCreateUser"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="webhookCreateUser === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('webhookCreateUser')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple v-if="webhook === 'enabled'">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesWebhook.webhookUpdateUser') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesWebhook.enableWebhookCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="webhookUpdateUser"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="webhookUpdateUser === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('webhookUpdateUser')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple v-if="webhook === 'enabled'">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesWebhook.webhookCreateApi') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesWebhook.enableWebhookCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="webhookCreateApi"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="webhookCreateApi === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('webhookCreateApi')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple v-if="webhook === 'enabled'">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesWebhook.webhookUpdateApi') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesWebhook.enableWebhookCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="webhookUpdateApi"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="webhookUpdateApi === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('webhookUpdateApi')"
          />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple v-if="webhook === 'enabled'">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesWebhook.webhookRenewApi') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesWebhook.enableWebhookCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="webhookRenewApi"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="webhookRenewApi === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('webhookRenewApi')"
          />
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>
import { AlterarConfiguracao, ListarConfiguracoes } from 'src/service/configuracoes.js'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      userProfile: 'user',
      configuracoes: [],
      webhook: null,
      webhookUrl: '',
      webhookMessage: '',
      webhookCreateChannel: '',
      webhookUpdateChannel: '',
      webhookCreateUser: '',
      webhookUpdateUser: '',
      webhookCreateApi: '',
      webhookUpdateApi: '',
      webhookRenewApi: ''
    }
  },
  methods: {
    async listarConfiguracoes() {
      const { data } = await ListarConfiguracoes()
      this.configuracoes = data
      this.configuracoes.forEach((el) => {
        let value = el.value
        this.$data[el.key] = value
      })
    },
    async atualizarConfiguracao(key) {
      const params = { key, value: this.$data[key] }
      try {
        await AlterarConfiguracao(params)
        
        // Se o webhook principal for desativado, desativa todas as outras opções
        if (key === 'webhook' && this.$data[key] === 'disabled') {
          const opcoesParaDesativar = [
            'webhookMessage',
            'webhookCreateChannel',
            'webhookUpdateChannel',
            'webhookCreateUser',
            'webhookUpdateUser',
            'webhookCreateApi',
            'webhookUpdateApi',
            'webhookRenewApi'
          ]
          
          for (const opcao of opcoesParaDesativar) {
            this.$data[opcao] = 'disabled'
            await AlterarConfiguracao({ key: opcao, value: 'disabled' })
          }
        }

        this.$q.notify({
          type: 'positive',
          message: 'Configuração alterada!',
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$data[key] = this.$data[key] === 'enabled' ? 'disabled' : 'enabled'
        this.$notificarErro('Ocorreu um erro!', error)
      }
    },
  },
  async mounted() {
    await this.listarConfiguracoes()
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
