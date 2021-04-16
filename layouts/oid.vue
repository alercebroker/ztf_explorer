<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="showDrawer"
      app
      expand-on-hover
      mini-variant-width="150"
      width="150"
      @transitionend="onTransition"
    >
      <object-list>
        <template v-slot:pagination="page">
          <simple-pagination :value="page.page" @input="page.onInput" />
        </template>
      </object-list>
    </v-navigation-drawer>
    <alerce-a-header title="ALeRCE ZTF Explorer" :items="items" />
    <v-main>
      <nuxt />
    </v-main>
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

  drawerMini = true

  get showDrawer() {
    return this.$store.state.objects.list.length > 0
  }

  onTransition() {
    this.drawerMini = !this.drawerMini
  }
}
</script>
