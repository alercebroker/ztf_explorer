<template>
    <v-dialog
        id="objectModal"
        v-model="showModal"
        @input="closeModal"
        :fullscreen="$vuetify.breakpoint.xsOnly"
        @keydown.right="nextObject"
        @keydown.left="prevObject"
        :persistent="tutorialOpen"
        @keyup.esc="closeModal"
    >
        <v-card fluid tile class="ma-0">
            <v-system-bar window dark color="toolbar">
                <!--span> {{ title }} </span-->
                <v-spacer></v-spacer>
                <v-icon id="v-step-9" v-if="showButtons" @click="prevObject" >mdi-arrow-left-drop-circle</v-icon>
                <v-icon v-if="showButtons" @click="nextObject">mdi-arrow-right-drop-circle</v-icon>
                <v-icon id="v-step-10" @click.stop="closeModal">close</v-icon>
            </v-system-bar>
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
        </v-card>
    </v-dialog>
</template>

<script>
import tabXMatches from "../tabs/TabXMatches.vue";
import tabGeneralInformation from "../tabs/TabGeneral.vue";

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
        nextObject: function() {
            let index = Object.keys(this.$store.state.results.objects).indexOf(
                this.$store.state.results.selectedObject.oid
            );
            // TODO: Conditions when the shift of index (lower or more) is invalid
            let item = Object.keys(this.$store.state.results.objects)[
                index + 1
            ];
            if (!item) {
                return null;
            }
            var newItem = this.$store.state.results.objects[item];
            this.$store.dispatch("objectSelected", newItem);
            this.$router.push({
                name: "object-details-modal",
                params: { id: newItem.oid }
            });
        },
        prevObject: function() {
            let index = Object.keys(this.$store.state.results.objects).indexOf(
                this.$store.state.results.selectedObject.oid
            );
            // TODO: Conditions when the shift of index (lower or more) is invalid
            let item = Object.keys(this.$store.state.results.objects)[
                index - 1
            ];
            if (!item) {
                return null;
            }
            var newItem = this.$store.state.results.objects[item];
            this.$store.dispatch("objectSelected", newItem);
            this.$router.push({
                name: "object-details-modal",
                params: { id: newItem.oid }
            });
        }
    },
    computed: {
        showModal: {
            get() {
                return this.$store.state.results.showObjectDetailsModal;
            },
            set(value) {
                this.$store.dispatch("setShowObjectDetailsModal", value);
            }
        },
        title() {
            return this.$store.state.results.selectedObject.oid;
        },
        showButtons: function() {
            return this.$store.state.results.objects.length == 0 ? false : true;
        },
        tutorialOpen(){
            return this.$store.state.tutorialOpen
        }
    },
    mounted: function() {
        this.$store.dispatch("getXMatches", {
            ra: this.$store.state.results.selectedObject.meanra,
            dec: this.$store.state.results.selectedObject.meandec,
            radius: 50
        });
    }
};
</script>
<style scoped>
</style>
