<template>
    <div>
        <b-row class="align-middle">
            <b-col md="4" class="text-center small">min</b-col>
            <b-col md="4" class="text-center"> </b-col>
            <b-col md="4" class="text-center small">max</b-col>
        </b-row><hr>
        <b-row class="align-middle">
            <b-col md="4">
                <b-form-input id="minMinAny" size="sm" type="number" v-model="band.min.min" min="0" :max="band.min.max"></b-form-input>
            </b-col>
            <b-col md="4" class="text-center"> Min </b-col>
            <b-col md="4">
                <b-form-input id="maxMinAny" size="sm" type="number" v-model="band.min.max" :min="band.min.min"></b-form-input>
            </b-col>
        </b-row>
        <br>
        <b-row class="align-middle">
            <b-col md="4">
                <b-form-input id="minMaxAny" size="sm" type="number" v-model="band.max.min" min="0" :max="band.max.max"></b-form-input>
            </b-col>
            <b-col md="4" class="text-center"> Max </b-col>
            <b-col md="4">
                <b-form-input id="maxMaxAny" size="sm" type="number" v-model="band.max.max" :min="band.max.min"></b-form-input>
            </b-col>
        </b-row>
        <br>
        <b-row class="align-middle">
            <b-col md="4">
                <b-form-input id="minSlopeAny" size="sm" type="number" v-model="band.slope.min" :max="band.slope.max"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.slope.min" min="0" type="number" :max="band.slope.max" id="minSlopeAny"></input> -->
            </b-col>
            <b-col md="4" class="text-center"> slope <small class="text-muted">(mag/day)</small></b-col>
            <b-col md="4">
                <b-form-input id="maxSlopeAny" size="sm" type="number" v-model="band.slope.max" :min="band.slope.min"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.slope.max" :min="band.slope.min" type="number" id="maxSlopeAny"></input> -->
            </b-col>
        </b-row>
        <br>
        <b-row class="align-middle">
            <b-col md="4">
                <b-form-input id="minMeanAny" size="sm" type="number" v-model="band.mean.min" min="0" :max="band.mean.max"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.mean.min" min="0" type="number" :max="band.mean.max" id="minMeanAny"></input> -->
            </b-col>
            <b-col md="4" class="text-center"> mean </b-col>
            <b-col md="4">
                <b-form-input id="maxMeanAny" size="sm" type="number" v-model="band.mean.max" :min="band.mean.min"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.mean.max" :min="band.mean.min" type="number" id="maxMeanAny"></input> -->
            </b-col>
        </b-row>
        <br>
        <div class="row align-middle">
            <div class="col-4">
                <b-form-input id="minRmsAny" size="sm" type="number" v-model="band.rms.min" min="0" :max="band.rms.max"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.rms.min" min="0" type="number" :max="band.rms.max" id="minRmsAny"></input> -->
            </div>
            <div class="col-4 text-center"> RMS </div>
            <div class="col-4">
                <b-form-input id="maxRmsAny" size="sm" type="number" v-model="band.rms.max" :min="band.rms.min"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.rms.max" :min="band.rms.min" type="number" id="maxRmsAny"></input> -->
            </div>
        </div>

        <br>
        <b-row class="align-middle">
            <b-col md="4">
                <b-form-input id="minLastmagU" size="sm" type="number" v-model="band.lastmag.min" min="0" :max="band.lastmag.max"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.lastmag.min" min="0" type="number" :max="band.lastmag.max" id="minLastmagU"></input> -->
            </b-col>
            <b-col md="4" class="text-center"> last detected magn. </b-col>
            <b-col md="4">
                <b-form-input id="maxLastmagU" size="sm" type="number" v-model="band.lastmag.max" :min="band.lastmag.min"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.lastmag.max" :min="band.lastmag.min" type="number" id="maxLastmagU"></input> -->
            </b-col>
        </b-row>

        </div>
</template>

<script>
    export default {
        name: "tabBand",
        props: ['band']
    }
</script>
