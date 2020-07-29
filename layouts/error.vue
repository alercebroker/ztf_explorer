<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      <Error404 />
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
  </v-app>
</template>

<script>
import Error404 from './errors/404.vue'
export default {
  layout: 'empty',
  components: {
    Error404,
  },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>
