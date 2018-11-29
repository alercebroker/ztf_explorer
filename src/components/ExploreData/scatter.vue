<template>
	<div>
		<b-row>
			<b-col>
				<highcharts class="scatter" :options="chartOptions" :updateArgs="arg"></highcharts>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	export default {
        name: "scatter",
        props: ['data', 'xVariable', 'yVariable'],
        data(){
        	return{
        	    example : {
        	    	data:[
	        	    	{oid:2,ming:2,maxg:20,sloper:8},
	        	    	{oid:3,ming:4,maxg:7,sloper:1},
	        	    	{oid:4,ming:15,maxg:3,sloper:24}
        	    	]
        	    },
        	    arg : [true,true,true],
        		chartOptions:{
        			chart: {
				        type: 'scatter',
				        zoomType: 'xy'
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

				    plotOptions: {
				        scatter: {
				            marker: {
				                radius: 5,
				                states: {
				                    hover: {
				                        enabled: true,
				                        lineColor: 'rgb(100,100,100)'
				                    }
				                }
				            },
				            states: {
				                hover: {
				                    marker: {
				                        enabled: false
				                    }
				                }
				            },
				            tooltip:  {
				                formatter: function() {
					                return '<b>'+ Highcharts.numberFormat(this.y, 0) +'</b><br/>'+
					                    'in year: '+ this.x;
					            }
				            }
				        }
				    },
				    series: [{ //datos a plotear
					        name: 'Estrella',
					        color: 'rgba(223, 83, 83, .5)',
					        data: []
					    },{ //datos a plotear
					        name: 'Sol' ,
					        color: 'rgba(0, 83, 83, .5)',
					        data: []

					    }],
				    //end highcharts element
        		},
        	}
        },
		watch: {
            xVariable: function(newVal, oldVal) { // watch it
                this.chartOptions.xAxis.title.text = newVal;
        	},
	        yVariable: function(newVal, oldVal) { // watch it
				  this.chartOptions.yAxis.title.text = newVal;
	        }
		}
    }
</script>