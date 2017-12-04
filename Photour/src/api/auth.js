import axios from 'axios'

export function signIn(callback, body) {
  axios.post('/user/login',
    body,
    {
      headers: {'Content-Type': 'application/json'}
    }
  )
    .then(function (response) {
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

export function signUp(callback, body) {
  axios.post('/user/register',
    body,
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

export function fetchCurrentUserById(callback, userId) {
  axios.get('/user/get', {
      params: {
        userId: userId
      }
    }
  )
    .then(function (response) {
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}

export function editUserInfo(callback, userInfo) {
  axios.post('/user/editInfo',
    userInfo,
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

export function editUserPw(callback, pwInfo) {
  axios.post('/user/editPw',
    pwInfo,
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


export function editUserTags(callback, editInfo) {
  axios.post('/user/editTags',
    editInfo,
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
