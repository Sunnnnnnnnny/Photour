import * as photoDetailsApi from '../../api/photoDetails'

const state = {
  photoUrl: null
};


const actions = {};

const mutations = {

  'savePhotoUrl'(state, {photoUrl}) {
    state.photoUrl = photoUrl;
  }

};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
