<template>

  <b-container>
    <div class="align-middle">
      <highcharts :options="pieOptions"></highcharts>
    </div>
    {{ pieOptions.series.data}}
  </b-container>

</template>

<script>
  export default  {
    name: 'pieclass',
    props: {classifier: Number},
    mounted() {

    },
    data() {
      return {
        pieOptions: {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: "",
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              },
            }
          },
          series: [{
            name: 'Percentage',
            colorByPoint: true,
            data: []
          }]
        }
      }
    },
    mounted(){
      this.getValues()
    },
    methods: {
      getValues: function(){
        var keys = Object.keys(this.$store.state.results.objectDetails.probabilities[this.classifier-1]);
        var datas = this.$store.state.results.objectDetails.probabilities[this.classifier-1];
        var series = []
        keys.forEach(function(x){
          if(x.endsWith("_prob"))
          {
            console.log(x)
            let name = x.split("_")[0]
            let y = datas[x]*100
            series.push({y: y, name: name})
          }
        })
        this.pieOptions.series[0].data = series;
        let selected = this.classifier == 1? "RF":"RNN";
        this.pieOptions.title.text = "Classifier " + selected;
      }
    },
    computed: {
      title: function(){
        return "Classifier" + this.classifier == 1? "RF":"RNN";
      }
    }
}
</script>

<style scoped>
</style>
