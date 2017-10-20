import * as photoApi from '../../api/photos'

const state = {
  photos: []
};


const actions = {

  fetchPhotos({commit, state}) {
    photoApi.fetchPhotos((data) => {
      commit('savePhotos', {photos: data})
      console.log(data)
    })
  }

};

const mutations = {
  'savePhotos' (state, {photos}) {
    state.photos = [
      ...state.photos,
      ...photos
    ]
  },
};

export default {
  state,
  // getters,
  actions,
  mutations
}
