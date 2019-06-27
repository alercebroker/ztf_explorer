<template>
    <b-container fluid>
        <b-card-group deck class="mb-3">
            <b-card border-variant="light" header="Science" class="text-center">
                <div class="JS9Menubar"></div>
                <div class="JS9" data-width="300px" data-height="300px" style="width: 300px; height: 300px; resize: both; overflow: hidden; position: relative"></div>
                <div class="JS9Colorbar mt-1" ></div>
            </b-card>

            <b-card border-variant="light" header="Template" align="center">
                <div class="JS9Menubar" id="template_Menubar"></div>
                <div class="JS9" id="template" data-width="auto" data-height="auto"></div>
                <div class="JS9Colorbar mt-1"></div>
            </b-card>

            <b-card border-variant="light" header="Difference" align="center">
                <div class="JS9Menubar" id="difference_Menubar"></div>
                <div class="JS9" id="difference" data-width="auto" data-height="auto"></div>
                <div class="JS9Colorbar mt-1"></div>
            </b-card>
        </b-card-group>
    </b-container>
</template>


<script>
export default {
    name: "js9",
    data(){
        return {
            
        }
    },
    mounted(){
        JS9.init();
        
    },
    watch:{
    },
    computed: {
        scienceFits(){
            return "coma.fits.gz"
        },
        images(){
            console.log(JS9.images)
            return "JS9.images"
        }
    }
}
</script>

<style scoped>
    .JS9menubar{
        width: 100%;
    }
</style>