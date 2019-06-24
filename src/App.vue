<template>
  <v-app>
    <Header/>
    <router-view>
    </router-view>
    <Footer class="footer"/>
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
