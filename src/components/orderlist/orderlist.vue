<template>
    <div>
        <el-table :data="orders.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <template slot="empty">
            <span>无订单</span>
        </template>
        <el-table-column label="订单号" prop="Ono"></el-table-column>
         <el-table-column label="用户名" prop="Uno"></el-table-column>
        <!-- <el-table-column label="订单日期" prop="order"></el-table-column> -->
        <el-table-column label="车次信息" prop="Tno_c"></el-table-column>
         <el-table-column label="始发站" prop="sSname"></el-table-column>
          <el-table-column label="终点站" prop="eSname"></el-table-column>
        <el-table-column label="发车时间" prop="sdtime"></el-table-column>
        <el-table-column label="到达时间" prop="eatime"></el-table-column>
        <!-- <el-table-column label="订单状态" prop="condition"></el-table-column> -->
        <el-table-column label="订单价格" prop="total"></el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
                <el-button type="text" size="small" v-show="type==2&&userstatus!=2" @click="handleBackMoney(scope.$index, scope.row)">退单</el-button>
                <el-button type="text" size="small" v-show="type==2&&userstatus!=2" @click="handleChangeTicket(scope.row)">改签</el-button>
                <el-button type="text" size="small" v-show="type==1&&userstatus!=2" @click="handlePay(scope.$index, scope.row)">付款</el-button>
                <el-button type="text" size="small"  @click="handleShowPac(scope.$index, scope.row)">乘客信息</el-button>
            </template>
        </el-table-column>
        
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"       
            layout="total,prev, pager, next, jumper"
            :total="orders.length"
            > 
        </el-pagination>

        <el-dialog title="乘客信息" :visible.sync="addFormVisible"  >
            <el-table :data="paclist">
                <el-table-column label="身份证" prop="Pid"></el-table-column>
                <el-table-column label="姓名" prop="Pname"></el-table-column>
                <el-table-column label="乘客类型" prop="type"></el-table-column>
                <el-table-column label="乘客电话" prop="Ptel"></el-table-column>
                
                
            </el-table>
        </el-dialog >
    </div>
    
    
</template>

<script>
import { requestCancelOrder,requestPayOrder,requestGetOrder,requestGetPassengers,requestGetPacType,requestSGetOrder } from '@/request/api';
export default {
    data(){
        return{
            //分页所需属性
                currentPage:1,
                pagesize:10,
                listLoading:false,
                addFormVisible: false,//新增界面是否显示
                //每页展示的属性
                orders:[{orderid:'110'}],
                //乘客信息
                paclist:[],
                userstatus:1
        }
    },
    //type 0 所有订单 1 待付款订单 2 已付款菜单 3已退款订单 
    props:['type','idcard'],
    methods:{
        
        handleCurrentChange:function(currentPage){
            this.currentPage=currentPage;
            console.log(this.currentPage)
        },
        handleBackMoney(index,row){
            let para={
                Ono:row.Ono,
                Uno:row.Uno
            }
            requestCancelOrder(para).then(res=>{
                console.log(res)
                if(res.data){
                    
                    this.$message({
                        message:"退款成功",
                        type:'success',});
                    this.getOrders();
                }else{
                    this.$message({
                        message:"无法退款",
                        type:'error',})
                }
            })
        },
        handleChangeTicket(row){
            this.$router.push({name:'订票',params:{'changeOrderID':row.Ono}});
        },
        handleDel(index,row){

        },
        handlePay(index,row){
            let para={
                Ono:row.Ono,
                Uno:row.Uno
            }
            requestPayOrder(para).then(res=>{
                if(res.data){
                    this.$message({
                        message:"付款成功",
                        type:'success',});
                    this.getOrders();
                }else{
                    this.$message({
                        message:"付款失败",
                        type:'error',})
                }
            })
        },
        getOrders(){
            
            //通过type控制请求数据格式 并赋给orders
           var user = sessionStorage.getItem('user');
            user = JSON.parse(user);
            
            var status=sessionStorage.getItem('userstatus')
            if(status==1){
                let para = {
                Uno:user.name,
                otype:this.type
            };
                requestGetOrder(para).then(res=>{
                this.orders=res.data
            })
            }else{
                let para = {
                otype:this.type
            };
                requestSGetOrder(para).then(res=>{
                    this.orders=res.data
                })
            }
            
        },
        //显示新增界面
			handleShowPac: function (index,row) {
                let para={
                    Ono:row.Ono
                }
                requestGetPassengers(para).then(res=>{
                    this.paclist=res.data
                    for(var i=0;i<this.paclist.length;i++){
                    this.paclist[i].type=requestGetPacType(this.paclist[i].Ptype)
                }
                })
				this.addFormVisible = true;
            },
        },
        
    created(){
        var status=sessionStorage.getItem('userstatus')
        this.userstatus=status;
        this.getOrders();
    }
        
}
</script>

<style>

</style>
