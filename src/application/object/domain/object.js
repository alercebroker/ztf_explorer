export class Object_ {
  constructor(data) {
    this.oid = data.oid
    this.ndethist = data.ndethist
    this.ncovhist = data.ncovhist
    this.mjdstarthist = data.mjdstarthist
    this.mjdendhist = data.mjdendhist
    this.corrected = data.corrected
    this.stellar = data.stellar
    this.ndet = data.ndet
    this.grMax = data.grMax
    this.grMaxCorr = data.grMaxCorr
    this.grMean = data.grMean
    this.grMeanCorr = data.grMeanCorr
    this.firstmjd = data.firstmjd
    this.lastmjd = data.lastmjd
    this.deltajd = data.deltajd
    this.meanra = data.meanra
    this.meandec = data.meandec
    this.sigmara = data.sigmara
    this.sigmadec = data.sigmadec
    this.className = data.className
    this.classifier = data.classifier
    this.probability = data.probability
    this.stepIdCorr = data.stepIdCorr
    this.validate()
  }

  validate() {
    const notNull = [
      this.oid,
      this.firstmjd,
      this.ndet,
      this.lastmjd,
      this.deltajd,
      this.meanra,
      this.meandec,
      this.corrected,
      this.grMax,
      this.grMean,
    ]
    notNull.forEach((x) => {
      if (!x) {
        throw new Error('Invalid Object')
      }
    })
  }
}
