<template>
  <div>
    <b-card-group>
      <b-card-body>
        <transition name="fade">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Table">
                <tabData
                  :loading.sync="load"
                  :downloading.sync="download"
                  :result="result"
                  :error="error"
                  :query_sql="query_sql"
                  :params="params"
                  :pageNumber.sync="pageNumber"
                  :getMoreObjects="getQueryResults"
                  :taskId="taskId"
                ></tabData>
              </b-tab>
              <b-tab
                title="Histogram"
                v-on:click="reDrawHist"
                :disabled="result.data.length != 0 ? false : true"
              >
                <tabHistogram
                  ref="histogram"
                  :loadMore="loadMore"
                  :results="result"
                  :currentQueryParent="query_sql"
                ></tabHistogram>
              </b-tab>
              <b-tab
                v-on:click="reDrawScat"
                title="Scatter"
                :disabled="result.data.length != 0 ? false : true"
              >
                <tabScatter
                  ref="scatter"
                  :loadMore="loadMore"
                  :result="result"
                  :currentQueryParent="query_sql"
                  :disabled="result.data.status == 200 ? false : true"
                ></tabScatter>
              </b-tab>
              <b-tab title="Spatial Distribution" :disabled="true">
                <tabSpatialDistribution :result="result"></tabSpatialDistribution>
              </b-tab>
            </b-tabs>
          </b-card>
        </transition>
      </b-card-body>
    </b-card-group>
  </div>
</template>

<script>
import tabData from "./tabData.vue";
import tabScatter from "./tabScatter.vue";
import tabHistogram from "./tabHistogram.vue";
import tabSankey from "./tabSankey.vue";
import tabSpatialDistribution from "./tabSpatialDistribution.vue";
export default {
  name: "tabResult",
  props: ["params", "loading", "downloading", "query_sql"],
  components: {
    tabData,
    tabScatter,
    tabHistogram,
    tabSankey,
    tabSpatialDistribution
  },
  data() {
    return {
      download: this.downloading,
      load: this.loading,
      result: {
        data: []
      },
      error: null,
      interval: null,
      numResults: 10,
      pageNumber: 1,
      taskId: null
    };
  },
  methods: {
      /**
       * get data from server
       * @param taskId: task id in server
       * @param fun_update: fun to apply when result is ok
       */
    getQueryResults: function(taskId, fun_update) {
      this.$emit("update:loading", true);
      window.scrollTo(0, 0);
      this.$http
        .post("/v2/paginated_result", {
          "task-id": taskId,
          "page-size": this.numResults,
          "page-number": this.pageNumber
        })
        .then(
          function(results) {
            if (this.result.data.length <= 0) {
              this.result = results;
            } else {
              this.result.data.result = this.result.data.result.concat(
                results.data.result
              );
            }
            if (fun_update) {
              fun_update();
            }
            this.$emit("update:loading", false);
          }.bind(this)
        );
    },
      /**
       * query for next page results
       * @param fun_update: fun to pass getQueryResults
       */
    loadMore: function(fun_update) {
      this.pageNumber = this.pageNumber + 1;
      this.getQueryResults(this.taskId, fun_update);
    },
      /**
       * query ask if task is ready
       * @param task_id
       */
    queryTask: function(task_id) {
      this.$http
        .post("/v2/query_status", {
          "task-id": task_id
        })
        .then(
          function(response) {
            if (response.data.status == "SUCCESS") {
              clearInterval(this.interval);
              this.result = {
                data: []
              };
              this.taskId = task_id;
              this.pageNumber = 1;
              this.getQueryResults(task_id);
            } else if (response.data.status == "TIMEDOUT") {
              clearInterval(this.interval);
              response.status = 504;
              this.result = response;
              this.$emit("update:loading", false);
            } else {
              this.result = result;
              this.$emit("update:loading", false);
            }
          }.bind(this)
        )
        .catch(function(error) {});
    },
      /**
       * Re draw scatter tab
       */
    reDrawScat: function() {
      this.$refs.scatter.setPlotValues();
    },
      /**
       * Re draw Histogram tab
       */
    reDrawHist: function() {
      if (this.$refs.histogram.selected != null) {
        this.$refs.histogram.setPlotValues();
      }
    }
  },
  watch: {
      /**
       * do query when params change
       */
    params: function(newVal, oldVal) {
      this.$emit("update:loading", true);
      this.$http
        .post("/v2/query", {
          query_parameters: newVal
        })
        .then(result_query => {
          this.interval = setInterval(
            this.queryTask,
            2000,
            result_query.data["task-id"]
          );
        })
        .catch(error => {
          this.$emit("update:loading", false);
          this.result = error.response;
        });
    },
    load(newVal) {
      this.$emit("update:loading", newVal);
    },
    download(newVal) {
      this.$emit("update:downloading", newVal);
    }
  }
};
</script>

<style scoped>
</style>
