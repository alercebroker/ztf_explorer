<template>
  <v-row>
    <v-col xl="3" lg="3" md="3" sm="12" xs="12" cols="12">
      <search-bar
        :panels.sync="panels"
        :general-filters.sync="generalFilters"
        :date-filters.sync="dateFilters"
        :conesearch-filters.sync="conesearchFilters"
        :classes="classes"
        :classifiers="classifiers"
        @search="onSearchClicked"
        @clear="onClearClicked"
      />
    </v-col>
    <v-col xs="12" sm="12" md="9" lg="9" xl="9" cols="12">
      <results-table
        :items="items"
        :page.sync="page"
        :per-page="perPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :total="total"
        :loading="searching"
        @rowClicked="onRowClicked"
        @update:page="onPaginationOptionsChange"
        @update:sortBy="onPaginationOptionsChange"
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

  head() {
    return {
      title: 'Home',
    }
  }

  fetch() {
    filtersStore.getClassifiers()
    filtersStore.getLimitValues()
  }

  get classifiers() {
    return filtersStore.classifiers.map((x) => x.name)
  }

  get classes() {
    return filtersStore.classes
  }

  get selectedClassifier() {
    return filtersStore.selectedClassifier
  }

  @Watch('selectedClassifier')
  onClassifierChange(val) {
    if (!val) return
    filtersStore.getClasses(val)
  }

  get searching() {
    return filtersStore.searching
  }

  get page() {
    return paginationStore.page
  }

  set page(val) {
    paginationStore.setPage(val)
  }

  get perPage() {
    return paginationStore.perPage
  }

  get sortBy() {
    return paginationStore.sortBy
  }

  set sortBy(val) {
    paginationStore.setSortBy(val)
  }

  get sortDesc() {
    return paginationStore.sortDesc
  }

  set sortDesc(val) {
    paginationStore.setSortDesc(val)
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

  debouncedSearch = debounce(filtersStore.search, 400, {
    leading: false,
    trailing: true,
  })

  onSearchClicked() {
    paginationStore.setPage(1)
    this.debouncedSearch()
  }

  onClearClicked() {
    filtersStore.clearFilters()
  }

  onPaginationOptionsChange() {
    this.debouncedSearch()
  }

  onRowClicked(item) {
    this.$router.push({ path: `/object/${item.oid}` })
  }
}
</script>
