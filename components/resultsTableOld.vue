<template>
  <tables-result-table
    :pagination-options="paginationOptions"
    :items="tableItems"
    :total="total"
    :loading="loading"
    :column-options="selectedColumnOptions"
    :no-data-text="noDataText"
    @rowClicked="onRowClicked"
    @pageChange="onPageChange"
    @sortByChange="onSortChange"
  />
</template>

<script>
import { Vue, Component, Prop, PropSync, Emit } from 'nuxt-property-decorator'
import { objectsStore } from '~/store'
@Component
export default class ResultTableWrapper extends Vue {
  @Prop({ type: Array }) items

  @Prop({ type: Number }) perPage

  @PropSync('page', { type: Number }) pageSync

  @PropSync('sortBy', { type: String }) sortBySync

  @PropSync('sortDesc', { type: Boolean }) sortDescSync

  @Prop({ type: Number }) total

  @Prop({ type: Boolean }) loading

  selectedColumnOptions = [
    {
      value: 'oid',
      sortable: false,
      text: 'Object ID',
      show: true,
    },
    {
      value: 'ndet',
      sortable: true,
      text: 'Number of detections',
      show: true,
    },
    {
      value: 'ndethist',
      sortable: true,
      text: 'Number of detections history',
      show: false,
    },
    {
      value: 'ncovhist',
      sortable: true,
      text: 'ncovhist',
      show: false,
    },
    {
      value: 'jdstarthist',
      sortable: true,
      text: 'jdstarthist',
      show: false,
    },
    {
      value: 'jdendhist',
      sortable: true,
      text: 'jdendhist',
      show: false,
    },
    {
      value: 'corrected',
      sortable: true,
      text: 'jdendhist',
      show: false,
    },
    {
      value: 'stellar',
      sortable: true,
      text: 'stellar',
      show: false,
    },
    {
      value: 'firstmjd',
      text: 'FirstMJD',
      sortable: true,
      show: true,
    },
    {
      value: 'lastmjd',
      sortable: true,
      text: 'LastMJD',
      show: true,
    },
    {
      value: 'radec',
      text: 'RA/Dec (degrees)',
      sortable: false,
      show: true,
    },
    {
      value: 'class',
      sortable: false,
      text: 'Highest Probability Class',
      show: true,
    },
    {
      value: 'probability',
      sortable: true,
      text: 'Highest Probability',
      show: true,
    },
    {
      value: 'deltajd',
      text: 'DeltaMJD (days)',
      show: true,
    },
    {
      value: 'meandec',
      text: 'Dec (degrees)',
      sortable: false,
      show: false,
    },
    {
      value: 'meanra',
      text: 'RA (degrees)',
      sortable: false,
      show: false,
    },
    {
      value: 'sigmara',
      text: 'Sigma RA',
      sortable: false,
      show: false,
    },
    {
      value: 'sigmadec',
      text: 'Sigma DEC',
      sortable: false,
      show: false,
    },
  ]

  get paginationOptions() {
    return {
      itemsPerPage: this.perPage,
      page: this.pageSync,
      sortBy: this.sortBySync ? [this.sortBySync] : [],
      sortDesc: this.sortDescSync ? [this.sortDescSync] : [],
    }
  }

  get tableItems() {
    if (this.items && this.items.length) {
      const keys = Object.keys(this.items[0])
      return this.items.map((obj) => {
        const objCopy = Object.assign({}, obj)
        keys.forEach((key) => {
          if (typeof obj[key] === 'number' && !Number.isInteger(obj[key])) {
            objCopy[key] = objCopy[key].toFixed(3)
          }
        })
        objCopy.radec =
          objCopy.meanra && objCopy.meandec
            ? `${objCopy.meanra},\t ${objCopy.meandec}`
            : ''
        return objCopy
      })
    }
    return []
  }

  @Emit('rowClicked')
  onRowClicked(item) {
    return item
  }

  @Emit('pageChangeClick')
  onPageChange(val) {
    this.pageSync = val
    return val
  }

  @Emit('sortChangeClick')
  onSortChange(val) {
    this.sortBySync = val.sortBy.length ? val.sortBy[0] : null
    this.sortDescSync = val.sortDesc.length ? val.sortDesc[0] : null
    return {
      sortBy: val.sortBy.length ? val.sortBy[0] : null,
      sortDesc: val.sortDesc.length ? val.sortDesc[0] : null,
    }
  }

  get noDataText() {
    return objectsStore.noDataText
  }
}
</script>
