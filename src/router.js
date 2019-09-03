import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      name: 'exploreData',
      component: () => import("./views/ExploreData.vue"),
      children: [
        {
          path: 'object/:id',
          component: () => import('./components/results/modals/objectDetailsModal.vue'),
          name: 'object-details-modal',
          props: true,
        }
      ]

    },
  ]
})
