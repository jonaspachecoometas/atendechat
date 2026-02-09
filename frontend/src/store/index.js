import { createStore } from 'vuex'
import user from './modules/user.js'
import whatsapp from './modules/whatsapp.js'
import atendimentoTicket from './modules/atendimentoTicket.js'
import notifications from './modules/Notifications.js'
import chatFlow from './modules/chatFlow.js'
import usersApp from './modules/usersApp.js'
import getters from './getters.js'
// import example from './module-example'
import chatPrivado  from './modules/chatPrivado.js'
import webphone from './modules/webphone.js'
import webphone_novo from './modules/webphone_novo.js'
import asterisk from './modules/asterisk.js'


/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function () {
  const Store = createStore({
    getters,
    modules: {
      // example
      user,
      notifications,
      atendimentoTicket,
      whatsapp,
      chatFlow,
      usersApp,
      chatPrivado,
      webphone,
      webphone_novo,
      asterisk
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
