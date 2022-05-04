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
          <simple-pagination
            :value="page.page"
            :disable-next="disableNext"
            @input="page.onInput"
          />
        </template>
      </object-list>
    </v-navigation-drawer>
    <misc-a-header title="ALeRCE ZTF Explorer" :items="items">
      <template v-slot:menu>
        <v-list>
          <div v-if="logged">
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar size="36px" :color="randomColor">
                  <span class="white--text headline">{{ userInitials }}</span>
                </v-avatar>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{ userData.name }} {{ userData.last_name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  userData.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <v-list-item>
            <misc-theme-selector />
          </v-list-item>
          <v-list-item-group>
            <v-list-item @click="onLoginClick">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ loginText }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </misc-a-header>
    <v-main>
      <nuxt />
    </v-main>
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

  drawerMini = true

  get showDrawer() {
    return this.$store.state.objects.list.length > 0
  }

  get disableNext() {
    return (
      this.$store.state.objects.list.length <
      this.$store.state.pagination.perPage
    )
  }

  onTransition() {
    this.drawerMini = !this.drawerMini
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
    return userStore.userData || {}
  }

  get randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  get userInitials() {
    if (!this.logged) {
      return
    }
    return this.userData.name[0] + this.userData.last_name[0]
  }

  onLoginClick() {
    if (userStore.logged) {
      userStore.logout()
    }
    this.$router.push({ path: '/login' })
  }
}
</script>
