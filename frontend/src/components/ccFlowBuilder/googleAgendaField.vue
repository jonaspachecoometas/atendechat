<template>
  <div>
    <q-card flat class="q-pa-sm q-pb-md" style="min-height: 40px;">
      <q-card-section class="q-pa-none">
        <div class="text-subtitle2 q-mb-sm text-weight-medium">
          {{ $t('nodeForm.GoogleAgendaField') }}
        </div>
        
        <!-- Configuração do Google Calendar -->
        <div class="q-mb-sm">
          <q-select
            v-model="$attrs.element.data.googleConfigId"
            :options="googleConfigOptions"
            :label="$t('googleCalendar.config.management.title')"
            outlined
            dense
            emit-value
            map-options
            :rules="[val => !!val || $t('common.required')]"
            :hint="$t('nodeForm.googleAgenda.selectConfigHint')"
          />
        </div>
        
        <!-- Tipo de Data -->
        <div class="q-mb-sm">
          <q-select
            v-model="$attrs.element.data.dateType"
            :options="dateTypeOptions"
            :label="$t('nodeForm.googleAgenda.dateType')"
            outlined
            dense
            emit-value
            map-options
            @update:model-value="onDateTypeChange"
            :rules="[val => !!val || $t('common.required')]"
            :hint="$t('nodeForm.googleAgenda.dateTypeHint')"
          />
        </div>
        
        <!-- Dias a partir da interação -->
        <div v-if="$attrs.element.data.dateType === 'days_from_interaction'" class="q-mb-sm">
          <q-input
            v-model.number="$attrs.element.data.daysFromInteraction"
            :label="$t('nodeForm.googleAgenda.daysFromInteraction')"
            type="number"
            min="0"
            max="365"
            outlined
            dense
            :rules="[val => val >= 0 || $t('nodeForm.googleAgenda.daysRequired')]"
            :hint="$t('nodeForm.googleAgenda.daysFromInteractionHint')"
          />
        </div>
        
        <!-- Título do Evento -->
        <div class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.eventSummary"
            :label="$t('googleCalendar.events.create.modal.title.label')"
            outlined
            dense
            :rules="[val => !!val || $t('common.required')]"
            :hint="$t('nodeForm.googleAgenda.eventTitleHint')"
          />
        </div>
        
        <!-- Data e Hora de Início -->
        <div v-if="$attrs.element.data.dateType === 'custom'" class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.eventStartDateTime"
            :label="$t('googleCalendar.events.create.modal.startDateTime.label')"
            outlined
            dense
            type="datetime-local"
            :rules="[val => !!val || $t('common.required')]"
            :hint="$t('nodeForm.googleAgenda.startDateTimeHint')"
          />
        </div>
        
        <!-- Data e Hora de Fim -->
        <div v-if="$attrs.element.data.dateType === 'custom'" class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.eventEndDateTime"
            :label="$t('googleCalendar.events.create.modal.endDateTime.label')"
            outlined
            dense
            type="datetime-local"
            :rules="[val => !!val || $t('common.required')]"
            :hint="$t('nodeForm.googleAgenda.endDateTimeHint')"
          />
        </div>
        
        <!-- Descrição do Evento -->
        <div class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.eventDescription"
            :label="$t('googleCalendar.events.create.modal.description.label')"
            type="textarea"
            outlined
            dense
            autogrow
            rows="3"
            :hint="$t('nodeForm.googleAgenda.descriptionHint')"
          />
        </div>
        
        <!-- Localização -->
        <div class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.eventLocation"
            :label="$t('googleCalendar.events.create.modal.location.label')"
            outlined
            dense
            :hint="$t('nodeForm.googleAgenda.locationHint')"
          />
        </div>
        
        <!-- Participantes -->
        <div class="q-mb-sm">
          <q-input
            v-model="$attrs.element.data.eventAttendees"
            :label="$t('googleCalendar.events.create.modal.attendees.label')"
            outlined
            dense
            :hint="$t('googleCalendar.events.create.modal.attendees.hint')"
          />
        </div>
        
        <!-- Opções de Criação -->
        <div class="row q-col-gutter-sm q-mb-sm">
          <div class="col-12 col-md-6">
            <q-toggle
              v-model="$attrs.element.data.sendNotifications"
              :label="$t('nodeForm.googleAgenda.sendNotifications')"
              color="primary"
            />
          </div>
          <div class="col-12 col-md-6">
            <q-toggle
              v-model="$attrs.element.data.reminderBefore"
              :label="$t('nodeForm.googleAgenda.reminderBefore')"
              color="primary"
            />
          </div>
        </div>
        
        <!-- Minutos antes do lembrete -->
        <div v-if="$attrs.element.data.reminderBefore" class="q-mb-sm">
          <q-input
            v-model.number="$attrs.element.data.reminderMinutes"
            :label="$t('nodeForm.googleAgenda.reminderMinutes')"
            type="number"
            min="1"
            max="1440"
            outlined
            dense
            :hint="$t('nodeForm.googleAgenda.reminderMinutesHint')"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ListarConfiguracoesGoogleCalendar } from 'src/service/googleCalendar'

