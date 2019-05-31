<template>
	<b-card >
		<b-row align-v="center" >
			<b-col cols="4" class="pr-0">
				<h4>Scatter</h4>
			</b-col>
			<b-col cols="3" class="pl-0">
				<b-form-select v-model="selectedX" :options="optionsX" id="xAxis"></b-form-select>
			</b-col>
			<b-col cols="3" class="pl-0">
				<b-form-select v-model="selectedY" :options="optionsY" id="yAxis"></b-form-select>
			</b-col>
			<!-- <b-col cols="3">
				<b-form-select v-model="selectedClass" :options="classOptions" id="class"></b-form-select>
			</b-col>
			<b-col cols="3">
				<b-form-select v-model="selectedClassifier" :options="classifierOptions" id="class"></b-form-select>
			</b-col> -->
			<b-col cols="2" class="pl-0 mb-2">
				<b-button variant="primary" @click="plot" :disabled="$store.state.loadingScatterPlot">{{$store.state.loadingScatterPlot ? "Loading" : "Plot"}}</b-button>
			</b-col>
		</b-row>
		
		<scatter :type="type" :xAxis="selectedX" :yAxis="selectedY" :cls="selectedClass" :classifier="selectedClassifier"/>
	</b-card>
</template>

<script>
import scatter from "../plots/scatter.vue";
export default {
	name: 'card-scatter',
	props:['type'],
	components: {
		scatter,
	},
	data(){
		return {
			selectedX: "mean_magpsf_g",
			selectedY: "mean_magpsf_r",
			selectedClass: null,
			selectedClassifier: null,
			options: [
				{ text: "Detections", value: "nobs" },
				{
					value: null,
					text: "-- Magnitude Band G --",
					disabled: true
				},
				{ text: "Max of g", value: "max_magpsf_g" },
				{ text: "Min of g", value: "min_magpsf_g" },
				{ text: "Mean of g", value: "mean_magpsf_g" },
				//{ text: "Slopeg", value: "slopeg" },
				{ text: "First det. of g (JD)", value: "first_magpsf_g" },
				{ text: "Last det. of g (JD)", value: "last_magpsf_g" },
				{
					value: null,
					text: "-- Magnitude Band R --",
					disabled: true
				},
				{ text: "Max of r", value: "max_magpsf_r" },
				{ text: "Min of r", value: "min_magpsf_r" },
				{ text: "Mean of r", value: "mean_magpsf_r" },
				//{ text: "Sloper", value: "sloper" },
				{ text: "First det. of r (JD)", value: "first_magpsf_r" },
				{ text: "Last det. of r (JD)", value: "last_magpsf_r" },
				{
					value: null,
					text: "-- Dates --",
					disabled: true
				},
				{ text: "First julian dates", value: "firstjd" },
				{ text: "Last julian dates", value: "lastjd" },
				{ text: "Delta julian dates", value: "deltajd" }
			],
		}
	},
	methods:{
		plot(){
			if(this.selectedClass == null || this.selectedClassifier == null){
				this.selectedClass = null;
				this.selectedClassifier = null;
			}
			let payload = {
				xAxis: this.selectedX,
				yAxis: this.selectedY,
				classs: this.selectedClass,
				classifier: this.selectedClassifier,
				query_parameters: this.$store.state.search.query_parameters,
				type: this.type
			}
			if(this.type === "overview"){
				payload.query_parameters = {}
				this.$store.dispatch('queryScatter', payload);
			}
			else if (this.type === "query"){
				this.$store.dispatch('queryScatter', payload);
			}
		}
	},
	computed:{
		classOptions(){
			let aux = this.$store.state.search.classes.slice(3)
			aux.unshift({text: "All", value: null})
			return aux;
		},
		classifierOptions(){
			let aux = this.$store.state.search.classifiers.slice(2)
			aux.unshift({text: "All", value: null})
			return aux;
		},
		optionsX(){
			return this.options
		},
		optionsY(){
			return this.options
		}
	},
	watch: {
		selectedClass(val){
			if(val == null){
				this.selectedClassifier = null
			}
		},
		selectedClassifier(val){
			if(val == null){
				this.selectedClass = null
			}
		}
	},
}
</script>
