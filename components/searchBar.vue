<template>
  <v-expansion-panels v-model="panelsSync" dense>
    <v-expansion-panel value="true">
      <v-expansion-panel-header
        ><v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Search Filters
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item></v-expansion-panel-header
      >
      <v-expansion-panel-content>
        <v-list dense expand>
          <v-list-group value="true" no-action>
            <template v-slot:activator>
              <v-list-item-title>General Filters</v-list-item-title>
            </template>
            <v-list-item class="pl-4">
              <v-list-item-content>
                <alerce-default-search
                  v-model="generalFiltersSync"
                  :limit-ndet="limitNdet"
                  :classifiers="classifiers"
                  :classes="classes"
                />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-divider></v-divider>
          <v-list-group no-action>
            <template v-slot:activator>
              <v-list-item-title>Discovery Date Filters</v-list-item-title>
            </template>
            <v-list-item class="pl-4">
              <v-list-item-content>
                <alerce-date-search v-model="dateFiltersSync" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-divider></v-divider>
          <v-list-group no-action>
            <template v-slot:activator>
              <v-list-item-title>Conesearch</v-list-item-title>
            </template>
            <v-list-item class="pl-4">
              <v-list-item-content>
                <alerce-coordinates-search v-model="conesearchFiltersSync" />
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item class="pl-4">
            <v-list-item-content>
              <v-row>
                <v-col lg="8" md="12">
                  <v-btn color="primary" block @click="onSearchClicked"
                    >search</v-btn
                  >
                </v-col>
                <v-col lg="4" md="12">
                  <v-btn color="danger" block @click="onClearClicked"
                    >clear</v-btn
                  >
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { Vue, Component, PropSync, Prop } from 'nuxt-property-decorator'
@Component
export default class SearchBar extends Vue {
  @PropSync('generalFilters', { type: Object }) generalFiltersSync
  @PropSync('dateFilters', { type: Object }) dateFiltersSync
  @PropSync('conesearchFilters', { type: Object }) conesearchFiltersSync
  @PropSync('panels', { type: Number }) panelsSync
  @Prop({ type: Array }) classifiers
  @Prop({ type: Array }) classes

  get limitNdet() {
    return this.$store.state.filters.limitNdet
  }

  onSearchClicked() {
    this.$emit('search')
  }

  onClearClicked() {
    this.$emit('clear')
  }
}
</script>
