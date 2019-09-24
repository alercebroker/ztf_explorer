<template>
    <div id="aladin-lite-div" />
</template>

<script>
export default {
    name: "aladin",
    data() {
        return {
            aladin: null
        };
    },
    methods: {
        callback(data) {
            console.log("CALLBACK", data);
        }
    },
    mounted() {
        this.aladin = A.aladin("#aladin-lite-div", {
            survey: "P/PanSTARRS/DR1/color-z-zg-g",
            fov: 0.03,
            cooFrame: "J2000d"
        });
        if (this.coordinates.ra && this.coordinates.dec) {
            this.aladin.gotoRaDec(this.coordinates.ra, this.coordinates.dec);
            this.aladin.addCatalog(
                A.catalogFromSimbad(this.coordinates, 0.014, {
                    onClick: "showTable"
                })
            );
            this.aladin.addCatalog(
                A.catalogFromNED(this.coordinates, 0.014, {
                    onClick: "showTable",
                    shape: "plus"
                })
            );
            this.aladin.addCatalog(
                A.catalogFromVizieR("I/311/hip2", this.coordinates, 0.014, {
                    onClick: "showTable"
                })
            );
        }
    },
    watch: {
        coordinates(newCoord) {
            if (this.aladin) {
                this.aladin.gotoRaDec(
                    this.coordinates.ra,
                    this.coordinates.dec
                );
                this.aladin.addCatalog(
                    A.catalogFromSimbad(this.coordinates, 0.014, {
                        onClick: "showTable"
                    })
                );
                this.aladin.addCatalog(
                    A.catalogFromNED(this.coordinates, 0.014, {
                        onClick: "showTable",
                        shape: "plus"
                    })
                );
                this.aladin.addCatalog(
                    A.catalogFromVizieR("I/311/hip2", this.coordinates, 0.014, {
                        onClick: "showTable"
                    })
                );
            }
        }
    },
    computed: {
        coordinates() {
            return {
                ra: this.$store.state.results.selectedObject
                    ? this.$store.state.results.selectedObject.meanra
                    : null,
                dec: this.$store.state.results.selectedObject
                    ? this.$store.state.results.selectedObject.meandec
                    : null
            };
        }
    }
};
</script>

<style scoped>
#aladin-lite-div {
    height: "100%";
    width: "100%";
    min-height: 200px;
}
</style>
