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
}
</script>
