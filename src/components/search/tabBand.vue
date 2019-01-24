<template>
    <div>
        <b-row class="mb-3">
            <b-col cols="4" class="text-center small">min</b-col>
            <b-col cols="4" class="text-center"> </b-col>
            <b-col cols="4" class="text-center small">max</b-col>
        </b-row><hr>
        <b-row class="mb-3">
            <b-col cols="4">
                <input id="minMin" class="form-control form-control-sm" type="number" v-model="minMin"/>
            </b-col>
            <b-col cols="4" class="text-center"> Min magnitude <v-icon v-b-tooltip.hover.right title="Range of magnitudes for the dimmest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col cols="4" >
                <input id="minMax" class="form-control form-control-sm" type="number" v-model="minMax"/>
            </b-col>
        </b-row>
        <br>
        <b-row class="mb-3">
            <b-col cols="4">
                <input id="maxMin" class="form-control form-control-sm" type="number" v-model="maxMin"/>
            </b-col>
            <b-col cols="4" class="text-center"> Max magnitude <v-icon v-b-tooltip.hover.right title="Range of magnitudes for the brightest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col cols="4">
                <input id="maxMax" class="form-control form-control-sm" type="number" v-model="maxMax" />
            </b-col>
        </b-row>
        <br>
        <b-row class="mb-3">
            <b-col cols="4">
                <input id="slopeMin" class="form-control form-control-sm" type="number" v-model="slopeMin" />
                <!-- <input class="form-control form-control-sm" v-model="slope.min" min="0" type="number" :max="slope.max" id="minSlopeAny"/> -->
            </b-col>
            <b-col cols="4" class="text-center"> Slope <v-icon v-b-tooltip.hover.right title="Range of allowed slopes between each consecutive pair of alerts of a source." name="info-circle" color="#C0C0C0"></v-icon> <br><small class="text-muted">(mag/day)</small></b-col>
            <b-col cols="4">
                <input id="slopeMax" class="form-control form-control-sm" type="number" v-model="slopeMax" />
            </b-col>
        </b-row>
        <br>
        <b-row class="mb-3">
            <b-col cols="4">
                <input id="meanMin" class="form-control form-control-sm" type="number" v-model="meanMin" />
                <!-- <input class="form-control form-control-sm" v-model="mean.min" min="0" type="number" :max="mean.max" id="minMeanAny"/> -->
            </b-col>
            <b-col cols="4" class="text-center"> Mean <v-icon v-b-tooltip.hover.right title="Range of values for the mean magnitude of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col cols="4">
                <input id="meanMax" class="form-control form-control-sm" type="number" v-model="meanMax" />
                <!-- <input class="form-control form-control-sm" v-model="mean.max" :min="mean.min" type="number" id="maxMeanAny"/> -->
            </b-col>
        </b-row>
        <br>
        <b-row class=" mb-3">
            <b-col cols="4">
                <input id="rmsMin" class="form-control form-control-sm" type="number" v-model="rmsMin" />
                <!-- <input class="form-control form-control-sm" v-model="rms.min" min="0" type="number" :max="rms.max" id="minRmsAny"/> -->
            </b-col>
            <b-col cols="4" class="text-center"> RMS </b-col>
            <b-col cols="4">
                <input id="rmsMax" class="form-control form-control-sm" type="number" v-model="rmsMax" />
                <!-- <input class="form-control form-control-sm" v-model="rms.max" :min="rms.min" type="number" id="maxRmsAny"/> -->
            </b-col>
        </b-row>

        <br>
        <b-row class="mb-3">
            <b-col cols="4">
                <input id="lastMin" class="form-control form-control-sm" type="number" v-model="lastMin" />
                <!-- <input class="form-control form-control-sm" v-model="last.min" min="0" type="number" :max="last.max" id="minlastU"/> -->
            </b-col>
            <b-col cols="4" class="text-center"> Last detected magn. <v-icon v-b-tooltip.hover.right title="Range of values for the magnitude of the latest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col cols="4">
                <input id="lastMax" class="form-control form-control-sm" type="number" v-model="lastMax"/>
                <!-- <input class="form-control form-control-sm" v-model="last.max" :min="last.min" type="number" id="maxlastU"/> -->
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
        computed: {
            minMin: {
                get(){
                    return this.$store.state.search.bands.min ? this.$store.state.search.bands.min.min : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"min","min"],
                        value: value
                    })
                }
            },
            minMax: {
                get(){
                    return this.$store.state.search.bands.min ? this.$store.state.search.bands.min.max : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"min","max"],
                        value: value
                    })
                }
            },
            maxMin: {
                get(){
                    return this.$store.state.search.bands.max ? this.$store.state.search.bands.max.min : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"max","min"],
                        value: value
                    })
                }
            },
            maxMax:{
                get(){
                    return this.$store.state.search.bands.max ? this.$store.state.search.bands.max.max : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"max","max"],
                        value: value
                    })
                }
            },
            slopeMin: {
                get(){
                    return this.$store.state.search.bands.slope ? this.$store.state.search.bands.slope.min : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"slope","min"],
                        value: value
                    })
                }
            },
            slopeMax:{
                get(){
                    return this.$store.state.search.bands.slope ? this.$store.state.search.bands.slope.max : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"slope","max"],
                        value: value
                    })
                }
            },
            meanMin: {
                get(){
                    return this.$store.state.search.bands.mean ? this.$store.state.search.bands.mean.min : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"mean","min"],
                        value: value
                    })
                }
            },
            meanMax: {
                get(){
                    return this.$store.state.search.bands.mean ? this.$store.state.search.bands.mean.max : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"mean","max"],
                        value: value
                    })
                }
            },
            rmsMin: {
                get(){
                    return this.$store.state.search.bands.rms ? this.$store.state.search.bands.rms.min : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"rms","min"],
                        value: value
                    })
                }
            },
            rmsMax:{
                get(){
                    return this.$store.state.search.bands.rms ? this.$store.state.search.bands.rms.max : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"rms","max"],
                        value: value
                    })
                }
            },
            lastMin: {
                get(){
                    return this.$store.state.search.bands.lastmag ? this.$store.state.search.bands.lastmag.min : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"lastmag","min"],
                        value: value
                    })
                }
            },
            lastMax:{
                get(){
                    return this.$store.state.search.bands.lastmag ? this.$store.state.search.bands.lastmag.max : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "bands",
                        keyPath: [this.band,"lastmag","max"],
                        value: value
                    })
                }
            }
        }
    }
</script>
