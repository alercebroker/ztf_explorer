<template>
    <v-container>
        <v-alert
        dense
        dismissible
        color="yellow darken-3"
        icon="mdi-alert"
        border="left"
        type="warning">
            ALeRCE ZTF Explorer will be updated on March 26. The beta version is in <a href="https://dev.alerce.online/">https://dev.alerce.online/</a>
        </v-alert>
        <div
            v-if="$vuetify.breakpoint.smAndDown"
            dark
            background-color="toolbar"
        >
        <v-bottom-sheet scrollable v-model="search">
          <v-card  width="100%">
            <v-card-title primary-title>Search</v-card-title>
            <v-card-text>
              <search-options @onSearch="onSearch"></search-options>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
        </div>
        <div>
            <v-card width="100%" class="mt-2 mb-2">
                <v-card-title primary-title>Results</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="position: relative">
                  <v-btn v-if="$vuetify.breakpoint.smAndDown"
                  absolute
                  dark
                  fab
                  top
                  right
                  color="primary"
                  @click="openSearch()"
                  >
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
                </v-card-text>
                <v-card-text>
                    <tab-data />
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import tabData from "./tabData.vue";
import overviewCards from "./cards/overviewCards.vue";
import searchOptions from "@/components/search/searchOptions.vue";

export default {
    name: "result-panel",
    components: {
        tabData,
        searchOptions,
        overviewCards
    },
    data(){
      return {
        search: true
      }
    },
    methods: {
        openSearch(){
          this.search = true;
        },
        onSearch() {
            if (this.$vuetify.breakpoint.smAndDown) {
                this.search = false;
            }
        }
    },
    computed: {
        selectedTab: {
            get() {
                return this.$store.state.selectedTab;
            },
            set(value) {
                this.$store.dispatch("setSelectedTab", value);
            }
        }
    }
};
</script>

<style scoped>
</style>
