<template>
  <v-content>
    <v-navigation-drawer permanent width="400px">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Search Filters
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item>
          <v-list-item-content>
            <nuxt-link to="/object/123">Home page</nuxt-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-content>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class Index extends Vue {}
</script>
