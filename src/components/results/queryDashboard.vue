<template>
    <b-container>
        <div v-if="$store.state.search.error">
            <b-alert show variant="danger">Error connecting to our servers</b-alert>
        </div>
        <div v-else-if="!$store.state.results.total > 0">
            <b-alert variant="info" show>Graphs will be displayed here after you make a query</b-alert>
        </div>
        <b-row v-else>
            <b-col cols="6">
                <tabHistogram/>
            </b-col>
            <b-col cols="6">
                <tabScatter/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import  tabHistogram  from "./tabHistogram.vue";
import  tabScatter  from "./tabScatter.vue";
export default {
    name: "queryDashboard",
    components: {
        tabScatter,
        tabHistogram,
    },
}
</script>

<style>

</style>
