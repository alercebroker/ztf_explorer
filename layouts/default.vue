<template>
  <v-app dark>
    <misc-a-header title="ALeRCE ZTF Explorer" :items="items">
      <template v-slot:menu>
        <v-list>
          <div v-if="logged">
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
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
    return userStore.userData || {}
  }
}
</script>
