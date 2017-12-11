import axios from 'axios'

export function fetchAllUsers(callback) {
  axios.get('/user/fetch/all')
    .then((response) =>
      callback(response.data)
    )
    .catch(function (error) {
      console.log(error)
    })
}

export function deleteUser(callback, userId) {
  axios.get('/user/delete', {
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
