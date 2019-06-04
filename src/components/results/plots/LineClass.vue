<template>

  <b-container>
    <div class="align-middle">
      <highcharts :options="lineOptions"></highcharts>
    </div>
  </b-container>

</template>

<script>
  export default  {
    name: 'lineclass',
    props: [],
    mounted() {
      this.getValues();
    },
    data() {
      return {
        lineOptions: {
          chart: {
            type: 'spline',
            height: 250
          },
          title: {
            text: 'Classification'
          },
          xAxis: {
            categories: []
          },
          yAxis: {
            max: 100,
            title: {
              text: 'Probability (%)'
            }
          },
          tooltip: {
            shared: true,
            crosshairs: true
          },
          exporting: {
            enabled: false,
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true,
                format: "{y:.1f} %"
              },
            enableMouseTracking: true
            }
          },
          series: []
        }
      }
    },
    methods: {
      getValues: function(){
        var keys = Object.keys(this.$store.state.results.objectDetails.probabilities[0]);
        var datas = this.$store.state.results.objectDetails.probabilities[0];
        var categories = []
        var rf = []
        var rnn = []
        keys.forEach(function(x){
          if(x.endsWith("_prob"))
          {
            let name = x.split("_")[0]
            categories.push(name)
            rf.push(datas[x].toFixed(4)*100)
          }
        })
        this.lineOptions.xAxis.categories = categories;
        this.lineOptions.series.push({name: "RF", data: rf})
      }
    },
    computed: {

    }
}
</script>

<style scoped>

</style>
