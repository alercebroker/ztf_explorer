<template>
    <b-container>
        <b-row>
            <b-col cols=12>
                <tab-spatial-distribution/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import tabSpatialDistribution from './tabSpatialDistribution.vue';
export default {
    name:"general-dashboard",
    components: {
        tabSpatialDistribution
    }
}
</script>

<style>

</style>
