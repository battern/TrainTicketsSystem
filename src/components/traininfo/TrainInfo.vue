<template>
    <el-card  class="box-card">
        
             <el-row>
            <el-col :span="4">G285</el-col>
            <el-col :span="4">徐州</el-col>
            <el-col :span="8"><i class="iconfont icon-weibiaoti40"></i></el-col>
            <el-col :span="4">贵阳</el-col>
            <el-col :span="4">
                <i class="iconfont icon-jiantou9" v-show="!showDetail"></i>
                <i class="iconfont icon-tubiaozhizuo-" v-show="showDetail"></i></el-col>
        </el-row>
        
       
    </el-card>
    
</template>

<script>
export default {
    data(){
        return{
            showDetail:false
        }
    }
}
</script>

<style>
     
</style>
