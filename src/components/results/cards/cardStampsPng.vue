<template>
    <b-card id="main" title="Stamps">
        <b-container fluid>
            <b-card-group deck class="mb-3">
                <b-card border-variant="light" header="Science" class="text-center">
                    <img :src="science" :style="imgStyle"/>
                </b-card>
                <b-card border-variant="light" header="Template" class="text-center">
                    <img :src="template" :style="imgStyle"/>
                </b-card>
                <b-card border-variant="light" header="Difference" class="text-center">
                    <img :src="difference" :style="imgStyle" />
                </b-card>
            </b-card-group>
        </b-container>
    </b-card>
</template>

<script>
export default {
    name: "card-stamps-png",
    data(){
        return{
            imgStyle: {
                width:"100%"
            }
        }
    },
    computed:{ 
        object() {
            return this.$store.state.results.selectedObject.oid;
        },
        candid() {
            return this.$store.state.results.objectDetails.detections[0]
                .candid_str;
        },
        science(){
            return "http://stamps.alerce.online:8087/get_stamp?oid="+ this.object + "&candid="+ this.candid+ "&type=science&format=png"
        },
        difference(){
            return "http://stamps.alerce.online:8087/get_stamp?oid="+ this.object + "&candid="+ this.candid+ "&type=difference&format=png"
        },
        template(){
            return "http://stamps.alerce.online:8087/get_stamp?oid="+ this.object + "&candid="+ this.candid+ "&type=template&format=png"
        }
    }
};
</script>

<style>
</style>

