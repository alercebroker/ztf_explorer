<template>
    <v-chart :options="scatter" autoresize/>
</template>

<script>
export default {
  name: "lightcurveFoldedPlot",
  data(){
    return {
      scatter: {
        grid: {
          left: "7%",
          right: "5%" 
        },
        title: {
          text: "Light Curve",
          left: "center",
          textStyle: {
            fontWeight: "lighter"
          }
        },
        legend: {
          data: ['g', 'r'],
          bottom: 0
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
            var rowTable = (col1, col2, col3) => "<tr> <td>" + col1 + "</td> <td>" + col2 + "</td> <td>" + col3 + "</td> </tr>"
            var calendarIcon = color => "<i class='material-icons' style='font-size:13px;color:" + color +";'>graphic_eq</i>"
            let serie = params[0].seriesName
            let table = "<table> <tr> <th></th> <th></th> <th></th></tr>"
            if(serie == "r" || serie == "g") {
              let mag = params[0].value[1].toFixed(3)
              let err = params[0].value[3].toFixed(3)
              table += rowTable("", "candid: ", params[0].value[2])              
              table += rowTable(colorSpan(params[0].color), params[0].seriesName + ": ", mag + "±" + err)
              table += rowTable(calendarIcon(params[0].color), "Phase: ", params[0].value[0])
              return table + "</table>";
            }
          }
        },
        axisPointer: {
            link: {xAxisIndex: 'all'},
            label: {
                backgroundColor: '#777'
            }
        },
        xAxis: {
          name: "Phase",
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
          splitLine: {
            show: false,
          },
          inverse: true,
          nameTextStyle: {
            padding: 30
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
            name: "g",
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
            name: "r",
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
            name: "g",
            data: [],
            type: 'custom',
            scale: true,
            color: "#22d100",
            renderItem: this.renderError,
          },
          {
            name: "r",
            data: [],
            type: 'custom',
            scale: true,
            color: "#ff0000",
            renderItem: this.renderError,
          }
        ]
      }
    }
  },
  mounted(){
      if(this.alerts && this.period) this.makegraph(this.alerts, this.period);
  },
  methods:{
    makegraph(alerts, period) {
        let gbandError = [];
        let rbandError = [];
        this.scatter.series[0].data = alerts.detections.filter(function(x) {return x.fid == 1} ).map(
            function(x) 
            {
                let phase = (x.mjd % period.periodls_1)/period.periodls_1;
                gbandError.push([phase, x.magpsf_corr-x.sigmapsf, x.magpsf_corr+x.sigmapsf])
                return [phase, x.magpsf_corr, x.candid_str, x.sigmapsf];
            });
        this.scatter.series[1].data = alerts.detections.filter(function(x) {return x.fid == 2} ).map(
            function(x) 
            {
                let phase = (x.mjd % period.periodls_2)/ period.periodls_2;
                rbandError.push([phase, x.magpsf_corr-x.sigmapsf, x.magpsf_corr+x.sigmapsf])
                return [phase, x.magpsf_corr, x.candid_str, x.sigmapsf];
            });
        this.scatter.series[2].data = gbandError;
        this.scatter.series[3].data = rbandError;
        this.scatter.title.subtext = "Period: " + this.$store.state.results.objectDetails.period.periodls_1.toFixed(3) +" days"
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
                  x1: halfWidth, y1: highPoint[1],
                  x2: halfWidth, y2: highPoint[1]
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
                  x1: halfWidth, y1: lowPoint[1],
                  x2: halfWidth, y2: lowPoint[1]
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
    period() {
        return this.$store.state.results.objectDetails.period;
    }
  },
  watch: {
    alerts(newval) {
      this.makegraph();
    },
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
