const state = {
  isConnected: false,
  isCalling: false,
  callStatus: null
}

const mutations = {
  SET_CONNECTED(state, value) {
    state.isConnected = value
  },
  SET_CALLING(state, value) {
    state.isCalling = value
  },
  SET_CALL_STATUS(state, status) {
    state.callStatus = status
  }
}

const actions = {
  connect({ commit }) {
    commit('SET_CONNECTED', true)
  },
  disconnect({ commit }) {
    commit('SET_CONNECTED', false)
    commit('SET_CALLING', false)
    commit('SET_CALL_STATUS', null)
  },
  makeCall({ commit }, { number, status }) {
    commit('SET_CALLING', true)
    commit('SET_CALL_STATUS', status || 'connecting')
  },
  hangupCall({ commit }) {
    commit('SET_CALLING', false)
    commit('SET_CALL_STATUS', null)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
} 