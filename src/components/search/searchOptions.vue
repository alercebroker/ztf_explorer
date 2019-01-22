<template>
  <div class="searchOptions">
    <!-- <b-form v-on:submit.prevent="onQuerySubmit"> -->
    <br>
    <b-card no-body header-tag="header">
      <div slot="header">
        <b-row>
          <b-col>
            <h3>Search Options</h3>
          </b-col>
        </b-row>
      </div>
      <b-card-body>
        <b-row class="mb-3">
          <b-col>
            <b-btn
              variant="outline-primary"
              size="sm"
              block="true"
              @click="clearQuery"
            >Clear all options</b-btn>
          </b-col>
        </b-row>
        <b-form v-on:submit.prevent="onSubmitQuery">
          <div class="filter-content">
            <!-- DEFAULT OPTIONS -->
            <default-options></default-options>
            
            <!-- MORE OPTIONS BUTTON -->
            <b-row class="mb-2">
              <b-col class="align-middle">
                <b-btn
                  block="true"
                  variant="outline-secondary"
                  v-b-toggle.AdvancedSearch
                  @click="changeMoreOptLabel()"
                >{{ moreOptsLabel }}</b-btn>
              </b-col>
            </b-row>

            <b-row class="mb-3">
              <b-col>
                <b-collapse id="AdvancedSearch">
                  <advanced-options></advanced-options>
                </b-collapse>
              </b-col>
            </b-row>

            <b-row class="text-center">
              <b-col>
                <b-button
                  block="true"
                  variant="outline-secondary"
                  v-on:click="changeShowSQLLabel"
                  v-b-toggle="'SQL'"
                >{{ showSQLLabel }}</b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-collapse id="SQL" class="mt-3">
                  <div class="pt-2 pb-4" style="background-color:#e9ecef">
                    <div class="text-right mr-2 mb-1">
                      <b-button id="refreshSQL" v-on:click="refreshSQL">
                        <v-icon name="redo"/>
                      </b-button>
                    </div>
                    <div class="mx-2 text-center">{{currentQuery}}</div>
                  </div>
                </b-collapse>
              </b-col>
            </b-row>

            <b-row class="text-center my-4">
              <b-col>
                <b-button
                  type="submit"
                  variant="primary"
                  size="lg"
                  block="true"
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
          </div>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>


<script>
import defaultOptions from './defaultOptions.vue';
import advancedOptions from './advancedOptions.vue';
export default {
  name: "searchOptions",
  props: ["params", "loading", "currentQueryParent"],
  components: {
    defaultOptions,
    advancedOptions
  },
  data() {
    return {
      currentQuery: this.currentQueryParent,
      flagFirst: false,
      flagLast: false,
      anyBand: false,
      firstGreg: null,
      lastGreg: null,
      coordSearch: false,
      moreOptsLabel: "More Options",
      showSQLLabel: "Show SQL",
      emptyQuery: {
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
  /**
   * variables computadas
   * */
  computed: {
    firstjd() {
      return this.queryParameters.dates.firstjd;
    },
    lastjd() {
      return this.queryParameters.dates.lastjd;
    }
  },
  watch: {
    "queryParameters.coordinates": {
      handler: function(newVal) {
        let req = false;
        for (let k in newVal) {
          if (newVal[k] != null && newVal[k] != "") {
            req = true;
          }
        }
        this.coordSearch = req;
      },
      deep: true
    },
    /**
     *  cleans empty variables from query parameters
     *  */
    queryParameters: {
      handler: function(newVal) {
        let queryToSubmit = this._.cloneDeep(newVal);
        this.checkAnyBand(queryToSubmit);
        this.removeEmpty(queryToSubmit);
      },
      deep: true
    },
    /**
     * watch date variables to change date cheking if flag is active first, flags avoid over write
     * */
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
    /**
     * change option avanced label
     */
    changeMoreOptLabel() {
      this.moreOptsLabel =
        this.moreOptsLabel == "More Options" ? "Hide" : "More Options";
    },
    /**
     * change option text in show sql
     */
    changeShowSQLLabel() {
      this.refreshSQL();
      this.showSQLLabel =
        this.showSQLLabel == "Show SQL" ? "Hide SQL" : "Show SQL";
    },
    /**
     * request api new sql to show
     */
    refreshSQL: function() {
      let queryToSubmit = this._.cloneDeep(this.queryParameters);
      this.checkAnyBand(queryToSubmit);
      this.removeEmpty(queryToSubmit);
      this.$http
        .post("/v2/get_sql", {
          query_parameters: queryToSubmit
        })
        .then(result_query => {
          this.currentQuery = result_query.data;
        })
        .catch(() => {});
    },
    /**
     * clear other bands if anyband is checked
     */
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

    /**
     * receives date in julian format and convert in gregorian format
     * @param MJD:date in julian format
     * @returns {string} : date in gregorian format
     */
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

    /**
     * receives date in gregorian format and convert in julian format
     * @param gDate:date in gregorian format
     * @returns {number} : date in jualian format
     */
    gregorianToJd(gDate) {
      //MJD = JD − 2400000.5
      var dateObj = new Date(gDate);
      var mjulianDate = dateObj / 86400000 + 40588;
      return mjulianDate;
    },
    /**
     * reset all input
     */
    clearQuery() {
      let emptyQ = this._.cloneDeep(this.emptyQuery);
      this.queryParameters = emptyQ;
    },
    /**
     * remove param that are empty
     */
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

    /**
     * update params in component parent
     */
    onSubmitQuery() {
      let queryToSubmit = this._.cloneDeep(this.queryParameters);
      this.checkAnyBand(queryToSubmit);
      this.removeEmpty(queryToSubmit);
      this.$emit("update:params", queryToSubmit);
      this.$emit("update:currentQueryParent", this.currentQuery);
      window.scrollTo(0, 0);
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
