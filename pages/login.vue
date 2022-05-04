<template>
  <v-container fill-height>
    <v-row justify="center" align="center" style="height: 100%">
      <v-col cols="12" sm="8" md="6">
        <auth-login-form
          :after-register="afterRegister"
          @registerClick="registerDialog = true"
          @loginClick="afterRegister = false"
        />
        <v-dialog v-model="registerDialog" max-width="500">
          <auth-register-form
            v-if="registerDialog"
            @registered="registered"
            @registerCancel="registerDialog = false"
          />
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { Vue, Component } from 'nuxt-property-decorator'
@Component
export default class Login extends Vue {
  registerDialog = false
  accessToken = null
  afterRegister = false

  registered() {
    this.afterRegister = true
    this.registerDialog = false
  }
}
</script>
