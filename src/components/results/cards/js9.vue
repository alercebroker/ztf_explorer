<template>
    <td>
        <h3>Science</h3>
        <div style="width:300px">
            <div class="JS9Menubar" id="JS9SciMenubar" data-width="300px" data-displays="JS9Sci"></div>
            <div class="JS9" id="JS9Sci" data-width="300px" data-height="300px"></div>
            <div style="margin-top: 2px;">
                <div class="JS9Colorbar" id="JS9SciColorbar" data-displays="JS9Sci" data-width="300px"></div>
            </div>
        </div>
    </td>
    <td>
        <h3>Template</h3>
        <div style="width:300px">
            <div class="JS9Menubar" id="JS9TplMenubar" data-width="300px" data-displays="JS9Tpl"></div>
            <div class="JS9" id="JS9Tpl" data-width="300px" data-height="300px"></div>
            <div style="margin-top: 2px;">
                <div class="JS9Colorbar" id="JS9TplColorbar" data-displays="JS9Tpl" data-width="300px"></div>
            </div>
        </div>
    </td>
    <td>
        <h3>Difference</h3>
        <div style="width:300px">
            <div class="JS9Menubar" id="JS9DifMenubar" data-width="300px" data-displays="JS9Dif"></div>
            <div class="JS9" id="JS9Dif" data-width="300px" data-height="300px"></div>
            <div style="margin-top: 2px;">
                <div class="JS9Colorbar" id="JS9DifColorbar" data-displays="JS9Dif" data-width="300px"></div>
            </div>
        </div>
    </td>
</template>

<script>
    export default {
        name: "js9",
        data(){
            return {
                js9: null
            }
        },
        mounted(){
            this.aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:0.1, cooFrame: "J2000d"});
            if(this.coordinates.meanRA && this.coordinates.meanDEC) this.aladin.gotoRaDec(this.coordinates.meanRA, this.coordinates.meanDEC)
            var stamps = [
                { "stamp":"cutoutScience","target":"JS9Sci" },
                { "stamp":"cutoutTemplate","target":"JS9Tpl" },
                { "stamp":"cutoutDifference","target":"JS9Dif" },
            ];
                
            jQuery.each(stamps, function() { 
                var stamp_key = this.stamp;
                var target    = this.target;
                var url="http://alerce.reuna.cl/indexer-api/GetAlertStamps?oid="+object_id+"&candid="+candidate+"&stamp_keys="+stamp_key+"&format=x-fits";
                JS9.Preload(url, {scale: 'log', onload: setZoom},  {display: target});    
            });
        },
        watch:{
        },
        computed: {
            coordinates() {
                return {
                    meanRA: this.$store.state.results.selectedObject ? this.$store.state.results.selectedObject.meanra : null,
                    meanDEC: this.$store.state.results.selectedObject ? this.$store.state.results.selectedObject.meandec : null
                }
            },
            stampsnames() {
                 return {
                    meanRA: this.$store.state.results.selectedObject ? this.$store.state.results.selectedObject.meanra : null,
                    meanDEC: this.$store.state.results.selectedObject ? this.$store.state.results.selectedObject.meandec : null
                }
            },
            style(){
                return {
                    'align': "center",
                    'width': "100%",
                    'height': "100%"
                }
            }
        }
    }
</script>

<style scoped>
    
</style>