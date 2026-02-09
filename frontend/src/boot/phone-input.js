import { boot } from 'quasar/wrappers'
import VuePhoneNumberInput from 'vue3-phone-number-input'
import 'vue3-phone-number-input/dist/vue3-phone-number-input.css'

export default boot(({ app }) => {
  // Instala o plugin para registrar o componente global
  app.use(VuePhoneNumberInput, {
    placeholder: null,
    countryPlaceholder: null,
    countryLebel: null
  })
})

