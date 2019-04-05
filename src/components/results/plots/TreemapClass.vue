<template>

  <b-container>
    <div class="align-middle">
      <h2>ksñlajkhjdas {{ classifier}}</h2>
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
    },
    series: [{
        type: 'treemap',
        layoutAlgorithm: 'squarified',
        data: [{
            name: 'A',
            value: 6,
            colorValue: 1
        }, {
            name: 'B',
            value: 6,
            colorValue: 2
        }, {
            name: 'C',
            value: 4,
            colorValue: 3
        }, {
            name: 'D',
            value: 3,
            colorValue: 4
        }, {
            name: 'E',
            value: 2,
            colorValue: 5
        }, {
            name: 'F',
            value: 2,
            colorValue: 6
        }, {
            name: 'G',
            value: 1,
            colorValue: 7
        }]
    }],
    title: {
        text: 'Highcharts Treemap'
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
