import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import store from './store/store'
// import VueLodash from 'vue-lodash'

import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting.js'
import treemapInit from 'highcharts/modules/treemap.js'
import heatmapnit from 'highcharts/modules/heatmap.js'
import exportData from 'highcharts/modules/export-data'

import highchartsMore from 'highcharts/highcharts-more'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
    iconfont: 'md',
    theme: {
        header: colors.grey.darken4,
        toolbar: colors.grey.darken4,
        primary: colors.indigo.base,
        secondary: colors.indigo.lighten1,
        accent: colors.indigo.base,
        error: colors.red.base,
        warning: colors.amber.base,
        info: colors.indigo.base,
        success: colors.teal.base
    }
})
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import ECharts from 'vue-echarts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/candlestick'
import 'echarts/lib/chart/custom'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'
Vue.component('v-chart', ECharts)

Vue.config.productionTip = false;

Vue.use(Router);
// Vue.use(VueLodash);

highchartsMore(Highcharts);
exportingInit(Highcharts);
treemapInit(Highcharts);
heatmapnit(Highcharts);
exportData(Highcharts);
Vue.use(HighchartsVue);

new Vue({
    el: '#app',
    router,
    store,
    components: {
        app: App
    },
    render: h => h('app')
});
