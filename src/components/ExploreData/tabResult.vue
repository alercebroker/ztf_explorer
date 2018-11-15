<template>
    <div>
		<b-card-group>
			<b-card-body>
				<transition name="fade">
					<b-card no-body>
						<b-tabs card>

							<b-tab title="Data">
								<tabData :result="result" :error="error"></tabData>
							</b-tab>

							<b-tab title="Histogram" :disabled="result.data.length == 0 ? true : false">
								<tabHistogram :result="result"></tabHistogram>
							</b-tab>

                            <b-tab title="Scatter" :disabled="result.data.length == 0 ? true : false">
								<tabScatter :result="result"></tabScatter>
							</b-tab>

                            <b-tab title="Spatial Distribution" :disabled="result.data.length == 0 ? true : false">
								<tabSpatialDistribution :result="result"></tabSpatialDistribution>
							</b-tab>

                            <b-tab title="Sankey" :disabled="result.data.length == 0 ? true : false">
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
    props: ['params', 'loading'],
    components: {
        tabData,tabScatter,tabHistogram,tabSankey,tabSpatialDistribution
    },
    data(){
        return  {
            result : {
                data : ""
            },
            error : null
        }
    },
    methods : {
    },
    watch: {
        params: function (newVal, oldVal) { // watch it
            this.$emit("update:loading",true);
            this.$http.post('/v1/query',{
                query_parameters: newVal
            })
            .then((result_query) => {
                this.$emit("update:loading",false);
                this.result = result_query
                this.error = null
                console.log(this.result)
            })
            .catch((error) => {
                this.$emit("update:loading",false);
                this.error = error
            })
        },

    }

}
</script>

<style scoped>

</style>
