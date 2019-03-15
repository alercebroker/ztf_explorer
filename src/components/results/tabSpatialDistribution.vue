<template>
    <b-card id="card" title="Spatial Distribution">
        <div id="bokeh"></div>
    </b-card>
</template>

<script>
import loading from "vue-full-loading";
export default {
    name: "tab-spatial-distribution",
    components: {
        loading
    },
    data(){
        return {
            src: null
        }
    },
    mounted(){
        this.$store.dispatch('getSpatialDistribution');
    },
    computed:{
        spatialDistribution(){
            return this.$store.state.results.spatialDistribution
        },
        selectedTab(){
            return this.$store.state.selectedTab
        }
    },
    methods:{
        clearDiv(){
            document.getElementById("card").innerHTML = '<div id="bokeh" />'
        }
    },
    watch:{
        spatialDistribution(newVal){
            if(newVal && this.selectedTab===0){
                this.clearDiv();
                Bokeh.embed.embed_item(newVal, "bokeh");
            }
        },
        selectedTab(newVal){
            if(newVal === 0 && this.spatialDistribution){
                this.clearDiv();
                Bokeh.embed.embed_item(this.spatialDistribution, "bokeh");
            }
        }

    },
}
</script>

<style>

</style>
