<template>
    <b-card title="Spatial Distribution">
        <div id="plotContainer">
            <div v-if="spatialDistribution" id="bokeh" style="width:100%;height:300px"></div>
            <div v-else style="width:100%;height:300px;">
                <div class="overlay">
                    <atom-spinner :animation-duration="2000" :size="200" color="#0779D8"/> 
                </div>
            </div>
        </div>
    </b-card>
</template>

<script>
import {AtomSpinner} from 'epic-spinners'
export default {
    name: "tab-spatial-distribution",
    components: {
        AtomSpinner
    },
    data(){
        return {
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
            document.getElementById("plotContainer").innerHTML = '<div id="bokeh" style="width:100%; height:300px"/>'
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
.overlay {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
