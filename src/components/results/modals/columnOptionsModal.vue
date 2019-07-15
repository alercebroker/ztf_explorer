<template>
    <v-dialog v-model="dialog" scrollable max-width="300px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" v-on="on">Select Columns</v-btn>
        </template>
        <v-card justify-center>
            <v-card-title primary-title class="headline grey lighten-2">Select Columns</v-card-title>
            <v-card-text style="height: 500px;">
                <v-layout row wrap justify-center>
                    <v-flex xs12 v-for="option in options" :key="option.value">
                        <v-checkbox v-model="option.show" :label="option.text"></v-checkbox>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="dialog = false">Close</v-btn>
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
    methods: {
        toggleAll(checked) {
            this.$store.state.results.selectedColumnOptions = checked
                ? this.options.map(a => a.value).slice()
                : [];
        }
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
