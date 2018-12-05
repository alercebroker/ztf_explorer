<template>
  <div class="searchOptions">
    <!-- <b-form v-on:submit.prevent="onQuerySubmit"> -->
    <br>
    <b-card no-body header-tag="header">
      <h2 slot="header" class="mb-6">Search Options</h2>
      <b-card-body>
        <b-form v-on:submit.prevent="onSubmitQuery">
          <div class="filter-content">
            <!-- OBJECT ID -->
            <b-row class="mb-3">
              <b-col cols="4">
                <label for="oid">
                  <b>Object ID</b>
                </label>
              </b-col>
              <b-col cols="8">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="oid"
                  v-model="queryParameters.filters.oid"
                  :disabled="loading"
                >
              </b-col>
            </b-row>
            <!-- CLASS -->
            <b-row class="mb-3">
              <b-col cols="4">
                <label for="class">
                  <b>Class</b>
                </label>
              </b-col>
              <b-col cols="8">
                <select
                  class="form-control form-control-sm"
                  id="class"
                  v-model="queryParameters.filters.class"
                >
                  <option value selected>All</option>
                  <option value="1">Cepheid</option>
                  <option value="2">Eclipsing Binary</option>
                  <option value="3">RR Lyrae</option>
                  <option value="4">Delta Scuti</option>
                  <option value="5">Long Period Variable</option>
                  <option value="6">Supernova Ia</option>
                  <option value="7">Supernova II</option>
                  <option value="8">Supernova Ibc</option>
                  <option value="9">Super luminous supernova</option>
                  <option value="10">Supernova Iabg</option>
                  <option value="11">Supernova IIn</option>
                </select>
              </b-col>
            </b-row>
            <!-- SUBCLASS -->
            <b-row class="mb-3">
              <b-col cols="4">
                <label for="subclass">
                  <b>Subclass</b>
                </label>
              </b-col>
              <b-col cols="8">
                <select
                  class="form-control form-control-sm"
                  id="subclass"
                  v-model="queryParameters.filters.subclass"
                  disabled
                >
                  <option value selected>All</option>
                  <option value="1">Star</option>
                  <option value="2">Supernova</option>
                  <option value="3">Variable Star</option>
                </select>
              </b-col>
            </b-row>
            <!-- NUMBER OF OBSERVATIONS -->
            <b-row class="mb-3">
              <b-col cols="12" class="mb-3">
                <b>Number of observations</b>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3" class="text-left">
                    <label>Min</label>
                  </b-col>
                  <b-col cols="9" class="text-left">
                    <input
                      class="form-control form-control-sm"
                      id="minnobs"
                      type="number"
                      min="0"
                      v-model="queryParameters.filters.nobs.min"
                      :disabled="loading"
                    >
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3" class="text-left">
                    <label>Max</label>
                  </b-col>
                  <b-col cols="9" class="text-left">
                    <input
                      class="form-control form-control-sm"
                      id="maxnobs"
                      type="number"
                      :min="queryParameters.filters.nobs.min "
                      v-model="queryParameters.filters.nobs.max"
                      :disabled="loading"
                    >
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- CLASS PROBABILITY -->
            <b-row class="mb-3">
              <b-col cols="12" class="mb-3">
                <b>Class Probability</b>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Min</label>
                  </b-col>
                  <b-col cols="9">
                    <input
                      class="form-control form-control-sm"
                      id="minpclass"
                      type="number"
                      step="0.0001"
                      min="0"
                      max="1"
                      v-model="queryParameters.filters.pclass.min"
                      :disabled="loading"
                    >
                  </b-col>
                </b-row>
              </b-col>
              <b-col>
                <b-row>
                  <b-col cols="3">
                    <label>Max</label>
                  </b-col>
                  <b-col cols="9">
                    <input
                      class="form-control form-control-sm"
                      id="maxpclass"
                      type="number"
                      step="0.0001"
                      :min="queryParameters.filters.pclass.min"
                      max="1"
                      v-model="queryParameters.filters.pclass.max"
                      :disabled="loading"
                    >
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- PERIOD -->
            <b-row>
              <b-col cols="12" class="mb-3">
                <b>Period</b>
              </b-col>
              <b-col md="6">
                <b-row>
                  <b-col cols="3">
                    <label>
                      Min
                      <small class="text-muted">(days)</small>
                    </label>
                  </b-col>
                  <b-col cols="9">
                    <input
                      class="form-control form-control-sm"
                      id="minperiod"
                      min="0"
                      type="number"
                      step="0.1"
                      v-model.number="queryParameters.filters.period.min"
                      :disabled="loading"
                    >
                  </b-col>
                </b-row>
              </b-col>
              <b-col md="6">
                <b-row>
                  <b-col cols="3">
                    <label>
                      Max
                      <small class="text-muted">(days)</small>
                    </label>
                  </b-col>
                  <b-col cols="9">
                    <input
                      class="form-control form-control-sm"
                      :min="queryParameters.filters.period.min"
                      type="number"
                      step="0.1"
                      id="maxperiod"
                      v-model="queryParameters.filters.period.max"
                      :disabled="loading"
                    >
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <!-- HAS CROSSMATCH -->
            <b-row name="ext" class="my-3">
              <b-col cols="12" class="form-check">
                <b-form-group>
                  <b-form-checkbox
                    plain
                    stacked
                    id="ext"
                    v-model="queryParameters.filters.ext"
                    value="1"
                    :unchecked-value="null"
                  >Has Crossmatch</b-form-checkbox>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- MORE OPTIONS BUTTON -->
            <b-row class="mb-2">
              <b-col class="align-middle">
                <div class="text-center">
                  <b-btn variant="outline-secondary" v-b-toggle="'AdvancedSearch'">More Options</b-btn>
                </div>
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col>
                <b-collapse id="AdvancedSearch">
                  <div name="bands" class="mb-3">
                    <h3>Magnitude</h3>
                    <div class="checkbox my-3">
                      <b-form-group>
                        <b-form-checkbox
                          plain
                          stacked
                          id="anyBand"
                          v-on:click="anyBand = !anyBand"
                          v-model="anyBand"
                        >Any band</b-form-checkbox>
                      </b-form-group>
                    </div>
                    <transition name="fade">
                      <b-card no-body id="magnitudTab">
                        <b-tabs card v-show="anyBand">
                          <b-tab>
                            <template slot="title">
                              <strong>Any Band</strong>
                            </template>
                            <tabBand :band="queryParameters.bands.any"></tabBand>
                          </b-tab>
                        </b-tabs>
                        <b-tabs card v-show="!anyBand">
                          <!-- #### U TAB #### -->
                          <b-tab title="u" disabled>
                            <tabBand :band="queryParameters.bands.u"></tabBand>
                          </b-tab>
                          <!-- #### END U TAB #### -->
                          <!-- #### G TAB #### -->
                          <b-tab title="g" active>
                            <tabBand :band="queryParameters.bands.g"></tabBand>
                          </b-tab>
                          <!-- #### END G TAB #### -->
                          <!-- #### R TAB #### -->
                          <b-tab title="r">
                            <tabBand :band="queryParameters.bands.r"></tabBand>
                          </b-tab>
                          <!-- #### END R TAB #### -->
                          <!-- #### I TAB #### -->
                          <b-tab title="i" disabled>
                            <tabBand :band="queryParameters.bands.i"></tabBand>
                          </b-tab>
                          <!-- #### END I TAB #### -->
                          <!-- #### Z TAB #### -->
                          <b-tab title="z" disabled>
                            <tabBand :band="queryParameters.bands.z"></tabBand>
                          </b-tab>
                          <!-- #### END Z TAB #### -->
                          <!-- #### Y TAB #### -->
                          <b-tab title="y" disabled>
                            <tabBand :band="queryParameters.bands.y"></tabBand>
                          </b-tab>
                          <!-- #### END Y TAB #### -->
                        </b-tabs>
                      </b-card>
                    </transition>
                  </div>
                  <div name="dates" class="mb-3">
                    <h2>Dates</h2>
                    <b-card>
                      <b-row class="align-middle" name="JD">
                        <b-col>
                          <p class="small">MJD</p>
                        </b-col>
                        <b-col>
                          <p class="small">Date</p>
                        </b-col>
                      </b-row>
                      <b-row class="align-middle">
                        <b-col>
                          <label>First alert</label>
                        </b-col>
                      </b-row>
                      <b-row class="align-middle" name="firstJD">
                        <b-col>
                          <b-form-input
                            size="sm"
                            id="firstjd"
                            v-model="queryParameters.dates.firstjd"
                          ></b-form-input>
                        </b-col>
                        <b-col>
                          <b-form-input
                            size="sm"
                            id="datepickerfirst"
                            name="firstJD"
                            type="date"
                            v-model="firstGreg"
                          ></b-form-input>
                        </b-col>
                      </b-row>
                      <br>
                      <b-row class="align-middle">
                        <b-col>
                          <label>Last alert</label>
                        </b-col>
                      </b-row>
                      <b-row class="align-middle" name="lastJD">
                        <b-col>
                          <b-form-input
                            size="sm"
                            id="lastjd"
                            v-model="queryParameters.dates.lastjd"
                          ></b-form-input>
                        </b-col>
                        <b-col>
                          <b-form-input
                            size="sm"
                            id="datepickerlast"
                            name="lastJD"
                            type="date"
                            v-model="lastGreg"
                          ></b-form-input>
                        </b-col>
                      </b-row>
                      <br>
                      <b-row class="align-middle">
                        <b-col md="4" class="text-center small">min</b-col>
                        <b-col md="4" class="text-center"></b-col>
                        <b-col md="4" class="text-center small">max</b-col>
                      </b-row>
                      <b-row class="align-middle">
                        <b-col md="4">
                          <b-form-input
                            size="sm"
                            id="minjd"
                            v-model="queryParameters.dates.deltajd.min"
                          ></b-form-input>
                        </b-col>
                        <b-col md="4" class="text-center">
                          delta
                          <small class="text-muted">(days)</small>
                        </b-col>
                        <b-col md="4">
                          <b-form-input
                            size="sm"
                            id="maxjd"
                            v-model="queryParameters.dates.deltajd.max"
                          ></b-form-input>
                        </b-col>
                      </b-row>
                    </b-card>
                  </div>
                  <div name="coordinates">
                    <h2>Coordinates</h2>
                    <b-card no-body>
                      <b-tabs card>
                        <b-tab title="Single">
                          <b-container>
                            <b-row class="align-middle">
                              <b-col md="6">
                                RA
                                <small class="text-muted">(deg)</small>
                              </b-col>
                              <b-col md="6">
                                <b-form-input size="sm" id="RA" v-model="queryParameters.coordinates.ra"></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row class="align-middle">
                              <b-col md="6">
                                DEC
                                <small class="text-muted">(deg)</small>
                              </b-col>
                              <b-col md="6">
                                <b-form-input size="sm" id="DEC" v-model="queryParameters.coordinates.dec"></b-form-input>
                              </b-col>
                            </b-row>
                            <b-row class="align-middle">
                              <b-col md="6">
                                RS
                                <small class="text-muted">(arcsec)</small>
                              </b-col>
                              <b-col md="6">
                                <b-form-input size="sm" id="RS" v-model="queryParameters.coordinates.rs"></b-form-input>
                              </b-col>
                            </b-row>
                          </b-container>
                        </b-tab>
                        <b-tab title="List" disabled>
                          <b-container>
                            <b-row class="align-middle">
                              <b-form-file placeholder="Choose a file..."></b-form-file>
                              <b-alert show class="small">.txt file, format: "RA,DEC,RS\n"</b-alert>
                            </b-row>
                          </b-container>
                        </b-tab>
                      </b-tabs>
                    </b-card>
                  </div>
                </b-collapse>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-container>
                  <b-row class="text-center">
                    <b-col>
                      <b-button variant="outline-secondary" v-on:click="refreshSQL" v-b-toggle="'SQL'">Show SQL</b-button>
                    </b-col>
                  </b-row>
                  <b-collapse id="SQL" class="mt-3">
                    <b-jumbotron>
                        <b-row style="position: absolute; top: 65px; right:55px">
                            <b-button id="refreshSQL" v-on:click="refreshSQL">
                                <v-icon name="redo"/></b-button>
                        </b-row>
                        <b-row>
                            {{currentQuery}}
                        </b-row>
                    </b-jumbotron>
                  </b-collapse>
                  <b-row class="text-center my-4">
                    <b-col>
                      <b-button
                        type="submit"
                        variant="primary"
                        size="lg"
                        block
                        id="searchbtn"
                      >SEARCH</b-button>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col class="text-center">
                      <b-button variant="secondary" size="sm" id="searchbtn" disabled>Save search</b-button>
                    </b-col>
                    <b-col class="text-center">
                      <b-button variant="warning" size="sm" disabled>Subscribe</b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </b-col>
            </b-row>
          </div>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>


