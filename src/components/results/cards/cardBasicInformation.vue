<template>
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
                        :mobile-breakpoint="250"
                    ></v-data-table>
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
                <v-divider></v-divider>
                <v-flex xs12 v-if="findingchart_link">
                    <v-btn
                        small
                        tile
                        block
                        color="success"
                        :href="findingchart_link" download
                    ><v-icon left>mdi-file-document-outline</v-icon>Finding Chart</v-btn>
                </v-flex>
            </v-layout>
            <v-layout wrap justify-center>
                <v-flex
                    xs12
                    sm4
                    pl-1
                    pr-1
                    class="text-md-center"
                    pt-2
                    v-for="item in links"
                    :key="item.name"
                >
                    <v-btn color="primary" block small depressed :href="item.link" target="_blank">
                        <div class="text-capitalize">{{ item.name }}</div>
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-flex v-if="tns != null" class="mt-2">
                <v-data-table
                    :headers="tnsHeaders"
                    :items="tnsInformation"
                    hide-default-footer
                    dense
                    :mobile-breakpoint="250"
                ></v-data-table>
                <v-footer class="caption transparent">
                    <v-spacer></v-spacer>
                    <p class="mb-0"> Provided by <a :href="tnsInformation[0].url" target="_blank">TNS <img src="https://wis-tns.weizmann.ac.il/sites/default/files/favicon.png" alt="TNS icon"></a></p>
                </v-footer>
            </v-flex>
        </v-card-text>
    </v-card>
</template>
<script>
import { jdToDate } from "../../utils/AstroDates.js";
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
            tnsHeaders: [
                { text: "Type", value: "type", sortable: false },
                { text: "Name", value: "name", sortable: false },
                { text: "Redshift", value: "redshift", sortable: false }
            ],
            mjdButtonText: "View MJD"
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
        }
    },
    computed: {
        findingchart_link() {
            if(this.$store.state.results.objectDetails.detections)
            {
                let index = this.$store.state.results.currentStamp;
                let candid = this.$store.state.results.objectDetails.detections[index].candid_str;
                let oid = this.$store.state.results.selectedObject.oid;
                return `https://www.findingchart.alerce.online/get_chart?oid=${oid}&candid=${candid}`;

            }
            return null;
        },
        ztf_object() {
            return this.$store.state.results.selectedObject;
        },
        tns:{
          get: function(){
            return this.$store.getters.getTNS;
          },
          set: function(){
            this.$store.dispatch("clearTNS");
          }
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
        },
        tnsInformation(){
            if(this.tns) {
                let info = [
                    {
                        type: this.tns.object_type ? this.tns.object_type : "-",
                        name: this.tns.object_name ? this.tns.object_name : "-" ,
                        redshift: this.tns.object_data? this.tns.object_data.redshift : "-",
                        url: this.tns.object_name ? `https://wis-tns.weizmann.ac.il/object/${this.tns.object_name}` : "https://wis-tns.weizmann.ac.il"
                    }
                ];
                let filtered = info.filter(function(el) {
                    return el != null;
                });
                return filtered;
            }
            return null;

        },
        links() {
            return [
                {
                    name: "NED",
                    link: this.ztf_object
                        ? "https://ned.ipac.caltech.edu/conesearch?search_type=Near+Position+Search&iau_style=liberal&objname=&coordinates=" +
                          Math.round(this.ztf_object.meanra * 1000) / 1000 +
                          "d," +
                          Math.round(this.ztf_object.meandec * 1000) / 1000 +
                          "d&iau_name=&radius=0.17&in_csys=Equatorial&in_equinox=J2000&in_csys_IAU=Equatorial&in_equinox_IAU=B1950&z_constraint=Unconstrained&z_value1=&z_value2=&z_unit=z&ot_include=ANY&nmp_op=ANY&hconst=67.8&omegam=0.308&omegav=0.692&wmap=4&corr_z=1&out_csys=Same+as+Input&out_equinox=Same+as+Input&obj_sort=Distance+to+search+center&op=Go&form_build_id=form-a28snc2SSIQl3faGUe4otq7_NcjnMwxxxPoVxw5LHzg&form_id=conesearch"
                        : "#"
                },
                {
                    name: "SIMBAD",
                    link: this.ztf_object
                        ? "http://simbad.u-strasbg.fr/simbad/sim-coo?Coord=" +
                          this.ztf_object.meanra +
                          "%20" +
                          this.ztf_object.meandec +
                          "&Radius.unit=arcsec&Radius=10"
                        : "#"
                },
                {
                    name: "TNS",
                    link: this.ztf_object
                        ? "https://wis-tns.weizmann.ac.il/search?ra=" +
                          this.ztf_object.meanra +
                          "&decl=" +
                          this.ztf_object.meandec +
                          "&radius=10&coords_unit=arcsec"
                        : "#"
                },
                {
                    name: "PanSTARRS",
                    link: this.ztf_object
                        ? "http://ps1images.stsci.edu/cgi-bin/ps1cutouts?pos=" +
                          this.ztf_object.meanra +
                          (this.ztf_object.meandec > 0
                              ? "+" + this.ztf_object.meandec
                              : this.ztf_object.meandec) +
                          "&filter=color"
                        : "#"
                },
                // {
                //     name: "DSS",
                //     link: this.ztf_object
                //         ? "http://archive.stsci.edu/cgi-bin/dss_search?h=5.0&w=5.0&f=fits&v=poss2ukstu_red&r=" +
                //           this.ztf_object.meanra +
                //           "d&d=" +
                //           (this.ztf_object.meandec > 0
                //               ? "+" + this.ztf_object.meandec
                //               : this.ztf_object.meandec) +
                //           "d&e=J2000&c=none"
                //         : "#"
                // },
                {
                    name: "SDSS DR15",
                    link: this.ztf_object
                        ? "http://skyserver.sdss.org/dr15/en/tools/chart/navi.aspx?ra=" +
                          this.ztf_object.meanra +
                          "&dec=" +
                          this.ztf_object.meandec
                        : "#"
                }
            ];
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
