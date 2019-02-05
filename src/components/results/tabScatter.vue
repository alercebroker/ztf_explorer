<template>
	<div class="tabScatter">
		<b-row align-h="around">
			<b-col cols="6">
				<b-form-group horizontal label="xAxis" label-for="xAxis">
					<b-form-select v-model="selectedX" :options="options" id="xAxis"></b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="6">
				<b-form-group horizontal label="yAxis" label-for="yAxis">
					<b-form-select v-model="selectedY" :options="options" id="yAxis"></b-form-select>
				</b-form-group>
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
  	components: {
  		scatter,
  	},
  	data(){
		return {
			selectedX: null,
			selectedY: null,
			options: [
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
				{ text: "Firstmagr", value: "firstmagr" },
				{ text: "Lastmagr", value: "lastmagr" },
			],
			plotValues:[
				{oid: 1, pair:[2 ,20]},
			],
		}
	},
	methods:{
		getAxisData: function(axis,obj){
    		return obj != null ? obj[axis] : null;
    	},
    	setPlotValues: function(){
    		//borrar datos anteriores
    		this.plotValues=[];
			//agregar plotValues
			if(this.selectedX && this.selectedY){
				this.objects.forEach(obj => {
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
			}
    	},
	},
	computed:{
		objects(){
			return this.$store.state.search.objects;
		}
	},
	watch: {
		/**
		 * update plot values when selected axis x change by user
         */
		selectedX: function() { // watch it
                this.setPlotValues();
        },
        /**
         * update plot values when selected axis change by user
		 */
        selectedY: function() { // watch it
                this.setPlotValues();
		},
		/**
		 * update plot values when new search is executed
		 */
		objects(){
			this.setPlotValues();
		}
	},
}
</script>
