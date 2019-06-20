<template>
  <div v-if="$store.state.search.error">
    <b-alert show variant="danger">Error connecting to our servers </b-alert>
  </div>
  <div v-else-if="$store.state.search.query_status === 204">
    <b-alert show variant="warning">
      <h3>Our position is correct but there is no Alderaan!</h3>Sorry but your search did not return any results :(
      <br>Try refining your Query
    </b-alert>
  </div>
  <div v-else-if="$store.state.search.query_status === 400">
    <b-alert show variant="warning">There is an error with your query</b-alert>
  </div>
  <div v-else-if="!$store.state.search.searched && !$store.state.results.showObjectDetailsModal">
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
      </b-container>
    </b-alert>
  </div>
  <div v-else-if="$store.state.search.query_status === 200">
    <div class="row">
      <b-col cols="4">
        <b-btn class="mb-3 btn-wrap-text" :block="block" v-b-modal.showDetails>Columns to show in table</b-btn>
      </b-col>
      <b-col></b-col>
    </div>

    <column-options-modal />

    <small>
      <div>
        <strong>Found {{ $store.state.results.total }} results</strong>
      </div>
    </small>
    
    <div v-if="$store.state.results.objects.length || Object.keys($store.state.results.objects).length > 0">
      <b-table
        striped
        hover
        :items="Object.values($store.state.results.objects)"
        :fields="$store.state.results.selectedColumnOptions"
        :sort-by="sortBy"
        :sort-desc="sortDesc"
        @row-clicked="onRowClicked"
        @sort-changed="onSortChanged"
      >
        <template slot="classxmatch" slot-scope="data">
          <div>{{ data.item.classxmatch != null? getClass(data.item, "classxmatch"): "-" }}</div>
        </template>
        <template slot="classrf" slot-scope="data">
          <div>{{ data.item.classrf != null? getClass(data.item, "classrf"): "-" }}</div>
        </template>
        <template slot="pclassrf" slot-scope="data">
          <div>{{ data.item.pclassrf != null? data.value.toFixed(3) : "-" }}</div>
        </template>
        <template slot="first_magpsf_g" slot-scope="data">
          <div v-if="data.item.first_magpsf_g!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="last_magpsf_g" slot-scope="data">
          <div v-if="data.item.last_magpsf_g!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="first_magpsf_r" slot-scope="data">
          <div v-if="data.item.first_magpsf_r!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="last_magpsf_r" slot-scope="data">
          <div v-if="data.item.last_magpsf_r!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="max_magpsf_g" slot-scope="data">
          <div v-if="data.item.max_magpsf_g!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="min_magpsf_g" slot-scope="data">
          <div v-if="data.item.min_magpsf_g!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="max_magpsf_r" slot-scope="data">
          <div v-if="data.item.max_magpsf_r!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="min_magpsf_r" slot-scope="data">
          <div v-if="data.item.min_magpsf_r!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="mean_magpsf_g" slot-scope="data">
          <div v-if="data.item.mean_magpsf_g!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="mean_magpsf_r" slot-scope="data">
          <div v-if="data.item.mean_magpsf_r!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="median_magpsf_g" slot-scope="data">
          <div v-if="data.item.median_magpsf_g!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="median_magpsf_r" slot-scope="data">
          <div v-if="data.item.median_magpsf_r!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="firstmjd" slot-scope="data">
          <div v-if="data.item.firstmjd!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="lastmjd" slot-scope="data">
          <div v-if="data.item.lastmjd!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="deltajd" slot-scope="data">
          <div v-if="data.item.deltajd!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="meanra" slot-scope="data">
          <div v-if="data.item.meanra!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="meandec" slot-scope="data">
          <div v-if="data.item.meandec!=null">{{data.value.toFixed(3)}}</div>
        </template>
        <template slot="radec" slot-scope="data">
          <div v-if="data.item.meanra != null && data.item.meandec != null">({{data.item.meanra.toFixed(3) +", "+data.item.meandec.toFixed(3)}})</div>
        </template>
      </b-table>
      <b-pagination size="md" :total-rows="$store.state.results.total" v-model="currentPage" :per-page="$store.state.perPage" align="center" v-on:input="pageChange">
      </b-pagination>
    </div>

    <object-details-modal v-if="showObjectDetailsModal" :show="showObjectDetailsModal" @modalClosed="closeObjectDetailsModal"/>
    <!-- <download-modal /> -->
  </div>

</template>

<script>
import downloadModal from "./modals/downloadModal";
import columnOptionsModal from './modals/columnOptionsModal.vue';
import objectDetailsModal from "./modals/objectDetailsModal";

/**
 * this component contains table and details object modal
 */
export default {
  name: "tab-data",
  components: { downloadModal, columnOptionsModal, objectDetailsModal },
  data() {
    return {
      block:true,
      sortBy: 'nobs',
      sortDesc: true,
    };
  },
  methods: {
    getClass(obj, classifier){
      return this.$store.state.search.classes.find(function(x){
        if(x.value == obj[classifier]){
          return x;
        }
      }).text;
    },
    onRowClicked(item) {
      this.$store.dispatch('objectSelected', item);
      this.$router.push({ name: 'object-details-modal', params: { id: item.oid } });
    },
    getUrlObject() {
      if(this.$route.params.id) {
        this.$store.dispatch('objectSelectedFromURL', {oid: this.$route.params.id});
      }
    },
    pageChange(page){
      if(this.$route.params.id) return;
      this.$store.dispatch('queryObjects', {
        query_parameters: this.$store.state.search.query_parameters, 
        page: page, 
        perPage: this.$store.state.perPage, 
        total:this.$store.state.results.total,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc});
    },
    closeObjectDetailsModal(){
      this.$store.dispatch('setShowObjectDetailsModal', false)
    },
    onSortChanged(ctx){
      console.log("ON SORT")
      this.sortBy = ctx.sortBy
      this.sortDesc = ctx.sortDesc
      this.$store.dispatch('queryObjects', {
        query_parameters: this.$store.state.search.query_parameters, 
        page: this.currentPage, 
        perPage: this.$store.state.perPage, 
        total:this.$store.state.results.total,
        sortBy: this.sortBy,
        sortDesc: this.sortDesc
      })
    }
  },
  mounted: function() {
    this.getUrlObject();
  },
  computed: {
    showObjectDetailsModal(){
      return this.$store.state.results.showObjectDetailsModal
    },
    currentPage:{
      get(){
        return this.$store.state.results.currentPage
      },
      set(value){
        this.$store.dispatch('setCurrentPage', value)
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
