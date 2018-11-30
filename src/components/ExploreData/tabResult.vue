<template>
  <div>
    <b-card-group>
      <b-card-body>
        <transition name="fade">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Data">
                <tabData
                  :loading.sync="load"
                  :result="result"
                  :error="error"
                  :query_sql="query_sql"
                  :pageNumber.sync="pageNumber"
                  :getMoreObjects="getQueryResults"
                  :taskId="taskId"
                ></tabData>
              </b-tab>

              <b-tab title="Histogram" :disabled="result.data.status == 200 ? false : true">
                <tabHistogram :result="result" :currentQueryParent="query_sql"></tabHistogram>
              </b-tab>
              <b-tab title="Scatter">
                <tabScatter
                  :result="result"
                  :currentQueryParent="query_sql"
                  :disabled="result.data.status == 200 ? false : true"
                ></tabScatter>
              </b-tab>
              <b-tab
                title="Spatial Distribution"
                :disabled="result.data.status == 200 ? false : true"
              >
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
  props: ["params", "loading", "query_sql"],
  components: {
    tabData,
    tabScatter,
    tabHistogram,
    tabSankey,
    tabSpatialDistribution
  },
  data() {
    return {
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
    getQueryResults: function(taskId) {
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
              this.result.data = this.result.data.concat(results.data);
            }
            this.$emit("update:loading", false);
          }.bind(this)
        );
    },
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
    }
  },
  watch: {
    params: function(newVal) {
      this.$emit("update:loading", true);

      this.$http
        .post("/v2/query", {
          query_parameters: newVal
        })
        .then(result_query => {
          this.interval = setInterval(
            this.queryTask,
            500,
            result_query.data["task-id"]
          );
        })
        .catch(error => {
          this.$emit("update:loading", false);
          this.result = error.response;
        });
    },

    load(newVal) {
      // Handle changes in individual flavour checkboxes
      this.$emit("update:loading", newVal);
    }
  }
};
</script>

<style scoped>
</style>
