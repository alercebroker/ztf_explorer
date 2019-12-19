<template>
    <div>
        <v-chart :options="scatter" autoresize @click="onClick" />
    </div>
</template>

<script>
import { jdToDate } from "../../utils/AstroDates.js";
export default {
    name: "lightcurvePlot",
    data() {
        return {
            showHelp: false,
            scatter: {
                grid: {
                    left: "7%",
                    right: "5%"
                },
                title: {
                    text: "Light Curve",
                    left: "center",
                    textStyle: {
                        fontWeight: "lighter"
                    }
                },
                tooltip: {
                    show: true,
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#505765"
                        }
                    },
                    formatter: function(params) {
                        var colorSpan = color =>
                            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                            color +
                            '"></span>';
                        var colorSpanError = color =>
                            ' <span style="display:inline-block;margin-right:5px;;margin-left:2px;border-radius:10px;width:6px;height:6px;background-color:' +
                            color +
                            '"></span>';
                        var rowTable = (col1, col2, col3) =>
                            "<tr> <td>" +
                            col1 +
                            "</td> <td>" +
                            col2 +
                            "</td> <td>" +
                            col3 +
                            "</td> </tr>";
                        var calendarIcon = color =>
                            "<i class='material-icons' style='font-size:13px;color:" +
                            color +
                            ";'>alarm</i>";
                        let serie = params[0].seriesName;
                        let table =
                            "<table> <tr> <th></th> <th></th> <th></th></tr>";
                        if (
                            serie == "r non-detections" ||
                            serie == "g non-detections"
                        ) {
                            table += rowTable(
                                colorSpan(params[0].color),
                                params[0].seriesName + ":",
                                params[0].value[1]
                            );
                            table += rowTable(
                                calendarIcon(params[0].color),
                                "MJD: ",
                                params[0].value[0]
                            );
                            table += rowTable(
                                calendarIcon(params[0].color),
                                "Date: ",
                                jdToDate(params[0].value[0])
                                    .toUTCString()
                                    .slice(0, -3) + "UT"
                            );
                            return table + "</table>";
                        } else if (serie == "r" || serie == "g") {
                            let mag = params[0].value[1].toFixed(3);
                            let err = params[0].value[3].toFixed(3);
                            table += rowTable(
                                "",
                                "candid: ",
                                params[0].value[2]
                            );
                            table += rowTable(
                                colorSpan(params[0].color),
                                params[0].seriesName + ": ",
                                mag + "±" + err
                            );
                            table += rowTable(
                                calendarIcon(params[0].color),
                                "MJD: ",
                                params[0].value[0]
                            );
                            table += rowTable(
                                calendarIcon(params[0].color),
                                "Date: ",
                                jdToDate(params[0].value[0])
                                    .toUTCString()
                                    .slice(0, -3) + "UT"
                            );
                            table += rowTable("", "click to change stamp", "");
                            return table + "</table>";
                        }
                    }
                },
                toolbox: {
                    show: true,
                    showTitle: true,
                    feature: {
                        dataZoom: {
                            show: true,
                            title: {
                                zoom: "Zoom",
                                back: "Back"
                            },
                            icon: {
                                zoom:
                                    "M11,4A7,7 0 0,1 18,11C18,12.5 17.5,14 16.61,15.19L17.42,16H18L23,21L21,23L16,18V17.41L15.19,16.6C12.1,18.92 7.71,18.29 5.39,15.2C3.07,12.11 3.7,7.72 6.79,5.4C8,4.5 9.5,4 11,4M10,7V10H7V12H10V15H12V12H15V10H12V7H10M1,1V8L8,1H1Z",
                                back:
                                    "M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z"
                            }
                        },
                        restore: {
                            show: true,
                            title: "Restore"
                        },
                        // myFeature: {
                        //     show: true,
                        //     title: "Help",
                        //     icon:
                        //         "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z",
                        //     onclick: function(event) {
                        //         // this.showHelp = true;
                        //     }
                        // }
                    },
                    tooltip: {
                        // same as option.tooltip
                        show: true,
                        formatter: function(param) {
                            return "<div>param</div>"; // user-defined DOM structure
                        },
                        backgroundColor: "#222",
                        textStyle: {
                            fontSize: 12
                        },
                        extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);" // user-defined CSS styles
                    }
                },
                legend: {
                    data: ["g", "r", "g non-detections", "r non-detections"],
                    bottom: 0
                },
                xAxis: {
                    name: "Modified Julian Dates",
                    nameLocation: "center",
                    scale: true,
                    type: "value",
                    splitLine: {
                        show: false
                    },
                    nameTextStyle: {
                        padding: 7
                    }
                },
                yAxis: {
                    name: "Magnitude",
                    nameLocation: "center",
                    type: "value",
                    scale: true,
                    splitLine: {
                        show: false
                    },
                    inverse: true,
                    nameTextStyle: {
                        padding: 25
                    }
                },
                series: [
                    {
                        name: "g",
                        data: [],
                        type: "scatter",
                        scale: true,
                        color: "#22d100",
                        symbolSize: 6,
                        encode: {
                            x: 0,
                            y: 1
                        }
                    },
                    {
                        name: "r",
                        data: [],
                        type: "scatter",
                        scale: true,
                        color: "#ff0000",
                        symbolSize: 6,
                        encode: {
                            x: 0,
                            y: 1
                        }
                    },
                    {
                        name: "g",
                        data: [],
                        type: "custom",
                        scale: true,
                        color: "#22d100",
                        renderItem: this.renderError
                    },
                    {
                        name: "r",
                        data: [],
                        type: "custom",
                        scale: true,
                        color: "#ff0000",
                        renderItem: this.renderError
                    },
                    {
                        name: "g non-detections",
                        data: [],
                        type: "scatter",
                        scale: true,
                        color: "rgba(0, 255, 0, 0.5)",
                        symbolSize: 6,
                        symbol:
                            "path://M0,49.017c0-13.824,11.207-25.03,25.03-25.03h438.017c13.824,0,25.029,11.207,25.029,25.03L262.81,455.745c0,0-18.772,18.773-37.545,0C206.494,436.973,0,49.017,0,49.017z"
                    },
                    {
                        name: "r non-detections",
                        data: [],
                        type: "scatter",
                        scale: true,
                        color: "rgba(255, 0, 0, 0.5)",
                        symbolSize: 6,
                        symbol:
                            "path://M0,49.017c0-13.824,11.207-25.03,25.03-25.03h438.017c13.824,0,25.029,11.207,25.029,25.03L262.81,455.745c0,0-18.772,18.773-37.545,0C206.494,436.973,0,49.017,0,49.017z"
                    }
                ]
            }
        };
    },
    mounted() {
        this.plotDetections(this.detections);
        this.plotNonDetections(this.nonDetections);
    },
    methods: {
        plotDetections(detections) {
            this.scatter.series[0].data = detections
                .filter(function(x) {
                    return x.fid == 1;
                })
                .map(function(x) {
                    return [x.mjd, x.magpsf, x.candid_str, x.sigmapsf];
                });
            this.scatter.series[1].data = detections
                .filter(function(x) {
                    return x.fid == 2;
                })
                .map(function(x) {
                    return [x.mjd, x.magpsf, x.candid_str, x.sigmapsf];
                });
            this.scatter.series[2].data = detections
                .filter(function(x) {
                    return x.fid == 1;
                })
                .map(function(x) {
                    return [
                        x.mjd,
                        x.magpsf - x.sigmapsf,
                        x.magpsf + x.sigmapsf
                    ];
                });
            this.scatter.series[3].data = detections
                .filter(function(x) {
                    return x.fid == 2;
                })
                .map(function(x) {
                    return [
                        x.mjd,
                        x.magpsf - x.sigmapsf,
                        x.magpsf + x.sigmapsf
                    ];
                });
        },
        plotNonDetections(non_detections) {
            this.scatter.series[4].data = non_detections
                .filter(function(x) {
                    return x.fid == 1 && x.diffmaglim > 10;
                })
                .map(function(x) {
                    return [x.mjd, x.diffmaglim];
                });
            this.scatter.series[5].data = non_detections
                .filter(function(x) {
                    return x.fid == 2 && x.diffmaglim > 10;
                })
                .map(function(x) {
                    return [x.mjd, x.diffmaglim];
                });
        },
        renderError(params, api) {
            var xValue = api.value(0);
            var highPoint = api.coord([xValue, api.value(1)]);
            var lowPoint = api.coord([xValue, api.value(2)]);
            var halfWidth = api.size([1, 0])[0] * 0.1;
            var style = api.style({
                stroke: api.visual("color"),
                fill: null
            });
            return {
                type: "group",
                children: [
                    {
                        type: "line",
                        shape: {
                            x1: highPoint[0] - halfWidth,
                            y1: highPoint[1],
                            x2: highPoint[0] + halfWidth,
                            y2: highPoint[1]
                        },
                        style: style
                    },
                    {
                        type: "line",
                        shape: {
                            x1: highPoint[0],
                            y1: highPoint[1],
                            x2: lowPoint[0],
                            y2: lowPoint[1]
                        },
                        style: style
                    },
                    {
                        type: "line",
                        shape: {
                            x1: lowPoint[0] - halfWidth,
                            y1: lowPoint[1],
                            x2: lowPoint[0] + halfWidth,
                            y2: lowPoint[1]
                        },
                        style: style
                    }
                ]
            };
        },
        onClick(detection) {
            this.$store.dispatch(
                "setSelectedDetection",
                jdToDate(detection.value[0])
                    .toUTCString()
                    .slice(0, -3) + "UT"
            );
        }
    },
    computed: {
        detections() {
            return this.$store.state.results.objectDetails.detections
                ? this.$store.state.results.objectDetails.detections
                : [];
        },
        nonDetections() {
            return this.$store.state.results.objectDetails.non_detections
                ? this.$store.state.results.objectDetails.non_detections
                : [];
        }
    },
    watch: {
        detections(newVal) {
            this.plotDetections(newVal);
        },
        nonDetections(newVal) {
            this.plotNonDetections(newVal);
        }
    }
};
</script>
<style>
.echarts {
    margin: auto;
    width: 100%;
    height: 100%;
    min-height: 350px;
}
</style>