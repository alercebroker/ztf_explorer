<template>
  <v-app dark>
    <misc-a-header title="ALeRCE ZTF Explorer" :items="items">
      <template v-slot:menu>
        <misc-theme-selector />
      </template>
    </misc-a-header>
    <v-main>
      <nuxt />
    </v-main>
    <!-- <misc-a-footer social></misc-a-footer> -->
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
