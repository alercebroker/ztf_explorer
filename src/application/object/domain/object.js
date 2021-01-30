class Object_ {
  constructor(
    oid,
    ndethist,
    ncovhist,
    mjdstarthist,
    mjdendhist,
    corrected,
    stellar,
    ndet,
    grMax,
    grMaxCorr,
    grMean,
    grMeanCorr,
    firstmjd,
    lastmjd,
    deltajd,
    meanra,
    meandec,
    sigmara,
    sigmadec,
    className,
    classifier,
    probability,
    stepIdCorr
  ) {
    this.oid = oid
    this.ndethist = ndethist
    this.ncovhist = ncovhist
    this.mjdstarthist = mjdstarthist
    this.mjdendhist = mjdendhist
    this.corrected = corrected
    this.stellar = stellar
    this.ndet = ndet
    this.g_r_max = grMax
    this.g_r_max_corr = grMaxCorr
    this.g_r_mean = grMean
    this.g_r_mean_corr = grMeanCorr
    this.firstmjd = firstmjd
    this.lastmjd = lastmjd
    this.deltajd = deltajd
    this.meanra = meanra
    this.meandec = meandec
    this.sigmara = sigmara
    this.sigmadec = sigmadec
    this.class_name = className
    this.classifier = classifier
    this.probability = probability
    this.step_id_corr = stepIdCorr
  }
}

export { Object_ }
