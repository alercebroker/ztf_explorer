<template>

  <b-container>
    <div v-if="classCounts" class="align-middle">
      <highcharts :options="treemapOptions"></highcharts>
    </div>
    <div v-else>
      <div class="overlay">
        <atom-spinner :animation-duration="2000" :size="200" color="#0779D8"/> 
      </div>
    </div>
  </b-container>

</template>

<script>
  import {AtomSpinner} from 'epic-spinners';
  export default  {
    name: 'treemapclass',
    props: {classifier: String},
    components: {
      AtomSpinner
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
            text: ""
          },
          exporting: {
            enabled: false,
          },
        },
      }
    },
    mounted(){
      this.treemapOptions.title.text = 'Treemap of classifier ' + this.selected();
      this.$store.dispatch('getClassCounts');
    },
    methods: {
      dataFormat(data){
        if(!data)
          return null
        var fdata = []
        for(let c in data[this.classifier]){
          var key = c;
          var val = data[this.classifier][c];
          fdata.push({name: key, value: val, colorValue: val});
        }
        this.treemapOptions.series[0].data = fdata;
        return fdata;
      },
      selected(){
        if(this.classifier == "xmatch")
          return "XMATCH"
        else if(this.classifier == "rf")
          return "Random Forest"
        else
          return "Recurrent Neural Net"
      }
    },
    computed: {
      classCounts(){
        return this.$store.state.results.class_counts;
      },
    },
    watch:{
      classCounts(newVal){
        return this.dataFormat(newVal)
      }
    }
}
</script>
