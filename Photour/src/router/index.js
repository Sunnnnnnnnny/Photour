import Vue from 'vue'
import Router from 'vue-router'
import PhotoSquarePage from '@/page/PhotoSquarePage'
import PhotoDetailsPage from '@/page/PhotoDetailsPage'
import AccountPage from '@/page/AccountPage'
import UserHomePage from '@/page/UserHomePage'
import SearchResultPage from '@/page/SearchResultPage'

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
    },
    {
      path: '/user/account',
      name: 'AccountPage',
      component: AccountPage
    },
    {
      path: '/user/home/:userId',
      name: 'UserHomePage',
      component: UserHomePage
    },
    {
      path: '/search',
      name: 'SearchResultPage',
      component: SearchResultPage
    }
  ]
})
