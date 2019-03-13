<template>
    <b-container>
        <b-row>
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
