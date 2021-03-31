export default function ({ $axios }, inject) {
  const avroApi = $axios.create({
    baseURL: 'https://avro.alerce.online',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  avroApi.getAvroInfo = (oid, candid) => {
    return avroApi.get('get_avro_info', { params: { oid, candid } })
  }

  inject('avroApi', avroApi)
}
