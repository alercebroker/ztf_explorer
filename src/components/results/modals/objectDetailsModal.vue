<template>
    <v-dialog v-model="showModal">
        <v-card>
            <v-card-title class="headline">Details for object: {{ztf_object.oid}}</v-card-title>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs12 md2>
                        <v-flex xs12 pa-2>
                            <v-card>
                                <v-card-text>
                                    <ul v-if="$store.state.loading === false">
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
                                            <strong>RA/Dec:</strong>
                                            {{ ztf_object.meanra ? ztf_object.meanra : '-' }},{{ ztf_object.meandec ? ztf_object.meandec : '-' }}
                                        </li>
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
                        <v-flex xs12 pa-2>
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
                                    >{{props.item[header.value]}}</td>
                                </template>
                            </v-data-table>
                        </v-flex>
                    </v-flex>
                    <v-flex xs12 md7 pa-2>
                        <!-- Curva de luz -->
                        <card-light-curve />
                    </v-flex>
                    <!-- ALADIN -->
                    <v-flex xs12 md3 pa-2>
                        <aladin v-if="$store.state.loading === false" />
                    </v-flex>
                    <!-- PROBABILITIES -->
                    <v-flex xs12 md4 pa-2>
                        <card-probabilities />
                    </v-flex>
                    <!-- STAMPS -->
                    <v-flex xs12 md8 pa-2>
                        <card-stamps-png />
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="closeModal">Close</v-btn>
            </v-card-actions>
        </v-card>
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
</style>