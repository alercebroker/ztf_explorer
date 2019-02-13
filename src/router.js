import Vue from 'vue'
import Router from 'vue-router'
import AboutUs from './views/AboutUs.vue'
import ExploreData from "./views/ExploreData.vue"
import HowTo from './views/HowTo.vue'
import UserAccount from './views/UserAccount.vue'
import ObjectModal from './components/results/objectDetailsModal.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.NODE_ENV === 'production' ?
    '/vue/' : '/',
  routes: [{
      path: '/',
      name: 'exploreData',
      component: ExploreData,
      children: [
        {
          path: 'object/:id',
          component: ObjectModal,
          name: 'object-details-modal',
          props: true,
        }
      ]

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