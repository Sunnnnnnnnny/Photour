import axios from 'axios'

export function fetchFollows(callback, userId) {
  axios.get('/follows', {
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

export function editFollows(callback, info) {
  axios.post('/follows/edit',
    info,
    {
      headers: {'Content-Type': 'application/json'}
    })
    .then((response) => {
        callback(response.data)
      }
    )
    .catch(function (error) {
      console.log(error)
    })
}
