<template>
  <v-app dark>
    <v-row justify="center">
      <v-col class="text-center" cols="6" lg="6" md="6" sm="6">
        <p class="text-lg-h2 text-md-h4 text-sm-h6 text-xs-body-1">404 Error</p>
        <span class="text-lg-h4 text-md-h6 text-sm-body-1 text-xs-body-2">
          The page was not found.
        </span>
        <p>
          Check out <a :href="selectedMessage.url">this</a>
          {{ selectedMessage.adjective }} {{ selectedMessage.class }}
        </p>
        <a :href="selectedMessage.url">
          <v-img
            style="margin: auto"
            width="50%"
            :src="selectedMessage.image"
          ></v-img>
        </a>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class Error404 extends Vue {
  messages = [
    {
      class: 'Supernova',
      adjective: 'cool',
      url: 'https://alerce.online/object/ZTF20aaelulu',
      image: require('@/assets/img/taxonomy/SNIa.png'),
    },
    {
      class: 'Blazar',
      adjective: 'cool',
      url: 'https://alerce.online/object/ZTF18acurdfi',
      image: require('@/assets/img/taxonomy/Blazar.png'),
    },
  ]

  get selectedMessage() {
    const selected = Math.floor(Math.random() * this.messages.length)
    return this.messages[selected]
  }
}
</script>
