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
              '<span style="font-size: 13px">Modified julian date :' +
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
        xAxis: {
          name: "Dates",
          categories: [],
          title: {
            text: "Modified julian dates"
          }
        },
        yAxis: {
          title: {
            text: "Magnitude"
          },
          type: "linear",
          reversed: true,
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
            data: []
          },
          {
            name: "g magnitude error",
            type: "errorbar",
            color: "#0a9900",
            enableMouseTracking: false,
            data: []
          }
        ]
      }
    };
  },

  methods: {
    processLightCurveData: function(alerts) {
      this.chartOptions.series.forEach(element => {
        element.data = [];
      });
      this.chartOptions.xAxis.categories = [];
      alerts.forEach(dataItem => {
        this.chartOptions.xAxis.categories.push(dataItem.jd.toFixed(3));
        this.chartOptions.series.find(item => item.name === 'r magnitude').data.push(dataItem.magr);
        this.chartOptions.series.find(item => item.name === 'g magnitude').data.push(dataItem.magg);
        let magg_error = [null, null];
        if (dataItem.magg != null) {
          magg_error = [dataItem.magg - 0.1, dataItem.magg + 0.1];
        }
        this.chartOptions.series.find(item => item.name === 'g magnitude error').data.push(magg_error);

        let magr_error = [null, null];
        if (dataItem.magr) {
          magr_error = [dataItem.magr - 0.1, dataItem.magr + 0.1];
        }
        this.chartOptions.series.find(item => item.name === 'r magnitude error').data.push(magr_error);
      });
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