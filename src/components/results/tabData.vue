<template>
    <div v-if="$store.state.search.error">
        <v-alert :value="true" type="error">Error connecting to our servers</v-alert>
    </div>
    <div v-else-if="$store.state.search.query_status === 204">
        <v-alert :value="true" type="warning">
            <h3>Our position is correct but there is no Alderaan!</h3>Sorry but your search did not return any results :(
            <br />Try refining your Query
        </v-alert>
    </div>
    <div v-else-if="$store.state.search.query_status === 400">
        <v-alert :value="true" type="warning">There is an error with your query</v-alert>
    </div>
    <div v-else-if="!$store.state.search.searched && !$store.state.results.showObjectDetailsModal">
        <v-alert type="info" :value="true">Your search results will be displayed here</v-alert>
    </div>
    <div v-else-if="$store.state.search.query_status === 504">
        <v-alert type="warning" :value="true">
            <h3>Opps!</h3>It looks like the query is taking too long. Try refining your query :)
        </v-alert>
    </div>
    <v-layout
        v-else-if="$store.state.search.query_status === 200"
        row
        wrap
        align-start
        justify-start
    >
        <v-flex xs12>
            <v-toolbar flat color="white">
                <v-toolbar-title>Found {{ $store.state.results.total }} results</v-toolbar-title>
                <v-spacer></v-spacer>
                <column-options-modal />
            </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="objects"
                class="elevation-1"
                pagination.sync="pagination"
                hide-actions
                v-model="selected"
                no-data-text="-"
            >
                <template v-slot:items="props">
                    <tr @click="onRowClicked(props.item)">
                    <td v-for="header in headers" :key="header.value" >{{props.item[header.value]}}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-flex>
        <v-flex xs12>
            <v-pagination
                v-model="currentPage"
                :length="$store.state.results.num_pages"
                :total-visible="5"
            ></v-pagination>
        </v-flex>

        <object-details-modal
            v-if="showObjectDetailsModal"
            :show="showObjectDetailsModal"
            @modalClosed="closeObjectDetailsModal"
        />

        <!-- <download-modal /> -->
    </v-layout>
</template>

<script>
import downloadModal from "./modals/downloadModal";
import columnOptionsModal from "./modals/columnOptionsModal.vue";
import objectDetailsModal from "./modals/objectDetailsModal";

/**
 * this component contains table and details object modal
 */
export default {
    name: "tab-data",
    components: { downloadModal, columnOptionsModal, objectDetailsModal },
    data() {
        return {
            block: true,
            sortDesc: true,
            pagination: { sortBy: "lastmjd", descending: true },
            selected : []
        };
    },
    methods: {
        getClass(obj) {
            // console.log("onj",obj)
            let ret = this.$store.state.search.classes.find(function(x) {
                if (x.value == obj) {
                    return x;
                }
            });
            return ret ? ret.text : "-";
        },
        onRowClicked(item) {
            this.$store.dispatch("objectSelected", item);
            this.$router.push({
                name: "object-details-modal",
                params: { id: item.oid }
            });
        },
        getUrlObject() {
            if (this.$route.params.id) {
                this.$store.dispatch("objectSelectedFromURL", {
                    oid: this.$route.params.id
                });
            }
        },
        closeObjectDetailsModal() {
            this.$store.dispatch("setShowObjectDetailsModal", false);
        },
        onSortChanged(ctx) {
            this.sortBy = ctx.sortBy;
            this.sortDesc = ctx.sortDesc;
            this.$store.dispatch("queryObjects", {
                query_parameters: this.$store.state.search.query_parameters,
                page: this.currentPage,
                perPage: this.$store.state.perPage,
                total: this.$store.state.results.total,
                sortBy: this.sortBy,
                sortDesc: this.sortDesc
            });
        }
    },
    mounted: function() {
        this.getUrlObject();
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
            }
        },
        objects() {
            let objects = this.$store.state.results.objects;
            Object.values(objects).forEach(obj => {
                Object.keys(obj).forEach(key => {
                    if (key.startsWith("class") && obj[key] != null) {
                        obj[key] = this.getClass(obj[key], key);
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
                sortBy: this.pagination.sortBy,
                sortDesc: this.pagination.descending
            });
        }
    }
};
</script>

<style>
.modal-fullscreen .modal {
    padding: 0 !important;
}
.modal-fullscreen .modal-dialog {
    max-width: 90%;
    /* height: 90%; */
    /* margin: 0; */
}
.modal-fullscreen .modal-content {
    border: 0;
    border-radius: 0;
    min-height: 100%;
    height: auto;
}
.btn-wrap-text {
    white-space: normal !important;
}
ul > li {
    list-style: none;
}


#details {
    max-height: 200px;
    overflow-y: auto;
}
</style>
