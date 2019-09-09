<template>
    <div>
        <v-tabs
            v-if="$vuetify.breakpoint.smAndDown"
            dark
            background-color="toolbar"
            :value="selectedTab"
        >
            <v-tab>Search</v-tab>
            <v-tab-item v-if="$vuetify.breakpoint.smAndDown">
                <v-layout row wrap>
                    <v-flex xs10 offset-xs1>
                        <search-options @onSearch="onSearch"></search-options>
                    </v-flex>
                </v-layout>
            </v-tab-item>
            <v-tab>Results</v-tab>
            <v-tab-item>
                <tab-data />
            </v-tab-item>
        </v-tabs>
        <div v-else>
            <v-card width="100%" class="ma-2">
                <v-card-title primary-title>Results</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <tab-data />
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import tabData from "./tabData.vue";
import overviewCards from "./cards/overviewCards.vue";
import searchOptions from "@/components/search/searchOptions.vue";

export default {
    name: "result-panel",
    components: {
        tabData,
        searchOptions,
        overviewCards
    },
    methods: {
        onSearch() {
            if (this.$vuetify.breakpoint.smAndDown) {
                this.selectedTab = 1;
            }
        }
    },
    computed: {
        selectedTab: {
            get() {
                return this.$store.state.selectedTab;
            },
            set(value) {
                this.$store.dispatch("setSelectedTab", value);
            }
        }
    }
};
</script>

<style scoped>
</style>
