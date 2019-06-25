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

      setXmatch(){
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
      },
      setValues(probabilities, classifier){
        let categories = []
        let series = []
        Object.keys(probabilities).forEach(key => {
          if(Object.keys(probabilities[key]).length > 0){
            series.push({name:key, data:[]})
            Object.keys(probabilities[key]).forEach(function(x){
              if(x.endsWith("_prob")){
                let name = x.split("_")[0]
                categories.push(name)
              }
            })
          }
        })
        this.lineOptions.xAxis.categories = categories
        let i = 0
        Object.keys(probabilities).forEach(key => {
          let data = []
          let size = categories.length
          while(size--) data[size] = null;
          if(Object.keys(probabilities[key]).length > 0){
            Object.keys(probabilities[key]).forEach(function(x){
              if(x.endsWith("_prob")){
                data[i] = probabilities[key][x]
                i++
              }
            })
          }
          this.lineOptions.series.push({name: key, data:data})
        })
        setXmatch()
      }
    },
    computed: {
      probabilities(){
        let test = this.$store.state.results.objectDetails.probabilities;
        test.random_forest["SNe_prob"] = 0.2
        test.random_forest["EB_prob"] = 0.3
        test.random_forest["Other_prob"] = 0.7
        return test//this.$store.state.results.objectDetails.probabilities;
      }
    },
    watch: {
      probabilities(prob){
        this.setValues(prob)
      }
    },
    mounted(){
      if(this.probabilities){
        this.setValues(this.probabilities)
      }
    }
}
</script>

<style scoped>

</style>
