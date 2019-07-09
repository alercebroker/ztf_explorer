<template>
    <v-container grid-list-md text-xs-left>
        <v-layout row wrap>
            <v-flex xs6>
                <p class="small">Modified Julian Date</p>
            </v-flex>
            <v-flex xs6>
                <p class="small">Date</p>
            </v-flex>
            <v-flex xs6>
                <v-text-field label="Min MJD" class="mt-8" v-model="minFirstMJD" min="0" type="number"/>
            </v-flex>
            <v-flex xs6>
                <v-text-field label="Min Greg" v-model="minFirstGreg" ></v-text-field>
            </v-flex>
            <v-flex xs6>
                <v-text-field label="Max MJD" class="mt-8" v-model="maxFirstMJD" min="0" type="number"/>
            </v-flex>
            <v-flex xs6>
                <v-text-field label="Min Greg" v-model="maxFirstGreg" ></v-text-field>
            </v-flex>
        </v-layout>
       
    </v-container>
</template>

<script>
import { jdToGregorian } from "../utils/AstroDates.js";
import { gregorianToJd } from "../utils/AstroDates.js";
export default {
    name: "date-options",
    data() {
        return {};
    },
    methods: {},
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
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstGreg", "min"],
                    value: jdToGregorian(value)
                });
            }
        },
        maxFirstMJD: {
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
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstGreg", "max"],
                    value: jdToGregorian(value)
                });
            }
        },
        minFirstGreg: {
            get() {
                return this.$store.state.search.dates.firstGreg
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
                return this.$store.state.search.dates.firstGreg
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
        },
        mjdState() {
            if (this.minFirstMJD > 0 && this.maxFirstMJD > 0) {
                if (this.maxFirstMJD > this.minFirstMJD) {
                    this.$store.dispatch("setValidDates", true);
                    return null;
                } else {
                    this.$store.dispatch("setValidDates", false);
                    return false;
                }
            } else {
                if (this.maxFirstMJD == "" || this.maxFirstMJD == null)
                    this.$store.dispatch("setValidDates", true);
            }
        }
    },
    today() {
        let date = new Date();
        let formated =
            date.getFullYear().toString() +
            "-" +
            (date.getMonth() + 1).toString() +
            "-" +
            date.getDate().toString();
        return formated;
    }
};
</script>

<style scoped>
</style>