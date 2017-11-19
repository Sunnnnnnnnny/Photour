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
