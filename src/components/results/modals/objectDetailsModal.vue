<template>
    <v-dialog id="objectModal" v-model="showModal" @input="closeModal">
      <v-tabs  dark color="toolbar">
        <v-tab ripple>
          General Information
        </v-tab>
      <v-tab-item>
          <v-card id="objectModalCard">
              <v-card-text id="objectModalInside"> <!-- start inside modal-->
                <v-layout row wrap>
                  <v-flex xs12 md3  >
                    <v-card height="98%">
                      <v-card-text>
                        <v-layout column wrap >
                          <v-flex >
                            <ul>
                              <!--ZTF id-->
                              <li :style="fontStyle" >
                                <span class="custom-selector font-weight-black">Object:</span>
                                {{ ztf_object.oid }}
                              </li>
                              <!-- Classification -->
                              <li :style="fontStyle" v-if="ztf_object.classxmatch">
                                <span class="font-weight-black">Class:</span>
                                {{ ztf_object.classxmatch }} (X-MATCH)
                              </li>
                              <li :style="fontStyle" v-if="ztf_object.classrf">
                                <span class="font-weight-black">Class:</span>
                                {{ ztf_object.classrf }} (ML_RF)
                              </li>
                              <li :style="fontStyle" v-if="ztf_object.classrnn">
                                <span class="font-weight-black">Class:</span>
                                {{ ztf_object.classrnn }} (ML_RNN)
                              </li>
                              <li :style="fontStyle" v-if="ztf_object.classrnn">
                                <span class="font-weight-black">Class:</span>
                                {{ ztf_object.classrnn }} (ML_RNN)
                              </li>
                              <!--RA/Dec-->
                              <li>
                                <v-layout column wrap>
                                  <v-flex :style="fontStyle" xs6>
                                    <span class="font-weight-black ">RA:</span>{{ ztf_object.meanra ? ztf_object.meanra : '-' }}
                                  </v-flex>
                                  <v-flex :style="fontStyle" xs6>
                                    <span class="font-weight-black">DEC:</span>{{ ztf_object.meandec ? ztf_object.meandec : '-' }}
                                  </v-flex>

                                </v-layout>
                              </li>
                              <li :style="fontStyle">
                                <span  class="font-weight-black">Detections:</span>
                                {{ $store.state.results.objectDetails.detections ? $store.state.results.objectDetails.detections.length : '-' }}
                              </li>
                              <li :style="fontStyle">
                                <span class="font-weight-black">Non-Detections:</span>
                                {{ $store.state.results.objectDetails.non_detections ? $store.state.results.objectDetails.non_detections.length : '-' }}
                              </li>
                              <li :style="fontStyle">
                                <span class="font-weight-black">Discovery Date:</span>
                                {{ mjdToDate(ztf_object.firstmjd) }}
                              </li>
                              <li :style="fontStyle">
                                <span class="font-weight-black">Last Detection:</span>
                                {{ mjdToDate(ztf_object.lastmjd) }}
                              </li>
                            </ul>
                          </v-flex>
                          <v-divider></v-divider>
                          <v-flex xs12 class="text-xs-center">
                                <v-btn small :href="nedUrl" target="_blank" dark color="green">NED</v-btn>
                                <v-btn small :href="simbadUrl" target="_blank" dark color="primary">SIMBAD</v-btn>
                                <v-btn small :href="tnsUrl" target="_blank" dark color="orange">TNS</v-btn>
                          </v-flex>
                        </v-layout>
                    </v-card-text>
                  </v-card>
                </v-flex>
                  <!--LIGHT CURVE-->
                  <v-flex xs12 md6>
                    <!--If the screen is mobile-->
                    <v-flex hidden-xs-only>
                      <card-light-curve v-if="$store.state.loading === false" />
                    </v-flex>
                    <!--If the screen is upper-->
                    <v-flex hidden-sm-and-up>
                      <v-alert :value="true" type="warning" fluid>
                          <span class="title"<v-icon>screen_rotation</v-icon>  to see the light curve.</span>
                      </v-alert>
                    </v-flex>
                  </v-flex>
                  <!-- ALADIN -->
                  <v-flex xs12 md3>
                    <aladin v-if="$store.state.loading === false" />
                  </v-flex>
                </v-layout>

                <v-layout row wrap>

                  <v-flex xs12 md4 hidden-sm-and-up>
                      <card-stamps-png />
                  </v-flex>


                  <v-flex xs12 md4>
                    <v-card height="100%">
                      <v-card-title primary-title>
                        <span class="title"> Magnitude Statistics</span>

                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text style="padding: 0 0 0 0;">
                          <v-data-table
                          :headers="headers"
                          :items="magnitudeItems"
                          class="elevation-1"
                          hide-actions
                          >
                          <template v-slot:items="props">
                            <td
                            v-for="header in headers"
                            :key="header.value"
                            >{{typeof props.item[header.value] == 'number'? Math.round(props.item[header.value]*1000)/1000 : props.item[header.value] }} </td>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </v-flex>



                  <v-flex xs12 md4>
                    <!-- PROBABILITIES -->
                    <card-probabilities />
                  </v-flex>
                  <v-spacer></v-spacer>


                  <v-flex xs12 md4 hidden-sm-and-down>
                      <card-stamps-png />
                  </v-flex>
                </v-layout>
              </v-card-text> <!-- end inside modal-->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.stop="closeModal">Close</v-btn>
              </v-card-actions>
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
          return this.ztf_object ? "https://ned.ipac.caltech.edu/conesearch?search_type=Near+Position+Search&iau_style=liberal&objname=&coordinates="+Math.round(this.ztf_object.meanra*1000)/1000+"d,"+Math.round(this.ztf_object.meandec*1000)/1000+"d&iau_name=&radius=0.17&in_csys=Equatorial&in_equinox=J2000&in_csys_IAU=Equatorial&in_equinox_IAU=B1950&z_constraint=Unconstrained&z_value1=&z_value2=&z_unit=z&ot_include=ANY&nmp_op=ANY&hconst=67.8&omegam=0.308&omegav=0.692&wmap=4&corr_z=1&out_csys=Same+as+Input&out_equinox=Same+as+Input&obj_sort=Distance+to+search+center&op=Go&form_build_id=form-a28snc2SSIQl3faGUe4otq7_NcjnMwxxxPoVxw5LHzg&form_id=conesearch" : "#";
        },
        tnsUrl(){
          return this.ztf_object ? 'https://wis-tns.weizmann.ac.il/search?ra='+this.ztf_object.meanra+'&decl='+this.ztf_object.meandec+'&radius=10&coords_unit=arcsec' : "#";
        },
        simbadUrl(){
          return this.ztf_object ? 'http://simbad.u-strasbg.fr/simbad/sim-coo?Coord='+this.ztf_object.meanra+"%20"+this.ztf_object.meandec+'&Radius.unit=arcsec&Radius=10' : "#";
        },
        fontStyle(){
          switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 'font-size:1em';
            case 'md': return 'font-size:1em';
            default: return 'font-size:1.4em';
          }
        }
    },
    mounted: function() {}
};
</script>

<style scoped>
ul {
    padding: 3px;
    margin: 0px;
    list-style-type: none;
}
#objectModal{
  margin: 2px 2px 2px 2px;
}
.v-card:not(#objectModalCard){
  margin:4px 4px 4px 4px;
}
#objectModalInside{
  background-color:#BEBEBE;
}
</style>
