import Entity from '@@/src/shared/generic/entity'

export default class FilterParams extends Entity {
  constructor(params = {}) {
    super()
    this.validate(params)
    this.oid = params.oid || null
    this.classifier = params.classifier || null
    this.classifier_version = params.classifier_version || null
    this.class = params.class || null
    this.ranking = params.ranking || 1
    this.ndet = params.ndet || []
    this.probability = params.probability || null
    this.firstmjd = params.firstmjd || []
    this.lastmjd = params.lastmjd || []
    this.ra = params.ra || null
    this.dec = params.dec || null
    this.radius = params.radius || null
    this.page = params.page || 1
    this.page_size = params.page_size || 1
    this.count = params.count || 'true'
    this.order_by = params.order_by || null
    this.order_mode = params.order_mode || null
  }

  validate(args) {
    this.validateRanking(args)
    this.validateNdet(args)
    this.validateProbability(args)
    this.validateFirstmjd(args)
    this.validateLastmjd(args)
    this.validatePagination(args)
    this.validateOrdering(args)
  }

  validateRanking(args) {
    if (args.ranking < 1) {
      throw new Error("Ranking can't be lower than 1")
    }
  }

  validateRange(arr, name) {
    arr.forEach((val) => {
      if (val < 0) throw new Error(name + " can't be lower than 0")
    })
    if (arr.length === 2) {
      if (arr[1] < arr[0]) throw new Error('Invalid range for ' + name)
    }
    if (arr.length > 2) throw new Error('Invalid range for ' + name)
  }

  validateNdet(args) {
    if (Array.isArray(args.ndet)) {
      this.validateRange(args.ndet, 'number of detections')
    }
  }

  validateProbability(args) {
    if (args.probability < 0)
      throw new Error("Probability can't be lower than 0")
  }

  validateFirstmjd(args) {
    if (Array.isArray(args.firstmjd)) {
      this.validateRange(args.firstmjd, 'firstmjd')
    }
  }

  validateLastmjd(args) {
    if (Array.isArray(args.lastmjd)) {
      this.validateRange(args.lastmjd, 'lastmjd')
    }
  }

  validatePagination(args) {
    if (args.page < 1) throw new Error("Page can't be lower than 1")
    if (args.page_size < 1) throw new Error("Page size can't be lower than 1")
    if (
      args.count &&
      args.count !== 'true' &&
      args.count !== 'false' &&
      args.count !== 'yes' &&
      args.count !== 'no'
    )
      throw new Error('Wrong value for count')
  }

  validateOrdering(args) {
    if (args.order_by == null) return
    const attributes = Object.keys(args)
    if (!attributes.includes(args.order_by))
      throw new Error('Wrong value for order_by')

    if (args.order_mode == null) return
    if (!['ASC', 'DESC'].includes(args.order_mode))
      throw new Error('Wrong value for order_mode')
  }
}
