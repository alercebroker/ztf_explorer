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
				<b-button variant="secondary" alt="Load and add another sample of data" v-on:click="loadMore(setPlotValues)" :disabled="disabled">More data</b-button>
			</b-col>
		</b-row>
		<b-row align-h="center">
			<scatter :plotValues="plotValues" :xVariable="selectedX" :yVariable="selectedY"></scatter>
		</b-row>
	</div>
</template>

<script>
import scatter from "./scatter.vue";
export default {
  	name: 'tabScatter',
  	props: ["result", "currentQueryParent","loadMore"],
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
				{ text: "Nr. Alerts", value: "nobs" },
				{ text: "Class", value: "class" },
				{ text: "Class Probability", value: "pclass" },
				{ text: "Period*", value: "period" },
				{
					value: null,
					text: "-- Magnitude  Band G --",
					disabled: true
				},
				{ text: "Maxg", value: "maxg" },
				{ text: "Ming", value: "ming" },
				{ text: "Meang", value: "meang" },
				{ text: "Slopeg", value: "slopeg" },
				{ text: "Firstmagg", value: "firstmagg" },
				{ text: "Lastmagg", value: "lastmagg" },
				{
					value: null,
					text: "-- Magnitude Band R --",
					disabled: true
				},
				{ text: "Maxr", value: "maxr" },
				{ text: "Minr", value: "minr" },
				{ text: "Meanr", value: "meanr" },
				{ text: "Sloper", value: "sloper" },
				{ text: "Firstmagr", value: "firstmagr" },
				{ text: "Lastmagr", value: "lastmagr" },
			],
			optionsY: [
				{ value: null, text: "Please select a variable" },
				{ text: "Nr. Alerts", value: "nobs" },
				{ text: "Class", value: "class" },
				{ text: "Class Probability", value: "pclass" },
				{ text: "Period*", value: "period" },
				{
					value: null,
					text: "-- Magnitude  Band G --",
					disabled: true
				},
				{ text: "Maxg", value: "maxg" },
				{ text: "Ming", value: "ming" },
				{ text: "Meang", value: "meang" },
				{ text: "Slopeg", value: "slopeg" },
				{ text: "Firstmagg", value: "firstmagg" },
				{ text: "Lastmagg", value: "lastmagg" },
				{
					value: null,
					text: "-- Magnitude Band R --",
					disabled: true
				},
				{ text: "Maxr", value: "maxr" },
				{ text: "Minr", value: "minr" },
				{ text: "Meanr", value: "meanr" },
				{ text: "Sloper", value: "sloper" },
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
    		var x = axis;
    		if (obj != null){
    			if (x == "nobs"){
	    			return obj.nobs;
	    		} if (x == "class"){
	    			return obj.class;
	    		} if (x == "pclass"){
	    			return obj.pclass;
	    		} if (x == "period"){
	    			return obj.period;
	    		} if (x == "maxg"){
	    			return obj.maxg;
	    		} if (x == "ming"){
	    			return obj.ming;
	    		} if (x == "meang"){
	    			return obj.meang;
	    		} if (x == "slopeg"){
	    			return obj.slopeg;
	    		} if (x == "firstmagg"){
	    			return obj.firstmagg;
	    		} if (x == "lastmagg"){
	    			return obj.lastmagg;
	    		} if (x == "maxr"){
	    			return obj.maxr;
	    		} if (x == "minr"){
	    			return obj.minr;
	    		} if (x == "meanr"){
	    			return obj.meanr;
	    		} if (x == "sloper"){
	    			return obj.sloper;
	    		} if (x == "firstmagr"){
	    			return obj.firstmagr;
	    		} if (x == "lastmagr"){
	    			return obj.lastmagr;
	    		} else {
	    			return null;
	    		}
	    	} else {
	    		return null;
	    	}
    	},
    	setPlotValues: function(){
    		//borrar datos anteriores
    		this.plotValues=[];
    		//agregar plotValues
    		this.result.data.result.forEach(obj => {
    			if (this.getAxisData(this.selectedX, obj) != null && this.getAxisData(this.selectedY, obj) != null){
	    			this.plotValues.push({
	    				oid: obj.oid,
	    				pair:[
	    					this.getAxisData(this.selectedX, obj),
	    					this.getAxisData(this.selectedY, obj),
	    					],
	    			});
	    		};
    		});
    	},
	},
	computed : {
        /**
         * check if axis is selected
         * @returns {boolean}
         */
  	  disabled () {
  	      return this.selectedX == null || this.selectedY == null
	  }
	},
	watch: {
  	    /**
         * update plot values when selected axis x change by user
         */
		selectedX: function(newVal, oldVal) { // watch it
                this.setPlotValues();
        },
        /**
         * update plot values when selected axis change by user
		 */
        selectedY: function(newVal, oldVal) { // watch it
                this.setPlotValues();
        },
	},
}
</script>
