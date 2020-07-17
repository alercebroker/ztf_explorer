<template>
  <v-content fluid>
    {{ $route.params.oid }}
  </v-content>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class ObjectView extends Vue {}
</script>
