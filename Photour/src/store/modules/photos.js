import * as photoApi from '../../api/photos'

const state = {
  photos: [],
  favourites: [],
  albums: [],
};


const actions = {

  fetchPhotos({commit, state, rootState}) {
    let userId = rootState.auth.user ? rootState.auth.user.id : null
    photoApi.fetchPhotos((data) => {
      commit('savePhotos', {photos: data})
    }, userId)
  },

  fetchAlbums({commit}, {userId, onSuccess}) {
    photoApi.fetchAlbums((data) => {
      console.log(data)
      commit('saveAlbums', {albums: data})
      if (onSuccess) {
        onSuccess()
      }
    }, userId)
  },

  fetchFavourites({commit, state}) {
    photoApi.fetchFavourites((data => {
      commit('saveFavourites', {favourites: data})
      console.log(data)
    }))
  },

  likePhotos({commit}, likeInfo) {
    photoApi.likePhotos((data => {
      console.log(data)
    }), likeInfo)
  }

};

const mutations = {
  'savePhotos'(state, photos) {
    state.photos = photos
  },
  'saveAlbums'(state, {albums}) {
    state.albums = albums
  },
  'saveFavourites'(state, favourites) {
    state.favourites = favourites
  },
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
