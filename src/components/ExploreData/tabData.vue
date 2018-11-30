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
      <b-btn class="mb-3 col-4" v-b-modal.showDetails>Show more details</b-btn>
      <b-btn class="mb-3 offset-5 col-3" v-b-modal.showDownloadModal>Download</b-btn>
    </div>
    <b-modal id="showDetails">
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
      <strong>Note: this is a random sample from your query result set</strong>
    </small>
    <div v-show="selected.length">
      <b-table
        striped
        hover
        :items="result.data"
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
    <b-modal
      ref="objDetailsModal"
      class="modal-fullscreen"
      id="objDetailsModal"
      title="Object Details"
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
              <div class="text-center">
                <p class="card-text">No data to display yet</p>
              </div>
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
      <download-modal :loading.sync="load" :query="query_sql"></download-modal>
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
export default {
  name: "tabData",
  components: { DownloadModal },
  props: ["result", "error", "query_sql", "loading"],
  component: [downloadModal],
  data() {
    return {
      interval: null,
      load: this.loading,
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
          { text: "Class", value: "class" },
          { text: "Period", value: "period" },
          { text: "Ext", value: "ext" },

          { text: "Firstmagg", value: "firstmagg" },
          { text: "Lastmagg", value: "lastmagg" },
          { text: "Ming", value: "ming" },
          { text: "Maxg", value: "maxg" },
          { text: "Meang", value: "meang" },
          { text: "Mediang", value: "mediang" },
          { text: "Rmsg", value: "rmsg" },
          { text: "Slopeg", value: "slopeg" },


          { text: "Lastmagr", value: "lastmagr" },
          { text: "Firstmagr", value: "firstmagr" },
          { text: "Minr", value: "minr" },
          { text: "Maxr", value: "maxr" },
          { text: "Meanr", value: "meanr" },
          { text: "Medianr", value: "medianr" },
          { text: "Rmsr", value: "rmsr" },
          { text: "Sloper", value: "sloper" },

          { text: "FirstJd", value: "firstjd" },
          { text: "LastJd", value: "lastjd" },
          { text: "DeltaJd", value: "deltajd" },

          { text: "Meandec", value: "meandec" },
          { text: "Rmsdec", value: "rmsdec" },
          { text: "Meanra", value: "meanra" },
          { text: "Rmsra", value: "rmsra" }
      ]
    };
  },
  methods: {
    toggleAll(checked) {
      this.selected = checked ? this.options.map(a => a.value).slice() : [];
    },
    getQueryResults: function(taskId) {
      this.$http
        .post("/v2/result", {
          "task-id": taskId,
        })
        .then(response => {
          let obj = response.data.result.object_details;
          this.defaultProp["oid"] = obj.oid;
          this.defaultProp["class"] = obj.class;
          this.defaultProp["pclass"] = obj.pclass;
          this.defaultProp["period"] = obj.period;

          delete obj.oid;
          delete obj.class;
          delete obj.pclass;
          delete obj.period;

          this.details = obj;
          this.result = response.data.result;
          this.$emit("update:loading", false);
        });
    },
    queryTask(task_id) {
      // let this = this;
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
            else {
              console.log(response);
              // this.result = result;
              // this.$emit("update:loading", false);
            }
          }.bind(this)
        )
        .catch(function(error) {});
    },
    showObjectDetails(item) {
      this.$emit("update:loading", true);
      this.$refs.objDetailsModal.show();

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
        .catch(function(error) {});

      // this.$http
      //   .post("/v2/query_alerts", {
      //     query_parameters: {
      //       filters: {
      //         oid: item.oid
      //       }
      //     }
      //   })
      //   .then(result => {
      //     let obj = result.data.results[0];
      //     this.defaultProp["oid"] = obj.oid;
      //     this.defaultProp["class"] = obj.class;
      //     this.defaultProp["pclass"] = obj.pclass;
      //     this.defaultProp["period"] = obj.period;
      //
      //     delete obj.oid;
      //     delete obj.class;
      //     delete obj.pclass;
      //     delete obj.period;
      //
      //     this.details = obj;
      //   });
      //
      // this.$http
      //   .post("/v2/query_alerts", {
      //     oid: item.oid
      //   })
      //   .then(result => {
      //     let taskId = result.data["task-id"];
      //     this.getObjectStamps(taskId);
      //   });
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
            result.data.result.forEach(() => {
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
    showDownload() {
      this.$refs.downloadModal.show();
    },
    closeDownloadModal: function() {
      this.$refs.downloadModal.hide();
    },
    closeObjectModal: function() {
      this.$refs.objDetailsModal.hide();
    },
    moreDetails: function() {
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
    selected(newVal) {
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
    load(newVal) {
      // Handle changes in individual flavour checkboxes
      this.$emit("update:loading", newVal);
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

<!--
<html>
<head>
    <title>Highcharts Tutorial</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js">
    </script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>


<script src="https://www.highcharts.com/media/com_demo/js/highslide-full.min.js"></script>
<script src="https://www.highcharts.com/media/com_demo/js/highslide.config.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="https://www.highcharts.com/media/com_demo/css/highslide.css"/>
</head>


<body>
<div id = "container" style = "width: 550px; height: 400px; margin: 0 auto"></div>
<script language = "JavaScript">
    $(document).ready(function() {

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }

        var data = [
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 1000},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 1100},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 1200},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 1300},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 1400},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 1500},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 1600},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 1700},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 1800},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 1900},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 2000},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 2100},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 2200},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 2300},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 2400},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 2500},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 2600},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 2700},
            {rmag: getRandomInt(0, 50), rmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], gmag: getRandomInt(0, 50), gmag_error: [getRandomInt(10, 40), getRandomInt(10, 40)], jd: 2800}
        ];

        // Iterate through data and create four lists
        // var jdates = [];
        var rmags = [];
        var gmags = [];
        var rmag_errors = [];
        var gmag_errors = [];
        var jdates = [];
        data.forEach(function (dataItem) {
            jdates.push(dataItem.jd);
            rmags.push(dataItem.rmag);
            gmags.push(dataItem.gmag);
            rmag_errors.push(dataItem.rmag_error);
            gmag_errors.push(dataItem.gmag_error);
        });

        var chart = {
            scrollablePlotArea: {
                minWidth: 700
            }
        };

        var tooltip = {
            headerFormat: '<span style="font-size: 10px">Modified julian date: {point.key}</span><br/>',
            shared: true,
            crosshairs: [true]
        };

        var title = {
            text: 'Light Curve'
        };

        var xAxis = {
            name: 'Dates',
            categories: jdates,
            title: {
                text: 'Modified julian dates'
            },
        };

        var yAxis = {
            title: {
                text: 'Magnitude'
            },
            type: 'linear'
        };

        var plotOptions = {
            shared: true,
            crosshairs: true,
            enableMouseTracking: true,
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function (e) {
                            hs.htmlExpand(null, {
                                pageOrigin: {
                                    x: e.pageX || e.clientX,
                                    y: e.pageY || e.clientY
                                },
                                headingText: this.series.name,
                                maincontentText: 'Modified julian date: ' + jdates[this.x] + '<br/> ' +
                                    this.series.name + ': ' + this.y + '<br/> ' +
                                    'error: ' + '[ ' + rmag_errors[this.x][0] + ', ' + rmag_errors[this.x][1] + ']',
                                width: 200
                            });
                        }
                    }
                },
                marker: {
                    lineWidth: 1
                }
            }
        };

        var series = [
            {
                name: 'Red magnitude',
                value: 'rmag',
                color: '#ff0000',
                type: 'spline',
                data: rmags,
                label: {
                    text: "LABEL R"
                }
            },
            {
                name: 'Red magnitude error',
                type: 'errorbar',
                color: '#cc0c00',
                data: rmag_errors,

            },
            {
                name: 'Green magnitude',
                value: 'gmag',
                // linkedTo: 'rmag',
                type: 'spline',
                color: '#22d100',
                data: gmags,

            },
            {
                name: 'Green magnitude error',
                type: 'errorbar',
                color: '#0a9900',
                data: gmag_errors,

            }

        ];

        var json = {};
        json.chart = chart;
        json.title = title;
        json.tooltip = tooltip;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.series = series;
        json.plotOptions = plotOptions;
        $('#container').highcharts(json);
    });
</script>
</body>

</html>
-->