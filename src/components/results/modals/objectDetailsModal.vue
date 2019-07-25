<template>
    <v-dialog id="objectModal" v-model="showModal" @input="closeModal">
        <v-tabs dark background-color="toolbar">
            <v-tab ripple>General Information</v-tab>
            <v-tab-item>
                <v-card id="objectModalCard">
                    <v-card-text id="objectModalInside">
                        <!-- start inside modal-->
                        <v-layout row wrap>
                            <v-flex xs12 md3>
                                <v-card height="98%">
                                    <v-card-text>
                                        <v-layout row wrap>
                                            <v-flex xs12>
                                                <v-data-table
                                                    :headers="infoHeaders"
                                                    :items="generalInformation"
                                                    hide-default-footer
                                                    hide-default-header
                                                    dense
                                                ></v-data-table>
                                            </v-flex>
                                            <v-flex xs12 pt-4>
                                                <v-layout>
                                                    <v-flex xs4>
                                                        <v-btn
                                                            small
                                                            :href="nedUrl"
                                                            target="_blank"
                                                            dark
                                                            color="green"
                                                        >NED</v-btn>
                                                    </v-flex>
                                                    <v-flex xs4>
                                                        <v-btn
                                                            small
                                                            :href="simbadUrl"
                                                            target="_blank"
                                                            dark
                                                            color="primary"
                                                        >SIMBAD</v-btn>
                                                    </v-flex>
                                                    <v-flex xs4>
                                                        <v-btn
                                                            small
                                                            :href="tnsUrl"
                                                            target="_blank"
                                                            dark
                                                            color="orange"
                                                        >TNS</v-btn>
                                                    </v-flex>
                                                </v-layout>
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
                                        <span class="title">
                                            <v-icon>screen_rotation</v-icon>to see the light curve.
                                        </span>
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

                            <v-flex xs12 md3>
                                <v-card height="100%">
                                    <v-card-title primary-title>
                                        <span class="title">Magnitude Statistics</span>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text style="padding: 0 0 0 0;">
                                        <v-data-table
                                            :headers="headers"
                                            :items="magnitudeItems"
                                            hide-default-footer
                                        ></v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md6 hidden-sm-and-down>
                                <card-stamps-png />
                            </v-flex>
                            <v-flex xs12 md3>
                                <!-- PROBABILITIES -->
                                <card-probabilities />
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <!-- end inside modal-->
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
            ],
            infoHeaders: [
                { text: "Column", value: "column" },
                { text: "Value", value: "value" }
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
        getClass(obj) {
            let ret = this.$store.state.search.classes.find(function(x) {
                if (x.value == obj) {
                    return x;
                }
            });
            return ret ? ret.text : "-";
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
                console.log("show modal", this.$store.state.results.showObjectDetailsModal)
                return this.$store.state.results.showObjectDetailsModal;
            },
            set(value) {
                this.$store.dispatch("setShowObjectDetailsModal", value);
            }
        },
        ztf_object() {
            return this.$store.state.results.selectedObject;
        },
        generalInformation() {
            let info = [
                { column: "Object", value: this.ztf_object.oid },
                this.ztf_object.classxmatch
                    ? {
                          column: "X-Match",
                          value: this.getClass(this.ztf_object.classxmatch)
                      }
                    : null,
                this.ztf_object.classrf
                    ? {
                          column: "RandomForest",
                          value: this.getClass(this.ztf_object.classrf)
                      }
                    : null,
                this.ztf_object.classearly
                    ? {
                          column: "EarlyClassifier",
                          value: this.ztf_object.classearly
                      }
                    : null,
                { column: "RA", value: this.ztf_object.meanra },
                { column: "DEC", value: this.ztf_object.meandec },
                this.$store.state.results.objectDetails.detections
                    ? {
                          column: "Detections",
                          value: this.$store.state.results.objectDetails
                              .detections.length
                      }
                    : null,
                this.$store.state.results.objectDetails.non_detections
                    ? {
                          column: "Non-Detections",
                          value: this.$store.state.results.objectDetails
                              .non_detections.length
                      }
                    : null,
                {
                    column: "Discovery Date",
                    value: this.mjdToDate(this.ztf_object.firstmjd)
                },
                {
                    column: "Last Detection",
                    value: this.mjdToDate(this.ztf_object.lastmjd)
                }
            ];
            let filtered = info.filter(function(el) {
                return el != null;
            });
            return filtered;
        },

        magnitudeItems() {
            return [
                {
                    Item: "Mean",
                    g: this.ztf_object.mean_magpsf_g
                        ? this.ztf_object.mean_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.mean_magpsf_r
                        ? this.ztf_object.mean_magpsf_r.toFixed(3)
                        : "-"
                },
                {
                    Item: "Median",
                    g: this.ztf_object.median_magpsf_g
                        ? this.ztf_object.median_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.median_magpsf_r
                        ? this.ztf_object.median_magpsf_r.toFixed(3)
                        : "-"
                },
                {
                    Item: "First",
                    g: this.ztf_object.first_magpsf_g
                        ? this.ztf_object.first_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.first_magpsf_r
                        ? this.ztf_object.first_magpsf_r.toFixed(3)
                        : "-"
                },
                {
                    Item: "Last",
                    g: this.ztf_object.last_magpsf_g
                        ? this.ztf_object.last_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.last_magpsf_r
                        ? this.ztf_object.last_magpsf_r.toFixed(3)
                        : "-"
                },
                {
                    Item: "Min",
                    g: this.ztf_object.min_magpsf_g
                        ? this.ztf_object.min_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.min_magpsf_r
                        ? this.ztf_object.min_magpsf_r.toFixed(3)
                        : "-"
                },
                {
                    Item: "Max",
                    g: this.ztf_object.max_magpsf_g
                        ? this.ztf_object.max_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.max_magpsf_r
                        ? this.ztf_object.max_magpsf_r.toFixed(3)
                        : "-"
                }
            ];
        },
        nedUrl() {
            return this.ztf_object
                ? "https://ned.ipac.caltech.edu/conesearch?search_type=Near+Position+Search&iau_style=liberal&objname=&coordinates=" +
                      Math.round(this.ztf_object.meanra * 1000) / 1000 +
                      "d," +
                      Math.round(this.ztf_object.meandec * 1000) / 1000 +
                      "d&iau_name=&radius=0.17&in_csys=Equatorial&in_equinox=J2000&in_csys_IAU=Equatorial&in_equinox_IAU=B1950&z_constraint=Unconstrained&z_value1=&z_value2=&z_unit=z&ot_include=ANY&nmp_op=ANY&hconst=67.8&omegam=0.308&omegav=0.692&wmap=4&corr_z=1&out_csys=Same+as+Input&out_equinox=Same+as+Input&obj_sort=Distance+to+search+center&op=Go&form_build_id=form-a28snc2SSIQl3faGUe4otq7_NcjnMwxxxPoVxw5LHzg&form_id=conesearch"
                : "#";
        },
        tnsUrl() {
            return this.ztf_object
                ? "https://wis-tns.weizmann.ac.il/search?ra=" +
                      this.ztf_object.meanra +
                      "&decl=" +
                      this.ztf_object.meandec +
                      "&radius=10&coords_unit=arcsec"
                : "#";
        },
        simbadUrl() {
            return this.ztf_object
                ? "http://simbad.u-strasbg.fr/simbad/sim-coo?Coord=" +
                      this.ztf_object.meanra +
                      "%20" +
                      this.ztf_object.meandec +
                      "&Radius.unit=arcsec&Radius=10"
                : "#";
        },
        fontStyle() {
            switch (this.$vuetify.breakpoint.name) {
                case "xs":
                    return "font-size:1em";
                case "md":
                    return "font-size:1em";
                default:
                    return "font-size:1.4em";
            }
        }
    },
    mounted: function() {},

};
</script>

<style scoped>
ul {
    padding: 3px;
    margin: 0px;
    list-style-type: none;
}
#objectModal {
    margin: 2px 2px 2px 2px;
}
.v-card:not(#objectModalCard) {
    margin: 4px 4px 4px 4px;
}
#objectModalInside {
    background-color: #e0e0e0;
}
</style>
