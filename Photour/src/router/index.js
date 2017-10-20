import Vue from 'vue'
import Router from 'vue-router'
import PhotoSquarePage from '@/page/PhotoSquarePage'
import PhotoDetailsPage from '@/page/PhotoDetailsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PhotoSquarePage',
      component: PhotoSquarePage
    },
    {
      path: '/photo/:photoId',
      name: 'PhotoDetailsPage',
      component: PhotoDetailsPage
    }
  ]
})
