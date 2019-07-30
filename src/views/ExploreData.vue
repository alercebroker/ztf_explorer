<template>
    <v-container fluid>
        <div v-if="$vuetify.breakpoint.smAndDown" >
          <result-panel
              :loading.sync="$store.state.loading"
              :downloading.sync="$store.state.downloading"
          ></result-panel>
          <loading :show="$store.state.downloading" label="Downloading..."></loading>
          <loading :show="$store.state.loading" label="Searching..."></loading>
          <object-details-modal
              @modalClosed="closeObjectDetailsModal"
              v-if="$store.state.results.showObjectDetailsModal"
          />
        </div>
        <div v-else>
            <result-panel
                :loading.sync="$store.state.loading"
                :downloading.sync="$store.state.downloading"
            />
            <loading :show="$store.state.downloading" label="Downloading..."></loading>
            <loading :show="$store.state.loading" label="Searching..."></loading>
            <v-hover>
                <v-navigation-drawer
                    clipped
                    app
                    hide-overlay
                    permanent
                    :mini-variant="mini"
                    width="400"
                    mini-variant-width="30"
                    v-model="drawer"
                    disable-resize-watcher
                    slot-scope="{ hover }"
                    :class="`elevation-${hover && mini? 24 : 0}`"
                >
                    <v-toolbar dark color="toolbar" dense v-if="!mini">
                        <v-toolbar-title>Search Options</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click.stop="mini = !mini">
                                    <v-icon>chevron_left</v-icon>
                                </v-btn>
                            </template>
                            <span>Hide</span>
                        </v-tooltip>
                    </v-toolbar>
                    <search-options v-if="!mini" @onSearch="onSearch" />
                    <v-sheet
                        class="d-flex"
                        height="100%"
                        color="toolbar"
                        @click.stop="mini=!mini"
                        v-else
                    >
                        <v-tooltip right>
                            <template v-slot:activator="{on}">
                                <v-layout justify-center align-center v-on="on">
                                    <v-icon color="white">chevron_right</v-icon>
                                </v-layout>
                            </template>
                            <span>Show</span>
                        </v-tooltip>
                    </v-sheet>
                </v-navigation-drawer>
            </v-hover>
            <object-details-modal
                @modalClosed="closeObjectDetailsModal"
                v-if="$store.state.results.showObjectDetailsModal"
            />
        </div>
    </v-container>
</template>

<script>
import searchOptions from "../components/search/searchOptions.vue";
import resultPanel from "../components/results/resultPanel.vue";
import loading from "vue-full-loading";
import objectDetailsModal from "@/components/results/modals/objectDetailsModal";

/**This component connect searchOption and tabResult
 * call component loading when variable loading or dowloading is true
 */
export default {
    name: "explore-data",
    props: {},
    components: {
        searchOptions,
        resultPanel,
        loading,
        objectDetailsModal
    },
    data() {
        return {
            drawer: true,
            mini: false
        };
    },
    methods: {
        onSearch() {
            this.mini = true;
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
        }
    },
    mounted: function() {
        this.getUrlObject();
    }
};
</script>
