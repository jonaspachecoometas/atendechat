<template>
  <q-dialog
    persistent
    :model-value="modalTenant"
    @update:model-value="$emit('update:modalTenant', $event)"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">
          {{ tenantEdicao.id ? $t('modalTenant.title.edit') : $t('modalTenant.title.create') }}
        </div>
      </q-card-section>

      <div class="modal-scroll-area">
        <q-card-section>
          <q-toggle
            v-model="toggleStatus"
            :label="toggleStatus ? $t('modalTenant.fields.status') + ': Ativo' : $t('modalTenant.fields.status') + ': Inativo'"
            color="primary"
          />

          <q-input class="q-mt-md" v-model="tenant.name" outlined :label="$t('modalTenant.fields.name')" />
          <q-input class="q-mt-md" type="number" v-model="tenant.maxUsers" outlined :label="$t('modalTenant.fields.maxUsers')" />
          <q-input class="q-mt-md" type="number" v-model="tenant.maxConnections" outlined :label="$t('modalTenant.fields.maxConnections')" />
          <q-input class="q-mt-md" v-model="tenant.identity" outlined :label="$t('modalTenant.fields.identity')" />
        </q-card-section>

        <q-separator spaced />
        <q-card-section>
          <div class="text-h6">{{ $t('modalTenant.trial.title') }}</div>
          <q-toggle
            v-model="toggleTrial"
            class="q-mt-sm"
            :label="toggleTrial ? $t('modalTenant.trial.enabled') : $t('modalTenant.trial.disabled')"
            color="primary"
          />
          <q-input
            v-if="toggleTrial"
            class="q-mt-md"
            v-model="tenant.trialPeriod"
            outlined
            :label="$t('modalTenant.fields.trialPeriod')"
          />
          <q-banner class="bg-yellow text-black q-mt-md" inline-actions>
            <b>{{ $t('modalTenant.trial.warning') }}</b>
          </q-banner>
        </q-card-section>

        <q-separator spaced />
        <q-card-section>
          <div class="text-h6">{{ $t('modalTenant.asaas.title') }}</div>
          <q-toggle
            v-model="toggleAsaas"
            class="q-mt-sm"
            :label="toggleAsaas ? $t('modalTenant.asaas.enabled') : $t('modalTenant.asaas.disabled')"
            color="primary"
          />

          <q-input
            v-if="toggleAsaas"
            class="q-mt-md"
            v-model="tenant.asaasToken"
            outlined
            :label="$t('modalTenant.fields.asaasToken')"
          />
          <q-input
            v-if="toggleAsaas"
            class="q-mt-md"
            v-model="tenant.asaasCustomerId"
            outlined
            :label="$t('modalTenant.fields.asaasCustomerId')"
          />
        </q-card-section>

        <q-separator spaced />
        <q-card-section>
          <q-expansion-item
            :label="$t('modalTenant.visibleMenu.title')"
            icon="mdi-eye"
            expand-separator
            dense
            default-opened
          >
            <div class="row q-col-gutter-md">
              <div class="col-6" v-for="(value, key) in menuVisibility" :key="key">
                <q-toggle
                  v-model="menuVisibility[key]"
                  :label="menuLabels[key] || key"
                  color="primary"
                />
              </div>
            </div>
          </q-expansion-item>
        </q-card-section>

        <q-separator spaced />

        <q-card-section>
          <q-expansion-item
            :label="$t('modalTenant.allowedChannels.title')"
            icon="mdi-chat"
            expand-separator
            dense
            default-opened
          >
            <div class="row q-col-gutter-md">
              <div class="col-6" v-for="channel in availableChannels" :key="channel.value">
                <q-checkbox
                  v-model="selectedChannels"
                  :val="channel.value"
                  :label="channel.label"
                  color="primary"
                />
              </div>
            </div>
          </q-expansion-item>
        </q-card-section>

      </div>

      <q-card-actions align="right" class="q-mt-md">
        <q-btn
          flat
          :label="$t('common.cancel')"
          color="negative"
          v-close-popup
          class="q-mr-md"
        />
        <q-btn
          flat
          :label="$t('common.save')"
          color="primary"
          @click="validateAndHandleTenant"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarTenant, AlterarTenant, AlterarTenantAllowedChannels } from 'src/service/tenants.js'
