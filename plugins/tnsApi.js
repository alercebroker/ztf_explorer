export default function ({ $axios, $config }, inject) {
  const tnsApi = $axios.create({
    baseURL: $config.tnsApiBaseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  tnsApi.isInTNS = (ra, dec, request = null) => {
    return tnsApi.post(
      'search',
      { ra, dec },
      request ? { cancelToken: request.token } : {}
    )
  }

  inject('tnsApi', tnsApi)
}
