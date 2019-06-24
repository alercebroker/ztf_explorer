<template>
    <div name="dates">
        <b-row name="JD">
            <b-col cols="4"></b-col>
            <b-col cols="4">
                <p class="small">Modified Julian Date</p>
            </b-col>
            <b-col cols="4">
                <p class="small">Date</p>
            </b-col>
        </b-row>
        <b-row class="mb-2">
            <b-col cols="4">
                <label>Min</label>
            </b-col>
            <b-col cols="4">
                <b-form-input
                    class="form-control form-control-sm"
                    id="minfirstmjd"
                    name="minfirstmjd"
                    type="number"
                    v-model="minFirstMJD"
                    min="0"
                />
            </b-col>
            <b-col cols="4">
                <b-form-input
                    class="form-control form-control-sm"
                    id="datepickerfirst"
                    name="minfirstgreg"
                    type="date"
                    v-model="minFirstGreg"
                    :max="today"
                />
            </b-col>
        </b-row>
        <b-row class="mb-2">
            <b-col cols="4">
                <label>Max</label>
            </b-col>
            <b-col cols="4">
                <b-form-input
                    class="form-control form-control-sm"
                    id="maxfirstmjd"
                    v-model="maxFirstMJD"
                    type="number"
                    :state="mjdState"
                />
            </b-col>
            <b-col cols="4">
                <b-form-input
                    class="form-control form-control-sm"
                    id="maxfirstgreg"
                    type="date"
                    v-model="maxFirstGreg"
                />
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {jdToGregorian} from '../utils/AstroDates.js';
    import {gregorianToJd} from '../utils/AstroDates.js';
    export default {
        name: "date-options",
        data(){
            return{
                
            }
        },
        methods: {
            
        },
        computed: {
            minFirstMJD: {
                get(){
                    console.log(this.$store.state.search.dates.firstmjd ? this.$store.state.search.dates.firstmjd.min : null)
                    return this.$store.state.search.dates.firstmjd ? this.$store.state.search.dates.firstmjd.min : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                            obj: "dates",
                            keyPath: ["firstmjd", "min"],
                            value: value
                        })
                    this.$store.dispatch('updateOptions', {
                        obj: "dates",
                        keyPath: ["firstGreg", "min"],
                        value: jdToGregorian(value)
                    })
                }
            },
            maxFirstMJD: {
                get(){
                    return this.$store.state.search.dates.firstmjd ? this.$store.state.search.dates.firstmjd.max : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                            obj: "dates",
                            keyPath: ["firstmjd", "max"],
                            value: value
                        })
                    this.$store.dispatch('updateOptions', {
                        obj: "dates",
                        keyPath: ["firstGreg", "max"],
                        value: jdToGregorian(value)
                    })
                }
            },
            minFirstGreg: {
                get(){
                    return this.$store.state.search.dates.firstGreg ? this.$store.state.search.dates.firstGreg.min : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                            obj: "dates",
                            keyPath: ["firstGreg", "min"],
                            value: value
                        })
                    this.$store.dispatch('updateOptions',{
                        obj: "dates",
                        keyPath: ["firstmjd", "min"],
                        value: gregorianToJd(value)
                    })
                }
            },
            maxFirstGreg: {
                get(){
                    return this.$store.state.search.dates.firstGreg ? this.$store.state.search.dates.firstGreg.max : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                            obj: "dates",
                            keyPath: ["firstGreg", "max"],
                            value: value
                        })
                    this.$store.dispatch('updateOptions', {
                        obj: "dates",
                        keyPath: ["firstmjd", "max"],
                        value: gregorianToJd(value)
                    })
                }
            },
            mjdState(){
                if (this.minFirstMJD > 0 && this.maxFirstMJD > 0){
                    if(this.maxFirstMJD > this.minFirstMJD){
                        this.$store.dispatch('setValidDates', true)
                        return null
                    }
                    else{
                        this.$store.dispatch('setValidDates', false)
                        return false
                    }
                }
                else{
                    if (this.maxFirstMJD == "" || this.maxFirstMJD == null) this.$store.dispatch('setValidDates', true)
                }
            },
            today(){
                let date = new Date()
                let formated = date.getFullYear().toString() + "-" +(date.getMonth()+1).toString() + "-" + date.getDate().toString() 
                return formated
            }
        }
    }
</script>

<style scoped>

</style>