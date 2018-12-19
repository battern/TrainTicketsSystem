<template>
<div>
    <el-form :model="form" ref="form" :inline='true'  :rules="rules" >
       <h3>{{handletype}}</h3>
            <el-form-item label="出发地:"  prop="begin" >
            <el-select v-model="form.begin" filterable  placeholder="请选择出发地" >
                 <el-option v-for="(item,index) in AllCity" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item>
            <i @click="exchange" class="iconfont icon-xianghujiaohuan-zuoyou  exchange"></i>
           
        </el-form-item>
         
            <el-form-item label="目的地:"  v-model="form.end" prop="end" >
            <el-select v-model="form.end" filterable  placeholder="请选择目的地" >
                <el-option v-for="(item,index) in AllCity" :key="index" :label="item" :value="item"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期" prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" :picker-options="pickerOptions1" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" icon="el-icon-search" @click="getTickets">查询</el-button>
          <el-button @click.native.prevent="handleReset2">重置</el-button>
        </el-form-item>
    </el-form>
    <div class="cantainer">
                    <el-table style="width: 100%;" :data="ticketslist.slice((currentPage-1)*pagesize,currentPage*pagesize)" v-loading="listLoading">
                        <template slot="empty">
                            <span>没有满足条件的车次</span>
                        </template>
                        <el-table-column type="index" width="100" align="center" label="序号">    
                        </el-table-column>
                        <el-table-column label="车次" prop="Tno_c" width="200" align="center">    
                        </el-table-column>
                        <el-table-column label="发车时间" prop="dtime" width="120" align="center">    
                        </el-table-column>
                       
                        <el-table-column label="到达时间" prop="atime" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="出发站" prop="sSname" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="目的站" prop="eSname" width="120" align="center">    
                        </el-table-column>
                        <!-- <el-table-column v-for="(item,index) in AllSeatType" :key="index" :label="item.seatname" :prop="item.seatname"></el-table-column> -->
                        <el-table-column label="预订" width="120" align="center" >
                          <template slot-scope="scope" >
                          <el-button size="small" @click="toBuyThisTicket(scope.$index, scope.row)">购买</el-button>
                          </template>  
                        </el-table-column>
                    </el-table>
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="currentPage" 
                            :page-size="pagesize"       
                            layout="total,prev, pager, next, jumper"
                            :total="ticketslist.length"
                           
                            > 
                    </el-pagination>
        </div>
</div>
</template>

<script>
import { requestgetSeats,requestFindTrain,requestgetAllCity,isLogin } from '../request/api';
export default {
    created(){
        let changeOrderID = this.$router.history.current.params.changeOrderID;
        console.log(changeOrderID)
        //防止F5刷新丢失信息
          if (changeOrderID) {
                sessionStorage.setItem("changeOrderID", changeOrderID );
                this.handletype='请选择要改签的车票'
          }else{
            sessionStorage.setItem("changeOrderID", '' );
        }
        requestgetSeats().then(res=>{
            this.AllSeatType=res.data
            console.log(res)
        })
        //填充所有有车站的城市名
        requestgetAllCity().then(res=>{
            var temp = res.data;
            for(var i=0;i<temp.length;i++){
                this.AllCity.push(temp[i].Scity)
            }
        })
    },
    data(){
        return{
                //时间选择器控制
                pickerOptions1: {
                    disabledDate(time) {
                        return (time.getTime() < Date.now()- 3600 * 1000 * 24)||(time.getTime() > Date.now()+3600 * 1000 * 24 * 6);
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '明天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    }, {
                        text: '后天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24*2);
                        picker.$emit('pick', date);
                        }
                    }]
            },
            AllSeatType:[],
            AllCity:[],
            //表单验证属性
            form: {
                begin: '',
                end: '',
                date:''
            },
            rules:{
                begin:[{required: true, message: '请输入出发地', trigger: 'blur'}],
                end:[{required: true, message: '请输入目的地', trigger: 'blur'}],
                date:[{required: true, message: '请输入出发日期', trigger: 'blur'},
                ]
            },
            //操作类型,买票,还是退票
            handletype:'请选择要购买的车票',
            //分页属性
            listLoading:false,
            currentPage:1,
            total:0,
            pagesize:20,
            showDetail:false,
            ticketslist:[]//每页展示的数据,动态更新
        }
    },
    methods:{
        handleCurrentChange:function(currentPage){
            this.currentPage=currentPage;
            console.log(this.currentPage)
        },
        toBuyThisTicket(index, row){//跳转去买票界面
            if(isLogin())
                this.$router.push({name:'买票',params:{'traininfo':JSON.stringify(Object.assign({}, row))}});
            else
                this.$message({
                    message:"请先登陆",
                    type:'error',
                })
        },
        handleReset2(){//重置
          this.$refs.form.resetFields();
        },
        
        
        getTickets(){
            var _this = this;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let para = {
                            scity:this.form.begin,
                            ecity:this.form.end,
                            dtime:this.form.date
                            };
            this.listLoading = true;
                requestFindTrain(para).then(res=>{
                    console.log(res)
                    this.ticketslist=res.data
                })
                this.listLoading = false;
            // });
        
          } else {
            console.log('error submit!!');
            return false;
          }
        });
            
        },
        //交换地点
        exchange(){
            var temp =this.form.begin;
            this.form.begin=this.form.end;
            this.form.end=temp;
            
        }
    }
}
</script>

<style scoped>
    .exchange{
        cursor: pointer;
         font-size: 30px;
         margin-left: 20px
         
    }
</style>
