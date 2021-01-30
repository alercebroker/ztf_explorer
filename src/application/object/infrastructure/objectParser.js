import { Object_ } from '../domain/object'
import { ParseError } from '../../../shared/error/parseError'

class ObjectParser {
  /**
   * Parses API response object(s) to domain data object
   * @param {*} response an axios response object returned from api call
   * @return { Object_ | Array<Object_> } a domain object or an array of objects
   */
  toDomain(response) {
    if ('items' in response.data) {
      const respObj = response.data.items
      return respObj.map((x) => this.parseObject(x))
    } else {
      const respObj = response.data
      return this.parseObject(respObj)
    }
  }

  /**
   * Parses a object returned from API call to a domain object
   * @param {Object} respObj an Object to convert
   * @return { Object_ } a domain object
   * */
  parseObject(respObj) {
    try {
      return new Object_(
        respObj.oid,
        respObj.ndethist,
        respObj.ncovhist,
        respObj.mjdstarthist,
        respObj.mjdendhist,
        respObj.corrected,
        respObj.stellar,
        respObj.ndet,
        respObj.g_r_max,
        respObj.g_r_max_corr,
        respObj.g_r_mean,
        respObj.g_r_mean_corr,
        respObj.firstmjd,
        respObj.lastmjd,
        respObj.deltajd,
        respObj.meanra,
        respObj.meandec,
        respObj.sigmara,
        respObj.sigmadec,
        respObj.class,
        respObj.classifier,
        respObj.probability,
        respObj.step_id_corr
      )
    } catch (error) {
      throw new ParseError('Error parsing object: ' + error)
    }
  }
}

export { ObjectParser }
