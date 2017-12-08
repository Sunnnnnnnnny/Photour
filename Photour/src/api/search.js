import axios from 'axios'

export function search(callback, input) {
  console.log('api', input)
  axios.get('/search',
    {
      params: {
        input: input.input,
        userId: input.userId
      }
    })
    .then((response) =>
      callback(response.data)
    )
    .catch(function (error) {
      console.log(error)
    })
}
