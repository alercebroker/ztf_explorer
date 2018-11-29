<template>
	<div class="tabScatter">
		<b-row align-h="around">
			<b-col cols="4">
				<b-form-group horizontal label="xAxis" label-for="xAxis">
					<b-form-select v-model="selectedX" :options="optionsX" id="xAxis"></b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="4">
				<b-form-group horizontal label="yAxis" label-for="yAxis">
					<b-form-select v-model="selectedY" :options="optionsY" id="yAxis"></b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="2">
				<b-button variant="secondary" alt="Load and add another sample of data" disabled>More data</b-button>
			</b-col>
		</b-row>
		<b-row align-h="center">
			<scatter :results="result" :plotValues="plotValues" :xVariable="selectedX" :yVariable="selectedY"></scatter>
		</b-row>
	</div>
</template>

<script>
import scatter from "./scatter.vue";
export default {
  	name: 'tabScatter',
  	props: ["result", "currentQueryParent"],
  	components: {
  		scatter,
  	},
  	data(){
		return {
			currentQuery: this.currentQueryParent,
			selectedX: null,
			selectedY: null,
			optionsX: [
				{ value: null, text: "Please select a variable" },
				{ text: "Nr. Obs", value: "nobs" },
				{
					value: null,
					text: "-- Magnitude  Band G --",
					disabled: true
				},
				{ text: "Maxg", value: "maxg" },
				{ text: "Ming", value: "Ming" },
				{ text: "Meang", value: "Meang" },
				{ text: "Slopeg", value: "Slopeg" },
				{ text: "Firstmagg", value: "firstmagg" },
				{ text: "Lastmagg", value: "lastmagg" },
				{
					value: null,
					text: "-- Magnitude Band R --",
					disabled: true
				},
				{ text: "Maxr", value: "maxr" },
				{ text: "Minr", value: "Minr" },
				{ text: "Meanr", value: "Meanr" },
				{ text: "Sloper", value: "Sloper" },
				{ text: "Firstmagr", value: "firstmagr" },
				{ text: "Lastmagr", value: "lastmagr" },
			],
			optionsY: [
				{ value: null, text: "Please select a variable" },
				{ text: "Nr. Obs", value: "nobs" },
				{
					value: null,
					text: "-- Magnitude  Band G --",
					disabled: true
				},
				{ text: "Maxg", value: "maxg" },
				{ text: "Ming", value: "Ming" },
				{ text: "Meang", value: "Meang" },
				{ text: "Slopeg", value: "Slopeg" },
				{ text: "Firstmagg", value: "firstmagg" },
				{ text: "Lastmagg", value: "lastmagg" },
				{
					value: null,
					text: "-- Magnitude Band R --",
					disabled: true
				},
				{ text: "Maxr", value: "maxr" },
				{ text: "Minr", value: "Minr" },
				{ text: "Meanr", value: "Meanr" },
				{ text: "Sloper", value: "Sloper" },
				{ text: "Firstmagr", value: "firstmagr" },
				{ text: "Lastmagr", value: "lastmagr" },
			],
			plotValues:[
				{oid: 1, pair:[2 ,20]},
				{oid: 2, pair:[4 , 7]},
				{oid: 3, pair:[15 , 3]},
			],
		}
	},
	methods:{
		getAxisData: function(axis,obj){
    		var x = axis.title.text;
    		if (x == "Nr. Obs"){
    			return obj.nobs;
    		} if (x == "Maxg"){
    			return obj.maxg;
    		} if (x == "Ming"){
    			return obj.ming;
    		} if (x == "Meang"){
    			return obj.meang;
    		} if (x == "Slopeg"){
    			return obj.slopeg;
    		} if (x == "Firstmagg"){
    			return obj.firstmagg;
    		} if (x == "Lastmagg"){
    			return obj.lastmagg;
    		} if (x == "Maxr"){
    			return obj.maxr;
    		} if (x == "Minr"){
    			return obj.minr;
    		} if (x == "Meanr"){
    			return obj.meanr;
    		} if (x == "Sloper"){
    			return obj.sloper;
    		} if (x == "Firstmagr"){
    			return obj.firstmagr;
    		} if (x == "Lastmagr"){
    			return obj.lastmagr;
    		} else {
    			return null;
    		}
    	},
    	setPlotValues: function(){ // TODO testear con querys
    		this.result.data.forEach(obj => {
    			this.plotValues.push({
    				oid: obj.oid,
    				pair:[
    					getAxisData(this.selectedX, obj),
    					getAxisData(this.selectedY, obj),
    					],
    			});
    		});
    	},
	},
	watch: {
		selectedX: function(newVal, oldVal) { // watch it
                this.setPlotValues();
        },
        selectedY: function(newVal, oldVal) { // watch it
                this.setPlotValues();
        },
	},
}
</script>
