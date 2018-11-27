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
                ></tabData>
              </b-tab>

              <b-tab title="Histogram" :disabled="result.data.status == 200 ? false : true">
                <tabHistogram :result="result" :currentQueryParent="query_sql"></tabHistogram>
              </b-tab>
                <b-tab title="Scatter">
    				<tabScatter :result="result" :currentQueryParent="query_sql"></tabScatter>
    			</b-tab>

              <b-tab
                title="Spatial Distribution"
                :disabled="result.data.status == 200 ? false : true"
              >
                <tabSpatialDistribution :result="result"></tabSpatialDistribution>
              </b-tab>

              <!--
                            <b-tab title="Sankey" :disabled="result.data.length == 0 ? true : false">
								<tabSankey :result="result"></tabSankey>
							</b-tab>
              -->
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
        data: ""
      },
      error: null,
      interval: null
    };
  },
  methods: {
    getQueryResults: function(taskId) {
      this.$http
        .post("/v2/paginated_result", {
          "task-id": taskId,
          "page-size": 100,
          "page-number": 1
        })
        .then(results => {
          this.result = results;
          this.$emit("update:loading", false);
        });
    },
    queryTask(task_id) {
      // let this = this;
      this.$http
        .post("/v2/query_status", {
          "task-id": task_id
        })
        .then(
          function(response) {
            if (response.data.status == "SUCCESS") {
              clearInterval(this.interval);
              this.getQueryResults(task_id);
            }
            else if(response.data.status == "TIMEDOUT"){
              clearInterval(this.interval);
              response.status = 504;
              this.result = response;
              this.$emit("update:loading", false);
              //this.getQueryResults(task_id);
            }
            else {
              console.log(result);
              this.result = result;
              this.$emit("update:loading", false);
            }
          }.bind(this)
        )
        .catch(function(error) {});
    }
  },
  watch: {
    params: function(newVal, oldVal) {
      // watch it
      // ONLY FOR DEMO PURPOSES!! remove it afterwards
      //   let simulate_slow_query = Math.random() < 0.5 ? 0 : 4;
      this.$emit("update:loading", true);
      this.$http
        .post("/v2/query", {
          query_parameters: newVal
          //   sleep: simulate_slow_query
        })
        .then(result_query => {
          this.interval = setInterval(
            this.queryTask,
            2000,
            result_query.data["task-id"]
          );
          //   this.checkQueryResults(result_query.data["task-id"], 10000);
        })
        .catch(error => {
          this.$emit("update:loading", false);
          this.result = error.response;
        });
    },

    load(newVal, oldVal) {
      // Handle changes in individual flavour checkboxes
      this.$emit("update:loading", newVal);
    }
  }
};
</script>

<style scoped>
</style>
