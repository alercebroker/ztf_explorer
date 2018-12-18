<template>
	<div class="tabHistogram">
		<b-row align-h="around">
			<b-col cols="4">
				<b-form-group horizontal label="xAxis" label-for="yAxis">
					<b-form-select v-model="selected" :options="options" id="yAxis"></b-form-select>
				</b-form-group>
			</b-col>
			<!--b-col cols="4">
				<b-form-group horizontal label="nbins" label-for="nbins">
					<b-form-input id="nbins" type="number" v-model="nbins" disabled></b-form-input>
				</b-form-group>
			</b-col-->
			<b-col cols="2">
				<b-button variant="secondary" alt="Load and add another sample of data" v-on:click="loadMore(setPlotValues)" :disabled="disabled">More data</b-button>
			</b-col>
		</b-row>
		<b-row align-h="center">
			<histogram :plotValues="plotValues" :xVariable="selected" :nbins="nbins"></histogram>
		</b-row>
	</div>
</template>

<script>
import histogram from "./histogram.vue";

export default {
	name: 'tabHistogram',
	props: ["results",
		"currentQueryParent",
		"pageNumber",
		"getMoreObjects",
		"loadMore"],
	components: {
		histogram
	},
	data(){
		return {
			currentQuery: this.currentQueryParent,
			nbins: 10,
			selected: null,
			plotValues:[],
			options: [
				{ value: null, text: "Please select a variable" },
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
				{
					value: null,
					text: "-- Dates --",
					disabled: true
				},
				{ text: "FirstJd", value: "firstjd" },
				{ text: "LastJd", value: "lastjd" },
				{ text: "DeltaJd", value: "deltajd" },

			]
		}
	},
	methods:{
		getAxisData: function(axis,obj){
			var x = axis;
			if (obj != null){
				if (x == "maxg"){
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
				} if (x == "firstjd"){
					return obj.firstjd;
				} if (x == "lastjd"){
					return obj.lastjd;
				} if (x == "deltajd"){
					return obj.deltajd;
				} else {
					return null;
				}
			} else {
				return null;
			}
		},
		setPlotValues: function(){
			//erase previous values
			this.plotValues=[];
			//add plot values
			this.results.data.result.forEach(obj => {
				if (this.getAxisData(this.selected, obj) != null){
					this.plotValues.push({
						oid: obj.oid,
						pair:this.getAxisData(this.selected, obj),
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
	  disabled() {
	      return this.selected == null;
	  },
	},
	watch: {
        /**
		 * update plot values when selected axis change by user
         */
		selected: function(newVal, oldVal) { // watch it
                this.setPlotValues();
        },
	},
}
</script>
