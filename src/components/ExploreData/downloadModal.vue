<template>
  <div class="row">
    <div class="col-4">Select Format</div>
    <div class="col-8">
      <b-form-select v-model="selected" :options="options" class="mb-3"/>
    </div>
    <b-btn class="offset-8 col-3" @click="downloadData">Download</b-btn>
  </div>
</template>

<script>
export default {
  name: "downloadModal",
  props: ["query", "downloading", "params"],
  data() {
    return {
      interval: null,
      download: false,
      selected: "CSV",
      options: [
        {value: "CSV", text: "CSV"},
        {value: "FITS", text: "FITS", disabled: true},
        {value: "VOT", text: "VOT"}
      ]
    };
  },
  methods: {
    getQueryResults(task_id) {
      // let this = this;
      this.$http
        .post("/v2/result", {
          "task-id": task_id
        })
        .then(function(response) {
          let result = JSON.parse(response.data.result);
          this.$emit("update:downloading", false);

          this.download = false;
          const link = document.createElement("a");
          link.href = result.url;
          link.setAttribute(
            "download",
            "report." + this.selected.toLowerCase()
          ); //or any other extension
          document.body.appendChild(link);
          link.click();
        }.bind(this))
        .catch(function(error) {});
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
    downloadData() {
      // let this = this;
      this.$emit("update:downloading", true);
      this.download = true;
      this.$http
        .post("/v2/download", {
          query_parameters: this.params,
          format: this.selected
        })
        .then(function(response) {
            this.interval = setInterval(
              this.queryTask,
              2000,
              response.data["task-id"]
            );
          }.bind(this)
        )
        .catch(function(error) {
          this.$emit("update:downloading", false);
          this.download = false;
        });
    }
  },
  watch: {
    download(val) {
      if (!val) {
        clearInterval(this.interval);
      }
    }
  }
};
</script>
