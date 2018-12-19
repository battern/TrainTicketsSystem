<template>
    <div>
        <h3>{{title}}</h3>
        <el-radio-group v-model="radio2" >
            <el-radio v-for="(item,index) in ticketsinfo " :disabled="item.tleft==0" :key=index :label="index" border >
                <span>{{item.Seatname}}</span><span class="remain">余量:{{item.tleft}}</span>
                <span class="price">价格:{{item.price}}</span>
            </el-radio>
        </el-radio-group>
        <el-row >
            <el-col :span="5" style="margin-top:10px" ><el-button type="success" icon="el-icon-check" @click="buyTicket">提交订单</el-button></el-col>
            <el-col :span="5" style="margin-top:10px" ><el-button type="primary" @click="handleAdd" v-if="handletype===1">新增用户</el-button></el-col>
        </el-row>
        
        <el-table :data="userInfo" style="width: 100%;" @selection-change="handleOrder">
            <el-table-column type="selection" width="55" v-if="handletype===1"></el-table-column>
            <el-table-column type="index" width="60" label="序号"></el-table-column>
            <el-table-column    label="姓名" prop="name"></el-table-column>
            <el-table-column   label="身份证" prop="idcard"></el-table-column>
            <el-table-column   label="联系电话" prop="tele"></el-table-column>
            <el-table-column   label="车票类型" prop="ticket_usertype"></el-table-column>
            <el-table-column label="操作" width="150" v-if="handletype===1">
				<template slot-scope="scope">
					<el-button type="danger" size="small" @click="handleDel(scope.$index)" >删除</el-button>
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
                <el-form-item label="车票类型:" >
                    <el-select v-model="addForm.ticket_usertype" placeholder="选择座位种类">
                    <el-option v-for="(item,index) in usertype " :key="index" :label="item.name" :value="item.name"></el-option>
                    </el-select>
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
import { requestFindSeat,requestTakeOrder,requestPayOrder,requestGetPacMon,requestGetPacType,requestGetPassengers,requestChangeOrder } from '../request/api';
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
       
          if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
       
      };
        return{
            handletype:1,//1表示普通的买票,2表示
            title:'请添加用户并选择要购买的座位类型',
            tips:['请添加用户并选择要购买的座位类型','请确认订单','订单添加成功','请选择座位类型并改签'],
            changeOrderID:'',
            radio2: 0,//单选框的选项,与其label属性相同
            trainid:'',
            traininfo:'',
            ticketsinfo:[{seatno:0,name:"一等座",remain:0,price:0},{seatno:2,name:"二等座",remain:1,price:0},{seatno:3,name:"三等座",remain:0,price:0}],
            userInfo:[],//购票用户表
            usertype:[{name:"成人票",Ptype:0},{name:"学生票",Ptype:1},{name:"儿童票",Ptype:2},{name:"军人票",Ptype:3}],
            
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
                tele:'',
                ticket_usertype:'成人票',
            
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
            else if(this.userInfo.length==0){
                this.$message({
                message: '请至少选择一名乘客',
                type: 'warning'})
            }
            else{
                this.$confirm('确认提交订单?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
				}).then(() => {
                    var user = sessionStorage.getItem('user');
                    user = JSON.parse(user);
                    let Uname=user.name;
                    let wantSeat=this.ticketsinfo[this.radio2];
                    let myuserinfo=[];
                    for(var i =0;i<this.userInfo.length;i++){
                        //console.log(this.userInfo[i]);
                        let usertemp={Pid:this.userInfo[i].idcard, Pname:this.userInfo[i].name,PTel:this.userInfo[i].tele}
                        for(var j=0;j<this.usertype.length;j++){
                            if(this.userInfo[i].ticket_usertype===this.usertype[j].name)
                                usertemp.Ptype=this.usertype[j].Ptype
                        }
                       
                        myuserinfo.push(usertemp)
                    }
                    var totalPrice=0;
                    for(var i=0;i<myuserinfo.length;i++){
                        //console.log(myuserinfo[i].Ptype)
                        //console.log(wantSeat.price*requestGetPacMon(myuserinfo[i].Ptype))
                        totalPrice+=wantSeat.price*requestGetPacMon(myuserinfo[i].Ptype)
                    }
                    
                    //console.log(totalPrice)
                    let para={
                        Seatno:wantSeat.Seatno,
                        Tno_c:this.traininfo.Tno_c,
                        Uno:Uname,
                        sdate:this.traininfo.sdate,
                        sSorder_c:this.traininfo.sSorder,
                        eSorder_c:this.traininfo.eSorder,
                        total:totalPrice,
                        sdtime:this.traininfo.dtime,
                        eatime:this.traininfo.atime,
                        //json:JSON.stringify(myuserinfo)
                    }
                    if(this.handletype==1){
                        para.json=JSON.stringify(myuserinfo)
                        requestTakeOrder(para).then(res=>{
                        console.log("+++++++++++++++++++++"+res.data);
                        if(res.data==''){
                            this.$message({
                            message:"下单失败",
                            type:'error',
                        })
                            return
                        }
                        
                        this.$confirm('订单提交成功,是否立即付款?','提示',{}).then(()=>{
                        let para={
                            Ono:res.data,
                            Uno:Uname
                            }
                        requestPayOrder(para).then(res=>{
                            //console.log(res)
                            if(res.data){
                                this.$message({
                                message:"付款成功",
                                type:'success',
                            })
                            }else{
                                this.$message({
                                message:"付款失败",
                                type:'error',
                                 })
                            }
                            
                        }).catch(err=>{
                            this.$message({
                            message:"付款失败",
                            type:'error',
                         })
                            console.log(err)
                        })
                        
                        this.$router.push({name:'订票'});
                    }).catch(()=>{
                        this.$message({
                            message:"订单在15分钟后过期"
                        })
                    })
                    }).catch(err=>{
                        console.log(err)
                    })
                    }else{
                        para.oOno=this.changeOrderID;

                        
                        requestChangeOrder(para).then(res=>{
                            if(res.data){
                                this.$message({
                                message:"改签成功",
                                type:'success',
                            })
                            this.$router.push({name:'订票'});
                            }
                        })
                        

                    }
                })
                .catch(() => {
                    this.$message({
                            message:"取消订单"
                        })
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
                //console.log(this.orders);
            }
    },
        
    created(){
        let info = this.$router.history.current.params.traininfo;
        
    
    //防止F5刷新丢失信息
      if (info) {
        sessionStorage.setItem("traininfo", info);
      }
      let traininfo =JSON.parse(sessionStorage.getItem("traininfo") + '') ;
      this.traininfo=traininfo;
    //获取修改的订单和新提交的订单
        this.changeOrderID=sessionStorage.getItem("changeOrderID");
        if(this.changeOrderID!=''){
            this.title='请选择要改签的座位类型'
            this.handletype=2
            //获取当前订单的用户信息,push到user里
            let para={Ono:this.changeOrderID}
            requestGetPassengers(para).then(res=>{
                for(var i=0;i<res.data.length;i++){
                    let tempPU={name:res.data[i].Pname ,idcard:res.data[i].Pid ,tele:res.data[i].Ptel};
                  
                    tempPU.ticket_usertype=requestGetPacType(res.data[i].Ptype);
                    this.userInfo.push(tempPU)
                }
                
            })
        }else{
            
            //         //默认先将当前用户加入表格
            // var user = sessionStorage.getItem('user');
            
            //         if (user) {
            //             user = JSON.parse(user);
            //             this.userInfo.push(user);
            //         }
            }
        
            //console.log(this.userInfo)
            //console.log(traininfo)
            let para={
                Tno_c:traininfo.Tno_c,
                sdate:traininfo.sdate,
                sSorder_c:traininfo.sSorder,
                eSorder_c:traininfo.eSorder,
                mile:traininfo.mile,
                Ano_c:traininfo.Ano_c   
            }
            requestFindSeat(para).then(res=>{
                //console.log(res.data)
                this.ticketsinfo=res.data;
            })

            //radio2选择一个可用的
            for(var i=0;i<this.ticketsinfo.length;i++){
                if(this.ticketsinfo[i].tleft>0){
                    this.radio2=i;
                    break;
                }
        
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
