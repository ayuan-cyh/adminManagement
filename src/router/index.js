import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login'
import home from '../components/home/home'
import {Message} from 'element-ui'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/user/userList')

        },
        {
          path: 'rights',
          name: 'rights',
          component: () => import('../views/permissionsList')
        },
        {
          path: 'roles',
          name: 'roles',
          component: () => import('../views/roleList')
        },
        {
          path: 'goods',
          name: 'goods',
          component: () => import('../views/goods/goodsList')
        },
        {
          path: 'goodsadd',
          name: 'goodsadd',
          component: () => import('../views/goods/goodsadd')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/about/about')
        },
        {
          path: 'params',
          name: 'params',
          component: () => import('../views/goods/cateParams')
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('../views/goods/goodsCategories')
        },
        {
          path: 'orders',
          name: 'orders',
          component: () => import('../views/orderManagement/order')
        },
        {
          path: 'reports',
          name: 'reports',
          component: () => import('../views/reports/reports')
        }

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login

    }
  ]
})
// 前置路由守卫用于判断是否已经登录,未登录进行路由转发
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    if (!localStorage.getItem('token')) {
      Message.error('没有登录请进行登录')
      return router.push({name: 'login'})
    }
    next()
  }
})
// 暴露router
export default router
