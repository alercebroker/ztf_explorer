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
            data: [{
                name: 'A',
                value: 6,
                colorValue: 6
            }, {
                name: 'B',
                value: 2,
                colorValue: 2
            }, {
                name: 'C',
                value: 3,
                colorValue: 3
            }, {
                name: 'D',
                value: 4,
                colorValue: 4
            }, {
                name: 'E',
                value: 5,
                colorValue: 5
            }, {
                name: 'F',
                value: 15,
                colorValue: 15
            }, {
                name: 'G',
                value: 7,
                colorValue: 7
            }]
          }],
          title: {
            text: 'Treemap of classifier ' + this.classifier.toString()
          }
        }
      }
    },
    mounted(){

    },
    methods: {
      
    },
    computed: {
    }
}
</script>

<style scoped>
</style>
