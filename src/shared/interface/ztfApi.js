const axios = require('axios')
const qs = require('qs')

class ZtfApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.axiosService = axios.create({
      baseURL: baseUrl,
    })
  }

  filterFunc(prefix, value) {
    if (value === '') {
      return
    }
    return value
  }

  paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'repeat',
      skipNulls: true,
      filter: this.filterFunc,
    })
  }
}

export { ZtfApi }
