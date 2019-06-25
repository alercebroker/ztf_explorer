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
        },
        watch:{
            coordinates(newCoord){
                if(this.aladin)this.aladin.gotoRaDec(newCoord.meanRA, newCoord.meanDEC)
            }
        },
        computed: {
            coordinates(){
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