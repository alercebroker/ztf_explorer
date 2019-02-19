<template>
    <div id="bokeh"></div>
</template>

<script>
export default {
    name: "tabBokeh",
    mounted(){
        this.$store.dispatch('getPlot').then(item => {
            //item = JSON.parse(item);
            Bokeh.embed.embed_item(item, "bokeh");
        });
    }
}
</script>

<style>

</style>
