import axios from 'axios'

export function addComment(callback, info) {
  axios.post('/comments/add',
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
