<template>
    <div id="aladin-lite-div"  />
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
            this.aladin = A.aladin('#aladin-lite-div', {survey: "P/PanSTARRS/DR1/color-z-zg-g", fov:0.03, cooFrame: "J2000d"});
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
            }
        }
    }
</script>

<style scoped>
#aladin-lite-div{
  height:"100%";
  width:"100%";
  min-height: 200px;

}
</style>
