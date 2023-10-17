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
  renameField(params, 'selectedClass', 'class_name')
  renameField(params, 'selectedClassifier', 'classifier_name')
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
  const ztfApiv2 = $axios.create({
    baseURL: $config.ztfApiv2Url,
  })

  ztfApi.search = (searchParameters, request) => {
    searchParameters = renameFields(searchParameters)
    searchParameters.order_mode = convertOrderMode(searchParameters.order_mode)
    return ztfApiv2.get('/astroobject/objects/', {
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
    return ztfApiv2.get(
      `/astroobject/object/${objectId}`,
      request ? { cancelToken: request.token } : {}
    )
  }

  ztfApi.getLightCurveHTMX = (objectId, plotType, request = null) => {
    const token = localStorage.getItem('access_token')
    const config = { params: { oid: objectId } }
    if (request) {
      config.cancelToken = request.token
    }
    if (token) {
      config.headers = {
        'AUTH-TOKEN': token,
      }
    }
    return {
      data: `<h1> Test successful with type: ${plotType} and oid ${objectId} </h1>`,
    }
    /* return ztfApiv2.get(`/lightcurve/htmx/plot/${plotType}`, config) */
  }

  ztfApi.getLightCurve = (objectId, surveyId, request = null) => {
    const token = localStorage.getItem('access_token')
    const config = { params: { survey_id: surveyId } }
    if (request) {
      config.cancelToken = request.token
    }
    if (token) {
      config.headers = {
        'AUTH-TOKEN': token,
      }
    }
    return ztfApiv2.get(`/lightcurve/lightcurve/${objectId}`, config)
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
