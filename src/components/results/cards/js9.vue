<template>
    <div id="aladin-lite-div"  :style="style" />
</template>

<script>
    export default {
        name: "aladin",
        data(){
            return {
                aladin: null
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