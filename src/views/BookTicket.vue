<template>
<div>
    <el-form :model="form" ref="form" inline=true  :rules="rules" label-width="80px" style="margin:20px;width:80%;min-width:600px;">
       
            <el-form-item label="出发地:"  prop="begin" >
            <el-select v-model="form.begin" filterable  placeholder="请选择出发地" >
                 <el-option v-for="(item,index) in AllCity" :key="index" :label="item.city" :value="item.city"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item>
            <i @click="exchange" class="iconfont icon-xianghujiaohuan-zuoyou  exchange"></i>
           
        </el-form-item>
         
            <el-form-item label="目的地:"  v-model="form.end" prop="end" >
            <el-select v-model="form.end" filterable  placeholder="请选择目的地" >
                <el-option v-for="(item,index) in AllCity" :key="index" :label="item.city" :value="item.city"></el-option>
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
                    <el-table style="width: 100%;" :data="ticketslist" v-loading="listLoading">
                        <template slot="empty">
                            <span>没有满足条件的车次</span>
                        </template>
                        <el-table-column type="index" width="100" align="center" label="序号">    
                        </el-table-column>
                        <el-table-column label="车次" prop="trainid" width="200" align="center">    
                        </el-table-column>
                        <el-table-column label="发车时间" prop="begintime" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="出发站" prop="beginSta" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="目的站" prop="endSta" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="一等座" prop="one" width="120" align="center">    
                        </el-table-column>  
                        <el-table-column label="二等座" prop="two" width="120" align="center">    
                        </el-table-column>  
                        <el-table-column label="三等座" prop="three" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="预订" width="120" align="center" >
                          <template slot-scope="scope" >
                          <el-button size="small" @click="toBuyThisTicket(scope.$index, scope.row)">购买</el-button>
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
</div>
</template>

<script>
export default {
    created(){
        this.getAllCity();
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

            AllCity:[{city:'北京'},{city:'天津'},{city:'上海'},{city:'重庆'},{city:'河北'}],
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
            //分页属性
            listLoading:false,
            currentPage:1,
            total:0,
            pagesize:20,
            showDetail:false,
            ticketslist://每页展示的数据,动态更新
            [{trainid:'1',begintime:'2018-11-28'},
            {trainid:'2',begintime:'2018-11-28'}],
        }
    },
    methods:{

        //完成分页功能
        handleCurrentChange(val) {
				this.currentPage = val;//当前页
				this.getTickets();//重新申请车票信息
        },

        toBuyThisTicket(index, row){//跳转去买票界面
            this.$router.push({name:'买票',params:{'traininfo':JSON.stringify(Object.assign({}, row))}});
        },
        handleReset2(){//重置
          this.$refs.form.resetFields();
        },
        
        getAllCity(){//获取车站涉及到的所有城市

        },
        getTickets(){
            var _this = this;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let para = {
                            page: _this.currentPage,
                            pagesize:_this.pagesize,
                            form:_this.form
                            };
            this.listLoading = true;
            // getUserListPage(para).then((res) => {
            // 	this.total = res.data.total;
            // 	this.ticketslist = res.data.ticketslists;
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
