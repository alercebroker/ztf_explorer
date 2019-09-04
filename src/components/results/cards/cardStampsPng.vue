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
                    <h5>Science</h5>
                    <v-img contain :src="science" class="stampImg" />
                </v-flex>
                <v-flex xs4 class="text-xs-center">
                    <h5>Template</h5>
                    <v-img contain :src="template" class="stampImg" />
                </v-flex>
                <v-flex xs4 class="text-xs-center">
                    <h5>Difference</h5>
                    <v-img contain :src="difference" class="stampImg" />
                </v-flex>
            </v-layout>
            <v-layout row justify-space-around align-end>
                <v-flex xs3 mt-2>
                    <v-btn x-small outlined color="primary" @click="download('science', $event)">
                        <v-icon left small>cloud_download</v-icon>Download
                    </v-btn>
                </v-flex>
                <v-flex xs3 mt-2>
                    <v-btn x-small outlined color="primary" @click="download('template', $event)">
                        <v-icon left small>cloud_download</v-icon>Download
                    </v-btn>
                </v-flex>
                <v-flex xs3 mt-2>
                    <v-btn x-small outlined color="primary" @click="download('difference', $event)">
                        <v-icon left small>cloud_download</v-icon>Download
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
import QueryStampsService from "@/services/QueryStampsService.js";
import { jdToDate } from "@/components/utils/AstroDates.js";
export default {
    name: "card-stamps-png",
    data() {
        return {
            currentStamp: 0,
            science: "",
            difference: "",
            template: ""
        };
    },
    methods: {
        prevStamp() {
            if (this.currentStamp > 0) {
                this.currentStamp -= 1;
            }
        },
        nextStamp() {
            if (
                this.currentStamp + 1 <=
                this.$store.state.results.objectDetails.detections.length
            ) {
                this.currentStamp += 1;
            }
        },
        getCandid(index) {
            return this.$store.state.results.objectDetails.detections[index]
                .candid_str;
        },
        download(type,event) {
            let link =
                "http://avro.alerce.online/get_stamp?oid=" +
                this.object +
                "&candid=" +
                this.getCandid(this.currentStamp) +
                "&type="+type+"&format=fits";
            fetch(link)
                .then(resp => resp.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.style.display = "none";
                    a.href = url;
                    a.download = "stamp.targz";
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(() => alert("Ups, there was a problem with the download"));
        }
    },
    mounted() {
        this.science = QueryStampsService.getScienceURL(
            this.object,
            this.getCandid(this.currentStamp)
        );
        this.difference = QueryStampsService.getDifferenceURL(
            this.object,
            this.getCandid(this.currentStamp)
        );
        this.template = QueryStampsService.getTemplateURL(
            this.object,
            this.getCandid(this.currentStamp)
        );
    },
    computed: {
        object() {
            return this.$store.state.results.selectedObject.oid;
        },
        dates() {
            return this.$store.state.results.objectDetails.detections.map(x => {
                return (
                    jdToDate(x.mjd)
                        .toUTCString()
                        .slice(0, -3) + "UT"
                );
            });
        },
        selectedStamp: {
            get() {
                return this.dates[this.currentStamp];
            },
            set(value) {
                this.currentStamp = this.dates.indexOf(value);
            }
        },
        selectedDetection() {
            return this.$store.state.results.selectedDetection;
        }
    },
    watch: {
        currentStamp(newVal) {
            this.science = QueryStampsService.getScienceURL(
                this.object,
                this.getCandid(newVal)
            );
            this.difference = QueryStampsService.getDifferenceURL(
                this.object,
                this.getCandid(newVal)
            );
            this.template = QueryStampsService.getTemplateURL(
                this.object,
                this.getCandid(newVal)
            );
        },
        selectedDetection(newVal) {
            this.currentStamp = this.dates.indexOf(newVal);
        }
    }
};
</script>

<style scoped>
</style>
