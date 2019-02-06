<template>
  <div class="tabHistogram">
    <b-row align-h="around">
      <b-col cols="6">
        <b-form-group horizontal label="xAxis" label-for="yAxis">
          <b-form-select v-model="selected" :options="options" id="yAxis"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <histogram
        :plotValues="plotValues"
        :xVariable="selected"
      ></histogram>
    </b-row>
  </div>
</template>

<script>
import histogram from "./histogram.vue";

export default {
  name: "tabHistogram",
  components: {
    histogram
  },
  data() {
    return {
      selected: null,
      plotValues: [],
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
    getAxisData: function(axis, obj) {
      var x = axis;
      if (obj != null) {
        if (obj[x] !== undefined) {
          return obj[x];
        }
      }
      return null;
    },
    setPlotValues: function() {
      //erase previous values
      this.plotValues = [];
        //add plot values
      this.objects.forEach(obj => {
        let value = this.getAxisData(this.selected, obj);
        if (value != null) {
          this.plotValues.push({
            oid: obj.oid,
            pair: Number(value.toFixed(5))
          });
        }
      });
    }
  },
  computed:{
    objects(){
      return this.$store.state.search.objects;
    }
  },
  watch: {
    /**
     * update plot values when selected axis change by user
     */
    selected: function() {
      // watch it
      this.setPlotValues();
    },
    /**
		 * update plot values when new search is executed
		 */
		objects(){
			if(this.selected)this.setPlotValues();
		}
  }
};
</script>
