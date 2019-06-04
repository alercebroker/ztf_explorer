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
          decimalpoint: '.',
          filename: 'ALeRCE_'+this.$store.state.results.selectedObject.oid + '_'+ new Date().toISOString().slice(0,19).replace("T","_"),
          buttons: {
            contextButton: {
                text: 'Export'
            }
          },
          csv: {
            columnHeaderFormatter: function(item, key){
              if (!item || key == null){
                return "MJD";
              }
              else if(key == 'y'){
                return item.options.value[0] == 'r' ? "mag_r" : "mag_g";
              }
              return item.options.value + "_" + key;
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
            value: "e_mag_r",
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
            value: "e_mag_g",
            type: "errorbar",
            color: "#0a9900",
            enableMouseTracking: false,
            data: [],
          },
          {
            name: "r no detections",
            value: "diffmaglim",
            type: "scatter",
            color: "rgba(255, 0, 0, 0.3)",
            data: [],
            marker: {
              symbol: 'triangle-down'
            }
          },
          {
            name: "g no detections",
            value: "diffmaglim",
            type: "scatter",
            color: "rgba(0, 255, 0, 0.3)",
            data: [],
            marker: {
              symbol: 'triangle-down'
            }
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
        if(item.fid == 1)
        {
          gband.push([item.jd, item.magpsf]);
          gbandError.push([item.jd, item.magpsf - item.sigmapsf, item.magpsf + item.sigmapsf]);
        }
        else if(item.fid == 2)
        {
          rband.push([item.jd, item.magpsf]);
          rbandError.push([item.jd, item.magpsf - item.sigmapsf, item.magpsf + item.sigmapsf]);
        }
      })
      this.chartOptions.series[0].data = rband;
      this.chartOptions.series[1].data = rbandError;
      this.chartOptions.series[2].data = gband;
      this.chartOptions.series[3].data = gbandError;
    },
    processLightCurveDataNoDet: function(nodet) {
      var rno_det = [];
      var gno_det = [];
      nodet.forEach(function(item)
      {
        if(item.fid == 1)
          gno_det.push([item.jd, item.diffmaglim]);
        else if(item.fid == 2)
          rno_det.push([item.jd, item.diffmaglim]);
      })
      this.chartOptions.series[4].data = rno_det;
      this.chartOptions.series[5].data = gno_det;
    }
  },
  computed: {
    alerts(){
      return this.$store.state.results.objectDetails.alerts;
    },
    no_detections(){
      return this.$store.state.results.objectDetails.no_detections;
    }
  },
  watch: {
    alerts(newAlerts){
      this.processLightCurveData(newAlerts);
    },
    no_detections(newNoDet){
      this.processLightCurveDataNoDet(newNoDet);
    }
  },
  mounted(){
    if(this.alerts)this.processLightCurveData(this.alerts);
    if(this.no_detections)this.processLightCurveDataNoDet(this.no_detections);
  }
};
</script>

<style scoped>
</style>