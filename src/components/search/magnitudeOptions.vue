<template>
    <div name="bands">
        <b-form-group class="without-margin">
            <b-row>
                <b-col>
                    <h4>Magnitude</h4>
                </b-col>
                <b-col>
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
                </b-col>
            </b-row>
        </b-form-group>
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
                bands: ['g','r']
            }
        }
    }
</script>

<style scoped>
.without-margin {
    margin-bottom: 0px;
}
</style>