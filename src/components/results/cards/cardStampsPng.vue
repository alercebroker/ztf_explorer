<template>
    <v-card>
      <v-layout row wrap >
          <v-flex xs4 class="text-xs-center">
            <h5>Science</h5>
            <img :src="science" class="stampImg" />
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            <h5>Template</h5>
            <img :src="template" class="stampImg" />
          </v-flex>
          <v-flex xs4 class="text-xs-center">
            <h5>Difference</h5>
            <img :src="difference" class="stampImg" />
          </v-flex>
      </v-layout>
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
                "http://stamps.alerce.online:8087/get_stamp?oid=" +
                this.object +
                "&candid=" +
                this.candid +
                "&type=science&format=png"
            );
        },
        difference() {
            return (
                "http://stamps.alerce.online:8087/get_stamp?oid=" +
                this.object +
                "&candid=" +
                this.candid +
                "&type=difference&format=png"
            );
        },
        template() {
            return (
                "http://stamps.alerce.online:8087/get_stamp?oid=" +
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
  .stampImg{
    height:100%;
    width:auto;
    max-height:150px;
  }
</style>
