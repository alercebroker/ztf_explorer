<template>
    <v-container fluid pt-0 pl-2 pr-2 pb-2>
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
                :mini-variant="mini"
                width="400"
                mini-variant-width="30"
                v-model="drawer"
                disable-resize-watcher
                slot-scope="{ hover }"
                :class="`elevation-${hover && mini? 24 : 0}`"
            >
                <v-toolbar dark color="toolbar" dense v-if="!mini">
                    <v-list class="pa-0">
                        <v-list-tile avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>Search Options</v-list-tile-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-tooltip left>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon v-on="on" @click.stop="mini = !mini">
                                            <v-icon>chevron_left</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Hide</span>
                                </v-tooltip>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>
                <search-options v-if="!mini" />
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
    </v-container>
</template>

<script>
import searchOptions from "../components/search/searchOptions.vue";
import resultPanel from "../components/results/resultPanel.vue";
import loading from "vue-full-loading";

/**This component connect searchOption and tabResult
 * call component loading when variable loading or dowloading is true
 */
export default {
    name: "explore-data",
    props: {},
    components: {
        searchOptions,
        resultPanel,
        loading
    },
    data() {
        return {
            drawer: true,
            mini: false
        };
    },
    methods: {}
};
</script>
