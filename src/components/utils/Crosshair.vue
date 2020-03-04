<template>
  <v-row class="pa-0" justify="center" align="center" style="height:100%;">
    <v-col class="pa-0" sm="4" v-for="(image,index) in images" :key="index">
      <canvas :ref="'canvas_'+index" style="width:100%; height:100%;"></canvas>
    </v-col>
  </v-row>
</template>

<script>
import _ from "lodash";
import "vue-resize/dist/vue-resize.css";
import { ResizeObserver } from "vue-resize";
export default {
  name: "crosshair",
  components: {
    ResizeObserver
  },
  props: {
    images: {
      type: Array,
      default: []
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      debounced: null
    };
  },
  mounted() {
    this.drawImage();
  },
  methods: {
    drawCrosshair(x, y, w, h, ctx) {
      ctx.lineWidth = 10;
      ctx.strokeStyle = 'rgba(255,0,0,0.3)';
      ctx.beginPath();
      ctx.moveTo(x, h / 4);
      ctx.lineTo(x, y - 10);
      ctx.moveTo(x, y + 10);
      ctx.lineTo(x, h - h / 4);
      ctx.moveTo(w / 4, y);
      ctx.lineTo(x - 10, y);
      ctx.moveTo(x + 10, y);
      ctx.lineTo(w - w / 4, y);
      ctx.stroke();
    },
    drawImage() {
      for (let i = 0; i < this.images.length; i++) {
        let canvas = this.$refs["canvas_" + i][0];
        let ctx = canvas.getContext("2d");
        let img = new Image();
        let drawCrosshair = this.drawCrosshair;
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          drawCrosshair(
            canvas.width / 2,
            canvas.height / 2,
            canvas.width,
            canvas.height,
            ctx
          );
        };
        img.src = this.images[i];
      }
    }
  },
  watch: {
    images(newVal) {
      this.drawImage()
    }
  }
};
</script>

<style>
</style>