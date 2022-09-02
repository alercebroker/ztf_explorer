export default function ({ $axios, $config }, inject) {
  const avroApi = $axios.create({
    baseURL: $config.avroApiBaseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  avroApi.getAvroInfo = (oid, candid, surveyId, request = null) => {
    const token = localStorage.getItem('access_token')
    const config = {  params: { oid, candid, survey_id: surveyId } }
    if (request) {
      config.cancelToken = request.token
    }
    if (token) {
      config.headers = {
        'AUTH-TOKEN': token,
      }
    }
    return avroApi.get('get_avro_info', config)
  }

  inject('avroApi', avroApi)
}
