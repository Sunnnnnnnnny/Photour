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

  fetchAlbums({commit}, {userId, onSuccess}) {
    photoApi.fetchAlbums((data) => {
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

  uploadPhotos({commit}, {toUpload, onSuccess}) {
    console.log(toUpload)
    photoApi.uploadPhotos((data => {
      console.log(data)
      if (onSuccess) {
        let message = "上传成功"
        onSuccess(message)
      }
    }))
  }

};

const mutations = {
  'savePhotos'(state, photos) {
    state.photos = photos
  },
  'saveAlbums'(state, {albums}) {
    state.albums = albums
    console.log("state", state.albums)
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
