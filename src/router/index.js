import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Signin from '@/views/Signin'
import BookTicket from '@/views/BookTicket'
import test from '@/views/test'
import TicketInfo from '@/views/TicketInfo'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden:true
    },{
      path: '/signin',
      name: '注册',
      component: Signin,
      hidden:true
    },
    {
      path: '/',
      name: '车站售票系统',
      component: Home,
      redirect:'login',
      children:[{
        path: '/getTicket',
        name: '购票',
        component: BookTicket,
        
      },{
        path: '/test',
        name: '测试',
        component: test,
       
      },
      {
        path: '/ticketinfo',
        name: '车票信息',
        component: TicketInfo,
       
      },
        
      ]
    }
  ]
})
