<template>
    <div class="overlay">
        <lightcurvePlot></lightcurvePlot>
    </div>
</template>

<script>
import lightcurvePlot from '../plots/LightCurve'
import lightCurveCorr from '../plots/lightCurveCorr'
import lightCurveFolded from '../plots/lightCurveFolded'
import lightCurve from '../plots/lightCurve'
export default {
    name: "card-light-curve",
    components: {
        lightCurveCorr,
        lightCurveFolded,
        lightCurve,
        lightcurvePlot
    },
    data(){
        return {
            selected: 0,
            options: [
                { text: 'Difference Magnitude', value: 0, checked: true },
                { text: 'Apparent Magnitude', value: 1 },
                { text: 'Folded', value: 2}
            ],
            optionsNoFold: [
                { text: 'Difference Magnitude', value: 0, checked: true },
                { text: 'Apparent Magnitude', value: 1 },
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