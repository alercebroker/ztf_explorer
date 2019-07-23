<template>
  <v-card>
    <div class="curve">
      <lightcurvePlot></lightcurvePlot>
    </div>
  </v-card>
</template>

<script>
import lightcurvePlot from '../plots/LightCurve'
export default {
    name: "card-light-curve",
    components: {
        lightcurvePlot
    },
    data() {
        return {
            selected: 1,
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
