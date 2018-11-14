<template>
    <div>
        <b-row class="align-middle">
            <b-col md="6">
                <b-row>
                    <b-col md="4" class="text-right">
                        <label for="minAny">Min</label>
                    </b-col>
                    <b-col md="8" class="text-left">
                        <b-form-input id="minAny" size="sm" type="number" v-model="band.min" min="0" :max="band.max"></b-form-input>
                        <!-- <input class="form-control form-control-sm" v-model="band.min" min="0" type="number" :max="band.max" id="minAny"></input> -->
                    </b-col>
                </b-row>
            </b-col>
            <b-col md="6">
                <b-row>
                    <b-col md="4" class="text-right">
                        <label for="maxAny">Max</label>
                    </b-col>
                    <b-col md="8" class="text-left">
                        <b-form-input id="maxAny" size="sm" type="number" v-model="band.max" :min="band.min"></b-form-input>
                        <!-- <input class="form-control form-control-sm" v-model="band.max" :min="band.min" type="number"  id="maxAny"></input> -->
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
                <b-form-input id="minSlopeAny" size="sm" type="number" v-model="band.slope.min" min="0" :max="band.slope.max"></b-form-input>
                <!-- <input class="form-control form-control-sm" v-model="band.slope.min" min="0" type="number" :max="band.slope.max" id="minSlopeAny"></input> -->
            </b-col>
            <b-col md="4" class="text-center"> slope </b-col>
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
            <b-col md="4" class="text-center"> last magn. </b-col>
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

<style scoped>

</style>
