<template>
    <div>
		<b-card-group>
			<b-card-body>
				<transition name="fade">
					<b-card no-body>
						<b-tabs card>

							<b-tab title="Data">
								<tabData :result="result"></tabData>
							</b-tab>

							<b-tab title="Histogram" >
								<tabHistogram :result="result"></tabHistogram>
							</b-tab>

                            <b-tab title="Scatter" >
								<tabScatter :result="result"></tabScatter>
							</b-tab>

                            <b-tab title="Spatial Distribution" >
								<tabSpatialDistribution :result="result"></tabSpatialDistribution>
							</b-tab>

                            <b-tab title="Sankey" >
								<tabSankey :result="result"></tabSankey>
							</b-tab>


						</b-tabs>
					</b-card>
				</transition>
			</b-card-body>
		</b-card-group>
	</div>
</template>

<script>
import tabData from './tabData.vue'
import tabScatter from './tabScatter.vue'
import tabHistogram from './tabHistogram.vue'
import tabSankey from './tabSankey.vue'
import tabSpatialDistribution from './tabSpatialDistribution.vue'
export default {
    name: "tabResult",
    props: ['params'],
    components: {
        tabData,tabScatter,tabHistogram,tabSankey,tabSpatialDistribution
    },
    data(){
        return  {
            result : []
        }
    },
    methods : {
    },
    watch: {
        params: function (newVal, oldVal) { // watch it
            let self = this;
            const baseURI = 'https://api-alerce-test.herokuapp.com/v1/query';
            this.$http.post(baseURI,{
                query_parameters: newVal
            })
            .then((result_query) => {
                self.result = result_query.data.results
            })
        }

    }

}
</script>

<style scoped>

</style>
