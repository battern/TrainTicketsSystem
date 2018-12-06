import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Signin from '@/views/Signin'
import BookTicket from '@/views/BookTicket'
import test from '@/views/test'
import TicketInfo from '@/views/TicketInfo'
import BuyTicket from '@/views/BuyTicket'
import OrderInfo from '@/views/OrderInfo'
import AddTrain from '@/views/AddTrain'
import AddSeat from '@/views/AddSeat'
import AddSpot from '@/views/AddSpot'
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
      iconCls: 'el-icon-setting',
      redirect:'/getTicket',
      children:[{
        path: '/getTicket',
        name: '订票',
        component: BookTicket,
        status:0//1表示是普通用户,2表示管理员
        
      },{
        path: '/test',
        name: '测试',
        component: test,
        status:2//1表示是普通用户,2表示管理员
       
      },
      {
        path: '/buyticket',
        name: '买票',
        component: BuyTicket,
        status:1//1表示是普通用户,2表示管理员
       
      },
      {
        path: '/orderinfo',
        name: '个人订单信息',
        component: OrderInfo,
        status:1//1表示是普通用户,2表示管理员
       
      },
      {
        path: '/addtrain',
        name: '车次信息管理',
        component: AddTrain,
        status:0//1表示是普通用户,2表示管理员
       
      },
      {
        path: '/addseat',
        name: '座位信息管理',
        component: AddSeat,
        status:0//1表示是普通用户,2表示管理员
       
      },
      {
        path: '/addspot',
        name: '站点信息管理',
        component: AddSpot,
        status:0//1表示是普通用户,2表示管理员
       
      },

     
        
      ]
    }
  ]
})
