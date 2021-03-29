import Parser from '@shared/generic/parser'
import { Object_ } from '@app/object/domain'
import { Result } from '@shared/result'

export default class ObjectParser extends Parser {
  /**
   * Parses API data object(s) to domain data entity
   * @param { Object } data a response data object returned from api call
   * @return { Result } a result containing domain object or array
   */
  toDomain(data) {
    if ('items' in data) {
      const respObj = data.items
      const results = respObj.map((x) => {
        const extra = {
          grMax: x.g_r_max,
          grMaxCorr: x.g_r_max_corr,
          grMean: x.g_r_mean,
          grMeanCorr: x.g_r_mean_corr,
          stepIdCorr: x.step_id_corr,
          className: x.class,
        }
        return this._parseObject(x, Object_, extra)
      })
      return Result.combine(results)
    } else {
      const respObj = data
      const extra = {
        grMax: respObj.g_r_max,
        grMaxCorr: respObj.g_r_max_corr,
        grMean: respObj.g_r_mean,
        grMeanCorr: respObj.g_r_mean_corr,
        stepIdCorr: respObj.step_id_corr,
      }
      return this._parseObject(respObj, Object_, extra)
    }
  }
}
