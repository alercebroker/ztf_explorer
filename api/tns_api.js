import axios from 'axios'

const api = axios.create({
  baseURL: 'https://tns.alerce.online/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

function isInTNS(meanra, meandec) {
  return api.post('search', { ra: meanra, dec: meandec })
}

export { isInTNS }
