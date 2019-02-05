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
          text: "Light Curve "
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
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          floating: true,
          x: -10,
          y: -5
          // backgroundColor: '#FFFFFF'
        },
        plotOptions: {
          shared: true,
          crosshairs: true,
          enableMouseTracking: true,
          series: {
            cursor: "pointer",
            point: {
              events: {
                click: function(e) {
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
                }
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
            // linkedTo: 'rmag',
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
      this.chartOptions.series.forEach(element => {
        element.data = [];
      });
      alerts.forEach(dataItem => {
        this.chartOptions.series.find(item => item.name === 'r magnitude').data.push([dataItem.jd, dataItem.magr]);
        this.chartOptions.series.find(item => item.name === 'g magnitude').data.push([dataItem.jd, dataItem.magg]);
        let magg_error = [null, null];
        if (dataItem.magg != null) {
          magg_error = [dataItem.jd, dataItem.magg - 0.1, dataItem.magg + 0.1];
        }
        this.chartOptions.series.find(item => item.name === 'g magnitude error').data.push(magg_error);

        let magr_error = [null, null];
        if (dataItem.magr) {
          magr_error = [dataItem.jd, dataItem.magr - 0.1, dataItem.magr + 0.1];
        }
        this.chartOptions.series.find(item => item.name === 'r magnitude error').data.push(magr_error);
      });
      let firstData = this.$store.state.results.objectDetails.alerts.map(function(x){return x.jd;})[0]
      this.chartOptions.series[0].pointStart = firstData;
      this.chartOptions.series[1].pointStart = firstData;
      this.chartOptions.series[2].pointStart = firstData;
      this.chartOptions.series[3].pointStart = firstData;
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
  }
};
</script>

<style scoped>
</style>