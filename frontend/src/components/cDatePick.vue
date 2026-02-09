<template>
  <div>
    <q-input
      class="full-width"
      hide-bottom-space
      outlined
      stack-label
      type="date"
      bottom-slots
      v-bind="$attrs"
      :class="classAtrrs"
      :model-value="cValue"
      @update:model-value="onModelUpdate"
      :error="cError"
      :error-message="cErrorMessage"
      :ruler="[val => dateIsValid(val) || $t('common.invalidDate')]"
    >
      <template v-slot:append>
        <q-icon
          name="event"
          class="cursor-pointer q-mr-sm"
        >
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              :model-value="cQDate"
              today-btn
              mask="DD/MM/YYYY"
              @update:model-value="emitDate"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script>
import { format, parse, isValid } from 'date-fns'

export default {
  name: 'ccInputDate',
  inheritAttrs: false,
  data () {
    return {
      date: null,
      dateSelect: null
    }
  },
  props: {
    modelValue: [String, Date],
    value: [String, Date],
    validator: {
      type: Object,
      default: null
    },
    initValue: {
      type: [String, Date],
      default: null
    },
    error: {
      type: [String, Boolean, Number],
      default: 'NI' // Não Informada
    },
    errorMessage: {
      type: [String, Boolean, Number],
      default: '' // Não Informada
    },
    classAtrrs: {
      type: String,
      default: () => ''
    },
    icon: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    initValue (v) {
      this.dateFormated(v)
    }
  },
  computed: {
    hasErrors () {
      try {
        return !!(this.validator && this.validator.$dirty && this.validator.$invalid)
      } catch (e) {
        return false
      }
    },
    firstErrorMessage () {
      try {
        const errs = this.validator && this.validator.$errors
        if (errs && errs.length) {
          return errs[0].$message || this.$t?.('common.invalidField') || 'Campo inválido'
        }
      } catch (e) { /* ignore */ }
      return ''
    },
    cValue () {
      const base = this.modelValue !== undefined ? this.modelValue : this.value
      return base ? base : this.dateSelect ? format(parse(this.dateSelect, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : null
    },
    cQDate () {
      if (isValid(this.cValue)) {
        return format(this.cValue, 'dd/MM/yyyy')
      }
      return this.cValue ? format(parse(this.cValue, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : format(new Date(), 'dd/MM/yyyy')
    },
    cError () {
      if (this.error == 'NI') {
        return this.hasErrors
      }
      return this.error
    },
    cErrorMessage () {
      if (this.errorMessage == '') {
        return this.firstErrorMessage
      }
      return this.errorMessage
    },
    iconElment: {
      cache: false,
      get () {
        const defaultConfig = { name: null, size: '24px', color: '#000' }
        const data = { ...defaultConfig, ...this.icon }
        if (!data.name) {
          return defaultConfig
        } else {
          return data
        }
      }
    }
  },
  methods: {
    onModelUpdate (val) {
      // passthrough update
      this.$emit('update:modelValue', val)
      this.$emit('input', val)
    },
    emitDate (d, r, dt) {
      let date = d
      if (!date) {
        date = `${dt.day}/${dt.month}/${dt.year}`
      }
      const parseDate = parse(date, 'dd/MM/yyyy', new Date())
      const formatted = format(parseDate, 'yyyy-MM-dd')
      // garantir que v-model seja atualizado ao selecionar no calendário
      this.$emit('update:modelValue', formatted)
      // manter compatibilidade com listeners antigos
      this.$emit('input', formatted)
      this.$refs.qDateProxy.hide()
    },
    dateIsValid (d) {
      return this.cValue ? isValid(d) : true
    }
  }
}
</script>

<style scoped>
</style>
