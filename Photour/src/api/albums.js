import axios from 'axios'

export function fetchAlbums(callback, userId) {
  axios.get('/albums',
    {
      params: {
        userId: userId
      }
    }
  ).then((response) => {
      callback(response.data)
    }
  ).catch(function (error) {
    console.log(error)
  })
}

export function fetchPhotosInAlbums(callback, {albumId, userId}) {
  axios.get('/albums/photos',
    {
      params: {
        albumId: albumId,
        userId: userId
      }
    }
  ).then((response) => {
      callback(response.data)
    }
  ).catch(function (error) {
    console.log(error)
  })
}
