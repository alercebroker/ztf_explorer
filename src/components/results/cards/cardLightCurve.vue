<template>
    <b-card>
        <light-curve v-if="selected == 0"/>
        <light-curve-corr v-if="selected == 1"/>
        <light-curve-folded v-if="selected == 2"/>
        <b-form-group >
            <b-form-radio-group
                id="radio-group-1"
                v-model="selected"
                :options="options"
                name="radio-options"
            ></b-form-radio-group>
        </b-form-group>
    </b-card>
</template>

<script>
import lightCurveCorr from '../plots/lightCurveCorr'
import lightCurveFolded from '../plots/lightCurveFolded'
import lightCurve from '../plots/lightCurve'
export default {
    name: "card-light-curve",
    components: {
        lightCurveCorr,
        lightCurveFolded,
        lightCurve
    },
    data(){
        return {
            selected: 0,
            options: [
                { text: 'Difference Magnitude', value: 0, checked: true },
                { text: 'Apparent Magnitude', value: 1 },
                { text: 'Folded', value: 2}
            ]
        }
    },

}
</script>

<style>
.overlay {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>