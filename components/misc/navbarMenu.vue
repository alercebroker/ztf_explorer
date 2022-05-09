<template>
  <v-list>
    <v-list-item-group v-if="logged">
      <v-list-item>
        <v-list-item-avatar>
          <v-avatar size="36px" :color="randomColor">
            <span class="white--text headline">{{ userInitials }}</span>
          </v-avatar>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ userData.name }} {{ userData.last_name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ userData.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>

    <v-list-item-group>
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
      <v-list-item @click="$emit('loginClick')">
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

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class NavbarMenu extends Vue {
  @Prop(Boolean) logged
  @Prop(String) userInitials
  @Prop(Object) userData
  @Prop(String) loginText
  @Prop(String) randomColor

  get isDark() {
    return this.$vuetify.theme.isDark
  }

  set isDark(val) {
    this.$vuetify.theme.isDark = val
  }
}
</script>
