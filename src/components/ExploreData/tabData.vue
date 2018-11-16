<template>
	<div v-if="error">
		<b-alert show variant="danger">
			Error conecting to our servers
		</b-alert>
	</div>
	<div v-else-if="result.status === 204">
		<b-alert show variant="warning">
			Your query did not return any results
		</b-alert>
	</div>
	<div v-else-if="result.status === 200">

        <b-btn class="mb-3" v-b-modal.showDetails>Show more details</b-btn>

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
        <b-table striped hover :items="result.data.results" :fields="selected" @row-clicked="showObjectDetails"></b-table>
        </div>
        <b-modal ref="objDetailsModal" class="modal-fullscreen" id="objDetailsModal" title="Object Details">
            <b-container fluid>
                <b-row>
                    <b-col cols=4>
						<b-card title="Details">							
							<b-row>
								<b-col id="details">                            
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
								<b-col>
									<b-btn v-show="details != {}" variant="default" v-on:click="moreDetails">{{ showMoreBtn }}</b-btn>                            
								</b-col>
							</b-row>
						</b-card>
                    </b-col>
                    <b-col>
                        <!-- Curva de luz -->
                        <b-card title="Light curve" class="h-100 align-middle">
							<div class="text-center">
								<p class="card-text">
									No data to display yet
								</p>
							</div>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col>
                        <!-- Stamps -->
						<!-- <img src="" alt="" id="image"> -->
						<b-card title="Stamps">
							<div class="text-center">
								No stamps to display
							</div>
						</b-card>
                    </b-col>
                </b-row>            
                <b-row class="mt-3">
                    <b-col>
                      	<!-- Visibility Plot -->
						<b-card title="Visibility Plots">
							<div class="text-center">
								No plots to display
							</div>
						</b-card>
                    </b-col>
                    <b-col>
						<!-- Periodogram -->
						<b-card title="Periodogram">
							<div class="text-center">
								No periodogram to display
							</div>
						</b-card>
					</b-col>
                </b-row>
            </b-container>
            <div slot="modal-footer">
              <b-btn v-on:click="closeObjectModal">Close</b-btn>
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
	<div v-else>
		<b-alert variant="danger" show>
			Opps! there was a problem with our servers
		</b-alert>
	</div>
</template>

<script>
// import objectDetails from "./objectDetails.vue";
export default {
  name: "tabData",
  props: ["result", "error"],
  data() {
    return {
      details: {},
      defaultProp: {},
      allDetails: false,
      showMoreBtn: "Show more",
      showModal: false,
      allSelected: false,
      indeterminate: false,
      selected: [
        {
          key: "oid",
          sortable: false,
          label: "Object ID"
        },
        {
          key: "nobs",
          sortable: false,
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

      this.$http
        .post("/v2/query_alerts", {
          oid: item.oid
        })
        .then(result => {
          let taskId = result.data["task-id"];
          this.getObjectStamps(taskId);
        });
    },
    getObjectStamps(taskId) {
      this.$http
        .post("/v2/query_result", {
          "task-id": taskId
        })
        .then(result => {
          let state = result.data.state;
          if (state == "PENDING") {
            this.getObjectStamps(result.data["task-id"]);
          } else {
            console.log(result);
            result.data.result.forEach((val, ind) => {
              // val contiene 3 valores, cada uno representando la stamp correspondiente
              // el valor viene en hexadecimal, hay que pasarlo a binario para luego transformarlo a un blob
              // pero, aun no se sabe cual es el formato de la imagen, y falta un paso de la conversion en binario
              // ya que para armar el blob, al parecer tienen que estar en base64
              //   var arrayBufferView = btoa(
              //     parseInt(val.difs, 16)
              //       .toString(2)
              //       .padStart(8, "0")
              //   );
              //   var blob = new Blob([arrayBufferView], { type: "image/bmp" });
              //   var urlCreator = window.URL || window.webkitURL;
              //   var imageUrl = urlCreator.createObjectURL(blob);
              //   var img = document.querySelector("#image");
              //   img.src = imageUrl;
            });
          }
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

table > tbody tr {
  cursor: pointer;
}

#image {
  width: 300px;
}

#details {
  max-height: 200px;
  overflow-y: auto;
}
</style>