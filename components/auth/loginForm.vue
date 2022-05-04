<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="username"
                v-model="username"
                label="Username"
                :rules="rules"
                :error-messages="detailError.username"
                :loading="isLoading"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                id="password"
                v-model="password"
                label="Password"
                :rules="rules"
                :error-messages="detailError.password"
                :loading="isLoading"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-col v-if="afterRegister" cols="12">
              <v-alert icon="mdi-email" color="blue-grey" dismissible>
                Registered user successfully. Check the email we sent to
                <strong>{{ userData.email }}</strong> to activate the account.
                <br />Enjoy ALeRCE Explorer.
              </v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn
                id="login"
                color="primary"
                block
                :loading="isLoading"
                @click="onLoginClick"
                >Login</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn
                id="register"
                color="primary"
                block
                :loading="isLoading"
                @click="$emit('registerClick')"
                >Register</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                id="googleLogin"
                :loading="isLoading"
                :disabled="isLoading"
                color="primary"
                class="white--text"
                block
                @click="onGoogleClick"
              >
                <v-icon left> mdi-google </v-icon>
                Log in with Google
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="genericError && !detailError">
            <v-col>
              <errors-auth-generic-error :error="genericError" />
            </v-col>
          </v-row>
          <v-row v-if="detailError.detail">
            <v-col>
              <errors-auth-generic-error :error="detailError.detail" />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { userStore } from '~/store'
@Component
export default class LoginForm extends Vue {
  username = ''
  password = ''
  showPassword = false
  rules = [(v) => v.length > 0 || "Field can't be empty"]
  @Prop({ type: Boolean }) afterRegister

  get detailError() {
    return userStore.detailError
  }

  get userData() {
    return userStore.userData
  }

  get isLoading() {
    return userStore.loading
  }

  get genericError() {
    return userStore.genericError
  }

  async onLoginClick() {
    await userStore.login({ username: this.username, password: this.password })
    if (userStore.logged) {
      this.$router.push('/')
    }
  }

  onGoogleClick() {
    userStore.googleLogin()
  }
}
</script>
