import * as photoApi from '../../api/photos'

const state = {
  photos: [],
  favourites: [],
  albums: [],
};


const actions = {

  fetchPhotos({commit, state}) {
    photoApi.fetchPhotos((data) => {
      commit('savePhotos', {photos: data})
    })
  },

  fetchFavourites({commit, state}) {
    photoApi.fetchFavourites((data => {
      commit('saveFavourites', {favourites: data})
      console.log(data)
    }))
  }

};

const mutations = {
  'savePhotos'(state, photos) {
    state.photos = photos
  },
  'saveFavourites'(state, favourites) {
    state.favourites = favourites
  }
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
