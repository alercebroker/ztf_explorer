<template>
	<highcharts class="scatter" :options="chartOptions" :updateArgs="arg" style="width:100%;height:10%;"></highcharts>
</template>

<script>
	export default {
        name: "scatter",
        props: ['plotValues', 'xVariable', 'yVariable'],
        data(){
        	return{
				arg : [true,true,true],
        		chartOptions:{
        			chart: {
				        type: 'scatter',
				        zoomType: 'xy'
					},
					boost: {
						useGPUTranslations: true,
						usePreAllocated: true
					},
				    title: {
				    	text: ""
				    },
				    xAxis: {
				        title: {
				            enabled: true,
				            text: this.xVariable,
				        },
						showLastLabel:true
				    },
				    yAxis: {
				        title: {
				            text: this.yVariable,
				        }
				    },
				    legend: {
					    enabled: false
					  },
			        series: [{
						name: this.yVariable,
						type: 'scatter',
						color: '#3C347E',
						data: [[1,2]],
						marker: {
							radius: 1
						},
						tooltip: {
							followPointer: false,
							pointFormat: '[{point.x:.1f}, {point.y:.1f}]'
						}
					}],
				    responsive: {
						rules: [{
							condition: {
								maxWidth: 500,
								maxHeight: 100
							},
							chartOptions: {
								legend: {
									enabled: false
								}
							}
						}]
					}
				},
        	}
        },
        methods:{
		  	redraw(){ //add a series for object
		  		// delete the previous series
				  this.chartOptions.series[0].data = [];
				  this.chartOptions.series[0].name = this.yVariable;
				  this.chartOptions.xAxis.title.text = this.xVariable;
				  this.chartOptions.yAxis.title.text = this.yVariable;
		  		// add new series
		  		this.plotValues.forEach(obj =>{
		  			this.chartOptions.series[0].data.push(obj.pair);
		  		});
		    },

		},
		watch: {
			plotValues: function(newVal) { // watch it
				//this.chartOptions.series[0].marker.radius = 5 - Math.pow((newVal.length / 10000), 3);
				this.redraw();
			}
		}
    }
</script>
