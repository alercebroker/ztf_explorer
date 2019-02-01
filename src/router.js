import Vue from 'vue'
import Router from 'vue-router'
import AboutUs from './views/AboutUs.vue'
import ExploreData from "./views/ExploreData.vue"
import HowTo from './views/HowTo.vue'
import UserAccount from './views/UserAccount.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === 'production' ?
    '/vue/' : '/',
  routes: [{
      path: '/',
      name: 'exploreData',
      component: ExploreData

    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: AboutUs

    },
    {
      path: '/howTo',
      name: 'howTo',
      component: HowTo

    },
    {
      path: '/userAccount',
      name: 'userAccount',
      component: UserAccount

    }
  ]
})