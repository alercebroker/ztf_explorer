<template>
  <v-main>
    <v-navigation-drawer permanent width="400px">
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
    </v-navigation-drawer>
  </v-main>
</template>

<script>
import { Vue, Component, Watch } from 'nuxt-property-decorator'
// import { getModule } from 'vuex-module-decorators'
import { filtersStore } from '~/store'
@Component
export default class Index extends Vue {
  panels = 0
  // filterModule = getModule(Filters, this.$store)
  f = filtersStore

  get generalFilters() {
    return this.f.generalFilters
  }

  set generalFilters(val) {
    this.f.setGeneralFilters(val)
  }

  get dateFilters() {
    return this.f.dateFilters
  }

  set dateFilters(val) {
    this.f.setDateFilters(val)
  }

  get conesearchFilters() {
    return this.f.conesearchFilters
  }

  set conesearchFilters(val) {
    this.f.setConesearchFilters(val)
  }

  onSearchClicked() {
    this.f.search()
  }

  @Watch('generalFilters', { deep: true })
  changeFilters(data) {
    console.log('JAVIER CAMBIO FILTERS', data)
  }
}
</script>
