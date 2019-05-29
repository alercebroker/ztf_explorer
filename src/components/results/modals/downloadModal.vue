<template>
  <b-modal id="showDownloadModal" title="Download Objects" hide-footer>
    <div class="row">
      <div class="col-4">
        Select Format
      </div>
      <div class="col-8">
        <b-form-select v-model="selected" :options="options" class="mb-3"/>
      </div>
    </div>
    <div class="row">
      <div class="col-8">
          <div v-if="$store.state.search.file">
            <b-alert class="m-1" show>{{ startDownload }}</b-alert>
          </div>
      </div>
      <b-btn class="col-3 m-1" variant="outline-success" @click="downloadFile">Download</b-btn>
    </div>
  </b-modal>
  
</template>

<script>
export default {
  name: "download-modal",
  props: ["query", "downloading"],
  data() {
    return {
      interval: null,
      selected: "CSV",
      options: [
        { value: "CSV", text: "CSV" },
        { value: "FITS", text: "FITS", disabled: true },
        { value: "VOT", text: "VOT" }
      ]
    };
  },
  methods: {
    downloadFile()
    {
      this.$store.dispatch('downloadFile', this.selected);
    },
  },
  computed: {
    startDownload: function(){
      var result = JSON.parse(this.$store.state.search.file);
      this.$emit("update:downloading", false);
      const link = document.createElement("a");
      link.href = result.url;
      link.setAttribute(
              "download",
              "report." + this.selected.toLowerCase()); 
      //or any other extension
      document.body.appendChild(link);
      link.click();
      this.$store.state.search.file = null;
      return "The download has started";
    }
  },
};
</script>
