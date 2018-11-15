<template>
    <div>
      <b-row mt="5">
        <b-col md="4">
          <searchOptions :params.sync="params" :loading="loading"/>
        </b-col>
        <b-col md="8">
          <tabResult :loading.sync="loading" :params="params"/>
        </b-col>
      </b-row>
    </div>
</template>

<script>
import searchOptions from './searchOptions.vue'
import tabResult from './tabResult.vue'
export default {
    name: 'exploreData',
    props: {

    },
    components: {
        searchOptions,
        tabResult
    },
    data(){
        return  {
            params : {},
            loading : false,
        }
    },
    methods: {
        update(value) {
            alert("ble");
            console.log(value);
            this.params = value;
        }

    }
}
</script>
