<template>
    <v-layout row wrap pl-4 pr-4 pt-2 pb-5>
        <v-flex v-if="$store.state.search.error">
            <v-alert :value="true" type="error">Error connecting to our servers</v-alert>
        </v-flex>
        <v-flex v-else-if="$store.state.search.query_status === 204">
            <v-alert :value="true" type="warning">
                <h3>Our position is correct but there is no Alderaan!</h3>Sorry but your search did not return any results :(
                <br />Try refining your Query
            </v-alert>
        </v-flex>
        <v-flex v-else-if="$store.state.search.query_status === 400">
            <v-alert :value="true" type="warning">There is an error with your query</v-alert>
        </v-flex>
        <v-flex
            v-else-if="!$store.state.search.searched && !$store.state.results.showObjectDetailsModal"
        >
            <v-alert type="info" :value="true">Your search results will be displayed here</v-alert>
        </v-flex>
        <v-flex v-else-if="$store.state.search.query_status === 504">
            <v-alert type="warning" :value="true">
                <h3>Opps!</h3>It looks like the query is taking too long. Try refining your query :)
            </v-alert>
        </v-flex>

        <v-flex xs12 v-else-if="$store.state.search.query_status === 200 && $store.state.results.total" >
            <v-toolbar flat color="white">
                <v-toolbar-title>
                    <v-layout column pt-3>
                        <v-flex
                            xs6
                            md6
                        >Found {{ $store.state.results.total.toLocaleString() }} results</v-flex>
                        <v-flex xs6 md6>
                            <column-options-modal />
                        </v-flex>
                    </v-layout>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <v-pagination
                        v-model="currentPage"
                        :length="$store.state.results.num_pages"
                        :total-visible="5"
                        v-show="$vuetify.breakpoint.mdAndUp"
                    ></v-pagination>
                </v-toolbar-title>
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="objects"
                :options.sync="options"
                :server-items-length="$store.state.results.total"
                @click:row="onRowClicked"
                class="elevation-1"
                hide-default-footer
                dense
                :mobile-breakpoint="250"
            ></v-data-table>
            <v-pagination
                v-model="currentPage"
                :length="$store.state.results.num_pages"
                :total-visible="5"
                v-show="$vuetify.breakpoint.xsOnly"
            ></v-pagination>
        </v-flex>
    </v-layout>
</template>

<script>
import columnOptionsModal from "./modals/columnOptionsModal.vue";

/**
 * this component contains table and details object modal
 */
export default {
    name: "tab-data",
    components: {
        // downloadModal,
        columnOptionsModal
    },
    data() {
        return {
            options: {
                sortBy: ["lastmjd"],
                sortDesc: [true]
            }
        };
    },
    methods: {
        getClass(obj) {
            let ret = this.$store.state.search.classes.find(function(x) {
                if (x.value == obj) {
                    return x;
                }
            });
            return ret ? ret.text : "-";
        },
        onRowClicked(item) {
            item = this.$store.state.results.objects[item.oid];
            this.$store.dispatch("objectSelected", item);
            this.$router.push({
                name: "object-details-modal",
                params: { id: item.oid }
            });
        }
    },
    mounted: function() {},
    computed: {
        showObjectDetailsModal() {
            return this.$store.state.results.showObjectDetailsModal;
        },
        currentPage: {
            get() {
                return this.$store.state.results.currentPage;
            },
            set(value) {
                this.$store.dispatch("setCurrentPage", value);
            }
        },
        objects() {
            let objects = JSON.parse(
                JSON.stringify(this.$store.state.results.objects)
            );
            Object.values(objects).forEach(obj => {
                Object.keys(obj).forEach(key => {
                    if (key.startsWith("class") && key !== "classearly") {
                        obj[key] = this.getClass(obj[key]);
                    }
                    if (
                        typeof obj[key] === "number" &&
                        !Number.isInteger(obj[key])
                    )
                        obj[key] = obj[key].toFixed(3);
                });
                obj["radec"] = obj.meanra + ", " + obj.meandec;
            });
            return Object.values(objects);
        },
        headers() {
            let columns = this.$store.state.results.selectedColumnOptions;
            let selected = [];
            columns.forEach(col => {
                if (col.show) selected.push(col);
            });
            return selected;
        }
    },
    watch: {
        currentPage(value) {
            if (this.$route.params.id) return;
            this.$store.dispatch("queryObjects", {
                query_parameters: this.$store.state.search.query_parameters,
                page: value,
                perPage: this.$store.state.perPage,
                total: this.$store.state.results.total,
                sortBy: this.options.sortBy[0],
                sortDesc: this.options.sortDesc[0]
            });
        },
        options(value, old) {
            if (value.sortBy !== old.sortBy || value.sortDesc != old.sortDesc) {
                this.$store.dispatch("queryObjects", {
                    query_parameters: this.$store.state.search.query_parameters,
                    page: this.currentPage,
                    perPage: this.$store.state.perPage,
                    total: this.$store.state.results.total,
                    sortBy: value.sortBy[0],
                    sortDesc: value.sortDesc[0]
                });
            }
        }
    }
};
</script>

<style>
</style>
