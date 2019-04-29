import Vue from 'vue'
import Router from 'vue-router'
import Home1 from '@/components/Home1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home1
    }
  ]
})
