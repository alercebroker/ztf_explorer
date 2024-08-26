export default function ({ $axios, $config }, inject) {
  const dataReleaseApi = $axios.create({
    baseURL: new URL('/ztf/dr/v1', $config.alerceApiBaseUrl).toString(),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  dataReleaseApi.getLightcurve = async (parameters, request = null) => {
    const response = await dataReleaseApi.get('light_curve/', {
      params: parameters,
      cancelToken: request ? request.token : null,
    })
    return response
  }

  inject('dataReleaseApi', dataReleaseApi)
}
