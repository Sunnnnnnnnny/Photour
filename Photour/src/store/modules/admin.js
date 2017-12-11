import * as adminApi from '../../api/admin'
import * as authApi from '../../api/auth'
import auth from "./auth";

const state = {
  allUsers: null,
  toDeleteId: null,
  userToEdit: null
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
  },

  editUser({commit}, {userInfo, onSuccess, onError}) {
    console.log('action', userInfo)
    authApi.editUserInfo((data => {
      if (data.message === 'success') {
        console.log('new', data.user)
        commit('updateUser', data.user)
        if (onSuccess) {
          onSuccess('修改成功！')
        }
      } else {
        onError(data.message)
      }
    }), userInfo)
  }

};

const mutations = {
  'saveAllUsers'(state, users) {
    state.allUsers = users
  },

  'saveToDeleteId'(state, userId) {
    state.toDeleteId = userId
  },

  'saveUserToEdit'(state, user) {
    state.userToEdit = user
  },

  'deleteUser'(state, userId) {
    let user = state.allUsers.find(user => user.id === userId);
    state.allUsers.splice(state.allUsers.indexOf(user), 1);
  },

  'updateUser'(state, newUser) {
    let user = state.allUsers.find(user => user.id === newUser.id);
    console.log('toUpdate', user)
    state.allUsers[state.allUsers.indexOf(user)] = newUser;
  }


};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
