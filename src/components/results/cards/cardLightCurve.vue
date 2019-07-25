<template>
  <v-card >
    <v-container pa-0>
      <v-layout row wrap fill-height>
        <v-flex xs12 d-flex>
          <div class="curve">
            <lightcurvePlot v-if="selected == 'radio-1'"></lightcurvePlot>
            <lightcurveCorrPlot v-else-if="selected == 'radio-2'"></lightcurveCorrPlot>
            <lightcurveFoldedPlot v-else-if="selected == 'radio-3'"></lightcurveFoldedPlot>
          </div>
        </v-flex>
        <v-flex xs8 offset-xs2 fluid>
          <v-radio-group v-model="selected" row ma-0>
            <v-radio label="Difference magnitude" value="radio-1"></v-radio>
            <v-radio label="Apparent magnitude" value="radio-2"></v-radio>
            <v-radio label="Folded" value="radio-3"></v-radio>
          </v-radio-group>
        </v-flex>
      </v-layout>
    </v-container>
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
            selected: "radio-1",
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
