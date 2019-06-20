<template>
  <b-modal
      class="modal-fullscreen"
      id="more-results"
      v-on:hidden="$emit('modalClosed')"
      v-model="showModal"
      lazy="lazy"
      no-close-on-backdrop>
      <div slot="modal-header">
      </div>
      <b-container fluid>
        <b-row>
          <b-col cols="2">
            <b-card-group deck class="mb-3">
              <b-card no-body class>
                  <ul v-if="$store.state.loading === false">
                    <!--ZTF id-->
                    <li><strong>Object:</strong> {{ ztf_object.oid }}</li>
                    <!-- Classification -->
                    <li v-if="ztf_object.classxmatch">
                      <strong>Class:</strong> {{ getClass(ztf_object, "classxmatch") }} (X-MATCH) 
                    </li>
                    <li v-if="ztf_object.classrf">
                      <strong>Class:</strong> {{ getClass(ztf_object, "classrf") }} (ML_RF) 
                    </li>
                    <li v-if="ztf_object.classrnn">
                      <strong>Class:</strong> {{ getClass(ztf_object, "classrnn") }} (ML_RNN) 
                    </li>
                    <!--RA/Dec-->
                    <li>
                      <strong>RA/Dec:</strong> {{ ztf_object.meanra ? ztf_object.meanra.toFixed(4) : '-' }},{{ ztf_object.meandec ? ztf_object.meandec.toFixed(4) : '-' }}</li>
                    <li><strong>Detections:</strong> {{ $store.state.results.objectDetails.detections ? $store.state.results.objectDetails.detections.length : '-' }}</li>
                    <li><strong>Non-Detections:</strong> {{ $store.state.results.objectDetails.non_detections ? $store.state.results.objectDetails.non_detections.length : '-' }}</li>
                    <li><strong>First date:</strong> {{ julianIntToDate(ztf_object.firstmjd) }}</li>
                    <li><strong>Last date:</strong> {{ julianIntToDate(ztf_object.lastmjd) }}</li>
                  </ul>
              </b-card>
            </b-card-group>
            <b-card-group>
              <b-card no-body>
                <table v-if="$store.state.loading === false">
                  <tr>
                    <th>Item</th>
                    <th>g</th> 
                    <th>r</th>
                  </tr>
                  <tr>
                    <td>Mean</td>
                    <td>{{ ztf_object.mean_magpsf_g ? ztf_object.mean_magpsf_g.toFixed(3) : '-' }}</td> 
                    <td>{{ ztf_object.mean_magpsf_r ? ztf_object.mean_magpsf_r.toFixed(3) : '-' }}</td>
                  </tr>
                  <tr>
                    <td>Median</td>
                    <td>{{ ztf_object.median_magpsf_g ? ztf_object.median_magpsf_g.toFixed(3) : '-' }}</td> 
                    <td>{{ ztf_object.median_magpsf_r ? ztf_object.median_magpsf_r.toFixed(3) : '-' }}</td>
                  </tr>
                  <tr>
                    <td>First</td>
                    <td>{{ ztf_object.first_magpsf_g ? ztf_object.first_magpsf_g.toFixed(3) : '-' }}</td> 
                    <td>{{ ztf_object.first_magpsf_r ? ztf_object.first_magpsf_r.toFixed(3) : '-' }}</td>
                  </tr>
                  <tr>
                    <td>Last</td>
                    <td>{{ ztf_object.last_magpsf_g ? ztf_object.last_magpsf_g.toFixed(3) : '-' }}</td> 
                    <td>{{ ztf_object.last_magpsf_r ? ztf_object.last_magpsf_r.toFixed(3) : '-' }}</td>
                  </tr>
                  <tr>
                    <td>Min</td>
                    <td>{{ ztf_object.min_magpsf_g ? ztf_object.min_magpsf_g.toFixed(3) : '-' }}</td> 
                    <td>{{ ztf_object.min_magpsf_r ? ztf_object.min_magpsf_r.toFixed(3) : '-' }}</td> 
                  </tr>
                  <tr>
                    <td>Max</td>
                    <td>{{ ztf_object.max_magpsf_g ? ztf_object.max_magpsf_g.toFixed(3) : '-' }}</td> 
                    <td>{{ ztf_object.max_magpsf_r ? ztf_object.max_magpsf_r.toFixed(3) : '-' }}</td>
                  </tr>
                </table>
              </b-card>
            </b-card-group>
          </b-col>
          <!-- Curva de luz -->
          <b-col cols="7">
            <card-light-curve />
          </b-col>
          <!-- ALADIN -->
          <b-col cols="3">
              <div class="h-100 align-middle">
                <aladin v-if="$store.state.loading === false"/>
              </div>
          </b-col>
        </b-row>
        <!-- PROBABILITIES -->
        <b-row class="mt-3" v-if="$store.state.results.selectedObject.classrf">
          <b-col cols="4">
            <b-card no-body class="h-100 align-middle">
              <lineclass></lineclass>
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
        <!--<b-btn v-on:click="$emit('modalClosed')">Close</b-btn>-->
        <b-btn v-on:click="closeModal" variant="danger">Close</b-btn>
      </div>
    </b-modal>
