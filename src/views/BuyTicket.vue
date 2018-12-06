<template>
    <div>
        <el-radio-group v-model="radio2" >
            <el-radio v-for="(item,index) in ticketsinfo " :disabled="item.remain==0" :key=index :label=index border >
                <span>{{item.name}}</span><span class="remain">余量:{{item.remain}}</span>
                <span class="price">价格:{{item.price}}</span>
            </el-radio>
        </el-radio-group>
        <el-row >
            <el-col :span="5" style="margin-top:10px" ><el-button type="primary" @click="handleAdd">新增用户</el-button></el-col>
            <el-col :span="5" style="margin-top:10px" ><el-button type="success" icon="el-icon-check" @click="buyTicket">提交订单</el-button></el-col>
        </el-row>
        
        <el-table :data="userInfo" style="width: 100%;" @selection-change="handleOrder">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="60" label="序号"></el-table-column>
            <el-table-column    label="姓名" prop="name"></el-table-column>
            <el-table-column   label="身份证" prop="idcard"></el-table-column>
            <el-table-column   label="联系电话" prop="tele"></el-table-column>
            <el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button type="danger" size="small" @click="handleDel(scope.$index)">删除</el-button>
				</template>
			</el-table-column>
        </el-table>
        <el-dialog title="新增" :visible.sync="addFormVisible"  >
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item prop="name" label="姓名" >
                    <el-input v-model="addForm.name" auto-complete="off"  ></el-input>
                </el-form-item>
                <el-form-item prop="idcard" label="身份证号">
                    <el-input v-model="addForm.idcard" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="tele" label="联系方式">
                    <el-input v-model="addForm.tele" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
        </el-dialog >
    </div>
</template>

<script>
export default {
    data(){
        //表单校验
        var checkID = (rule, value, callback) => {
        if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
      callback(new Error('身份证号码不符合规范'))
    } else {
      callback()
    }
      };
      var checkTele = (rule, value, callback) => {
        setTimeout(() => {
          if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
        }, 1000);
      };
        return{
            radio2: 0,
            ticketsinfo:[{name:"一等座",remain:0,price:0},{name:"二等座",remain:1,price:0},{name:"三等座",remain:0,price:0}],
            userInfo:[],
            addFormVisible: false,//新增界面是否显示
            addLoading: false,
            addFormRules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                idcard:[
                    {required: true, message: '请输入身份证', trigger: 'blur'},
                    {validator: checkID, trigger: 'blur'}
                ],
                tele:[
                    {required: true, message: '请输入联系方式', trigger: 'blur'},
                    {validator: checkTele, trigger: 'blur'}
                    ]
            },
            //新增界面数据
            addForm: {
                name: '',
                idcard:'',
                tele:''
            },
            //备选订单
            orders:[]
        }
    },
    methods:{
        buyTicket(){
            if(this.orders.length>this.ticketsinfo[this.radio2].remain){
                this.$message({
                message: '余量不足,请减少乘客人数',
                type: 'warning'
        });
            }
            else{
                this.$confirm('确认提交订单?', '提示', {
					//type: 'warning'
				}).then(() => {
                    //this.listLoading = true;
                    //TODO:将需求发送出去
                    console.log(Object.assign({}, row));
				}).catch(() => {

				});
            }
            
            
        },
        //删除
			handleDel: function (index) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.userInfo.splice(index,1)
				}).catch(() => {

				});
            },
            //显示新增界面
			handleAdd: function () {
               
				this.addFormVisible = true;
				this.addForm = {
					name: '',
                    idcard:'',
                    tele:''
				};
            },
            //添加用户信息
            addSubmit(){
                 this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.userInfo.push(this.addForm);
                    this.addFormVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
                
            },
            //获取被选择的行
            handleOrder(val){
                this.orders=val;
                console.log(this.orders);
            }
    },
        
    created(){
        let info = this.$router.history.current.params.traininfo;
    //防止F5刷新丢失信息
      if (info) {
        sessionStorage.setItem("traininfo", info);
      }
      let traininfo =JSON.parse(sessionStorage.getItem("traininfo") + '') ;
      
    //获取该车票具体信息

    //radio2选择一个可用的
    for(var i=0;i<this.ticketsinfo.length;i++){
        if(this.ticketsinfo[i].remain>0){
            this.radio2=i;
            break;
        }
   
    }
    //默认先将当前用户加入表格
    var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.userInfo.push(user);
			}
    },
    
    
    
}
</script>

<style lang="scss">
.remain{
    
    padding-left:20px
}
.price{
    
    padding-left:20px
}
</style>
