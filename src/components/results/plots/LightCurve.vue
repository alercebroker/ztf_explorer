<template>
    <v-chart :options="scatter"/>
</template>

<script>
export default {
  name: "lightcurvePlot",
  data(){
    return {
      scatter: {
        legend: {
          data: ['g magnitude', 'r magnitude']
        },
        tooltip: {
          trigger: 'axis',
          
          position: function (pt) {
            return [pt[0], '10%'];
            }
        },
        xAxis: {
          name: "Modified Julian Dates",
          min: 'dataMin',
          max: 'dataMax',
          scale: true,
          splitNumber: 15,
          splitLine: {
            show: false,
          }
        },
        yAxis: {
          name: "Magnitude",
          type: 'value',
          scale: true,
          inverse: true,
          splitLine: {
            show: false,
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
          },
          {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
          },
          {
            type: 'inside',
            xAxisIndex: [0],
          },
          {
            type: 'inside',
            yAxisIndex: [0],
          }
        ],
        series: [
          {
            name: "g magnitude",
            data: [],
            type: 'scatter',
            scale: true,
            color: "#ff0000",
            symbolSize: 4
          },
          {
            name: "r magnitude",
            data: [],
            type: 'scatter',
            scale: true,
            color: "#22d100",
            symbolSize: 4
          },
          {
            name: "g magnitude error",
            data: [],
            type: 'candlestick',
            scale: true,
            itemStyle: {
              normal: {
                color: "#ff0000",
                color0: "#ff0000",
                borderColor: null,
                borderColor0: null
              }
            },
          },
          {
            name: "r magnitude error",
            data: [],
            type: 'candlestick',
            scale: true,
            itemStyle: {
              normal: {
                color: "#22d100",
                color0: "#22d100",
                borderColor: null,
                borderColor0: null
              }
            },
          },
        ]
      }
    }
  },
  mounted(){
    if(this.alerts) this.makegraph(this.alerts);
  },
  methods:{
    makegraph(alerts) {
      this.scatter.series[0].data = alerts.detections.filter(function(x) {return x.fid == 1} ).map(function(x) { return [x.mjd, x.magpsf_corr]})
      this.scatter.series[1].data = alerts.detections.filter(function(x) {return x.fid == 2} ).map(function(x) { return [x.mjd, x.magpsf_corr]})
      this.scatter.series[2].data = alerts.detections.filter(function(x) {return x.fid == 1} ).map(function(x) { return [x.mjd, x.magpsf_corr, x.magpsf_corr, x.magpsf_corr-x.sigmapsf_corr, x.magpsf_corr+x.sigmapsf_corr]})
      this.scatter.series[3].data = alerts.detections.filter(function(x) {return x.fid == 2} ).map(function(x) { return [x.mjd, x.magpsf_corr, x.magpsf_corr, x.magpsf_corr-x.sigmapsf_corr, x.magpsf_corr+x.sigmapsf_corr]})
      this.scatter.resize()
    }
  },
  computed: {
    alerts() {
      return this.$store.state.results.objectDetails
    },
  },
  watch: {
    alerts(newval) {
      this.makegraph();
    }
  }
}
</script>
<style scoped>
.echarts {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>