</template>

<script>
import cardLightCurve from "../cards/cardLightCurve";
import aladin from '../cards/aladin.vue';
import lineclass from '../plots/LineClass.vue';

export default {
  name: "object-details-modal",
  props: ["id", "show"],
  data() {
    return {
      lazy: true,
      //classOptions: ["EBSD/D","RRL","Periodic-Other","LPV","EBC","Ceph","DSCT","CV","Novae","Pulsating-Other", "SNeIIb","SNeIa","SNeIIn","AGN","SNeIb/c","SNeII","SLSN","SNeIa-sub","TDE"],
    }
  },
  components: {
    cardLightCurve,
    aladin,
    lineclass
  },
  methods: {
    getClass(obj, classifier){
      return this.$store.state.search.classes.find(function(x){
        if(x.value == obj[classifier]){
          return x;
        }
      }).text;
    },
    julianIntToDate: function(n) {
      // https://stackoverflow.com/questions/29627533/conversion-of-julian-date-number-to-normal-date-utc-in-javascript
      if (n == null)
        return null
      var X = parseFloat(n) + 0.5 + 2400000.5;
      var Z = Math.floor(X); //Get day without time
      var F = X - Z; //Get time
      var Y = Math.floor((Z-1867216.25)/36524.25);
      var A = Z+1+Y-Math.floor(Y/4);
      var B = A+1524;
      var C = Math.floor((B-122.1)/365.25);
      var D = Math.floor(365.25*C);
      var G = Math.floor((B-D)/30.6001);
      //must get number less than or equal to 12)
      var month = (G<13.5) ? (G-1) : (G-13);
      //if Month is January or February, or the rest of year
      var year = (month<2.5) ? (C-4715) : (C-4716);
      month -= 1; //Handle JavaScript month format
      var UT = B-D-Math.floor(30.6001*G)+F;
      var day = Math.floor(UT);
      //Determine time
      UT -= Math.floor(UT);
      UT *= 24;
      var hour = Math.floor(UT);
      UT -= Math.floor(UT);
      UT *= 60;
      var minute = Math.floor(UT);
      UT -= Math.floor(UT);
      UT *= 60;
      var second = Math.round(UT);
      var date = new Date(Date.UTC(year, month, day, hour, minute, second));
      return date.toISOString().slice(0,10).replace("-","/").replace("-","/") + " - " + date.toTimeString().slice(0,8);
    },
    closeModal: function() {
      this.$emit('modalClosed');
      this.$router.replace("/");
    }
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
    },
    ztf_object() {
      return this.$store.state.results.selectedObject;
    }
  },
  mounted: function(){
  }
};
</script>

<style scoped>
ul {
  padding: 3px;
  margin: 0px; 
}

table {
  width: 100%; 
}

td, th {
  text-align: center;
}

</style>