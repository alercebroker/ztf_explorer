<template>
  <v-container v-if="isLoading" fill-height>
    <v-row justify="center" align="center" align-content="center">
      <v-progress-circular :size="300" indeterminate></v-progress-circular>
    </v-row>
    <v-row justify="center"><h3>Logging in...</h3></v-row>
  </v-container>
  <v-alert v-else color="red">Could not login. {{ error }}</v-alert>
</template>

<script>
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { userStore } from '~/store'
@Component
export default class Oauth extends Vue {
  code = ''
  state = ''

  mounted() {
    this.code = this.$route.query.code
    this.state = this.$route.query.state
    userStore.loginGoogle({ code: this.code, state: this.state })
  }

  get error() {
    return userStore.error
  }

  get isLoading() {
    return userStore.loading
  }

  get userData() {
    return userStore.userData
  }

  @Watch('userData')
  userDataWatcher(val) {
    if (val.username !== null) {
      this.$router.push('/')
    }
  }
}
</script>
