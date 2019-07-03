<template>
    <b-card id="main" title="Stamps">
        <b-container fluid>
            <b-card-group deck class="mb-3">
                <b-card border-variant="light" header="Science" class="text-center">
                    <!-- <div
                        class="JS9Menubar"
                        id="JS9ScienceMenubar"
                        data-width="100%"
                        data-height="50px"
                        data-style="mac"
                        data-displays="JS9science"
                        
                        data-js9id="JS9science"
                    ></div> -->
                    <div
                        class="JS9"
                        data-width="100%"
                        data-height="100%"
                        
                    ></div>
                    <!-- <div
                        class="JS9Colorbar"
                        id="JS9ScienceColorbar"
                        data-width="100%"
                        data-displays="JS9science"
                        
                        data-js9id="JS9science"
                    ></div> -->
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
        JS9.init();
        JS9.Load(
            "http://stamps.alerce.online:8087/get_stamp?oid=ZTF18aajhbfp&candid=821270966115015004&type=science",
            { scale: "log", onload: this.setZoom },
            // { display: "JS9science.JS9" }
        );
    },
    destroyed() {
        console.log("destroy");
    },
    methods: {
        setZoom(display) {
            JS9.SetZoom("ToFit", { display: display });
        }
    },
    watch: {},
    computed: {
        stamps() {
            return this.$store.state.results.objectDetails.stamp;
        }
    }
};
</script>

<style scoped>
.JS9menubar {
    width: 100%;
}
</style>
