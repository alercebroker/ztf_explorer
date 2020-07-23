import axios from 'axios'
const qs = require('qs')

const api = axios.create({
  baseURL: 'http://3.212.59.238:8082/',
})

function renameFields(params) {
  params.class = params.selectedClass
  params.classifier = params.selectedClassifier
  delete params.selectedClass
  delete params.selectedClassifier
  return params
}

function search(searchParameters) {
  searchParameters = renameFields(searchParameters)
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

export {
  search,
  getObject,
  getLightCurve,
  getClassifiers,
  getClasses,
  getStats,
}
