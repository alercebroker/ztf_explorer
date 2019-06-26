<template>
    <b-modal id="showDetails" ok-variant="secondary" ok-title="Close" :ok-only="true">
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
          v-model="selected"
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
                text: "Number of observations",
                value: {
                  key: "nobs",
                  sortable: true,
                  label: "#obs"
                }
              },
              {
                text: "First MJD",
                value: {
                  key: "firstmjd",
                  label: "FirstMJD",
                  sortable : true
                }
              },
              {
                text: "Last MJD",
                value: {
                  key: "lastmjd",
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
              text: "Mean RA", 
                value: {
                  key : "meanra" ,
                  label : "RA",
                  sortable: false
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
                text: "-- Magnitude band g --",
                disabled: true
              },
              { 
                text: "First det. of mag. g", 
                value: {
                  key: "first_magpsf_g",
                  label: "FirstMagG"
                }
              },
              { 
                text: "Last det. of mag. g", 
                value: {
                  key: "last_magpsf_g",
                  label: "LastMagG"
                }
              },
              { 	
                text: "Min of band g", 
                value: { 
                  key: "min_magpsf_g" ,
                  label : "MinG",
                  sortable: true
                }
              },  
              { 
                text: "Max of band g", 
                value: {
                  key: "max_magpsf_g",
                  label: "MaxG"
                } 
              },
              { 
                text: "Mean of band g", 
                value: {
                  key: "mean_magpsf_g",
                  label: "MeanG"
                }
              },
              { 
                text: "Median of band g", 
                value: {
                  key: "median_magpsf_g",
                  label: "MedianG"
                }
              },
              {
                text: "-- Magnitude band r --",
                disabled: true
              },
              { 
                text: "Last det. of mag r", 
                value: {
                  key: "last_magpsf_r",
                  label: "LastMagR"
                }
              },
              { 
                text: "First det. of mag r", 
                value: {
                  key: "first_magpsf_r",
                  label: "FirstMagR"
                }
              },
              { 	
                text: "Min of band r", 
                value: { 
                  key: "min_magpsf_r" ,
                  label : "MinR",
                  sortable: true
                  }
              },
              { 
                text: "Max of band r", 
                value: {
                  key: "max_magpsf_r",
                  label: "MaxR"
                }
              },
              { 
                text: "Mean of band r", 
                value: {
                  key: "mean_magpsf_r",
                  label: "MeanR"
                }
              },
              { 
                text: "Median of band r", 
                value: {
                  key: "median_magpsf_r",
                  label: "MedianR"
                } 
              },
            ]
          }
        },
        methods: {
          toggleAll(checked){
            this.$store.state.results.selectedColumnOptions = checked ? this.options.map(a => a.value).slice() : [];
          }
        },
        computed: {
          selected: {
            get(){
              return this.$store.state.results.selectedColumnOptions;
            },
            set(sel){
              this.$store.dispatch('setSelectedColumnOptions', sel);
            }
          }
        }
    }
</script>

<style scoped>

</style>
