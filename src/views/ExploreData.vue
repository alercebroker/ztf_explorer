<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="4">
        <search-options :params.sync="params" :currentQueryParent.sync="query" :loading="loading"/>
      </b-col>
      <b-col cols="8">
        <tabResult :loading.sync="loading" :downloading.sync="downloading" :params="params" :query_sql="query"/>
      </b-col>
      <loading :show="downloading" label="Downloading..."></loading>
      <loading :show="loading" label="Searching..."></loading>
    </b-row>
  </div>
</template>

<script>
import searchOptions from '../components/search/searchOptions.vue';
import tabResult from "../components/results/tabResult.vue";
import loading from "vue-full-loading";
import QueryService from '@/services/QueryService.js';

/**This component connect searchOption and tabResult
 * call component loading when variable loading or dowloading is true
 */
export default {
  name: "ExploreData",
  props: {},
  components: {
    searchOptions,
    tabResult,
    loading
  },
  data() {
    return {
      query: "SELECT * FROM objects",
      params: {},
      loading: false,
      downloading: false,
      interval: null
    };
  },
  methods: {
    update(value) {
      this.params = value;
    },
    // delete this later
    checkStatus(taskId){
      QueryService.checkQueryStatus(taskId).then( result => {
        if(result.data.status === "SUCCESS"){
          clearInterval(this.interval);
          console.log("query success", taskId);
          this.getResults(taskId);
        }
      }).catch(error => {
        console.log("error", error);
      })
    },
    // delete this later
    getResults(taskId){
      QueryService.getPaginatedResult(taskId, 10, 1).then(result => {
        console.log("result data",result.data);
      }).catch(error => {
        console.log("error", error);
      })
    }
  },
  mounted(){
    let queryParams = { 
      query_parameters: {
        filters: {
          oid: "ZTF18abiuthh"
        }
      }
    }
    QueryService.getSQL(queryParams).then(result => {
      console.log("queryparams", queryParams);
      console.log("QUERY SQL", result.data);
    })
    QueryService.executeQuery(queryParams).then( (result) => {
      console.log("sent query", result.data);
      this.interval = setInterval(
            this.checkStatus,
            500,
            result.data["task-id"]
          );
    }).catch((error) => {
      console.log(error);
    });
  }
};
</script>
