<template>
    <div id="aladin-lite-div"  :style="style" />
</template>

<script>
    export default {
        name: "aladin",
        props: ['coordinates'],
        data(){
            return {
                aladin: null
            }
        },
        mounted(){
            this.aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:0.1, cooFrame: "J2000d"});
        },
        watch:{
            coordinates(newCoord){
                if(this.aladin)this.aladin.gotoRaDec(newCoord.meanRA, newCoord.meanDEC)
            }
        },
        computed: {
            style(){
                return {
                    'align': "center",
                    'width': "100%",
                    'height': "400px"
                }
            }
        }
    }
</script>

<style scoped>
    
</style>