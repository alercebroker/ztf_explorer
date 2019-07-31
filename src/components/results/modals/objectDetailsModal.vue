<template>
    <v-dialog id="objectModal" v-model="showModal" @input="closeModal" :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card fluid tile class="ma-0">
            
            <v-tabs dark background-color="toolbar">
                <!-- Options in modal-->
                <v-tab ripple>General Information</v-tab>
                <v-tab ripple>Cross matches</v-tab>

                <!-- General-->
                <v-tab-item>
                    <tab-general-information></tab-general-information>
                </v-tab-item>
                <!-- XMatches -->
                <v-tab-item>
                    <tab-x-matches></tab-x-matches>
                </v-tab-item>
            </v-tabs>
            
            <!--Top of card with close button-->
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.stop="closeModal">Close</v-btn>
            </v-card-actions>  
        </v-card>
    </v-dialog>
</template>

<script>
import tabXMatches from "../tabs/TabXMatches.vue"
import tabGeneralInformation from "../tabs/TabGeneral.vue"

export default {
    name: "object-details-modal",
    props: ["id", "show"],
    components: {
        tabXMatches,
        tabGeneralInformation
    },
    methods: {
        closeModal: function() {
            this.$emit("modalClosed");
            this.$router.replace("/");
        },
    },
    computed: {
        showModal: {
            get() {
                console.log(
                    "show modal",
                    this.$store.state.results.showObjectDetailsModal
                );
                return this.$store.state.results.showObjectDetailsModal;
            },
            set(value) {
                this.$store.dispatch("setShowObjectDetailsModal", value);
            }
        },
    },
    mounted: function() {
        this.$store.dispatch("getXMatches", {
            ra: this.$store.state.results.selectedObject.meanra,
            dec: this.$store.state.results.selectedObject.meandec,
            radius: 10
        });
    }
};
</script>
<style scoped>
</style>
