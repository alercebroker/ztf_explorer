<template>
    <b-card>
        <b-tabs content-class="mt-3">
            <b-tab title="XMATCH" active>
                <treemapclass classifier="1"/>
            </b-tab>
            <b-tab title="Random Forest"><p>I'm the second tab content</p></b-tab>
            <b-tab title="Recurrent Neuronal Net"><p>Disabled tab!</p></b-tab>
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

