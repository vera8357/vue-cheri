
import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '@/views/index'
import Home from '@/views/home'
import Discount from '@/views/discount'
import Products from '@/views/products'
import ProductInfo from '@/views/productInfo'
import CheckOut from '@/views/CheckOut'
import comfirmOrder from '@/views/comfirmOrder'
// admin
import Login from '@/views/admin/login'
import Sidebar from '@/views/admin/sidebar'
import BackProducts from '@/views/admin/products'
import BackOrders from '@/views/admin/orders'
import Coupons from '@/views/admin/coupons'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/clince/home'
    },
    {
      name: 'Index',
      path: '/clince',
      component: Index,
      children: [
        {
          name: 'Home',
          path: 'home',
          component: Home
        },
        {
          name: 'Discount',
          path: 'discount',
          component: Discount
        },
        {
          name: 'Product',
          path: 'productList',
          component: Products
        },
        {
          name: 'ProductInfo',
          path: 'product/:id',
          component: ProductInfo
        },
        {
          name: 'CheckOut',
          path: 'CheckOut',
          component: CheckOut
        },
        {
          name: 'comfirmOrder',
          path: 'comfirm_order/:id',
          component: comfirmOrder
        }
      ]
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Admin',
      path: '/admin',
      component: Sidebar,
      meta: {requiredUser: true},
      children: [
        {
          name: 'Products',
          path: 'products',
          component: BackProducts,
          meta: {requiredUser: true}
        },
        {
          name: 'orders',
          path: 'orders',
          component: BackOrders,
          meta: {requiredUser: true}
        },
        {
          name: 'coupons',
          path: 'coupons',
          component: Coupons,
          meta: {requiredUser: true}
        }
      ]
    }
  ]
})
