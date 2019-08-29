import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import Register from '../pages/Register'
import Search from '../pages/Search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/search/:id',
      name: 'search',
      component: Search
    }
  ]
})
