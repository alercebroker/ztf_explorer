<template>
    <v-card>
        <v-card-title class="headline">Stamps</v-card-title>
        <v-container fluid>
            <v-layout row wrap >
                <v-flex xs12 md4 pa-2>
                    <v-card> 
                        <v-card-title>Science</v-card-title>
                        <v-card-text>
                            <img :src="science" :style="imgStyle" />
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 md4 pa-2>
                    <v-card>
                        <v-card-title>Template</v-card-title>
                        <v-card-text>
                            <img :src="template" :style="imgStyle" />
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs12 md4 pa-2>
                    <v-card>
                        <v-card-title>Difference</v-card-title>
                        <v-card-text>
                            <img :src="difference" :style="imgStyle" />
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
export default {
    name: "card-stamps-png",
    data() {
        return {
            imgStyle: {
                width: "100%"
            }
        };
    },
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

</style>