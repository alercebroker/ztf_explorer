function parseObject(objectLightCurve) {
  const drMjd = objectLightCurve.hmjd
  const drMag = objectLightCurve.mag
  const drMagError = objectLightCurve.magerr
  const drFid = 100 + objectLightCurve.filterid
  const drField = objectLightCurve.fieldid
  const drId = objectLightCurve.objectid
  return drMjd.map((mjd, index) => {
    return {
      mjd,
      magpsf_corr: drMag[index],
      sigmapsf_corr_ext: drMagError[index],
      fid: drFid,
      field: drField,
      objectid: drId,
      corrected: true,
    }
  })
}

function parseLightCurve(lightcurves) {
  const lcs = lightcurves.map((x) => parseObject(x))
  return lcs.flat(1)
}

export default function ({ $axios, $config }, inject) {
  const dataReleaseApi = $axios.create({
    baseURL: $config.drApiBaseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  dataReleaseApi.getLightcurve = async (parameters, request = null) => {
    const response = await dataReleaseApi.get('light_curve/', {
      params: parameters,
      cancelToken: request ? request.token : null,
    })

    if (response.status === 200) return parseLightCurve(response.data)
    return response
  }

  inject('dataReleaseApi', dataReleaseApi)
}
