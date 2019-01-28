<template>
  <div>
    <b-card-group>
      <b-card-body>
        <transition name="fade">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Table">
                <tabData></tabData>
              </b-tab>
              <!-- <b-tab
                title="Histogram"
                v-on:click="reDrawHist"
                :disabled="result.data.length != 0 ? false : true"
              >
                <tabHistogram
                  ref="histogram"
                  :loadMore="loadMore"
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
                  :disabled="result.data.status == 200 ? false : true"
                ></tabScatter>
              </b-tab>
              <b-tab title="Spatial Distribution" :disabled="true">
                <tabSpatialDistribution :result="result"></tabSpatialDistribution>
              </b-tab> -->
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
  components: {
    tabData,
    tabScatter,
    tabHistogram,
    tabSankey,
    tabSpatialDistribution
  },
  methods: {
    
    /**
     * query for next page results
     * @param fun_update: fun to pass getQueryResults
     */
    loadMore: function(fun_update) {
      this.pageNumber = this.pageNumber + 1;
      this.getQueryResults(this.taskId, fun_update);
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
  }
};
</script>

<style scoped>
</style>
