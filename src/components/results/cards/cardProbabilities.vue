<template>
    <v-tabs>
            <v-tab v-for="(value, name, index) in probabilities" v-bind:key="index">
                {{name}}
            </v-tab>
            <v-tab-item v-for="(value, name, index) in probabilities" v-bind:key="index">
                <line-class :classifier="name" :probabilities="value" />
            </v-tab-item>
    </v-tabs>
</template>

<script>
import lineClass from "../plots/LineClass.vue";
export default {
    components: {
        lineClass
    },
    computed: {
        probabilities() {
            let probabilities = this.$store.state.results.objectDetails
                .probabilities;
            let ret = {};
            Object.keys(probabilities).forEach(key => {
                if (Object.keys(probabilities[key]).length > 0) {
                    ret[key] = probabilities[key];
                }
            });
            return ret;
        }
    }
};
</script>

<style>
</style>
