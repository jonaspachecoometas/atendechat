<template>
  <div>
    <q-input
      class="full-width"
      hide-bottom-space
      outlined
      stack-label
      type="text"
      mask="##/##/#### ##:##"
      fill-mask
      bottom-slots
      v-bind="$attrs"
      :class="classAtrrs"
      :model-value="cValue"
      @update:model-value="onModelUpdate"
      :error="cError"
      :error-message="cErrorMessage"
      :ruler="[val => dateIsValid(val) || $t('common.invalidDate')]"
    >
      <template v-slot:prepend>
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
              mask="DD/MM/YYYY HH:mm"
              @update:model-value="emitDate"
            />
          </q-popup-proxy>
        </q-icon>
      </template>
      <template v-slot:append>
        <q-icon
          name="access_time"
          class="cursor-pointer"
        >
          <q-popup-proxy
            ref="qTimeProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-time
              :model-value="cQDate"
              @update:model-value="emitDate"
              mask="DD/MM/YYYY HH:mm"
              format24h
            >
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  label="Close"
                  color="primary"
                  flat
                />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script>
import { format, parse, isValid } from 'date-fns'

export default {
  name: 'ccInputDateTime',
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
      return base ? base : this.dateSelect ? format(parse(this.dateSelect, 'dd/MM/yyyy HH:mm', new Date()), 'yyyy-MM-dd HH:mm') : null
    },
    cQDate () {
      if (isValid(this.cValue)) {
        return format(this.cValue, 'dd/MM/yyyy HH:mm')
      }
      return this.cValue ? format(parse(this.cValue, 'yyyy-MM-dd HH:mm', new Date()), 'dd/MM/yyyy HH:mm') : format(new Date(), 'dd/MM/yyyy HH:mm')
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
      this.$emit('update:modelValue', val)
      this.$emit('input', val)
    },
    emitDate (d, r, dt) {
      let date = d
      if (!date) {
        const time = format(new Date(), 'HH:mm')
        date = `${dt.day}/${dt.month}/${dt.year} ${time}`
      }
      const parseDate = parse(date, 'dd/MM/yyyy HH:mm', new Date())
      const formatted = format(parseDate, 'yyyy-MM-dd HH:mm')
      this.$emit('update:modelValue', formatted)
      this.$emit('input', formatted)
      this.$refs.qDateProxy.hide()
      this.$refs.qTimeProxy.hide()
    },
    dateIsValid (d) {
      return this.cValue ? isValid(d) : true
    }
  }
}
</script>

<style scoped>
</style>
