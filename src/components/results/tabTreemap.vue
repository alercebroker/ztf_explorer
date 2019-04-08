<template>
    <b-card>
        <b-tabs content-class="mt-3">
            <b-tab title="XMATCH" active>
                <treemapclass v-bind:classifier="1"/>
            </b-tab>
            <b-tab title="Random Forest">
                <treemapclass v-bind:classifier="2"/>
            </b-tab>
            <b-tab title="Recurrent Neuronal Net">
                <treemapclass v-bind:classifier="3"/>
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
    }
}
</script>

