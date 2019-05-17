import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Index from '@/components/index'
import userList from '@/components/userList'
import shopList from '@/components/shopList'
import foodList from '@/components/foodList'
import orderList from '@/components/orderList'
import adminList from '@/components/adminList'
import addShop from '@/components/addShop'
import addGoods from '@/components/addGoods'
import visitor from '@/components/visitor'
import vueEdit from '@/components/vueEdit'
import adminSet from '@/components/adminSet'
import explain from '@/components/explain'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [{
          path: '',
          name: 'Index',
          component: Index,
          meta: [],
        },
        {
          path: '/userList',
          name: 'userList',
          component: userList,
          meta: ['数据管理', '用户列表'],
        },
        {
          path: '/shopList',
          name: 'shopList',
          component: shopList,
          meta: ['数据管理', '商家列表'],
        },
        {
          path: '/foodList',
          component: foodList,
          meta: ['数据管理', '食品列表'],
        },
        {
          path: '/orderList',
          component: orderList,
          meta: ['数据管理', '订单列表'],
        },
        {
          path: '/adminList',
          component: adminList,
          meta: ['数据管理', '管理员列表'],
        },
        {
          path: '/addShop',
          component: addShop,
          meta: ['添加数据', '添加商铺'],
        },
        {
          path: '/addGoods',
          component: addGoods,
          meta: ['添加数据', '添加商品'],
        },
        {
          path: '/visitor',
          component: visitor,
          meta: ['图表', '用户分布'],
        },
        {
          path: '/vueEdit',
          component: vueEdit,
          meta: ['编辑', '文本编辑'],
        }, {
          path: '/adminSet',
          component: adminSet,
          meta: ['设置', '管理员设置'],
		},
		{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		}

      ]
    }
  ]
})
