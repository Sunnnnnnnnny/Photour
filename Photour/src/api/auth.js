import axios from 'axios'

export function signIn(callback, body) {
  console.log(body)
  axios.post('/user/login',
    body,
    {
      headers: {'Content-Type': 'application/json'}
    }
  )
    .then(function (response) {
      console.log(response.data)
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function currentUser(callback, token) {
  axios.get('/user/me',
    {
      params: {
        token: token
      }
    })
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
