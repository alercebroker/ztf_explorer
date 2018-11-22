<template>
	<div class="tabHistogram">
		<b-row> 
			<b-col> 
				<b-form-group horizontal label="yAxis" label-for="yAxis">
					<b-form-select v-model="selected" :options="options" id="yAxis"></b-form-select>
				</b-form-group>
			</b-col>
		</b-row>
	</div>
</template>

<script>

export default {
  	name: 'tabHistogram',
  	data(){
		return {
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