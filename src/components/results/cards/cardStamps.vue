<template>
    <b-card id="main" title="Stamps">
        <b-container fluid>
            <b-card-group deck class="mb-3">
                <b-card border-variant="light" header="Science" class="text-center">
                    <div
                        class="JS9Menubar"
                        id="JS9SciMenubar"
                        data-width="100%"
                        data-height="50px"
                        data-style="mac"
                    ></div>
                    <div
                        class="JS9"
                        id="JS9Sci"
                        data-width="100%"
                        data-height="100%"
                        data-js9init="false"
                    ></div>
                    <div class="JS9Colorbar" id="JS9SciColorbar" data-width="100%" />
                </b-card>
                <b-card border-variant="light" header="Template" class="text-center">
                    <div
                        class="JS9Menubar"
                        id="JS9TemMenubar"
                        data-width="100%"
                        data-height="50px"
                        data-style="mac"
                    ></div>
                    <div
                        class="JS9"
                        id="JS9Tem"
                        data-width="100%"
                        data-height="100%"
                        data-js9init="false"
                    ></div>
                    <div class="JS9Colorbar" id="JS9TemColorbar" data-width="100%" />
                </b-card>
                <b-card border-variant="light" header="Difference" class="text-center">
                    <div
                        class="JS9Menubar"
                        id="JS9DifMenubar"
                        data-width="100%"
                        data-height="50px"
                        data-style="mac"
                    ></div>
                    <div
                        class="JS9"
                        id="JS9Dif"
                        data-width="100%"
                        data-height="100%"
                        data-js9init="false"
                    ></div>
                    <div class="JS9Colorbar" id="JS9DifColorbar" data-width="100%" />
                </b-card>
            </b-card-group>
        </b-container>
    </b-card>
</template>

<script>
export default {
    name: "js9",
    data() {
        return {
            width: "200px",
            height: "54px",
            datainit: false
        };
    },
    mounted() {
        console.log("mounted card stamps");
        JS9.init();
        JS9.Load(
            "http://stamps.alerce.online:8087/get_stamp?oid=" +
                this.object +
                "&candid=" +
                this.candid +
                "&type=science",
            { scale: "log", onload: this.setZoom },
            { display: "JS9Sci" }
        );
        JS9.Load(
            "http://stamps.alerce.online:8087/get_stamp?oid=" +
                this.object +
                "&candid=" +
                this.candid +
                "&type=template",
            { scale: "log", onload: this.setZoom },
            { display: "JS9Tem" }
        );
        JS9.Load(
            "http://stamps.alerce.online:8087/get_stamp?oid=" +
                this.object +
                "&candid=" +
                this.candid +
                "&type=difference",
            { scale: "log", onload: this.setZoom },
            { display: "JS9Dif" }
        );
        console.log("IMAGE", JS9.LookupImage("get_stamp"))
    },
    beforeDestroy() {
        JS9.CloseImage({ display: "JS9Sci" });
        JS9.CloseImage({ display: "JS9Tem" });
        JS9.CloseImage({ display: "JS9Dif" });
    },
    methods: {
        setZoom(display) {
            JS9.SetZoom("ToFit", { display: display });
        }
    },
    watch: {},
    computed: {
        object() {
            return this.$store.state.results.selectedObject.oid;
        },
        candid() {
            return this.$store.state.results.objectDetails.detections[0]
                .candid_str;
        }
    }
};
</script>

<style scoped>
.JS9menubar {
    width: 100%;
}
</style>
