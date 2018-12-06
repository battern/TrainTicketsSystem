<template>
    <el-tabs type="border-card">
        <el-tab-pane label="未完成订单">
            <orderlist :orders=notfinishOrders :type=1></orderlist>
        </el-tab-pane>
        <el-tab-pane label="已完成订单">
            <orderlist :orders=finishOrders :type=2></orderlist>
        </el-tab-pane>
        <el-tab-pane label="失效订单">
            <orderlist :orders=loseOrders :type=3></orderlist>
        </el-tab-pane>
       
    </el-tabs>
</template>

<script>
export default {
    data(){
        return{
            notfinishOrders:[{orderid:'2',date:'2018-11-1',trainInfo:'A110',begin:'100',condition:'未出行订单'}],
            finishOrders:[{orderid:'1',date:'2018-11-1',trainInfo:'G110',begin:'100',condition:'已完成订单'}],
            loseOrders:[{orderid:'3',date:'2018-11-1',trainInfo:'B110',begin:'100',condition:'失效订单'}]
        }
    }
}
</script>

<style>

</style>
