<template>
  <div>
    <q-card flat class="q-pa-sm q-pb-md" style="min-height: 40px;">
      <q-card-section class="q-pa-none">
        <div class="text-subtitle2 q-mb-sm text-weight-medium">
          {{ $t('nodeForm.VapiField') }}
        </div>
        
        <!-- Assistente -->
        <div class="q-mb-sm">
          <q-select
            v-model="$attrs.element.data.assistantId"
            :options="assistantOptions"
            :label="$t('nodeForm.assistantId')"
            outlined
            dense
            emit-value
            map-options
            :loading="loading"
            :rules="[val => !!val || $t('common.required')]"
            @update:model-value="updateData"
          />
        </div>
        
        <!-- Número de Telefone -->
        <div class="q-mb-sm">
          <div class="row items-center">
            <div class="col-10">
              <q-select
                v-model="$attrs.element.data.phoneNumberId"
                :options="phoneNumberOptions"
                :label="$t('nodeForm.phoneNumberId')"
                outlined
                dense
                emit-value
                map-options
                :loading="loading"
                :rules="[val => !!val || $t('common.required')]"
                @update:model-value="updateData"
              />
            </div>
            <div class="col-2 q-pl-sm">
              <q-btn
                @click="clearData"
                class="text-red"
                flat
                round
                size="sm"
                icon="mdi-cancel"
              >
                <q-tooltip>
                  {{ $t('nodeForm.clear') }}
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>
        
        <!-- Removendo o botão de limpeza antigo que estava abaixo -->
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ListarAssistentes, ListarNumerosDeTelefone } from 'src/service/vapi'

export default {
  name: 'VapiField',
  data() {
    return {
      assistants: [],
      phoneNumbers: [],
      loading: false
    }
  },
  computed: {
    assistantOptions() {
      return this.assistants.map(assistant => ({
        label: assistant.name || assistant.id,
        value: assistant.id
      }))
    },
    phoneNumberOptions() {
      return this.phoneNumbers.map(phone => ({
        label: phone.number,
        value: phone.id
      }))
    }
  },
  mounted() {
    this.initializeData()
    this.carregarDados()
  },
  methods: {
    async carregarDados() {
      try {
        this.loading = true
        const usuario = JSON.parse(localStorage.getItem('usuario'))
        const tenantId = usuario?.tenantId
        
        if (!tenantId) {
          console.error('Tenant ID não encontrado')
          return
        }
        
        const [assistantsResponse, phoneNumbersResponse] = await Promise.all([
          ListarAssistentes(tenantId),
          ListarNumerosDeTelefone(tenantId)
        ])
        
        this.assistants = assistantsResponse.data || []
        this.phoneNumbers = phoneNumbersResponse.data || []
      } catch (error) {
        console.error('Erro ao carregar dados VAPI:', error)
        this.$q.notify({
          type: 'negative',
          message: 'Erro ao carregar dados VAPI'
        })
      } finally {
        this.loading = false
      }
    },
    initializeData() {
      if (!this.$attrs.element.data.assistantId) {
        this.$attrs.element.data.assistantId = ''
      }
      if (!this.$attrs.element.data.phoneNumberId) {
        this.$attrs.element.data.phoneNumberId = ''
      }
    },
    updateData() {
      this.$emit('vapi-changed', this.$attrs.element.data)
    },
    clearData() {
      this.$attrs.element.data.assistantId = ''
      this.$attrs.element.data.phoneNumberId = ''
      this.updateData()
    }
  },
  watch: {
    '$attrs.element.data': {
      handler() {
        this.initializeData()
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.text-subtitle2 {
  color: #2c3e50;
  font-weight: 600;
}

.q-input, .q-select {
  .q-field__control {
    background: rgba(255, 255, 255, 0.7);
    
    &:hover {
      background: rgba(255, 255, 255, 0.9);
    }
    
    &:focus-within {
      background: #fff;
    }
  }
}

body.body--dark {
  .text-subtitle2 {
    color: #fff;
  }
  
  .q-input, .q-select {
    .q-field__control {
      background: rgba(40, 40, 40, 0.85);
      color: #fff;
      
      &:hover {
        background: rgba(40, 40, 40, 0.95);
      }
      
      &:focus-within {
        background: #222;
      }
    }
  }
}
</style>
