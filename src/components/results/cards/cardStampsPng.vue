<template>
    <v-card height="100%">
        <v-toolbar dense flat dark>
            <v-row align="center">
                <v-col cols="3">
                    <v-toolbar-title>Stamps</v-toolbar-title>
                </v-col>
                <v-col cols="5" class="mt-4">
                    <v-select :items="dates" v-model="selectedStamp"></v-select>
                </v-col>
                <v-col cols="2">
                    <v-icon @click="prevStamp">mdi-arrow-left-drop-circle</v-icon>
                    <v-icon @click="nextStamp">mdi-arrow-right-drop-circle</v-icon>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="1">
                    <v-icon @click="fullscreen">{{fullscreenIcon}}</v-icon>
                </v-col>
                <v-col cols="1">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-icon v-on="on">mdi-information</v-icon>
                        </template>
                        <span>Move your mouse over the images to zoom</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <v-row row wrap>
                <v-col cols="4" class="pt-0 pb-0 text-xs-center">
                    <h5>
                        Science
                        <v-btn x-small outlined color="primary" :href="download('science')">
                            <v-icon left small>cloud_download</v-icon>Download
                        </v-btn>
                    </h5>
                </v-col>
                <v-col cols="4" class="pt-0 pb-0 text-xs-center">
                    <h5>
                        Template
                        <v-btn x-small outlined color="primary" :href="download('template')">
                            <v-icon left small>cloud_download</v-icon>Download
                        </v-btn>
                    </h5>
                </v-col>
                <v-col cols="4" class="pt-0 pb-0 text-xs-center">
                    <h5>
                        Difference
                        <v-btn x-small outlined color="primary" :href="download('difference')">
                            <v-icon left small>cloud_download</v-icon>Download
                        </v-btn>
                    </h5>
                </v-col>
            </v-row>
            <zoom-on-hover class="pt-0 pb-0" :images="[science,template,difference]" :disabled="isFullscreen"></zoom-on-hover>
            <v-row align="center">
              <v-col cols="12" class="pt-0 pb-0" >
                <v-dialog v-model="dialog" max-width="700px" >
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" text block dark v-on="on" :disabled="!avro_info">Full Alert Information</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Alert Information</span>
                    </v-card-title>
                    <v-card-text >
                      <p>For more information read <a target="_blank" href="https://zwickytransientfacility.github.io/ztf-avro-alert/schema.html">the ZTF Schema.</a></p>
                      <v-simple-table
                      dense
                      >
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Key</th>
                            <th class="text-left">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="item in avro_info" :key="item.key">
                            <td>{{ item.key }}</td>
                            <td>{{ item.value }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    </v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="primary darken-1" text @click="dialog = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

              </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import QueryStampsService from "@/services/QueryStampsService.js";
import QueryAvroService from "@/services/QueryAvroService.js";
import { jdToDate } from "@/components/utils/AstroDates.js";
import ZoomOnHover from "@/components/utils/ZoomOnHover.vue";
export default {
    name: "card-stamps-png",
    components: {
        ZoomOnHover
    },
    data() {
        return {
            isFullscreen: false,
            dialog: false,
            avro_info: false,
            headers:[
              { text: 'Key', value: 'key' },
              { text: 'Value', value: 'value' },
            ]
        };
    },
    mounted(){
      QueryAvroService.getAvroInfo({
        oid: this.object,
        candid: this.getCandid(this.currentStamp)
      }).then(response => {
        this.avro_info = this.formatTable(response.data.candidate);
      });
    },
    methods: {
        formatTable(payload){
          var formatted = [];
          for (var k in payload){
            formatted.push({key:k, value: payload[k]});
          }
          return formatted
        },
        prevStamp() {
            if (this.currentStamp > 0) {
                this.$store.dispatch("setCurrentStamp", this.currentStamp - 1);
            }
        },
        nextStamp() {
            if (
                this.currentStamp + 1 <
                this.$store.state.results.objectDetails.detections.length
            ) {
                this.$store.dispatch("setCurrentStamp", this.currentStamp + 1);
            }
        },
        getCandid(index) {
            if (this.$store.state.results.objectDetails.detections) {
                return this.$store.state.results.objectDetails.detections[index]
                    .candid_str;
            } else {
                return "";
            }
        },
        download(type, event) {
            let link =
                "http://avro.alerce.online/get_stamp?oid=" +
                this.object +
                "&candid=" +
                this.getCandid(this.currentStamp) +
                "&type=" +
                type +
                "&format=fits";
            return link;
        },
        fullscreen() {
            this.isFullscreen = !this.isFullscreen;
            this.$emit("fullscreen", { id: 7, value: this.isFullscreen });
        }
    },
    computed: {
        object() {
            return this.$store.state.results.selectedObject.oid;
        },
        dates() {
            if (this.$store.state.results.objectDetails.detections) {
                return this.$store.state.results.objectDetails.detections.map(
                    x => {
                        return (
                            jdToDate(x.mjd)
                                .toUTCString()
                                .slice(0, -3) + "UT"
                        );
                    }
                );
            }
            return [];
        },
        selectedStamp: {
            get() {
                return this.dates[this.currentStamp];
            },
            set(value) {
                this.$store.dispatch(
                    "setCurrentStamp",
                    this.dates.indexOf(value)
                );
            }
        },
        selectedDetection() {
            return this.$store.state.results.selectedDetection;
        },
        science() {
            return QueryStampsService.getScienceURL(
                this.object,
                this.getCandid(this.currentStamp)
            );
        },
        difference() {
            return QueryStampsService.getDifferenceURL(
                this.object,
                this.getCandid(this.currentStamp)
            );
        },
        template() {
            return QueryStampsService.getTemplateURL(
                this.object,
                this.getCandid(this.currentStamp)
            );
        },
        currentStamp() {
            return this.$store.state.results.currentStamp;
        },
        fullscreenIcon(){
            return this.isFullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen"
        }
    },
    watch: {
        selectedDetection(newVal,oldVal) {
            this.$store.dispatch("setCurrentStamp", this.dates.indexOf(newVal));
            if (newVal != oldVal){
              QueryAvroService.getAvroInfo({
                oid: this.object,
                candid: this.getCandid(this.currentStamp)
              }).then(response => {
                this.avro_info = this.formatTable(response.data.candidate);
              });
            }
        }
    }
};
</script>

<style scoped>
</style>
