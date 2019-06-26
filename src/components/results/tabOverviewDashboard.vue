<template>
    <div>
        <div v-if="$store.state.search.error">
            <b-alert show variant="danger">Error connecting to our servers</b-alert>
        </div>
        <b-container v-else>
            <!--CARDS WITH GENERAL DATA-->
            <!-- <b-container fluid class="mb-3">
                <generalData/>
            </b-container> -->
            <!--SPATIAL DISTRIBUTION OF ALL OBJECTS-->
            <b-row class="mb-3">
                <b-col cols=12>
                    <card-spatial-distribution/>
                </b-col>
            </b-row>
            <!--TREEMAP OF CLASS-->
            <b-row class="mb-3">
                <b-col cols=12>
                    <card-treemap />
                </b-col>
            </b-row>
            <!--HISTOGRAM OF SOME FEATURES AND SCATTER PLOT-->
            <!-- <b-row>
                <b-col cols=6>
                    <card-histogram type="overview" />
                </b-col>
                <b-col cols=6>
                    <card-scatter type="overview"/>
                </b-col>
            </b-row> -->
        </b-container>
    </div>
</template>

<script>
import cardSpatialDistribution from './cards/cardSpatialDistribution.vue';
import cardHistogram from './cards/cardHistogram';
import cardScatter from './cards/cardScatter.vue';
import cardTreemap from './cards/cardTreemap';
import cardGeneralData from './cards/cardGeneralData.vue';
export default {
    name:"overview-dashboard",
    components: {
        cardSpatialDistribution,
        cardHistogram,
        cardScatter,
        cardTreemap,
        cardGeneralData
    }
}
</script>

<style>

</style>
