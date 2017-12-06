import axios from 'axios'

export function createEvent(callback, eventInfo) {
  axios.post('/events/create',
    eventInfo,
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

export function fetchEvents(callback, userId) {
  axios.get('/events', {
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

export function fetchAllEvents(callback) {
  axios.get('/events')
    .then((response) => {
        callback(response.data)
      }
    )
    .catch(function (error) {
      console.log(error)
    })
}
