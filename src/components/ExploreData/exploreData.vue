<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="4">
        <searchOptions :params.sync="params" :currentQueryParent.sync="query" :loading="loading"/>
      </b-col>
      <b-col cols="8">
        <tabResult :loading2.sync="loading2" :loading.sync="loading" :params="params" :query_sql="query"/>
      </b-col>
      <loading :show="loading" label="Downloading..."></loading>
      <loading :show="loading2" label="Searching..."></loading>
    </b-row>
  </div>
</template>

<script>
import searchOptions from "./searchOptions.vue";
import tabResult from "./tabResult.vue";
import loading from "vue-full-loading";
export default {
  name: "exploreData",
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
        loading2: false
    };
  },
  methods: {
    update(value) {
      this.params = value;
    }
  }
};
</script>
