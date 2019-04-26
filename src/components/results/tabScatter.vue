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
import scatter from "./scatter.vue";
export default {
	name: 'tabScatter',
	props:['type'],
	components: {
		scatter,
	},
	data(){
		return {
			selectedX: "meang",
			selectedY: "meanr",
			selectedClass: null,
			selectedClassifier: null,
			options: [
				{ text: "Detections", value: "nobs" },
				{
					value: null,
					text: "-- Magnitude  Band G --",
					disabled: true
				},
				{ text: "Max of g", value: "maxg" },
				{ text: "Min of g", value: "ming" },
				{ text: "Mean of g", value: "meang" },
				{ text: "First det. of g ", value: "firstmagg" },
				{ text: "Last det. of g", value: "lastmagg" },
				{
					value: null,
					text: "-- Magnitude Band R --",
					disabled: true
				},
				{ text: "Max of r", value: "maxr" },
				{ text: "Min of r", value: "minr" },
				{ text: "Mean of r", value: "meanr" },
				{ text: "First det. of r", value: "firstmagr" },
				{ text: "Last det. of r", value: "lastmagr" },
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
				query_parameters: this.$store.state.search.query_parameters
			}
			if(this.type === "overview"){
				payload.query_parameters = {};
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
