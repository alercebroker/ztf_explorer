<template>
    <div>
        <v-chart :options="polar" autoresize></v-chart>
    </div>
</template>

<script>
export default {
    name: "polarradar",
    props: ["probabilities", "classifier"],
    data() {
        return {
            polar: {
                title: {
                    text: ""
                },
                tooltip:{
                    formatter: function(params){
                        if(params.name == "xmatch"){ return ""}
                        var rowTable = (col1, col2) => "<tr> <td>" + col1 + "</td> <td>" + col2 + "</td> </tr>"
                        let table = "<table> <tr> <th>Class</th> <th>(%)</th></tr>"
                        for (var i = 0; i < params.value.length; i++) { table += rowTable(params.name[i], params.value[i]) }
                        return table + "</table>"
                    }
                },
                legend: {
                    show: false
                },
                radar: {
                    //shape: 'circle',
                    splitNumber: 3,
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [],
                    backgroundColor: "red"
                },
                series: [
                    {
                        name: 'Probabilities (%)',
                        type: 'radar',
                        areaStyle: {normal: {}},
                        data : []
                    },
                ]
            }
        };
    },
    mounted() {
        this.getValues();
        this.getXMATCH();
    },
    methods: {
        getValues() {
            var data = []
            var names = []
            var probs = this.probabilities
            this.polar.radar.indicator =  Object.keys(probs)
            .filter(function(x) {return x.endsWith("_prob")})
            .map(function(x) {
                data.push(probs[x])
                names.push(x.split("_")[0])
                return {name: x.split("_")[0], max: 1}
            })
            this.polar.series[0].data.push({value: data, name: names});
        },
        getXMATCH() {
            var classxmatch = this.$store.state.results.selectedObject.classxmatch;
            var xmatch = []
            if(classxmatch && this.classifier != 1) {
                xmatch = Array(10).fill(0)
                xmatch[classxmatch] = 1
                this.polar.series[0]
                .data.push(
                    {
                        value: xmatch,
                        name: "xmatch",
                        lineStyle: {
                            normal: {
                                type: 'dashed'
                            }
                        },
                        symbolSize: 1,
                        tooltip: false,
                        label: {
                        normal: {
                            show: true,
                            formatter:function(params) {
                                return params.value == 1 ? "XMATCH" : "";
                                }
                            }
                        }
                    }
                );
            }
        }
    }
};
</script>

<style scoped>
.echarts {
  margin: auto;
  width: 100%;
  height: 100%;
  min-height: 350px;
}
</style>
