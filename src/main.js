import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import store from './store/store'
import VueLodash from 'vue-lodash'

import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting.js'
import treemapInit from 'highcharts/modules/treemap.js'
import heatmapnit from 'highcharts/modules/heatmap.js'
import exportData from 'highcharts/modules/export-data'

import highchartsMore from 'highcharts/highcharts-more'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(VueLodash);

highchartsMore(Highcharts);
exportingInit(Highcharts);
treemapInit(Highcharts);
heatmapnit(Highcharts);
exportData(Highcharts);
Vue.use(HighchartsVue);


Vue.component('v-icon', Icon);

new Vue({
    el: '#app',
    router,
    store,
    components: {
        app: App
    },
    render: h => h('app')
});