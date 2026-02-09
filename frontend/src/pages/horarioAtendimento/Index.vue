<template>
  <div v-if="(userProfile === 'admin' || (userProfile === 'super'  && pageAllowed))">
    <q-card class="q-ma-sm" square style="border-radius: 8px !important;">
      <div class="text-h5 q-pa-sm q-ma-sm">
        {{ $t("horarioAtendimento.title") }}
        <q-icon name="help">
          <q-tooltip content-class="bg-light-blue-1 text-black q-pa-sm shadow-4">
            <span class="text-weight-medium">{{ $t("common.types") }}</span>
            <span class="row col">{{ $t("horarioAtendimento.tooltips.open") }}</span>
            <span class="row col">{{ $t("horarioAtendimento.tooltips.closed") }}</span>
            <span class="row col">{{ $t("horarioAtendimento.tooltips.schedule") }}</span>
            <span class="row col">{{ $t("horarioAtendimento.tooltips.important") }}</span>
          </q-tooltip>
        </q-icon>

        <q-btn
          color="primary"
          :label="$t('common.save')"
          class="float-right"
          @click="async () => { 
            const horariosOk = await this.salvarHorariosAtendimento(); 
            if (horariosOk) { 
              this.salvarMensagemAusencia(); 
              this.salvarFeriados(); 
            } 
          }"
        />
      </div>
      <q-separator />
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div
            class="col-xs-12 col-sm-4 q-mt-sm"
            v-for="dia in businessHours"
            :key="dia.value"
          >
            <q-card square bordered flat>
              <div class="text-body1 text-bold bg-grey-3 q-pa-xs q-pl-sm">
                {{ dia.label }}
              </div>
              <q-separator />
              <q-card-section class="q-pt-none">
                <q-option-group
                  inline
                  class="row justify-between q-mb-md"
                  v-model="dia.type"
                  :options="optType"
                  color="primary"
                />

                <div class="row items-baseline q-gutter-sm">
                  <q-input
                    :disable="dia.type !== 'H'"
                    dense
                    outlined
                    class="col-grow"
                    type="time"
                    v-model="dia.hr1"
                    :rules="[val => validateTime(val) || $t('businessHours.warnings.invalidHour')]"
                    @update:model-value="() => validatePeriods(dia)"
                  />
                  <h6>{{ $t("horarioAtendimento.labels.time") }}</h6>
                  <q-input
                    :disable="dia.type !== 'H'"
                    dense
                    outlined
                    class="col-grow"
                    type="time"
                    v-model="dia.hr2"
                    :rules="[val => validateTime(val) || $t('businessHours.warnings.invalidHour')]"
                    @update:model-value="() => validatePeriods(dia)"
                  />
                </div>
                <div class="row items-baseline q-gutter-sm">
                  <q-input
                    :disable="dia.type !== 'H'"
                    dense
                    outlined
                    class="col-grow"
                    type="time"
                    v-model="dia.hr3"
                    :rules="[val => validateTime(val) || $t('businessHours.warnings.invalidHour')]"
                    @update:model-value="() => validatePeriods(dia)"
                  />
                  <h6>{{ $t("horarioAtendimento.labels.time") }}</h6>
                  <q-input
                    :disable="dia.type !== 'H'"
                    dense
                    outlined
                    class="col-grow"
                    type="time"
                    v-model="dia.hr4"
                    :rules="[val => validateTime(val) || $t('businessHours.warnings.invalidHour')]"
                    @update:model-value="() => validatePeriods(dia)"
                  />
                </div>

                <div v-if="hasTimeOverlap(dia)" class="text-negative q-mt-sm text-caption">
                  <q-icon name="warning" class="q-mr-xs" />
                  {{ $t('businessHours.warnings.overlap') }}
                </div>
                <div v-if="hasInvalidPeriod(dia)" class="text-negative q-mt-sm text-caption">
                  <q-icon name="warning" class="q-mr-xs" />
                  {{ $t('businessHours.warnings.invalidPeriod') }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card square bordered class="q-ma-sm full-full-height" style="border-radius: 8px !important;">
      <div class="text-h6 q-pa-sm q-ma-sm">
        {{ $t("horarioAtendimento.labels.absenceMessage") }}
        <q-btn
          color="positive"
          :label="$t('common.save')"
          class="float-right"
          @click="async () => { 
            const horariosOk = await this.salvarHorariosAtendimento(); 
            if (horariosOk) { 
              this.salvarMensagemAusencia(); 
              this.salvarFeriados(); 
            } 
          }"
        />
      </div>
      <q-card-section class="q-pt-none">
        <div class="row items-center">
          <div class="col-xs-3 col-sm-2 col-md-1">
            <q-btn round flat class="q-ml-sm">
              <q-icon size="2em" name="mdi-emoticon-happy-outline" />
              <q-tooltip>{{ $t("common.emoji") }}</q-tooltip>
              <q-menu anchor="top right" self="bottom middle" :offset="[5, 40]">
                <VEmojiPicker
                  style="width: 40vw"
                  :showSearch="false"
                  :emojisByRow="20"
                  :labelSearch="$t('common.search')"
                  lang="pt-BR"
                  @select="onInsertSelectEmoji"
                />
              </q-menu>
            </q-btn>
          </div>
          <div class="col-xs-8 col-sm-10 col-md-11 q-pl-sm">
            <textarea
              ref="inputEnvioMensagem"
              style="min-height: 9vh; max-height: 9vh;"
              class="q-pa-sm bg-white full-width"
              :placeholder="$t('common.typeMessage')"
              v-model="messageBusinessHours"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card square bordered class="q-ma-sm full-full-height" style="border-radius: 8px !important;">
      <div class="text-h6 q-pa-sm q-ma-sm">
        {{ $t("horarioAtendimento.labels.holidays") }}
        <q-btn
          color="positive"
          :label="$t('common.save')"
          class="float-right"
          @click="async () => { 
            const horariosOk = await this.salvarHorariosAtendimento(); 
            if (horariosOk) { 
              this.salvarMensagemAusencia(); 
              this.salvarFeriados(); 
            } 
          }"
        />
      </div>
      <q-card-section class="q-pt-none">
        <q-banner class="bg-info text-white q-mb-md">
          <template v-slot:avatar>
            <q-icon name="info" />
          </template>
          {{ $t('horarioAtendimento.labels.holidaysInfo') }}
        </q-banner>
        <div class="row q-col-gutter-sm">
          <div class="col-12">
            <q-list bordered separator>
              <q-item v-for="(holiday, index) in holidays" :key="index">
                <q-item-section>
                  <q-item-label>{{ holiday.description }}</q-item-label>
                  <q-item-label caption>
                    {{ formatarData(holiday.date) }}
                    <q-badge
                      v-if="holiday.active"
                      color="negative"
                      class="q-ml-sm"
                    >
                      {{ $t('horarioAtendimento.labels.closed') }}
                    </q-badge>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle
                    v-model="holiday.active"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    flat
                    round
                    dense
                    color="negative"
                    icon="delete"
                    @click="removerFeriado(index)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-12 q-mt-md">
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="novoFeriado.date"
                  filled
                  type="date"
                  :label="$t('horarioAtendimento.labels.holidayDate')"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="novoFeriado.description"
                  filled
                  :label="$t('horarioAtendimento.labels.holidayDescription')"
                />
              </div>
            </div>
            <div class="row justify-end q-mt-sm">
              <q-btn
                color="primary"
                :label="$t('horarioAtendimento.labels.addHoliday')"
                @click="adicionarFeriado"
                :disable="!novoFeriado.date || !novoFeriado.description"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div v-else>
    <q-banner class="bg-red text-white" inline-actions>
      <q-icon name="warning" />
      <span>{{ $t('common.accessDenied') }}</span>
    </q-banner>
  </div>
