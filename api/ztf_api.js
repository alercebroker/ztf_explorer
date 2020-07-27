import axios from 'axios'
const qs = require('qs')

const api = axios.create({
  baseURL: 'http://3.212.59.238:8082/',
})

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

function search(searchParameters) {
  searchParameters = renameFields(searchParameters)
  searchParameters.order_mode = convertOrderMode(searchParameters.order_mode)
  return api.get('objects/', {
    params: searchParameters,
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true })
    },
  })
}

function getClassifiers() {
  return api.get('classifiers/')
}

function getClasses(classifier) {
  return api.get(`classifiers/${classifier}/classes`)
}

function getObject(objectId) {
  return api.get(`objects/${objectId}`)
}

function getLightCurve(objectId) {
  return api.get(`objects/${objectId}/lightcurve`)
}

function getStats(oid) {
  return api.get(`objects/${oid}/magstats`)
}
function getClassifications(objectId) {
  return api.get(`objects/${objectId}/probabilities`)
}

export {
  search,
  getObject,
  getLightCurve,
  getClassifications,
  getClassifiers,
  getClasses,
  getStats,
}
