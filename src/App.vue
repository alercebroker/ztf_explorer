<template>
  <div id="app">
    <Header/><br/>
    <router-view>
    </router-view>
    <br/><br/>
    <!-- <b-row mt="5">
      <b-col md="4">
        <searchOptions/>
      </b-col>
    </b-row> -->
    <br/><br/>
    <Footer class="footer fixed-bottom"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import searchOptions from './components/ExploreData/searchOptions.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    searchOptions,
  }
}
</script>

<style>
  /* @import 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
  @import 'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css';
  @import 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js';
  @import 'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'; */

</style>
