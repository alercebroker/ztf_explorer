<template>
    <v-layout row wrap style="margin:0 0 0 0; padding: 0 0 0 0;">
        <v-flex xs12>
            <v-layout row pt-3>
                <v-flex md8>
                    <v-layout column>
                        <v-flex xs6 md6 pl-5>
                            <h4>{{message}}</h4>
                        </v-flex>
                        <v-flex xs6 md6 pl-2>
                            <column-options-modal />
                        </v-flex>
                    </v-layout>
                </v-flex>
                <v-flex md4 id="step4">
                    <v-pagination
                        v-model="currentPage"
                        :length="$store.state.results.num_pages"
                        :total-visible="10"
                        v-show="$vuetify.breakpoint.mdAndUp"
                    ></v-pagination>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <v-data-table
                        :headers="headers"
                        :items="objects"
                        :sortBy.sync="options.sortBy"
                        :sortDesc.sync="options.sortDesc"
                        :server-items-length="$store.state.results.total"
                        @click:row="onRowClicked"
                        class="elevation-0"
                        hide-default-footer
                        dense
                        :mobile-breakpoint="250"
                        :loading="loading"
                    >
                        <template v-slot:item.oid="{ item }">
                            <div id="v-step-2">{{ item.oid }}</div>
                        </template>
                    </v-data-table>
                    <v-pagination
                        v-model="currentPage"
                        :length="$store.state.results.num_pages"
                        :total-visible="5"
                        v-show="$vuetify.breakpoint.xsOnly"
                    ></v-pagination>
                </v-flex>
            </v-layout>
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
    methods: {
        getLateClass(obj) {
            let ret = this.$store.getters.lateClasses.find(function(x) {
                if (x.value == obj) {
                    return x;
                }
            });
            return ret ? ret.text : "-";
        },
        getEarlyClass(obj) {
            let ret = this.$store.getters.earlyClasses.find(function(x) {
                if (x.value == obj) {
                    return x;
                }
            });
            return ret ? ret.text : "-";
        },
        getXmatchClass(obj, classifier) {
            let ret = this.$store.getters.xmatchClasses.find(function(x) {
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
                if (!this.$route.params.id) {
                    this.$store.dispatch("queryObjects", {
                        query_parameters: this.$store.state.search
                            .query_parameters,
                        page: value,
                        perPage: this.$store.state.perPage,
                        total: this.$store.state.results.total,
                        sortBy: this.options.sortBy[0],
                        sortDesc: this.options.sortDesc[0]
                    });
                }
            }
        },
        objects() {
            let objects = JSON.parse(
                JSON.stringify(this.$store.state.results.objects)
            );
            Object.values(objects).forEach(obj => {
                Object.keys(obj).forEach(key => {
                    if (key === "classrf") {
                        obj[key] = this.getLateClass(obj[key]);
                    }
                    if (key === "classxmatch") {
                        obj[key] = this.getXmatchClass(obj[key]);
                    }
                    if (key === "classearly") {
                        obj[key] = this.getEarlyClass(obj[key]);
                    }
                    if (
                        typeof obj[key] === "number" &&
                        !Number.isInteger(obj[key])
                    )
                        obj[key] = obj[key].toFixed(3);
                });
                obj["radec"] =
                    obj.meanra && obj.meandec
                        ? obj.meanra + ", " + obj.meandec
                        : " ";
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
        },
        selectedClassifier() {
            return this.$store.state.search.selectedClassifier;
        },
        options: {
            get() {
                return this.$store.state.results.tableOptions;
            },
            set(value) {
                this.$store.dispatch("setTableOptions", value);
            }
        },
        sortBy: {
            get() {
                return this.$store.state.results.tableOptions.sortBy;
            },
            set(value) {
                this.$store.dispatch("setTableSortBy", value);
            }
        },
        sortDesc: {
            get() {
                return this.$store.state.results.tableOptions.sortDesc;
            },
            set(value) {
                this.$store.dispatch("setTableSortDesc", value);
            }
        },
        selectedClassifier() {
            return this.$store.state.search.selectedClassifier;
        },
        loading() {
            return this.$store.state.tableLoading;
        },
        message() {
            if (this.$store.state.search.searched) {
                return this.$store.state.results.total
                    ? "Found " +
                          this.$store.state.results.total.toLocaleString() +
                          " results"
                    : "No results found";
            } else if (!this.$store.state.search.error) {
                return "Your results will appear here";
            } else {
                return "There was an error retrieving your query from our servers";
            }
        }
    },
    watch: {
        sortBy(newVal, oldVal) {
            console.log("sortBy");
            if (this.$route.params.id) return;
            if (newVal[0] !== oldVal[0]) {
                let parameters = {
                    query_parameters: this.$store.state.search.query_parameters,
                    page: this.currentPage,
                    perPage: this.$store.state.perPage,
                    total: this.$store.state.results.total,
                    sortBy: newVal[0],
                    sortDesc: this.$store.state.results.tableOptions.sortDesc[0]
                };
                this.$store.dispatch("queryObjects", parameters);
            }
        },
        sortDesc(newVal, oldVal) {
            console.log("sortDesc", newVal);
            console.log("sortDesc", oldVal);
            if (this.$route.params.id) return;
            if (newVal[0] !== oldVal[0]) {
                let parameters = {
                    query_parameters: this.$store.state.search.query_parameters,
                    page: this.currentPage,
                    perPage: this.$store.state.perPage,
                    total: this.$store.state.results.total,
                    sortBy: this.$store.state.results.tableOptions.sortBy[0],
                    sortDesc: newVal[0]
                };
                this.$store.dispatch("queryObjects", parameters);
            }
        },
        objects() {}
    }
};
</script>

<style>
</style>
