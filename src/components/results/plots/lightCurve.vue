<template>
    <div>
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>

<script>
export default {
    name: "light-curve",
    data() {
        return {
            chartOptions: {
                chart: {
                    zoomType: "x",
                    panning: true,
                    panKey: "shift"
                },
                tooltip: {
                    formatter: function() {
                        var header =
                            '<span style="font-size: 13px">Modified Julian Date: ' +
                            this.x.toFixed(3) +
                            "</span><br/>";
                        var footer =
                            '<span style="font-size: 11px; font-weight: bold;">' +
                            this.series.name +
                            ": " +
                            this.y.toFixed(3) +
                            "</span>";
                        return header + footer;
                    },
                    crosshairs: [true, false]
                },
                title: {
                    text: "Light Curve"
                },
                exporting: {
                    enabled: true,
                    decimalpoint: ".",
                    filename:
                        "ALeRCE_" +
                        this.$store.state.results.selectedObject.oid +
                        "_" +
                        new Date()
                            .toISOString()
                            .slice(0, 19)
                            .replace("T", "_"),
                    buttons: {
                        contextButton: {
                            text: "Export"
                        }
                    },
                    csv: {
                        columnHeaderFormatter: function(item, key) {
                            if (!item || key == null) {
                                return "MJD";
                            } else if (key == "high" || key == "low") {
                                return item.options.value + "_" + key;
                            } else {
                                return item.options.value;
                            }
                        }
                    }
                },
                xAxis: {
                    name: "Dates",
                    categories: [],
                    title: {
                        text: "Modified Julian Dates"
                    }
                },
                yAxis: {
                    title: {
                        text: "Magnitude"
                    },
                    type: "linear",
                    reversed: true,
                    startOnTick: true
                },
                legend: {
                    //layout: "vertical",
                    //align: "left",
                    //verticalAlign: "top",
                    //floating: true,
                    //x: -10,
                    //y: -5,
                },
                plotOptions: {
                    shared: true,
                    crosshairs: true,
                    enableMouseTracking: true,
                    series: {
                        cursor: "pointer",
                        marker: {
                            lineWidth: 1
                        }
                    }
                },
                series: [
                    {
                        name: "r magnitude",
                        value: "rmag",
                        color: "#ff0000",
                        type: "scatter",
                        data: []
                    },
                    {
                        name: "r magnitude error",
                        value: "e_mag_r",
                        type: "errorbar",
                        color: "#cc0c00",
                        enableMouseTracking: false,
                        data: []
                    },
                    {
                        name: "g magnitude",
                        value: "gmag",
                        type: "scatter",
                        color: "#22d100",
                        data: []
                    },
                    {
                        name: "g magnitude error",
                        value: "e_mag_g",
                        type: "errorbar",
                        color: "#0a9900",
                        enableMouseTracking: false,
                        data: []
                    },
                    {
                        name: "r non detections",
                        value: "r diffmaglim",
                        type: "scatter",
                        color: "rgba(255, 0, 0, 0.3)",
                        data: [],
                        marker: {
                            symbol: "triangle-down"
                        }
                    },
                    {
                        name: "g non detections",
                        value: "g diffmaglim",
                        type: "scatter",
                        color: "rgba(0, 255, 0, 0.3)",
                        data: [],
                        marker: {
                            symbol: "triangle-down"
                        }
                    }
                ]
            }
        };
    },

    methods: {
        processLightCurve: function(alerts) {
            var rband = [];
            var gband = [];
            var rbandError = [];
            var gbandError = [];
            alerts.forEach(function(item) {
                if (item.magpsf_corr == null || item.magpsf == null) {
                    return;
                }
                if (item.fid == 1) {
                    gband.push([item.mjd, item.magpsf]);
                    gbandError.push([
                        item.mjd,
                        item.magpsf - item.sigmapsf,
                        item.magpsf + item.sigmapsf
                    ]);
                } else if (item.fid == 2) {
                    rband.push([item.mjd, item.magpsf]);
                    rbandError.push([
                        item.mjd,
                        item.magpsf - item.sigmapsf,
                        item.magpsf + item.sigmapsf
                    ]);
                }
            });
            this.chartOptions.series[0].data = rband;
            this.chartOptions.series[1].data = rbandError;
            this.chartOptions.series[2].data = gband;
            this.chartOptions.series[3].data = gbandError;
        },
        processLightCurveNoDet: function(nodet) {
            var rno_det = [];
            var gno_det = [];
            nodet.forEach(function(item) {
                if (item.diffmaglim == null || item.diffmaglim < 0) {
                    return;
                }
                if (item.fid == 1) gno_det.push([item.mjd, item.diffmaglim]);
                else if (item.fid == 2)
                    rno_det.push([item.mjd, item.diffmaglim]);
            });
            this.chartOptions.series[4].data = rno_det;
            this.chartOptions.series[5].data = gno_det;
        }
    },
    computed: {
        alerts() {
            return this.$store.state.results.objectDetails.detections;
        },
        non_detections() {
            return this.$store.state.results.objectDetails.non_detections;
        }
    },
    watch: {
        alerts(newAlerts) {
            this.processLightCurve(newAlerts);
        },
        non_detections(newNoDet) {
            this.processLightCurveNoDet(newNoDet);
        }
    },
    mounted() {
        if (this.alerts) this.processLightCurve(this.alerts);
        if (this.non_detections)
            this.processLightCurveNoDet(this.non_detections);
    }
};
</script>

<style scoped>
</style>