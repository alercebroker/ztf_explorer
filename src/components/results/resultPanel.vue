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
                <tab-overview-dashboard/>
              </b-tab>
              <b-tab title="Query Table">
                <tab-data/>
              </b-tab>
              <b-tab
                title="Query Dashboard"
              >
                <tab-query-dashboard/>
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
import tabOverviewDashboard from "./tabOverviewDashboard.vue";
import tabQueryDashboard from './tabQueryDashboard.vue';
export default {
  name: "result-panel",
  components: {
    tabData,
    tabOverviewDashboard,
    tabQueryDashboard
  },
  methods: {
    
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
