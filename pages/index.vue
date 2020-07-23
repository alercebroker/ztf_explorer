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
                    <alerce-default-search
                      v-model="generalFilters"
                      :classifiers="classifiers"
                      :classes="classes"
                    />
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
                  <v-btn color="primary" @click="onSearchClicked">search</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-col cols="9">
      <alerce-result-table
        :page.sync="page"
        :items="items"
        :per-page="perPage"
        :total="total"
        :loading="searching"
        @rowClicked="onRowClicked"
      />
    </v-col>
  </v-row>
</template>

<script>
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import debounce from 'lodash.debounce'
import { filtersStore, objectsStore, paginationStore } from '~/store'
@Component
export default class Index extends Vue {
  panels = 0

  mounted() {
    filtersStore.getClassifiers()
  }

  get classifiers() {
    return filtersStore.classifiers
  }

  get classes() {
    return filtersStore.classes
  }

  get selectedClassifier() {
    return filtersStore.selectedClassifier
  }

  @Watch('selectedClassifier')
  onClassifierChange(val) {
    filtersStore.getClasses(val)
  }

  get searching() {
    return filtersStore.searching
  }

  get page() {
    return paginationStore.page
  }

  set page(val) {
    return paginationStore.setPage(val)
  }

  get perPage() {
    return paginationStore.perPage
  }

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
    return {
      minMjd: filtersStore.dateFilters.firstmjd[0],
      maxMjd: filtersStore.dateFilters.firstmjd[1],
    }
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
    paginationStore.setPage(1)
    this.debouncedSearch()
  }

  debouncedSearch = debounce(filtersStore.search, 400, {
    leading: false,
    trailing: true,
  })

  @Watch('page')
  onPageChange(val) {
    paginationStore.setCount('false')
    this.debouncedSearch()
  }

  onRowClicked(item) {
    objectsStore.setSelected(item)
    // this.$router.push({ path: `/object/${item.oid}` })
  }
}
</script>
