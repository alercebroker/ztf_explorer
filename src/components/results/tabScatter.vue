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
			<b-col cols="2" class="pl-0">
				<b-button variant="primary" @click="plot" :disabled="$store.state.loadingPlot">{{$store.state.loadingPlot ? "Loading" : "Plot"}}</b-button>
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
			selectedX: null,
			selectedY: null,
			selectedClass: null,
			selectedClassifier: null,
			options: [
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
			if(this.type === "overview"){
				this.$store.dispatch('getOverviewScatter', payload);
			}
			else if (this.type === "query"){
				this.$store.dispatch('getQueryScatter', payload);
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
			return [{ text: "xAxis", value: null, disabled: true }].concat(this.options)
		},
		optionsY(){
			return [{ text: "yAxis", value: null, disabled: true }].concat(this.options)
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
