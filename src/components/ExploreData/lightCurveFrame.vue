<template>
  <div>
    <b-row align-h="center">
      <lightCurve ref="lightCurve" :chartData="chartData"></lightCurve>
    </b-row>
  </div>
</template>

<script>
import lightCurve from "./lightCurve.vue";

export default {
  name: "lightCurveFrame",
  props: ["alerts"],
  components: {
    lightCurve: lightCurve
  },
  data() {
    return {
      chartData: {
        magrs: [],
        maggs: [],
        magrErrors: [],
        maggErrors: [],
        jdates: []
      }
    };
  },
  methods: {
    processLightCurveData: function() {
      // Iterate through data and create four lists
      this.chartData.magrs = [];
      this.chartData.maggs = [];
      this.chartData.magrErrors = [];
      this.chartData.maggErrors = [];
      this.chartData.jdates = [];

      this.alerts.forEach(dataItem => {
        this.chartData.jdates.push(dataItem.jd);
        this.chartData.magrs.push(dataItem.magr);
        this.chartData.maggs.push(dataItem.magg);

        let magg_error = [null, null];
        if (dataItem.magg != null) {
          magg_error = [dataItem.magg - 0.1, dataItem.magg + 0.1];
        }
        this.chartData.maggErrors.push(magg_error);

        let magr_error = [null, null];
        if (dataItem.magr) {
          magr_error = [dataItem.magr - 0.1, dataItem.magr + 0.1];
        }
        this.chartData.magrErrors.push(magr_error);
      });

      // this.data = [magrs, maggs, magrErrors, maggErrors, jdates]
      //   this.magrs = magrs;
      //   this.maggs = maggs;
      //   this.magrErrors = magrErrors;
      //   this.maggErrors = maggErrors;
      //   this.jdates = jdates;
    },
    redrawLightCurveChart: function() {
      this.processLightCurveData();

      this.$refs.lightCurve.redraw();
    }
  },
  watch: {
    alerts() {
      this.redrawLightCurveChart();
    }
  }
};
</script>

<style scoped>
</style>