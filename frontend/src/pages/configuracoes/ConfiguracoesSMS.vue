<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">

      <q-item tag="label" v-ripple @click="abrirLink">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesSMS.comteleAccount') }}</q-item-label>
          <q-item-label caption>{{ montarUrlIntegração() }}</q-item-label>
        </q-item-section>
        <q-tooltip content-class="bg-negative text-bold">
          {{ $t('configuracoesSMS.comteleTooltip') }}
        </q-tooltip>
      </q-item>

      <div class="row q-px-md">
        <div class="col-12" style="margin-top: 20px;">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="smsToken"
            :type="showSmsToken ? 'text' : 'password'"
            dense
            outlined
            :label="$t('configuracoesSMS.comteleTokenLabel')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="alterarSMSToken()"
          >
            <template v-slot:append>
              <q-icon
                :name="showSmsToken ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showSmsToken = !showSmsToken"
              />
            </template>
          </q-input>
        </div>
      </div>

      <q-item tag="label" v-ripple @click="abrirLink2">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesSMS.conectaAccount') }}</q-item-label>
          <q-item-label caption>{{ montarUrlIntegração2() }}</q-item-label>
        </q-item-section>
        <q-tooltip content-class="bg-negative text-bold">
          {{ $t('configuracoesSMS.conectaTooltip') }}
        </q-tooltip>
      </q-item>

      <div class="row q-px-md">
        <div class="col-12" style="margin-top: 20px;">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="conectaSmsToken"
            :type="showConectaSmsToken ? 'text' : 'password'"
            dense
            outlined
            :label="$t('configuracoesSMS.conectaTokenLabel')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="alterarConectaSMSToken()"
          >
            <template v-slot:append>
              <q-icon
                :name="showConectaSmsToken ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showConectaSmsToken = !showConectaSmsToken"
              />
            </template>
          </q-input>
        </div>
      </div>

      <q-item tag="label" v-ripple @click="abrirLink3">
        <q-item-section>
          <q-item-label>{{ $t('configuracoesSMS.livsonAccount') }}</q-item-label>
          <q-item-label caption>{{ montarUrlIntegração3() }}</q-item-label>
        </q-item-section>
        <q-tooltip content-class="bg-negative text-bold">
          {{ $t('configuracoesSMS.livsonTooltip') }}
        </q-tooltip>
      </q-item>

      <div class="row q-px-md">
        <div class="col-12" style="margin-top: 20px;">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="livsonSmsToken"
            :type="showLivsonSmsToken ? 'text' : 'password'"
            dense
            outlined
            :label="$t('configuracoesSMS.livsonTokenLabel')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="alterarLivsonSMSToken()"
          >
            <template v-slot:append>
              <q-icon
                :name="showLivsonSmsToken ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showLivsonSmsToken = !showLivsonSmsToken"
              />
            </template>
          </q-input>
        </div>
      </div>

    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId, AlterarTenantSMSToken, AlterarTenantConectaSMSToken, AlterarTenantLivsonSMSToken } from 'src/service/tenants.js'
import { defineComponent } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      usuario,
      smsToken: '',
      conectaSmsToken: '',
      livsonSmsToken: '',
      webhookChecked: '',
      loading: false,
      userProfile: 'user',
      showSmsToken: false,
      showConectaSmsToken: false,
      showLivsonSmsToken: false
    }
  },
  computed: {
    cBaseUrlIntegração () {
      return `https://sms.comtele.com.br/account/apiconfig`
    },
    cBaseUrlIntegração2 () {
      return `https://dashboard.conectastartup.com.br/user/api`
    },
    cBaseUrlIntegração3 () {
      return `https://bhi.com.br`
    }
  },
  methods: {
    abrirLink2() {
      window.open('https://dashboard.conectastartup.com.br/application/login', '_blank');
    },
    abrirLink3() {
      window.open('https://livison.com', '_blank');
    },
    abrirLink() {
      window.open('https://sms.comtele.com.br', '_blank');
    },
    formatarDataBrasil(data) {
      const dataObjeto = new Date(data);
      return format(dataObjeto, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
    },
    montarUrlIntegração() {
      return `${this.cBaseUrlIntegração}/${this.usuario.tenantId}`
    },
    montarUrlIntegração2() {
      return `${this.cBaseUrlIntegração2}/${this.usuario.tenantId}`
    },
    montarUrlIntegração3() {
      return `${this.cBaseUrlIntegração3}`
    },
    formatarData(data) {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR');
    },
    async alterarConectaSMSToken(){
      try {
        await AlterarTenantConectaSMSToken({
          id: this.usuario.tenantId,
          conectaSmsToken: this.conectaSmsToken,
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
    async alterarLivsonSMSToken(){
      try {
        await AlterarTenantLivsonSMSToken({
          id: this.usuario.tenantId,
          livsonSmsToken: this.livsonSmsToken,
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
    async alterarSMSToken(){
      try {
        await AlterarTenantSMSToken({
          id: this.usuario.tenantId,
          smsToken: this.smsToken,
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
      this.smsToken = data[0].smsToken
      this.conectaSmsToken = data[0].conectaSmsToken
      this.livsonSmsToken = data[0].livsonSmsToken
      this.webhookChecked = data[0].webhookChecked
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
