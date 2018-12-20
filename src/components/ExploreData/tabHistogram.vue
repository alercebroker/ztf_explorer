<template>
  <div class="tabHistogram">
    <b-row align-h="around">
      <b-col cols="4">
        <b-form-group horizontal label="xAxis" label-for="yAxis">
          <b-form-select v-model="selected" :options="options" id="yAxis"></b-form-select>
        </b-form-group>
      </b-col>
      <!--b-col cols="4">
				<b-form-group horizontal label="nbins" label-for="nbins">
					<b-form-input id="nbins" type="number" v-model="nbins" disabled></b-form-input>
				</b-form-group>
      </b-col-->
      <b-col cols="2">
        <b-button
          variant="secondary"
          alt="Load and add another sample of data"
          v-on:click="loadMore(setPlotValues)"
          :disabled="disabled"
        >More data</b-button>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <histogram
        :plotValues="plotValues"
        :xVariable="selected"
        :nbins="nbins"
        :dataReady="dataReady"
      ></histogram>
    </b-row>
  </div>
</template>

<script>
import histogram from "./histogram.vue";

export default {
  name: "tabHistogram",
  props: [
    "results",
    "currentQueryParent",
    "pageNumber",
    "getMoreObjects",
    "loadMore"
  ],
  components: {
    histogram
  },
  data() {
    return {
      dataReady: false,
      currentQuery: this.currentQueryParent,
      nbins: 10,
      selected: null,
      plotValues: [],
      options: [
        { value: null, text: "Please select a variable" },
        {
          value: null,
          text: "-- Magnitude  Band G --",
          disabled: true
        },
        { text: "Maxg", value: "maxg" },
        { text: "Ming", value: "ming" },
        { text: "Meang", value: "meang" },
        { text: "Slopeg", value: "slopeg" },
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
        { text: "Sloper", value: "sloper" },
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
      this.dataReady = false;
      //add plot values
      this.results.data.result.forEach(obj => {
        let value = this.getAxisData(this.selected, obj);

        if (value != null) {
          this.plotValues.push({
            oid: obj.oid,
            pair: Number(value.toFixed(5))
          });
        }
      });
      this.dataReady = true;
    }
  },
  computed: {
    /**
     * check if axis is selected
     * @returns {boolean}
     */
    disabled() {
      return this.selected == null;
    }
  },
  watch: {
    /**
     * update plot values when selected axis change by user
     */
    selected: function() {
      // watch it
      this.setPlotValues();
    }
  }
};
</script>
