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

import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import highchartsMore from 'highcharts/highcharts-more'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import ECharts from 'vue-echarts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/candlestick'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'
Vue.component('v-chart', ECharts)

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(BootstrapVue);
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