import { Result } from '../result'
import HttpError from './httpError'

const axios = require('axios')

export default class HttpService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.axiosService = axios.create({
      baseURL: baseUrl,
    })
    this._initializeRequestInterceptor()
    this._initializeResponseInterceptor()
  }

  _initializeRequestInterceptor() {
    this.axiosService.interceptors.request.use(
      this._handleRequest,
      this._handleError
    )
  }

  _initializeResponseInterceptor() {
    this.axiosService.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  }

  _handleRequest(config) {
    return config
  }

  _handleResponse(response) {
    return response
  }

  _handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Result.fail(
        HttpError.fromStatus(error.response.status, error.message)
      )
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      throw error
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error
    }
  }

  /**
   * Performs an axios GET operation
   * @param { Object } obj an Object containing url and config to pass to the axios instance
   * @param { Parser } parser a parser to parse the response
   * @return { Result | Array<Result> } a Return object that contains an entity as value
   * */
  async get({ url, config }, parser) {
    try {
      const response = await this.axiosService.get(url, config)
      return parser.toDomain(response.data)
    } catch (resultError) {
      // catched error should be an HttpError wrapped in a Result object
      return resultError
    }
  }
}
