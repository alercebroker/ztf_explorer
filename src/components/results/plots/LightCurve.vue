<template>
    <v-chart :options="scatter"/>
</template>

<script>
export default {
  name: "lightcurvePlot",
  data(){
    return {
      scatter: {
        title: {
          text: "Light Curve",
        },
        legend: {
          data: ['g magnitude', 'r magnitude', 'g non-detections', 'r non-detections'],
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: "cross",
            label: {
                backgroundColor: '#505765'
            }
          },
          formatter: function (params) {
            var colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + color + '"></span>';
            var colorSpanError = color => ' <span style="display:inline-block;margin-right:5px;;margin-left:2px;border-radius:10px;width:6px;height:6px;background-color:' + color + '"></span>';
            let serie = params[0].seriesName
            if(serie == 'r non-detections' || serie == 'g non-detections') {
              return colorSpan(params[0].color) + params[0].seriesName + ": " + params[0].value[1] + "<br>"
            }
            else if(serie = "r magnitude" || serie == "g magnitude") {
              let rez = "candid: " + params[0].value[2] + "<br>"
              rez += colorSpan(params[0].color) + params[0].seriesName + ": " + params[0].value[1] + "<br>"
              rez += colorSpanError(params[0].color) + "error: ±" + (params[1].value[2] - params[0].value[1])
              return rez;
            }
          }
        },
        axisPointer: {
            link: {xAxisIndex: 'all'},
            label: {
                backgroundColor: '#777'
            }
        },
        //ZTF18abakkts
        xAxis: {
          name: "Modified Julian Dates",
          nameLocation: "center",
          scale: true,
          splitLine: {
            show: false,
          },
          nameTextStyle: {
            padding: 7
          }
        },
        yAxis: {
          name: "Magnitude",
          nameLocation: "center",
          type: 'value',
          scale: true,
          inverse: true,
          nameTextStyle: {
            padding: 15
          }
        },
        dataZoom: [
          {
            show: false,
            realtime: true,
          },
          {
            type: 'inside',
            realtime: true,
          }
        ],
        series: [
          {
            name: "g magnitude",
            data: [],
            type: 'scatter',
            scale: true,
            color: "#22d100",
            symbolSize: 6,
            encode: {
              x: 0,
              y: 1
            }
          },
          {
            name: "r magnitude",
            data: [],
            type: 'scatter',
            scale: true,
            color: "#ff0000",
            symbolSize: 6,
            encode: {
              x: 0,
              y: 1
            }
          },
          {
            name: "g magnitude",
            data: [],
            type: 'custom',
            scale: true,
            color: "#22d100",
            renderItem: this.renderError,
          },
          {
            name: "r magnitude",
            data: [],
            type: 'custom',
            scale: true,
            color: "#ff0000",
            renderItem: this.renderError,
          },
          {
            name: "g non-detections",
            data: [],
            type: 'scatter',
            scale: true,
            color: "rgba(0, 255, 0, 0.5)",
            symbolSize: 5,
            symbol: "triangle"
          },
          {
            name: "r non-detections",
            data: [],
            type: 'scatter',
            scale: true,
            color: "rgba(255, 0, 0, 0.5)",
            symbolSize: 5,
            symbol: "triangle"
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
      this.scatter.series[0].data = alerts.detections.filter(function(x) {return x.fid == 1} ).map(function(x) { return [x.mjd, x.magpsf, x.candid_str]})
      this.scatter.series[1].data = alerts.detections.filter(function(x) {return x.fid == 2} ).map(function(x) { return [x.mjd, x.magpsf, x.candid_str]})
      this.scatter.series[2].data = alerts.detections.filter(function(x) {return x.fid == 1} ).map(function(x) { return [x.mjd, x.magpsf-x.sigmapsf, x.magpsf+x.sigmapsf]})
      this.scatter.series[3].data = alerts.detections.filter(function(x) {return x.fid == 2} ).map(function(x) { return [x.mjd, x.magpsf-x.sigmapsf, x.magpsf+x.sigmapsf]})
      this.scatter.series[4].data = alerts.non_detections.filter(function(x) {return x.fid == 1 && x.diffmaglim > 10 }).map(function (x) {return [x.mjd, x.diffmaglim]})
      this.scatter.series[5].data = alerts.non_detections.filter(function(x) {return x.fid == 2 && x.diffmaglim > 10 }).map(function (x) {return [x.mjd, x.diffmaglim]})
    },
    renderError(params, api){
      var xValue = api.value(0);
      var highPoint = api.coord([xValue, api.value(1)]);
      var lowPoint = api.coord([xValue, api.value(2)]);
      var halfWidth = api.size([1, 0])[0] * 0.1;
      var style = api.style({
          stroke: api.visual('color'),
          fill: null
      });
      return {
          type: 'group',
          children: [{
              type: 'line',
              shape: {
                  x1: highPoint[0] - halfWidth, y1: highPoint[1],
                  x2: highPoint[0] + halfWidth, y2: highPoint[1]
              },
              style: style
              }, {
              type: 'line',
              shape: {
                  x1: highPoint[0], y1: highPoint[1],
                  x2: lowPoint[0], y2: lowPoint[1]
              },
              style: style
              }, {
              type: 'line',
              shape: {
                  x1: lowPoint[0] - halfWidth, y1: lowPoint[1],
                  x2: lowPoint[0] + halfWidth, y2: lowPoint[1]
              },
              style: style
          }]
      };
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
<style>
.echarts {
  margin: auto;
  width: 100%;
  height: 100%;
  min-height: 350px;
}
</style>
