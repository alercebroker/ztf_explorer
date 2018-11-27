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
			<scatter :data="results" :xVariable="selectedX" :yVariable="selectedY"></scatter>
		</b-row>
	</div>
</template>

<script>
import scatter from "./scatter.vue";
export default {
  	name: 'tabScatter',
  	props: ["results", "currentQueryParent"],
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
			]
		}
	}
}
</script>