<template>
  <v-card tile class="ma-0" outlined :min-height="minHeight">
    <v-card-text id="objectModalInside" class="pt-1">
      <v-row>
        <v-col
          v-for="comp in visibleComps"
          :key="comp.id"
          :cols="comp.cols"
          :md="comp.md"
          :class="comp.class"
          v-show="comp.show"
        >
          <component :is="comp.name" @fullscreen="onFullscreen" dark/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import aladin from "../cards/aladin.vue";
import cardBasicInformation from "../cards/cardBasicInformation.vue";
import cardLightCurveWrapper from "../cards/cardLightCurveWrapper.vue";
import cardProbabilities from "../cards/cardProbabilities.vue";
import cardStampsPng from "../cards/cardStampsPng.vue";
import cardMagnitudeStatistics from "../cards/cardMagnitudeStatistics.vue";
import { jdToDate } from "../../utils/AstroDates.js";
export default {
  name: "tabGeneralInformation",
  data() {
    return {
      comps: [
        {
          name: "card-basic-information",
          id: 5,
          cols: 12,
          md: 3,
          show: true
        },
        {
          name: "card-light-curve-wrapper",
          id: 1,
          cols: 12,
          md: 6,
          show: true
        },
        {
          name: "aladin",
          id: 2,
          cols: 12,
          md: 3,
          show: true
        },
        {
          name: "card-magnitude-statistics",
          id: 6,
          cols: 12,
          md: 3,
          show: true
        },
        {
          name: "card-probabilities",
          id: 3,
          cols: 12,
          md: 4,
          show: true
        },
        {
          name: "card-stamps-png",
          id: 7,
          cols: 12,
          md: 5,
          class: "hidden-sm-and-down",
          show: true,
          stampComponent: "crosshair"
        }
      ],
      isFullscreen: false
    };
  },
  components: {
    cardLightCurveWrapper,
    aladin,
    cardProbabilities,
    cardStampsPng,
    cardBasicInformation,
    cardMagnitudeStatistics
  },
  methods: {
    onFullscreen(fsComp) {
      this.isFullscreen = fsComp.value;
      this.comps.forEach(ele => {
        if (ele.id === fsComp.id) {
          ele.show = false;
          fsComp.value ? (ele.md = 12) : (ele.md = 5);
          ele.show = true;
        } else {
          fsComp.value ? (ele.show = false) : (ele.show = true);
        }
      });
    },
    onZoomSelected() {
      let comp = this.comps.find(ele => {
        return ele.id === 7;
      });
      console.log("zoom", comp);
      comp.stampComponent = "zoom";
    },
    onCrosshairSelected() {
      let comp = this.comps.find(ele => {
        return ele.id === 7;
      });
      comp.stampComponent = "crosshair";
    }
  },
  computed: {
    visibleComps() {
      return this.comps.filter(x => {
        return x.show == true;
      });
    },
    minHeight() {
      return this.isFullscreen ? 600 : null;
    }
  },
  mounted: function() {
    /*this.$store.dispatch("getTNS", {
            ra: this.ztf_object.meanra,
            dec: this.ztf_object.meandec
        });*/
  }
};
</script>

<style scoped>
ul {
  padding: 3px;
  margin: 0px;
  list-style-type: none;
}
#objectModal {
  margin: 2px 2px 2px 2px;
}
.v-card:not(#objectModalCard) {
  margin: 4px 4px 4px 4px;
}
#objectModalInside {
  background-color: #e0e0e0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
