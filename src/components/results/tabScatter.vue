<template>
	<b-card title="Scatter">
		<b-row align-v="center">
			<b-col cols="6">
				<b-form-group label="xAxis" label-for="xAxis">
					<b-form-select v-model="selectedX" :options="options" id="xAxis"></b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="6">
				<b-form-group label="yAxis" label-for="yAxis">
					<b-form-select v-model="selectedY" :options="options" id="yAxis"></b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="6">
				<b-form-group label="Class" label-for="class">
					<b-form-select v-model="selectedClass" :options="classOptions" id="class"></b-form-select>
				</b-form-group>
			</b-col>
			<b-col cols="6">
				<b-form-group label="Classifier" label-for="classifier">
					<b-form-select v-model="selectedClassifier" :options="$store.state.search.classifiers" id="class"></b-form-select>
				</b-form-group>
			</b-col>
		</b-row>
		<b-row align-h="around">
			<b-button variant="primary" @click="plot" :disabled="$store.state.loadingPlot">{{$store.state.loadingPlot ? "Loading" : "Plot"}}</b-button>
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
			selectedX: null,
			selectedY: null,
			selectedClass: null,
			selectedClassifier: null,
			options: [
				{ value: null, text: "Please select a variable" },
				{ text: "Nr. Alerts", value: "nobs" },
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
		plot(){
			if(this.selectedClass == null || this.selectedClassifier == null){
				this.selectedClass = null;
				this.selectedClassifier = null;
			}
			let payload = {
				"x-axis": this.selectedX,
				"y-axis": this.selectedY,
				"class": this.selectedClass,
				"classifier": this.selectedClassifier
			}
			this.$store.dispatch('getOverviewScatter', payload);
		}
	},
	computed:{
		classOptions(){
			let aux = this.$store.state.search.classes.slice(3)
			aux.unshift({text: "All", value: null})
			return aux;
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
