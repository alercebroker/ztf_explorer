<template>
    <v-container pt-0 pr-0 fluid>
        <div v-if="!$vuetify.breakpoint.smAndDown">
            <result-panel id="v-step-1" />
            <v-navigation-drawer
                id="v-step-0"
                permanent
                clipped
                app
                v-model="drawer"
                :mini-variant="mini"
                width="400"
                min-width="400"
                mini-variant-width="40"
                stateless
            >
                <div v-if="!mini">
                    <v-toolbar dark color="toolbar" dense>
                        <v-toolbar-title>Search Options</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip left>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click.stop="mini=!mini">
                                    <v-icon>chevron_left</v-icon>
                                </v-btn>
                            </template>
                            <span>Hide</span>
                        </v-tooltip>
                    </v-toolbar>
                    <search-options @onSearch="onSearch" />
                </div>
                <v-sheet
                    class="d-flex"
                    height="100%"
                    color="toolbar"
                    @click.stop="mini=!mini"
                    v-else
                    style="border-radius: 0px 0px 0px 0px;"
                >
                    <v-tooltip right>
                        <template v-slot:activator="{on}">
                            <v-layout justify-center align-center v-on="on">
                                <v-btn class="mx-2" fab dark small color="primary">
                                    <v-icon dark>search</v-icon>
                                </v-btn>
                            </v-layout>
                        </template>
                        <span>Show</span>
                    </v-tooltip>
                </v-sheet>
            </v-navigation-drawer>
            <object-details-modal
                @modalClosed="closeObjectDetailsModal"
                v-if="$store.state.results.showObjectDetailsModal"
            />
        </div>
        <div v-else>
            <result-panel></result-panel>
            <object-details-modal
                @modalClosed="closeObjectDetailsModal"
                v-if="$store.state.results.showObjectDetailsModal"
            />
        </div>
        <v-tour name="tutorial" :steps="steps" style="z-index: 10000">
            <template slot-scope="tour">
                <transition name="fade">
                    <v-step
                        v-if="tour.steps[tour.currentStep]"
                        :step="tour.steps[tour.currentStep]"
                        :key="tour.currentStep"
                        :previous-step="tour.previousStep"
                        :next-step="tour.nextStep"
                        :stop="tour.stop"
                        :is-first="tour.isFirst"
                        :is-last="tour.isLast"
                        :labels="tour.labels"
                        style="z-index: 1000000"
                    >
                        <template v-if="tour.currentStep === 2">
                            <div slot="actions">
                                <v-row>
                                    <v-col>
                                        <v-btn
                                            @click="tour.previousStep"
                                            class="btn btn-primary text-none"
                                            x-small
                                            outlined
                                            dark
                                            tile
                                        >Previous</v-btn>
                                    </v-col>
                                    <v-col>
                                        <v-btn
                                            @click="tutorialNextStep(tour)"
                                            class="btn btn-primary text-none"
                                            x-small
                                            outlined
                                            dark
                                            tile
                                            :disabled="nextDisabled"
                                        >Next</v-btn>
                                    </v-col>
                                </v-row>
                            </div>
                        </template>
                        <template v-else-if="tour.currentStep === 11">
                            <div slot="actions">
                                <v-row>
                                    <v-col>
                                        <v-btn
                                            @click="tutorialClose"
                                            class="btn btn-primary text-none"
                                            x-small
                                            outlined
                                            dark
                                            tile
                                        >Close</v-btn>
                                    </v-col>
                                </v-row>
                            </div>
                        </template>

                        <template v-else>
                            <div slot="actions">
                                <v-row>
                                    <v-col>
                                        <v-btn
                                            @click="tour.previousStep"
                                            class="btn btn-primary text-none"
                                            x-small
                                            outlined
                                            dark
                                            tile
                                        >Previous</v-btn>
                                    </v-col>
                                    <v-col>
                                        <v-btn
                                            @click="tutorialNextStep(tour)"
                                            class="btn btn-primary text-none"
                                            x-small
                                            outlined
                                            dark
                                            tile
                                        >Next</v-btn>
                                    </v-col>
                                </v-row>
                            </div>
                        </template>
                    </v-step>
                </transition>
            </template>
        </v-tour>
    </v-container>
</template>

