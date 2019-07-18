<template>
    <!--BODY-->
    <v-form>
        <v-container pa-2>
            <v-layout row wrap>
                <!--Clear all options-->
                <v-flex xs12 sm12 md12 pb-0 pt-0>
                    <v-btn outline block small color="primary" @click="clearQuery">Clear all options</v-btn>
                </v-flex>
                <!--Default options-->
                <v-flex xs12 sm12 md12 pb-0 pt-0>
                    <default-options></default-options>
                </v-flex>
                <!-- Date and coordinate options -->
                <v-card>
                    <v-tabs color="grey lighten-4">
                        <v-tab>Discovery Date</v-tab>
                        <v-tab-item>
                            <date-options />
                        </v-tab-item>
                        <v-tab>Coordinates</v-tab>
                        <v-tab-item>
                            <coordinate-options />
                        </v-tab-item>
                    </v-tabs>
                </v-card>
                <!--Show SQL-->
                <v-flex xs12 sm12 md12 pb-0>
                    <v-btn
                        outline
                        block
                        small
                        color="blue-grey"
                        @click="showSQLLabel = !showSQLLabel"
                    >{{ showSQLLabel? 'Hide': 'Show SQL' }}</v-btn>
                </v-flex>
                <v-flex xs12 sm12 md12 pb-0>
                    <div v-show="showSQLLabel">
                        <div style="background-color:#e9ecef">
                            <div>
                                <v-btn icon @click="refreshSQL">
                                    <v-icon name="redo" />
                                </v-btn>
                            </div>
                            <div>{{this.$store.state.search.sql}}</div>
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
</template>


<script>
import defaultOptions from "./defaultOptions.vue";
import dateOptions from "./dateOptions";
import coordinateOptions from "./coordinateOptions.vue";
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
            block: true,
            activeTab: null
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
        /**
         * change option text in show sql
         */
        changeShowSQLLabel() {
            this.refreshSQL();
            this.showSQLLabel =
                this.showSQLLabel == "Show SQL" ? "Hide SQL" : "Show SQL";
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
                    if (val == null || val === "") delete obj[key];
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
                perPage: this.$store.state.perPage,
                sortBy: "lastmjd"
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
            return this.$store.state.search.valid;
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
