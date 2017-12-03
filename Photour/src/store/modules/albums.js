import * as albumsApi from '../../api/albums'

const state = {
  isShowingPhotos: false,
  albums: [],
  photosInAlbums: [],
  currentAlbum: null,
};


const actions = {
  fetchAlbums({commit}, {userId, onSuccess}) {
    albumsApi.fetchAlbums((data) => {
      commit('saveAlbums', {albums: data})
      if (onSuccess) {
        onSuccess()
      }
    }, userId)
  },

  fetchPhotosInAlbums({commit}, {albumId, userId}) {
    albumsApi.fetchPhotosInAlbums((data) => {
      commit('savePhotosInAlbums', {photos: data})
    }, {albumId, userId})
  },

  createAlbum({commit, rootState, dispatch}, {albumInfo, onSuccess, onError}) {
    let userId = rootState.auth.user ? rootState.auth.user.id : null
    albumsApi.createAlbum((data) => {
      if (data.message === 'success') {
        dispatch('fetchAlbums', {userId: userId})
        if (onSuccess) {
          onSuccess('创建成功！')
        }
      } else {
        onError(data.message)
      }
    }, albumInfo)
  },

  deleteAlbum({commit, state, rootState, dispatch}, {onSuccess, onError}) {
    let albumId = state.currentAlbum ? state.currentAlbum.id : null
    let userId = rootState.auth.user ? rootState.auth.user.id : null
    console.log(albumId)
    albumsApi.deleteAlbum((data) => {
      if (data.message === 'success') {
        dispatch('fetchAlbums', {userId: userId})
        if (onSuccess) {
          onSuccess('删除成功！')
        }
      } else {
        onError(data.message)
      }
    }, albumId)
  }
};

const mutations = {
  'saveAlbums'(state, {albums}) {
    state.albums = albums
  },
  'savePhotosInAlbums'(state, {photos}) {
    state.photosInAlbums = photos
  },
  'saveCurrentAlbum'(state, currentAlbum) {
    state.currentAlbum = currentAlbum
  },
  'showingPhotos'(state, isShowingPhotos) {
    state.isShowingPhotos = isShowingPhotos;
  }
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}
