<template>
    <div>
        <div v-if="loading" style="width:100%;height:300px">
			<div class="overlay">
                <atom-spinner :animation-duration="2000" :size="200" color="#0779D8"/> 
            </div>
		</div>
		<div v-if="!loading">
			<div id="overviewHistogramContainer" v-if="type=='overview'">
                <div id="overviewHistogram" style="width:100%;height:300px;position:relative;"/>
            </div>
			<div id="queryHistogramContainer" v-if="type=='query'" style="width:100%;height:300px">
                <div id="queryHistogram" style="width:100%;height:300px;position:relative;"/>
            </div>
		</div>
    </div>
</template>

<script>
import {AtomSpinner} from 'epic-spinners'
export default {
    name: "tab-histogram",
    components: {
        AtomSpinner
    },
    props:['type', 'xAxis'],
    data(){
        return {
            
        }
    },
    mounted(){
        if(this.type === "overview"){
            this.$store.dispatch('getOverviewHistogram', this.xAxis);
        }
        else if(this.type === "query"){
            this.$store.dispatch('getQueryHistogram', this.xAxis);
        }
        
    },
    computed:{
        overviewHistogram(){
            return this.$store.state.results.overviewHistogram;
        },
        queryHistogram(){
            return this.$store.state.results.queryHistogram;
        },
        selectedTab(){
            return this.$store.state.selectedTab;
        },
        loading(){
            return this.$store.state.loadingPlot;
        }
    },
    methods:{
        clearDiv(type){
            if(this.$store.state.loadingPlot)
            {
                document.getElementById(type+"HistogramContainer").innerHTML = '<div id="'+type+'Histogram" style="width:100%;height:300px"/>'
            }
        }
    },
    watch:{
        overviewHistogram(newVal){
            if(newVal && this.selectedTab===0){
                this.clearDiv("overview");
                Bokeh.embed.embed_item(newVal, "overviewHistogram");
            }
        },
        queryHistogram(newVal){
            if(newVal && this.selectedTab === 2){
                this.clearDiv("query");
                Bokeh.embed.embed_item(newVal, "queryHistogram")
            }
        },
        selectedTab(newVal){
            if(newVal === 0 && this.overviewHistogram){
                this.clearDiv("overview");
                Bokeh.embed.embed_item(this.overviewHistogram, "overviewHistogram");
            }
            else if(newVal === 2 && this.queryHistogram){
                this.clearDiv("query");
                Bokeh.embed.embed_item(this.queryHistogram, "queryHistogram")
            }
        }

    },
}
</script>

<style>

</style>
