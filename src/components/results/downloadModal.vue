<template>
  <b-modal id="showDownloadModal" title="Download Objects">
    <div class="row">
      <div class="col-4">
        Select Format
      </div>
      <div class="col-8">
        <b-form-select v-model="selected" :options="options" class="mb-3"/>
      </div>
      <b-btn class="offset-8 col-3" @click="downloadFile">Download</b-btn>
    </div>
    <div v-if="$store.state.search.file" >
      <h2>{{ startDownload }}</h2>
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
      download: false,
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
      console.log("kljh");
      var result = JSON.parse(this.$store.state.search.file);
      this.$emit("update:downloading", false);
      this.download = false;
      const link = document.createElement("a");
      link.href = result.url;
      link.setAttribute(
              "download",
              "report." + this.selected.toLowerCase()); 
      //or any other extension
      document.body.appendChild(link);
      link.click();
      return "La descarga ha comenzado";
    }
  },
};
</script>
