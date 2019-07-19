<template>
        <lightcurvePlot></lightcurvePlot>
</template>

<script>
import lightcurvePlot from '../plots/LightCurve'
export default {
    name: "card-light-curve",
    components: {
        lightcurvePlot
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

<style scoped>

</style>
