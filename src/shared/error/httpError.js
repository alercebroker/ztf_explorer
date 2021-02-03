import { httpStatusCode } from '../interface/httpStatusCodes'
export default class HttpError extends Error {
  constructor(status, message) {
    super(message)

    Object.setPrototypeOf(this, HttpError.prototype)

    this.status = status
    this.name = httpStatusCode[status]
    this.message = message || httpStatusCode[status]
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status <= 499
  }

  isServerError(): boolean {
    return this.status >= 500 && this.status <= 599
  }

  static fromStatus(status: number, message?: string) {
    return new this(status, message)
  }
}
