import axios from 'axios'

export function fetchPhotos(callback, userId) {
  axios.get('/photos',
    {
      params: {
        userId: userId
      }
    })
    .then((response) => {
        callback(response.data)
      }
    )
    .catch(function (error) {
      console.log(error)
    })
}

export function fetchFavourites(callback, userId) {
  axios.get('/photos/favourites',
    {
      params: {
        userId: userId
      }
    })
    .then((response) =>
      callback(response.data)
    )
    .catch(function (error) {
      console.log(error)
    })
}

export function likePhotos(callback, {likeInfo}) {
  axios.post('/photos/like',
    likeInfo,
    {
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function deletePhoto(callback, photoId) {
  axios.get('/photos/delete',
    {
      params: {
        photoId: photoId
      }
    })
    .then((response) =>
      callback(response.data)
    )
    .catch(function (error) {
      console.log(error)
    })
}
