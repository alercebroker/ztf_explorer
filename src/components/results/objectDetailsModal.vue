<template>
  <b-modal
      ref="objDetailsModal"
      class="modal-fullscreen"
      id="more-results"
      title="Object Details"
      v-on:hidden="lessDetails"
    >
      <b-container fluid>
        <b-row>
          <b-col cols="4">
            <b-card title="Details">
              <b-row>
                <b-col id="details">
                  <ul id="default-details">
                    <li v-for="(value, key) in defaultProp" :key="key">
                      <strong>{{key}}</strong>
                      : {{ value }}
                    </li>
                  </ul>
                  <ul v-show="allDetails" id="more-details">
                    <li v-for="(value, key) in details" :key="key">
                      <strong>{{key}}</strong>
                      : {{ value }}
                    </li>
                  </ul>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-btn
                    v-show="details != {}"
                    variant="default"
                    v-on:click="moreDetails"
                  >{{ showMoreBtn }}</b-btn>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col>
            <!-- Curva de luz -->
            <b-card title="Light curve" class="h-100 align-middle">
              <light-curve ref="lightCurve" :chartData="chartData"></light-curve>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <!-- Stamps -->
            <!-- <img src="" alt="" id="image"> -->
            <b-card title="Stamps">
              <div class="text-center">No stamps to display</div>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <!-- Visibility Plot -->
            <b-card title="Visibility Plots">
              <div class="text-center">No plots to display</div>
            </b-card>
          </b-col>
          <b-col>
            <!-- Periodogram -->
            <b-card title="Periodogram">
              <div class="text-center">No periodogram to display</div>
            </b-card>
          </b-col>
        </b-row>
        <!-- Aladin -->
        <b-row class="mt-3">
          <b-col>
            <b-card title="Aladin">
              <aladin 
                :coordinates="{meanRA: details.meanra, meanDEC: details.meandec}"
                width="inherit"
                height="400px"
                />
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <div slot="modal-footer">
        <b-btn v-on:click="closeObjectModal">Close</b-btn>
      </div>
    </b-modal>
</template>

<script>
import lightCurve from "./lightCurve.vue";

export default {
  name: "object-details-modal",
  props: ["alerts"],
  components: {
    lightCurve: lightCurve
  },
  data() {
    return {
      chartData: {
        magrs: [],
        maggs: [],
        magrErrors: [],
        maggErrors: [],
        jdates: []
      }
    };
  },
  methods: {
    processLightCurveData: function() {
      // Iterate through data and create four lists
      this.chartData.magrs = [];
      this.chartData.maggs = [];
      this.chartData.magrErrors = [];
      this.chartData.maggErrors = [];
      this.chartData.jdates = [];

      this.alerts.forEach(dataItem => {
        this.chartData.jdates.push(dataItem.jd);
        this.chartData.magrs.push(dataItem.magr);
        this.chartData.maggs.push(dataItem.magg);

        let magg_error = [null, null];
        if (dataItem.magg != null) {
          magg_error = [dataItem.magg - 0.1, dataItem.magg + 0.1];
        }
        this.chartData.maggErrors.push(magg_error);

        let magr_error = [null, null];
        if (dataItem.magr) {
          magr_error = [dataItem.magr - 0.1, dataItem.magr + 0.1];
        }
        this.chartData.magrErrors.push(magr_error);
      });

      // this.data = [magrs, maggs, magrErrors, maggErrors, jdates]
      //   this.magrs = magrs;
      //   this.maggs = maggs;
      //   this.magrErrors = magrErrors;
      //   this.maggErrors = maggErrors;
      //   this.jdates = jdates;
    },
    redrawLightCurveChart: function() {
      this.processLightCurveData();

      this.$refs.lightCurve.redraw();
    }
  },
  watch: {
    alerts() {
      this.redrawLightCurveChart();
    }
  }
};
</script>

<style scoped>
</style>