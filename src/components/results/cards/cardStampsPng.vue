<template>
    <v-card height="100%">
      <v-toolbar dense flat dark>
        <v-toolbar-title> Discovery Stamps </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text >
        <v-layout row wrap>
          <v-flex xs4 class="text-xs-center">
            <h5>Science</h5>

            <v-img contain :src="science" class="stampImg"/>
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            <h5>Template</h5>
            <v-img contain :src="template" class="stampImg" />
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            <h5>Difference</h5>
            <v-img contain :src="difference" class="stampImg" />
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
</template>

<script>
import QueryStampsService from "@/services/QueryStampsService.js"
export default {
    name: "card-stamps-png",
    computed: {
        object() {
            return this.$store.state.results.selectedObject.oid;
        },
        candid() {
            return this.$store.state.results.objectDetails.detections[0]
                .candid_str;
        },
        science() {
            return (
                QueryStampsService.getScienceURL(this.object, this.candid)
            );
        },
        difference() {
            return (
                QueryStampsService.getDifferenceURL(this.object, this.candid)
            );
        },
        template() {
            return (
                QueryStampsService.getTemplateURL(this.object, this.candid)
            );
        }
    }
};
</script>

<style scoped>
</style>
