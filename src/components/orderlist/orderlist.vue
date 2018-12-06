<template>
    <div>
        <el-table :data="orders">
        <template slot="empty">
            <span>无订单</span>
        </template>
        <el-table-column label="订单号" prop="orderid"></el-table-column>
        <el-table-column label="订单日期" prop="date"></el-table-column>
        <el-table-column label="车次信息"></el-table-column>
        <el-table-column label="发车时间"></el-table-column>
        <el-table-column label="订单状态" prop="condition"></el-table-column>
        <el-table-column label="订单价格"></el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
                <el-button type="text" size="small" v-show="type==2" @click="handleBackMoney(scope.$index, scope.row)">退款</el-button>
                <el-button type="text" size="small" v-show="type==2" @click="handleChangeTicket(scope.$index, scope.row)">改签</el-button>
                <el-button type="text" size="small" v-show="type!=2" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                <el-button type="text" size="small" v-show="type==1" @click="handlePay(scope.$index, scope.row)">付款</el-button>
            </template>
        </el-table-column>
        
        </el-table>
        <el-pagination
            :current-page="currentPage"
            :page-size="pagesize"       
            layout="total,prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
            > 
        </el-pagination>
    </div>
    
    
</template>

<script>
export default {
    data(){
        return{
            //分页所需属性
                total:0,
                currentPage:1,
                pagesize:20,
                listLoading:false,
                //每页展示的属性
                orders:[{orderid:'1',date:'2018-11-1',trainInfo:'G110',begin:'100',condition:1}]
        }
    },
    //type 0 所有订单 1 未完成订单 2 未出行菜单 3历史订单 
    props:['type','idcard'],
    methods:{
        //完成分页功能
        handleCurrentChange(val) {
				this.currentPage = val;//当前页
				this.getOrders();//重新申请车票信息
        },
        handleBackMoney(index,row){

        },
        handleChangeTicket(index,row){

        },
        handleDel(index,row){

        },
        handlePay(index,row){

        },
        getOrders(){
            //通过type控制请求数据格式 并赋给orders
           let para = {
                page: _this.currentPage,
                pagesize:_this.pagesize,
                idcard:_this.idcard,
                type:_this.type
            };
        },
        },
    created(){
        this.getOrders();
    }
        
}
</script>

<style>

</style>
