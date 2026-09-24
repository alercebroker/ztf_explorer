export default function ({ app }, inject) {
  const appendParamsInUrl = (url, params) => {
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          url.searchParams.append(key, item)
        })
      } else {
        url.searchParams.append(key, value)
      }
    }

    return url
  }

  const _getParamsUrl = (url) => {
    const params = new URLSearchParams(url.search)
    const paramsDict = {}

    params.forEach((value, key) => {
      if (key === 'oid' || key === 'n_det' || key === 'firstmjd') {
        paramsDict[key] = params.getAll(key)
      } else {
        paramsDict[key] = value
      }
    })

    return paramsDict
  }

  inject('appendParamsInUrl', appendParamsInUrl)
  inject('_getParamsUrl', _getParamsUrl)
}