export default {
  name: 'ModalTenant',
  props: {
    modalTenant: {
      type: Boolean,
      default: false
    },
    tenantEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  data () {
    return {
      tenant: {
        id: null,
        status: 'active',
        // ownerId: null,
        name: null,
        maxUsers: null,
        maxConnections: null,
        asaas: null,
        asaasToken: null,
        asaasCustomerId: null,
        metaToken: null,
        bmToken: null,
        allowedChannels: [
          "waba",
          "baileys", 
          "meow",
          "whatsapp",
          "zapi",
          "evo",
          "uazapi",
          "telegram",
          "webchat",
          "hub",
          "webmail"
        ],
        identity: null,
        allowedChannels: []
      },
      toggleStatus: false,
      toggleAsaas: false,
      toggleTrial: false,
      menuVisibility: {
        'grupo': true,
        'massa': true,
        'kanban': true,
        'equipes': true,
        'tarefas': true,
        'campanhas': true,
        'chat-flow': true,
        'relatorios': true,
        'api-service': true,
        'chat-privado': true
      },
      menuLabels: {
        'grupo': this.$t('modalTenant.visibleMenu.grupos'),
        'massa': this.$t('modalTenant.visibleMenu.disparoMassa'),
        'kanban': this.$t('modalTenant.visibleMenu.kanban'),
        'tarefas': this.$t('modalTenant.visibleMenu.tarefas'),
        'api-service': this.$t('modalTenant.visibleMenu.api'),
        'chat-flow': this.$t('modalTenant.visibleMenu.chatbot'),
        'relatorios': this.$t('modalTenant.visibleMenu.relatorios'),
        'campanhas': this.$t('modalTenant.visibleMenu.campanhas'),
        'chat-privado': this.$t('modalTenant.visibleMenu.chat'),
        'equipes': this.$t('modalTenant.visibleMenu.equipes'),
    },
    availableChannels: [
      { label: 'WhatsApp Official (WABA)', value: 'waba' },
      { label: 'WhatsApp Baileys (QRCode)', value: 'baileys' },
      { label: 'WhatsApp WebJs (QRCode)', value: 'whatsapp' },
      { label: 'WhatsApp Meow (QRCode)', value: 'meow' },
      { label: 'WhatsApp Evolution 2 (QRCode)', value: 'evo' },
      { label: 'Z-API (QRCode)', value: 'zapi' },
      { label: 'Uazapi (QRCode)', value: 'uazapi' },
      { label: 'Telegram', value: 'telegram' },
      { label: 'Hub Notificame', value: 'hub' },
      { label: 'WebChat', value: 'webchat' },
      { label: 'WebMail', value: 'webmail' },
      // { label: 'Instagram', value: 'instagram' }
    ],
    selectedChannels: [
      "waba",
      "baileys", 
      "meow",
      "whatsapp",
      "zapi",
      "evo",
      "uazapi",
      "telegram",
      "webchat",
      "hub",
      "webmail"
    ],
    // Sistema de gerenciamento de memória
    timers: []
    }
  },
  watch: {
    'tenant.status': function (newStatus) {
      this.toggleStatus = newStatus === 'active';
    },
    toggleStatus: function (newToggleStatus) {
      this.tenant.status = newToggleStatus ? 'active' : 'inactive';
    },
    'tenant.asaas': function (newAsaas) {
      this.toggleAsaas = newAsaas === 'enabled';
    },
    'tenant.trial': function (newTrial) {
      this.toggleTrial = newTrial === 'enabled';
    },
    toggleAsaas: function (newToggleAsaas) {
      this.tenant.asaas = newToggleAsaas ? 'enabled' : 'disabled';
    },
    toggleTrial: function (newToggleTrial) {
      this.tenant.trial = newToggleTrial ? 'enabled' : 'disabled';
    },
    'tenant.allowedChannels': function (newChannels) {
      this.selectedChannels = newChannels || [];
    },
    selectedChannels: function (newChannels) {
      this.tenant.allowedChannels = newChannels;
    }
  },
  methods: {
    // Sistema de gerenciamento de memória
    addTimer(timerId) {
      this.timers.push(timerId);
    },
    clearAllTimers() {
      this.timers.forEach(timerId => {
        clearTimeout(timerId);
        clearInterval(timerId);
      });
      this.timers = [];
    },
    cleanupMemory() {
      this.clearAllTimers();
    },
    resetarTenant () {
      this.tenant = {
        id: null,
        status: null,
        // ownerId: null,
        name: null,
        maxUsers: null,
        maxConnections: null,
        asaas: null,
        asaasToken: null,
        asaasCustomerId: null,
        metaToken: null,
        bmToken: null
      }
    },
    fecharModal () {
      this.resetarTenant()
      this.$emit('update:tenantEdicao', { id: null })
      this.$emit('update:modalTenant', false)
    },
    abrirModal () {
      if (this.tenantEdicao.id) {
        this.tenant = { ...this.tenantEdicao }
        if(this.tenantEdicao.status === 'active'){
          this.toggleStatus = true
        }
        if(this.tenantEdicao.status === 'inactive'){
          this.toggleStatus = false
        }
        if (this.tenantEdicao.menuVisibility) {
          this.menuVisibility = { ...this.tenantEdicao.menuVisibility[0] };
        }
        if (this.tenantEdicao.allowedChannels) {
          this.selectedChannels = [...this.tenantEdicao.allowedChannels];
        }
      } else {
        this.resetarTenant()
      }
    },
    async handleTenant () {
      try {
        this.loading = true
        if (this.tenant.id === 1) {
          this.tenant.status = 'active'
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalTenant.validation.cannotDeactivateMain'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.tenant.menuVisibility = [this.menuVisibility]; 
        this.tenant.allowedChannels = this.selectedChannels;
        if (this.tenant.id) {
          const { data } = await AlterarTenant(this.tenant)
          this.$emit('modal-tenant:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('modalTenant.notifications.updated'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarTenant(this.tenant)
          this.$emit('modal-tenant:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalTenant.notifications.created'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
        const timerId = setTimeout(() => {
          window.location.reload();
        }, 1500);
        this.addTimer(timerId);
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('modalTenant.notifications.error'), error)
      }
    },
    validateAndHandleTenant() {
      if (!this.areRequiredFieldsFilled()) {
        this.$q.notify({
          type: 'negative',
          position: 'top',
          message: this.$t('modalTenant.validation.requiredFields'),
        });
        return;
      }

      if (this.toggleAsaas && (!this.tenant.asaasToken || !this.tenant.asaasCustomerId)) {
        this.$q.notify({
          type: 'negative',
          position: 'top',
          message: this.$t('modalTenant.validation.asaasRequiredFields'),
        });
        return;
      }

      this.handleTenant();
    },
    areRequiredFieldsFilled() {
      let requiredFieldsFilled = 
        this.tenant.name &&
        this.tenant.maxUsers !== null &&
        this.tenant.maxConnections !== null &&
        this.tenant.status !== null;

      if (this.toggleAsaas) {
        requiredFieldsFilled = requiredFieldsFilled &&
          this.tenant.asaasToken &&
          this.tenant.asaasCustomerId;
      }

      return requiredFieldsFilled;
    }
  },
  
  beforeUnmount() {
    // Limpeza completa de memória
    this.cleanupMemory();
  },
  
  unmounted() {
    // Limpeza completa de memória
    this.cleanupMemory();
  }
}
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .q-card-section {
      &:first-child {
        background: rgba(var(--q-primary-rgb), 0.05);
        padding: 1.2rem 1.5rem;
        flex: 0 0 auto;
      }

      &:not(:first-child):not(:last-child) {
        overflow-y: auto;
        flex: 1;
        padding: 1.5rem;
        max-height: calc(90vh - 200px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .text-h6 {
        color: var(--q-primary);
        font-weight: 600;
        font-size: 1.2rem;
        margin: 0;
      }
    }

    .q-separator {
      background: rgba(255, 255, 255, 0.1);
      flex: 0 0 auto;
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

    .q-toggle {
      .q-toggle__track {
        opacity: 0.7;
      }
    }

    .q-expansion-item {
      border-radius: 8px;
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(var(--q-primary-rgb), 0.05);
      }

      .q-expansion-item__container {
        .q-item {
          padding: 0.8rem 1rem;
        }
      }
    }

    .q-banner {
      border-radius: 8px;
      background: rgba(var(--q-warning-rgb), 0.1) !important;
      border: 1px solid rgba(var(--q-warning-rgb), 0.2);
    }

    .q-card-actions {
      padding: 1rem 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      flex: 0 0 auto;
      background: rgba(255, 255, 255, 0.95);
      position: sticky;
      bottom: 0;
      z-index: 1;

      .q-btn {
        border-radius: 8px;
        padding: 0.4rem 1rem;
        font-weight: 500;
        letter-spacing: 0.3px;
        transition: all 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: 0.9rem;
        min-height: 36px;

        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
      }
    }
  }
}

/* Modo Escuro */
body.body--dark {
  .q-dialog {
    .q-card {
      background: rgba(30, 30, 30, 0.95);
      border-color: rgba(255, 255, 255, 0.1);

      .q-input {
        .q-field__control {
          background: rgba(255, 255, 255, 0.05);

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        &.q-field--focused .q-field__control {
          background: rgba(255, 255, 255, 0.15);
        }
      }

      .q-expansion-item:hover {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .q-dialog {
    .q-card {
      width: 95vw !important;
      border-radius: 12px;

      .q-card-section {
        &:first-child {
          padding: 1rem;
        }
      }

      .q-card-actions {
        padding: 0.8rem;
        flex-direction: column;
        gap: 0.5rem;

        .q-btn {
          width: 100%;
        }
      }
    }
  }
}

.modal-scroll-area {
  flex: 1;
  overflow-y: auto;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.q-banner.bg-yellow {
  background: #fffbe6 !important;
  color: #222 !important;
  border: 1px solid #ffe58f !important;
}

body.body--dark {
  .q-banner.bg-yellow {
    background: #fffbe6 !important;
    color: #222 !important;
    border: 1px solid #ffe58f !important;
  }
}
</style>
