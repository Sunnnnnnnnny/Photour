import axios from 'axios'

export function fetchPhotos(callback) {
  axios.get('/photos')
    .then((response) => {
        callback(response.data)
      }
    )
    .catch(function (error) {
      console.log(error)
    })
}

export function fetchFavourites(callback) {
  axios.get('/favourites')
    .then((response) =>
      callback(response.data)
    )
    .catch(function (error) {
      console.log(error)
    })
}

export function uploadPhotos(callback, toUpload) {
  axios.post('/photos/upload',
    toUpload,
    {
      headers: {'Content-Type': 'application/json'}
    })
    .then(function (response) {
      callback(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
