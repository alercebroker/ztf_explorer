<template>
    <div>
    <b-tab>
        <template slot="title">
            <strong>Any Band</strong>
        </template>
        <b-row class="align-middle">
            <b-col md="6">
                <b-row>
                    <b-col md="4" class="text-right">
                        <label for="minAny">Min</label>
                    </b-col>
                    <b-col md="8" class="text-left">
                        <input class="form-control form-control-sm" v-model="datos.any.min" min="0" type="number" :max="datos.any.max" id="minAny"></input>
                    </b-col>
                </b-row>
            </b-col>
            <b-col md="6">
                <b-row>
                    <b-col md="4" class="text-right">
                        <label for="maxAny">Max</label>
                    </b-col>
                    <b-col md="8" class="text-left">
                        <input class="form-control form-control-sm" :min="datos.any.min" v-model="datos.any.max" type="number"  id="maxAny"></input>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <hr>
        <b-row class="align-middle">
            <b-col md="4" class="text-center small">min</b-col>
            <b-col md="4" class="text-center"> </b-col>
            <b-col md="4" class="text-center small">max</b-col>
        </b-row>
        <b-row class="align-middle">
            <b-col md="4">
                <input class="form-control form-control-sm" id="minSlopeAny"></input>
            </b-col>
            <b-col md="4" class="text-center"> slope </b-col>
            <b-col md="4">
                <input class="form-control form-control-sm" id="maxSlopeAny"></input>
            </b-col>
        </b-row>
        <br>
        <b-row class="align-middle">
            <b-col md="4">
                <b-form-input size="sm" id="minMeanAny"></b-form-input>
            </b-col>
            <b-col md="4" class="text-center"> mean </b-col>
            <b-col md="4">
                <b-form-input size="sm" id="maxMeanAny"></b-form-input>
            </b-col>
        </b-row>
        <br>
        <div class="row align-middle">
            <div class="col-4">
                <b-form-input size="sm" id="minRmsAny"></b-form-input>
            </div>
            <div class="col-4 text-center"> RMS </div>
            <div class="col-4">
                <b-form-input size="sm" id="maxRmsAny"></b-form-input>
            </div>
        </div>

        <br>
        <b-row class="align-middle">
            <b-col md="4">
                <b-form-input size="sm" id="minLastmagU"></b-form-input>
            </b-col>
            <b-col md="4" class="text-center"> last magn. </b-col>
            <b-col md="4">
                <b-form-input size="sm" id="maxLastmagU"></b-form-input>
            </b-col>
        </b-row>
    </b-tab>
        </div>
</template>

<script>
    export default {
        name: "tabBand",
        data() {
            return {
                datos: {
                    any: {
                        max: null,
                        min: null
                    }
                }
            }
        }

    }
</script>

<style scoped>

</style>