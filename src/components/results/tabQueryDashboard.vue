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
                <card-histogram type="query"/>
            </b-col>
            <b-col cols="6">
                <card-scatter type="query"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import  cardHistogram  from "./cards/cardHistogram.vue";
import  cardScatter  from "./cards/cardScatter.vue";
export default {
    name: "queryDashboard",
    components: {
        cardScatter,
        cardHistogram,
    },
}
</script>

<style>

</style>
