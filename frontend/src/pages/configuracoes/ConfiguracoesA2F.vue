<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>{{ $t('configuracoesA2F.enableA2F') }}</q-item-label>
          <q-item-label caption>{{ $t('configuracoesA2F.enableA2FCaption') }}</q-item-label>
        </q-item-section>

        <q-item-section avatar>
          <q-toggle
            v-model="a2f"
            false-value="disabled"
            true-value="enabled"
            checked-icon="check"
            keep-color
            :color="a2f === 'enabled' ? 'green' : 'negative'"
            size="md"
            unchecked-icon="clear"
            @update:model-value="alterarTenantA2F('a2f')"
          />
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="a2f === 'enabled'">
        <div class="col-12">
          <q-select
            v-model="a2fChannel"
            :options="channelOptions"
            option-value="value"
            option-label="label"
            emit-value
            map-options
            outlined
            dense
            :label="$t('configuracoesA2F.channelLabel')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="alterarTenantA2F('a2fChannel')"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="a2f === 'enabled' && a2fChannel === 'whatsapp'">
        <div class="col-12">
          <q-select
            v-model="a2fWhatsappId"
            :options="whatsappOptions"
            option-value="value"
            option-label="label"
            emit-value
            map-options
            outlined
            dense
            :label="$t('configuracoesA2F.whatsappLabel')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="onWhatsappChange"
          />
        </div>
      </div>

      <div class="row q-px-md" v-if="a2f === 'enabled' && a2fChannel === 'whatsapp' && selectedWhatsappType === 'waba'">
        <div class="col-12">
          <q-select
            v-model="a2fWabaTemplateId"
            :options="wabaTemplateOptions"
            option-value="value"
            option-label="label"
            emit-value
            map-options
            outlined
            dense
            :label="$t('configuracoesA2F.wabaTemplateLabel')"
            :loading="loadingTemplates"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="alterarTenantA2F('a2fWabaTemplateId')"
          />
        </div>
      </div>

      <!-- Aviso quando WABA está selecionado -->
      <q-item v-if="a2f === 'enabled' && a2fChannel === 'whatsapp' && selectedWhatsappType === 'waba'" class="q-px-md">
        <q-item-section>
          <q-item-label caption class="text-warning">
            <q-icon name="info" class="q-mr-xs" />
            {{ $t('configuracoesA2F.wabaMessageWarning') }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <!-- Aviso quando Email está selecionado -->
      <q-item v-if="a2f === 'enabled' && a2fChannel === 'email'" class="q-px-md">
        <q-item-section>
          <q-item-label caption :class="smtpConfigured ? 'text-info' : 'text-warning'">
            <q-icon name="info" class="q-mr-xs" />
            {{ smtpConfigured ? $t('configuracoesA2F.emailSmtpConfigured') : $t('configuracoesA2F.emailSmtpNotConfigured') }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <!-- Seleção de provedor SMS -->
      <div class="row q-px-md" v-if="a2f === 'enabled' && a2fChannel === 'sms'">
        <div class="col-12">
          <q-select
            v-model="a2fSmsProvider"
            :options="smsProviderOptions"
            option-value="value"
            option-label="label"
            emit-value
            map-options
            outlined
            dense
            :label="$t('configuracoesA2F.smsProviderLabel')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="alterarTenantA2F('a2fSmsProvider')"
          />
        </div>
      </div>

      <!-- Aviso quando SMS está selecionado -->
      <q-item v-if="a2f === 'enabled' && a2fChannel === 'sms'" class="q-px-md">
        <q-item-section>
          <q-item-label caption class="text-info">
            <q-icon name="info" class="q-mr-xs" />
            {{ $t('configuracoesA2F.smsInfo') }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <div class="row q-px-md" v-if="a2f === 'enabled'">
        <div class="col-12">
          <q-input
            v-model="a2fMessage"
            type="textarea"
            autogrow
            dense
            outlined
            :label="$t('configuracoesA2F.messageLabel')"
            :hint="$t('configuracoesA2F.messageHint')"
            :disable="a2fChannel === 'whatsapp' && selectedWhatsappType === 'waba'"
            input-style="min-height: 80px; max-height: 120px;"
            debounce="700"
            @update:model-value="alterarTenantA2F('a2fMessage')"
          />
        </div>
      </div>

      <q-item v-if="a2f === 'enabled'">
        <q-item-section>
          <q-item-label caption class="text-grey-7">
            {{ $t('configuracoesA2F.infoText') }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId, AlterarTenantA2F } from 'src/service/tenants.js'
import { ListarWhatsapps } from 'src/service/sessoesWhatsapp.js'
import { BuscarTemplates } from 'src/service/waba.js'
import { ListarConfiguracoes } from 'src/service/configuracoes.js'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ConfiguracoesA2F',
  data() {
    return {
      usuario,
      userProfile: 'user',
      a2f: null,
      a2fChannel: null,
      a2fWhatsappId: null,
      a2fWabaTemplateId: null,
      a2fMessage: '',
      whatsappOptions: [],
      wabaTemplateOptions: [],
      selectedWhatsappType: null,
      loadingTemplates: false,
      smtpConfigured: false,
      channelOptions: [
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'email', label: 'Email' },
        { value: 'sms', label: 'SMS' }
      ],
      smsProviderOptions: [
        { value: 'comtele', label: 'Comtele' },
        { value: 'conecta', label: 'Conecta' },
        { value: 'livson', label: 'BHI' }
      ],
      a2fSmsProvider: null
    }
  },
  methods: {
    async alterarTenantA2F(key) {
      try {
        // Se estiver alterando o canal, limpar campos específicos
        if (key === 'a2fChannel') {
          if (this.a2fChannel !== 'whatsapp') {
            this.a2fWhatsappId = null
            this.a2fWabaTemplateId = null
            this.selectedWhatsappType = null
          }
          if (this.a2fChannel !== 'sms') {
            this.a2fSmsProvider = null
          }
        }
        
        // Se estiver alterando para email, verificar configuração SMTP
        if (key === 'a2fChannel' && this.a2fChannel === 'email') {
          await this.checkSmtpConfiguration()
        }
        
        await AlterarTenantA2F({
          id: this.usuario.tenantId,
          a2f: this.a2f,
          a2fChannel: this.a2fChannel,
          a2fWhatsappId: this.a2fChannel === 'whatsapp' ? this.a2fWhatsappId : null,
          a2fWabaTemplateId: this.a2fWabaTemplateId,
          a2fSmsProvider: this.a2fChannel === 'sms' ? this.a2fSmsProvider : null,
          a2fMessage: this.a2fMessage
        })
        this.$q.notify({
          type: 'positive',
          message: this.$t('common.notifications.success'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } catch (error) {
        if (error?.code !== 'ECONNABORTED' && !error?.message?.includes('timeout')) {
          console.error('error - AlterarTenantA2F', error)
          this.$notificarErro(this.$t('common.notifications.error'), error)
        }
      }
    },
    async listarTenantPorId() {
      const { data } = await ListarTenantPorId(this.usuario.tenantId)
      this.a2f = data[0].a2f || 'disabled'
      this.a2fChannel = data[0].a2fChannel
      this.a2fWhatsappId = data[0].a2fWhatsappId || null
      this.a2fWabaTemplateId = data[0].a2fWabaTemplateId || null
      this.a2fSmsProvider = data[0].a2fSmsProvider || null
      this.a2fMessage = data[0].a2fMessage || 'Seu código de autenticação de dois fatores é: {code}'
      
      // Se tiver WhatsApp selecionado, verificar o tipo
      if (this.a2fWhatsappId) {
        await this.checkWhatsappType()
      }
      
      // Se o canal for email, verificar configuração SMTP
      if (this.a2fChannel === 'email') {
        await this.checkSmtpConfiguration()
      }
    },
    async checkSmtpConfiguration() {
      try {
        const { data } = await ListarConfiguracoes()
        const smtpSetting = data.find(s => s.key === 'smtp')
        const emailHostSetting = data.find(s => s.key === 'emailHost')
        const emailPortSetting = data.find(s => s.key === 'emailPort')
        const emailUserSetting = data.find(s => s.key === 'emailUser')
        const emailPassSetting = data.find(s => s.key === 'emailPass')
        
        // Verificar se SMTP está habilitado e se todas as configurações necessárias estão presentes
        this.smtpConfigured = smtpSetting?.value === 'enabled' && 
                             emailHostSetting?.value && 
                             emailPortSetting?.value && 
                             emailUserSetting?.value && 
                             emailPassSetting?.value
      } catch (error) {
        console.error('Erro ao verificar configuração SMTP:', error)
        this.smtpConfigured = false
      }
    },
    async listarWhatsapps() {
      try {
        const { data } = await ListarWhatsapps()
        // Filtrar apenas conexões WhatsApp ativas e conectadas (whatsapp, baileys, evo, meow, uazapi, zapi, waba)
        const whatsappTypes = ['whatsapp', 'baileys', 'evo', 'meow', 'uazapi', 'zapi', 'waba']
        const filtered = data.filter(w => 
          whatsappTypes.includes(w.type) && 
          w.isActive && 
          w.status === 'CONNECTED'
        )
        
        this.whatsappOptions = filtered.map(w => ({
          value: w.id,
          label: `${w.name} (${w.type})`,
          type: w.type,
          tokenAPI: w.tokenAPI
        }))
      } catch (error) {
        console.error('Erro ao listar WhatsApps:', error)
        this.whatsappOptions = []
      }
    },
    async onWhatsappChange() {
      await this.alterarTenantA2F('a2fWhatsappId')
      await this.checkWhatsappType()
    },
    async checkWhatsappType() {
      if (!this.a2fWhatsappId) {
        this.selectedWhatsappType = null
        this.a2fWabaTemplateId = null
        this.wabaTemplateOptions = []
        return
      }

      const selectedWhatsapp = this.whatsappOptions.find(w => w.value === this.a2fWhatsappId)
      if (selectedWhatsapp && selectedWhatsapp.type === 'waba') {
        this.selectedWhatsappType = 'waba'
        await this.listarWabaTemplates(selectedWhatsapp.tokenAPI)
      } else {
        this.selectedWhatsappType = null
        this.a2fWabaTemplateId = null
        this.wabaTemplateOptions = []
      }
    },
    async listarWabaTemplates(tokenAPI) {
      if (!tokenAPI) {
        this.wabaTemplateOptions = []
        return
      }

      this.loadingTemplates = true
      try {
        const { data } = await BuscarTemplates(tokenAPI)
        
        // Filtrar apenas templates do tipo AUTHENTICATION e com status APPROVED
        const authTemplates = (data.data || []).filter(template => 
          template.category === 'AUTHENTICATION' && 
          template.status === 'APPROVED'
        )

        // Criar opções no formato: "template_name:language_code"
        // template.language é uma string, não um array
        this.wabaTemplateOptions = authTemplates.map(template => ({
          value: `${template.name}:${template.language || 'pt_BR'}`,
          label: `${template.name} (${template.language || 'pt_BR'})`
        }))
      } catch (error) {
        console.error('Erro ao listar templates WABA:', error)
        this.wabaTemplateOptions = []
        this.$q.notify({
          type: 'negative',
          message: this.$t('configuracoesA2F.templateListError'),
          progress: true,
          actions: [{ icon: 'close', round: true, color: 'white' }],
        })
      } finally {
        this.loadingTemplates = false
      }
    }
  },
  async mounted() {
    this.userProfile = localStorage.getItem('profile')
    // Carregar WhatsApps primeiro para que checkWhatsappType possa encontrar o WhatsApp selecionado
    await this.listarWhatsapps()
    // Depois carregar configurações do tenant (que vai chamar checkWhatsappType se houver WhatsApp selecionado)
    await this.listarTenantPorId()
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
}

.row.q-px-md {
  margin-bottom: 18px;
  &:last-of-type {
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
</style>

