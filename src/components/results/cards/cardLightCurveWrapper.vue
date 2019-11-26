<template>
    <v-row>
        <!--If the screen is mobile-->
        <v-col class="hidden-xs-only">
            <card-light-curve />
        </v-col>
        <!--If the screen is upper-->
        <v-col class="hidden-sm-and-up">
            <v-alert :value="true" type="warning" fluid>
                <span class="title">
                    <v-icon>screen_rotation</v-icon>to see the light curve.
                </span>
            </v-alert>
        </v-col>
    </v-row>
</template>

<script>
import cardLightCurve from "./cardLightCurve.vue"
export default {
    components:{
        cardLightCurve
    }
};
</script>

<style>
</style>