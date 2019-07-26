<template>
  <v-card id="probCard" height="100%">
    <v-card-text id="probCardText">
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
            let probabilities = this.$store.state.results.objectDetails
                .probabilities;
            let ret = {};
            Object.keys(probabilities).forEach(key => {
                if (Object.keys(probabilities[key]).length > 0) {
                    ret[key] = probabilities[key];
                }
            });
            return ret;
        }
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
