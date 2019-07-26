<template>
  <v-card >
      <v-layout row wrap fill-height>
        <v-flex xs12 d-flex>
          <div class="curve">
            <lightcurvePlot v-if="selected == 0"></lightcurvePlot>
            <lightcurveCorrPlot v-else-if="selected == 1"></lightcurveCorrPlot>
            <lightcurveFoldedPlot v-else-if="selected == 2"></lightcurveFoldedPlot>
          </div>
        </v-flex>
        <v-flex xs8 offset-xs2 fluid>
          <v-radio-group v-model="selected" row ma-0>
            <v-radio v-for='(option, index) in options' :key="index" :label="option" :value="index"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
  </v-card>
</template>

<script>
import lightcurvePlot from '../plots/LightCurve'
import lightcurveCorrPlot from '../plots/LightCurveCorr'
import lightcurveFoldedPlot from '../plots/LightCurveFolded'
export default {
    name: "card-light-curve",
    components: {
        lightcurvePlot,
        lightcurveCorrPlot,
        lightcurveFoldedPlot
    },
    data() {
        return {
            selected: 0,
        };
    },
    computed: {
        options() {
            return this.$store.state.results.objectDetails.period.periodls_1
                ? ["Difference Magnitude", "Apparent Magnitude", "Folded"]
                : ["Difference Magnitude", "Apparent Magnitude"];
        }
    }
};
</script>
<style>
.curve {
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
