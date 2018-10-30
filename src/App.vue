<template>
  <div id="app">
    <Header/>
    <router-view/>
    <br/><br/>
    <Footer class="footer fixed-bottom"/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header ,
    Footer
  }
}
</script>

<style>
  @import 'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css';
  @import 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
  @import 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js';
  @import 'https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js';

</style>
