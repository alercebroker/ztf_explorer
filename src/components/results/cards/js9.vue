<template>
    <div>
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
    </div>
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
            var stamps = [
                { "stamp":"cutoutScience","target":"JS9Sci" },
                { "stamp":"cutoutTemplate","target":"JS9Tpl" },
                { "stamp":"cutoutDifference","target":"JS9Dif" },
            ];

            function setZoom(display) {
                JS9.SetZoom('ToFit', {display: display});
            }
            
            jQuery.each(stamps, function() { 
                var stamp_key = this.stamp;
                var target    = this.target;
                // aqui va la url del servicio de imagenes fits
                var url="http://alerce.reuna.cl/indexer-api/GetAlertStamps?oid="+object_id+"&candid="+candid+"&stamp_keys="+stamp_key;
                JS9.Preload(url, {scale: 'log', onload: setZoom},  {display: target});    
            });
        },
        watch:{
        },
        computed: {
            stampnames() {
                 return {
                    object_id: this.$store.state.results.selectedObject ? this.$store.state.results.selectedObject.object_id : null,
                    candid: this.$store.state.results.selectedObject ? this.$store.state.results.selectedObject.candid : null
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