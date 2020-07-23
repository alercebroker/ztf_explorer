import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

import {
  getObject,
  getLightCurve,
  getClassifications,
  getStats,
} from '../api/ztf_api'

import { isInTNS } from '../api/tns_api'

import { xmatchall } from '../api/catshtm_api'

@Module({ name: 'object', namespaced: true, stateFactory: true })
export default class Object_ extends VuexModule {
  status = null
  objectId = null
  objectInformation = null
  objectLightcurve = {
    loaded: false,
    detections: [],
    non_detections: [],
  }

  stats = []

  bandMap = {
    '1': 'g',
    '2': 'r',
  }

  classifications = {
    loaded: false,
    classifiers: [],
  }

  objectTNS = {
    type: '-',
    name: '-',
    redshift: '-',
  }

  crossmatches = {
    loaded: false,
    data: [],
  }

  @VuexMutation
  setObjectId(val) {
    this.objectId = val
  }

  @VuexMutation
  setObjectInformation(val) {
    this.objectInformation = val.data
    this.status = val.status
  }

  @VuexMutation
  setObjectLightcurve(val) {
    console.log(val)
    this.objectLightcurve = val.data
    this.objectLightcurve.loaded = val.status === 200
  }

  @VuexMutation
  setTNSInformation(val) {
    this.objectTNS = {
      type: val.object_type ? val.object_type : '-',
      name: val.object_name ? val.object_name : '-',
      redshift: val.object_data ? val.object_data.redshift : '-',
    }
    this.status = val.status
  }

  @VuexMutation
  setStats(val) {
    this.stats = val
  }

  @VuexMutation
  setClassifications(val) {
    this.classifications.classifiers = val.data
    this.classifications.loaded = val.status === 200
  }

  @VuexMutation
  setCrossMatches(val) {
    this.crossmatches.data = val.data
    this.crossmatches.loaded = val.status === 200
  }

  @VuexAction({ rawError: true })
  async getObject(val) {
    this.setObjectId(val)
    const information = await getObject(val)
    this.setObjectInformation(information)
    const lightcurve = await getLightCurve(val)
    this.setObjectLightcurve(lightcurve)
    const classifications = await getClassifications(val)
    this.setClassifications(classifications)
    const stats = await getStats(val)
    this.setStats(stats.data)
    const xmatch = await xmatchall(
      information.data.meanra,
      information.data.meandec,
      50
    )
    this.setCrossMatches(xmatch)
    const tns = await isInTNS(information.data.meanra, information.data.meandec)
    this.setTNSInformation(tns)
  }
}
