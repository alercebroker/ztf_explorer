<template>
    <div name="coordinates">
        <h2>Coordinates</h2>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Single">
                    <b-container>
                        <b-row class="align-middle">
                            <b-col md="5">RA
                                <v-icon
                                    v-b-tooltip.hover.right
                                    title="Right Ascension"
                                    name="info-circle"
                                    color="#C0C0C0"
                                ></v-icon>
                                <small class="text-muted">(deg)</small>
                            </b-col>
                            <b-col class="mb-1">
                                <b-form-input
                                    size="sm"
                                    id="RA"
                                    type="number"
                                    step="0.00001"
                                    v-model="ra"
                                    :required="coordSearch"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="align-middle">
                            <b-col md="5">DEC
                                <v-icon
                                    v-b-tooltip.hover.right
                                    title="Declination"
                                    name="info-circle"
                                    color="#C0C0C0"
                                ></v-icon>
                                <small class="text-muted">(deg)</small>
                            </b-col>
                            <b-col class="mb-1">
                                <b-form-input
                                    size="sm"
                                    id="DEC"
                                    type="number"
                                    step="0.00001"
                                    v-model="dec"
                                    :required="coordSearch"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                        <b-row class="align-middle">
                            <b-col md="5">Radius
                                <v-icon
                                    v-b-tooltip.hover.right
                                    title="Cone search radius"
                                    name="info-circle"
                                    color="#C0C0C0"
                                ></v-icon>
                                <small class="text-muted">(arcsec)</small>
                            </b-col>
                            <b-col class="mb-1">
                                <b-form-input
                                    size="sm"
                                    id="RS"
                                    type="number"
                                    step="0.00001"
                                    v-model="rs"
                                    :required="coordSearch"
                                ></b-form-input>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-tab>
                <b-tab title="List" disabled>
                    <b-container>
                        <b-row class="align-middle">
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
        data(){
            return{
                ra: null,
                dec: null,
                rs: null
            }
        }
    }
</script>

<style scoped>

</style>