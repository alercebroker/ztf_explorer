<template>
  <div v-if="$store.state.search.error">
    <b-alert show variant="danger">Error connecting to our servers</b-alert>
  </div>
  <div v-else-if="$store.state.search.query_status === 204">
    <b-alert show variant="warning">
      <h3>Our position is correct but there is no Alderaan!</h3>Sorry but your search did not return any results :(
      <br>Try refining your Query
    </b-alert>
  </div>
  <div v-else-if="$store.state.search.query_status === 200">
    <div class="row">
      <b-col cols="4">
        <b-btn class="mb-3 btn-wrap-text" :block="block" v-b-modal.showDetails>Columns to show in table</b-btn>
      </b-col>
      <b-col></b-col>
      <b-col cols="4">
        <b-btn class="mb-3 btn-wrap-text" :block="block" v-b-modal.showDownloadModal>Download</b-btn>
      </b-col>
    </div>

    <column-options-modal />

    <small>
      <div>
        <strong>Found {{ $store.state.search.objects.length }} results</strong>
      </div>
    </small>
    
    <div v-show="$store.state.results.selectedColumnOptions.length">
      <b-table
        striped
        hover
        :items="$store.state.search.objects"
        :fields="$store.state.results.selectedColumnOptions"
        :current-page="currentPage"
        :per-page="perPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
         @row-clicked="onRowClicked"
      >
        <template slot="classxmatch" slot-scope="data">
          <div>{{ data.item.classxmatch != null? getClass(data.item, "classxmatch"): "-" }}</div>
        </template>
        <template slot="classrf" slot-scope="data">
          <div>{{ data.item.classrf != null? getClass(data.item, "classrf"): "-" }}</div>
        </template>
        <template slot="pclassrf" slot-scope="data">
          <div>{{ data.value != null? data.value.toFixed(3) : "-" }}</div>
        </template>
        <template slot="classrnn" slot-scope="data">
          <div>{{ data.item.classrnn != null? getClass(data.item, "classrnn"): "-" }}</div>
        </template>
        <template slot="pclassrnn" slot-scope="data">
          <div>{{ data.value != null? data.value.toFixed(3) : "-" }}</div>
        </template>
        <template slot="pclass" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="period" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="firstmagg" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="lastmagg" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="firstmagr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="lastmagr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="maxg" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="ming" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="maxr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="minr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="meang" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="meanr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="mediang" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="medianr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="rmsg" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="rmsr" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="slope" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="firstjd" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="lastjd" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="deltajd" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="rmsdec" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="rmsra" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="meanra" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="meandec" slot-scope="data">
          <div v-if="data.value!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="coordinates" slot-scope="data">
          <div v-if="data.item.meanra != null && data.item.meandec != null">({{data.item.meanra.toFixed(3) +", "+data.item.meandec.toFixed(3)}})</div>
        </template>
      </b-table>
      <b-pagination size="md" :total-rows="$store.state.search.objects.length" v-model="currentPage" :per-page="perPage" align="center">
      </b-pagination>
    </div>

    <object-details-modal :show="showObjectDetailsModal" @modalClosed="showObjectDetailsModal = false"/>
    <download-modal />

  </div>
  <div v-else-if="$store.state.search.query_status === 400">
    <b-alert show variant="warning">There is an error with your query</b-alert>
  </div>
  <div v-else-if="$store.state.search.query_status === 0">
    <b-alert variant="info" show>Your search results will be displayed here</b-alert>
  </div>
  <div v-else-if="$store.state.search.query_status === 504">
    <b-alert variant="warning" show>
      <b-container>
        <b-row>
          <h3>Opps!</h3>
        </b-row>
        <b-row>It looks like the query is taking too long. Try refining your query :)</b-row>
        <br>
        <!-- <b-row>
          <b-button variant="success" size="lg" id="queueQuery" disabled>
            Queue my Query
          </b-button>
        </b-row> -->
      </b-container>
    </b-alert>
  </div>
  <div v-else>
    <b-alert variant="danger" show>Opps! there was a problem with our servers</b-alert>
  </div>
</template>

<script>
import downloadModal from "./downloadModal.vue";
import columnOptionsModal from './columnOptionsModal.vue';
import objectDetailsModal from "./objectDetailsModal";

/**
 * this component contains table and details object modal
 */
export default {
  name: "tabData",
  components: { downloadModal, columnOptionsModal, objectDetailsModal },
  data() {
    return {
      showObjectDetailsModal: false,
      block:true,
      currentPage: 1,
      perPage: 20,
      sortBy: 'nobs',
      sortDesc: true,
      
    };
  },
  methods: {
    getClass(obj, classifier){
      return this.$store.state.search.classes.find(function(x){
        if(x.id == obj[classifier]){
          return x;
        }
      }).name;
    },
    onRowClicked(item) {
      this.showObjectDetailsModal = true;
      this.$store.dispatch('objectSelected', item);
      this.$router.push({ name: 'object-details-modal', params: { id: item.oid } });
    },
    getUrlObject() {
      if(this.$route.params.id) {
        this.$store.dispatch('objectSelectedFromURL', {oid: this.$route.params.id});
        this.showObjectDetailsModal = true;
        //this.$store.state.search.query_status = 200;
      }
    },
  },
  mounted: function() {
    this.getUrlObject();
  },
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
.btn-wrap-text {
    white-space: normal !important;
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

#more-results-btn {
  top: 82%;
  right: 3%;
  position: fixed;
}
</style>
