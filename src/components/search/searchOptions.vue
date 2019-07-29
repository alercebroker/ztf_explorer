<template>
    <!--BODY-->
    <v-layout row wrap v-on:keyup.enter="onSubmitQuery">
        <!--Default options-->
        <v-flex xs10 offset-xs1 pb-0 pt-0>
            <default-options></default-options>
        </v-flex>
        <!-- Date and coordinate options -->

          <v-card>
            <v-tabs>
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
        <v-flex xs10 pt-2 offset-xs1>
            <v-btn
                outlined
                tile
                block
                small
                color="primary"
                @click="showSQLLabel = !showSQLLabel"
            >{{ showSQLLabel? 'Hide': 'Show SQL' }}</v-btn>
        </v-flex>
        <v-flex xs10 offset-xs1 pb-0>
            <div v-show="showSQLLabel">
                <div style="background-color:#BDBDBD">
                    <div>
                        <v-btn icon @click="refreshSQL">
                            <v-icon>refresh</v-icon>
                        </v-btn>
                    </div>
                    <div>{{this.$store.state.search.sql}}</div>
                </div>
            </div>
        </v-flex>
        <!--Clear all options-->
        <v-flex xs10 offset-xs1 pb-0 pt-2>
            <v-btn block tile small dark @click="clearQuery">Clear all options</v-btn>
        </v-flex>
        <!--Search-->
        <v-flex xs10 offset-xs1 pt-2>
            <v-btn
                block
                normal
                tile
                raised
                color="primary"
                @click="onSubmitQuery"
                :disabled="!validSearch"
            >Search</v-btn>
        </v-flex>
    </v-layout>
</template>


<script>
import defaultOptions from "./defaultOptions.vue";
import dateOptions from "./dateOptions";
import coordinateOptions from "./coordinateOptions.vue";
export default {
    name: "search-options",
    components: {
        defaultOptions,
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
    mounted() {},
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
            if (this.$store.state.search.filters.oid) {
                if (
                    this.$store.state.search.filters.oid.toLowerCase() ==
                    "supernova"
                ) {
                    window.open(
                        "https://www.youtube.com/watch?v=TlLmypmt_ls",
                        "_blank"
                    );
                    return;
                }
            }
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
            this.$store.dispatch("setSelectedTab", 1);
            window.scrollTo(0, 0);
            this.$emit("onSearch");
        },
        clearQuery() {
            this.$store.dispatch("clearQuery");
        },
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
.fade-enter,
.fade-leave-to {
    transition: opacity 2.5s;
}
</style>
