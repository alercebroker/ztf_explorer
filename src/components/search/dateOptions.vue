<template>
    <v-form v-model="validation" lazy-validation>
        <v-layout align-center justify-center fill-height row wrap>
            <v-flex xs6 pl-3 pr-3>
                <v-text-field
                    label="Min MJD"
                    v-model="minFirstMJD"
                    min="0"
                    type="number"
                    step="0.01"
                />
            </v-flex>
            <v-flex xs6 pr-3>
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="computedMinFirstGreg"
                            label="Min first greg date"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-card>
                        <v-date-picker
                            v-model="minFirstGreg"
                            scrollable
                            first-day-of-week="1"
                            :allowed-dates="minDates"
                        ></v-date-picker>
                        <v-time-picker v-model="minFirstTime" format="24hr"></v-time-picker>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="clearMin">Clear</v-btn>
                            <v-btn text color="primary" @click="menu = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-flex>
            <v-flex xs6 pl-3 pr-3>
                <v-text-field
                    label="Max MJD"
                    v-model="maxFirstMjd"
                    min="0"
                    type="number"
                    step="0.01"
                />
            </v-flex>
            <v-flex xs6 pr-3>
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="computedMaxFirstGreg"
                            label="Max first greg date"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-card>
                        <v-date-picker
                            v-model="maxFirstGreg"
                            scrollable
                            actions
                            first-day-of-week="1"
                            :allowed-dates="maxDates"
                        ></v-date-picker>
                        <v-time-picker v-model="maxFirstTime" format="24hr"></v-time-picker>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="clearMax">Clear</v-btn>
                            <v-btn text color="primary" @click="menu2 = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-flex>
        </v-layout>
    </v-form>
</template>

<script>
import { jdToGregorian } from "../utils/AstroDates.js";
import { gregorianToJd } from "../utils/AstroDates.js";
import { jdToDate } from "../utils/AstroDates.js";
export default {
    name: "date-options",
    data() {
        return {
            menu: false,
            menu2: false,
            validation: true,
            minGregDate: null,
            maxGregDate: null,
            minFirstTime: "00:00",
            maxFirstTime: "00:00"
        };
    },
    methods: {
        minDates(val) {
            if (this.maxFirstGreg != null) return val <= this.maxFirstGreg;
            else return val;
        },
        maxDates(val) {
            if (this.minFirstGreg != null) return val >= this.minFirstGreg;
            else return val;
        },
        formatDate(date) {
            if (!date) return null;
            let year = date.getUTCFullYear();
            let month = date.getUTCMonth() + 1;
            let day = date.getUTCDate();
            let hour = date.getUTCHours();
            if (hour < 10) hour = "0" + hour;
            let mins = date.getUTCMinutes();
            if (mins < 10) mins = "0" + mins;
            return `${month}/${day}/${year} ${hour}:${mins}`;
        },
        clearMin() {
            this.minFirstGreg = null;
            this.minFirstTime = "00:00";
        },
        clearMax() {
            this.maxFirstGreg = null;
            this.maxFirstTime = "00:00";
        }
    },
    computed: {
        minFirstMJD: {
            get() {
                return this.$store.state.search.dates.firstmjd
                    ? this.$store.state.search.dates.firstmjd.min
                    : null;
            },
            set(value) {
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstmjd", "min"],
                    value: value
                });
            }
        },
        maxFirstMjd: {
            get() {
                return this.$store.state.search.dates.firstmjd
                    ? this.$store.state.search.dates.firstmjd.max
                    : null;
            },
            set(value) {
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstmjd", "max"],
                    value: value
                });
            }
        },
        minFirstGreg: {
            get() {
                if (!this.minGregDate) return null;
                let year = this.minGregDate.getUTCFullYear();
                let month = this.minGregDate.getUTCMonth();
                let day = this.minGregDate.getUTCDate();
                if(month+1 < 10) month = "0" + (Number(month) + 1)
                else month = month + 1
                return year + "-" + month + "-" + day;
            },
            set(value) {
                let date = null;
                if (value) {
                    const [year, month, day] = value.split("-");
                    const [hour, mins] = this.minFirstTime
                        ? this.minFirstTime.split(":")
                        : [null, null];
                    date = new Date(Date.UTC(year, month - 1, day, hour, mins));
                }
                this.minGregDate = date ? new Date(date.getTime()) : null;
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstmjd", "min"],
                    value: gregorianToJd(date)
                });
            }
        },
        maxFirstGreg: {
            get() {
                if (!this.maxGregDate) return null;
                let year = this.maxGregDate.getUTCFullYear();
                let month = this.maxGregDate.getUTCMonth();
                let day = this.maxGregDate.getUTCDate();
                if(month+1 < 10) month = "0" + (Number(month) + 1)
                else month = month + 1
                return year + "-" + month + "-" + day;
            },
            set(value) {
                let date = null;
                if (value) {
                    const [year, month, day] = value.split("-");
                    const [hour, mins] = this.maxFirstTime
                        ? this.maxFirstTime.split(":")
                        : [null, null];
                    date = new Date(Date.UTC(year, month - 1, day, hour, mins));
                }
                this.maxGregDate = date;
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstmjd", "max"],
                    value: gregorianToJd(this.maxGregDate)
                });
            }
        },
        computedMinFirstGreg() {
            return this.formatDate(this.minGregDate);
        },
        computedMaxFirstGreg() {
            return this.formatDate(this.maxGregDate);
        }
    },
    watch: {
        maxFirstMjd(value) {
            this.maxGregDate = jdToDate(value);
        },
        minFirstMJD(value) {
            console.log("WATCH MINMJD", value)
            this.minGregDate = jdToDate(value);
        },
        minFirstTime(value) {
            let input = null;
            if (this.minGregDate) {
                input =
                    this.minGregDate.getUTCFullYear() +
                    "-" +
                    (this.minGregDate.getUTCMonth() + 1) +
                    "-" +
                    this.minGregDate.getUTCDate();
            }
            this.minFirstGreg = input;
        },
        maxFirstTime(value) {
            let input = null;
            if (this.maxGregDate) {
                input =
                    this.maxGregDate.getUTCFullYear() +
                    "-" +
                    (this.maxGregDate.getUTCMonth() + 1) +
                    "-" +
                    this.maxGregDate.getUTCDate();
            }
            this.maxFirstGreg = input;
        }
    }
};
</script>

<style scoped>
</style>
