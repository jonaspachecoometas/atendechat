<template>
  <q-dialog persistent v-model="dialogProxy"
    @hide="fecharModal"
    @show="abrirModal"
  >
    <q-card
      style="width: 98vw; max-width: 1200px"
      class="q-pa-lg modern-modal"
    >
      <q-card-section class="modal-header">
        <div class="text-h6">
          {{ filaEdicao.id ? $t('modalFila.title.edit') : $t('modalFila.title.create') }}
        </div>
      </q-card-section>
      <q-card-section class="modal-body">
        <q-input
          class="row col q-mb-md"
          square
          outlined
          v-model="fila.queue"
          :label="$t('modalFila.labels.name')"
          :rules="[val => !!val || $t('common.required')]"
          lazy-rules
        />
        <q-checkbox
          v-model="fila.isActive"
          :label="$t('common.active')"
          class="q-mt-sm modern-checkbox"
        />
        <div class="col-12 q-mt-md">
          <q-expansion-item
            :label="$t('modalUsuario.horarioAtendimento')"
            icon="mdi-clock-outline"
            expand-separator
            dense
            v-model="businessHoursExpanded"
          >
            <BusinessHours 
              ref="businessHoursComponent"
              :value="fila.businessHours"
              style="margin-top: 10px;" 
              @input="onBusinessHoursChange"
              @update:value="onBusinessHoursChange"
            />
          </q-expansion-item>
        </div>
        <div class="col-12 q-mt-md">
          <q-expansion-item
            :label="$t('horarioAtendimento.labels.absenceMessage')"
            icon="mdi-message-text-outline"
            expand-separator
            dense
          >
            <div class="row items-center q-mt-sm">
              <div class="col-12">
                <textarea
                  ref="inputEnvioMensagem"
                  style="min-height: 9vh; max-height: 9vh;"
                  class="q-pa-sm bg-white full-width"
                  :placeholder="$t('common.typeMessage')"
                  v-model="fila.messageBusinessHours"
                />
              </div>
            </div>
          </q-expansion-item>
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
          @click="handleFila"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { CriarFila, AlterarFila } from 'src/service/filas.js'
import BusinessHours from 'src/components/BusinessHours.vue'

