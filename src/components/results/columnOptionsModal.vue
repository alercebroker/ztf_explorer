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
            selected: [
              {
                key: "oid",
                sortable: false,
                label: "Object ID"
              },
              {
                key: "nobs",
                sortable: true,
                label: "# Obs"
              },
              {
                key: "pclass",
                sortable: false,
                label: "Probability on class"
              }
            ], // TODO: must contain default columns
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
                text: "Nalerts",
                value: {
                  key: "nobs",
                  sortable: true,
                  label: "# Obs"
                }
              },
              {
                text: "Pclass",
                value: {
                  key: "pclass",
                  sortable: false,
                  label: "Probability on class"
                }
              },
              { text: "Class", value: "class" },
              { text: "Period", value: "period" },
              { text: "Ext", value: "ext" },

              { text: "FirstMagG", value: "firstmagg" },
              { text: "LastMagG", value: "lastmagg" },
              { text: "MinG", value: "ming" },
              { text: "MaxG", value: "maxg" },
              { text: "MeanG", value: "meang" },
              { text: "MedianG", value: "mediang" },
              { text: "RmsG", value: "rmsg" },
              { text: "SlopeG", value: "slopeg" },

              { text: "LastMagR", value: "lastmagr" },
              { text: "FirstMagR", value: "firstmagr" },
              { text: "MinR", value: "minr" },
              { text: "MaxR", value: "maxr" },
              { text: "MeanR", value: "meanr" },
              { text: "MedianR", value: "medianr" },
              { text: "RmsR", value: "rmsr" },
              { text: "SlopeR", value: "sloper" },

              {
                text: "FirstMJD",
                value: {
                  key: "firstjd",
                  label: "FirstMJD"
                }
              },
              {
                text: "LastMJD",
                value: {
                  key: "lastjd",
                  label: "LastMJD"
                }
              },
              {
                text: "DeltaMJD",
                value: {
                  key: "deltajd",
                  label: "DeltaMJD"
                }
              },

              { text: "MeanDEC", value: "meandec" },
              { text: "RmsDEC", value: "rmsdec" },
              { text: "MeanRA", value: "meanra" },
              { text: "RmsRA", value: "rmsra" }
            ]
          }
        },
        methods: {
          onClose(){
            this.$store.dispatch('setSelectedColumnOptions', this.selected);
          },
          toggleAll(checked){
            this.selected = checked ? this.options.map(a => a.value).slice() : [];
          }
        }
    }
</script>

<style scoped>

</style>