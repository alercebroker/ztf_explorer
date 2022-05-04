<template>
  <v-card>
    <v-card-title class="headline">Register New User</v-card-title>
    <generic-error v-if="genericError" :error="genericError" />
    <v-card-text>
      <v-form ref="form">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="username"
                label="Username"
                :error-messages="detailError.username"
                :loading="isLoading"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="First Name"
                :error-messages="detailError.name"
                :loading="isLoading"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="lastName"
                label="Last Name"
                :error-messages="detailError.last_name"
                :loading="isLoading"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                label="Email"
                :error-messages="detailError.email"
                :loading="isLoading"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="password"
                label="Password"
                :error-messages="passwordsError"
                :loading="isLoading"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                :error-messages="passwordsError"
                :loading="isLoading"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="institution"
                label="Institution"
                :error-messages="detailError.institution"
                :loading="isLoading"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="role"
                label="Role"
                :items="roles"
                :error-messages="detailError.role"
                :loading="isLoading"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text @click="$emit('registerCancel')">Cancel</v-btn>

      <v-btn
        id="send"
        color="primary"
        text
        :disabled="!passwordsMatch"
        @click="onRegisterClick"
        >Send</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import { userStore } from '~/store'
@Component
export default class RegisterForm extends Vue {
  username = ''
  name = ''
  email = ''
  lastName = ''
  institution = ''
  role = ''
  roles = ['Researcher']
  password = ''
  confirmPassword = ''
  showPassword = false
  registerSent = false
  passwordsMatch = true

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

  get passwordsError() {
    const errors = []
    if (!this.passwordsMatch) {
      errors.push("Passwords don't match")
    }
    if (this.detailError.password) {
      errors.push(this.detailError.password)
    }
    return errors
  }

  async onRegisterClick() {
    const payload = {
      username: this.username,
      name: this.name,
      email: this.email,
      last_name: this.lastName,
      institution: this.institution,
      role: this.role,
      password: this.password,
    }
    await userStore.register(payload)
    if (!userStore.errored) {
      this.$emit('registered')
    }
  }

  @Watch('confirmPassword')
  watchConfirmPassword(val) {
    if (val !== this.password) {
      this.passwordsMatch = false
    } else {
      this.passwordsMatch = true
    }
  }

  @Watch('password')
  watchPassword(val) {
    if (val !== this.confirmPassword) {
      this.passwordsMatch = false
    } else {
      this.passwordsMatch = true
    }
  }
}
</script>
