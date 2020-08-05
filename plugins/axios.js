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

export default function ({ $axios, store, redirect }, inject) {
  const ztfApi = $axios.create({
    baseURL: 'http://3.212.59.238:8082/',
  })

  ztfApi.search = (searchParameters) => {
    searchParameters = renameFields(searchParameters)
    searchParameters.order_mode = convertOrderMode(searchParameters.order_mode)
    return ztfApi.get('objects/', {
      params: searchParameters,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true })
      },
    })
  }

  ztfApi.getClassifiers = () => {
    return ztfApi.get('classifiers/')
  }

  ztfApi.getClasses = (classifier, classifierVersion) => {
    return ztfApi.get(`classifiers/${classifier}/${classifierVersion}/classes`)
  }

  ztfApi.getObject = (objectId) => {
    return ztfApi.get(`objects/${objectId}`)
  }

  ztfApi.getLightCurve = (objectId) => {
    return ztfApi.get(`objects/${objectId}/lightcurve`)
  }

  ztfApi.getStats = (oid) => {
    return ztfApi.get(`objects/${oid}/magstats`)
  }
  ztfApi.getProbabilities = (objectId) => {
    return ztfApi.get(`objects/${objectId}/probabilities`)
  }

  ztfApi.getFeatures = (objectId) => {
    return ztfApi.get(`objects/${objectId}/features`)
  }

  const tnsApi = $axios.create({
    baseURL: 'https://tns.alerce.online/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  tnsApi.isInTNS = (ra, dec) => {
    return tnsApi.post('search', { ra, dec })
  }

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

  inject('ztfApi', ztfApi)
  inject('tnsApi', tnsApi)
  inject('catsHtmApi', catsHtmApi)
}
