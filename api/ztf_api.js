import axios from 'axios'
const qs = require('qs')

const api = axios.create({
  baseURL: 'http://3.212.59.238:8082/',
})

function search(searchParameters) {
  return api.get('objects/', {
    params: searchParameters,
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true })
    },
  })
}

export { search }
