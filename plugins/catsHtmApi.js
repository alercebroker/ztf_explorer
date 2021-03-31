export default function ({ $axios }, inject) {
  const catsHtmApi = $axios.create({
    baseURL: 'https://catshtm.alerce.online/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  catsHtmApi.xmatchall = (ra, dec, radius) => {
    return catsHtmApi.get('/crossmatch_all', {
      params: {
        ra,
        dec,
        radius,
      },
    })
  }

  inject('catsHtmApi', catsHtmApi)
}
