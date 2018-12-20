<template>
  <div v-if="error">
    <b-alert show variant="danger">Error conecting to our servers</b-alert>
  </div>
  <div v-else-if="result.status === 204">
    <b-alert show variant="warning">
      <h3>Our position is correct but there is no Alderaan!</h3>Sorry but your search did not return any results :(
      <br>Try refining your Query
    </b-alert>
  </div>
  <div v-else-if="result.status === 200">
    <div class="row">
      <b-col cols="4">
        <b-btn class="mb-3" :block="btnblock" v-b-modal.showDetails>Columns to show in table</b-btn>
      </b-col>
      <b-col></b-col>
      <b-col cols="4">
        <b-btn class="mb-3" :block="btnblock" v-b-modal.showDownloadModal>Download</b-btn>
      </b-col>
    </div>
    <b-modal id="showDetails" ok-variant="secondary" ok-title="Close">
      <b-form-group>
        <template slot="label">
          <b>Choose your options:</b>
          <br>
          <b-form-checkbox
            v-model="allSelected"
            :indeterminate="indeterminate"
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
    <small>
      <div>
        <strong>Note: this is a random sample from your query result set.</strong>
      </div>
      <div>Showing {{ result.data.result.length }} rows of {{ result.data.total }}.</div>
    </small>
    <div v-show="selected.length">
      <b-table
        striped
        hover
        :items="result.data.result"
        :fields="selected"
        @row-clicked="showObjectDetails"
      >
        <template slot="class" slot-scope="data">
          <!--TODO: change classes-->
          <div v-if="data.value===1">ceph</div>
          <div v-if="data.value===2">eb</div>
          <div v-if="data.value===3">rrLy</div>
          <div v-if="data.value===4">dsc</div>
          <div v-if="data.value===5">2pv</div>
          <div v-if="data.value===6">snIa</div>
          <div v-if="data.value===7">snII</div>
          <div v-if="data.value===8">snIbc</div>
          <div v-if="data.value===9">sln</div>
          <div v-if="data.value===10">snIa-bg</div>
        </template>
        <template slot="pclass" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="period" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="firstmagg" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="lastmagg" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="firstmagr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="lastmagr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="maxg" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="ming" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="maxr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="minr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="meang" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="meanr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="mediang" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="medianr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="rmsg" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="rmsr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="slope" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="firstjd" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="lastjd" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="deltajd" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="rmsdec" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="rmsra" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="meanra" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
        <template slot="meandec" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(5)}}</div>
        </template>
      </b-table>
    </div>
    <div>
      <b-row>
        <b-col></b-col>
        <b-col class="text-right">
          <b-btn
            variant="primary"
            v-on:click="getMoreResults"
            :disabled="!moreResultsLeft()"
            id="more-results"
          >Load more</b-btn>
          <br>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <br>
        </b-col>
      </b-row>
    </div>

    <b-modal
      ref="objDetailsModal"
      class="modal-fullscreen"
      id="more-results"
      title="Object Details"
      v-on:hidden="lessDetails"
    >
      <b-container fluid>
        <b-row>
          <b-col cols="4">
            <b-card title="Details">
              <b-row>
                <b-col id="details">
                  <ul id="default-details">
                    <li v-for="(value, key) in defaultProp" :key="key">
                      <strong>{{key}}</strong>
                      : {{ value }}
                    </li>
                  </ul>
                  <ul v-show="allDetails" id="more-details">
                    <li v-for="(value, key) in details" :key="key">
                      <strong>{{key}}</strong>
                      : {{ value }}
                    </li>
                  </ul>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-btn
                    v-show="details != {}"
                    variant="default"
                    v-on:click="moreDetails"
                  >{{ showMoreBtn }}</b-btn>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
          <b-col>
            <!-- Curva de luz -->
            <b-card title="Light curve" class="h-100 align-middle">
              <lightCurveFrame :alerts="alerts" ref="lightCurveFrame"></lightCurveFrame>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <!-- Stamps -->
            <!-- <img src="" alt="" id="image"> -->
            <b-card title="Stamps">
              <div class="text-center">No stamps to display</div>
            </b-card>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <!-- Visibility Plot -->
            <b-card title="Visibility Plots">
              <div class="text-center">No plots to display</div>
            </b-card>
          </b-col>
          <b-col>
            <!-- Periodogram -->
            <b-card title="Periodogram">
              <div class="text-center">No periodogram to display</div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <div slot="modal-footer">
        <b-btn v-on:click="closeObjectModal">Close</b-btn>
      </div>
    </b-modal>
    <b-modal id="showDownloadModal" title="Download Objects">
      <download-modal :downloading.sync="download" :query="query_sql" :params="params"></download-modal>
      <div slot="modal-footer"></div>
    </b-modal>
  </div>
  <div v-else-if="result.status === 400">
    <b-alert show variant="warning">There is an error with your query</b-alert>
  </div>
  <div v-else-if="result.data.length === 0">
    <b-alert variant="info" show>Your search results will be displayed here</b-alert>
  </div>
  <div v-else-if="result.status === 504">
    <b-alert variant="warning" show>
      <b-container>
        <b-row>
          <h3>Opps!</h3>
        </b-row>
        <b-row>It looks like your Query is too complex. You can try refining your Query or you can queue it and we will let you know when it's ready :)</b-row>
        <br>
        <b-row>
          <b-button variant="success" size="lg" id="queueQuery" disabled>
            <!-- data-target="#saveSearchModal" -->
            Queue my Query
          </b-button>
        </b-row>
      </b-container>
    </b-alert>
  </div>
  <div v-else>
    <b-alert variant="danger" show>Opps! there was a problem with our servers</b-alert>
  </div>
