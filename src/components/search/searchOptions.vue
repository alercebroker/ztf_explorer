<template>
    <!--BODY-->
    <div>
        <v-row>
            <v-col cols="10" offset="1">
                <default-options></default-options>
            </v-col>

            <v-col cols="10" offset="1" style="padding-top:0;">
                <v-divider></v-divider>
                <v-expansion-panels v-model="panels" accordion multiple>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <span class="font-weight-bold">Discovery Date</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <date-options />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <span class="font-weight-bold">Coordinates</span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <coordinate-options />
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="4">
                <v-btn block tile  dark @click="clearQuery">Clear</v-btn>
            </v-col>

            <v-col cols="6">
                <v-btn
                    block
                    tile
                    raised
                    color="primary"
                    @click="onSubmitQuery"
                    :disabled="!validSearch"
                >Search</v-btn>
            </v-col>
        </v-row>
    </div>
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
            activeTab: null,
            panels: [0]
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
                filters: JSON.parse(
                    JSON.stringify(this.$store.state.search.filters)
                ),
                bands: JSON.parse(
                    JSON.stringify(this.$store.state.search.bands)
                ),
                dates: JSON.parse(
                    JSON.stringify(this.$store.state.search.dates)
                ),
                coordinates: JSON.parse(
                    JSON.stringify(this.$store.state.search.coordinates)
                )
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
                filters: JSON.parse(
                    JSON.stringify(this.$store.state.search.filters)
                ),
                bands: JSON.parse(
                    JSON.stringify(this.$store.state.search.bands)
                ),
                dates: JSON.parse(
                    JSON.stringify(this.$store.state.search.dates)
                ),
                coordinates: JSON.parse(
                    JSON.stringify(this.$store.state.search.coordinates)
                )
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
            let sortBy =
                this.$store.state.search.selectedClassifier !== "classxmatch" &&
                this.$store.state.search.selectedClassifier
                    ? "p" + this.$store.state.search.selectedClassifier
                    : "lastmjd";
            this.$store.dispatch("setTableSortBy",[sortBy]);
            this.$store.dispatch("setTableSortDesc",[true]);
            window.scrollTo(0, 0);
            this.$emit("onSearch");
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
.fade-enter,
.fade-leave-to {
    transition: opacity 2.5s;
}
</style>
