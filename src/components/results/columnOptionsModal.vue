<template>
    <b-modal id="showDetails" ok-variant="secondary" ok-title="Close" :ok-only="true" @hide="onClose">
      <b-form-group>
        <template slot="label">
          <b>Choose your options:</b>
          <br>
          <b-form-checkbox
            v-model="allSelected"
            aria-describedby="options"
            aria-controls="options"
            @change="toggleAll"
          >{{ allSelected ? 'Un-select All' : 'Select All' }}</b-form-checkbox>
        </template>
        <b-form-checkbox-group
          id="flavors"
          stacked
          v-model="$store.state.results.selectedColumnOptions"
          name="flavs"
          :options="options"
          class="ml-4"
          aria-label="Individual options"
        ></b-form-checkbox-group>
      </b-form-group>
    </b-modal>
</template>

<script>
    export default {
        name: "column-options-modal",
        data(){
          return {
            allSelected: false,
            // TODO: must contain default columns
            options: [
              //TODO: change values and text
              {
                text: "Object ID",
                value: {
                  key: "oid",
                  sortable: false,
                  label: "Object ID"
                }
              },
              {
                text: "Number of alerts",
                value: {
                  key: "nobs",
                  sortable: true,
                  label: "#"
                }
              },
              /*{
                text: "Probability of class",
                value: {
                  key: "pclass",
                  sortable: false,
                  label: "PClass"
                }
              },*/
              {
                text: "Class XMATCH", 
                value: {
                  key: "classxmatch",
                  label: "X-MATCH"
                } 
              },
              {
                text: "Class RF", 
                value: {
                  key: "classrf",
                  label: "ML_RF"
                } 
              },
              {
                text: "Probability of classifier RF",
                value: {
                  key: "pclassrf",
                  sortable: true,
                  label: "P(RF)"
                }
              },
              {
                text: "Class RNN", 
                value: {
                  key: "classrnn",
                  label: "ML_RNN"
                } 
              },
              {
                text: "Probability of classifier RNN",
                value: {
                  key: "pclassrnn",
                  sortable: true,
                  label: "P(RNN)"
                }
              },
              /*{ 
                text: "Period", 
                value: "period" 
              },
              { 
                text: "Ext", 
                value: "ext" 
              },*/
              { 
                text: "FirstMagG", 
                value: "firstmagg" 
              },
              { 
                text: "LastMagG", 
                value: "lastmagg" 
              },
              { 	
                text: "MinG", 
                value: { 
				          key: "ming" ,
				          label : "ming",
				          sortable: true
			          }
		          },  
              { 
                text: "MaxG", 
                value: "maxg" 
              },
              { 
                text: "MeanG", 
                value: "meang" 
              },
              { 
                text: "MedianG", 
                value: "mediang"
              },
              { 
                text: "RmsG", 
                value: "rmsg" 
              },
              { 
                text: "SlopeG", 
                value: "slopeg" 
              },
              { 
                text: "LastMagR", 
                value: "lastmagr" 
              },
              { 
                text: "FirstMagR", 
                value: "firstmagr" 
              },
              { 	
                text: "MinR", 
                value: { 
                  key: "minr" ,
                  label : "minr",
                  sortable: true
                  }
              },
              { 
                text: "MaxR", 
                value: "maxr" 
              },
              { 
                text: "MeanR", 
                value: "meanr" 
              },
              { 
                text: "MedianR", 
                value: "medianr" 
              },
              { 
                text: "RmsR", 
                value: "rmsr" 
              },
              /*{ 
                text: "SlopeR", 
                value: "sloper" 
              },*/
              {
                text: "FirstMJD",
                value: {
                  key: "firstjd",
                  label: "FirstMJD",
		              sortable : true
                }
              },
              {
                text: "LastMJD",
                value: {
                  key: "lastjd",
                  label: "LastMJD",
		              sortable : true
                }
              },
              {
                text: "DeltaMJD",
                value: {
                  key: "deltajd",
                  label: "DeltaMJD"
                }
              },
              { 
			          text: "Dec", 
			          value: { 
				          key : "meandec" ,
				          label : "Dec",
				          sortable: false
			          }
	            },
              { 
                text: "RmsDEC", 
                value: "rmsdec" 
              },
              { 
			          text: "RA", 
			          value: {
				          key : "meanra" ,
				          label : "RA",
				          sortable: false
			          }
	            },
              { 
                text: "RmsRA", 
                value: "rmsra" 
              },
              {
                text: "Coordinates",
                value: {
                  key: "coordinates",
                  label: "Coordinates",
                  }
              }
            ]
          }
        },
        methods: {
          onClose(){
            this.$store.dispatch('setSelectedColumnOptions', this.$store.state.results.selectedColumnOptions);
            console.log(this.$store.state.results.selectedColumnOptions);
          },
          toggleAll(checked){
            this.$store.state.results.selectedColumnOptions = checked ? this.options.map(a => a.value).slice() : [];
          }
        }
    }
</script>

<style scoped>

</style>
