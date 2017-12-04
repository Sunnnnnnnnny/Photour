import * as photoApi from '../../api/photos'

const state = {
  photos: [],
  favourites: [],
  albums: [],
  currentPhoto: null,
};


const actions = {

  fetchPhotos({commit, state, rootState}) {
    let userId = rootState.auth.user ? rootState.auth.user.id : null
    photoApi.fetchPhotos((data) => {
      commit('savePhotos', {photos: data})
    }, userId)
  },


  fetchFavourites({commit, state}, userId) {
    // console.log(userId)
    photoApi.fetchFavourites((data => {
      commit('saveFavourites', {favourites: data.photoUrls})
    }), userId)
  },

  likePhotos({commit}, likeInfo) {
    photoApi.likePhotos((data => {
      console.log(data)
    }), likeInfo)
  },

  deletePhoto({state, rootState, dispatch}, {onSuccess, onError}) {
    let photoId = state.currentPhoto ? state.currentPhoto.id : null
    photoApi.deletePhoto((data => {
      if (data.message === 'success') {
        if (onSuccess) {
          onSuccess('删除成功！')
        }
      } else {
        onError(data.message)
      }
    }), photoId)
  }

};

const mutations = {
  'savePhotos'(state, photos) {
    state.photos = photos
  },

  'saveFavourites'(state, {favourites}) {
    state.favourites = favourites
    console.log(state.favourites)
  },
  'saveCurrentPhoto'(state, currentPhoto) {
    state.currentPhoto = currentPhoto
  },
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
