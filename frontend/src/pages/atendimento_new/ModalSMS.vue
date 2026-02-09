<template>
  <q-dialog
    persistent
    :value="modalSMS"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">{{ $t('atendimentoModalSMS.title') }}</div>
      </q-card-section>
      <q-card-section>
        <!-- Input para a mensagem -->
        <q-input
          type="textarea"
          class="row col"
          square
          outlined
          v-model="message"
          :label="$t('atendimentoModalSMS.messageLabel')"
          autogrow
        />
        <!-- Dropdown para selecionar o serviço -->
        <q-select
          v-model="service"
          :options="services"
          outlined
          :label="$t('atendimentoModalSMS.selectServiceLabel')"
          dense
          class="q-mt-md"
        />
      </q-card-section>
      <q-card-actions
        align="right"
        class="q-mt-md"
      >
        <q-btn
          flat
          :label="$t('common.cancel')"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          :label="$t('atendimentoModalSMS.send')"
          color="primary"
          @click="handleSMS"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { EnviarSMS, EnviarSMSConecta } from 'src/service/sms';

export default {
  name: 'ModalSMS',
  props: {
    modalSMS: {
      type: Boolean,
      default: false
    },
    smsEnvio: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      message: '',
      service: '', // Serviço selecionado
      services: [
        { label: 'Comtele', value: 'comtele' },
        { label: 'ConectaStartup', value: 'conecta' }
      ]
    };
  },
  methods: {
    resetarSMS() {
      this.message = '';
      this.service = '';
    },
    fecharModal() {
      this.resetarSMS();
      this.$emit('update:modalSMS', false);
    },
    abrirModal() {
      if (this.smsEnvio.id) {
        this.sms = this.smsEnvio;
      } else {
        this.resetarSMS();
      }
    },
    async handleSMS() {
      if (!this.service) {
        this.$q.notify({
          type: 'warning',
          message: this.$t("atendimentoModalSMS.noServiceSelected"),
          position: 'top'
        });
        return;
      }

      try {
        const dados = {
          phoneNumber: this.smsEnvio,
          message: this.message
        };

        // Verifica o serviço selecionado
        if (this.service.value === 'comtele') {
          const resposta = await EnviarSMS(dados);
          this.$q.notify({
            type: 'positive',
            message: this.$t("atendimentoModalSMS.comteleSuccess"),
            position: 'top'
          });
        } else if (this.service.value === 'conecta') {
          const resposta = await EnviarSMSConecta(dados);
          this.$q.notify({
            type: 'positive',
            message: this.$t("atendimentoModalSMS.conectaSuccess"),
            position: 'top'
          });
        }

        // this.fecharModal();
      } catch (error) {
        this.$q.notify({
          type: 'warning',
          message: this.$t("atendimentoModalSMS.errorSending", { error: error.message }),
          position: 'top'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.q-card {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  transition: box-shadow 0.3s, background 0.3s;
}

.q-card-section {
  border-radius: 14px;
}

.q-input, .q-select {
  background: rgba(255,255,255,0.7);
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s;
  &:focus-within {
    box-shadow: 0 2px 8px rgba(0,123,255,0.10);
    border-color: var(--q-primary, #1976d2);
  }
}

@media (max-width: 600px) {
  .q-card {
    width: 98vw !important;
    border-radius: 0;
    box-shadow: none;
    padding: 0 !important;
  }
  .q-card-section {
    border-radius: 0;
  }
}

body.body--dark .q-card {
  background: rgba(30,30,30,0.92) !important;
  color: #f5f5f5 !important;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
}
body.body--dark .q-card-section {
  color: #f5f5f5 !important;
}
body.body--dark .q-input, body.body--dark .q-select {
  background: rgba(40,40,40,0.7) !important;
  color: #f5f5f5 !important;
}
</style>
