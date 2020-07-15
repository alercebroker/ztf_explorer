<template>
  <v-row>
    <v-col cols="3">
      <v-expansion-panels v-model="panels" dense>
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
                    <alerce-default-search v-model="generalFilters" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <v-divider></v-divider>
              <v-list-group value="true" no-action>
                <template v-slot:activator>
                  <v-list-item-title>Date Filters</v-list-item-title>
                </template>
                <v-list-item class="pl-4">
                  <v-list-item-content>
                    <alerce-date-search v-model="dateFilters" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <v-divider></v-divider>
              <v-list-group value="true" no-action>
                <template v-slot:activator>
                  <v-list-item-title>Conesearch</v-list-item-title>
                </template>
                <v-list-item class="pl-4">
                  <v-list-item-content>
                    <alerce-coordinates-search v-model="conesearchFilters" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <v-list-item class="pl-4">
                <v-list-item-content>
                  <v-btn @click="onSearchClicked">search</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-col cols="9">
      <alerce-result-table
        :page="1"
        :items="items"
        :per-page="10"
        :total="total"
      />
    </v-col>
  </v-row>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import { filtersStore, objectsStore, paginationStore } from '~/store'
@Component
export default class Index extends Vue {
  panels = 0

  get items() {
    return objectsStore.list
  }

  get total() {
    return paginationStore.total
  }

  get generalFilters() {
    return filtersStore.generalFilters
  }

  set generalFilters(val) {
    filtersStore.setGeneralFilters(val)
  }

  get dateFilters() {
    return filtersStore.dateFilters
  }

  set dateFilters(val) {
    filtersStore.setDateFilters(val)
  }

  get conesearchFilters() {
    return filtersStore.conesearchFilters
  }

  set conesearchFilters(val) {
    filtersStore.setConesearchFilters(val)
  }

  onSearchClicked() {
    filtersStore.search()
  }
}
</script>
