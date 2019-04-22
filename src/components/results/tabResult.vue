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
