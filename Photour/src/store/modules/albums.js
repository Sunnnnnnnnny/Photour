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
