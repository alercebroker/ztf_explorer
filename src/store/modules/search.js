export const state = {
    queryParameters: {
        filters: {
            oid: null,
            class: null,
            subclass: null,
            nobs: {
                min: null,
                max: null
            },
            pclass: {
                min: null,
                max: null
            },
            period: {
                min: null,
                max: null
            },
            ext: null
        },
        dates: {
            firstjd: null,
            lastjd: null,
            deltajd: {
                min: null,
                max: null
            }
        },
        bands: {
            any: {
                min: {
                    min: null,
                    max: null
                },
                max: {
                    min: null,
                    max: null
                },
                slope: {
                    min: null,
                    max: null
                },
                mean: {
                    min: null,
                    max: null
                },
                rms: {
                    min: null,
                    max: null
                },
                lastmag: {
                    min: null,
                    max: null
                }
            },
            u: {
                min: {
                    min: null,
                    max: null
                },
                max: {
                    min: null,
                    max: null
                },
                slope: {
                    min: null,
                    max: null
                },
                mean: {
                    min: null,
                    max: null
                },
                rms: {
                    min: null,
                    max: null
                },
                lastmag: {
                    min: null,
                    max: null
                }
            },
            g: {
                min: {
                    min: null,
                    max: null
                },
                max: {
                    min: null,
                    max: null
                },
                slope: {
                    min: null,
                    max: null
                },
                mean: {
                    min: null,
                    max: null
                },
                rms: {
                    min: null,
                    max: null
                },
                lastmag: {
                    min: null,
                    max: null
                }
            },
            r: {
                min: {
                    min: null,
                    max: null
                },
                max: {
                    min: null,
                    max: null
                },
                slope: {
                    min: null,
                    max: null
                },
                mean: {
                    min: null,
                    max: null
                },
                rms: {
                    min: null,
                    max: null
                },
                lastmag: {
                    min: null,
                    max: null
                }
            },
            i: {
                min: {
                    min: null,
                    max: null
                },
                max: {
                    min: null,
                    max: null
                },
                slope: {
                    min: null,
                    max: null
                },
                mean: {
                    min: null,
                    max: null
                },
                rms: {
                    min: null,
                    max: null
                },
                lastmag: {
                    min: null,
                    max: null
                }
            },
            z: {
                min: {
                    min: null,
                    max: null
                },
                max: {
                    min: null,
                    max: null
                },
                slope: {
                    min: null,
                    max: null
                },
                mean: {
                    min: null,
                    max: null
                },
                rms: {
                    min: null,
                    max: null
                },
                lastmag: {
                    min: null,
                    max: null
                }
            },
            y: {
                min: {
                    min: null,
                    max: null
                },
                max: {
                    min: null,
                    max: null
                },
                slope: {
                    min: null,
                    max: null
                },
                mean: {
                    min: null,
                    max: null
                },
                rms: {
                    min: null,
                    max: null
                },
                lastmag: {
                    min: null,
                    max: null
                }
            }
        },
        coordinates: {
            ra: null,
            dec: null,
            rs: null
        }
    }
}

export const mutations = {
    UPDATE_DEFAULT_OPTIONS(state, payload){
        state.filters[payload.param] = payload.value;
    }
}

export const actions = {

}

export const getters = {
    
}