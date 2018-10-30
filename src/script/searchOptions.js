// formato del json a enviar a la API
// si el usuario no ingresa algun valor, no se envia el campo correspondiente

const searchOptions = {
    filters: {
        oid: '',
        class: '',
        subclass: '',
        firstjd: '',
        lastjd: '',
        nobs: {
            min: '',
            max: '',
        },
        pclass: {
            min: '',
            max: '',
        },
        period: {
            min: '',
            max: '',
        },
        ext: '',
    },
    bands: {
        u: {
            min: '',
            max: '',
            slope: {
                min: '',
                max: '',
            },
            mean: {
                min: '',
                max: '',
            },
            rms: {
                min: '',
                max: '',
            },
            lastmag: {
                min: '',
                max: '',
            }
        },
        g: {
            min: '',
            max: '',
            slope: {
                min: '',
                max: '',
            },
            mean: {
                min: '',
                max: '',
            },
            rms: {
                min: '',
                max: '',
            },
            lastmag: {
                min: '',
                max: '',
            }
        },
        r: {
            min: '',
            max: '',
            slope: {
                min: '',
                max: '',
            },
            mean: {
                min: '',
                max: '',
            },
            rms: {
                min: '',
                max: '',
            },
            lastmag: {
                min: '',
                max: '',
            }
        },
        i: {
            min: '',
            max: '',
            slope: {
                min: '',
                max: '',
            },
            mean: {
                min: '',
                max: '',
            },
            rms: {
                min: '',
                max: '',
            },
            lastmag: {
                min: '',
                max: '',
            }
        },
        z: {
            min: '',
            max: '',
            slope: {
                min: '',
                max: '',
            },
            mean: {
                min: '',
                max: '',
            },
            rms: {
                min: '',
                max: '',
            },
            lastmag: {
                min: '',
                max: '',
            }
        },
        y: {
            min: '',
            max: '',
            slope: {
                min: '',
                max: '',
            },
            mean: {
                min: '',
                max: '',
            },
            rms: {
                min: '',
                max: '',
            },
            lastmag: {
                min: '',
                max: '',
            }
        },
    },
    coordinates: []
}