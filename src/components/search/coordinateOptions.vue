<template>
    <v-form >
        <v-layout row wrap pl-3 pr-3>
            <v-flex xs5>
                <v-text-field type="number" step="0.00001" v-model="ra" label="RA (deg)" />
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs5>
                <v-text-field label="DEC (deg)" type="number" step="0.00001" v-model="dec" />
            </v-flex>
            <v-flex xs12>
                <v-text-field
                    label="Radius (arcsec)"
                    type="number"
                    step="0.00001"
                    v-model="rs"
                    min="0"
                />
            </v-flex>
        </v-layout>
    </v-form>
</template>

<script>
export default {
    name: "coordinate-options",
    data() {
        return {};
    },
    computed: {
        ra: {
            get() {
                return this.$store.state.search.coordinates.ra;
            },
            set(value) {
                this.$store.dispatch("updateOptions", {
                    obj: "coordinates",
                    keyPath: ["ra"],
                    value: value
                });
            }
        },
        dec: {
            get() {
                return this.$store.state.search.coordinates.dec;
            },
            set(value) {
                this.$store.dispatch("updateOptions", {
                    obj: "coordinates",
                    keyPath: ["dec"],
                    value: value
                });
            }
        },
        rs: {
            get() {
                return this.$store.state.search.coordinates.sr;
            },
            set(value) {
                this.$store.dispatch("updateOptions", {
                    obj: "coordinates",
                    keyPath: ["sr"],
                    value: value
                });
            }
        }
    }
};
</script>

<style scoped>
</style>
