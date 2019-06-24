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
                <input
                    class="form-control form-control-sm"
                    id="minfirstmjd"
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
                    :state="mjdState"
                />
            </b-col>
            <b-col cols="4">
                <input
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
    export default {
        name: "date-options",
        data(){
            return{
                
            }
        },
        methods: {
            /**
             * receives date in julian format and convert in gregorian format
             * @param MJD:date in julian format
             * @returns {string} : date in gregorian format
             */
            jdToGregorian(MJD) {
                if(MJD === "") return null
                var JD = Number(MJD) + 2400000.5;
                const y = 4716;
                const v = 3;
                const j = 1401;
                const u = 5;
                const m = 2;
                const s = 153;
                const n = 12;
                const w = 2;
                const r = 4;
                const B = 274277;
                const p = 1461;
                const C = -38;
                var f =
                JD + j + Math.floor((Math.floor((4 * JD + B) / 146097) * 3) / 4) + C;
                var e = r * f + v;
                var g = Math.floor((e % p) / r);

                var h = u * g + w;
                var D = Math.floor((h % s) / u) + 1;
                var M = ((Math.floor(h / s) + m) % n) + 1;
                var Y = Math.floor(e / p) - y + Math.floor((n + m - M) / n);

                var day = ("0" + D).slice(-2);
                var month = ("0" + M).slice(-2);
                var year = ("000" + Y).slice(-4);

                var today = year + "-" + month + "-" + day;

                return today;
            },

            /**
             * receives date in gregorian format and convert in julian format
             * @param gDate:date in gregorian format
             * @returns {number} : date in jualian format
             */
            gregorianToJd(gDate) {
                if(gDate === "") return null
                //MJD = JD − 2400000.5
                var dateObj = new Date(gDate);
                var mjulianDate = dateObj / 86400000 + 40588;
                return mjulianDate;
            },
        },
        computed: {
            minFirstMJD: {
                get(){
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
                        value: this.jdToGregorian(value)
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
                        value: this.jdToGregorian(value)
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
                        value: this.gregorianToJd(value)
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
                        value: this.gregorianToJd(value)
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