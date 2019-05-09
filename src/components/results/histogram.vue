<template>
    <div>
        <div v-show="loading" style="width:100%;height:300px">
			<div class="overlay">
                <atom-spinner :animation-duration="2000" :size="200" color="#0779D8"/> 
            </div>
		</div>
		<div v-show="!loading">
			<div id="overviewHistogramContainer" v-if="type=='overview'">
                <div id="overviewHistogram" style="width:100%;height:300px;"/>
            </div>
			<div id="queryHistogramContainer" v-if="type=='query'" style="width:100%;height:300px">
                <div id="queryHistogram" style="width:100%;height:300px;"/>
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
            this.$store.dispatch('queryHistogram', {query_parameters: {}, xAxis: this.xAxis, type: this.type});
        }
        else if(this.type === "query"){
            this.$store.dispatch('queryHistogram', {query_parameters:this.$store.state.search.query_parameters, xAxis: this.xAxis, type: this.type});
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
            var container = document.getElementById(type+"HistogramContainer");
            container.innerHTML = '<div id="'+type+'Histogram" style="width:100%;height:300px"/>'
        }
    },
    watch:{
        overviewHistogram(newVal){
            if(newVal && this.type === "overview"){
                this.clearDiv("overview");
                Bokeh.embed.embed_item(newVal, "overviewHistogram");
            }
        },
        queryHistogram(newVal){
            if(newVal && this.type === "query"){
                this.clearDiv("query");
                Bokeh.embed.embed_item(newVal, "queryHistogram")
            }
        },
    },
}
</script>

<style>

</style>
