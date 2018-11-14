import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import VueLodash from 'vue-lodash'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

axios.defaults.baseURL = 'https://api-alerce-test.herokuapp.com';//'http://0.0.0.0:8000/'//

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(VueLodash);

new Vue({
    el     : '#app',
    router,
    components: { app: App },
    render : h => h('app')
});
