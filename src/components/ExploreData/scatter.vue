<template>
	<p>No Scatter plot yet</p>
	
</template>
<script>
	
	export default {
        name: "scatter",
        props: ['data', 'xVariable', 'yVariable'],
        data(){
        	return{
        		charOptions:{
        			series:[{
        				data:[1,2,3], //sample data
        			}],
        		},
        	}
        },
    }
</script>