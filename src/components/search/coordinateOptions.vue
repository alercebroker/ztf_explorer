<template>
    <div name="coordinates">
        <b-container>
            <b-row class="mb-3">
                <b-col cols="6">RA
                    <v-icon
                    v-b-tooltip.hover.right
                    title="Right Ascension"
                    name="info-circle"
                    color="#C0C0C0"
                    ></v-icon>
                    <small class="text-muted">(deg)</small>
                </b-col>
                <b-col class="mb-1">
                    <input
                    class="form-control form-control-sm"
                    id="RA"
                    type="number"
                    step="0.00001"
                    v-model="ra"
                    />
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col cols="6">DEC
                     <v-icon
                    v-b-tooltip.hover.right
                    title="Declination"
                    name="info-circle"
                    color="#C0C0C0"
                    ></v-icon>
                    <small class="text-muted">(deg)</small>
                </b-col>
                <b-col class="mb-1">
                    <input
                    class="form-control form-control-sm"
                    id="DEC"
                    type="number"
                    step="0.00001"
                    v-model="dec"
                    />
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col cols="6">Radius
                    <v-icon
                    v-b-tooltip.hover.right
                    title="Cone search radius"
                    name="info-circle"
                    color="#C0C0C0"
                    ></v-icon>
                    <small class="text-muted">(arcsec)</small>
                </b-col>
                <b-col class="mb-1">
                    <input
                    class="form-control form-control-sm"
                    id="RS"
                    type="number"
                    step="0.00001"
                    v-model="rs"
                    min="0"
                    />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>   

<script>
    export default {
        name: "coordinate-options",
        computed: {
            ra: {
                get(){
                    return this.$store.state.search.coordinates.ra;
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "coordinates",
                        keyPath: ["ra"],
                        value: value
                    })
                }
            },
            dec: {
                get(){
                    return this.$store.state.search.coordinates.dec;
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "coordinates",
                        keyPath: ["dec"],
                        value: value
                    })
                }
            },
            rs: {
                get(){
                    return this.$store.state.search.coordinates.rs;
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "coordinates",
                        keyPath: ["rs"],
                        value: value
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>