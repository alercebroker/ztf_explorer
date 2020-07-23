import axios from 'axios'

const api = axios.create({
  baseURL: 'https://catshtm.alerce.online/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

function xmatchall(meanra, meandec, inradius) {
  return api.get('/crossmatch_all', {
    params: {
      ra: meanra,
      dec: meandec,
      radius: inradius,
    },
  })
}

export { xmatchall }
