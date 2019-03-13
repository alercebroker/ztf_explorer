<template>
  <highcharts class="histogram" :options="chartOptions" style="width:100%;height:10%;"></highcharts>
</template>

<script>
export default {
  name: "histogram",
  props: ["plotValues", "xVariable"],
  data() {
    return {
      bins: 0,
      chartOptions: {
        title: {
          text: ""
        },
        xAxis: [
          {
            title: { text: "" },
            alignTicks: false
          },
          {
            title: { text: "Please select a variable for xAxis" },
            alignTicks: false,
            opposite: false
          }
        ],

        yAxis: [
          {
            title: { text: "" }
          },
          {
            title: { text: "Number of Objects" },
            opposite: false
          }
        ],

        legend: {
          enabled: false
        },
        plotOptions: {
          histogram: {
            color: "rgba(255,255,255,0.00)"
          }
        },
        series: [
          {
            name: "Number of objects",
            type: "histogram",
            xAxis: 1,
            yAxis: 1,
            baseSeries: 1,
          },
          {
            data: [1],
            visible: false
          }
        ],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500,
              maxHeight:500
            },
            chartOptions: {
              legend: {
                enabled: false
              }
            }
          }]
        }
      }
    };
  },
  methods: {
    redraw() {
      //add a series for object
      // delete the previous series
      this.chartOptions.series[1].data = [];
      this.chartOptions.series[0].color = "#3C347E";
      //this.chartOptions.series[0].name = this.chartOptions.xAxis[1].title.text;

      // add new series
      this.plotValues.forEach(obj => {
        this.chartOptions.series[1].data.push(obj.pair);
      });
    }
  },

  watch: {
    xVariable: function(newVal) {
      // if xVariable change
      this.chartOptions.xAxis[1].title.text = newVal;
      this.redraw();
    },
    plotValues: function(newVal) {
      // if plotValues change
      if (newVal) {
        this.redraw();
      }
    }
  }
};
</script>