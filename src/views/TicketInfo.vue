<template>
<div>
    <el-card  class="box-card" >
        
        <el-row @click.native="buy">
            <el-col :span="4">G285</el-col>
            <el-col :span="4">徐州</el-col>
            <el-col :span="8"><i class="iconfont icon-weibiaoti40"></i></el-col>
            <el-col :span="4">贵阳</el-col>
            <el-col :span="4">
                <i class="iconfont icon-jiantou9" v-show="!showDetail" ></i>
                <i class="iconfont icon-tubiaozhizuo-" v-show="showDetail"></i></el-col>
        </el-row>
        
       
    </el-card>
</div>
    
</template>

<script>
export default {
    data(){
        return{
            showDetail:false
        }
    },
    methods:{
        buy(){
            console.log('jjj')
        }
    }

}
</script>

<style >
    .box-card {
    width: 600px;
  }
</style>
