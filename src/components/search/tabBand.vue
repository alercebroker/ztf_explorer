<template>
    <div>
        <!-- <b-row>
            <b-col cols="4" class="text-center small">min</b-col>
            <b-col cols="4" class="text-center"> </b-col>
            <b-col cols="4" class="text-center small">max</b-col>
        </b-row>
        <hr>
        <b-row class="mb-2">
            <b-col cols="4">
                <input id="minMin" class="form-control form-control-sm" type="number" v-model="minMin"/>
            </b-col>
            <b-col cols="4" class="text-center"> Min magnitude <v-icon v-b-tooltip.hover.right title="Range of magnitudes for the brightest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col cols="4" >
                <input id="minMax" class="form-control form-control-sm" type="number" v-model="minMax"/>
            </b-col>
        </b-row>
        
        <b-row class="mb-2">
            <b-col cols="4">
                <input id="maxMin" class="form-control form-control-sm" type="number" v-model="maxMin"/>
            </b-col>
            <b-col cols="4" class="text-center"> Max magnitude <v-icon v-b-tooltip.hover.right title="Range of magnitudes for the dimmest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col cols="4">
                <input id="maxMax" class="form-control form-control-sm" type="number" v-model="maxMax" />
            </b-col>
        </b-row>

        <b-row class="mb-2">
            <b-col cols="4">
                <input id="meanMin" class="form-control form-control-sm" type="number" step="0.01" v-model="meanMin" />
            </b-col>
            <b-col cols="4" class="text-center"> Mean <v-icon v-b-tooltip.hover.right title="Range of values for the mean magnitude of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col cols="4">
                <input id="meanMax" class="form-control form-control-sm" type="number" step="0.01" v-model="meanMax" />
            </b-col>
        </b-row>
        <b-row class="mb-2">
            <b-col cols="4">
                <input id="rmsMin" class="form-control form-control-sm" type="number" step="0.01" v-model="rmsMin" />
            </b-col>
            <b-col cols="4" class="text-center"> RMS <v-icon v-b-tooltip.hover.right title="Root Mean Square" name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col cols="4">
                <input id="rmsMax" class="form-control form-control-sm" type="number" step="0.01" v-model="rmsMax" />
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4">
                <input id="lastMin" class="form-control form-control-sm" type="number" v-model="lastMin" />
            </b-col>
            <b-col cols="4" class="text-center"> Last detected magn. <v-icon v-b-tooltip.hover.right title="Range of values for the magnitude of the latest alert of a source." name="info-circle" color="#C0C0C0"></v-icon></b-col>
            <b-col cols="4">
                <input id="lastMax" class="form-control form-control-sm" type="number" v-model="lastMax"/>
            </b-col>
        </b-row> -->
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
                        keyPath: [this.band,"min_magpsf_","min"],
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
                        keyPath: [this.band,"min_magpsf_","max"],
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
                        keyPath: [this.band,"max_magpsf_","min"],
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
                        keyPath: [this.band,"max_magpsf_","max"],
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
                        keyPath: [this.band,"mean_magpsf_","min"],
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
                        keyPath: [this.band,"mean_magpsf_","max"],
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
                        keyPath: [this.band,"rms_magpsf_","min"],
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
                        keyPath: [this.band,"rms_magpsf_","max"],
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
                        keyPath: [this.band,"lastmag_magpsf_","min"],
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
                        keyPath: [this.band,"lastmag_magpsf_","max"],
                        value: value
                    })
                }
            }
        }
    }
</script>