export default {
  name: 'ModalFila',
  components: { BusinessHours },
  props: {
    modalFila: {
      type: Boolean,
      default: false
    },
    filaEdicao: {
      type: Object,
      default: () => {
        return { id: null }
      }
    }
  }
  ,
  computed: {
    dialogProxy: {
      get () { return this.modalFila },
      set (v) { this.$emit('update:modalFila', v) }
    }
  }
,
  data () {
    return {
      businessHoursExpanded: false,
      fila: {
        id: null,
        queue: null,
        isActive: true,
        businessHours: [],
        messageBusinessHours: ''
      }
    }
  },
  methods: {
    getDefaultBusinessHours() {
      // Retorna os valores padrão do componente BusinessHours
      return [
        { day: 0, label: this.$t('businessHours.days.0'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 1, label: this.$t('businessHours.days.1'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 2, label: this.$t('businessHours.days.2'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 3, label: this.$t('businessHours.days.3'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 4, label: this.$t('businessHours.days.4'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 5, label: this.$t('businessHours.days.5'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 6, label: this.$t('businessHours.days.6'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' }
      ]
    },
    onBusinessHoursChange(newValue) {
      // Verificar se é um array válido antes de processar
      if (Array.isArray(newValue)) {
        // Usar JSON para criar uma cópia profunda e evitar referências
        this.fila.businessHours = JSON.parse(JSON.stringify(newValue));
      }
    },
    resetarFila () {
      this.fila = {
        id: null,
        queue: null,
        isActive: true,
        businessHours: [],
        messageBusinessHours: ''
      }
    },
    fecharModal () {
      this.resetarFila()
      this.businessHoursExpanded = false
      this.$emit('update:filaEdicao', { id: null })
      this.$emit('update:modalFila', false)
    },
    abrirModal () {
      if (this.filaEdicao.id) {
        this.fila = {
          ...this.filaEdicao,
          businessHours: Array.isArray(this.filaEdicao.businessHours) ? this.filaEdicao.businessHours : [],
          messageBusinessHours: this.filaEdicao.messageBusinessHours || ''
        }
        // Se for edição, expandir apenas se já tiver horários configurados
        this.businessHoursExpanded = Array.isArray(this.fila.businessHours) && this.fila.businessHours.length > 0
      } else {
        // Nova fila - inicializar com valores padrão e expandir
        this.resetarFila()
        this.fila.businessHours = this.getDefaultBusinessHours()
        this.businessHoursExpanded = true
      }
    },
    async handleFila () {
      try {
        this.loading = true
        
        // Antes de salvar, garantir que os valores padrão do BusinessHours sejam capturados se ainda estiver vazio
        if ((!this.fila.businessHours || this.fila.businessHours.length === 0) && this.$refs.businessHoursComponent) {
          this.$refs.businessHoursComponent.emitChange();
          // Aguardar um tick para garantir que o valor foi atualizado
          await this.$nextTick();
        }
        
        // Validar horários de atendimento antes de salvar
        if (this.$refs.businessHoursComponent) {
          const validationErrors = this.$refs.businessHoursComponent.validateAllBusinessHours();
          
          if (validationErrors.length > 0) {
            const errorMessage = validationErrors.join('\n');
            this.$q.notify({
              color: 'negative',
              position: 'top',
              message: this.$t('horarioAtendimento.notifications.validationError'),
              caption: errorMessage,
              timeout: 8000,
              multiLine: true,
              actions: [{ icon: 'close', color: 'white' }]
            });
            this.loading = false;
            return false;
          }
        }
        
        // Preparar dados da fila, garantindo tipos corretos
        const filaData = {
          ...this.fila,
          // Garantir que businessHours seja sempre um array válido
          businessHours: Array.isArray(this.fila.businessHours) && this.fila.businessHours.length > 0 
            ? this.fila.businessHours 
            : (this.$refs.businessHoursComponent 
                ? JSON.parse(JSON.stringify(this.$refs.businessHoursComponent.businessHours))
                : []),
          // Garantir que messageBusinessHours seja sempre uma string
          messageBusinessHours: this.fila.messageBusinessHours || ''
        }
        
        if (this.fila.id) {
          const { data } = await AlterarFila(filaData)
          this.$emit('modal-fila:editada', data)
          this.$q.notify({
            type: 'info',
            progress: true,
            position: 'top',
            textColor: 'black',
            message: this.$t('modalFila.notifications.updated'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        } else {
          const { data } = await CriarFila(filaData)
          this.$emit('modal-fila:criada', data)
          this.$q.notify({
            type: 'positive',
            progress: true,
            position: 'top',
            message: this.$t('modalFila.notifications.created'),
            actions: [{
              icon: 'close',
              round: true,
              color: 'white'
            }]
          })
        }
        this.loading = false
        this.fecharModal()
      } catch (error) {
        console.error(error)
        this.$notificarErro(this.$t('modalFila.notifications.error'), error)
        this.loading = false
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.modern-modal {
  border-radius: 16px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: #fff;
  transition: all 0.3s ease;

  .modal-header {
    padding: 1.5rem 1.5rem 1rem;
    border-bottom: 1px solid #e9ecef;

    .text-h6 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--q-primary);
    }
  }

  .modal-body {
    padding: 1.5rem;

    :deep(.q-field) {
      .q-field__control {
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
          border-color: var(--q-primary);
        }
      }

      &.q-field--focused .q-field__control {
        border-color: var(--q-primary);
        box-shadow: 0 0 0 2px rgba(var(--q-primary-rgb), 0.1);
      }
    }

    :deep(.modern-checkbox) {
      display: flex;
      align-items: center;
      margin-top: 1.2rem;
      margin-bottom: 0.5rem;

      .q-checkbox__inner {
        width: 24px;
        height: 24px;
        min-width: 24px;
        min-height: 24px;
        border-radius: 6px;
        border: 2px solid #bfc9d1;
        background: #f8f9fa;
        transition: border-color 0.2s, box-shadow 0.2s;
        margin-right: 10px;
      }
      .q-checkbox__inner--truthy {
        border-color: var(--q-primary);
        background: var(--q-primary);
        box-shadow: 0 0 0 2px rgba(var(--q-primary-rgb), 0.10);
      }
      .q-checkbox__icon {
        font-size: 1.2rem;
      }
      .q-checkbox__label {
        font-size: 1.08rem;
        color: #2c3e50;
        font-weight: 500;
        margin-left: 4px;
      }
      &:focus-within .q-checkbox__inner {
        border-color: var(--q-primary);
        box-shadow: 0 0 0 2px rgba(var(--q-primary-rgb), 0.18);
      }
    }

    :deep(.q-expansion-item) {
      border-radius: 12px;
      overflow: hidden;
      margin: 8px 0;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.5);
    }

    :deep(.q-expansion-item:hover) {
      background: rgba(255, 255, 255, 0.7);
    }

    :deep(.q-expansion-item__content) {
      background: rgba(255, 255, 255, 0.3);
      padding: 16px;
    }

    textarea {
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.12);
      transition: border-color 0.2s;
      
      &:focus {
        border-color: var(--q-primary);
        outline: none;
      }
    }
  }
}

:deep(.q-dialog__backdrop) {
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.4);
}
</style>
