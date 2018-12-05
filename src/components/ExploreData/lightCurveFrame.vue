<template>
    <div class="lightCurveFrame">
        <b-row align-h="center">
            <lightCurve :jdates.sync="jdates" :magrs.sync="magrs"
                     :magrErrors.sync="magrErrors" :maggs.sync="maggs" :maggErrors.sync="maggErrors" ref="lightCurve"></lightCurve>
        </b-row>
    </div>
</template>

<script>
    import lightCurve from "./lightCurve.vue";

    export default {
        name: "lightCurveFrame",
        props: ["alerts"],
        components: {
            'lightCurve': lightCurve
        },
        data(){
            return {
                magrs: null,
                maggs: null,
                magrErrors: null,
                maggErrors: null,
                jdates: null
            }
        },
        methods:{
            processLightCurveData: function(){
                console.log("Data result alerts");
                console.log(this.alerts);
                // Iterate through data and create four lists
                var magrs = [];
                var maggs = [];
                var magrErrors = [];
                var maggErrors = [];
                var jdates = [];

                this.alerts.forEach(function (dataItem) {

                    jdates.push(dataItem.jd);
                    magrs.push(dataItem.magr);
                    maggs.push(dataItem.magg);


                    var magg_error = [null, null];
                    if (dataItem.magg != null) {
                        magg_error = [dataItem.magg - 0.1, dataItem.magg + 0.1];
                    }
                    maggErrors.push(magg_error);

                    var magr_error = [null, null];
                    if (dataItem.magr) {
                        magr_error = [dataItem.magr - 0.1, dataItem.magr + 0.1];
                    }
                    magrErrors.push(magr_error);
                });
                // this.data = [magrs, maggs, magrErrors, maggErrors, jdates]
                this.magrs = magrs;
                this.maggs = maggs;
                this.magrErrors = magrErrors;
                this.maggErrors = maggErrors;
                this.jdates = jdates;


            },
            redrawLightCurveChart: function(){

                this.processLightCurveData();
                console.log("redraw the light curve");

                this.$refs.lightCurve.redraw();
            }
        }
    }
</script>

<style scoped>

</style>