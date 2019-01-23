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
                    v-model="queryParameters.filters.oid"
                    :disabled="loading"
                    >
                </b-col>
        </b-row>
        <!-- CLASS -->
        <b-row class="mb-3">
            <b-col cols="4">
                <label for="class">
                    <b>Class</b>
                    <v-icon
                    class="ml-2"
                    v-b-tooltip.hover.right
                    title="Return objects of a certain class. Each object belongs to its most likely class according to a classification model. Each class could be divided into subclasses"
                    name="info-circle"
                    color="#C0C0C0"
                    ></v-icon>
                </label>
            </b-col>
            <b-col cols="8">
                <select
                    class="form-control form-control-sm"
                    id="class"
                    v-model="queryParameters.filters.class"
                >
                    <option value selected>All</option>
                    <option value="1">Cepheid</option>
                    <option value="2">Eclipsing Binary</option>
                    <option value="3">RR Lyrae</option>
                    <option value="4">Delta Scuti</option>
                    <option value="5">Long Period Variable</option>
                    <option value="6">Supernova Ia</option>
                    <option value="7">Supernova II</option>
                    <option value="8">Supernova Ibc</option>
                    <option value="9">Super luminous supernova</option>
                    <option value="10">Supernova Iabg</option>
                    <option value="11">Supernova IIn</option>
                </select>
            </b-col>
        </b-row>
        <!-- SUBCLASS -->
        <b-row class="mb-3">
            <b-col cols="4">
                <label for="subclass">
                    <b>Subclass</b>
                </label>
            </b-col>
            <b-col cols="8">
                <select
                    class="form-control form-control-sm"
                    id="subclass"
                    v-model="queryParameters.filters.subclass"
                    disabled
                >
                    <option value selected>All</option>
                    <option value="1">Star</option>
                    <option value="2">Supernova</option>
                    <option value="3">Variable Star</option>
                </select>
            </b-col>
        </b-row>
        <!-- NUMBER OF ALERTS -->
        <b-row class="mb-3">
            <b-col cols="12" class="mb-3 mb-1">
                <b>Number of alerts</b>
                <v-icon
                    v-b-tooltip.hover.right
                    class="ml-3"
                    title="Number of alerts associated with an object"
                    name="info-circle"
                    color="#C0C0C0"
                ></v-icon>
            </b-col>
            <b-col>
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
                            v-model="queryParameters.filters.nobs.min"
                            :disabled="loading"
                        >
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-row>
                    <b-col cols="3" class="text-left">
                        <label>Max</label>
                    </b-col>
                    <b-col cols="9" class="text-left">
                        <input
                            class="form-control form-control-sm"
                            id="maxnobs"
                            type="number"
                            :min="queryParameters.filters.nobs.min "
                            v-model="queryParameters.filters.nobs.max"
                            :disabled="loading"
                        >
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <!-- CLASS PROBABILITY -->
        <b-row class="mb-3">
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
                            v-model="queryParameters.filters.pclass.min"
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
                            :min="queryParameters.filters.pclass.min"
                            max="1"
                            v-model="queryParameters.filters.pclass.max"
                            :disabled="loading"
                        >
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <!-- PERIOD -->
        <b-row>
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
                            v-model.number="queryParameters.filters.period.min"
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
                            :min="queryParameters.filters.period.min"
                            type="number"
                            step="0.1"
                            id="maxperiod"
                            v-model="queryParameters.filters.period.max"
                            :disabled="loading"
                        >
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <!-- HAS CROSSMATCH -->
        <b-row name="ext" class="my-3">
            <b-col cols="12" class="form-check">
                <b-form-group>
                    <b-form-checkbox
                        plain
                        stacked
                        id="ext"
                        v-model="queryParameters.filters.ext"
                        value="1"
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
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "default-options",
        props: ['loading'],
        data(){
            return{
                queryParameters: {
                    filters: {
                        oid: null,
                        class: null,
                        subclass: null,
                        nobs: {
                            min: null,
                            max: null
                        },
                        pclass: {
                            min: null,
                            max: null
                        },
                        period: {
                            min: null,
                            max: null
                        },
                        ext: null
                    }
                }
            }
        },
        computed: {
            oid: {
                get(){

                },
                set(value){

                }
            }
        }
        
    }
</script>

<style scoped>

</style>