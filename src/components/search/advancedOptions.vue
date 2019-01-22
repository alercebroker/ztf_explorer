<template>
    <div>
        <magnitude-options/>
        <date-options/>
        <coordinate-options/>
    </div>
</template>

<script>
    import magnitudeOptions from './magnitudeOptions.vue';
    import dateOptions from './dateOptions.vue';
    import coordinateOptions from './coordinateOptions.vue';
    export default {
        name: "advanced-options",
        components: {
            magnitudeOptions,
            dateOptions,
            coordinateOptions,
        }
    }
</script>

<style scoped>

</style>