import * as authApi from '../../api/auth'

const state = {
  isSignIn: false,
}

// actions 可异步
const actions = {

}

// mutations 必须同步
const mutations = {
  'goSignIn' (state) {
    state.isSignIn = true;
  },

  'goSignUp' (state) {
    state.isSignIn = false;
  },

};

export default {
  state,
  // getters,
  actions,
  mutations
}
