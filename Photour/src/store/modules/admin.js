import * as adminApi from '../../api/admin'

const state = {
  allUsers: null,
  toDeleteId: null,
};


const actions = {

  fetchAllUsers({commit}) {
    adminApi.fetchAllUsers((data => {
      commit('saveAllUsers', data)
    }))
  },

  deleteUser({commit}, {userId, onSuccess, onError}) {
    adminApi.deleteUser((data => {
      if (data.message === 'success') {
        if (onSuccess) {
          commit('deleteUser', userId)
          onSuccess('删除成功！')
        }
      } else {
        onError(data.message)
      }
    }), userId)
  }
};

const mutations = {
  'saveAllUsers'(state, users) {
    state.allUsers = users
  },

  'saveToDeleteId'(state, userId) {
    state.toDeleteId = userId
  },

  'deleteUser'(state, userId) {
    let user = state.allUsers.filter(user => user.id = userId);
    state.allUsers.splice(state.allUsers.indexOf(user), 1);
  }


};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
