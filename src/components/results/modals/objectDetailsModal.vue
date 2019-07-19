<template>
    <v-dialog id="objectModal" v-model="showModal">
      <v-tabs  dark slider-color="blue">
      <v-tab ripple>
        General Information
      </v-tab>
      <v-tab-item>
          <v-card flat>
              <v-card-text> <!-- start inside modal-->

                <v-layout row wrap>
                  <v-flex xs12 md2>
                    <v-layout row wrap >
                      <v-flex xs4 sm12 class="generalInfoCard">
                        <v-card>
                          <v-card-text>
                            <ul>
                              <!--ZTF id-->
                              <li>
                                <strong>Object:</strong>
                                {{ ztf_object.oid }}
                              </li>
                              <!-- Classification -->
                              <li v-if="ztf_object.classxmatch">
                                <strong>Class:</strong>
                                {{ ztf_object.classxmatch }} (X-MATCH)
                              </li>
                              <li v-if="ztf_object.classrf">
                                <strong>Class:</strong>
                                {{ ztf_object.classrf }} (ML_RF)
                              </li>
                              <li v-if="ztf_object.classrnn">
                                <strong>Class:</strong>
                                {{ ztf_object.classrnn }} (ML_RNN)
                              </li>
                              <li v-if="ztf_object.classrnn">
                                <strong>Class:</strong>
                                {{ ztf_object.classrnn }} (ML_RNN)
                              </li>
                              <!--RA/Dec-->
                              <li>
                                <v-layout column wrap>
                                  <v-flex xs6>
                                    <strong>RA:</strong>{{ ztf_object.meanra ? ztf_object.meanra : '-' }},
                                  </v-flex>
                                  <v-flex xs6>
                                    <strong>DEC:</strong>{{ ztf_object.meandec ? ztf_object.meandec : '-' }}
                                  </v-flex>

                                </v-layout>
                              </li>
                            </ul>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex xs6 sm12  class="generalInfoCard">
                        <v-card>
                          <v-card-text>
                            <ul>
                                <li>
                                    <strong>Detections:</strong>
                                    {{ $store.state.results.objectDetails.detections ? $store.state.results.objectDetails.detections.length : '-' }}
                                </li>
                                <li>
                                    <strong>Non-Detections:</strong>
                                    {{ $store.state.results.objectDetails.non_detections ? $store.state.results.objectDetails.non_detections.length : '-' }}
                                </li>
                                <li>
                                    <strong>First date:</strong>
                                    {{ mjdToDate(ztf_object.firstmjd) }}
                                </li>
                                <li>
                                    <strong>Last date:</strong>
                                    {{ mjdToDate(ztf_object.lastmjd) }}
                                </li>
                            </ul>
                          </v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex class="text-xs-center" xs12>
                        <v-btn round :href="nedUrl" target="_blank" dark color="green">NED</v-btn>
                        <v-btn round :href="tnsUrl" target="_blank" dark color="orange">TNS</v-btn>
                        <v-btn round :href="simbadUrl" target="_blank" dark color="primary">SIMBAD</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 md7><!-- start light curve flex-->
                    <card-light-curve />
                  </v-flex><!-- end light curve flex-->
                  <!-- ALADIN -->
                  <v-flex xs12 md3>
                    <aladin v-if="$store.state.loading === false" />
                  </v-flex>
                </v-layout>


                <v-layout row wrap>
                  <v-flex xs12 md5>
                      <card-stamps-png />
                  </v-flex>
                  <!-- PROBABILITIES -->
                  <!-- <v-flex xs12 md4>
                      <card-probabilities />
                  </v-flex> -->

                </v-layout>


              </v-card-text> <!-- end inside modal-->
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-dialog>
</template>

<script>
import cardLightCurve from "../cards/cardLightCurve";
import aladin from "../cards/aladin.vue";
import cardProbabilities from "../cards/cardProbabilities.vue";
import cardStampsPng from "../cards/cardStampsPng.vue";
import { jdToGregorian } from "../../utils/AstroDates.js";

export default {
    name: "object-details-modal",
    props: ["id", "show"],
    data() {
        return {
            headers: [
                { text: "Item", value: "Item" },
                { text: "g", value: "g" },
                { text: "r", value: "r" }
            ]
        };
    },
    components: {
        cardLightCurve,
        aladin,
        cardProbabilities,
        cardStampsPng
    },
    methods: {
        getClass(obj, classifier) {
            return this.$store.state.search.classes.find(function(x) {
                console.log("classifier", obj[classifier])
                if (x.value == obj[classifier]) {
                    return x;
                }
            }).text;
        },

        closeModal: function() {
            this.$emit("modalClosed");
            this.$router.replace("/");
        },
        mjdToDate(mjd) {
            return jdToGregorian(mjd);
        }
    },
    computed: {
        showModal: {
            get() {
                return this.$store.state.results.showObjectDetailsModal;
            },
            set(value) {
                this.$store.dispatch("setShowObjectDetailsModal", value);
            }
        },
        ztf_object() {
            return this.$store.state.results.selectedObject;
        },
        magnitudeItems() {
            return [
                {
                    Item: "Mean",
                    g: this.ztf_object.mean_magpsf_g,
                    r: this.ztf_object.mean_magpsf_r
                },
                {
                    Item: "Median",
                    g: this.ztf_object.median_magpsf_g,
                    r: this.ztf_object.median_magpsf_r
                },
                {
                    Item: "First",
                    g: this.ztf_object.first_magpsf_g,
                    r: this.ztf_object.first_magpsf_r
                },
                {
                    Item: "Last",
                    g: this.ztf_object.last_magpsf_g,
                    r: this.ztf_object.last_magpsf_r
                },
                {
                    Item: "Min",
                    g: this.ztf_object.min_magpsf_g,
                    r: this.ztf_object.min_magpsf_r
                },
                {
                    Item: "Max",
                    g: this.ztf_object.max_magpsf_g,
                    r: this.ztf_object.max_magpsf_r
                }
            ];
        },
        nedUrl(){
        return this.ztf_object ? 'http://ned.ipac.caltech.edu/cgi-bin/nph-objsearch?lon='+this.ztf_object.meanra+'d&lat='+this.ztf_object.meandec+'&radius=0.16&search_type=Near+Position+Search' : "#";
        },
        tnsUrl(){
          return this.ztf_object ? 'https://wis-tns.weizmann.ac.il/search?ra='+this.ztf_object.meanra+'&decl='+this.ztf_object.meandec+'&radius=10&coords_unit=arcsec' : "#";
        },
        simbadUrl(){
          return this.ztf_object ? 'http://simbad.u-strasbg.fr/simbad/sim-coo?Coord='+this.ztf_object.meanra+"%20"+this.ztf_object.meandec+'&Radius.unit=arcsec&Radius=10' : "#";
        }
    },
    mounted: function() {}
};
</script>

<style scoped>
ul {
    padding: 3px;
    margin: 0px;
}
#objectModal{
  margin: 2px 2px 2px 2px;
}
.generalInfoCard{
  height: "100%";
  width: "100%";
  margin-top: auto;
  margin-bottom: auto;
}
</style>
