<template>
  <div>
    <b-row>
      <b-col>
        <highcharts :options="chartOptions"></highcharts>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "light-curve",
  data() {
    return {
      chartOptions: {
        chart: {
          zoomType: "x",
          panning: true,
          panKey: "shift"
        },
        tooltip: {
          formatter: function() {
            var header =
              '<span style="font-size: 13px">Modified Julian Date: ' +
              this.x +
              "</span><br/>";
            var footer =
              '<span style="font-size: 11px; font-weight: bold;">' +
              this.series.name +
              ": " +
              this.y +
              "</span>";
            return header + footer;
          },
          crosshairs: [true, false]
        },
        title: {
          text: "Light Curve" 
        },
        exporting: {
          enabled: true,
          filename: 'ALeRCE_'+this.$store.state.results.selectedObject.oid + '_'+ new Date().toLocaleString().replace(", ", "_").replace(" ", "_"),
          buttons: {
            contextButton: {
                text: 'Export'
            }
        }
        }, 
        xAxis: {
          name: "Dates",
          categories: [],
          title: {
            text: "Modified Julian Dates"
          },
        },
        yAxis: {
          title: {
            text: "Magnitude"
          },
          type: "linear",
          reversed: true,
          startOnTick: true
        },
        legend: {
          //layout: "vertical",
          //align: "left",
          //verticalAlign: "top",
          //floating: true,
          //x: -10,
          //y: -5,
        },
        plotOptions: {
          shared: true,
          crosshairs: true,
          enableMouseTracking: true,
          series: {
            cursor: "pointer",
            point: {
              events: {
                //click: function(e) {
                  // hs.htmlExpand(null, {
                  //   pageOrigin: {
                  //     x: e.pageX || e.clientX,
                  //     y: e.pageY || e.clientY
                  //   },
                  //   headingText: this.series.name,
                  //   maincontentText:
                  //     "Modified julian date: " +
                  //     this.chartData.jdates[this.x] +
                  //     "<br/> " +
                  //     this.series.name +
                  //     ": " +√
                  //     this.y +
                  //     "<br/> " +
                  //     "rms error: " +
                  //     0.1,
                  //   width: 250
                  // });
                //}
              }
            },
            marker: {
              lineWidth: 1
            }
          }
        },
        series: [
          {
            name: "r magnitude",
            value: "rmag",
            color: "#ff0000",
            type: "scatter",
            data: []
          },
          {
            name: "r magnitude error",
            type: "errorbar",
            color: "#cc0c00",
            enableMouseTracking: false,
            data: []
          },
          {
            name: "g magnitude",
            value: "gmag",
            type: "scatter",
            color: "#22d100",
            data: [],
          },
          {
            name: "g magnitude error",
            type: "errorbar",
            color: "#0a9900",
            enableMouseTracking: false,
            data: [],
          }
        ]
      },
    };
  },

  methods: {
    processLightCurveData: function(alerts) {
      var rband = [];
      var gband = [];
      var rbandError = [];
      var gbandError = [];
      alerts.forEach(function(item)
      {
        if(item.magg)
        {
          gband.push([item.jd, item.magg]);
          gbandError.push([item.jd, item.magg - item.rmsg, item.magg + item.rmsg]);
        }
        else if(item.magr)
        {
          rband.push([item.jd, item.magr]);
          rbandError.push([item.jd, item.magr - item.rmsr, item.magr + item.rmsr]);
        }
      })
      this.chartOptions.series[0].data = rband;
      this.chartOptions.series[1].data = rbandError;
      this.chartOptions.series[2].data = gband;
      this.chartOptions.series[3].data = gbandError;
    },
  },
  computed: {
    alerts(){
      return this.$store.state.results.objectDetails.alerts;
    }
  },
  watch: {
    alerts(newAlerts){
      this.processLightCurveData(newAlerts);
    }
  },
  mounted(){
    if(this.alerts)this.processLightCurveData(this.alerts);
  }
};
</script>

<style scoped>
</style>