<template>
    <div name="bands" class="mb-3">
        <h3>Magnitude</h3>
        <div class="checkbox my-3">
            <b-form-group>
                <b-form-checkbox
                    plain
                    stacked
                    id="anyBand"
                    v-on:click="anyBand = !anyBand"
                    v-model="anyBand"
                >
                    Any band
                </b-form-checkbox>
                <v-icon
                    v-b-tooltip.hover.right
                    class="mb-1"
                    title="Search using magnitude criteria that are not specific by color filter"
                    name="info-circle"
                    color="#C0C0C0"
                ></v-icon>
            </b-form-group>
        </div>
        <transition name="fade">
            <b-card no-body id="magnitudTab">
                <b-tabs card v-show="anyBand">
                    <b-tab title="Any band">
                        <tab-band band="any"></tab-band>
                    </b-tab>
                </b-tabs>
                <b-tabs card v-show="!anyBand" v-model="selectedBand">
                    <b-tab v-for="band in bands" :key="band" :title="band">
                        <tab-band :band="band"></tab-band>
                    </b-tab>
                </b-tabs>
            </b-card>
        </transition>
    </div>
</template>

<script>
    import tabBand from './tabBand.vue';
    export default {
        components: {
            tabBand
        },
        name: "magnitude-options",
        data(){
            return{
                selectedBand: 0,
                anyBand: false,
                //bands: ['u','g','r','i','z','y'],
                bands: ['g','r']
            }
        }
    }
</script>

<style scoped>

</style>