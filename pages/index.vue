<template>
  <v-row>
    <v-col xl="3" lg="3" md="3" sm="12" xs="12" cols="12">
      <validation-observer ref="filters" v-slot="{ invalid }">
        <search-bar
          :panels.sync="panels"
          :general-filters.sync="generalFilters"
          :date-filters.sync="dateFilters"
          :conesearch-filters.sync="conesearchFilters"
          :classes="classes"
          :classifiers="classifiers"
          :loading="searching"
          :invalid="invalid"
          @search="onSearchClicked"
          @clear="onClearClicked"
        />
      </validation-observer>
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
        @pageChangeClick="debouncedSearch"
        @sortChangeClick="debouncedSearch"
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

  async fetch() {
    await filtersStore.getClassifiers()
    await filtersStore.getLimitValues()
    if (
      Object.keys(this.$route.query).length &&
      this.$route.fullPath.slice(2) !== filtersStore.defaultQuerystring
    ) {
      this.paramsToJson(this.$route.query)
      // Wait until the models are updated in the UI
      this.$nextTick(() => {
        this.$refs.filters.validate().then((success) => {
          if (success) this.debouncedSearch()
        })
      })
    }
  }

  paramsToJson(query) {
    if (query.oid !== undefined && !Array.isArray(query.oid)) {
      query.oid = [query.oid]
    }
    if (query.ndet !== undefined && !Array.isArray(query.ndet)) {
      query.ndet = [query.ndet]
    }
    if (query.firstmjd !== undefined && !Array.isArray(query.firstmjd)) {
      query.firstmjd = [query.firstmjd]
    }
    this.generalFilters = {
      oid: 'oid' in query ? query.oid : filtersStore.defaultGeneralFilters.oid,
      selectedClass:
        'selectedClass' in query
          ? query.selectedClass
          : filtersStore.defaultGeneralFilters.selectedClass,
      selectedClassifier:
        'selectedClassifier' in query
          ? query.selectedClassifier
          : filtersStore.defaultGeneralFilters.selectedClassifier,
      probability:
        'probability' in query
          ? query.probability
          : filtersStore.defaultGeneralFilters.probability,
      ndet:
        'ndet' in query ? query.ndet : filtersStore.defaultGeneralFilters.ndet,
    }
    this.dateFilters = {
      minMjd:
        'firstmjd' in query
          ? query.firstmjd[0]
          : filtersStore.defaultDateFilters.firstmjd[0],
      maxMjd:
        'firstmjd' in query && query.firstmjd.length > 1
          ? query.firstmjd[1]
          : filtersStore.defaultDateFilters.firstmjd[1],
    }
    this.conesearchFilters = {
      ra: 'ra' in query ? query.ra : filtersStore.defaultConesearchFilters.ra,
      dec:
        'dec' in query ? query.dec : filtersStore.defaultConesearchFilters.dec,
      radius:
        'radius' in query
          ? query.radius
          : filtersStore.defaultConesearchFilters.radius,
    }
    this.page = parseInt(query.page)
    this.sortBy = query.sortBy
    this.sortDesc = query.sortDesc === 'true'
  }

  get querystring() {
    return filtersStore.querystring
  }

  @Watch('querystring')
  onQueryStringChange(qstr) {
    this.$router.replace(`?${qstr}`)
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

  onRowClicked(item) {
    this.$store.dispatch('object/changeObjectId', item.oid)
    this.$router.push({ path: `/object/${item.oid}` })
  }
}
</script>