<script>
import searchOptions from "../components/search/searchOptions.vue";
import resultPanel from "../components/results/resultPanel.vue";
import objectDetailsModal from "@/components/results/modals/objectDetailsModal";
import { gregorianToJd } from "@/components/utils/AstroDates.js";
export default {
    name: "explore-data",
    props: {},
    components: {
        searchOptions,
        resultPanel,
        objectDetailsModal
    },
    data() {
        return {
            drawer: true,
            mini: false,
            steps: [
                {
                    target: "#v-step-0",
                    content: "Use this panel to search objects",
                    params: {
                        placement: "right",
                        enableScrolling: false
                    }
                },
                {
                    target: "#v-step-1",
                    content:
                        "Results will appear in this table. Press next to perform a sample query.",
                    params: {
                        placement: "bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: "#v-step-1",
                    content: "Wait until query finishes",
                    params: {
                        placement: "bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: "#v-step-2",
                    content:
                        "Click Next to select this item and open object details",
                    params: {
                        placement: "bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: "#v-step-3",
                    content:
                        "Here you can see information about the object, like its coordinates, \
                        detection dates, class, etc. There are also buttons that link to different catalogs \
                        if you wan't to see crossmatch information.",
                    params: {
                        placement: "right",
                        enableScrolling: false
                    }
                },
                {
                    target: "#v-step-4",
                    content:
                        "In this table you can find magnitude statistics for each band.",
                    params: {
                        placement: "bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: "#v-step-5",
                    content:
                        "Here you will find the stamps of each detection. \
                        Use the arrows or the dropdown selection to change the date of the stamp",
                    params: {
                        placement: "top",
                        enableScrolling: false
                    }
                },
                {
                    target: "#v-step-6",
                    content:
                        "This is the light curve plot. You can change between difference or apparent \
                        magnitude and if available, folded lightcurve. You can also click on a detection \
                         point to change the date of the stamps",
                    params: {
                        placement: "bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: "#v-step-7",
                    content:
                        "Here you can see pictures of the area surrounding the object. If available,\
                         you will see markers for close crossmatched objects and if you click in a marker,\
                         a table will appear showing information from another catalog.",
                    params: {
                        placement: "bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: "#v-step-8",
                    content: "This plot shows the probability for each class.",
                    params: {
                        placement: "top",
                        enableScrolling: false
                    }
                },
                {
                    target: "#v-step-9",
                    content:
                        "You can use theese arrows to cycle through objects",
                    params: {
                        placement: "bottom",
                        enableScrolling: false
                    }
                },
                {
                    target: "#v-step-10",
                    content:
                        "You are done with this tour. Have fun using the ALeRCE Explorer.",
                    params: {
                        placement: "bottom",
                        enableScrolling: false
                    }
                }
            ],
            callbacks: {
                onNextStep: this.onNextStep
            }
        };
    },
    methods: {
        onSearch() {
            this.mini = true;
        },
        getUrlObject() {
            if (this.$route.params.id) {
                this.$store.dispatch("objectSelectedFromURL", {
                    oid: this.$route.params.id
                });
            }
        },
        closeObjectDetailsModal() {
            this.$store.dispatch("setShowObjectDetailsModal", false);
            if (this.$store.state.tutorialOpen) {
                this.$tours["tutorial"].stop();
                this.$store.dispatch("setTutorialOpen", false);
            }
        },
        executeSampleQuery() {
            let queryParameters = {
                dates: {
                    firstmjd: {
                        min: gregorianToJd(new Date("2019-07-01"))
                    }
                }
            };
            this.$store.dispatch("queryObjects", {
                query_parameters: queryParameters,
                page: 1,
                perPage: 10,
                sortBy: "lastmjd"
            });
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        tutorialNextStep(tour) {
            if (tour.currentStep === 1) {
                this.executeSampleQuery();
                tour.nextStep();
            } else if (tour.currentStep === 3) {
                let sleep = this.sleep;
                this.$store
                    .dispatch("tutorialObjectSelected", this.objects[0])
                    .then(response => {
                        if (response === "ok") {
                            sleep(2000);
                            tour.nextStep();
                        }
                    });
            } else tour.nextStep();
        },
        tutorialClose() {
            this.closeObjectDetailsModal();
            this.$store.dispatch("setObjects", {
                total: null,
                result: [],
                num_pages: null
            });
        }
    },
    mounted: function() {
        this.getUrlObject();
        console.log("This is", process.env.VUE_APP_TITLE);
    },
    computed: {
        nextDisabled() {
            return !this.$store.state.results.total > 0;
        },
        objects() {
            let objects = JSON.parse(
                JSON.stringify(this.$store.state.results.objects)
            );
            return Object.values(objects);
        }
    },
    watch: {
        objects(newVal) {
            this.steps[2].content = "Objects ready, click Next to continue";
        }
    }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>