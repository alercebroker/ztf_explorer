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
            options: [
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
              { 
                text: "Period", 
                value: {
                  key: "period",
                  label: "Period"
                }
              },
              {
                text: "First MJD",
                value: {
                  key: "firstjd",
                  label: "FirstMJD",
                  sortable : true
                }
              },
              {
                text: "Last MJD",
                value: {
                  key: "lastjd",
                  label: "LastMJD",
                  sortable : true
                }
              },
              {
                text: "Delta MJD",
                value: {
                  key: "deltajd",
                  label: "DeltaMJD"
                }
              },
              { 
                text: "Mean Dec", 
                value: { 
                  key : "meandec" ,
                  label : "Dec",
                  sortable: false
                }
              },
              { 
                text: "RMS of DEC", 
                value: {
                  key: "rmsdec",
                  label: "RmsDec"
                } 
              },
              { 
              text: "Mean RA", 
                value: {
                  key : "meanra" ,
                  label : "RA",
                  sortable: false
                }
              },
              { 
                text: "RMS of RA", 
                value: {
                  key: "rmsra",
                  label: "RmsRA"
                }
              },
              {
                text: "RA/Dec",
                value: {
                  key: "radec",
                  label: "RA/Dec",
                  }
              },
              {
                text: "-- Classifiers --",
                disabled: true
              },
              {
                text: "Class by XMATCH", 
                value: {
                  key: "classxmatch",
                  label: "X-MATCH"
                } 
              },
              {
                text: "Class by RF", 
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
                text: "Class by RNN", 
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
              {
                text: "-- Magnitude band g --",
                disabled: true
              },
              { 
                text: "First det. of mag. g", 
                value: {
                  key: "firstmagg",
                  label: "FirstMagG"
                }
              },
              { 
                text: "Last det. of mag. g", 
                value: {
                  key: "lastmagg",
                  label: "LastMagG"
                }
              },
              { 	
                text: "Min of band g", 
                value: { 
                  key: "ming" ,
                  label : "ming",
                  sortable: true
                }
              },  
              { 
                text: "Max of band g", 
                value: {
                  key: "maxg",
                  label: "MaxG"
                } 
              },
              { 
                text: "Mean of band g", 
                value: {
                  key: "meang",
                  label: "MeanG"
                }
              },
              { 
                text: "Median of band g", 
                value: {
                  key: "mediang",
                  label: "MedianG"
                }
              },
              { 
                text: "RMS of band g", 
                value: {
                  key: "rmsg",
                  label: "RmsG"
                }
              },
              /*{ 
                text: "SlopeG", 
                value: "slopeg" 
              },*/
              {
                text: "-- Magnitude band r --",
                disabled: true
              },
              { 
                text: "Last det. of mag r", 
                value: {
                  key: "lastmagr",
                  label: "LastMagR"
                }
              },
              { 
                text: "First det. of mag r", 
                value: {
                  key: "firstmagr",
                  label: "FirstMagR"
                }
              },
              { 	
                text: "Min of band r", 
                value: { 
                  key: "minr" ,
                  label : "minr",
                  sortable: true
                  }
              },
              { 
                text: "Max of band r", 
                value: {
                  key: "maxr",
                  label: "MaxR"
                }
              },
              { 
                text: "Mean of band r", 
                value: {
                  key: "meanr",
                  label: "MeanR"
                }
              },
              { 
                text: "Median of band r", 
                value: {
                  key: "medianr",
                  label: "MedianR"
                } 
              },
              { 
                text: "RMS of band r", 
                value: {
                  key: "rmsr",
                  label: "RmsR"
                } 
              },
              /*{ 
                text: "SlopeR", 
                value: "sloper" 
              },*/
            ]
          }
        },
        methods: {
          onClose(){
            this.$store.dispatch('setSelectedColumnOptions', this.$store.state.results.selectedColumnOptions);
          },
          toggleAll(checked){
            this.$store.state.results.selectedColumnOptions = checked ? this.options.map(a => a.value).slice() : [];
          }
        }
    }
</script>

<style scoped>

</style>
