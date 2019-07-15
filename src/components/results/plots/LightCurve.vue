<template>
    
      <v-chart :options="scatter"/>
    
</template>

<script>
export default {
  name: "lightcurvePlot",
  computed: {
    gband() {
      return this.$store.state.results.objectDetails.detections.filter(function(x) {return x.fid == 1} )
    },
    rband() {
      return this.$store.state.results.objectDetails.detections.filter(function(x) {return x.fid == 2} )
    },
    scatter() {
      return {
        xAxis: {
          name: "Modified Julian Dates",
          min: 'dataMin',
          max: 'dataMax',
          scale: true,
          splitNumber: 15
        },
        yAxis: {
          name: "Magnitude",
          type: 'value',
          scale: true,
          inverse: true,
        },
        series: [
          {
            name: "r magnitude",
            data: this.rband.map(function(x) { return [x.mjd, x.magpsf_corr]}),
            type: 'scatter',
            scale: true,
            color: "#ff0000",
            symbolSize: 7
          },
          {
            name: "g magnitude",
            data: this.gband.map(function(x) { return [x.mjd, x.magpsf_corr]}),
            type: 'scatter',
            scale: true,
            color: "#22d100",
            symbolSize: 7
          }
        ]
      }
    }
  }
}
</script>
<style scoped>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>