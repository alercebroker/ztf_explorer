<template>
    <v-card>
        <v-card-text>
            <light-curve v-if="selected == 1" />
            <light-curve-corr v-if="selected == 2" />
            <light-curve-folded v-if="selected == 3" />
        </v-card-text>
        <v-card-actions>
            <v-radio-group v-model="selected" row>
                <v-radio v-for="(option, index) in options" :key="index+1" :label="option" :value="index+1"></v-radio>
            </v-radio-group>
        </v-card-actions>
    </v-card>
</template>

<script>
import lightCurveCorr from "../plots/lightCurveCorr";
import lightCurveFolded from "../plots/lightCurveFolded";
import lightCurve from "../plots/lightCurve";
export default {
    name: "card-light-curve",
    components: {
        lightCurveCorr,
        lightCurveFolded,
        lightCurve
    },
    data() {
        return {
            selected: 1,
        };
    },
    computed: {
        options() {
            return this.$store.state.results.objectDetails.period.periodls_1
                ? ["Difference Magnitude", "Apparent Magnitude", "Folded"]
                : ["Difference Magnitude", "Apparent Magnitude"];
        }
    }
};
</script>

<style>
</style>