<template>
	<div id="scatterContainer">
		<div id="scatter" style="width:100%;height:300px"></div>
	</div>
</template>

<script>
	export default {
        name: "scatter",
        props: ['type', 'xAxis', 'yAxis','cls', 'classifier'],
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
				// query histogram
			}
		},
        computed:{
			overviewScatter(){
				return this.$store.state.results.overviewScatter
			},
			selectedTab(){
				return this.$store.state.selectedTab
			}
		},
		methods:{
			clearDiv(){
				document.getElementById("scatterContainer").innerHTML = '<div id="scatter" style="width:100%; height:300px"/>'
			}
		},
		watch:{
			overviewScatter(newVal){
				if(newVal && this.selectedTab===0){
					this.clearDiv();
					Bokeh.embed.embed_item(newVal, "scatter");
				}
			},
			selectedTab(newVal){
				if(newVal === 0 && this.overviewHistogram){
					this.clearDiv();
					Bokeh.embed.embed_item(this.overviewHistogram, "scatter");
				}
			}

		},
    }
</script>
