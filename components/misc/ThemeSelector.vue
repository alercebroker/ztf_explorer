<template>
  <v-card class="mx-auto">
    <v-list>
      <v-subheader>{{ _title }}</v-subheader>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-black-mesa</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Black hole mode</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-switch v-model="isDark"></v-switch>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class BarOptions extends Vue {
  @Prop({ type: String, default: '' })
  title

  get isDark() {
    return this.$vuetify.theme.isDark
  }

  set isDark(val) {
    this.$vuetify.theme.isDark = val
  }

  get _title() {
    return `${this.title} Options`
  }
}
</script>
