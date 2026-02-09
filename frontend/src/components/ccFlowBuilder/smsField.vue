<template>
  <div>
    <q-card flat class="q-pa-sm q-pb-md" style="min-height: 40px;">
      <q-card-section class="q-pa-none">
        <div class="text-subtitle2 q-mb-sm text-weight-medium">
          {{ $t('nodeForm.SmsField') }}
        </div>
        
        <!-- Serviço SMS -->
        <div class="q-mb-sm">
          <q-select
            v-model="$attrs.element.data.smsService"
            :options="smsServices"
            :label="$t('nodeForm.sms.service')"
            outlined
            dense
            emit-value
            map-options
            :rules="[val => !!val || $t('common.required')]"
            @update:model-value="updateData"
          />
        </div>
        
        <!-- Mensagem SMS -->
        <div class="q-mb-sm">
          <div class="row items-center">
            <div class="col-10">
              <q-input
                v-model="$attrs.element.data.smsMessage"
                :label="$t('nodeForm.sms.message')"
                type="textarea"
                outlined
                dense
                autogrow
                rows="3"
                :rules="[val => !!val || $t('common.required')]"
                :placeholder="$t('nodeForm.sms.messagePlaceholder')"
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
export default {
  name: 'SmsField',
  data() {
    return {
      smsServices: [
        { label: 'Comtele', value: 'comtele' },
        { label: 'Conecta', value: 'conecta' },
        { label: 'BHI', value: 'livson' }
      ]
    }
  },
  mounted() {
    this.initializeData()
  },
  methods: {
    initializeData() {
      if (!this.$attrs.element.data.smsService) {
        this.$attrs.element.data.smsService = ''
      }
      if (!this.$attrs.element.data.smsMessage) {
        this.$attrs.element.data.smsMessage = ''
      }
    },
    updateData() {
      this.$emit('sms-changed', this.$attrs.element.data)
    },
    clearData() {
      this.$attrs.element.data.smsService = ''
      this.$attrs.element.data.smsMessage = ''
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
