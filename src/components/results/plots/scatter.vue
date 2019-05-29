<template>
	<div>
		<div v-show="loading" style="width:100%;height:300px">
			<div class="overlay">
                <atom-spinner :animation-duration="2000" :size="200" color="#0779D8"/> 
            </div>
		</div>
		<div v-show="!loading">
			<div id="overviewScatterContainer" v-if="type=='overview'" style="width:100%;height:300px">
            	<div id="overviewScatter" style="width:100%;height:300px;position:relative;"/>
        	</div>
			<div id="queryScatterContainer" v-if="type=='query'" style="width:100%;height:300px">
            	<div id="queryScatter" style="width:100%;height:300px;position: relative;"/>
        	</div>
		</div>
    </div>
</template>

<script>
import {AtomSpinner} from 'epic-spinners'
export default {
    name: "scatter",
    props: ['type', 'xAxis', 'yAxis','cls', 'classifier'],
	components: {
		AtomSpinner
	},
    data(){
        return{ 						
        }
	},
	mounted(){
		let payload = {
			xAxis: this.xAxis,
			yAxis: this.yAxis,
			classs: this.cls,
			classifier: this.classifier,
			query_parameters: this.$store.state.search.query_parameters
		}
		if(this.type === "overview"){
			this.$store.dispatch('getOverviewScatter', payload);
		}
		else if(this.type === "query"){
			this.$store.dispatch('queryScatter', payload);
		}
	},
    computed:{
		overviewScatter(){
			return this.$store.state.results.overviewScatter
		},
		queryScatter(){
			return this.$store.state.results.queryScatter;
		},
		selectedTab(){
			return this.$store.state.selectedTab;
		},
		loading()
		{
			return this.$store.state.loadingScatterPlot;
		}
	},
	methods:{
		clearDiv(type){
			document.getElementById(type+"ScatterContainer").innerHTML = '<div id="'+type+'Scatter" style="width:100%; height:300px"/>'	
		}
	},
	watch:{
		overviewScatter(newVal){
			if(newVal && this.type==="overview"){
				this.clearDiv("overview");
				Bokeh.embed.embed_item(newVal, "overviewScatter");
			}
		},
		queryScatter(newVal){
			if(newVal && this.type==="query"){
				this.clearDiv("query");
				Bokeh.embed.embed_item(newVal, "queryScatter");
			}
		}
	},
}
</script>
