import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

import { getObject, getLightCurve } from '../api/ztf_api'

@Module({ name: 'object', namespaced: true, stateFactory: true })
export default class Object_ extends VuexModule {
  status = null
  objectId = null
  objectInformation = null
  objectLightcurve = null

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
    this.objectLightcurve = val.data
    this.status = val.status
  }

  @VuexAction({ rawError: true })
  async getObject(val) {
    this.setObjectId(val)
    const information = await getObject(val)
    const lightcurve = await getLightCurve(val)
    this.setObjectInformation(information)
    this.setObjectLightcurve(lightcurve)
  }
}
