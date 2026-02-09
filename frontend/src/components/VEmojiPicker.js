import { h, defineComponent } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

export const VEmojiPicker = defineComponent({
  name: 'VEmojiPicker',
  inheritAttrs: false,
  props: {
    // Tamanho do emoji (px ou string CSS). Ex.: 18, '18px'
    emojiSize: {
      type: [Number, String],
      default: 18
    },
    // Número de colunas (altera a largura dos botões via flex-basis)
    columns: {
      type: Number,
      default: 16
    },
    // Tamanho dos ícones do cabeçalho (opcional)
    headerIconSize: {
      type: [Number, String],
      default: 16
    }
  },
  emits: ['select'],
  setup(props, { emit, attrs }) {
    const onSelect = (payload) => {
      let value = null
      try {
        if (payload && typeof payload === 'object') {
          value = payload.data || payload.i || payload.emoji || payload.native || null
        } else if (typeof payload === 'string') {
          value = payload
        }
      } catch (e) { /* noop */ }
      emit('select', { data: value })
    }
    // Gerar um escopo de estilo por instância para evitar impacto global
    const scopeId = `vemoji_${Math.random().toString(36).slice(2, 8)}`
    const toPx = (v) => (typeof v === 'number' ? `${v}px` : v)
    const size = props.emojiSize ? toPx(props.emojiSize) : null
    const headerSize = props.headerIconSize ? toPx(props.headerIconSize) : null
    const basis = props.columns ? `${(100 / props.columns).toFixed(4)}%` : null

    const rules = []
    if (size || basis) {
      const parts = []
      if (size) parts.push(`font-size:${size} !important`)
      if (basis) parts.push(`flex-basis:${basis} !important;max-width:${basis} !important`)
      rules.push(`.vemoji-scope[data-scope='${scopeId}'] .v3-emoji-picker .v3-emojis button{${parts.join(';')}}`)
    }
    if (headerSize) {
      rules.push(`.vemoji-scope[data-scope='${scopeId}'] .v3-emoji-picker .v3-header .v3-groups .v3-group{font-size:${headerSize} !important}`)
    }
    const styleTag = rules.length
      ? h('style', { type: 'text/css' }, rules.join('\n'))
      : null

    return () => h(
      'div',
      { class: 'vemoji-scope', 'data-scope': scopeId },
      [
        styleTag,
        h(EmojiPicker, { ...attrs, onSelect })
      ]
    )
  }
})

// Variante pré-configurada ainda menor
export const VEmojiPickerSmall = defineComponent({
  name: 'VEmojiPickerSmall',
  props: {
    emojiSize: { type: [Number, String], default: 16 },
    columns: { type: Number, default: 20 },
    headerIconSize: { type: [Number, String], default: 14 }
  },
  emits: ['select'],
  setup (props, { emit, attrs }) {
    // Reutiliza o wrapper principal passando props menores
    return () => h(VEmojiPicker, { ...attrs, ...props, onSelect: (e) => emit('select', e) })
  }
})

export default VEmojiPicker
