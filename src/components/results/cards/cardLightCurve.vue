<template>
  <v-card >
        <v-flex xs12>
          <div class="curve">
            <lightcurvePlot v-if="selected == 0"></lightcurvePlot>
            <lightcurveCorrPlot v-else-if="selected == 1"></lightcurveCorrPlot>
            <lightcurveFoldedPlot v-else-if="selected == 2"></lightcurveFoldedPlot>
          </div>
        </v-flex>
        <v-layout wrap justify-space-around>
            <v-radio-group v-model="selected" row ma-0>
              <v-radio v-for='(option, index) in options' :key="index" :label="option" :value="index"></v-radio>
              <v-btn small outlined  color="green" @click="download"> <v-icon left small>cloud_download</v-icon> Download </v-btn>        
            </v-radio-group>
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
    },
    methods: {
      download () {
        /* https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable */
        let arrayOfJson = this.$store.state.results.objectDetails.detections
        const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
        const header = Object.keys(arrayOfJson[0])
        let csv = arrayOfJson.map(row => header.map(fieldName => 
        JSON.stringify(row[fieldName], replacer)).join(','))
        csv.unshift(header.join(','))
        csv = csv.join('\r\n')
        // Create link and download
        var link = document.createElement('a');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
        let today = new Date().toISOString().replace(":","").replace(":", "").split(".")[0]+"Z"
        let filename = this.$store.state.results.selectedObject.oid + "_" + today + ".csv"
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
