<template>
  <div v-if="$store.state.search.error != null">
    <b-alert show variant="danger">Error conecting to our servers</b-alert>
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
        <b-btn class="mb-3" block="true" v-b-modal.showDetails>Columns to show in table</b-btn>
      </b-col>
      <b-col></b-col>
      <b-col cols="4">
        <b-btn class="mb-3" block="true" v-b-modal.showDownloadModal>Download</b-btn>
      </b-col>
    </div>

    <column-options-modal />

    <small>
      <div>
        <strong>Note: this is a random sample from your query result set.</strong>
      </div>
      <div>Showing {{ $store.state.search.objects.result.length }} rows of {{ $store.state.search.objects.total }}.</div>
    </small>
    
    <div v-show="$store.state.results.selectedColumnOptions.length">
      <b-table
        striped
        hover
        :items="$store.state.search.objects.result"
        :fields="$store.state.results.selectedColumnOptions"
        @row-clicked="onRowClicked"
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
            id="more-results-btn"
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

    <object-details-modal :show="showObjectDetailsModal" @modalClosed="showObjectDetailsModal = false"/>
    <download-modal />

  </div>
  <div v-else-if="$store.state.search.query_status === 400">
    <b-alert show variant="warning">There is an error with your query</b-alert>
  </div>
  <div v-else-if="$store.state.search.objects.total === 0">
    <b-alert variant="info" show>Your search results will be displayed here</b-alert>
  </div>
  <div v-else-if="$store.state.search.query_status === 504">
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
    };
  },
  methods: {
    /**
     * for checking if there are any results left
     * @returns {boolean}
     */
    moreResultsLeft() {
      return this.$store.state.search.objects.result.length != this.$store.state.search.objects.total;
    },
    onRowClicked(item) {
      this.showObjectDetailsModal = true;
      this.$store.dispatch('objectSelected', item);
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

#more-results-btn {
  top: 82%;
  right: 3%;
  position: fixed;
}
</style>
