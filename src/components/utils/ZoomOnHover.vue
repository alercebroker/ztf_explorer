<template>
    <v-row>
        <v-col v-for="(image, index) in images" :key="image">
            <div
                class="zoom-on-hover"
                @mousemove="move($event, index)"
                @mouseenter="zoom"
                @mouseleave="unzoom"
            >
                <img class="normal" :class="customClasses" :ref="'normal_'+index" :src="image" />
                <img class="zoom" :ref="'zoom_'+index" :src="image" />
            </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: "zoom-on-hover",
    props: {
        images: {
            type: Array,
            default: []
        },
        customClasses: {
            type: String,
            default: ""
        },
        scale: {
            type: Number,
            default: 1
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scaleFactor: 1,
            resizeCheckIntervals: []
        };
    },
    methods: {
        zoom() {
            if (this.disabled) return;
            for (let i = 0; i < this.images.length; i++) {
                this.$refs["zoom_" + i][0].style.opacity = 1;
                this.$refs["normal_" + i][0].style.opacity = 0;
            }
        },
        unzoom() {
            if (this.disabled) return;
            for (let i = 0; i < this.images.length; i++) {
                this.$refs["zoom_" + i][0].style.opacity = 0;
                this.$refs["normal_" + i][0].style.opacity = 1;
            }
        },
        move(event, index) {
            if (this.disabled) return;
            var offset = this.pageOffset(this.$el.children[index].children[0]);
            var zoom = this.$refs["zoom_" + index][0];
            var normal = this.$refs["normal_" + index][0];
            var relativeX = event.clientX - offset.x + window.pageXOffset;
            var relativeY = event.clientY - offset.y + window.pageYOffset;
            var normalFactorX = relativeX / normal.offsetWidth;
            var normalFactorY = relativeY / normal.offsetHeight;
            var x =
                normalFactorX *
                (zoom.offsetWidth * this.scaleFactor - normal.offsetWidth);
            var y =
                normalFactorY *
                (zoom.offsetHeight * this.scaleFactor - normal.offsetHeight);
            for (let i = 0; i < this.images.length; i++) {
                zoom = this.$refs["zoom_" + i][0];
                zoom.style.left = -x + "px";
                zoom.style.top = -y + "px";
            }
        },
        pageOffset(el) {
            // -> {x: number, y: number}
            // get the left and top offset of a dom block element

            var rect = el.getBoundingClientRect(),
                scrollLeft =
                    window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop =
                    window.pageYOffset || document.documentElement.scrollTop;
            return {
                y: rect.top + scrollTop,
                x: rect.left + scrollLeft
            };
        }
    },
    mounted() {
        if (this.$props.scale) {
            this.scaleFactor = parseInt(this.$props.scale);
            for (let i = 0; i < this.images.length; i++) {
                this.$refs["zoom_" + i][0].style.transform =
                    "scale(" + this.scaleFactor + ")";
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.zoom-on-hover {
    position: relative;
    overflow: hidden;
}
.zoom-on-hover .normal {
    width: 100%;
}
.zoom-on-hover .zoom {
    position: absolute;
    opacity: 0;
    transform-origin: top left;
}
</style>