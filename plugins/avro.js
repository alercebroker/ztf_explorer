export default function ({ $axios, $config }, inject) {
  const avroApi = $axios.create({
    baseURL: $config.avroApiBaseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  avroApi.getAvroInfo = (oid, candid, request = null) => {
    return avroApi.get('get_avro_info', {
      params: { oid, candid },
      cancelToken: request ? request.token : null,
    })
  }

  inject('avroApi', avroApi)
}
