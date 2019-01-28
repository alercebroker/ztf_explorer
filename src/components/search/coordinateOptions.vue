<template>
    <div name="coordinates">
        <h2>Coordinates</h2>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Single">
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
                                />
                            </b-col>
                        </b-row>
                    </b-container>
                </b-tab>
                <b-tab title="List" disabled>
                    <b-container>
                        <b-row class="mb-3">
                            <b-form-file placeholder="Choose a file..."></b-form-file>
                            <b-alert show class="small">.txt file, format: "RA,DEC,RS\n"</b-alert>
                        </b-row>
                    </b-container>
                </b-tab>
            </b-tabs>
        </b-card>
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