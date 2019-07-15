<template>
    <div class="overlay" style="height: 100%; width=100%">
        <lightcurvePlot style="height: 100%; width=100%"></lightcurvePlot>
    </div>
</template>

<script>
import lightcurvePlot from '../plots/LightCurve'
export default {
    name: "card-light-curve",
    components: {
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

<style scoped>
.overlay {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>