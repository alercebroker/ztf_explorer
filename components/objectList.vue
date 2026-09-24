<template>
  <div>
    <v-list dense>
      <v-subheader>
        <slot name="header">Object List</slot>
      </v-subheader>
      <v-divider />
      <v-list-item-group v-model="selected" color="primary">
        <v-list-item v-for="(obj, i) in objects" :key="i">
          <v-list-item-title>{{ obj.oid }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <slot name="pagination" :page="page" :onInput="onInput"> </slot>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import debounce from 'lodash.debounce'
import { filtersStore } from '~/store'
@Component
export default class ObjectList extends Vue {
  get objects() {
    return this.$store.state.objects.list
  }

  get selected() {
    return this.objects.findIndex((x) => x.oid === this.object)
  }

  get object() {
    return this.$store.state.object.objectId
  }

  set selected(val) {
    const oid = this.objects[val].oid
    return this.$store.dispatch('object/changeObjectId', oid)
  }

  get page() {
    return this.$store.state.pagination.page
  }

  debouncedSearch = debounce(this.search, 400, {
    leading: false,
    trailing: true,
  })

  set page(val) {
    this.onInput(val)
  }

  async search() {
    await filtersStore.search()
    const oid = this.objects[0].oid
    this.$store.dispatch('object/changeObjectId', oid)
  }

  onInput(val) {
    this.$store.dispatch('pagination/changePage', val)
    this.debouncedSearch()
  }
}
</script>
