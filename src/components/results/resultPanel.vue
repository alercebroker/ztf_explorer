<template>
    <v-card flat>
        <v-tabs dark background-color="toolbar" :value="selectedTab">
            <v-tab>Overview</v-tab>
            <v-tab-item>
                <overview-cards v-if="!$route.params.id || $store.state.search.searched"/>
            </v-tab-item>
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
export default {
    name: "result-panel",
    components: {
        tabData,
        overviewCards
    },
    methods: {},
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
