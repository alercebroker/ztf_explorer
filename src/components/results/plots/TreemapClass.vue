<template>

  <b-container>
    <div class="align-middle">
      <highcharts :options="treemapOptions"></highcharts>
    </div>
  </b-container>

</template>

<script>
  export default  {
    name: 'treemapclass',
    props: {classifier: Number},
    mounted() {

    },
    data() {
      return {
        treemapOptions: {
          colorAxis: {
            minColor: '#FFFFFF',
            maxColor: '#0779D8'
          },
          series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            data: []
          }],
          title: {
            text: 'Treemap of classifier ' + this.classifier.toString()
          }
        }
      }
    },
    mounted(){
      this.treemapOptions.series[0].data = this.data;
    },
    methods: {
      dataFormat(data){
            var fdata = []
            for(var i in data){
                var key = i;
                var val = data[i];
                fdata.push({name: key, value: val, colorValue: val});
            }
            return fdata;
        }
    },
    computed: {
      data(){
        return this.dataFormat(this.$store.state.results.class_counts);
      }
    }
}
</script>

<style scoped>
</style>
