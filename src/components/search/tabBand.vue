<template>
    <div>
        <b-row class="align-middle">
            <b-col  class="text-center small">min</b-col>
            <b-col class="text-center"> </b-col>
            <b-col  class="text-center small">max</b-col>
        </b-row><hr>
        <b-row class="align-middle">
            <b-col >
                <b-form-input id="minMin" size="sm" type="number" v-model="min.min"></b-form-input>
            </b-col>
            <b-col class="text-center"> Min magnitude <v-icon v-b-tooltip.hover.right title="Range of magnitudes for the dimmest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col >
                <b-form-input id="minMax" size="sm" type="number" v-model="min.max"></b-form-input>
            </b-col>
        </b-row>
        <br>
        <b-row class="align-middle">
            <b-col >
                <b-form-input id="maxMin" size="sm" type="number" v-model="max.min"></b-form-input>
            </b-col>
            <b-col class="text-center"> Max magnitude <v-icon v-b-tooltip.hover.right title="Range of magnitudes for the brightest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col >
                <b-form-input id="maxMax" size="sm" type="number" v-model="max.max" ></b-form-input>
            </b-col>
        </b-row>
        <br>
        <b-row class="align-middle">
            <b-col >
                <b-form-input id="slopeMin" size="sm" type="number" v-model="slope.min" ></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="slope.min" min="0" type="number" :max="slope.max" id="minSlopeAny"></input> -->
            </b-col>
            <b-col class="text-center"> Slope <v-icon v-b-tooltip.hover.right title="Range of allowed slopes between each consecutive pair of alerts of a source." name="info-circle" color="#C0C0C0"></v-icon> <br><small class="text-muted">(mag/day)</small></b-col>
            <b-col >
                <b-form-input id="slopeMax" size="sm" type="number" v-model="slope.max" ></b-form-input>
            </b-col>
        </b-row>
        <br>
        <b-row class="align-middle">
            <b-col >
                <b-form-input id="meanMin" size="sm" type="number" v-model="mean.min" ></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="mean.min" min="0" type="number" :max="mean.max" id="minMeanAny"></input> -->
            </b-col>
            <b-col class="text-center"> Mean <v-icon v-b-tooltip.hover.right title="Range of values for the mean magnitude of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col >
                <b-form-input id="meanMax" size="sm" type="number" v-model="mean.max" ></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="mean.max" :min="mean.min" type="number" id="maxMeanAny"></input> -->
            </b-col>
        </b-row>
        <br>
        <b-row class=" align-middle">
            <b-col>
                <b-form-input id="rmsMin" size="sm" type="number" v-model="rms.min" ></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="rms.min" min="0" type="number" :max="rms.max" id="minRmsAny"></input> -->
            </b-col>
            <b-col class="text-center"> RMS </b-col>
            <b-col>
                <b-form-input id="rmsMax" size="sm" type="number" v-model="rms.max" ></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="rms.max" :min="rms.min" type="number" id="maxRmsAny"></input> -->
            </b-col>
        </b-row>

        <br>
        <b-row class="align-middle">
            <b-col >
                <b-form-input id="lastMin" size="sm" type="number" v-model="last.min" ></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="last.min" min="0" type="number" :max="last.max" id="minlastU"></input> -->
            </b-col>
            <b-col class="text-center"> Last detected magn. <v-icon v-b-tooltip.hover.right title="Range of values for the magnitude of the latest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col >
                <b-form-input id="lastMax" size="sm" type="number" v-model="last.max"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="last.max" :min="last.min" type="number" id="maxlastU"></input> -->
            </b-col>
        </b-row>

        </div>
</template>

<script>
    /**
     * component update prop band with form
     */
    export default {
        name: "tab-band",
        props: ['band'],
        data(){
            return{
                min: {
                    min: null,
                    max: null
                },
                max: {
                    min: null,
                    max: null
                },
                slope: {
                    min: null,
                    max: null
                },
                mean: {
                    min: null,
                    max: null
                },
                rms: {
                    min: null,
                    max: null
                },
                last: {
                    min: null,
                    max: null
                }
            }
        }
    }
</script>
