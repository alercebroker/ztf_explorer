<template>
  <div>
    <b-card-group>
      <b-card-body>
        <transition name="fade">
          <b-card no-body>
            <b-tabs card v-model="selectedTab">
              <b-tab 
                title="Overview Dashboard"
              >
                <generalDashboard/>
              </b-tab>
              <b-tab title="Query Table">
                <tabData/>
              </b-tab>
              <b-tab
                title="Query Dashboard"
              >
                <queryDashboard/>
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
import generalDashboard from "./generalDashboard.vue";
import queryDashboard from './queryDashboard.vue';
export default {
  name: "tabResult",
  components: {
    tabData,
    generalDashboard,
    queryDashboard
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
  },
  computed: {
    selectedTab:{
      get(){
        return this.$store.state.selectedTab
      },
      set(value){
        this.$store.dispatch('setSelectedTab',value);
      }
    }
  }
};
</script>

<style scoped>
</style>
