<template>
  <div class="business-hours">
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 q-pa-xs" v-for="dia in businessHours" :key="dia.day">
        <q-card flat bordered>
          <q-card-section :class="[cardSectionBg, 'q-pa-sm']">
            <div class="text-subtitle2 text-weight-bold">{{ dia.label }}</div>
          </q-card-section>

          <q-card-section class="q-pa-sm">
            <div class="row q-col-gutter-xs">
              <div class="col-12">
                <q-radio
                  v-model="dia.type"
                  val="O"
                  :label="$t('businessHours.types.L')"
                  color="positive"
                  dense
                  class="text-caption"
                  @update:model-value="emitChange"
                />
              </div>
              <div class="col-12">
                <q-radio
                  v-model="dia.type"
                  val="C"
                  :label="$t('businessHours.types.B')"
                  color="negative"
                  dense
                  class="text-caption"
                  @update:model-value="emitChange"
                />
              </div>
              <div class="col-12">
                <q-radio
                  v-model="dia.type"
                  val="H"
                  :label="$t('businessHours.types.H')"
                  color="primary"
                  dense
                  class="text-caption"
                  @update:model-value="emitChange"
                />
              </div>
            </div>

            <q-slide-transition>
              <div v-show="dia.type === 'H'" class="q-mt-xs">
                <div class="row q-col-gutter-xs items-center">
                  <div class="col-5">
                    <q-input
                      dense
                      outlined
                      type="time"
                      v-model="dia.hr1"
                      :label="$t('businessHours.labels.start')"
                      class="text-caption"
                      :rules="[val => validateTime(val) || $t('businessHours.warnings.invalidHour')]"
                      @update:model-value="() => { validatePeriods(dia); emitChange(); }"
                    />
                  </div>
                  <div class="col-2 text-center text-caption text-weight-medium">
                    {{ $t('businessHours.labels.to') }}
                  </div>
                  <div class="col-5">
                    <q-input
                      dense
                      outlined
                      type="time"
                      v-model="dia.hr2"
                      :label="$t('businessHours.labels.end')"
                      class="text-caption"
                      :rules="[val => validateTime(val) || $t('businessHours.warnings.invalidHour')]"
                      @update:model-value="() => { validatePeriods(dia); emitChange(); }"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-xs items-center q-mt-xs">
                  <div class="col-5">
                    <q-input
                      dense
                      outlined
                      type="time"
                      v-model="dia.hr3"
                      :label="$t('businessHours.labels.start')"
                      class="text-caption"
                      :rules="[val => validateTime(val) || $t('businessHours.warnings.invalidHour')]"
                      @update:model-value="() => { validatePeriods(dia); emitChange(); }"
                    />
                  </div>
                  <div class="col-2 text-center text-caption text-weight-medium">
                    {{ $t('businessHours.labels.to') }}
                  </div>
                  <div class="col-5">
                    <q-input
                      dense
                      outlined
                      type="time"
                      v-model="dia.hr4"
                      :label="$t('businessHours.labels.end')"
                      class="text-caption"
                      :rules="[val => validateTime(val) || $t('businessHours.warnings.invalidHour')]"
                      @update:model-value="() => { validatePeriods(dia); emitChange(); }"
                    />
                  </div>
                </div>

                <div v-if="hasTimeOverlap(dia)" class="text-negative q-mt-sm text-caption">
                  <q-icon name="warning" class="q-mr-xs" />
                  {{ $t('businessHours.warnings.overlap') }}
                </div>
                <div v-if="hasInvalidPeriod(dia)" class="text-negative q-mt-sm text-caption">
                  <q-icon name="warning" class="q-mr-xs" />
                  {{ $t('businessHours.warnings.invalidPeriod') }}
                </div>
              </div>
            </q-slide-transition>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessHours',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      businessHours: [
        { day: 0, label: this.$t('businessHours.days.0'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 1, label: this.$t('businessHours.days.1'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 2, label: this.$t('businessHours.days.2'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 3, label: this.$t('businessHours.days.3'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 4, label: this.$t('businessHours.days.4'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 5, label: this.$t('businessHours.days.5'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' },
        { day: 6, label: this.$t('businessHours.days.6'), type: 'O', hr1: '08:00', hr2: '12:00', hr3: '14:00', hr4: '18:00' }
      ]
    }
  },
  methods: {
    validateTime(time) {
      if (!time) return false;
      const [hours, minutes] = time.split(':').map(Number);
      return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
    },
    emitChange() {
      const data = JSON.parse(JSON.stringify(this.businessHours));
      this.$emit('input', data);
      this.$emit('update:value', data);
    },
    timeToMinutes(time) {
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
    }
  },
  watch: {
    value: {
      handler(newVal) {
        // Se receber array vazio, manter array vazio (liberado para todos os dias)
        // Se receber array com dados, usar os dados
        if (Array.isArray(newVal)) {
          if (newVal.length === 0) {
            // Array vazio = liberado, limpar businessHours interno
            this.businessHours = [];
          } else {
            this.businessHours = JSON.parse(JSON.stringify(newVal));
          }
        } else if (newVal === null || newVal === undefined) {
          // Se for null/undefined, tratar como array vazio (liberado)
          this.businessHours = [];
        }
      },
      immediate: true
    }
  },
  computed: {
    cardSectionBg() {
      return this.$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2';
    }
  },
  mounted() {
    // Se o value inicial for array vazio, não emitir nada (já está liberado)
    // Se tiver dados ou não tiver value, emitir os dados atuais
    this.$nextTick(() => {
      if (this.value && Array.isArray(this.value) && this.value.length === 0) {
        // Array vazio = já está liberado, não precisa emitir
        return;
      }
      // Se não tiver value ou tiver dados, emitir os dados atuais
      if (!this.value || (Array.isArray(this.value) && this.value.length > 0)) {
        this.emitChange();
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.business-hours {
  .q-card {
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 1px 5px rgba(0,0,0,0.2);
    }
  }
}
</style> 