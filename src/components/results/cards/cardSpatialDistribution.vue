<template>
    <b-card title="Spatial Distribution">
        <spatial-distribution/>
    </b-card>
</template>

<script>
import spatialDistribution from '../plots/spatialDistribution'
export default {
    name: "card-spatial-distribution",
    components: {
        spatialDistribution
    },
    data(){
        return {
        }
    },
    mounted(){
        this.$store.dispatch('getSpatialDistribution');
    },
}
</script>

<style>
.overlay {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