</template>


<script>
import { VEmojiPicker } from 'src/components/VEmojiPicker.js'
import { MostrarCores } from 'src/service/empresas.js';
import { MostrarHorariosAtendiemento, AtualizarHorariosAtendiemento, AtualizarMensagemHorariosAtendiemento, AtualizarFeriados } from 'src/service/empresas.js'
export default {
  name: 'HorarioAtendimento',
  components: { VEmojiPicker },
  data () {
    return {
      pageAllowed: true,
      colors: {},
      userProfile: 'user',
      optType: [
        { value: 'O', label: this.$t('businessHours.types.O') },
        { value: 'C', label: this.$t('businessHours.types.C') },
        { value: 'H', label: this.$t('businessHours.types.H') },
      ],
      businessHours: [
      { day: 0, label: this.$t('businessHours.days.0'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
      { day: 1, label: this.$t('businessHours.days.1'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
      { day: 2, label: this.$t('businessHours.days.2'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
      { day: 3, label: this.$t('businessHours.days.3'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
      { day: 4, label: this.$t('businessHours.days.4'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
      { day: 5, label: this.$t('businessHours.days.5'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
      { day: 6, label: this.$t('businessHours.days.6'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
    ],
      messageBusinessHours: null,
      holidays: [],
      novoFeriado: {
        date: '',
        description: '',
        active: true
      },
      // Sistema de gerenciamento de memória
      timers: []
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
    validateTime(time) {
      if (!time) return false;
      const [hours, minutes] = time.split(':').map(Number);
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    },
    timeToMinutes(time) {
      if (!time) return 0;
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    },
    hasInvalidPeriod(dia) {
      if (dia.type !== 'H') return false;
      if (!dia.hr1 || !dia.hr2 || !dia.hr3 || !dia.hr4) return false;
      
      const startMorning = this.timeToMinutes(dia.hr1);
      const endMorning = this.timeToMinutes(dia.hr2);
      const startAfternoon = this.timeToMinutes(dia.hr3);
      const endAfternoon = this.timeToMinutes(dia.hr4);

      // Verifica se o início é maior ou igual ao fim em cada período
      return startMorning >= endMorning || startAfternoon >= endAfternoon;
    },
    hasTimeOverlap(dia) {
      if (dia.type !== 'H') return false;
      if (!dia.hr1 || !dia.hr2 || !dia.hr3 || !dia.hr4) return false;
      
      const startMorning = this.timeToMinutes(dia.hr1);
      const endMorning = this.timeToMinutes(dia.hr2);
      const startAfternoon = this.timeToMinutes(dia.hr3);
      const endAfternoon = this.timeToMinutes(dia.hr4);

      // Verifica sobreposição: se o fim da manhã é maior ou igual ao início da tarde
      // Exemplo bloqueado: 08:00-14:00 e 14:00-18:00 = sobreposição (mesmo minuto)
      // Exemplo permitido: 08:00-13:00 e 14:00-18:00 = aceito (com intervalo permitido)
      return endMorning >= startAfternoon;
    },
    hasTimeGap(dia) {
      // Removida validação de gap - agora permite intervalos entre períodos
      // Exemplo permitido: 08:00-13:00 e 14:00-18:00 (com intervalo de 1 hora)
      return false;
    },
    validatePeriods(dia) {
      // Removido ajuste automático - agora apenas valida
      if (dia.type !== 'H') return;
    },
    validateAllBusinessHours() {
      const errors = [];
      
      for (let i = 0; i < this.businessHours.length; i++) {
        const dia = this.businessHours[i];
        
        if (dia.type === 'H') {
          if (!dia.hr1 || !dia.hr2 || !dia.hr3 || !dia.hr4) {
            errors.push(`${dia.label}: ${this.$t('businessHours.warnings.missingTime')}`);
            continue;
          }

          if (this.hasInvalidPeriod(dia)) {
            errors.push(`${dia.label}: ${this.$t('businessHours.warnings.invalidPeriod')}`);
          }

          if (this.hasTimeOverlap(dia)) {
            errors.push(`${dia.label}: ${this.$t('businessHours.warnings.overlap')}`);
          }
        }
      }

      return errors;
    },
    async loadColors() {
      try {
        const response = await MostrarCores();
        if (response.status === 200) {
          const companyData = response.data[0];
          const colorsArray = companyData.systemColors;

          

          this.colors = (Array.isArray(colorsArray) ? colorsArray : []).reduce((acc, colorObj = {}) => {
            const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
            const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
            if (key && typeof val === 'string') acc[key] = val;
            return acc;
          }, {});

          

          const root = document.documentElement;
          root.style.setProperty("--q-neutral", this.colors.neutral);
          root.style.setProperty("--q-primary", this.colors.primary);
          root.style.setProperty("--q-secondary", this.colors.secondary);
          root.style.setProperty("--q-accent", this.colors.accent);
          root.style.setProperty("--q-warning", this.colors.warning);
          root.style.setProperty("--q-negative", this.colors.negative);
          root.style.setProperty("--q-positive", this.colors.positive);
          root.style.setProperty("--q-light", this.colors.light);

          

        } else {
          console.error('Erro ao carregar as cores');
        }
      } catch (error) {
        console.error('Erro ao carregar as cores:', error);
      }
    },
    onInsertSelectEmoji (emoji) {
      const self = this
      var tArea = this.$refs.inputEnvioMensagem
      // get cursor's position:
      var startPos = tArea.selectionStart,
        endPos = tArea.selectionEnd,
        cursorPos = startPos,
        tmpStr = tArea.value
      // filter:
      if (!emoji.data) {
        return
      }
      // insert:
      self.txtContent = this.messageBusinessHours
      self.txtContent = tmpStr.substring(0, startPos) + emoji.data + tmpStr.substring(endPos, tmpStr.length)
      this.messageBusinessHours = self.txtContent
      // move cursor:
      const timerId = setTimeout(() => {
        tArea.selectionStart = tArea.selectionEnd = cursorPos + emoji.data.length
      }, 10)
      this.addTimer(timerId);
    },
    async listarMensagemHorariosAtendimento () {
      const { data } = await MostrarHorariosAtendiemento()
      this.businessHours = data[0].businessHours
      this.messageBusinessHours = data[0].messageBusinessHours
    },
    async salvarHorariosAtendimento () {
      // Valida todos os horários antes de salvar
      const validationErrors = this.validateAllBusinessHours();
      
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
        console.warn('Erros de validação encontrados:', validationErrors);
        return false;
      }

      try{
        const { data } = await AtualizarHorariosAtendiemento(this.businessHours)
        this.businessHours = data.businessHours
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: this.$t('horarioAtendimento.notifications.scheduleUpdated'),
        });
        return true;
      } catch(e){
        console.log('Horário de funcionamento erro :' + e)
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: this.$t('horarioAtendimento.notifications.saveError'),
        });
        return false;
      }
    },
    async salvarMensagemAusencia () {
      try{
        const { data } = await AtualizarMensagemHorariosAtendiemento({
          messageBusinessHours: this.messageBusinessHours
        })
        this.messageBusinessHours = data.messageBusinessHours
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: this.$t('horarioAtendimento.notifications.absenceMessageUpdated'),
        });
      } catch(e){
        console.log('Mensagem de ausência erro :' + e)
      }
    },
    async listarFeriados() {
      try {
        const { data } = await MostrarHorariosAtendiemento()
        this.holidays = data[0].holidays || []
      } catch (e) {
        console.log('Erro ao carregar feriados:', e)
      }
    },
    async salvarFeriados() {
      try {
        const { data } = await AtualizarFeriados({ holidays: this.holidays })
        this.holidays = data.holidays
        this.$q.notify({
          color: 'positive',
          position: 'top',
          message: this.$t('horarioAtendimento.notifications.holidaysUpdated'),
        })
      } catch (e) {
        console.log('Erro ao salvar feriados:', e)
      }
    },
    adicionarFeriado() {
      if (this.novoFeriado.date && this.novoFeriado.description) {
        this.holidays.push({
          date: this.novoFeriado.date,
          description: this.novoFeriado.description,
          active: true
        })
        this.novoFeriado = {
          date: '',
          description: '',
          active: true
        }
      }
    },
    removerFeriado(index) {
      this.holidays.splice(index, 1)
    },
    formatarData(data) {
      if (!data) return '';
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano}`;
    },
  },
  mounted () {
    this.listarMensagemHorariosAtendimento()
    this.listarFeriados()
    this.userProfile = localStorage.getItem('profile')
    const menuPermissions = JSON.parse(localStorage.getItem('menuPermissions'))
    this.pageAllowed = menuPermissions?.horarioAtendimento === true;
    const storedColors = localStorage.getItem('storedColors');
    if (storedColors) {
      let list = []
      try { const parsed = JSON.parse(storedColors); list = Array.isArray(parsed) ? parsed : (Array.isArray(parsed?.colors) ? parsed.colors : []) } catch (_) { list = [] }
      const colors = list.reduce((acc, colorObj = {}) => {
        const key = String(colorObj.label || colorObj.name || colorObj.key || '').toLowerCase().trim();
        const val = colorObj.value ?? (key && key in colorObj ? colorObj[key] : undefined) ?? colorObj.hex ?? colorObj.color ?? null;
        if (key && typeof val === 'string') acc[key] = val;
        return acc;
      }, {});

      const root = document.documentElement;
      Object.keys(colors).forEach(key => {
        root.style.setProperty(`--q-${key}`, colors[key]);
      });
    } else {
      console.warn('Nenhuma cor armazenada no localStorage');
    }
    // this.loadColors()
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
.q-card {
  background: rgba(255,255,255,0.92);
  border-radius: 20px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.13);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0,0,0,0.06);
  transition: box-shadow 0.2s, background 0.2s;
}

.text-h5, .text-h6 {
  font-weight: 700;
  color: var(--q-primary);
}

.q-btn {
  border-radius: 4px;
  min-width: 20px;
  min-height: 20px;
  padding: 0.08rem 0.4rem;
  font-size: 0.78rem;
  transition: box-shadow 0.2s, background 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
}

.q-btn:hover {
  box-shadow: 0 2px 4px rgba(0,0,0,0.11);
  background: rgba(var(--q-primary-rgb), 0.09);
}

.q-input {
  border-radius: 8px;
}

.q-option-group {
  .q-radio {
    margin-right: 8px;
  }
}

textarea {
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.12);
  transition: border-color 0.2s;
  
  &:focus {
    border-color: var(--q-primary);
    outline: none;
  }
}

body.body--dark .q-card {
  background: rgba(30,30,30,0.98);
  box-shadow: 0 6px 32px rgba(0,0,0,0.22);
  border: 1px solid rgba(255,255,255,0.10);
}

body.body--dark textarea {
  background: rgba(40,40,40,0.92);
  border-color: rgba(255,255,255,0.12);
  color: #e0e0e0;
}

@media (max-width: 900px) {
  .q-card {
    border-radius: 12px;
    padding: 0.5rem;
  }
}

.q-banner.bg-info {
  background: #fffbe6 !important;
  color: #222 !important;
  border: 1px solid #ffe58f !important;
  border-radius: 8px;
}

body.body--dark {
  .q-banner.bg-info {
    background: #fffbe6 !important;
    color: #222 !important;
    border: 1px solid #ffe58f !important;
  }
}
</style>
