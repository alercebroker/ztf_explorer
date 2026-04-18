<template>
  <v-row no-gutters>
    <v-col xl="3" lg="3" md="3" sm="12" xs="12" cols="12">
      <search-bar />
    </v-col>
    <v-col xs="12" md="9">
      <results-table></results-table>
    </v-col>
  </v-row>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Index extends Vue {
  panels = 0

  head() {
    return {
      title: 'Home',
    }
  }
}
</script>
