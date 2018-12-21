import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import VueLodash from 'vue-lodash'
import axios from 'axios'

import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import histogramInit from 'highcharts/modules/histogram-bellcurve.js'
import exportingInit from 'highcharts/modules/exporting.js' //scatter

import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import highchartsMore from 'highcharts/highcharts-more'


import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

axios.defaults.baseURL = 'http://alerce.reuna.cl/vue-api';
// axios.defaults.baseURL = 'http://gawa-app03.mat.uc.cl:8084';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(Router);
Vue.use(BootstrapVue);
Vue.use(VueLodash);

highchartsMore(Highcharts);
histogramInit(Highcharts);
exportingInit(Highcharts);
Vue.use(HighchartsVue);

Vue.component('v-icon', Icon)

new Vue({
    el: '#app',
    router,
    components: {
        app: App
    },
    render: h => h('app')
});