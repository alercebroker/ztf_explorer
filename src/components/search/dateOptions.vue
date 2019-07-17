<template>
    <v-container grid-list-md text-xs-left>
        <v-form v-model="validation" lazy-validation>
            <v-layout row wrap>
                <v-flex xs6>
                    <v-text-field
                        label="Min MJD"
                        class="mt-8"
                        v-model="minFirstMJD"
                        min="0"
                        type="number"
                        step="0.5"
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
                            v-model="computedMinFirstGreg"
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
                            <v-btn flat color="primary" @click="minFirstGreg = null">Clear</v-btn>
                            <v-btn flat color="primary" @click="menu = false">Close</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs6>
                    <v-text-field
                        label="Max MJD"
                        class="mt-8"
                        v-model="maxFirstMjd"
                        min="0"
                        type="number"
                        step="0.5"
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
                            v-model="computedMaxFirstGreg"
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
                            <v-btn flat color="primary" @click="maxFirstGreg = null">Clear</v-btn>
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
            validation: true,
            minGregDate: null,
            maxGregDate: null
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

            const [year, month, day] = date.split("-");
            return `${month}/${day}/${year}`;
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
                this.minGregDate = jdToGregorian(value)
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
                this.maxGregDate = jdToGregorian(value)
            }
        },
        minFirstGreg: {
            get() {
                return this.minGregDate;
            },
            set(value) {
                this.minGregDate = value;
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstmjd", "min"],
                    value: gregorianToJd(value)
                });
            }
        },
        maxFirstGreg: {
            get() {
                return this.maxGregDate;
            },
            set(value) {
                this.maxGregDate = value;
                this.$store.dispatch("updateOptions", {
                    obj: "dates",
                    keyPath: ["firstmjd", "max"],
                    value: gregorianToJd(value)
                });
            }
        },
        computedMinFirstGreg() {
            return this.formatDate(this.minFirstGreg);
        },
        computedMaxFirstGreg() {
            return this.formatDate(this.maxFirstGreg);
        }
    }
};
</script>

<style scoped>
</style>