<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      <errors-error-404 />
    </h1>
    <h1 v-else>
      {{ error.message }}
    </h1>
  </v-app>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Error extends Vue {
  @Prop({ type: Object, default: null })
  error
}
</script>
