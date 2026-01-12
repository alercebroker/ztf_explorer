<template>
  <v-app dark>
    <v-app-bar app dense>
      <a style="cursor: pointer" @click="goToForm">
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
    <!-- <misc-a-footer social></misc-a-footer> -->
  </v-app>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import { userStore } from '~/store'
@Component
export default class DefaultLayout extends Vue {
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

  goToForm() {
    this.$router.push({
      path: '/',
      query: this.$route.query,
    })
  }

  onLoginClick() {
    if (userStore.logged) {
      userStore.logout()
    }
    this.$router.push({ path: '/login' })
  }

  get loginText() {
    if (userStore.logged) {
      return 'Logout'
    }
    return 'Login'
  }

  get logged() {
    return userStore.logged
  }

  get userData() {
    if (userStore.userData) {
      const data = {
        ...userStore.userData,
      }
      data.name = data.name || data.username
      data.last_name = data.last_name || ''
      return data
    }
    return {}
  }

  get randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  get userInitials() {
    if (!this.logged) {
      return
    }
    return this.userData.name[0] + (this.userData.last_name[0] || '')
  }

  get headerLogo() {
    return this.$vuetify.theme.isDark
      ? 'https://alerce-static.s3.amazonaws.com/logos/footerAlerceWhite.png'
      : 'https://alerce-static.s3.amazonaws.com/logos/footerAlerce.png'
  }
}
</script>