<script>
import tabBand from "./tabBand.vue";
export default {
  name: "searchOptions",
  props: ["params", "loading", "currentQueryParent"],
  components: {
    tabBand
  },
  data() {
    return {
      currentQuery: this.currentQueryParent,
      flagFirst: false,
      flagLast: false,
      anyBand: false,
      firstGreg: null,
      lastGreg: null,
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
    };
  },
  computed: {
    firstjd() {
      return this.queryParameters.dates.firstjd;
    },
    lastjd() {
      return this.queryParameters.dates.lastjd;
    }
  },
  watch: {
    queryParameters: {
      handler: function(newVal) {
        let queryToSubmit = this._.cloneDeep(newVal);
        this.checkAnyBand(queryToSubmit);
        this.removeEmpty(queryToSubmit);
      },
      deep: true
    },

    firstGreg: function(newGreg) {
      if (!this.flagFirst) {
        this.flagFirst = true;
        this.queryParameters.dates.firstjd = this.gregorianToJd(newGreg);
      } else {
        this.flagFirst = false;
      }
    },
    lastGreg: function(newGreg) {
      if (!this.flagLast) {
        this.flagLast = true;
        this.queryParameters.dates.lastjd = this.gregorianToJd(newGreg);
      } else {
        this.flagLast = false;
      }
    },
    firstjd() {
      if (!this.flagFirst) {
        this.flagFirst = true;

        this.firstGreg = this.jdToGregorian(this.queryParameters.dates.firstjd);
      } else {
        this.flagFirst = false;
      }
    },
    lastjd() {
      if (!this.flagLast) {
        this.flagLast = true;
        this.lastGreg = this.jdToGregorian(this.queryParameters.dates.lastjd);
      } else {
        this.flagLast = false;
      }
    }
  },
  methods: {
      refreshSQL: function (event) {
          let queryToSubmit = this._.cloneDeep(this.queryParameters);
          this.checkAnyBand(queryToSubmit);
          this.removeEmpty(queryToSubmit);
          this.$http
              .post("/v1/get_sql", {
                  query_parameters: queryToSubmit
                              })
              .then(result_query => {
                  this.currentQuery = result_query.data;
              })
              .catch(() => {
              });
          },
    checkAnyBand: function(queryToSubmit) {
      if (this.anyBand) {
        let any = queryToSubmit.bands.any;
        queryToSubmit.bands = {};
        queryToSubmit.bands.any = any;
      } else {
        let bands = queryToSubmit.bands;
        delete bands.any;
        queryToSubmit.bands = bands;
      }
    },
    jdToGregorian(MJD) {
      var JD = Number(MJD) + 2400000.5;
      const y = 4716;
      const v = 3;
      const j = 1401;
      const u = 5;
      const m = 2;
      const s = 153;
      const n = 12;
      const w = 2;
      const r = 4;
      const B = 274277;
      const p = 1461;
      const C = -38;
      var f =
        JD + j + Math.floor((Math.floor((4 * JD + B) / 146097) * 3) / 4) + C;
      var e = r * f + v;
      var g = Math.floor((e % p) / r);

      var h = u * g + w;
      var D = Math.floor((h % s) / u) + 1;
      var M = ((Math.floor(h / s) + m) % n) + 1;
      var Y = Math.floor(e / p) - y + Math.floor((n + m - M) / n);

      var day = ("0" + D).slice(-2);
      var month = ("0" + M).slice(-2);
      var year = ("000" + Y).slice(-4);

      var today = year + "-" + month + "-" + day;

      return today;
    },
    gregorianToJd(gDate) {
      //MJD = JD − 2400000.5
      var dateObj = new Date(gDate);
      var mjulianDate = dateObj / 86400000 + 40588;

      return mjulianDate;
    },
    removeEmpty(obj) {
      Object.entries(obj).forEach(([key, val]) => {
        if (val && typeof val === "object") {
          this.removeEmpty(val);
          if (Object.keys(val).length === 0) delete obj[key];
        } else {
          if (val == null || val == "") delete obj[key];
        }
      });
    },
    onSubmitQuery() {
      let queryToSubmit = this._.cloneDeep(this.queryParameters);
      this.checkAnyBand(queryToSubmit);
      this.removeEmpty(queryToSubmit);
      this.$emit("update:params", queryToSubmit);
      this.$emit("update:currentQueryParent", this.currentQuery);
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transition: opacity 2.5s;
}
</style>
