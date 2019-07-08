<template>
    <div>
        <v-card>
            <!--HEADER-->
            <v-toolbar color="grey lighten-4">
                <v-toolbar-title>Search Options</v-toolbar-title>
            </v-toolbar>
            <!--BODY-->
            <v-form>
                <v-container>
                    <v-layout row wrap>
                        <!--Clear all options-->
                        <v-flex xs12 sm12 md12>
                            <v-btn
                                outline
                                block
                                small
                                color="primary"
                                @click="clearQuery"
                            >Clear all options</v-btn>
                        </v-flex>
                        <!--Default options-->
                        <v-flex xs12 sm12 md12>
                            <default-options></default-options>
                        </v-flex>
                        <!-- Date and coordinate options -->
                        <b-card no-body class="mb-3">
                            <b-tabs card>
                                <b-tab title="Dates" active>
                                    <date-options />
                                </b-tab>
                                <b-tab title="Coordinates">
                                    <coordinate-options />
                                </b-tab>
                            </b-tabs>
                        </b-card>
                        <!--Show SQL-->
                        <v-flex xs12 sm12 md12>
                            <v-btn
                                outline
                                block
                                small
                                color="blue-grey"
                                @click="showSQLLabel = !showSQLLabel"
                            >{{ showSQLLabel? 'Hide': 'Show SQL' }}</v-btn>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                            <div
                                v-show="showSQLLabel"
                                transition="scale-transition"
                                origin="center center"
                            >
                                <div class="pt-2 pb-4" style="background-color:#e9ecef">
                                    <div class="text-right mr-2 mb-1">
                                        <v-btn icon @click="refreshSQL">
                                            <v-icon name="redo" />
                                        </v-btn>
                                    </div>
                                    <div class="mx-2 text-center">{{this.$store.state.search.sql}}</div>
                                </div>
                            </div>
                        </v-flex>
                        <!--Search-->
                        <v-flex xs12 sm12 md12>
                            <v-btn
                                block
                                normal
                                color="primary"
                                @click="onSubmitQuery"
                                :disabled="!validSearch"
                            >Search</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-form>
        </v-card>
    </div>
</template>


<script>
import defaultOptions from "./defaultOptions.vue";
import dateOptions from "./dateOptions"
import coordinateOptions from './coordinateOptions.vue';
import advancedOptions from "./advancedOptions.vue";
export default {
    name: "search-options",
    components: {
        defaultOptions,
        advancedOptions,
        dateOptions,
        coordinateOptions
    },
    data() {
        return {
            moreOptsLabel: "More Options",
            showSQLLabel: false,
            block: true
        };
    },
    mounted() {
        //this.$store.dispatch('queryClassList')
    },
    methods: {
        /**
         * change option avanced label
         */
        changeMoreOptLabel() {
            this.moreOptsLabel =
                this.moreOptsLabel == "More Options" ? "Hide" : "More Options";
        },
        refreshSQL() {
            let query_parameters = {
                filters: this.$store.state.search.filters,
                bands: this.$store.state.search.bands,
                dates: this.$store.state.search.dates,
                coordinates: this.$store.state.search.coordinates
            };
            this.removeEmpty(query_parameters);
            this.$store.dispatch("getSQL", query_parameters);
        },

        /**
         * remove param that are empty
         */
        removeEmpty(obj) {
            Object.entries(obj).forEach(([key, val]) => {
                if (val && typeof val === "object") {
                    this.removeEmpty(val);
                    if (Object.keys(val).length === 0) delete obj[key];
                } else {
                    if (val == null || val == "") delete obj[key];
                }
            });
        },

        /**
         * Executes a search given selected parameters
         */
        onSubmitQuery() {
            let query_parameters = {
                filters: this.$store.state.search.filters,
                bands: this.$store.state.search.bands,
                dates: this.$store.state.search.dates,
                coordinates: this.$store.state.search.coordinates
            };
            this.removeEmpty(query_parameters);
            this.$store.dispatch("setQueryParameters", query_parameters);
            this.$store.dispatch("getSQL", query_parameters);
            this.$store.dispatch("queryObjects", {
                query_parameters: query_parameters,
                page: 1,
                perPage: this.$store.state.perPage
            });
            this.$store.dispatch("setCurrentPage", 1);
            // this.$store.dispatch('setSelectedTab', 1)
            window.scrollTo(0, 0);
        },
        clearQuery() {
            this.$store.dispatch("clearQuery");
        }
    },
    computed: {
        validSearch() {
            return (
                this.$store.state.search.validDates &&
                this.$store.state.search.validCoords
            );
        }
    }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 2.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transition: opacity 2.5s;
}
</style>
