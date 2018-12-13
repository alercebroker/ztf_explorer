<template>
	<div>
		<b-row>
			<b-col>
				<highcharts class="histogram" :options="chartOptions"></highcharts>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	export default {
        name: "histogram",
        props: ['plotValues', 'xVariable', 'nbins'],
        data(){
        	return{
        		bins:0,
        		chartOptions:{
        			
        			title: {
				        text: ''
				    },
				    xAxis: [{
				        title: { text: '' },
				        alignTicks: false
				    }, {
				        title: { text: 'Please select a variable for xAxis' },
				        alignTicks: false,
				        opposite: false
				    }],

				    yAxis: [{
				        title: { text: '' }
				    }, {
				        title: { text: 'Number of Objects' },
				        opposite: false
				    }],

				    legend:{
				    	enabled:false
				    },
				    plotOptions:{
				    	histogram:{
				    		color:'#3C347E'
				    	}
				    },
			    series: [{
			        type: 'histogram',
			        xAxis: 1,
			        yAxis: 1,
			        baseSeries: 1,
			        visible: true
			    }, {
			        data: [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4, 3, 3, 4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2, 3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5, 2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8, 2.6, 3, 3.4, 3.1, 3, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4],
			        visible: false
			    }]
//end chartOptions
        		}
        	}
        },
        methods:{
        	redraw(){ //add a series for object
		  		// delete the previous series
		  		this.chartOptions.series[1].data = [];
		  		// add new series
		  		this.plotValues.forEach(obj =>{
		  			this.chartOptions.series[1].data.push(obj.pair);
		  		});
		    },
        },
        watch: {
            xVariable: function(newVal, oldVal) { // if xVariable change
                this.chartOptions.xAxis[1].title.text = newVal;
                this.redraw();
                
	        },
	        plotValues: function(newVal, oldVal) { // if plotValues change
				  this.redraw();
	        }
	    },
    }
</script>