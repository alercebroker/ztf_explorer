<template>
    <v-card height="100%" id="v-step-4">
        <v-toolbar dense flat dark>
            <v-toolbar-title>Magnitude Statistics</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text style="padding: 0 0 0 0;">
            <v-data-table
                :mobile-breakpoint="250"
                :headers="headers"
                :items="magnitudeItems"
                hide-default-footer
                dense
            ></v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    // name: "card-magnitude-statistics",
    data() {
        return {
            headers: [
                { text: "Item", value: "Item" },
                { text: "g", value: "g" },
                { text: "r", value: "r" }
            ]
        };
    },

    computed: {
        ztf_object() {
            return this.$store.state.results.selectedObject;
        },
        magnitudeItems() {
            return [
                {
                    Item: "Mean",
                    g: this.ztf_object.mean_magpsf_g
                        ? this.ztf_object.mean_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.mean_magpsf_r
                        ? this.ztf_object.mean_magpsf_r.toFixed(3)
                        : "-"
                },
                {
                    Item: "Median",
                    g: this.ztf_object.median_magpsf_g
                        ? this.ztf_object.median_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.median_magpsf_r
                        ? this.ztf_object.median_magpsf_r.toFixed(3)
                        : "-"
                },
                {
                    Item: "First",
                    g: this.ztf_object.first_magpsf_g
                        ? this.ztf_object.first_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.first_magpsf_r
                        ? this.ztf_object.first_magpsf_r.toFixed(3)
                        : "-"
                },
                {
                    Item: "Last",
                    g: this.ztf_object.last_magpsf_g
                        ? this.ztf_object.last_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.last_magpsf_r
                        ? this.ztf_object.last_magpsf_r.toFixed(3)
                        : "-"
                },
                {
                    Item: "Min",
                    g: this.ztf_object.min_magpsf_g
                        ? this.ztf_object.min_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.min_magpsf_r
                        ? this.ztf_object.min_magpsf_r.toFixed(3)
                        : "-"
                },
                {
                    Item: "Max",
                    g: this.ztf_object.max_magpsf_g
                        ? this.ztf_object.max_magpsf_g.toFixed(3)
                        : "-",
                    r: this.ztf_object.max_magpsf_r
                        ? this.ztf_object.max_magpsf_r.toFixed(3)
                        : "-"
                }
            ];
        }
    }
};
</script>

<style>
</style>