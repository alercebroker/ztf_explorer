<template>
	<div class="tabHistogram">
		<b-row align-h="around"> 
			<b-col cols="4"> 
				<b-form-group horizontal label="yAxis" label-for="yAxis">
					<b-form-select v-model="selected" :options="options" id="yAxis"></b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="4"> 
				<b-form-group horizontal label="nbins" label-for="nbins">
					<b-form-input id="nbins" type="number" v-model="nbins"></b-form-input>
				</b-form-group>
			</b-col>
		</b-row>
		<b-row align-h="center">
			<div id="histogram" style="min-width: 310px; height: 400px; max-width: 800px; margin: 0 auto">
				<p> Histogram not aviable</p>
			</div>
		</b-row>
	</div>
</template>

<script>

export default {
  	name: 'tabHistogram',
  	data(){
		return {
			nbins: 10,
			selected: null,
			options: [
				{ value: null, text: "Please select a variable" },
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
	}
}
</script>