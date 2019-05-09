<template>
    <b-card>
        <b-tabs content-class="mt-3">
            <b-tab title="XMATCH" active>
                <treemapclass v-bind:classifier="'xmatch'"/>
            </b-tab>
            <b-tab title="Random Forest">
                <treemapclass v-bind:classifier="'rf'"/>
            </b-tab>
            <b-tab title="Recurrent Neural Net">
                <treemapclass v-bind:classifier="'rnn'"/>
            </b-tab>
        </b-tabs>
    </b-card>
</template>
<script>
import treemapclass from "./plots/TreemapClass.vue";
export default {
    name: "tabTreemap",
    components: {
        treemapclass
    },
    mounted(){
        this.$store.dispatch('getClassCounts');
    },
    computed:{
        dataTreemap(){
            return this.$store.state.results.class_counts;
        }
    }
}
</script>

