import axios from 'axios'

export function signIn(callback, password, username) {
  axios.post('/user/sign-up', {
    username: username,
    password: password
  })
    .then((response) =>
      // callback(response.data)
      console.log(response)
    )
    .catch(function (error) {
      console.log(error)
    })
}
