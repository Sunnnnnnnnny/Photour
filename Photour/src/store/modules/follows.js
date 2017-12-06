import * as followsApi from '../../api/follows'

const state = {
  fans: null,
  followings: null
};


const actions = {
  fetchFollows({commit}, userId) {
    followsApi.fetchFollows((data => {
      commit('saveFollows', data)
    }), userId)
  },

  editFollows({commit}, {info, onSuccess, onError}) {
    followsApi.editFollows((data => {
      if (info.isFollowing) {
        commit('addFollows', info.followId)
      } else {
        commit('removeFollows', info.followId)
      }
      if (data.message === 'success') {
        if (onSuccess) {
          onSuccess()
        }
      } else {
        onError(data.message)
      }
    }), info)
  }
};

const mutations = {
  'saveFollows'(state, follows) {
    state.fans = follows.fans
    state.followings = follows.followings
  },

  'addFollows'(state, followId) {
    state.followings.unshift(followId)
  },

  'removeFollows'(state, followId) {
    state.followings.splice(state.followings.indexOf(followId), 1)
  }
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
