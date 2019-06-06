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
              '<span style="font-size: 13px">Phase: ' +
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
                return "Phase";
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
          title: {
            text: "Phase"
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
    processLightCurveFolded: function(alerts, phases) {
      let rband = [];
      let gband = [];
      let rbandError = [];
      let gbandError = [];
      let it1 = 0
      let it2 = 0
      alerts.forEach(function(item) {
        if(item.fid == 1){
          gband.push([phases[1][it1], item.magpsf_corr]);
          gbandError.push([phases[1][it1], item.magpsf_corr - item.sigmapsf_corr, item.magpsf_corr + item.sigmapsf_corr]);
          it1 += 1
        }
        else if(item.fid == 2) {
          rband.push([phases[2][it2], item.magpsf_corr]);
          rbandError.push([phases[2][it2], item.magpsf_corr - item.sigmapsf_corr, item.magpsf_corr + item.sigmapsf_corr]);
          it2 += 1
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
    },
    phases(){
      return this.$store.state.results.objectDetails.phase;
    }
  },
  watch: {
    alerts(newAlerts){
        if(this.phases) this.processLightCurve(newAlerts);
    },
    phases(newVal){
      if(this.alerts)this.processLightCurveFolded(this.alerts, newVal)
    }
  },
  mounted(){
    if(this.phases && this.alerts) this.processLightCurveFolded(this.alerts, this.phases)
  }
};
</script>

<style scoped>
</style>