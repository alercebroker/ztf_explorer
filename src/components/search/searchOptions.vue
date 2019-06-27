<template>
    <div class="searchOptions">
        <!-- <b-form v-on:submit.prevent="onQuerySubmit"> -->
        <br>
        <b-card no-body header-tag="header" header="Search Options">
            <!-- HEADER -->
            <div slot="header">
                <h4>Search Options</h4>
            </div>
            <!-- BODY -->
            <b-card-body>
                <b-row class="pl-3 pr-3 pb-3">
                    <b-btn
                        variant="outline-primary"
                        size="sm"
                        :block="block"
                        @click="clearQuery"
                    >Clear all options</b-btn>
                </b-row>
                <!-- OPTIONS -->
                <b-form v-on:submit.prevent="onSubmitQuery">
                    <div class="filter-content">
                        <!-- DEFAULT OPTIONS -->
                        <default-options></default-options>
                        <!-- MORE OPTIONS BUTTON -->
                        <!-- <b-row class="pl-3 pr-3">
              <b-btn
                :block="block"
                variant="outline-secondary"
                v-b-toggle.AdvancedSearch
                @click="changeMoreOptLabel()"
              >{{ moreOptsLabel }}</b-btn>
                        </b-row>-->
                        <!-- ADVANCED SEARCH -->
                        <!-- <b-row class="pl-3 pr-3 pb-3">
              <b-collapse id="AdvancedSearch">
                <hr>
                <advanced-options></advanced-options>

              </b-collapse>
                        </b-row>-->

                        <b-row class="text-center">
                            <b-col>
                                <b-button
                                    :block="block"
                                    variant="outline-secondary"
                                    v-on:click="changeShowSQLLabel"
                                    v-b-toggle="'SQL'"
                                >{{ showSQLLabel }}</b-button>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col>
                                <b-collapse id="SQL" class="mt-3">
                                    <div class="pt-2 pb-4" style="background-color:#e9ecef">
                                        <div class="text-right mr-2 mb-1">
                                            <b-button id="refreshSQL" @click="refreshSQL">
                                                <v-icon name="redo"/>
                                            </b-button>
                                        </div>
                                        <div
                                            class="mx-2 text-center"
                                        >{{this.$store.state.search.sql}}</div>
                                    </div>
                                </b-collapse>
                            </b-col>
                        </b-row>

                        <b-row class="text-center my-4">
                            <b-col>
                                <b-button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    :block="block"
                                    id="searchbtn"
                                    :disabled="!validSearch"
                                >SEARCH</b-button>
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col class="text-center">
                                <b-button
                                    variant="secondary"
                                    size="sm"
                                    id="searchbtn"
                                    disabled
                                    v-show="false"
                                >Save search</b-button>
                            </b-col>
                            <b-col class="text-center">
                                <b-button
                                    variant="warning"
                                    size="sm"
                                    disabled
                                    v-show="false"
                                >Subscribe</b-button>
                            </b-col>
                        </b-row>
                    </div>
                </b-form>
            </b-card-body>
        </b-card>
    </div>
</template>


<script>
import defaultOptions from "./defaultOptions.vue";
import advancedOptions from "./advancedOptions.vue";
export default {
    name: "search-options",
    components: {
        defaultOptions,
        advancedOptions
    },
    data() {
        return {
            moreOptsLabel: "More Options",
            showSQLLabel: "Show SQL",
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
