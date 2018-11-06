<template>
  <div id="app">
    <Header/><br/>
        <router-view/>
    <br/><Footer/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header ,
    Footer,
  }
}
</script>

<style>
  /* @import 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
  @import 'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css';
  @import 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js';
  @import 'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'; */

</style>
