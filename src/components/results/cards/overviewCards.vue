<template>
    <v-layout row wrap justify-center>
        <v-flex xs6 md2 pr-2 pt-2>
            <v-card color="primary" class="white--text" height="100%">
                <v-card-text class="text-center">
                    <v-icon x-large>add_circle</v-icon>
                </v-card-text>
                <div class="text-center">
                    <div class="title">Recent Objects</div>
                </div>
                <v-card-text class="text-center">
                    <v-chip disabled color="header" text-color="white">{{recentObjects}}</v-chip>
                    <p>(last 24 hours)</p>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs6 md2 pr-2 pt-2>
            <v-card color="primary" class="white--text" height="100%">
                <v-card-text class="text-center">
                    <v-icon x-large>add_circle</v-icon>
                </v-card-text>
                <div class="text-center">
                    <div class="title">Recent Alerts</div>
                </div>
                <v-card-text class="text-center">
                    <v-chip disabled color="header" text-color="white">{{recentAlerts}}</v-chip>
                    <p>(last 24 hours)</p>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs6 md2 pr-2 pt-2>
            <v-card color="primary" class="white--text" height="100%">
                <v-card-text class="text-center">
                    <v-icon x-large>highlight_off</v-icon>
                </v-card-text>
                <div class="text-center">
                    <div class="title">X-Matched Objects</div>
                </div>
                <v-card-text class="text-center">
                    <v-chip disabled color="header" text-color="white">{{xmatchedCount}}</v-chip>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs6 md2 pr-2 pt-2>
            <v-card color="primary" class="white--text" height="100%">
                <v-card-text class="text-center">
                    <v-icon x-large>category</v-icon>
                </v-card-text>
                <div class="text-center">
                    <div class="title">Classified Objects</div>
                </div>
                <v-card-text class="text-center">
                    <v-chip disabled color="header" text-color="white">{{rfCount}}</v-chip>
                    <p>(Random Forest)</p>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs6 md2 pr-2 pt-2>
            <v-card color="primary" class="white--text" height="100%">
                <v-card-text class="text-center">
                    <v-icon x-large>category</v-icon>
                </v-card-text>
                <div class="text-center">
                    <div class="title">Classified Objects</div>
                </div>
                <v-card-text class="text-center">
                    <v-chip disabled color="header" text-color="white">{{earlyCount}}</v-chip>
                    <p>(Early Classifier)</p>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { gregorianToJd } from "../../utils/AstroDates.js";
export default {
    computed: {
        recentObjects() {
            return this.$store.state.results.recentObjects.toLocaleString();
        },
        recentAlerts() {
            return this.$store.state.results.recentAlerts.toLocaleString();
        },
        xmatchedCount() {
            return this.$store.state.results.xmatchedCount.toLocaleString();
        },
        rfCount() {
            return this.$store.state.results.rfCount.toLocaleString();
        },
        earlyCount() {
            return this.$store.state.results.earlyCount.toLocaleString();
        }
    },
    methods: {
        getDate() {
            let today = new Date();
            let year = today.getUTCFullYear();
            let day = today.getUTCDate();
            let month = today.getUTCMonth() + 1;
            today = year + "-" + month + "-" + day;
            return today;
        }
    },
    mounted() {
        this.$store.dispatch("getRecentObjects", {
            mjd: gregorianToJd(this.getDate()),
            hours: 24
        });
        this.$store.dispatch("getRecentAlerts", {
            mjd: gregorianToJd(this.getDate()),
            hours: 24
        });
        this.$store.dispatch("getClassifiedCounts");
    }
};
</script>

<style>
</style>
