<template>
    <div>
        <div v-if="$store.state.search.error">
            <b-alert show variant="danger">Error connecting to our servers</b-alert>
        </div>
        <b-container v-else>
            <!--CARDS WITH GENERAL DATA-->
            <b-container fluid class="mb-3">
                <generalData/>
            </b-container>
            <!--SPATIAL DISTRIBUTION OF ALL OBJECTS-->
            <b-row class="mb-3">
                <b-col cols=12>
                    <tab-spatial-distribution/>
                </b-col>
            </b-row>
            <!--TREEMAP OF CLASS-->
            <b-row class="mb-3">
                <b-col cols=12>
                    <tabTreemap />
                </b-col>
            </b-row>
            <!--HISTOGRAM OF SOME FEATURES AND SCATTER PLOT-->
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
import tabTreemap from './tabTreemap.vue';
import generalData from './tabGeneralData.vue';
export default {
    name:"general-dashboard",
    components: {
        tabSpatialDistribution,
        tabHistogram,
        tabScatter,
        tabTreemap,
        generalData
    }
}
</script>

<style>

</style>
