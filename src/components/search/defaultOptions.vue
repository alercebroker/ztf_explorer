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
                <select
                    class="form-control form-control-sm"
                    id="class"
                    :value="classs"
                    @input="classSelected"
                >
                    <option value selected>All</option>
                    <option v-for="(option, index) in classOptions" :value="option.id" :key="index">{{option.name}}</option>
                </select>
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
                <select
                    class="form-control form-control-sm"
                    id="classifier"
                    :value="classifier"
                    @input="classifierSelected"
                >
                    <option v-for="(option, index) in classifierOptions" :value="option.dbName" :key="index">{{option.name}}</option>
                </select>
            </b-col>
        </b-row>
        <b-row class="mb-3" cols="6" v-if="classifier != 'classxmatch' && classifier != null">
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
            <b-col >
                <input
                    type="text"
                    class="form-control form-control-sm"
                    id="probability"
                    :value="probability"
                    @input="probabilitySelected"
                    :disabled="loading"
                    >
            </b-col>
        </b-row>
        <!-- SUBCLASS -->
        <!-- <b-row class="mb-3">
            <b-col cols="4">
                <label for="subclass">
                    <b>Subclass</b>
                </label>
            </b-col>
            <b-col cols="8">
                <select
                    class="form-control form-control-sm"
                    id="subclass"
                    v-model="subclass"
                    disabled
                >
                    <option value selected>All</option>
                    <option value="1">Star</option>
                    <option value="2">Supernova</option>
                    <option value="3">Variable Star</option>
                </select>
            </b-col>
        </b-row> -->
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
        <!-- CLASS PROBABILITY -->
        <!-- <b-row class="mb-3">
            <b-col cols="12" class="mb-3">
                <b>Class Probability</b>
                <v-icon
                    v-b-tooltip.hover.right
                    class="ml-3 mb-1"
                    title="Probability of the most likely class given by a classification model"
                    name="info-circle"
                    color="#C0C0C0"
                ></v-icon>
                <div class="text-muted">
                    <small>(From 0.0 to 1.0)</small>
                </div>
            </b-col>
            <b-col>
                <b-row>
                    <b-col cols="3">
                        <label>Min</label>
                    </b-col>
                    <b-col cols="9">
                        <input
                            class="form-control form-control-sm"
                            id="minpclass"
                            type="number"
                            step="0.0001"
                            min="0"
                            max="1"
                            v-model="probMin"
                            :disabled="loading"
                        >
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-row>
                    <b-col cols="3">
                        <label>Max</label>
                    </b-col>
                    <b-col cols="9">
                        <input
                            class="form-control form-control-sm"
                            id="maxpclass"
                            type="number"
                            step="0.0001"
                            max="1"
                            min="0"
                            v-model="probMax"
                            :disabled="loading"
                        >
                    </b-col>
                </b-row>
            </b-col>
        </b-row> -->
        <!-- PERIOD -->
        <!--b-row>
            <b-col cols="12" class="mb-3">
                <b>Period</b>
                <v-icon
                    v-b-tooltip.hover.right
                    class="ml-3 mb-1"
                    title="(For variable stars that have a period) Minimum and maximum desired values for the period"
                    name="info-circle"
                    color="#C0C0C0"
                ></v-icon>
                <div class="text-muted">
                    <small>(days)</small>
                </div>
            </b-col>
            <b-col md="6">
                <b-row>
                    <b-col cols="3">
                        <label>Min</label>
                    </b-col>
                    <b-col cols="9">
                        <input
                            class="form-control form-control-sm"
                            id="minperiod"
                            min="0"
                            type="number"
                            step="0.1"
                            v-model="periodMin"
                            :disabled="loading"
                        >
                    </b-col>
                </b-row>
            </b-col>
            <b-col md="6">
                <b-row>
                    <b-col cols="3">
                        <label>Max</label>
                    </b-col>
                    <b-col cols="9">
                        <input
                            class="form-control form-control-sm"
                            type="number"
                            step="0.1"
                            id="maxperiod"
                            :min="periodMin"
                            v-model="periodMax"
                            :disabled="loading"
                        >
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <br/-->
        <!-- HAS CROSSMATCH -->
        <!-- <b-row name="ext" class="my-3">
            <b-col cols="12" class="form-check">
                <b-form-group>
                    <b-form-checkbox
                        plain
                        stacked
                        id="ext"
                        value="1"
                        v-model="crossmatch"
                        :unchecked-value="null"
                    >
                        Has Crossmatch
                    </b-form-checkbox>
                        <v-icon
                            v-b-tooltip.hover.right
                            class="mb-1"
                            title="Search only objects that are also in another catalog"
                            name="info-circle"
                            color="#C0C0C0"
                        ></v-icon>
                </b-form-group>
            </b-col>
        </b-row> -->
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
                classifierOptions: [
                    {
                        name: "X-MATCH",
                        dbName: "classxmatch"
                    },
                    {
                        name: "ML_RF",
                        dbName: "classrf"
                    },
                    {
                        name:"ML_RNN",
                        dbName:"classrnn"
                    }
                ],
                classifier: null,
                classs: null,
                probability: null
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
            classOptions(){
                return this.$store.state.search.classes;
            }
        },
        watch: {
            classOptions(newVal){
                return this.$store.state.search.classes;
            }
        },
        mounted(){
            this.$store.dispatch('queryClassList')
        },
        methods:{
            classSelected(event){
                this.classs = event.target.value
                if(this.classifier){
                    this.$store.dispatch('updateOptions',{
                        obj: "filters",
                        keyPath: [this.classifier],
                        value: this.classs
                    })
                }
            },
            classifierSelected(event){
                let oldVal = this.classifier
                this.classifier = event.target.value
                if(this.classs){
                    this.$store.dispatch('updateOptions',{
                        obj: "filters",
                        keyPath: [oldVal],
                        value: null
                    })
                    this.$store.dispatch('updateOptions',{
                        obj: "filters",
                        keyPath: ['p' + oldVal],
                        value: null
                    })
                    if(this.classifier != 'classxmatch'){
                        this.$store.dispatch('updateOptions',{
                            obj: "filters",
                            keyPath: ['p' + this.classifier],
                            value: this.probability
                        })
                    }
                    this.$store.dispatch('updateOptions',{
                        obj: "filters",
                        keyPath: [this.classifier],
                        value: this.classs
                    })
                }
            },
            probabilitySelected(event){
                this.probability = event.target.value;
                this.$store.dispatch('updateOptions',{
                        obj: "filters",
                        keyPath: ['p'+this.classifier],
                        value: this.probability
                    })
            }
        }
        
    }
</script>

<style scoped>

</style>