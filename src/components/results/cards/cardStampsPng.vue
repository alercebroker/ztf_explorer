<template>
    <v-card height="100%">
        <v-toolbar dense flat dark>
            <v-row align="center">
                <v-col cols="3">
                    <v-toolbar-title>Stamps</v-toolbar-title>
                </v-col>
                <v-col cols="7" class="mt-4">
                    <v-select :items="dates" v-model="selectedStamp"></v-select>
                </v-col>
                <v-col cols="2">
                    <v-icon @click="prevStamp">mdi-arrow-left-drop-circle</v-icon>
                    <v-icon @click="nextStamp">mdi-arrow-right-drop-circle</v-icon>
                </v-col>
            </v-row>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
            <v-layout row wrap>
                <v-flex xs4 class="text-xs-center">
                    <h5>Science 
                        <v-btn x-small outlined color="primary" :href="download('science')">
                            <v-icon left small>cloud_download</v-icon>Download
                        </v-btn>
                    </h5>
                    <v-img contain :src="science" class="stampImg" />
                </v-flex>
                <v-flex xs4 class="text-xs-center">
                    <h5>Template
                        <v-btn x-small outlined color="primary" :href="download('template')">
                            <v-icon left small>cloud_download</v-icon>Download
                        </v-btn>


                    </h5>
                    <v-img contain :src="template" class="stampImg" />
                </v-flex>
                <v-flex xs4 class="text-xs-center">
                    <h5>Difference
                        <v-btn x-small outlined color="primary" :href="download('difference')">
                            <v-icon left small>cloud_download</v-icon>Download
                        </v-btn>
                    </h5>
                    <v-img contain :src="difference" class="stampImg" />
                </v-flex>
            </v-layout>
            <!--v-layout row justify-space-around align-end>
                <v-flex xs3 mt-2>
                    
                </v-flex>
                <v-flex xs3 mt-2>
                    <v-btn x-small outlined color="primary" :href="download('template')">
                        <v-icon left small>cloud_download</v-icon>Download
                    </v-btn>
                </v-flex>
                <v-flex xs3 mt-2>
                    <v-btn x-small outlined color="primary" :href="download('difference')">
                        <v-icon left small>cloud_download</v-icon>Download
                    </v-btn>
                </v-flex>
            </v-layout-->
        </v-card-text>
    </v-card>
</template>

<script>
import QueryStampsService from "@/services/QueryStampsService.js";
import { jdToDate } from "@/components/utils/AstroDates.js";
export default {
    name: "card-stamps-png",
    data() {
        return {};
    },
    methods: {
        prevStamp() {
            if (this.currentStamp > 0) {
                this.$store.dispatch("setCurrentStamp", this.currentStamp - 1);
            }
        },
        nextStamp() {
            if (
                this.currentStamp + 1 <=
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
        }
    },
    watch: {
        selectedDetection(newVal) {
            this.$store.dispatch("setCurrentStamp", this.dates.indexOf(newVal));
        }
    }
};
</script>

<style scoped>
</style>
