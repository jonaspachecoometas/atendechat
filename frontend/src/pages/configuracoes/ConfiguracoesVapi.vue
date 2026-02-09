<template>
  <div v-if="userProfile === 'admin'">
    <q-list class="text-weight-medium">
      <q-item tag="label" v-ripple @click="abrirLink">
        <q-item-section>
          <q-item-label>{{ $t('vapi.createAccountInstruction') }}</q-item-label>
          <q-item-label caption>{{ montarUrlIntegração() }}</q-item-label>
        </q-item-section>
        <q-tooltip content-class="bg-negative text-bold">
          {{ $t('vapi.tooltip') }}
        </q-tooltip>
      </q-item>

      <div class="row q-px-md">
        <div class="col-12" style="margin-top: 20px;">
          <q-input
            class="blur-effect custom-input-padding"
            v-model="vapiToken"
            :type="showVapiToken ? 'text' : 'password'"
            dense
            outlined
            :label="$t('vapi.tokenLabel')"
            input-style="min-height: 40px; max-height: 60px;"
            debounce="700"
            @update:model-value="alterarVapiToken()"
          >
            <template v-slot:append>
              <q-icon
                :name="showVapiToken ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showVapiToken = !showVapiToken"
              />
            </template>
          </q-input>
        </div>
      </div>

      <!-- Listagem de Assistentes -->
      <div class="row q-px-md">
        <div class="col-12">
          <q-list bordered separator>
            <q-item-label class="text-h6 text-primary">{{ $t('vapi.assistants') }}</q-item-label>
            <q-item v-for="assistente in assistentes" :key="assistente.id" clickable>
              <q-item-section avatar>
                <q-icon name="person" color="primary" />
              </q-item-section>
              <q-item-section>{{ assistente.name }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <!-- Listagem de Números de Telefone -->
      <div class="row q-px-md">
        <div class="col-12">
          <q-list bordered separator>
            <q-item-label class="text-h6 text-primary">{{ $t('vapi.phones') }}</q-item-label>
            <q-item v-for="numero in numerosDeTelefone" :key="numero.id" clickable>
              <q-item-section avatar>
                <q-icon name="phone" color="primary" />
              </q-item-section>
              <q-item-section>{{ numero.number }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="row q-px-md">
        <div class="col-12">
          <q-btn
            :label="$t('vapi.testCall')"
            color="primary"
            @click="dialogVisible = true"
          />
        </div>
      </div>
    </q-list>

    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ $t('vapi.testCall') }}</div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="selectedAssistantId"
            :options="assistentes?.map(a => ({ label: a.name, value: a.id })) || []"
            :label="$t('vapi.selectAssistant')"
          />
          <q-select
            v-model="selectedPhoneNumberId"
            :options="numerosDeTelefone?.map(n => ({ label: n.number, value: n.id })) || []"
            :label="$t('vapi.selectPhoneNumber')"
          />
          <q-input
            v-model="customerNumber"
            :label="$t('vapi.customerNumber')"
            type="text"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :label="$t('vapi.cancel')" v-close-popup />
          <q-btn flat :label="$t('vapi.makeCall')" @click="fazerChamadaTeste" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
const usuario = JSON.parse(localStorage.getItem('usuario'))
import { ListarTenantPorId, AlterarTenantVapiToken } from 'src/service/tenants.js'
import { defineComponent } from 'vue'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ListarAssistentes, ListarNumerosDeTelefone, CriarChamada } from 'src/service/vapi.js'

export default defineComponent({
  name: 'IndexConfiguracoes',
  data() {
    return {
      usuario,
      vapiToken: '',
      webhookChecked: '',
      loading: false,
      userProfile: 'user',
      showVapiToken: false,
      assistentes: [],
      numerosDeTelefone: [],
      dialogVisible: false,
      selectedAssistantId: null,
      selectedPhoneNumberId: null,
      customerNumber: '',
    }
  },
  computed: {
    cBaseUrlIntegração () {
      return `https://vapi.ai/`
    }
  },
  methods: {
    abrirLink() {
      window.open('https://vapi.ai/', '_blank');
    },
    formatarDataBrasil(data) {
      const dataObjeto = new Date(data);
      return format(dataObjeto, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
    },
    montarUrlIntegração() {
      return `${this.cBaseUrlIntegração}`
    },
    formatarData(data) {
      const dataFormatada = new Date(data);
      return dataFormatada.toLocaleDateString('pt-BR');
    },
    async alterarVapiToken(){
      try {
        await AlterarTenantVapiToken({
          id: this.usuario.tenantId,
          vapiToken: this.vapiToken,
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
      this.vapiToken = data[0]?.vapiToken
    },
    async listarAssistentes() {
      try {
        const { data } = await ListarAssistentes(this.usuario.tenantId);
        if (Array.isArray(data)) {
          this.assistentes = data;
        } else if (data && Array.isArray(data.data)) {
          this.assistentes = data.data;
        } else if (data && Array.isArray(data.assistants)) {
          this.assistentes = data.assistants;
        } else {
          this.assistentes = [];
        }
      } catch (error) {
        console.error('Erro ao listar assistentes:', error);
        this.assistentes = [];
      }
    },
    async listarNumerosDeTelefone() {
      try {
        const { data } = await ListarNumerosDeTelefone(this.usuario.tenantId);
        if (Array.isArray(data)) {
          this.numerosDeTelefone = data;
        } else if (data && Array.isArray(data.data)) {
          this.numerosDeTelefone = data.data;
        } else if (data && Array.isArray(data.phoneNumbers)) {
          this.numerosDeTelefone = data.phoneNumbers;
        } else {
          this.numerosDeTelefone = [];
        }
      } catch (error) {
        console.error('Erro ao listar números de telefone:', error);
        this.numerosDeTelefone = [];
      }
    },
    async fazerChamadaTeste() {
      try {
        const customers = [{ number: this.customerNumber }];
        const result = await CriarChamada(this.usuario.tenantId, customers, this.selectedAssistantId.value, this.selectedPhoneNumberId.value);
        this.$q.notify({ type: 'positive', message: this.$t('vapi.success') });
        this.dialogVisible = false;
        this.selectedAssistantId = null;
        this.selectedPhoneNumberId = null;
        this.customerNumber = '';
      } catch (error) {
        console.error('Erro ao fazer chamada de teste:', error);
        this.$q.notify({ type: 'negative', message: this.$t('vapi.error') });
      }
    }
  },
  async mounted() {
    await this.listarTenantPorId()
    this.userProfile = localStorage.getItem('profile')
    await this.listarAssistentes()
    await this.listarNumerosDeTelefone()
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
