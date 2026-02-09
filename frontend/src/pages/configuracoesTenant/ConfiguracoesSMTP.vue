<template>
  <div v-if="userProfile === 'superadmin'">
    <q-list class="text-weight-medium">
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracaoTenantSmtp.enableSmtp') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracaoTenantSmtp.enableSmtpCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="smtp"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="smtp === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('smtp')"
          />
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="smtp === 'enabled'">
        <div class="col-12">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="emailHost"
            dense
            outlined
            :label="$t('configuracaoTenantSmtp.emailHost')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="atualizarConfiguracao('emailHost')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="smtp === 'enabled'">
        <div class="col-12">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="emailPort"
            type="number"
            dense
            outlined
            :label="$t('configuracaoTenantSmtp.emailPort')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="atualizarConfiguracao('emailPort')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="smtp === 'enabled'">
        <div class="col-12">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="emailUser"
            dense
            outlined
            :label="$t('configuracaoTenantSmtp.emailUser')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="atualizarConfiguracao('emailUser')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="smtp === 'enabled'">
        <div class="col-12">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="emailPass"
            :type="showPassword ? 'text' : 'password'"
            dense
            outlined
            :label="$t('configuracaoTenantSmtp.emailPass')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="atualizarConfiguracao('emailPass')"
          >
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </div>
      </div>

      <q-item tag="label" v-ripple v-if="smtp === 'enabled'">
        <q-item-section>
          <q-item-label>{{ $t('configuracaoTenantSmtp.secureProtocol') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracaoTenantSmtp.secureProtocolCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="emailSecure"
            false-value="false"
            true-value="true"
            checked-icon="check"
            keep-color
            :color="emailSecure === 'true' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="atualizarConfiguracao('emailSecure')"
          />
        </q-item-section>
      </q-item>

      <q-item v-if="smtp === 'enabled'">
        <q-item-section>
          <q-btn
            color="primary"
            icon="send"
            :label="$t('configuracoesSMTP.enviarTeste')"
            @click="abrirModalTeste"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Modal de Teste de Email -->
    <q-dialog v-model="modalTeste" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ $t('configuracoesSMTP.testeEmail') }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="emailTeste"
            :label="$t('configuracoesSMTP.emailDestino')"
            type="email"
            outlined
            dense
            :rules="[val => !!val || $t('configuracoesSMTP.emailObrigatorio')]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('common.cancel')" color="negative" v-close-popup />
          <q-btn flat :label="$t('common.send')" color="primary" @click="enviarEmailTeste" :loading="loading" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { AlterarConfiguracao, ListarConfiguracoes } from 'src/service/configuracoes.js'
import { EnviarEmail } from 'src/service/email.js'

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      userProfile: 'user',
      configuracoes: [],
      smtp: null,
      emailHost: '',
      emailPort: '',
      emailSecure: '',
      emailUser: '',
      emailPass: '',
      showPassword: false,
      modalTeste: false,
      emailTeste: '',
      loading: false
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
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        console.error('error - AlterarConfiguracao', error)
        this.$data[key] = this.$data[key] === 'enabled' ? 'disabled' : 'enabled'
        this.$notificarErro(this.$t('common.notifications.error'), error)
      }
    },
    abrirModalTeste() {
      this.modalTeste = true
      this.emailTeste = ''
    },
    async enviarEmailTeste() {
      if (!this.emailTeste) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesSMTP.emailObrigatorio'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
        return
      }

      this.loading = true
      try {
        const dadosEmail = {
          to: this.emailTeste,
          from: this.emailUser,
          subject: this.$t('configuracoesSMTP.assuntoTeste'),
          text: this.$t('configuracoesSMTP.mensagemTeste'),
          host: this.emailHost,
          port: this.emailPort,
          secure: this.emailSecure,
          user: this.emailUser,
          pass: this.emailPass
        }

        const response = await EnviarEmail(dadosEmail)

        if (!response.data || response.data.success !== true) {
          throw {
            response: {
              data: response.data || {
                error: 'Erro desconhecido ao enviar email',
                details: 'Não foi possível determinar o erro'
              }
            }
          }
        }

        this.$q.notify({
          type: 'positive',
          message: response.data.message,
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
        this.modalTeste = false
      } catch (error) {
        console.error('Erro ao enviar email de teste:', error)
        let mensagemErro = this.$t('configuracoesSMTP.erroEnvioTeste')
        let detalhes = ''
        
        if (error.response?.data) {
          const data = error.response.data
          mensagemErro = data.error || mensagemErro
          
          if (data.details) {
            if (typeof data.details === 'object') {
              if (data.details.suggestion) {
                detalhes = data.details.suggestion
              } else {
                detalhes = Object.entries(data.details)
                  .filter(([key]) => key !== 'smtp')
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ')
              }
            } else {
              detalhes = data.details
            }
          }
        }
        
        this.$q.notify({
          type: 'negative',
          message: detalhes ? `${mensagemErro} - ${detalhes}` : mensagemErro,
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
          timeout: 5000
        })
      } finally {
        this.loading = false
      }
    }
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
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  .q-item {
    border-radius: 8px;
    transition: all 0.3s ease;
    margin-bottom: 16px;

    &:hover {
      background: rgba(0, 0, 0, 0.04);
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

  .q-input,
  .q-select {
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
}

/* Modo Escuro */
body.body--dark {
  .q-list {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);

    .q-item {
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .q-input,
    .q-select {
      .q-field__control {
        background: rgba(255, 255, 255, 0.05);

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        &.q-field--focused {
          background: rgba(255, 255, 255, 0.15);
        }
      }
    }
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .q-list {
    padding: 12px;
    border-radius: 12px;

    .q-item {
      margin-bottom: 12px;
    }
    .row.q-px-md {
      margin-bottom: 14px;
    }
  }
}
</style>

<style lang="sass">
.blur-effect 
  filter: blur(0px)
</style>

<style lang="scss">
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
