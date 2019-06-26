<template>
    <b-card>
        <b-tabs content-class="mt-3">
            <b-tab 
                v-for="(value, name, index) in probabilities" 
                v-bind:key="index"
                :title="name">
                    <line-class :classifier="name" :probabilities="value"/>
                </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
import lineClass from "../plots/LineClass.vue";
export default {
    components: {
        lineClass
    },
    computed: {
        probabilities() {
            return this.$store.state.results.objectDetails.probabilities;
        }
    }
};
</script>

<style>
</style>
