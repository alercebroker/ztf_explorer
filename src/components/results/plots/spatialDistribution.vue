<template>
    <div id="plotContainer">
        <div v-if="spatialDistribution" id="bokeh" style="width:100%;height:300px"></div>
        <div v-else style="width:100%;height:300px;">
            <div class="overlay">
                <atom-spinner :animation-duration="2000" :size="200" color="#0779D8"/> 
            </div>
        </div>
    </div>
</template>

<script>
import {AtomSpinner} from 'epic-spinners'

export default {
    name: 'spatial-distribution',
    components:{
        AtomSpinner
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
    }
}
</script>

<style>

</style>
