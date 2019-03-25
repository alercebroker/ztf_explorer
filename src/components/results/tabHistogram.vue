<template>
  <b-card title="Histogram">
    <b-row align-v="center">
      <b-col cols="8">
        <b-form-group label="xAxis" label-for="yAxis">
          <b-form-select v-model="selected" :options="options" id="yAxis"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col cols="4">
        <b-button variant="primary" @click="plot" :disabled="$store.state.loadingPlot">{{$store.state.loadingPlot ? "Loading" : "Plot"}}</b-button>
      </b-col>
    </b-row>
    <histogram :type="type" :xAxis="selected"/>
  </b-card>
</template>

<script>
import histogram from "./histogram.vue";

export default {
  name: "tabHistogram",
  components: {
    histogram
  },
  props:["type"],
  data() {
    return {
      buttonText: "Plot",
      selected: null,
      options: [
        { value: null, text: "Please select a variable", disabled: true },
        {
          value: null,
          text: "-- Magnitude  Band G --",
          disabled: true
        },
        { text: "Maxg", value: "maxg" },
        { text: "Ming", value: "ming" },
        { text: "Meang", value: "meang" },
        //{ text: "Slopeg", value: "slopeg" },
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
        //{ text: "Sloper", value: "sloper" },
        { text: "Firstmagr", value: "firstmagr" },
        { text: "Lastmagr", value: "lastmagr" },
        {
          value: null,
          text: "-- Dates --",
          disabled: true
        },
        { text: "FirstJd", value: "firstjd" },
        { text: "LastJd", value: "lastjd" },
        { text: "DeltaJd", value: "deltajd" }
      ]
    };
  },
  methods: {
    plot(){
      if(this.type === "overview"){
        this.$store.dispatch('getOverviewHistogram', this.selected);
      }
      else if(this.type === "query"){
        this.$store.dispatch('getQueryHistogram', this.selected);
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
