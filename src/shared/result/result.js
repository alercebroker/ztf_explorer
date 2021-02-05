export default class Result {
  constructor(isSuccess, error, value) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be
        successful and contain an error`)
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result
        needs to contain an error message`)
    }

    this.isSuccess = isSuccess
    this.isFailure = !isSuccess
    this.error = error
    this._value = value
  }

  getValue() {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`)
    }

    return this._value
  }

  static ok(value) {
    return new this(true, null, value)
  }

  static fail(error) {
    return new this(false, error, null)
  }

  static combine(results) {
    return results.reduce(
      (acc, result) =>
        acc.isSuccess
          ? result.isFailure
            ? this.fail(result.error)
            : this.ok(acc.getValue().concat(result.getValue()))
          : acc,
      this.ok([])
    )
  }
}
