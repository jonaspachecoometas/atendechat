import { boot } from 'quasar/wrappers'
import cInput from 'src/components/cInput.vue'
import { notificarErro, notificarSucesso } from 'src/utils/helpersNotifications.js'
import { Dark, uid } from 'quasar'
import DatePick from 'src/components/cDatePick.vue'
import cDateTimePick from 'src/components/cDateTimePick.vue'

import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
import { UpdateConfiguracoesUsuarios } from 'src/service/user.js'

const formatarValorMoeda = (num, black = false, intl = {}) => {
  const config = {
    language: 'pt-br',
    options: {
      // style: 'currency',
      // currency: 'BRL',
      // currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
      maximumFractionDigits: 3
    }
  }
  const intlConfig = {
    ...config,
    ...intl
  }
  const valor = Intl.NumberFormat(intlConfig.language, intlConfig.options).format(num)
  if (black && num <= 0.0) {
    return ''
  }
  return valor
}

const arredodar = (num, places) => {
  if (!('' + num).includes('e')) {
    return +(Math.round(num + 'e+' + places) + 'e-' + places)
  } else {
    const arr = ('' + num).split('e')
    let sig = ''
    if (+arr[1] + places > 0) {
      sig = '+'
    }
    return +(
      Math.round(+arr[0] + 'e' + sig + (+arr[1] + places)) +
      'e-' +
      places
    )
  }
}

const iniciaisString = nomecompleto => {
  if (!nomecompleto) return '';
  
  try {
    nomecompleto = nomecompleto.replace(/\s(de|da|dos|das)\s/g, ' ') // Remove os de,da, dos,das.
    const iniciais = nomecompleto.match(/\b(\w)/gi) // Iniciais de cada parte do nome.
    
    if (!iniciais || iniciais.length === 0) return '';
    
    const sobrenomes = iniciais
      .splice(1, iniciais.length - 1)
      .join('')
      .toLowerCase() // Iniciais
    const iniciaisNome = iniciais + sobrenomes
    return iniciaisNome.toUpperCase()
  } catch (error) {
    console.error('Erro ao processar iniciais:', error);
    return '';
  }
}

const formatarData = (data, formato = 'dd/MM/yyyy') => {
  if (!data) return 'dd/MM/yyyy'
  try {
    return format(parseISO(data), formato, { locale: pt })
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return 'dd/MM/yyyy'
  }
}

const setConfigsUsuario = ({ isDark }) => {
  const filtroPadrao = {
    searchParam: '',
    pageNumber: 1,
    status: ['open', 'pending'],
    showAll: false,
    count: null,
    queuesIds: [],
    whatsappIds: [],
    selectedUser: [],
    withUnreadMessages: false,
    isNotAssignedUser: false,
    includeNotQueueDefined: true
    // date: new Date(),
  }
  // this.isDark = !this.isDark
  Dark.set(isDark)
  let usuario = null
  try { usuario = JSON.parse(localStorage.getItem('usuario')) } catch (e) { usuario = null }
  const filtrosAtendimento = JSON.parse(localStorage.getItem('filtrosAtendimento')) || filtroPadrao
  const data = {
    filtrosAtendimento,
    isDark: Dark.isActive
  }
  if (usuario && usuario.userId) {
    UpdateConfiguracoesUsuarios(usuario.userId, data)
      .then(() => console.log('Configurações do usuário atualizadas'))
      .catch(err => console.error('Falha ao atualizar configs usuário', err))
    localStorage.setItem('usuario', JSON.stringify({ ...usuario, configs: data }))
  } else {
    // ainda assim persiste configs locais
    localStorage.setItem('usuario', JSON.stringify({ ...(usuario || {}), configs: data }))
  }
}

export default boot(({ app }) => {
  app.component('cInput', cInput)
  app.component('DatePick', DatePick)
  app.component('cDateTimePick', cDateTimePick)
  app.config.globalProperties.$formatarValorMoeda = formatarValorMoeda
  app.config.globalProperties.$round = arredodar
  app.config.globalProperties.$formatarData = formatarData
  app.config.globalProperties.$iniciaisString = iniciaisString
  app.config.globalProperties.$notificarErro = notificarErro
  app.config.globalProperties.$notificarSucesso = notificarSucesso
  app.config.globalProperties.$setConfigsUsuario = setConfigsUsuario
  app.config.globalProperties.$uuid = uid
})
