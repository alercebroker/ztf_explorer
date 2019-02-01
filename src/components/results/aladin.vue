<template>
    <div>
        <div id="aladin-lite-div" :style="style" />
    </div>
</template>

<script>
    export default {
        name: "aladin",
        props: ['coordinates', 'width', 'height'],
        data(){
            return {
                aladin: {}
            }
        },
        mounted(){
            this.aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:0.1, cooFrame: "J2000d"});
        },
        watch:{
            coordinates(newCoord){
                this.aladin.gotoRaDec(newCoord.meanRA, newCoord.meanDEC)
            }
        },
        computed: {
            style(){
                return {
                    'width': this.width,
                    'height': this.height
                }
            }
        }
    }
</script>

<style scoped>

</style>