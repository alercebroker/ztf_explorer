import Vue from 'vue'
import ECharts from 'vue-echarts'

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/heatmap'
import 'echarts/lib/chart/treemap'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/custom'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/calendar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/axis'
// register component to use
Vue.component('v-chart', ECharts)
