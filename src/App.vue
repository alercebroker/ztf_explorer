<template>
  <div>
    <Header/>
    <router-view>
    </router-view>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import searchOptions from "./components/ExploreData/searchOptions.vue";

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
