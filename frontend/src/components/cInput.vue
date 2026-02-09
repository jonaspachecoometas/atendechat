<template>
  <div>
    <q-input
      ref="inputCustomCodar"
      hide-bottom-space
      bottom-slots
      v-bind="$attrs"
      :label="label"
      :class="classAtrrs"
      :model-value="innerValue"
      @update:model-value="onModelUpdate"
      :error="cError"
      :error-message="cErrorMessage"
    >
      <template
        v-slot:before
        v-if="iconElment.name"
      >
        <q-icon
          :name="iconElment.name"
          :size="iconElment.size"
          :color="iconElment.color"
        />
      </template>

      <!-- Aceitar Demais Slot's -->
      <slot />
    </q-input>
  </div>
</template>
<script>
export default {
  name: 'ccInput',
  inheritAttrs: false,
  data () {
    return {
    }
  },
  props: {
    modelValue: [String, Number, Date],
    value: [String, Number, Date],
    validator: {
      type: Object,
      default: null
    },
    label: String,
    classAtrrs: {
      type: String,
      default: () => ''
    },
    error: {
      type: [String, Boolean, Number],
      default: 'NI' // Não Informada
    },
    errorMessage: {
      type: [String, Boolean, Number],
      default: '' // Não Informada
    },
    dense: {
      type: Boolean,
      default: true
    },
    icon: {
      type: Object,
      default: () => { }
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
    innerValue () {
      return this.modelValue !== undefined ? this.modelValue : this.value
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
      const next = (val === '' || val === undefined) ? null : val
      this.$emit('update:modelValue', next)
      this.$emit('input', next)
    }
  }
}
</script>

<style scoped>
</style>
