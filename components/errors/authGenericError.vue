<template>
  <v-alert outlined color="red"
    >We found an error: {{ error }}. Please contact the ALeRCE Team</v-alert
  >
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class GenericError extends Vue {
  @Prop({ type: String }) error
}
</script>
