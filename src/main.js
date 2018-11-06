import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'

import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"


Vue.config.productionTip = false;


Vue.use(Router);
Vue.use(BootstrapVue);

new Vue({
    el     : '#app',
  router,
    components: { app: App },
    render : h => h('app')
});