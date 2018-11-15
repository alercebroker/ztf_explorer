<template>
	<div>
        <b-btn class="mb-3" v-b-modal.showDetails>Show more details</b-btn>        

        <b-modal id="showDetails" >
            <b-form-group>
                <template slot="label">
                    <b>Choose your options:</b><br>
                    <b-form-checkbox v-model="allSelected"
                                     :indeterminate="indeterminate"
                                     aria-describedby="options"
                                     aria-controls="options"
                                     @change="toggleAll"
                    >
                        {{ allSelected ? 'Un-select All' : 'Select All' }}
                    </b-form-checkbox>
                </template>
                <b-form-checkbox-group id="flavors"
                                       stacked
                                       v-model="selected"
                                       name="flavs"
                                       :options="options"
                                       class="ml-4"
                                       aria-label="Individual options"
                ></b-form-checkbox-group>
            </b-form-group>

        </b-modal>

        <b-table striped hover :items="result" :fields="selected" @row-clicked="showObjectDetails"></b-table>

        <b-modal ref="objDetailsModal" class="modal-fullscreen" id="objDetailsModal" title="Object Details">
            <b-container fluid>
                <b-row>
                    <b-col cols=4>
                        <b-row>
                            <h4>Details</h4>
                        </b-row>
                        <b-row>
                            <b-col>                            
                                <ul id="default-details">
                                <li v-for="(value, key) in defaultProp" :key="key">
                                    <strong>{{key}}</strong>: {{ value }}
                                </li>
                                </ul>
                                <ul v-show="allDetails" id="more-details">
                                <li v-for="(value, key) in details" :key="key">
                                    <strong>{{key}}</strong>: {{ value }}
                                </li>
                                </ul>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-btn v-show="details != {}" variant="default" v-on:click="moreDetails">{{ showMoreBtn }}</b-btn>                            
                        </b-row>
                    </b-col>
                    <b-col>
                        Curva de luz
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        Stamps
                    </b-col>
                </b-row>            
                <b-row>
                    <b-col>Visibility Plot</b-col>
                    <b-col>Periodogram</b-col>
                </b-row>
            </b-container>
            <div slot="modal-footer">
              <b-btn v-on:click="closeObjectModal">Close</b-btn>
            </div>            
        </b-modal>
	</div>
</template>

<script>
// import objectDetails from "./objectDetails.vue";
export default {
  name: "tabData",
  components: {
    // objectDetails
  },
  props: ["result"],
  data() {
    return {
      details: {},
      defaultProp: {},
      allDetails: false,
      showMoreBtn: "Show more",
      showModal: false,
      allSelected: false,
      indeterminate: false,
      selected: ["nobs", "oid", "pclass"], // TODO: must contain default columns
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
          text: "Nobs",
          value: {
            key: "nobs",
            sortable: false,
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
        { text: "FirstJd", value: "firstjd" },
        { text: "LastJd", value: "lastjd" },
        { text: "DeltaJd", value: "deltajd" },
        { text: "Ext", value: "ext" },
        { text: "Firstmagg", value: "firstmagg" },
        { text: "Lastmagg", value: "lastmagg" },
        { text: "Firstmagr", value: "firstmagr" },
        { text: "Lastmagr", value: "lastmagr" },
        { text: "Maxg", value: "maxg" },
        { text: "Maxr", value: "maxr" },
        { text: "Meandec", value: "meandec" },
        { text: "Meang", value: "Meang" },
        { text: "Meanr", value: "Meanr" },
        { text: "Meanra", value: "Meanra" },
        { text: "Mediang", value: "Mediang" },
        { text: "Medianr", value: "Medianr" },
        { text: "Ming", value: "Ming" },
        { text: "Minr", value: "Minr" },
        { text: "Period", value: "Period" },
        { text: "Rmsdec", value: "Rmsdec" },
        { text: "Rmsg", value: "Rmsg" },
        { text: "Rmsr", value: "Rmsr" },
        { text: "Rmsra", value: "Rmsra" },
        { text: "Slope", value: "Slope" }
      ]
    };
  },
  methods: {
    toggleAll(checked) {
      this.selected = checked ? this.options.map(a => a.value).slice() : [];
    },
    showObjectDetails(item, index, event) {
      this.$refs.objDetailsModal.show();

      this.$http
        .post("/v1/query", {
          query_parameters: {
            filters: {
              oid: item.oid
            }
          }
        })
        .then(result => {
          let obj = result.data.results[0];
          this.defaultProp["oid"] = obj.oid;
          this.defaultProp["class"] = obj.class;
          this.defaultProp["pclass"] = obj.pclass;
          this.defaultProp["period"] = obj.period;

          delete obj.oid;
          delete obj.class;
          delete obj.pclass;
          delete obj.period;

          this.details = obj;
        });
    },
    closeObjectModal: function(event) {
      this.$refs.objDetailsModal.hide();
    },
    moreDetails: function(event) {
      if (this.allDetails) {
        this.allDetails = false;
        this.showMoreBtn = "Show more";
      } else {
        this.allDetails = true;
        this.showMoreBtn = "Show less";
      }
    }
  },
  watch: {
    selected(newVal, oldVal) {
      // Handle changes in individual flavour checkboxes
      if (newVal.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newVal.length === this.options.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    }
  }
};
</script>

<style>
.modal-fullscreen .modal {
  padding: 0 !important;
}
.modal-fullscreen .modal-dialog {
  max-width: 100%;
  height: 100%;
  margin: 0;
}
.modal-fullscreen .modal-content {
  border: 0;
  border-radius: 0;
  min-height: 100%;
  height: auto;
}
ul > li {
  list-style: none;
}
</style>