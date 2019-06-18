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
                <label>Start Date</label>
            </b-col>
            <b-col cols="4">
                <input
                    class="form-control form-control-sm"
                    id="firstmjd"
                    v-model="firstmjd"
                    min="0"
                />
            </b-col>
            <b-col cols="4">
                <input
                    class="form-control form-control-sm"
                    id="datepickerfirst"
                    name="firstgreg"
                    type="date"
                    v-model="firstGreg"
                />
            </b-col>
        </b-row>
        <b-row class="mb-2">
            <b-col cols="4">
                <label>End Date</label>
            </b-col>
            <b-col cols="4">
                <input
                    class="form-control form-control-sm"
                    id="lastmjd"
                    v-model="lastmjd"
                />
            </b-col>
            <b-col cols="4">
                <input
                    class="form-control form-control-sm"
                    id="datepickerlast"
                    name="lastMJD"
                    type="date"
                    v-model="lastGreg"
                />
            </b-col>
        </b-row>
        <!-- <b-row>
            <b-col cols="4" class="text-center small">min</b-col>
            <b-col cols="4" class="text-center"></b-col>
            <b-col cols="4" class="text-center small">max</b-col>
        </b-row>
        <b-row>
            <b-col cols="4">
                <input
                    class="form-control form-control-sm"
                    id="minjd"
                    v-model="deltamin"
                />
            </b-col>
            <b-col cols="4" class="text-center">First to Last alert
                <v-icon
                    v-b-tooltip.hover.right
                    class="mb-1 mx-1"
                    title="Time between the first alert and the last alert associated with an object"
                    name="info-circle"
                    color="#C0C0C0"
                />
                <small class="text-muted">(days)</small>
            </b-col>
            <b-col cols="4">
                <input
                    class="form-control form-control-sm"
                    id="maxjd"
                    v-model="deltamax"
                />
            </b-col>
        </b-row> -->
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
                //MJD = JD − 2400000.5
                var dateObj = new Date(gDate);
                var mjulianDate = dateObj / 86400000 + 40588;
                return mjulianDate;
            },
        },
        computed: {
            firstmjd: {
                get(){
                    return this.$store.state.search.dates.firstmjd
                },
                set(value){
                    if(!this.$store.state.search.flagFirst){
                        this.$store.dispatch('updateFlag', {
                            flag: "flagFirst",
                            value: true
                        })
                        this.$store.dispatch('updateOptions', {
                            obj: "dates",
                            keyPath: ["firstmjd"],
                            value: value
                        })
                        this.$store.dispatch('updateOptions', {
                            obj: "dates",
                            keyPath: ["firstGreg"],
                            value: this.jdToGregorian(value)
                        })
                    }
                    this.$store.dispatch('updateFlag', {
                    flag: "flagFirst",
                    value: false
                    })
                }
            },
            lastmjd: {
                get(){
                    return this.$store.state.search.dates.lastmjd
                },
                set(value){
                    if(! this.$store.state.search.flagLast){
                        this.$store.dispatch('updateFlag', {
                            flag: "flagLast",
                            value: true
                        })
                        this.$store.dispatch('updateOptions', {
                            obj: "dates",
                            keyPath: ["lastmjd"],
                            value: value
                        })
                        this.$store.dispatch('updateOptions', {
                            obj: "dates",
                            keyPath: ["lastGreg"],
                            value: this.jdToGregorian(value)
                        })
                    }
                    this.$store.dispatch('updateFlag', {
                    flag: "flagLast",
                    value: false
                    })
                }
            },
            firstGreg: {
                get(){
                    return this.$store.state.search.dates.firstGreg
                },
                set(value){
                    if(!this.$store.state.search.flagFirst){
                        this.$store.dispatch('updateFlag', {
                            flag: "flagFirst",
                            value: true
                        })
                        this.$store.dispatch('updateOptions', {
                            obj: "dates",
                            keyPath: ["firstGreg"],
                            value: value
                        })
                        this.$store.dispatch('updateOptions',{
                            obj: "dates",
                            keyPath: ["firstmjd"],
                            value: this.gregorianToJd(value)
                        })
                    }
                    this.$store.dispatch('updateFlag', {
                        flag: "flagFirst",
                        value: false
                        }
                    )
                }
            },
            lastGreg: {
                get(){
                    return this.$store.state.search.dates.lastGreg
                },
                set(value){
                    if(! this.$store.state.search.flagLast){
                        this.$store.dispatch('updateFlag', {
                            flag: "flagLast",
                            value: true
                        })
                        this.$store.dispatch('updateOptions', {
                            obj: "dates",
                            keyPath: ["lastGreg"],
                            value: value
                        })
                        this.$store.dispatch('updateOptions', {
                            obj: "dates",
                            keyPath: ["lastmjd"],
                            value: this.gregorianToJd(value)
                        })
                    }
                    this.$store.dispatch('updateFlag', {
                        flag: "flagLast",
                        value: false
                    })
                }
            },
            deltamin: {
                get(){
                    return this.$store.state.search.dates.deltajd ? this.$store.state.search.dates.deltajd.min : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "dates",
                        keyPath: ["deltajd","min"],
                        value: value
                    })
                }
            },
            deltamax: {
                get(){
                    return this.$store.state.search.dates.deltajd ? this.$store.state.search.dates.deltajd.max : null
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "dates",
                        keyPath: ["deltajd","max"],
                        value: value
                    })
                }
            },
        }
    }
</script>

<style scoped>

</style>