</template>

<script>
import downloadModal from "./downloadModal.vue";
import DownloadModal from "./downloadModal";
import lightCurveFrame from "./lightCurveFrame";

/**
 * this component contains table and details object modal
 */
export default {
  name: "tabData",
  components: { DownloadModal, lightCurveFrame },
  props: [
    "result",
    "error",
    "query_sql",
    "params",
    "loading",
    "downloading",
    "pageNumber",
    "numResults",
    "getMoreObjects",
    "taskId"
  ],
  component: [downloadModal, lightCurveFrame],
  data() {
    return {
      btnblock: true,
      interval: null,
      load: this.loading,
      download: this.downloading,
      details: {},
      alerts: [],
      defaultProp: {},
      allDetails: false,
      showMoreBtn: "Show more",
      showModal: false,
      allSelected: false,
      indeterminate: false,
      selectedObj: null,
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
          text: "Nalerts",
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
    };
  },
  methods: {
    /**
     * get more result or next page result
     */
    getMoreResults() {
      this.$emit("update:pageNumber", this.pageNumber + 1);
      this.getMoreObjects(this.taskId);
    },
    /**
     * checked or unchecked all option in checkbox of selection columns
     */
    toggleAll(checked) {
      this.selected = checked ? this.options.map(a => a.value).slice() : [];
    },
    /**
     * query for alerts from a specific object
     */
    getQueryResults: function(taskId) {
      this.$http
        .post("/v2/result", {
          "task-id": taskId
        })
        .then(
          function(response) {
            let obj = response.data.result.object_details;
            this.alerts = response.data.result.alerts;
            this.defaultProp["oid"] = obj.oid;
            this.defaultProp["class"] = obj.class;
            this.defaultProp["pclass"] = obj.pclass;
            this.defaultProp["period"] = obj.period;

            delete obj.oid;
            delete obj.class;
            delete obj.pclass;
            delete obj.period;

            this.details = obj;

            this.$emit("update:loading", false);
          }.bind(this)
        );
    },
    /**
     * query if task is ready (for alerts)
     * @param task_id: id task in server
     */
    queryTask(task_id) {
      this.$http
        .post("/v2/query_status", {
          "task-id": task_id
        })
        .then(
          function(response) {
            if (response.data.status == "SUCCESS") {
              clearInterval(this.interval);
              this.getQueryResults(task_id);
            }
          }.bind(this)
        )
        .catch(function() {});
    },
    /**
     * launch modal object details
     */
    showObjectDetails(item) {
      this.$emit("update:loading", true);
      this.$refs.objDetailsModal.show();
      this.selectedObj = item;
      this.$http
        .post("/v2/query_alerts", {
          oid: item.oid
        })
        .then(
          function(response) {
            this.interval = setInterval(
              this.queryTask,
              500,
              response.data["task-id"]
            );
          }.bind(this)
        )
        .catch(function() {});
    },
    /**
     * TODO: implent stamps on back end
     * @param taskId
     */
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
            result.data.result.forEach(() => {});
          }
        });
    },
    showDownload() {
      this.$refs.downloadModal.show();
    },
    closeDownloadModal: function() {
      this.$refs.downloadModal.hide();
    },
    closeObjectModal: function() {
      this.$refs.objDetailsModal.hide();
    },
    lessDetails: function() {
      this.allDetails = false;
      this.showMoreBtn = "Show more";
    },
    moreDetails: function() {
      if (this.allDetails) {
        this.allDetails = false;
        this.showMoreBtn = "Show more";
      } else {
        this.allDetails = true;
        this.showMoreBtn = "Show less";
      }
    },
    /**
     * for checking if there are any results left
     * @returns {boolean}
     */
    moreResultsLeft() {
      return this.result.data.result.length != this.result.data.total;
    }
  },
  watch: {
    selected(newVal) {
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
    load(newVal) {
      this.$emit("update:loading", newVal);
    },
    download(newVal) {
      this.$emit("update:downloading", newVal);
    }
  }
};
</script>

<style>
.modal-fullscreen .modal {
  padding: 0 !important;
}
.modal-fullscreen .modal-dialog {
  max-width: 90%;
  /* height: 90%; */
  /* margin: 0; */
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

#more-results {
  top: 82%;
  right: 3%;
  position: fixed;
}
</style>
