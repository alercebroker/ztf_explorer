<template>
  <b-card>
    <b-row align-v="center">
      <b-col cols="5" class="pr-0"><h4>Histogram</h4></b-col>
      <b-col cols="4" class="pl-0">
        <b-form-select v-model="selected" :options="options" id="yAxis"></b-form-select>
      </b-col>
      <b-col cols="3" class="pl-0 mb-2">
        <b-button variant="primary" @click="plot" :disabled="$store.state.loadingPlot">{{$store.state.loadingPlot ? "Loading" : "Plot"}}</b-button>
      </b-col>
    </b-row>
    <histogram :type="type" :xAxis="selected"/>
  </b-card>
</template>

<script>
import histogram from "../plots/histogram";

export default {
  name: "card-histogram",
  components: {
    histogram
  },
  props:["type"],
  data() {
    return {
      buttonText: "Plot",
      selected: "mean_magpsf_g",
      options: [
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
      ]
    };
  },
  methods: {
    plot(){
      if(this.type === "overview"){
        this.$store.dispatch('queryHistogram', {query_parameters: {}, xAxis: this.selected, type: this.type});
      }
      else if(this.type === "query"){
        this.$store.dispatch('queryHistogram', {query_parameters:this.$store.state.search.query_parameters, xAxis: this.selected, type: this.type});
      }
    }
  },
  computed:{
    
  },
  watch: {
    /**
     * update plot values when selected axis change by user
     */
    selected: function() {
      // watch it
      
    },
  }
};
</script>
