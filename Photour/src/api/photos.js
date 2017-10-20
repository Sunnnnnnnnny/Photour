import axios from 'axios'

export function fetchPhotos(callback) {
  axios.get('/photos')
    .then((response) =>
      callback(response.data)
    )
    .catch(function (error) {
      console.log(error)
    })
}
