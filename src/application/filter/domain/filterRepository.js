import { METHOD_NOT_IMPLEMENTED } from '@@/src/shared/error'

export default class FilterRepository {
  /**
   * Creates an instance of FilterParams given a param object
   * @param { Object } Arguments used to create FilterParams
   * */
  createParams(params) {
    throw new Error(METHOD_NOT_IMPLEMENTED)
  }

  /**
   * Creates an empty FilterParams object
   * */
  clearParams() {
    throw new Error(METHOD_NOT_IMPLEMENTED)
  }

  pageNext() {
    throw new Error(METHOD_NOT_IMPLEMENTED)
  }

  pagePrev() {
    throw new Error(METHOD_NOT_IMPLEMENTED)
  }
}
