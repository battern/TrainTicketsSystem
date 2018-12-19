<template>
    <div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2">
            <h3 class="title">个人信息</h3>
            <el-form-item label="用户名:" >
                <el-input  v-model="ruleForm2.username" autocomplete="off" :disabled="true" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="身份证号:"  >
                <el-input v-model="ruleForm2.id" :disabled="true" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名:" >
                <el-input v-model="ruleForm2.truename" :disabled="true" style="width:300px" ></el-input>
            </el-form-item>
            <el-form-item label="手机号码:" prop="tele">
                <el-input v-model="ruleForm2.tele" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="submitForm('ruleForm2')" >更改手机号</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
 import { updateTele } from '../request/api';
export default {
    created(){ 
        var user = sessionStorage.getItem('user');
        if (user) {
            user = JSON.parse(user);
            this.ruleForm2.username=user.name;
            this.ruleForm2.id = user.idcard;
            this.ruleForm2.tele= user.tele;
            this.ruleForm2.truename= user.truename;
        }
    },
    data(){
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
      return {
        logining:false,//提交缓冲
        ruleForm2: {
          pass: '',
          checkPass: '',
          username:'',
          id:'',
          tele:'',
          truename:''
        },
        rules2: {
          tele:[
              { required: true, message: '电话号码不能为空', trigger: 'blur' },
              {validator: checkTele, trigger: 'blur'}
          ],
         
        }
      };

    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
          if (valid) {
            let para={username:this.ruleForm2.username,newTele:this.ruleForm2.tele};
            updateTele(para).then(res=>{
                
               if(res.data){
                   this.$message({
                        message:"修改成功",
                        type: 'success'
                    })
               }else{
                   this.$message({
                        message:"修改失败",
                        type: 'error'
                    })
               }
            });
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        }
    }
}
</script>

<style>

</style>
