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
export default {
    name: "result-panel",
    components: {
        tabData
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
