import * as searchApi from '../../api/search'

const state = {
  searchInput: '',
  searchResults: null,
};


const actions = {
  search({commit, rootState}, {input}) {
    let userId = rootState.auth.user ? rootState.auth.user.id : null
    input.userId = userId
    console.log(input)
    searchApi.search((data => {
      commit('saveSearchResults', data)
    }), input)
  }
};

const mutations = {
  'saveSearchInput'(state, input) {
    state.searchInput = input
  },

  'saveSearchResults'(state, searchResults) {
    state.searchResults = searchResults
  },

};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
