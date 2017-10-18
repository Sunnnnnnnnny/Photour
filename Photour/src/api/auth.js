import axios from 'axios'

export function fetchTodos (callback) {
  axios.get('/user')
    .then((response) =>
      callback(response.data)
    )
    .catch(function (error) {
      console.log(error)
    })
}