export default {
  name: 'GoogleAgendaField',
  data () {
    return {
      googleConfigs: [],
      dateTypeOptions: [
        { label: this.$t('nodeForm.googleAgenda.today'), value: 'today' },
        { label: this.$t('nodeForm.googleAgenda.tomorrow'), value: 'tomorrow' },
        { label: this.$t('nodeForm.googleAgenda.days_from_interaction'), value: 'days_from_interaction' },
        { label: this.$t('nodeForm.googleAgenda.custom'), value: 'custom' }
      ]
    }
  },
  computed: {
    googleConfigOptions() {
      return this.googleConfigs
        .filter(config => config.googleAccessToken && config.googleRefreshToken)
        .map(config => ({
          label: config.name,
          value: config.id
        }))
    }
  },
  methods: {
    async carregarConfiguracoesGoogle() {
      try {
        const response = await ListarConfiguracoesGoogleCalendar()
        if (response.data && response.data.configs) {
          this.googleConfigs = response.data.configs
        }
      } catch (error) {
        console.error('Erro ao carregar configurações do Google Calendar:', error)
      }
    },
    initializeData() {
      // Inicializar dados padrão se não existirem
      if (this.$attrs.element.data.googleConfigId === undefined) {
        this.$attrs.element.data.googleConfigId = ''
      }
      if (this.$attrs.element.data.eventSummary === undefined) {
        this.$attrs.element.data.eventSummary = ''
      }
      if (this.$attrs.element.data.eventStartDateTime === undefined) {
        // Data atual + 1 hora como padrão
        const now = new Date()
        now.setHours(now.getHours() + 1)
        this.$attrs.element.data.eventStartDateTime = now.toISOString().slice(0, 16)
      }
      if (this.$attrs.element.data.eventEndDateTime === undefined) {
        // Data atual + 2 horas como padrão
        const now = new Date()
        now.setHours(now.getHours() + 2)
        this.$attrs.element.data.eventEndDateTime = now.toISOString().slice(0, 16)
      }
      if (this.$attrs.element.data.eventDescription === undefined) {
        this.$attrs.element.data.eventDescription = ''
      }
      if (this.$attrs.element.data.eventLocation === undefined) {
        this.$attrs.element.data.eventLocation = ''
      }
      if (this.$attrs.element.data.eventAttendees === undefined) {
        this.$attrs.element.data.eventAttendees = ''
      }
      if (this.$attrs.element.data.sendNotifications === undefined) {
        this.$attrs.element.data.sendNotifications = true
      }
      if (this.$attrs.element.data.reminderBefore === undefined) {
        this.$attrs.element.data.reminderBefore = false
      }
      if (this.$attrs.element.data.reminderMinutes === undefined) {
        this.$attrs.element.data.reminderMinutes = 15
      }
      if (this.$attrs.element.data.dateType === undefined) {
        this.$attrs.element.data.dateType = 'today'
      }
      if (this.$attrs.element.data.daysFromInteraction === undefined) {
        this.$attrs.element.data.daysFromInteraction = 0
      }
    },
    onDateTypeChange(val) {
      if (val === 'days_from_interaction') {
        this.$attrs.element.data.daysFromInteraction = 0
      }
    }
  },
  mounted() {
    this.initializeData()
    this.carregarConfiguracoesGoogle()
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

.q-toggle {
  .q-toggle__inner {
    color: var(--q-primary);
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
