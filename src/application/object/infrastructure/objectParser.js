import Parser from '../../../shared/generic/parser'
import { Object_ } from '../domain'
import { Result } from '../../../shared/result'

export default class ObjectParser extends Parser {
  /**
   * Parses API data object(s) to domain data entity
   * @param { Object } data a response data object returned from api call
   * @return { Result | Array<Result> } a domain object or an array of objects
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
        return this.parseObject(x, Object_, extra)
      })
      const combined = Result.combine(results)
      if (combined.isFailure) {
        return combined
      }
      return results
    } else {
      const respObj = data
      const extra = {
        grMax: respObj.g_r_max,
        grMaxCorr: respObj.g_r_max_corr,
        grMean: respObj.g_r_mean,
        grMeanCorr: respObj.g_r_mean_corr,
        stepIdCorr: respObj.step_id_corr,
      }
      const result = this.parseObject(respObj, Object_, extra)
      return result
    }
  }
}
