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
      <!-- <object-list>
        <template v-slot:pagination="page">
          <simple-pagination
            :value="page.page"
            :disable-next="disableNext"
            @input="page.onInput"
          />
        </template>
      </object-list> -->

      <side-bar @show-side-bar="_showSideObjects"></side-bar>
    </v-navigation-drawer>
    <misc-a-header title="ALeRCE ZTF Explorer" :items="items">
      <template v-slot:menu>
        <misc-navbar-menu
          :logged="logged"
          :user-data="userData"
          :user-initials="userInitials"
          :login-text="loginText"
          :random-color="randomColor"
          @loginClick="onLoginClick"
        />
      </template>
    </misc-a-header>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import { Component } from 'nuxt-property-decorator'
import DefaultLayout from './default.vue'
@Component
export default class OidLayout extends DefaultLayout {
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

  showDrawer = true
  drawerMini = true

  // get showDrawer() {
  //   // return this.$store.state.objects.list.length > 0
  //   return true
  // }

  // get disableNext() {
  //   return (
  //     this.$store.state.objects.list.length <
  //     this.$store.state.pagination.perPage
  //   )
  // }

  _showSideObjects(listLen) {
    if (listLen <= 0) {
      this.showDrawer = false
    }
  }

  onTransition() {
    this.drawerMini = !this.drawerMini
  }
}
</script>
