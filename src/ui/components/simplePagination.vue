<template>
  <v-row align="center" justify="center">
    <v-col cols="1">
      <v-btn icon tile @click="prev">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>
    <v-col class="pl-4" cols="2" offset="1">
      <v-btn tile disabled outlined small>{{ value }}</v-btn>
    </v-col>
    <v-col cols="1" offset="1">
      <v-btn icon tile @click="next">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class SimplePagination extends Vue {
  @Prop({ type: Number }) value

  next() {
    this.$emit('input', this.value + 1)
  }

  prev() {
    this.$emit('input', this.value - 1)
  }
}
</script>
