<template>
  <v-card height="100%">
    <v-toolbar dense flat dark>
      <v-row align="center">
        <v-col cols="3">
          <v-toolbar-title>Stamps</v-toolbar-title>
        </v-col>
        <v-col cols="5" class="mt-4">
          <v-select :items="dates" v-model="selectedStamp"></v-select>
        </v-col>
        <v-col cols="2">
          <v-icon @click="prevStamp">mdi-arrow-left-drop-circle</v-icon>
          <v-icon @click="nextStamp">mdi-arrow-right-drop-circle</v-icon>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="1">
          <v-icon @click="fullscreen">{{fullscreenIcon}}</v-icon>
        </v-col>
        <v-col cols="1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-information</v-icon>
            </template>
            <span>Move your mouse over the images to zoom</span>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="4" class="text-xs-center">
          <h5>
            Science
            <v-btn x-small outlined color="primary" :href="download('science')">
              <v-icon left small>cloud_download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
        <v-col cols="4" class="text-xs-center">
          <h5>
            Template
            <v-btn x-small outlined color="primary" :href="download('template')">
              <v-icon left small>cloud_download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
        <v-col cols="4" class="text-xs-center">
          <h5>
            Difference
            <v-btn x-small outlined color="primary" :href="download('difference')">
              <v-icon left small>cloud_download</v-icon>Download
            </v-btn>
          </h5>
        </v-col>
      </v-row>
      <v-row class="pa-0">
        <v-col cols="12" v-if="stampComponent === 'zoom'">
          <zoom-on-hover :images="[science,template,difference]" :disabled="isFullscreen"></zoom-on-hover>
        </v-col>
        <v-col cols="12" v-if="stampComponent === 'crosshair'">
          <crosshair :images="[science, template, difference]" :fullscreen="isFullscreen"></crosshair>
        </v-col>
      </v-row>
      <v-row align="start" style="max-height:20px;" class="pa-0" justify="center">
        <v-col style="max-height:20px;" cols="1" class="pa-0">
          <v-icon @click="selectZoom">mdi-magnify-plus</v-icon>
          <v-icon @click="selectCrosshair">mdi-crosshairs</v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import QueryStampsService from "@/services/QueryStampsService.js";
import { jdToDate } from "@/components/utils/AstroDates.js";
import ZoomOnHover from "@/components/utils/ZoomOnHover.vue";
import Crosshair from "@/components/utils/Crosshair.vue";
export default {
  name: "card-stamps-png",
  components: {
    ZoomOnHover,
    Crosshair
  },
  props:{
    stampComponent: {
      type: String,
      default: "crosshair"
    }
  },
  data() {
    return {
      isFullscreen: false
    };
  },
  methods: {
    prevStamp() {
      if (this.currentStamp > 0) {
        this.$store.dispatch("setCurrentStamp", this.currentStamp - 1);
      }
    },
    nextStamp() {
      if (
        this.currentStamp + 1 <
        this.$store.state.results.objectDetails.detections.length
      ) {
        this.$store.dispatch("setCurrentStamp", this.currentStamp + 1);
      }
    },
    getCandid(index) {
      if (this.$store.state.results.objectDetails.detections) {
        return this.$store.state.results.objectDetails.detections[index]
          .candid_str;
      } else {
        return "";
      }
    },
    download(type, event) {
      let link =
        "http://avro.alerce.online/get_stamp?oid=" +
        this.object +
        "&candid=" +
        this.getCandid(this.currentStamp) +
        "&type=" +
        type +
        "&format=fits";
      return link;
    },
    fullscreen() {
      this.isFullscreen = !this.isFullscreen;
      this.$emit("fullscreen", { id: 7, value: this.isFullscreen });
    },
    selectZoom() {
      this.$emit("zoomSelected");
    },
    selectCrosshair() {
      this.$emit("crosshairSelected");
    }
  },
  computed: {
    object() {
      return this.$store.state.results.selectedObject.oid;
    },
    dates() {
      if (this.$store.state.results.objectDetails.detections) {
        return this.$store.state.results.objectDetails.detections.map(x => {
          return (
            jdToDate(x.mjd)
              .toUTCString()
              .slice(0, -3) + "UT"
          );
        });
      }
      return [];
    },
    selectedStamp: {
      get() {
        return this.dates[this.currentStamp];
      },
      set(value) {
        this.$store.dispatch("setCurrentStamp", this.dates.indexOf(value));
      }
    },
    selectedDetection() {
      return this.$store.state.results.selectedDetection;
    },
    science() {
      return QueryStampsService.getScienceURL(
        this.object,
        this.getCandid(this.currentStamp)
      );
    },
    difference() {
      return QueryStampsService.getDifferenceURL(
        this.object,
        this.getCandid(this.currentStamp)
      );
    },
    template() {
      return QueryStampsService.getTemplateURL(
        this.object,
        this.getCandid(this.currentStamp)
      );
    },
    currentStamp() {
      return this.$store.state.results.currentStamp;
    },
    fullscreenIcon() {
      return this.isFullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen";
    }
  },
  watch: {
    selectedDetection(newVal) {
      this.$store.dispatch("setCurrentStamp", this.dates.indexOf(newVal));
    }
  }
};
</script>

<style scoped>
</style>
