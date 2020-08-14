<template>
  <v-app dark>
    <navigation-bar />
    <alerce-a-header title="ALeRCE ZTF Explorer" :items="items" />
    <v-main>
      <nuxt />
    </v-main>
    <!-- <alerce-a-footer social></alerce-a-footer> -->
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
