export default function ({ $axios, $config }, inject) {
  const catsHtmApi = $axios.create({
    baseURL: $config.catshtmApiBaseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  catsHtmApi.xmatchall = (ra, dec, radius, request = null) => {
    return catsHtmApi.get('/crossmatch_all', {
      params: {
        ra,
        dec,
        radius,
      },
      cancelToken: request ? request.token : null,
    })
  }

  inject('catsHtmApi', catsHtmApi)
}
