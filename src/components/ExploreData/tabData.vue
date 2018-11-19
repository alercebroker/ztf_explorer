<template>
	<div v-if="error">
		<b-alert show variant="danger">
			Error conecting to our servers
		</b-alert>
	</div>
	<div v-else-if="result.status === 204">
		<b-alert show variant="warning">
			<h3>Our position is correct but there is no Alderaan!</h3>
			Sorry but your search did not return any results :( <br>
			Try refining your Query
		</b-alert>
	</div>
	<div v-else-if="result.status === 200">
        <div class="row">
            <b-btn class="mb-3 col-4" v-b-modal.showDetails>Show more details</b-btn>
            <b-btn class="mb-3 offset-5 col-3" v-b-modal.showDownloadModal>Download</b-btn>
        </div>
        <b-modal id="showDetails" >
            <b-form-group>
                <template slot="label">
                    <b>Choose your options:</b><br>
                    <b-form-checkbox v-model="allSelected"
                                     :indeterminate="indeterminate"
                                     aria-describedby="options"
                                     aria-controls="options"
                                     @change="toggleAll">
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
		    <small><strong>Note: this is a random sample from your query result set</strong></small>
        <div v-show="selected.length">
            <b-table striped hover :items="result.data.results" :fields="selected"
                     @row-clicked="showObjectDetails">
                <template slot="class" slot-scope="data">
                     <!--TODO: change classes-->
                    <div v-if="data.value===1">
                        class
                    </div>
                    <div v-if="data.value===2">
                        class
                    </div>
                    <div v-if="data.value===3">
                        class
                    </div>
                    <div v-if="data.value===4">
                        class
                    </div>
                    <div v-if="data.value===5">
                        class
                    </div>
                    <div v-if="data.value===6">
                        class
                    </div>
                    <div v-if="data.value===7">
                        class
                    </div>
                    <div v-if="data.value===8">
                        class
                    </div>
                    <div v-if="data.value===9">
                        class
                    </div>
                    <div v-if="data.value===10">
                        class
                    </div>

                </template>
                <template slot="pclass" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="period" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="firstmagg" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="lastmagg" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="firstmagr" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="lastmagr" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="maxg" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="ming" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="maxr" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="minr" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="meang" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="meanr" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="mediang" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="medianr" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="rmsg" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="rmsr" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="slope" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="firstjd" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="lastjd" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="deltajd" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="rmsdec" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="rmsra" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="meanra" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
                <template slot="meandec" slot-scope="data">
                    <div v-if="data.value!=NAN">
                        {{data.value.toFixed(5)}}
                    </div>
                </template>
            </b-table>

        </div>

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
		<b-modal id="showDownloadModal" title="Download Objects">
            <download-modal :loading.sync="load" :query="query_sql"></download-modal>
            <div slot="modal-footer">
            </div>
        </b-modal>
	</div>
	<div v-else-if="result.status === 400">
		<b-alert show variant="warning">
			There is an error with your query
		</b-alert>
	</div>
	<div v-else-if="result.data.length === 0">
		<b-alert variant="info" show>
			Your search results will be displayed here
		</b-alert>
	</div>
	<div v-else-if="result.status === 504">
		<b-alert variant="warning" show>
			<b-container>
				<b-row>
					<h3>Opps!</h3>
				</b-row>
				<b-row>
					It looks like your Query is too complex. You can try refining your Query or you can queue it and we will let you know when it's ready :)
				</b-row>
				<br>
				<b-row>
					<b-button variant="success" size="lg" id="queueQuery" disabled> <!-- data-target="#saveSearchModal" -->
						Queue my Query
					</b-button>
				</b-row>
			</b-container>
		</b-alert>
	</div>
	<div v-else>
		<b-alert variant="danger" show>
			Opps! there was a problem with our servers
		</b-alert>
	</div>
</template>

<script>
 import downloadModal from "./downloadModal.vue";
 import DownloadModal from "./downloadModal";
export default {
  name: "tabData",
    components: {DownloadModal},
    props: ["result", "error","query_sql","loading"],
    component: [downloadModal],
  data() {
    return {
        load: this.loading,
      details: {},
      defaultProp: {},
      allDetails: false,
      showMoreBtn: "Show more",
      showModal: false,
      allSelected: false,
      indeterminate: false,
      selected: [{
            key: "oid",
            sortable: false,
            label: "Object ID"
          },{
            key: "nobs",
            sortable: false,
            label: "# Obs"
          },{
            key: "pclass",
            sortable: false,
            label: "Probability on class"
          }], // TODO: must contain default columns
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
        { text: "Firstmagg", value: "firstmagg" },
        { text: "FirstJd", value: "firstjd" },
        { text: "Class", value: "class" },
        { text: "LastJd", value: "lastjd" },
        { text: "DeltaJd", value: "deltajd" },
        { text: "Ext", value: "ext" },
        { text: "Lastmagg", value: "lastmagg" },
        { text: "Lastmagr", value: "lastmagr" },
        { text: "Firstmagr", value: "firstmagr" },
        { text: "Maxg", value: "maxg" },
        { text: "Maxr", value: "maxr" },
        { text: "Meandec", value: "meandec" },
        { text: "Meang", value: "Meang" },
        { text: "Meanra", value: "Meanra" },
        { text: "Meanr", value: "Meanr" },
        { text: "Mediang", value: "Mediang" },
        { text: "Ming", value: "Ming" },
        { text: "Medianr", value: "Medianr" },
        { text: "Minr", value: "Minr" },
        { text: "Period", value: "Period" },
        { text: "Rmsg", value: "Rmsg" },
        { text: "Rmsdec", value: "Rmsdec" },
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
      showDownload(item, index, event) {
      this.$refs.downloadModal.show();
    },
      closeDownloadModal: function(event) {
      this.$refs.downloadModal.hide();
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
    },
      load(newVal, oldVal) {
      // Handle changes in individual flavour checkboxes
      this.$emit("update:loading",newVal);
    }
  },
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

table tr {
  cursor: pointer;
}
</style>
