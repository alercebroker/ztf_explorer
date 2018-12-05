<template>
  <div>
    <b-row align-h="center">
      <lightCurve
        ref="lightCurve"
        :jdates="jdates"
        :magrs="magrs"
        :magrErrors="magrErrors"
        :maggs="maggs"
        :maggErrors="maggErrors"
      ></lightCurve>
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
      magrs: [],
      maggs: [],
      magrErrors: [],
      maggErrors: [],
      jdates: []
    };
  },
  methods: {
    processLightCurveData: function() {
      // Iterate through data and create four lists
      this.magrs = [];
      this.maggs = [];
      this.magrErrors = [];
      this.maggErrors = [];
      this.jdates = [];

      this.alerts.forEach(dataItem => {
        this.jdates.push(dataItem.jd);
        this.magrs.push(dataItem.magr);
        this.maggs.push(dataItem.magg);

        let magg_error = [null, null];
        if (dataItem.magg != null) {
          magg_error = [dataItem.magg - 0.1, dataItem.magg + 0.1];
        }
        this.maggErrors.push(magg_error);

        let magr_error = [null, null];
        if (dataItem.magr) {
          magr_error = [dataItem.magr - 0.1, dataItem.magr + 0.1];
        }
        this.magrErrors.push(magr_error);
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
  }
};
</script>

<style scoped>
</style>