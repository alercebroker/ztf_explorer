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
    const notNull = {
      oid: this.oid,
      firstmjd: this.firstmjd,
      ndet: this.ndet,
      lastmjd: this.lastmjd,
      deltajd: this.deltajd,
      meanra: this.meanra,
      meandec: this.meandec,
      corrected: this.corrected,
      grMax: this.grMax,
      grMean: this.grMean,
    }
    Object.keys(notNull).forEach((key) => {
      if (!notNull[key]) {
        throw new Error('Property ' + key + " can't be null or undefined")
      }
    })
  }
}
