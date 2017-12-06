import * as eventApi from '../../api/event'

const state = {
  events: []
};


const actions = {
  createEvent({rootState}, {eventInfo, onSuccess, onError}) {
    let userId = rootState.auth.user ? rootState.auth.user.id : null
    eventInfo.userId = userId
    console.log(userId)
    eventApi.createEvent((data => {
      if (data.message === 'success') {
        if (onSuccess) {
          onSuccess()
        }
      } else {
        onError(data.message)
      }
    }), eventInfo)
  },

  fetchEvents({commit}, userId) {
    eventApi.fetchEvents((data => {
      commit('saveEvents', data)
    }), userId)
  },

  fetchAllEvents({commit}) {
    eventApi.fetchAllEvents((data => {
      commit('saveEvents', data)
    }))
  }
};

const mutations = {
  'saveEvents'(state, events) {
    state.events = events
  }
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
