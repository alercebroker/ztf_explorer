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
            max: 1,
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
                
              },
            enableMouseTracking: true
            }
          },
          series: []
        }
      }
    },
    methods: {
      getClass(obj, classifier){
        return this.$store.state.search.classes.find(function(x){
          if(x.value == obj[classifier]){
            return x;
          }
        }).text;
      },
      getValues(probabilities){
        var keys = Object.keys(probabilities);
        var categories = []
        var rf = []
        keys.forEach(function(x){
          if(x.endsWith("_prob"))
          {
            let name = x.split("_")[0]
            categories.push(name)
            rf.push(probabilities[x])
          }
        })
        this.lineOptions.xAxis.categories = categories;
        this.lineOptions.series.push({name: "RF", data: rf})
        if(this.$store.state.results.selectedObject.classxmatch)
        {
          var classxmatch = this.getClass(this.$store.state.results.selectedObject, "classxmatch").toLowerCase();
          this.lineOptions.xAxis.plotLines = [{
            value: categories.indexOf(classxmatch),
            dashStyle: 'dash',
            width: 1,
            color: '#d33',
            label: {
              text: 'XMATCH',
              style: {
                color: 'gray'
              }
            }
          }]
        }

      }
    },
    computed: {
      probabilities(){
        return this.$store.state.results.objectDetails.probabilities;
      }
    },
    watch: {
      probabilities(prob){
        this.getValues(prob);
      }
    },
    mounted(){
      if(this.probabilities){
        this.getValues(this.probabilities)
      }
    }
}
</script>

<style scoped>

</style>
