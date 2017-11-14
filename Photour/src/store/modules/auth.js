import * as authApi from '../../api/auth'

const state = {
  isSignIn: false,
  user: null
}

// actions 可异步
const actions = {

  signUp({commit}, {body, onSuccess, onError}) {
    authApi.signUp((data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        onSuccess(data.success)
      }
    }), body)
  },

  signIn({dispatch}, {body, onSuccess, onError}) {
    authApi.signIn((data => {
      if (data.error !== undefined) {
        onError(data.error)
      } else {
        localStorage.setItem('token', data.token)
        console.log(data)
        dispatch('fetchUser', {onSuccess})
      }

    }), body)
  },

  signOut({commit}, {onSuccess}) {
    const username = state.user.username
    localStorage.setItem('token', null)
    commit('saveUser', null)
    if (onSuccess) {
      onSuccess(username)
    }
  },

  refreshUser({dispatch}, {onSuccess}) {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch('fetchUser', {onSuccess})
    }
  },

  fetchUser({commit, state}, {onSuccess}) {
    console.log("!!!!!!")
    let token = localStorage.getItem('token');
    authApi.currentUser((data => {
      console.log('data', data)
      commit('saveUser', data.user)
      if (onSuccess) {
        onSuccess(state.user.username)
      }
    }), token)
  }
};

// mutations 必须同步
const mutations = {
  'goSignIn'(state) {
    state.isSignIn = true;
  },

  'goSignUp'(state) {
    state.isSignIn = false;
  },

  'saveUser'(state, user) {
    state.user = user
  }

};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
