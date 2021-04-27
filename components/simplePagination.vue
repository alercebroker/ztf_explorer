<template>
  <div>
    <v-btn icon @click="prev" :disabled="value <= 1">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn icon x-small>{{ value }}</v-btn>
    <v-btn icon @click="next" :disabled="disableNext">
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class SimplePagination extends Vue {
  @Prop({ type: Number }) value
  @Prop({ type: Boolean }) disableNext

  next() {
    this.$emit('input', this.value + 1)
  }

  prev() {
    this.$emit('input', this.value - 1)
  }
}
</script>
