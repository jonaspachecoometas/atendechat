import { h, defineComponent, ref, watch, resolveComponent } from 'vue'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import 'vue3-phone-number-input/dist/vue3-phone-number-input.css'

export default defineComponent({
  name: 'VuePhoneNumberInputCompat',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String], default: '' }
  },
  emits: ['update:modelValue', 'update'],
  setup(props, { emit, attrs }) {
    const defaultCountry = (attrs.defaultCountryCode || 'BR').toString().toUpperCase()
    const countryCode = ref(defaultCountry)
    const phoneNumber = ref(props.modelValue || '')

    watch(() => props.modelValue, (val) => {
      if (val !== phoneNumber.value) phoneNumber.value = val || ''
    })

    const emitUpdatePayload = () => {
      let formatInternational = ''
      try {
        const parsed = parsePhoneNumberFromString(phoneNumber.value || '', countryCode.value)
        if (parsed && parsed.isValid()) {
          formatInternational = parsed.formatInternational()
        }
      } catch (e) {
      }

      emit('update', {
        raw: phoneNumber.value,
        countryCode: countryCode.value,
        formatInternational
      })
    }

    const onUpdateCountry = (val) => {
      countryCode.value = (val || defaultCountry).toString().toUpperCase()
      emitUpdatePayload()
    }

    const onUpdatePhone = (val) => {
      phoneNumber.value = val || ''
      emit('update:modelValue', phoneNumber.value)
      emitUpdatePayload()
    }

    return () => h(resolveComponent('PhoneNumberWithCountryCode'), {
      ...attrs,
      country_code: countryCode.value.toLowerCase(),
      phone_number: phoneNumber.value,
      'onUpdate:country_code': onUpdateCountry,
      'onUpdate:phone_number': onUpdatePhone
    })
  }
})