const qs = require('qs')

function renameField(obj, field, newField) {
  obj[newField] = obj[field]
  delete obj[field]
}

function convertOrderMode(orderDesc) {
  if (orderDesc !== undefined) {
    return orderDesc ? 'DESC' : 'ASC'
  }
}

function renameFields(params) {
  renameField(params, 'selectedClass', 'class')
  renameField(params, 'selectedClassifier', 'classifier')
  renameField(params, 'perPage', 'page_size')
  renameField(params, 'sortBy', 'order_by')
  renameField(params, 'sortDesc', 'order_mode')
  return params
}

function filterFunc(prefix, value) {
  if (value === '') {
    return
  }
  return value
}

export default function ({ $axios, $config }, inject) {
  const ztfApi = $axios.create({
    baseURL: $config.ztfApiBaseUrl,
  })

  ztfApi.search = (searchParameters, request) => {
    searchParameters = renameFields(searchParameters)
    searchParameters.order_mode = convertOrderMode(searchParameters.order_mode)
    return ztfApi.get('objects/', {
      params: searchParameters,
      paramsSerializer(params) {
        return qs.stringify(params, {
          arrayFormat: 'repeat',
          skipNulls: true,
          filter: filterFunc,
        })
      },
      cancelToken: request.token,
    })
  }

  ztfApi.getClassifiers = (request = null) => {
    return ztfApi.get(
      'classifiers/',
      request ? { cancelToken: request.token } : {}
    )
  }

  ztfApi.getClasses = (classifier, classifierVersion, request = null) => {
    return ztfApi.get(
      `classifiers/${classifier}/${classifierVersion}/classes`,
      request ? { cancelToken: request.token } : {}
    )
  }

  ztfApi.getObject = (objectId, request = null) => {
    return ztfApi.get(
      `objects/${objectId}`,
      request ? { cancelToken: request.token } : {}
    )
  }

  ztfApi.getLightCurve = (objectId, request = null) => {
    return ztfApi.get(
      `objects/${objectId}/lightcurve`,
      request ? { cancelToken: request.token } : {}
    )
  }

  ztfApi.getStats = (oid, request = null) => {
    return ztfApi.get(
      `objects/${oid}/magstats`,
      request ? { cancelToken: request.token } : {}
    )
  }
  ztfApi.getProbabilities = (objectId, request = null) => {
    return ztfApi.get(
      `objects/${objectId}/probabilities`,
      request ? { cancelToken: request.token } : {}
    )
  }

  ztfApi.getFeatures = (objectId, request = null) => {
    return ztfApi.get(
      `objects/${objectId}/features`,
      request ? { cancelToken: request.token } : {}
    )
  }

  ztfApi.getLimitValues = (request = null) => {
    return ztfApi.get(
      'objects/limit_values',
      request ? { cancelToken: request.token } : {}
    )
  }

  inject('ztfApi', ztfApi)
}
