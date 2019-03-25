<template>
    <div id="histContainer">
        <div id="histogram" style="width:100%;height:300px"/>
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
            this.$store.dispatch('getQueryHistogram', this.xAxis);
        }
        
    },
    computed:{
        overviewHistogram(){
            return this.$store.state.results.overviewHistogram
        },
        queryHistogram(){
            return this.$store.state.results.queryHistogram
        },
        selectedTab(){
            return this.$store.state.selectedTab
        }
    },
    methods:{
        clearDiv(type){
            document.getElementById("histContainer").innerHTML = '<div id="'+type+'Histogram" style="width:100%; height:300px"/>'
        }
    },
    watch:{
        overviewHistogram(newVal){
            if(newVal && this.selectedTab===0){
                this.clearDiv("overview");
                Bokeh.embed.embed_item(newVal, "overviewHistogram");
            }
        },
        queryHistogram(newVal){
            if(newVal && this.selectedTab === 2){
                this.clearDiv("query");
                Bokeh.embed.embed_item(newVal, "queryHistogram")
            }
        },
        selectedTab(newVal){
            if(newVal === 0 && this.overviewHistogram){
                this.clearDiv("overview");
                Bokeh.embed.embed_item(this.overviewHistogram, "overviewHistogram");
            }
            else if(newVal === 2 && this.queryHistogram){
                this.clearDiv("query");
                Bokeh.embed.embed_item(this.queryHistogram, "queryHistogram")
            }
        }

    },
}
</script>

<style>

</style>
