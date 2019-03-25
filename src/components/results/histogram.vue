<template>
    <div id="histContainer">
        <div id="histogram" style="width:100%;height:300px"></div>
    </div>
</template>

<script>
export default {
    name: "tab-spatial-distribution",
    components: {
    },
    props:['type', 'xAxis'],
    data(){
        return {
            
        }
    },
    mounted(){
        if(this.type === "overview"){
            this.$store.dispatch('getOverviewHistogram', this.xAxis);
        }
        else if(this.type === "query"){
            // query histogram
        }
        
    },
    computed:{
        overviewHistogram(){
            return this.$store.state.results.overviewHistogram
        },
        selectedTab(){
            return this.$store.state.selectedTab
        }
    },
    methods:{
        clearDiv(){
            document.getElementById("histContainer").innerHTML = '<div id="histogram" style="width:100%; height:300px"/>'
        }
    },
    watch:{
        overviewHistogram(newVal){
            if(newVal && this.selectedTab===0){
                this.clearDiv();
                Bokeh.embed.embed_item(newVal, "histogram");
            }
        },
        selectedTab(newVal){
            if(newVal === 0 && this.overviewHistogram){
                this.clearDiv();
                Bokeh.embed.embed_item(this.overviewHistogram, "histogram");
            }
        }

    },
}
</script>

<style>

</style>
