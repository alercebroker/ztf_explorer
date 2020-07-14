<template>
  <v-app dark>
    <alerce-a-header title="ALeRCE ZTF Explorer" :items="items" />
    <nuxt />
    <alerce-a-footer social></alerce-a-footer>
  </v-app>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class DefaultLayout extends Vue {
  items = [
    {
      title: 'ALeRCE Main Page',
      to: 'http://alerce.science',
    },
    {
      title: 'SN Hunter',
      to: 'https://snhunter.alerce.online',
    },
  ]
}
</script>
