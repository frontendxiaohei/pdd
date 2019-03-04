import Vue from 'vue'
import Router from 'vue-router'

import Home from 'views/Home/Home'
import Search from 'views/Search/Search'
import Recommend from 'views/Recommend/Recommend'
import Mine from 'views/Mine/Mine'
import Chat from 'views/Chat/Chat'
import Login from 'views/Mine/Login/Login'
import Setting from 'views/Mine/MineSetting'
import MeDetail from 'views/Mine/MineDetail'



import Hot from 'views/Home/children/Hot/Hot'
import Box from 'views/Home/children/Box'
import Dress from 'views/Home/children/Dress'
import Ele from 'views/Home/children/Ele'
import Food from 'views/Home/children/Food'
import General from 'views/Home/children/General'
import Man from 'views/Home/children/Man'
import Mbaby from 'views/Home/children/Mbaby'
import Shirt from 'views/Home/children/Shirt'
// import Setting from '/views/Me/MeSetting'
// import MeDetail from '/views/Me/MeDetail'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      meta: {
        showBottomTabBar: true
      },
      redirect: '/home'
    },
    {
      path: '/home',
      meta: {
        showBottomTabBar: true
      },
      component: Home,
      children: [{
          path: 'hot',
          component: Hot,
          meta: {
            showBottomTabBar: true
          }
        },
        {
          path: 'box',
          meta: {
            showBottomTabBar: true
          },
          component: Box
        },
        {
          path: 'dress',
          meta: {
            showBottomTabBar: true
          },
          component: Dress
        },
        {
          path: 'food',
          meta: {
            showBottomTabBar: true
          },
          component: Food
        },
        {
          path: 'general',
          meta: {
            showBottomTabBar: true
          },
          component: General
        },
        {
          path: 'man',
          meta: {
            showBottomTabBar: true
          },
          component: Man
        },
        {
          path: 'ele',
          meta: {
            showBottomTabBar: true
          },
          component: Ele
        },
        {
          path: 'mbaby',
          meta: {
            showBottomTabBar: true
          },
          component: Mbaby
        },
        {
          path: 'shirt',
          meta: {
            showBottomTabBar: true
          },
          component: Shirt
        },
        {
          path: '/home',
          meta: {
            showBottomTabBar: true
          },
          redirect: '/home/hot'
        }
      ]
    },
    {
      path: '/search',
      meta: {
        showBottomTabBar: true
      },
      component: Search
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '/chat',
      meta: {
        showBottomTabBar: true
      },
      component: Chat
    },
    {
      path: '/recommend',
      meta: {
        showBottomTabBar: true
      },
      component: Recommend
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/setting',
      component: Setting
    }, 
    {
      path: '/detail',
      component: MeDetail
    }
  ]
})