import { boot } from 'quasar/wrappers'
import useVuelidate from '@vuelidate/core'

// Simple linkify directive (Vue 3) to replace vue-linkify
function linkifyText(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener">${url}</a>`)
}

const linkified = {
  mounted(el) {
    if (el && el.innerHTML) {
      el.innerHTML = linkifyText(el.innerHTML)
    }
  },
  updated(el) {
    if (el && el.innerHTML) {
      el.innerHTML = linkifyText(el.innerHTML)
    }
  }
}

export default boot(async ({ app }) => {
  // Tenta registrar o plugin oficial, se disponível na versão instalada
  try {
    const maybe = await import('@vuelidate/core')
    if (maybe && maybe.VuelidatePlugin) {
      app.use(maybe.VuelidatePlugin)
    }
  } catch (e) { /* opcional */ }
  // Provide v$ globally for components using Options API + validations {}
  app.mixin({
    setup () {
      const v = useVuelidate()
      return { v$ : v }
    },
    beforeCreate() {
      // Alias $v for backward-compat ($v -> v$)
      Object.defineProperty(this, '$v', {
        get: () => (this && this.v$) || undefined
      })
    }
  })

  // Register directive
  app.directive('linkified', linkified)
})
