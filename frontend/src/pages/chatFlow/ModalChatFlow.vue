<template>
  <q-dialog
    v-model="showDialog"
    @hide="fecharModal"
    @show="abrirModal"
    persistent
  >
    <q-card
      style="width: 500px"
      class="q-pa-lg"
    >
      <q-card-section>
        <div class="text-h6">
          {{ 
            chatFlow.isDuplicate 
              ? $t('modalChatflow.title.duplicate', { name: chatFlowEdicao.name }) 
              : chatFlowEdicao.id 
              ? $t('modalChatflow.title.edit') 
              : $t('modalChatflow.title.create') 
          }}
          <span v-if="chatFlow.isDuplicate"> 
            {{ $t('modalChatflow.title.duplicateSuffix', { name: chatFlowEdicao.name }) }} 
          </span>
        </div>
        <div
          v-if="chatFlow.isDuplicate"
          class="text-subtitle1"
        >
          {{ $t('modalChatflow.title.duplicateSuffix', { name: chatFlowEdicao.name }) }}
        </div>
        <!-- <div class="text-h6">{{ chatFlow.isDuplicate ? 'Duplicar' : chatFlowEdicao.id ? 'Editar': 'Criar' }} Fluxo <span v-if="chatFlow.isDuplicate"> (Nome: {{ chatFlowEdicao.name }}) </span></div>
        <div
          v-if="chatFlow.isDuplicate"
          class="text-subtitle1"
        > Nome: {{ chatFlowEdicao.name }} </div> -->
      </q-card-section>
      <q-card-section>
        <q-input
          class="row col"
          square
          outlined
          v-model="chatFlow.name"
          :label="$t('common.description')"
        />
        <div class="row col q-mt-md">
          <q-checkbox
            v-model="chatFlow.isActive"
            :label="$t('common.active')"
          />
        </div>
        <div class="row col q-mt-md">
          <q-input
            clearable
            class="full-width"
            square
            outlined
            v-model="chatFlow.celularTeste"
            :label="$t('modalChatflow.fields.testNumber')"
            :hint="$t('modalChatflow.fields.testNumberHint')"
          />
        </div>
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
          :label="$t('common.save')"
          color="primary"
          @click="handleAutoresposta"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
const userId = +localStorage.getItem('userId')
import { CriarChatFlow, UpdateChatFlow, DuplicarChatFlow } from 'src/service/chatFlow.js'
import { getDefaultFlow } from 'src/components/ccFlowBuilder/defaultFlow.js'

export default {
  name: 'ModalNovoChatFlow',
  props: {
    modalChatFlow: {
      type: Boolean,
      default: false
    },
    chatFlowEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  },
  emits: ['update:modalChatFlow', 'update:chatFlowEdicao', 'chatFlow:criada', 'chatFlow:editado'],
  data () {
    return {
      chatFlow: {
        name: null,
        userId,
        celularTeste: null,
        isActive: true
      }
    }
  },
  computed: {
    showDialog: {
      get () {
        return this.modalChatFlow
      },
      set (val) {
        this.$emit('update:modalChatFlow', val)
      }
    }
  },
  methods: {
    abrirModal () {
      if (this.chatFlowEdicao.id) {
        this.chatFlow = {
          ...this.chatFlowEdicao,
          userId
        }
      } else {
        this.chatFlow = {
          name: null,
          action: 0,
          userId,
          celularTeste: null,
          isActive: true
        }
      }
    },
    fecharModal () {
      this.chatFlow = {
        name: null,
        action: 0,
        userId,
        celularTeste: null,
        isActive: true
      }
      this.$emit('update:chatFlowEdicao', { id: null })
    },
    async handleAutoresposta () {
      if (this.chatFlow.id && !this.chatFlow?.isDuplicate) {
        const { data } = await UpdateChatFlow(this.chatFlow)
        this.$notificarSucesso(this.$t("modalChatflow.notifications.edited"));
        this.$emit('chatFlow:editado', data)
      } 
      if (!this.chatFlow.id && !this.chatFlow?.isDuplicate) {
        const flow = { ...getDefaultFlow(), ...this.chatFlow, id: null }
        const { data } = await CriarChatFlow(flow)
        this.$notificarSucesso(this.$t("modalChatflow.notifications.created"));
        this.$emit('chatFlow:criada', data)
      }
      if (this.chatFlow?.isDuplicate) {
        const flow = { ...this.chatFlow }
        const { data } = await DuplicarChatFlow(flow)
        this.$notificarSucesso(this.$t("modalChatflow.notifications.duplicated"));
        this.$emit('chatFlow:criada', data)
      }
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.3s ease;
}

.q-card-section {
  padding: 18px 24px;

  .text-h6 {
    color: var(--q-primary);
    font-weight: 600;
    margin-bottom: 8px;
  }

  .text-subtitle1 {
    color: rgba(0,0,0,0.6);
    font-size: 0.9em;
  }
}

.q-input {
  .q-field__control {
    background: rgba(255,255,255,0.7);
    border-radius: 8px;
    transition: all 0.3s ease;
    &:hover {
      background: rgba(255,255,255,0.9);
    }
  }
  &.q-field--focused .q-field__control {
    background: rgba(255,255,255,0.95);
    box-shadow: 0 4px 12px rgba(0,0,0,0.10);
  }
}

.q-checkbox {
  .q-checkbox__inner {
    transition: all 0.3s ease;
  }
  &:hover .q-checkbox__inner {
    transform: scale(1.1);
  }
}

.q-card-actions {
  padding: 16px 24px;
  border-top: 1px solid rgba(0,0,0,0.06);
}

/* Modo Escuro */
body.body--dark {
  .q-card {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255,255,255,0.08);
    box-shadow: 0 4px 16px rgba(0,0,0,0.25);
  }

  .q-card-section {
    .text-h6 {
      color: var(--q-primary);
    }
    .text-subtitle1 {
      color: rgba(255,255,255,0.7);
    }
  }

  .q-input {
    .q-field__control {
      background: rgba(255,255,255,0.05);
      &:hover {
        background: rgba(255,255,255,0.10);
      }
    }
    &.q-field--focused .q-field__control {
      background: rgba(255,255,255,0.15);
    }
  }
}

@media (max-width: 600px) {
  .q-card {
    width: 98vw !important;
    min-width: unset !important;
    border-radius: 12px;
  }
  .q-card-section, .q-card-actions {
    padding: 12px 16px;
  }
}
</style>