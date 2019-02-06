<template>
  <b-modal
      class="modal-fullscreen"
      id="more-results"
      :title="title"
      v-on:hidden="$emit('modalClosed')"
      v-model="showModal"
      lazy="lazy"
    >
      <b-container fluid>
        <b-row>
          <b-col cols="2">
            <b-card title="Details">
                <ul id="default-details" v-if="$store.state.loading === false">
                  <!--<li v-for="(value, key) in $store.state.results.objectDetails.object_details" :key="key">
                    <strong>{{key}}</strong> : {{ typeof value === "number"? Number.parseFloat(value).toFixed(3) : value }}
                  </li>-->
                  <li><strong>Class:</strong> {{ classOptions[$store.state.results.objectDetails.object_details.class-1] }}</li>
                  <li><strong>RA:</strong> {{ $store.state.results.objectDetails.object_details.meanra.toFixed(4) }}</li>
                  <li><strong>Dec:</strong> {{ $store.state.results.objectDetails.object_details.meandec.toFixed(4) }}</li>
                  <li><strong>Observations:</strong> {{ $store.state.results.objectDetails.object_details.nobs }}</li>
                </ul>
            </b-card>
          </b-col>
          <b-col cols="7">
            <!-- Curva de luz -->
            <b-card title="Light curve" class="h-100 align-middle">
              <light-curve ></light-curve>
            </b-card>
          </b-col>
          <!-- ALADIN -->
          <b-col cols="3">
            <b-card title="Aladin" class="h-100 align-middle">
              <aladin v-if="$store.state.loading === false"/>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <!-- Stamps -->
            <!-- <img src="" alt="" id="image"> -->
            <b-card title="Stamps" v-show="false">
              <div class="text-center">No stamps to display</div>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <!-- Visibility Plot -->
            <b-card title="Visibility Plots" v-show="false">
              <div class="text-center">No plots to display</div>
            </b-card>
          </b-col>
          <b-col>
            <!-- Periodogram -->
            <b-card title="Periodogram" v-show="false">
              <div class="text-center">No periodogram to display</div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <div slot="modal-footer">
        <b-btn v-on:click="$emit('modalClosed')">Close</b-btn>
      </div>
    </b-modal>
</template>

<script>
import lightCurve from "./lightCurve.vue";
import aladin from './aladin.vue';
export default {
  name: "object-details-modal",
  props: ["show"],
  data() {
    return {
      lazy: true,
      classOptions: ["EBSD/D","RRL","Periodic-Other","LPV","EBC","Ceph","DSCT","CV","Novae","Pulsating-Other", "SNeIIb","SNeIa","SNeIIn","AGN","SNeIb/c","SNeII","SLSN","SNeIa-sub","TDE"],
    }
  },
  components: {
    lightCurve: lightCurve,
    aladin
  },
  computed: {
    title(){
      return "Object details for: " + this.$store.state.results.selectedObject.oid
    },
    showModal: {
      get(){
        return this.show
      },
      set(value){
        return value
      }
    }
  }
};
</script>

<style scoped>
ul {
  padding-left: 0px;
}
</style>