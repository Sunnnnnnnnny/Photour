import * as commentsApi from '../../api/comments'

const state = {
  comments: []
};


const actions = {
  addComment({commit, rootState}, {info, onSuccess, onError}) {
    let userId = rootState.auth.user ? rootState.auth.user.id : null
    info.userId = userId
    console.log(info)
    commentsApi.addComment((data => {
      if (data.message === 'success') {
        commit('addComment', data.comment)
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
  'saveComments'(state, comments) {
    state.comments = comments
  },
  'addComment'(state, comment) {
    state.comments.unshift(comment)
  }
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
