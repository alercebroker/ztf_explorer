<template>
    <v-card>
        <v-tabs dark>
            <v-tab>Query Table</v-tab>
            <v-tab-item>
                <tab-data />
            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
import tabData from "./tabData.vue";
import tabOverviewDashboard from "./tabOverviewDashboard.vue";
import tabQueryDashboard from "./tabQueryDashboard.vue";
export default {
    name: "result-panel",
    components: {
        tabData,
        tabOverviewDashboard,
        tabQueryDashboard
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
