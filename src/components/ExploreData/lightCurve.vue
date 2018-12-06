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
  name: "lightCurve",
  props: ["chartData"],
  data() {
    return {
      chartOptions: {
        chart: {
          zoomType: "x",
          panning: true,
          panKey: "shift"
        },
        tooltip: {
            formatter: function () {
              var header = '<span style="font-size: 13px">Modified julian date :' + this.x + '</span><br/>'; 
              var footer = '<span style="font-size: 11px; font-weight: bold;">' + this.series.name + ': ' + this.y + '</span>';
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
          type: "linear"
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
            name: "Red magnitude",
            value: "rmag",
            color: "#ff0000",
            type: "scatter",
            data: []
          },
          {
            name: "Red magnitude error",
            type: "errorbar",
            color: "#cc0c00",
            enableMouseTracking: false,
            data: []
          },
          {
            name: "Green magnitude",
            value: "gmag",
            // linkedTo: 'rmag',
            type: "scatter",
            color: "#22d100",
            data: []
          },
          {
            name: "Green magnitude error",
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
    redraw: function() {
      // replace julian dates
      this.chartOptions.xAxis.categories = this.chartData.jdates;

      // delete the previous series
      this.chartOptions.series = [
        {
          name: "Red magnitude",
          value: "rmag",
          color: "#ff0000",
          type: "scatter",
          data: this.chartData.magrs
        },
        {
          name: "Red magnitude error",
          type: "errorbar",
          color: "#cc0c00",
          enableMouseTracking: false,
          data: this.chartData.magrErrors
        },
        {
          name: "Green magnitude",
          value: "gmag",
          // linkedTo: 'rmag',
          type: "scatter",
          color: "#22d100",
          data: this.chartData.maggs
        },
        {
          name: "Green magnitude error",
          type: "errorbar",
          color: "#0a9900",
          enableMouseTracking: false,
          data: this.chartData.maggErrors
        }
      ];
    }
  },
  watch: {
    chartData: {
      handler: function() {
        this.redraw();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
</style>