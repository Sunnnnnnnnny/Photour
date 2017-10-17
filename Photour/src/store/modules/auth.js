import * as authApi from '../../api/auth'

const state = {
  isSignIn: false,
}

// actions
const actions = {

}

// mutations
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
