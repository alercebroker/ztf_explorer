<template>
    <div>
        <v-layout row wrap>
            <!--Object ID-->
            <v-flex xs12 sm12 md12>
                <v-text-field label="Object ID" v-model="oid" />
            </v-flex>
            <!--Classifier-->
            <v-flex xs12 sm12 md6>
                <v-combobox
                    :items="$store.state.search.classifiers"
                    v-model="selectedClassifier"
                    label="Classifier"
                    clearable
                    hide-no-data
                ></v-combobox>
            </v-flex>
            <!--Class-->
            <v-flex xs12 sm12 md6>
                <v-combobox
                    :items="$store.state.search.classes"
                    label="Class"
                    small-chips
                    deletable-chips
                    hide-no-data
                ></v-combobox>
            </v-flex>
            <!--Probabilities-->
            <v-flex
                xs12
                sm12
                md12
                v-if="selectedClassifier && selectedClassifier.value!=='classxmatch'"
            >
                <v-slider
                    v-model="probability"
                    label="Probability"
                    color="#E0E0E0"
                    track-color="blue"
                    thumb-color="blue"
                ></v-slider>
            </v-flex>
            <!--Detections-->
            <v-flex>
                <v-subheader>Number of detections range</v-subheader>
                <v-card-text>
                    <v-layout row>
                        <v-flex shrink>
                            <v-text-field
                                class="mt-0"
                                hide-details
                                single-line
                                type="number"
                                v-model="nobsMin"
                                placeholder="min"
                            ></v-text-field>
                        </v-flex>

                        <v-flex class="px-3">
                            <v-range-slider v-model="nobs" :max="1000" :min="0" :step="1"></v-range-slider>
                        </v-flex>

                        <v-flex shrink>
                            <v-text-field
                                class="mt-0"
                                hide-details
                                single-line
                                type="number"
                                placeholder="max"
                                v-model="nobsMax"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: "default-options",
    props: ["loading"],
    components: {},
    data() {
        return {};
    },
    computed: {
        /**
         * Here, each computed property gets the state of a given parameter and sets it as the view changes
         * To set the value, we dispatch an action that sets an object inside the state with a specified value
         * If the object is nested we pass an array with the path to the parameter inside the object.
         * for example: If we update the min value of the number of alerts property we need to pass 3 arguments to the action
         * The object we are updating wich is "filters"
         * The path to the nested attribute as array : ["nobs","min"]
         * and the value
         */
        oid: {
            get() {
                return this.$store.state.search.filters.oid;
            },
            set(value) {
                this.$store.dispatch("updateOptions", {
                    obj: "filters",
                    keyPath: ["oid"],
                    value: value
                });
            }
        },
        nobs: {
            get() {
                return this.$store.state.search.nobsRange;
            },
            set(value) {
                this.$store.dispatch("setNobsRange", value);
            }
        },
        nobsMin: {
            get() {
                return this.$store.state.search.filters.nobs
                    ? this.$store.state.search.filters.nobs.min
                    : null;
            },
            set(value) {
                this.$store.dispatch("setNobsRange", [value, this.nobsMax]);
            }
        },
        nobsMax: {
            get() {
                return this.$store.state.search.filters.nobs
                    ? this.$store.state.search.filters.nobs.max
                    : null;
            },
            set(value) {
                this.$store.dispatch("setNobsRange", [this.nobsMin, value]);
            }
        },
        selectedClassifier: {
            get() {
                return this.$store.state.search.selectedClassifier;
            },
            set(value) {
                console.log("VALUE", value);
                this.$store.dispatch("setClassifier", value);
            }
        },
        selectedClass: {
            get() {
                return this.$store.state.search.selectedClass;
            },
            set(value) {
                this.$store.dispatch("setClass", value);
            }
        },
        classifiers() {
            return this.$store.state.search.classifiers;
        },
        classes() {
            return this.$store.state.search.classes;
        },
        probability: {
            get() {
                return this.$store.state.search.probability;
            },
            set(value) {
                this.$store.dispatch("setProbability", value);
            }
        }
    },
    methods: {}
};
</script>
