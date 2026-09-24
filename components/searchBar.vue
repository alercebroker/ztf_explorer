<template>
  <div @keyup="onKeyUp">
    <v-expansion-panels v-model="panelsSync" dense>
      <v-expansion-panel value="true">
        <v-expansion-panel-header>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title"
                >Search Filters</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list dense expand>
            <v-list-group value="true" no-action>
              <template v-slot:activator>
                <v-list-item-title>General Filters</v-list-item-title>
              </template>
              <v-list-item class="pl-4">
                <v-list-item-content>
                  <validation-provider
                    v-slot="{ failedRules }"
                    rules="ndet|oidFormat|oidLength|probability"
                    :bails="false"
                  >
                    <inputs-default-search
                      v-model="generalFiltersSync"
                      :limit-ndet="limitNdet"
                      :classifiers="classifiers"
                      :classes="classes"
                      :validationErrors="failedRules"
                    />
                  </validation-provider>
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
                  <validation-provider v-slot="{ failedRules }" rules="date">
                    <inputs-date-search
                      v-model="dateFiltersSync"
                      :validationErrors="failedRules"
                    />
                  </validation-provider>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-divider></v-divider>
            <v-list-group no-action>
              <template v-slot:activator>
                <v-flex class="d-flex flex-sm-row align-center pl-0 ml-0">
                  <v-list-item-title class="pl-0">
                    Conesearch
                    <v-tooltip right>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on" dense>mdi-information</v-icon>
                      </template>
                      <span>
                        Conesearch is a coordinate search tool with a search
                        radius.
                        <br />You can input RA/DEC manually or, optionally, give
                        a target name and let Sesame fill in the coordinates.
                        <br />
                        Formats accepted for HMS/DMS: "23:14:56.3" or "23 14
                        56.3".
                      </span>
                    </v-tooltip>
                  </v-list-item-title>
                </v-flex>
              </template>
              <v-list-item class="pl-4">
                <v-list-item-content>
                  <validation-provider
                    v-slot="{ failedRules }"
                    rules="conesearch|radiusPositive"
                    :bails="false"
                  >
                    <inputs-coordinates-search
                      v-model="conesearchFiltersSync"
                      :validationErrors="failedRules"
                    />
                  </validation-provider>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item class="pl-4">
              <v-list-item-content>
                <v-row>
                  <v-col lg="7" md="12">
                    <v-btn
                      color="primary"
                      block
                      :disabled="loading || invalid"
                      @click="onSearchClicked"
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
  </div>
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
  @Prop({ type: Boolean, default: false }) loading
  @Prop({ type: Boolean }) invalid

  get limitNdet() {
    return this.$store.state.filters.limitNdet
  }

  onSearchClicked() {
    this.$emit('search')
  }

  onClearClicked() {
    this.$emit('clear')
  }

  onKeyUp(event) {
    if (event.key === 'Enter' && !this.invalid) this.onSearchClicked()
  }
}
</script>
