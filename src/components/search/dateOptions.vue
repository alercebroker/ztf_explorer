<template>
    <v-container grid-list-md text-xs-left>
        <v-form ref="form" v-model="validation" lazy-validation>
            <v-layout row wrap>
                <v-flex xs6>
                    <p class="small">Modified Julian Date</p>
                </v-flex>
                <v-flex xs6>
                    <p class="small">Date</p>
                </v-flex>
                <v-flex xs6>
                    <v-text-field
                        label="Min MJD"
                        class="mt-8"
                        v-model="minFirstMJD"
                        min="0"
                        type="number"
                    />
                </v-flex>
                <v-flex xs6>
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="true"
                        lazy
                        transition="scale-transition"
                        offset-y
                        :nudge-right="40"
                        full-width
                        min-width="290px"
                    >
                        <v-text-field
                            v-model="minFirstGreg"
                            label="Min first greg date"
                            prepend-icon="event"
                            readonly
                            slot="activator"
                        ></v-text-field>
                        <v-date-picker
                            v-model="minFirstGreg"
                            no-title
                            scrollable
                            actions
                            first-day-of-week="1"
                            :allowed-dates="minDates"
                        >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Close</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs6>
                    <v-text-field
                        label="Max MJD"
                        class="mt-8"
                        v-model="maxFirstMJD"
                        min="0"
                        type="number"
                    />
                </v-flex>
                <v-flex xs6>
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="true"
                        lazy
                        transition="scale-transition"
                        offset-y
                        :nudge-right="40"
                        full-width
                        min-width="290px"
                    >
                        <v-text-field
                            v-model="maxFirstGreg"
                            label="Max first greg date"
                            prepend-icon="event"
                            readonly
                            slot="activator"
                        ></v-text-field>
                        <v-date-picker
                            v-model="maxFirstGreg"
                            no-title
                            scrollable
                            actions
                            first-day-of-week="1"
                            :allowed-dates="maxDates"
                        >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu2 = false">Close</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
import { jdToGregorian } from "../utils/AstroDates.js";
import { gregorianToJd } from "../utils/AstroDates.js";
export default {
    name: "date-options",
    data() {
        return {
            menu: false,
            menu2: false,
            validation: true
        };
    },
    methods: {
        minDates(val) {
            if (this.maxFirstGreg != null) return val <= this.maxFirstGreg;
            else return val
        },
        maxDates(val){
            if (this.minFirstGreg != null) return val >= this.minFirstGreg;
            else return val
        }
    },
    computed: {
        minFirstMJD: {
            get() {
                return Object.keys(this.$store.state.search.dates.firstmjd)
                    .length > 0
                    ? this.$store.state.search.dates.firstmjd.min
                    : null;
            },
            set(value) {
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstmjd", "min"],
                    value: value
                });
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstGreg", "min"],
                    value: jdToGregorian(value)
                });
            }
        },
        maxFirstMJD: {
            get() {
                return Object.keys(this.$store.state.search.dates.firstmjd)
                    .length > 0
                    ? this.$store.state.search.dates.firstmjd.max
                    : null;
            },
            set(value) {
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstmjd", "max"],
                    value: value
                });
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstGreg", "max"],
                    value: jdToGregorian(value)
                });
            }
        },
        minFirstGreg: {
            get() {
                return Object.keys(this.$store.state.search.dates.firstGreg)
                    .length > 0
                    ? this.$store.state.search.dates.firstGreg.min
                    : null;
            },
            set(value) {
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstGreg", "min"],
                    value: value
                });
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstmjd", "min"],
                    value: gregorianToJd(value)
                });
            }
        },
        maxFirstGreg: {
            get() {
                return Object.keys(this.$store.state.search.dates.firstGreg)
                    .length > 0
                    ? this.$store.state.search.dates.firstGreg.max
                    : null;
            },
            set(value) {
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstGreg", "max"],
                    value: value
                });
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstmjd", "max"],
                    value: gregorianToJd(value)
                });
            }
        }
    }
};
</script>

<style scoped>
</style>