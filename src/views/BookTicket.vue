<template>
<el-card class="box-card">
    <el-form :model="form" ref="form"  :rules="rules" label-width="80px" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="出发地:" prop="begin" >
            <el-select v-model="form.begin"  placeholder="请选择出发地" >
                 <el-option v-for="(item,index) in AllCity" :key="index" :label="item.city" :value="item.city"></el-option>
            </el-select>
           
        </el-form-item>
            

        <el-form-item label="目的地:" v-model="form.end" prop="end" >
            <el-select v-model="form.end"  placeholder="请选择目的地" >
                <el-option v-for="(item,index) in AllCity" :key="index" :label="item.city" :value="item.city"></el-option>
            </el-select>
        </el-form-item>
            
        <el-form-item label="日期" prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" :picker-options="pickerOptions1" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="toTicketInfo" type="primary" icon="el-icon-search">查询</el-button>
          <el-button @click.native.prevent="handleReset2">重置</el-button>
        </el-form-item>
    </el-form>
</el-card>
</template>

<script>
export default {
    created(){
        this.getAllCity();
    },
    data(){
        return{
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
            }
        }
    },
    methods:{
        handleReset2(){//重置
          this.$refs.form.resetFields();
        },
        
        getAllCity(){//获取车站涉及到的所有城市

        },
        toTicketInfo(){
            var _this = this;
        this.$refs.form.validate((valid) => {
          if (valid) {
            console.log(typeof(this.form.date))
            this.$router.push({name:'车票信息',params:{'info':this.form}});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
            
        }
    }
}
</script>

<style scoped>
.box-card {
    width: 480px;
  }
</style>
