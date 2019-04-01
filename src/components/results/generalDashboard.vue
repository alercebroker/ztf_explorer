<template>
    <div>
        <div v-if="$store.state.search.error">
            <b-alert show variant="danger">Error connecting to our servers</b-alert>
        </div>
        <b-container v-else>
            <b-row>
                <generalData/>
            </b-row>
            <b-row class="mb-3">
                <b-col cols=12>
                    <tab-spatial-distribution/>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols=6>
                    <tabHistogram type="overview" />
                </b-col>
                <b-col cols=6>
                    <tabScatter type="overview"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import tabSpatialDistribution from './tabSpatialDistribution.vue';
import tabHistogram from './tabHistogram.vue';
import tabScatter from './tabScatter.vue';
import generalData from './tabGeneralData.vue'
export default {
    name:"general-dashboard",
    components: {
        tabSpatialDistribution,
        tabHistogram,
        tabScatter,
        generalData
    }
}
</script>

<style>

</style>
