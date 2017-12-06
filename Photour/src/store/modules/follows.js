import * as followsApi from '../../api/follows'

const state = {
  fans: null,
  followings: null,
  followingsId: null,
  fansId: null,
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
    state.fansId = follows.fans.map(fan => {
      return parseInt(fan.follower_id)
    })
    state.followingsId = follows.followings.map(following => {
      return parseInt(following.following_id)
    })
  },

  'addFollows'(state, followId) {
    state.followingsId.unshift(followId)
  },

  'removeFollows'(state, followId) {
    state.followingsId.splice(state.followingsId.indexOf(followId), 1)
  }
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
