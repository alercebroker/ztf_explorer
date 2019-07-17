<template>
    <div>
        <highcharts :options="lineOptions"></highcharts>
    </div>
</template>

<script>
export default {
    name: "lineclass",
    props: ["probabilities", "classifier"],
    data() {
        return {
            lineOptions: {
                chart: {
                    type: "spline",
                    height: 250
                },
                title: {
                    text: "Classification"
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    max: 1,
                    title: {
                        text: "Probability (%)"
                    }
                },
                tooltip: {
                    shared: true,
                    crosshairs: true
                },
                exporting: {
                    enabled: false
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: false
                        },
                        enableMouseTracking: true
                    }
                },
                series: []
            }
        };
    },
    methods: {
        getClass(obj, classifier) {
            return this.$store.state.search.classes.find(function(x) {
                if (x.value == obj[classifier]) {
                    return x;
                }
            }).text;
        },

        setValues(probabilities) {
            let categories = [];
            let series = [];
            let data = [];
            Object.keys(probabilities).forEach(key => {
                if (key.endsWith("_prob")) {
                    let name = key.split("_")[0];
                    categories.push(name);
                    data.push(probabilities[key]);
                }
            });
            this.lineOptions.xAxis.categories = categories;
            this.lineOptions.series.push({ name: this.classifier, data: data });
            if (this.$store.state.results.selectedObject.classxmatch) {
                var classxmatch = this.$store.state.results.selectedObject
                    .classxmatch;
                this.lineOptions.xAxis.plotLines = [
                    {
                        value: categories.indexOf(classxmatch),
                        dashStyle: "dash",
                        width: 1,
                        color: "#d33",
                        label: {
                            text: "XMATCH",
                            style: {
                                color: "gray"
                            }
                        }
                    }
                ];
            }
        }
    },
    watch: {
        probabilities(prob) {
            this.setValues(prob);
        }
    },
    mounted() {
        if (this.probabilities) {
            this.setValues(this.probabilities);
        }
    }
};
</script>

<style scoped>
</style>
