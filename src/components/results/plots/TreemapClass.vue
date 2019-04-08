<template>

  <b-container>
    <div v-if="data" class="align-middle">
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
    props: {classifier: Number},
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
    },
    methods: {
      dataFormat(data){
        if(!data)
          return null
        var fdata = []
        for(var i in data){
          var key = i;
          var val = data[i];
          fdata.push({name: key, value: val, colorValue: val});
        }
        this.treemapOptions.series[0].data = fdata;
        return fdata;
      },
      selected(){
        if(this.classifier == 1)
          return "XMATCH"
        else if(this.classifier == 2)
          return "Random Forest"
        else
          return "Recurrent Neuronal Net"
      }
    },
    computed: {
      data(){
        return this.dataFormat(this.$store.state.results.class_counts);
      },
    }
}
</script>