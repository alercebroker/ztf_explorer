<template>
  <v-card height="100%">
    <!-- If object has classification -->
    <v-card-text v-if="probabilities!=null" id="probCardText">
      <v-tabs dark>
        <v-tab v-for="(value, name, index) in probabilities" v-bind:key="index">
          {{name}}
        </v-tab>
        <v-tab-item  v-for="(value, name, index) in probabilities" v-bind:key="index">
          <v-layout row wrap>
            <v-flex md6 offset-md-3 >
              <polarradar :classifier="name" :probabilities="value" />
            </v-flex>
          </v-layout>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
    <!-- If object hasn't classification -->
    <v-container v-else fluid fill-height>
      <v-layout align-center justify-center fill-height>
        <v-alert type="info">
            <p v-html="ztf_object" class="ma-0"></p>
        </v-alert>
      </v-layout>
    </v-container>
  </v-card>

</template>

<script>
import lineClass from "../plots/LineClass.vue";
import polarradar from "../plots/PolarRadar.vue"
export default {
    components: {
        lineClass,
        polarradar
    },
    computed: {
        probabilities() {
            let probabilities = this.$store.state.results.objectDetails.probabilities;
            let ret = {};
            probabilities ? Object.keys(probabilities).forEach(key => {
                if (Object.keys(probabilities[key]).length > 0) {
                    ret[key] = probabilities[key];
                }
            }): null;
            return Object.keys(ret).length > 0 ? ret : null;
        },
        ztf_object() {
          return "The object <b>" + this.$store.state.results.selectedObject.oid + "</b> has not been classified yet."
        },
    },
    watch: {

    }
};
</script>

<style>
#probCard{
  padding: 0 0 0 0;
}
#probCardText{
  padding: 0 0 0 0;
}
</style>
