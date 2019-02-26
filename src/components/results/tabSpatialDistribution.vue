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
        // this.$store.dispatch('getPlot').then(item => {
        //     Bokeh.embed.embed_item(item, "bokeh");
        // });
    },
    computed:{
        plot(){
            let plot = this.$store.state.results.plot;
            return plot;
        }
    },
    watch:{
        plot(newVal){
            let oldChild = document.getElementById("bokeh");
            let parentNode = oldChild.parentNode
            let newChild = document.createElement("div");
            newChild.setAttribute("id", "bokeh")
            let replacedNode = parentNode.replaceChild(newChild, oldChild);
            if(newVal)Bokeh.embed.embed_item(newVal, "bokeh");
            
        }
    },
}
</script>

<style>

</style>
