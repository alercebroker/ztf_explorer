<template>
    <v-dialog v-model="dialog" scrollable max-width="300px">
        <template v-slot:activator="{ on }">
            <v-btn small text color="primary" v-on="on">Select Columns</v-btn>
        </template>
        <v-card >
            <v-card-title primary-title class="headline">Select Columns</v-card-title>
            <v-card-text >
                <v-layout row wrap>
                    <v-flex xs12 v-for="option in options" :key="option.value">
                        <v-checkbox v-model="option.show" :label="option.text"></v-checkbox>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "column-options-modal",
    data() {
        return {
            dialog: false,
            allSelected: false
        };
    },
    computed: {
        options() {
            return this.$store.state.results.selectedColumnOptions;
        }
    }
};
</script>

<style scoped>
</style>
