<template>
    <v-card height="98%">
        <!-- <v-toolbar dense flat>
            <v-spacer></v-spacer>

            <template v-if="$vuetify.breakpoint.smAndUp">
                <v-btn icon :href="findingchart_link" download>
                    <v-icon>mdi-file-document-outline</v-icon>
                </v-btn>
                <v-btn icon @click="changeMjdButtonText">
                    <v-icon>mdi-delete-circle</v-icon>
                </v-btn>
                <v-btn icon @click="changeRaDec">
                    <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
            </template>
        </v-toolbar> -->

        <v-card-text class="bt-0">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-data-table
                        :headers="infoHeaders"
                        :items="generalInformation"
                        hide-default-footer
                        hide-default-header
                        dense
                        :mobile-breakpoint="250">
                    </v-data-table>
                </v-flex>
                <v-divider></v-divider>
                <v-flex xs12>
                    <v-btn
                        small
                        text
                        block
                        color="primary"
                        @click="changeMjdButtonText"
                    >{{ mjdButtonText }}</v-btn>
                </v-flex>
                <v-flex xs12>
                    <v-btn
                        small
                        depressed
                        block
                        color="dark"
                        @click="changeRaDec"
                    >{{ hmsButtonText }}</v-btn>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>
<script>
import { jdToDate, HMStoRaDec, raDectoHMS } from "../../utils/AstroDates.js";
import { watch } from 'fs';
export default {
    name: "cardBasicInformation",
    data() {
        return {
            headers: [
                { text: "Item", value: "Item" },
                { text: "g", value: "g" },
                { text: "r", value: "r" }
            ],
            infoHeaders: [
                { text: "Column", value: "column"},
                { text: "Value", value: "value"}
            ],
            mjdButtonText: "View MJD",
            hmsButtonText: "View H:M:S",
            ra: 0,
            dec: 0
        };
    },
    methods: {
        getLateClass(obj) {
            let ret = this.$store.getters.lateClasses.find(function(x) {
                if (x.value == obj) {
                    return x;
                }
            });
            return ret ? ret.text : "-";
        },
        getEarlyClass(obj) {
            let ret = this.$store.getters.earlyClasses.find(function(x) {
                if (x.value == obj) {
                    return x;
                }
            });
            return ret ? ret.text : "-";
        },
        getXmatchClass(obj, classifier) {
            let ret = this.$store.getters.xmatchClasses.find(function(x) {
                if (x.value == obj) {
                    return x;
                }
            });
            return ret ? ret.text : "-";
        },
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
        },
        changeRaDec() {
            let RA = this.generalInformation.find(function(element) {
                return element.column === "RA";
            });
            let DEC = this.generalInformation.find(function(element) {
                return element.column === "DEC";
            });

            if (this.hmsButtonText === "View H:M:S") {
                this.hmsButtonText = "View RA/DEC";
                let hhmmss = raDectoHMS(RA.value, DEC.value);
                this.ra = RA.value;
                this.dec = DEC.value;
                RA.value = hhmmss[0];
                DEC.value = hhmmss[1];
            } 
            else {
                this.hmsButtonText = "View H:M:S";
                //let ra_dec = HMStoRaDec(`${RA.value} ${DEC.value}`)
                RA.value = this.ra;
                DEC.value = this.dec;
            }
        }
    },
    computed: {
        ztf_object() {
            return this.$store.state.results.selectedObject;
        },
        generalInformation() {
            let info = [
                { column: "Object", value: this.ztf_object.oid },
                this.ztf_object.classxmatch
                    ? {
                          column: "X-Match",
                          value: this.getXmatchClass(
                              this.ztf_object.classxmatch
                          )
                      }
                    : null,
                this.ztf_object.classrf
                    ? {
                          column: "LateClassifier",
                          value: this.getLateClass(this.ztf_object.classrf)
                      }
                    : null,
                this.ztf_object.classearly
                    ? {
                          column: "EarlyClassifier",
                          value: this.getEarlyClass(this.ztf_object.classearly)
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
                this.ztf_object.firstmjd
                    ? {
                          column: "Discovery Date",
                          value:
                              this.mjdToDate(this.ztf_object.firstmjd).slice(
                                  0,
                                  -3
                              ) + "UT"
                      }
                    : null,
                this.ztf_object.lastmjd
                    ? {
                          column: "Last Detection",
                          value:
                              this.mjdToDate(this.ztf_object.lastmjd).slice(
                                  0,
                                  -3
                              ) + "UT"
                      }
                    : null,
            ];
            let filtered = info.filter(function(el) {
                return el != null;
            });
            return filtered;
        }
    },
    watch:{
      ztf_object(new_val,old_val){
        if(new_val.oid != old_val.oid){
          this.tns = null;
        }
      }
    }
};
</script>
