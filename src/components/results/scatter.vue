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
        props: ['plotValues', 'xVariable', 'yVariable'],
        data(){
        	return{
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
				    legend: {
					    enabled: false
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
				            tooltip: {
				            	headerFormat: 'OID: <b>{series.name}</b><br>',
				            },
				        }
				    },
			        series: [],
				    //end highcharts element
				    },
        	}
        },
        methods:{
		  	redraw(){ //add a series for object
		  		// delete the previous series
		  		this.chartOptions.series = [];
		  		// add new series
		  		this.plotValues.forEach(obj =>{
		  			this.chartOptions.series.push({
		  				name: obj.oid,
		  				data: [obj.pair],
		  				color: '#3C347E',
		  				marker: {
				            symbol:"circle"
				        },
		  			});
		  		});
		    },

		},
		watch: {
            xVariable: function(newVal, oldVal) { // watch it
                this.chartOptions.xAxis.title.text = newVal;
                this.redraw();
        },
        yVariable: function(newVal, oldVal) { // watch it
			  this.chartOptions.yAxis.title.text = newVal;
			  this.redraw();
        },
        plotValues: function(newVal, oldVal) { // watch it
			  this.redraw();
        }
		}
    }
</script>