export default function ({ $axios, $config }, inject) {
  const tnsApi = $axios.create({
    baseURL: $config.tnsApiBaseUrl,
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
