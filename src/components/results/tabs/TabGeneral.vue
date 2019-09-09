<template>
    <v-card fluid tile class="ma-0" outlined>
        <v-card-text id="objectModalInside" class="pt-1">
            <!-- start inside modal-->
            <v-layout row wrap>
                <!--BASIC INFORMATION-->
                <v-flex xs12 md3>
                    <card-basic-information/>
                </v-flex>
                <!--LIGHT CURVE-->
                <v-flex xs12 md6>
                    <!--If the screen is mobile-->
                    <v-layout>
                        <v-flex hidden-xs-only>
                            <card-light-curve />
                        </v-flex>
                        <!--If the screen is upper-->
                        <v-flex hidden-sm-and-up>
                            <v-alert :value="true" type="warning" fluid>
                                <span class="title">
                                    <v-icon>screen_rotation</v-icon>to see the light curve.
                                </span>
                            </v-alert>
                        </v-flex>
                    </v-layout>
                </v-flex>
                <!-- ALADIN -->
                <v-flex xs12 md3>
                    <aladin />
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12 md4 hidden-md-and-up>
                    <card-stamps-png />
                </v-flex>

                <v-flex xs12 md4>
                    <v-card height="100%">
                        <v-toolbar dense flat dark>
                            <v-toolbar-title> Magnitude Statistics </v-toolbar-title>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-card-text style="padding: 0 0 0 0;">
                            <v-data-table
                                :mobile-breakpoint="250"
                                :headers="headers"
                                :items="magnitudeItems"
                                hide-default-footer
                                dense
                            ></v-data-table>
                        </v-card-text>
                    </v-card>
                </v-flex>

                <v-flex xs12 md4>
                    <!-- PROBABILITIES -->
                    <card-probabilities />
                </v-flex>
                <v-flex xs12 md4 hidden-sm-and-down>
                    <card-stamps-png />
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>
<script>
import aladin from "../cards/aladin.vue";
import cardBasicInformation from "../cards/cardBasicInformation.vue"
import cardLightCurve from "../cards/cardLightCurve.vue";
import cardProbabilities from "../cards/cardProbabilities.vue";
import cardStampsPng from "../cards/cardStampsPng.vue";
import { jdToDate } from "../../utils/AstroDates.js";
export default {
    name: "tabGeneralInformation",
    data() {
        return {
            headers: [
                { text: "Item", value: "Item" },
                { text: "g", value: "g" },
                { text: "r", value: "r" }
            ],
        };
    },
    components: {
        cardLightCurve,
        aladin,
        cardProbabilities,
        cardStampsPng,
        cardBasicInformation
    },
    methods: {
        mjdToDate(mjd) {
            return jdToDate(mjd).toUTCString();
        },
        changeMjdButtonText() {
            if (this.mjdButtonText === "View MJD") {
                this.mjdButtonText = "View Date";
                let discovery = this.generalInformation.find(function(element) {
                    return element.column === "Discovery Date";
                });
                discovery.value = this.ztf_object.firstmjd;
                let last = this.generalInformation.find(function(element) {
                    return element.column === "Last Detection";
                });
                last.value = this.ztf_object.lastmjd;
            } else {
                this.mjdButtonText = "View MJD";
                let discovery = this.generalInformation.find(function(element) {
                    return element.column === "Discovery Date";
                });
                discovery.value =
                    this.mjdToDate(this.ztf_object.firstmjd).slice(0, -3) +
                    "UT";
                let last = this.generalInformation.find(function(element) {
                    return element.column === "Last Detection";
                });
                last.value =
                    this.mjdToDate(this.ztf_object.lastmjd).slice(0, -3) + "UT";
            }
        }
    },
    computed: {
        ztf_object() {
            return this.$store.state.results.selectedObject;
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
    mounted: function() {}
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
