<template>
    <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane label="未完成订单">
            <orderlist  :type=1 ref="child1"></orderlist>
        </el-tab-pane>
        <el-tab-pane label="已付款订单">
            <orderlist  :type=2 ref="child2"></orderlist>
        </el-tab-pane>
        <el-tab-pane label="退款订单">
            <orderlist :type=3 ref="child3"></orderlist>
        </el-tab-pane>
       
    </el-tabs>
</template>

<script>
export default {
    created(){

    },
    data(){
        return{
            notfinishOrders:[{orderid:'2',date:'2018-11-1',trainInfo:'A110',begin:'100',condition:'未出行订单'}],
            finishOrders:[{orderid:'1',date:'2018-11-1',trainInfo:'G110',begin:'100',condition:'已完成订单'}],
            loseOrders:[{orderid:'3',date:'2018-11-1',trainInfo:'B110',begin:'100',condition:'失效订单'}]
        }
    },
    methods:{
        handleClick(tab, event){
            //console.log(tab,event)
            this.$refs.child1.getOrders();
            this.$refs.child2.getOrders();
            this.$refs.child3.getOrders();
        }
    }
}
</script>

<style>

</style>
