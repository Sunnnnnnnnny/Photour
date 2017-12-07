import * as authApi from '../../api/auth'

const state = {
  isSignIn: false,
  user: null,
  currentUser: null,
  currentPage: 'MyEvents'
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
    localStorage.setItem('token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjExLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3VzZXIvbG9naW4iLCJpYXQiOjE1MTIzOTU2NTAsImV4cCI6MTUxMjM5OTI1MCwibmJmIjoxNTEyMzk1NjUwLCJqdGkiOiIxRm1Xa0t1bU9XcUV0OFh3In0.yLsZUJ27kx4OspPezf7Trtjeu4gTeaxptut2TcF8EZU")
    commit('saveUser', null)
    if (onSuccess) {
      onSuccess(username)
    }
  },

  refreshUser({dispatch}, {onSuccess, onError}) {
    const token = localStorage.getItem('token')
    if (token !== null) {
      dispatch('fetchUser', {onSuccess, onError})
    }
  },

  fetchUser({commit, state}, {onSuccess, onError}) {
    let token = localStorage.getItem('token');
    authApi.currentUser((data => {
      console.log(data)
      commit('saveUser', data.user.user)
      if (data.message === 'success') {
        if (onSuccess) {
          onSuccess(state.user.username)
        }
      } else {
        onError('登录已过期，请重新登录！')
      }

    }), token)
  },

  fetchCurrentUserById({commit}, userId) {
    authApi.fetchCurrentUserById((data => {
      commit('saveCurrentUser', data.user[0])
    }), userId)
  },

  editUserInfo({state}, {userInfo, onSuccess, onError}) {
    let userId = state.user ? state.user.id : null
    userInfo.userId = userId
    authApi.editUserInfo((data => {
      if (data.message === 'success') {
        if (onSuccess) {
          onSuccess('修改成功！')
        }
      } else {
        onError(data.message)
      }
    }), userInfo)
  },

  editUserPw({state}, {pwInfo, onSuccess, onError}) {
    let userId = state.user ? state.user.id : null
    pwInfo.userId = userId
    authApi.editUserPw((data => {
      if (data.message === 'success') {
        if (onSuccess) {
          onSuccess('修改成功！')
        }
      } else {
        onError(data.message)
      }
    }), pwInfo)
  },

  editUserTags({state}, {tags, onSuccess, onError}) {
    let editInfo = {
      userId: state.user ? state.user.id : null,
      tags: tags
    }
    authApi.editUserTags((data => {
      if (data.message === 'success') {
        if (onSuccess) {
          onSuccess('修改成功！')
        }
      } else {
        onError(data.message)
      }
    }), editInfo)
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
  },

  'saveCurrentUser'(state, currentUser) {
    state.currentUser = currentUser
  },

  'saveCurrentPage'(state, currentPage) {
    state.currentPage = currentPage
  }

};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
