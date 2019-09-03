<template>
  <v-app>
    <Header/>
    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  }
};
</script>

<style>
</style>
