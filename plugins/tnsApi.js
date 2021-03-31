export default function ({ $axios }, inject) {
  const tnsApi = $axios.create({
    baseURL: 'https://tns.alerce.online/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  tnsApi.isInTNS = (ra, dec) => {
    return tnsApi.post('search', { ra, dec })
  }

  inject('tnsApi', tnsApi)
}
