<template>
  <div class="container-fluid">
    <b-row>
      <b-col cols="4">
        <search-options :loading="$store.state.loading"/>
      </b-col>
      <b-col cols="8">
        <result-panel :loading.sync="$store.state.loading" :downloading.sync="$store.state.downloading"/>
      </b-col>
      <loading :show="$store.state.downloading" label="Downloading..."></loading>
      <loading :show="$store.state.loading" label="Searching..."></loading>
    </b-row>
  </div>
</template>

<script>
import searchOptions from '../components/search/searchOptions.vue';
import resultPanel from "../components/results/resultPanel.vue";
import loading from "vue-full-loading";

/**This component connect searchOption and tabResult
 * call component loading when variable loading or dowloading is true
 */
export default {
  name: "ExploreData",
  props: {},
  components: {
    searchOptions,
    resultPanel,
    loading
  },
};
</script>
