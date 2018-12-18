<template>
    <div>
        <b-row class="align-middle">
            <b-col  class="text-center small">min</b-col>
            <b-col class="text-center"> </b-col>
            <b-col  class="text-center small">max</b-col>
        </b-row><hr>
        <b-row class="align-middle">
            <b-col >
                <b-form-input id="minMinAny" size="sm" type="number" v-model="band.min.min" min="0" :max="band.min.max"></b-form-input>
            </b-col>
            <b-col class="text-center"> Min magnitude <v-icon v-b-tooltip.hover.right title="Range of magnitudes for the dimmest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col >
                <b-form-input id="maxMinAny" size="sm" type="number" v-model="band.min.max" :min="band.min.min"></b-form-input>
            </b-col>
        </b-row>
        <br>
        <b-row class="align-middle">
            <b-col >
                <b-form-input id="minMaxAny" size="sm" type="number" v-model="band.max.min" min="0" :max="band.max.max"></b-form-input>
            </b-col>
            <b-col class="text-center"> Max magnitude <v-icon v-b-tooltip.hover.right title="Range of magnitudes for the brightest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col >
                <b-form-input id="maxMaxAny" size="sm" type="number" v-model="band.max.max" :min="band.max.min"></b-form-input>
            </b-col>
        </b-row>
        <br>
        <b-row class="align-middle">
            <b-col >
                <b-form-input id="minSlopeAny" size="sm" type="number" v-model="band.slope.min" :max="band.slope.max"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.slope.min" min="0" type="number" :max="band.slope.max" id="minSlopeAny"></input> -->
            </b-col>
            <b-col class="text-center"> Slope <v-icon v-b-tooltip.hover.right title="Range of allowed slopes between each consecutive pair of alerts of a source." name="info-circle" color="#C0C0C0"></v-icon> <br><small class="text-muted">(mag/day)</small></b-col>
            <b-col >
                <b-form-input id="maxSlopeAny" size="sm" type="number" v-model="band.slope.max" :min="band.slope.min"></b-form-input>
            </b-col>
        </b-row>
        <br>
        <b-row class="align-middle">
            <b-col >
                <b-form-input id="minMeanAny" size="sm" type="number" v-model="band.mean.min" min="0" :max="band.mean.max"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.mean.min" min="0" type="number" :max="band.mean.max" id="minMeanAny"></input> -->
            </b-col>
            <b-col class="text-center"> Mean <v-icon v-b-tooltip.hover.right title="Range of values for the mean magnitude of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col >
                <b-form-input id="maxMeanAny" size="sm" type="number" v-model="band.mean.max" :min="band.mean.min"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.mean.max" :min="band.mean.min" type="number" id="maxMeanAny"></input> -->
            </b-col>
        </b-row>
        <br>
        <b-row class=" align-middle">
            <b-col>
                <b-form-input id="minRmsAny" size="sm" type="number" v-model="band.rms.min" min="0" :max="band.rms.max"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.rms.min" min="0" type="number" :max="band.rms.max" id="minRmsAny"></input> -->
            </b-col>
            <b-col class="text-center"> RMS </b-col>
            <b-col>
                <b-form-input id="maxRmsAny" size="sm" type="number" v-model="band.rms.max" :min="band.rms.min"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.rms.max" :min="band.rms.min" type="number" id="maxRmsAny"></input> -->
            </b-col>
        </b-row>

        <br>
        <b-row class="align-middle">
            <b-col >
                <b-form-input id="minLastmagU" size="sm" type="number" v-model="band.lastmag.min" min="0" :max="band.lastmag.max"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.lastmag.min" min="0" type="number" :max="band.lastmag.max" id="minLastmagU"></input> -->
            </b-col>
            <b-col class="text-center"> Last detected magn. <v-icon v-b-tooltip.hover.right title="Range of values for the magnitude of the latest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col >
                <b-form-input id="maxLastmagU" size="sm" type="number" v-model="band.lastmag.max" :min="band.lastmag.min"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.lastmag.max" :min="band.lastmag.min" type="number" id="maxLastmagU"></input> -->
            </b-col>
        </b-row>

        </div>
</template>

<script>
    /**
     * component update prop band with form
     */
    export default {
        name: "tabBand",
        props: ['band']
    }
</script>
