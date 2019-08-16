<template>
    <v-card flat>
        <v-tabs dark background-color="toolbar" :value="selectedTab">
          <v-tab v-if="$vuetify.breakpoint.smAndDown">Search</v-tab>
          <v-tab-item v-if="$vuetify.breakpoint.smAndDown">
            <v-layout row wrap>
              <v-flex xs10 offset-xs1 >
                <search-options @onSearch="onSearch"></search-options>
              </v-flex>
            </v-layout>
          </v-tab-item>
            <!-- <v-tab>Overview</v-tab>
            <v-tab-item>
                <overview-cards v-if="!$route.params.id || $store.state.search.searched"/>
            </v-tab-item> -->
            <v-tab>Query Table</v-tab>
            <v-tab-item>
                <tab-data />
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
import tabData from "./tabData.vue";
import overviewCards from "./cards/overviewCards.vue"
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
        if(this.$vuetify.breakpoint.smAndDown){
          this.selectedTab =2;
        }
      },
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
