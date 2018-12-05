<template>
    <div>
        <b-row>
            <b-col>
                <highcharts :options="chartOptions"></highcharts>
            </b-col>
        </b-row>
    </div>
</template>

<script>

    export default {
        name: "lightCurve",
        props: ['jdates', 'magrs', 'magrErrors', 'maggs', 'maggErrors'],
        data() {

            return {
                chartOptions: {
                    chart: {
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift'
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size: 10px">Modified julian date: {point.key}</span><br/>',
                        shared: true,
                        crosshairs: [true]
                    },
                    title: {
                        text: 'Light Curve'
                    },
                    xAxis: {
                        name: 'Dates',
                        categories: this.jdates,
                        title: {
                            text: 'Modified julian dates'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Magnitude'
                        },
                        type: 'linear'
                    },
                    plotOptions: {
                        shared: true,
                        crosshairs: true,
                        enableMouseTracking: true,
                        series: {
                            cursor: 'pointer',
                            point: {
                                events: {
                                    click: function (e) {
                                        hs.htmlExpand(null, {
                                            pageOrigin: {
                                                x: e.pageX || e.clientX,
                                                y: e.pageY || e.clientY
                                            },
                                            headingText: this.series.name,
                                            maincontentText: 'Modified julian date: ' + this.jdates[this.x] + '<br/> ' +
                                                this.series.name + ': ' + this.y + '<br/> ' + 'rms error: ' + 0.1,
                                            width: 250
                                        });
                                    }
                                }
                            },
                            marker: {
                                lineWidth: 1
                            }
                        }
                    },
                    series: [
                        {
                            name: 'Red magnitude',
                            value: 'rmag',
                            color: '#ff0000',
                            type: 'scatter',
                            data: this.magrs
                        },
                        {
                            name: 'Red magnitude error',
                            type: 'errorbar',
                            color: '#cc0c00',
                            enableMouseTracking: false,
                            data: this.magrErrors,

                        },
                        {
                            name: 'Green magnitude',
                            value: 'gmag',
                            // linkedTo: 'rmag',
                            type: 'scatter',
                            color: '#22d100',
                            data: this.maggs,

                        },
                        {
                            name: 'Green magnitude error',
                            type: 'errorbar',
                            color: '#0a9900',
                            enableMouseTracking: false,
                            data: this.maggErrors,

                        }
                    ]
                }
            }
        },

        methods: {
            redraw(){ 
                // replace julian dates
                this.chartOptions.xAxis.categories = this.jdates;

                console.log('redraw');
                console.log(this.jdates);

                // delete the previous series
                this.chartOptions.series = [
                        {
                            name: 'Red magnitude',
                            value: 'rmag',
                            color: '#ff0000',
                            type: 'scatter',
                            data: this.magrs
                        },
                        {
                            name: 'Red magnitude error',
                            type: 'errorbar',
                            color: '#cc0c00',
                            enableMouseTracking: false,
                            data: this.magrErrors,

                        },
                        {
                            name: 'Green magnitude',
                            value: 'gmag',
                            // linkedTo: 'rmag',
                            type: 'scatter',
                            color: '#22d100',
                            data: this.maggs,
                        },
                        {
                            name: 'Green magnitude error',
                            type: 'errorbar',
                            color: '#0a9900',
                            enableMouseTracking: false,
                            data: this.maggErrors,

                        }
                    ];
                
            },
        }
    }
</script>

<style scoped>

</style>