<template>
  <v-navigation-drawer app right expand-on-hover>
    <v-list-item two-line>
      <v-list-item-avatar>
        <img :src="_logo" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">
          ALeRCE Explorer
        </v-list-item-title>
        <v-list-item-subtitle>
          Navigation
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item-group>
        <v-list-item
          v-for="item in navigationItems"
          :key="item.title"
          :disabled="item.disabled"
          link
          nuxt
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class NavigationBar extends Vue {
  get navigationItems() {
    return [
      {
        title: 'Explore',
        link: '/',
        disabled: false,
      },
      {
        title: 'Object Dashboard',
        link: '/object/' + this.object,
        disabled: !this.object,
      },
    ]
  }

  logoWhite =
    'https://alerce-static.s3.amazonaws.com/logos/footerAlerceWhite.png'

  logoBlue = 'https://alerce-static.s3.amazonaws.com/logos/footerAlerce.png'

  get _logo() {
    if (this.$vuetify.theme.isDark) {
      return this.logoWhite
    } else {
      return this.logoBlue
    }
  }

  // get selectedNavItem() {
  //   return this.$store.state.misc.selectedNavItem
  // }
  //
  // set selectedNavItem(val) {
  //   if (val === undefined) return
  //   this.$store.dispatch('misc/changeSelectedNavItem', val)
  //   this.$router.push(this.navigationItems[val].link)
  // }
  //
  get object() {
    return this.$store.state.object.objectId
  }
}
</script>
