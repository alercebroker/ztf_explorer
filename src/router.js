import Vue from 'vue'
import Router from 'vue-router'
import AboutUs from './components/AboutUs/AboutUs.vue'
import ExploreData from "./components/ExploreData/exploreData.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === 'production' ?
    '/vue/' : '/',
  routes: [{
      path: '/',
      name: 'home',
      component: ExploreData

    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: AboutUs

    }
  ]
})