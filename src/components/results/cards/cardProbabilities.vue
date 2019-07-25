<template>
  <v-card height="100%">
    <v-card-text>
      <v-tabs background-color="transparent" color="toolbar">
        <v-tab v-for="(value, name, index) in probabilities" v-bind:key="index">
          {{name}}
        </v-tab>
        <v-tab-item v-for="(value, name, index) in probabilities" v-bind:key="index">
          <polarradar :classifier="name" :probabilities="value" />
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
</style>
