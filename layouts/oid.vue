<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="showDrawer"
      app
      expand-on-hover
      mini-variant-width="170"
      width="170"
      @transitionend="onTransition"
    >
      <side-bar @show-side-bar="_showSideObjects"></side-bar>
    </v-navigation-drawer>
    <v-app-bar app dense>
      <a style="cursor: pointer" @click="goBack">
        <v-img :src="headerLogo" max-width="40px" class="mr-4" />
      </a>
      <v-toolbar-title class="mr-4">ALeRCE LSST Explorer</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items v-if="items">
        <v-btn v-for="item in items" :key="item.to" :href="item.to" text>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-menu offset-y right bottom :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <misc-navbar-menu
          :logged="logged"
          :user-data="userData"
          :user-initials="userInitials"
          :login-text="loginText"
          :random-color="randomColor"
          @loginClick="onLoginClick"
        />
      </v-menu>
    </v-app-bar>
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
      title: 'ALeRCE ZTF Explorer',
      to: 'http://alerce.online',
    },
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

  goBack() {
    this.$router.go(-1)
  }

  get headerLogo() {
    return this.$vuetify.theme.isDark
      ? 'https://alerce-static.s3.amazonaws.com/logos/footerAlerceWhite.png'
      : 'https://alerce-static.s3.amazonaws.com/logos/footerAlerce.png'
  }
}
</script>
