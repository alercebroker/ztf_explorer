<template>
  <b-modal
      class="modal-fullscreen"
      id="more-results"
      :title="title"
      v-on:hidden="$emit('modalClosed')"
      v-model="showModal"
    >
      <b-container fluid>
        <b-row>
          <b-col cols="2">
            <b-card title="Details">
              <b-row>
                <b-col id="details">
                  <ul id="default-details">
                    <li v-for="(value, key) in $store.state.results.objectDetails.object_details" :key="key">
                      <strong>{{key}}</strong> : {{ typeof value === "number"? Number.parseFloat(value).toFixed(3) : value }}
                    </li>
                  </ul>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col cols="6">
            <!-- Curva de luz -->
            <b-card title="Light curve" class="h-100 align-middle">
              <light-curve></light-curve>
            </b-card>
          </b-col>
          <!-- ALADIN -->
          <b-col cols="4">
            <b-card title="Aladin" class="h-100 align-middle">
              <aladin 
                :coordinates="{
                    meanRA: $store.state.results.objectDetails.object_details ? $store.state.results.objectDetails.object_details.meanra : null,
                    meanDEC: $store.state.results.objectDetails.object_details ? $store.state.results.objectDetails.object_details.meandec : null
                  }"
                />
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
</style>