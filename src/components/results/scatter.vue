<template>
	<div>
		<div v-if="loading" style="width:100%;height:300px">
			<div class="overlay">
                <atom-spinner :animation-duration="2000" :size="200" color="#0779D8"/> 
            </div>
		</div>
		<div v-if="!loading">
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
			"x-axis": this.xAxis,
			"y-axis": this.yAxis,
			"class": this.cls,
			"classifier": this.classifier
		}
		if(this.type === "overview"){
			this.$store.dispatch('getOverviewScatter', payload);
		}
		else if(this.type === "query"){
			this.$store.dispatch('getQueryScatter', payload);
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
			if(this.$store.state.loadingScatterPlot)
			{
				document.getElementById(type+"ScatterContainer").innerHTML = '<div id="'+type+'Scatter" style="width:100%; height:300px"/>'
			}	
		}
	},
	watch:{
		overviewScatter(newVal){
			if(newVal && this.selectedTab===0){
				this.clearDiv("overview");
				Bokeh.embed.embed_item(newVal, "overviewScatter");
			}
		},
		queryScatter(newVal){
			if(newVal && this.selectedTab===2){
				this.clearDiv("query");
				Bokeh.embed.embed_item(newVal, "queryScatter");
			}
		},
		selectedTab(newVal){
			if(newVal === 0 && this.overviewScatter){
				this.clearDiv("overview");
				Bokeh.embed.embed_item(this.overviewScatter, "overviewScatter");
			}
			if(newVal === 2 && this.queryScatter){
				this.clearDiv("query");
				Bokeh.embed.embed_item(this.queryScatter, "queryScatter");
			}
		}
	},
}
</script>
