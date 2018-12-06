import OrderList from "./orderlist"


const orderlist ={
    install:function(Vue){
        Vue.component('orderlist',OrderList);
    }
} 
export default orderlist;