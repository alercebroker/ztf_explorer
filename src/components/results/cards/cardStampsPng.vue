<template>
    <v-card height="100%">
      <v-card-title>
        <span class="title">Discovery Stamps</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text >
        <v-layout row wrap>
          <v-flex xs4 class="text-xs-center">
            <h5>Science</h5>

            <v-img contain :src="science" class="stampImg"/></v-img>
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            <h5>Template</h5>
            <v-img contain :src="template" class="stampImg" /></v-img>
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            <h5>Difference</h5>
            <v-img contain :src="difference" class="stampImg" /></v-img>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
</template>

<script>
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
                "http://avro.alerce.online/get_stamp?oid=" +
                this.object +
                "&candid=" +
                this.candid +
                "&type=science&format=png"
            );
        },
        difference() {
            return (
                "http://avro.alerce.online/get_stamp?oid=" +
                this.object +
                "&candid=" +
                this.candid +
                "&type=difference&format=png"
            );
        },
        template() {
            return (
                "http://avro.alerce.online/get_stamp?oid=" +
                this.object +
                "&candid=" +
                this.candid +
                "&type=template&format=png"
            );
        }
    }
};
</script>

<style scoped>
</style>
