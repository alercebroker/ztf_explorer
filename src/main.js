import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import router from './router'
import store from './store/store'

import vuetify from '@/plugins/vuetify'

import ECharts from 'vue-echarts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/candlestick'
import 'echarts/lib/chart/custom'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
Vue.component('v-chart', ECharts)

Vue.config.productionTip = false;

Vue.use(Router);

new Vue({
    router,
    store,
    vuetify,
    components: {
        app: App
    },
    render: h => h(App)
}).$mount('#app');
