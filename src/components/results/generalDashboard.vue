<template>
    <b-container>
        <b-row>
            <b-col cols=6>
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
