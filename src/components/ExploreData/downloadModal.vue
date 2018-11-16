<template>
	<div class="row">
		<div class="col-4">Select Format</div>
		<div class="col-8">
			<b-form-select v-model="selected" :options="options" class="mb-3" />
		</div>
		<b-btn class="offset-8 col-3" @click="download">Download</b-btn>

	</div>
</template>

<script>

export default {
  name: 'downloadModal',
  props: ["query","loading"],
	data() {
      return {
          interval :null,
          load : false,
          selected :null,
		  options : ["CSV","FITS","VOT"]
	  }
	},
	methods: {
      queryTask(task_id){
          let self = this;
          this.$http.post(
        		'/v2/query_result', {
					"task-id": task_id
        		},
		).then(function (response) {
		    let result = JSON.parse(response.data.result)
			  self.$emit("update:loading",false);
			console.log(result.url);
			self.load = false;
   			const link = document.createElement('a');
   			link.href = result.url;
		   link.setAttribute('download', 'report.' + self.selected.toLowerCase()); //or any other extension
		   document.body.appendChild(link);
		   link.click();
			}).catch(function (error) {
				console.log(error);
			});
	  },
      download(){
          let self = this;
          this.$emit("update:loading",true);
        this.load = true;
          this.$http.post(
        '/v2/download', {
            "q": this.query,
            "format": this.selected
        },
    ).then(function (response) {
		console.log(response.data)
			  console.log(response.data["task-id"])
			  self.interval = setInterval(
			      function() {
                      self.queryTask(response.data["task-id"]);
                  }
			      , 2000);
		}).catch(function (error) {
		    self.$emit("update:loading",false);
        self.load = false;
			console.log(error);
		});
	  }
	},
	watch: {
	  load(val) {
		if(!val) {
		    clearInterval(this.interval);
		}
	  }
	},
}
</script>