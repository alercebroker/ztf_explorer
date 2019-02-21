<template>
    <div>
        <!-- OBJECT ID -->
        <b-row class="mb-3">
            <b-col cols="4">
                <label for="oid">
                    <b>Object ID</b>
                    <v-icon
                        class="ml-2"
                        v-b-tooltip.hover.right
                        title="Unique ID for each object in ALeRCE database"
                        name="info-circle"
                        color="#C0C0C0"
                    ></v-icon>
                </label>
            </b-col>
                <b-col cols="8">
                    <input
                    type="text"
                    class="form-control form-control-sm"
                    id="oid"
                    v-model="oid"
                    :disabled="loading"
                    >
                </b-col>
        </b-row>
        <!-- CLASS -->
        <b-row class="mb-3">
            <b-col cols="2">
                <label for="class">
                    <b>Class</b>
                    <v-icon
                    class="ml-2"
                    v-b-tooltip.hover.right
                    title="Return objects of a certain class. Each object belongs to its most likely class according to a classification model."
                    name="info-circle"
                    color="#C0C0C0"
                    ></v-icon>
                </label>
            </b-col>
            <b-col cols="3">
                <b-form-select
                    class="form-control form-control-sm"
                    id="class"
                    v-model="selectedClass"
                    :options="$store.state.search.classes"
                />
            </b-col>
            <b-col cols="3">
                <label for="classifier">
                    <b>Classifier</b>
                    <v-icon
                    class="ml-2"
                    v-b-tooltip.hover.right
                    title="Classification Model Used"
                    name="info-circle"
                    color="#C0C0C0"
                    ></v-icon>
                </label>
            </b-col>
            <b-col cols="4">
                <b-form-select
                    class="form-control form-control-sm"
                    id="classifier"
                    v-model="selectedClassifier"
                    :options="$store.state.search.classifiers"
                />
            </b-col>
        </b-row>
        <b-row class="mb-3" cols="6" v-if="selectedClassifier == 'classrf' || selectedClassifier == 'classrnn'">
            <b-col >
                <label for="probability">
                    <b>Probability</b>
                    <v-icon
                    class="ml-2"
                    v-b-tooltip.hover.right
                    title="Minimum probability obtained by the machine learning algorithm"
                    name="info-circle"
                    color="#C0C0C0"
                    ></v-icon>
                </label>
            </b-col>
            <b-col cols="2" >
                &ge;
            </b-col>
            <b-col >
                <input
                    type="text"
                    class="form-control form-control-sm"
                    id="probability"
                    v-model="probability"
                    :disabled="loading"
                    >
            </b-col>
        </b-row>
        <!-- NUMBER OF ALERTS -->
        <b-row class="mb-2">
            <b-col cols="4">
                <b>Number of alerts</b>
                <v-icon
                    v-b-tooltip.hover.right
                    class="ml-3"
                    title="Number of alerts associated with an object"
                    name="info-circle"
                    color="#C0C0C0"
                ></v-icon>
            </b-col>
            <b-col cols="4">
                <b-row>
                    <b-col cols="3" class="text-left">
                        <label>Min</label>
                    </b-col>
                    <b-col cols="9" class="text-left">
                        <input
                            class="form-control form-control-sm"
                            id="minnobs"
                            type="number"
                            min="0"
                            v-model="nobsMin"
                            :disabled="loading"
                        >
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="4">
                <b-row>
                    <b-col cols="3" class="text-left">
                        <label>Max</label>
                    </b-col>
                    <b-col cols="9" class="text-left">
                        <input
                            class="form-control form-control-sm"
                            id="maxnobs"
                            type="number"
                            v-model="nobsMax"
                            :min="nobsMin"
                            :disabled="loading"
                        >
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        
        <b-card no-body class="mb-3">
            <b-tabs card>
                <b-tab title="Dates" active>
                    <date-options/>
                </b-tab>
                <b-tab title="Coordinates">
                    <coordinate-options/>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
    import dateOptions from './dateOptions.vue';
    import coordinateOptions from './coordinateOptions.vue';
    export default {
        name: "default-options",
        props: ['loading'],
        components: {
            dateOptions,
            coordinateOptions,
        },
        data(){
            return {
                
            }
        },
        props: ['loading'],
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
                get(){
                    return this.$store.state.search.filters.oid;
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "filters",
                        keyPath: ["oid"],
                        value: value
                    })
                }
            },
            nobsMin: {
                get(){
                    return this.$store.state.search.filters.nobs ? this.$store.state.search.filters.nobs.min : null;
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "filters",
                        keyPath: ["nobs","min"],
                        value: value
                    })
                }
            },
            nobsMax: {
                get(){
                    return this.$store.state.search.filters.nobs ? this.$store.state.search.filters.nobs.max : null;
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "filters",
                        keyPath: ["nobs","max"],
                        value: value
                    })
                }
            },
            probMin: {
                get(){
                    return this.$store.state.search.filters.pclass ? this.$store.state.search.filters.pclass.min : null;
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "filters",
                        keyPath: ["pclass","min"],
                        value: value
                    })
                }
            },
            probMax: {
                get(){
                    return this.$store.state.search.filters.pclass ? this.$store.state.search.filters.pclass.max : null;
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "filters",
                        keyPath: ["pclass","max"],
                        value: value
                    })
                }
            },
            periodMin: {
                get(){
                    return this.$store.state.search.filters.period ? this.$store.state.search.filters.period.min : null;
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "filters",
                        keyPath: ["period","min"],
                        value: value
                    })
                }
            },
            periodMax: {
                get(){
                    return this.$store.state.search.filters.period ? this.$store.state.search.filters.period.max : null;
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "filters",
                        keyPath: ["period","max"],
                        value: value
                    })
                }
            },
            crossmatch: {
                get(){
                    return this.$store.state.search.filters.ext
                },
                set(value){
                    this.$store.dispatch('updateOptions', {
                        obj: "filters",
                        keyPath: ["ext"],
                        value: value
                    })
                }
            },
            selectedClassifier: {
                get(){
                    return this.$store.state.search.selectedClassifier;
                },
                set(value){
                    this.$store.dispatch('setClassifier', value);
                }
            },
            selectedClass: {
                get(){
                    return this.$store.state.search.selectedClass;
                },
                set(value){
                    this.$store.dispatch('setClass', value);
                }
            },
            classifiers(){
                return this.$store.state.search.classifiers;
            },
            classes(){
                return this.$store.state.search.classes;
            },
            probability:{
                get(){
                    return this.$store.state.search.probability;
                },
                set(value){
                    this.$store.dispatch('setProbability', value);
                }
            }
        },
        watch: {
            classOptions(newVal){
                return this.$store.state.search.classes;
            }
        },
        methods:{
            
        }
        
    }
</script>

<style scoped>

</style>