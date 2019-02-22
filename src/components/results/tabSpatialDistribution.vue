<template>
   <div id="bokeh" style="width:100%"></div>
</template>

<script>
export default {
    name: "tab-spatial-distribution",
    data(){
        return {
            src: null
        }
    },
    mounted(){
        this.$store.dispatch('getPlot').then(item => {
            Bokeh.embed.embed_item(item, "bokeh");
        });
    }
}
</script>

<style>

</style>
