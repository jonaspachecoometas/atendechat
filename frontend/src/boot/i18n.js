import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import es from 'src/components/i18n/es.js'
import en from 'src/components/i18n/en.js'
import pt from 'src/components/i18n/pt.js'
import ar from 'src/components/i18n/ar.js'
import de from 'src/components/i18n/de.js'
import it from 'src/components/i18n/it.js'
import fr from 'src/components/i18n/fr.js'
import zh from 'src/components/i18n/zh.js'
import ja from 'src/components/i18n/ja.js'

// Converte TODO '@' ASCII em '＠' (U+FF20).
// Também normaliza '@@' para um único '＠' para não duplicar visualmente.
function escapeSingleAt (str) {
  let out = ''
  for (let i = 0; i < str.length; i++) {
    const ch = str[i]
    if (ch === '@') {
      const next = i + 1 < str.length ? str[i + 1] : ''
      if (next === '@') { out += '＠'; i += 1; continue }
      out += '＠'
      continue
    }
    out += ch
  }
  return out
}

// Mantido por compatibilidade caso seja reutilizado no futuro
function hasUnescapedAt (str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '@') return true
  }
  return false
} 

function deepEscape (obj) {
  if (typeof obj === 'string') return obj.includes('@') ? escapeSingleAt(obj) : obj
  if (Array.isArray(obj)) return obj.map(deepEscape)
  if (obj && typeof obj === 'object') {
    const out = {}
    for (const k in obj) out[k] = deepEscape(obj[k])
    return out
  }
  return obj
}

const rawMessages = { es, en, pt, ar, de, it, fr, zh, ja }
// Converte todos '@' ASCII para '＠' (U+FF20) nas mensagens carregadas
const fixedMessages = deepEscape(rawMessages)

const i18n = createI18n({
  legacy: true,
  globalInjection: true,
  locale: localStorage.getItem('language') || 'pt',
  fallbackLocale: 'en',
  messages: fixedMessages
})

export default boot(({ app }) => {
  app.use(i18n)
  // Garante $t global mesmo se não for injetado pela lib
  const gp = app.config.globalProperties || {}
  if (typeof gp.$t !== 'function') {
    gp.$t = (...args) => i18n.global.t(...args)
    app.config.globalProperties = gp
  }
  // Debug: loga a key que causar erro no parser, para facilitar diagnóstico
  try {
    const composer = i18n.global
    const origT = composer.t.bind(composer)
    composer.t = (...args) => {
      try {
        return origT(...args)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('[i18n.t] error for key:', args[0], 'locale:', composer.locale, e)
        throw e
      }
    }
    if (app.config.globalProperties && app.config.globalProperties.$t) {
      const origLegacyT = app.config.globalProperties.$t.bind(app.config.globalProperties)
      app.config.globalProperties.$t = (...args) => {
        try { return origLegacyT(...args) } catch (e) {
          // eslint-disable-next-line no-console
          console.error('[$t] error for key:', args[0], 'locale:', composer.locale, e)
          throw e
        }
      }
    }
  } catch (_) { /* noop */ }
})

export { i18n }
