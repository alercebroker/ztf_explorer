<template>
  <v-app dark>
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
      title: 'ALeRCE Main Page',
      to: 'http://alerce.science',
    },
    {
      title: 'SN Hunter',
      to: 'https://snhunter.alerce.online',
    },
  ]

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
}
</script>
