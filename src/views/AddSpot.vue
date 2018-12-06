<template>
    <div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" :inline="true">
        <el-form-item label="站点名" prop="spotname">
            <el-input v-model="ruleForm2.spotname"></el-input>
        </el-form-item>
        <el-form-item label="城市名" prop="cityname" >
            <el-input v-model="ruleForm2.cityname"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="addSpot" >添加</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="spotlist.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column label="站点名" prop="spotname" width="120" align="center"></el-table-column>
        <el-table-column label="地址" prop="cityname" width="120" align="center"></el-table-column>
        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="deleteRow(scope.row.spotid)"
                                type="text"
                                size="small">
                                移除
                                </el-button>
                                <el-button
                                @click.native.prevent="openEditDia(scope.row.spotid)"
                                type="text"
                                size="small">
                                修改站点名
                                </el-button>
                            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        :current-page="currentPage" 
        :page-size="pagesize"       
        layout="total,prev, pager, next, jumper"
        :total="total"
        > 
    </el-pagination>
    <el-dialog title="修改站点名" :visible.sync="dialogFormVisible" >
        <el-form :model="ruleForm3" :rules="rules2" ref="ruleForm3" >
            <el-form-item label="新站点名" prop="spotname2">
                <el-input  v-model="ruleForm3.spotname2"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="editSpotName">提交</el-button>
            </el-form-item>
        </el-form> 
    </el-dialog>
</div>
</template>

<script>
import { requestgetSpots,requestaddSpot,requestdeleSpot,requesteditSpotName } from '../request/api';
export default {
    
    data(){
        return{
            currentPage:1,
            total:0,
            pagesize:20,
            dialogFormVisible:false,
            ruleForm2: {    
                spotname:'',
                cityname:'',
                
            },
            ruleForm3:{
                spotid:'',
                spotname2:'',
            },
            rules2:{
                spotname:[{required: true, message: '站点名不能为空', trigger: 'blur'}],
                cityname:[{required: true, message: '地址不能为空', trigger: 'blur'}],
                spotname2:[{required: true, message: '站点名不能为空', trigger: 'blur'}],
            },
            spotlist:[]
        }
    },
    methods:{
        addSpot(){
            var _this = this;
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    let para = {
                        spotname:this.ruleForm2.spotname,
                        cityname:this.ruleForm2.cityname
                            };
                    requestaddSpot(para).then(res=>{
                        if(res.data==1){
                            this.$message({
                            message:"添加成功",
                            type: 'success'
                            })
                            _this.getSpots()
                        }else if(res.data==-1){
                            this.$message({
                            message:"站点名重复",
                            type: 'error'
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                            }}
                    )
                }

            })},
        getSpots(){
            requestgetSpots().then(res=>{
                this.spotlist=res.data;
            })

        },
        deleteRow(spotid){
            let para={spotid:spotid}
            requestdeleSpot(para).then(res=>{
                if(res.data==1){
                    this.$message({
                        message:"删除成功",
                        type:"success"
                    })
                    this.getSpots()
                }
                else{
                    this.$message({
                        message:"删除失败",
                        type:"success"
                    })
                }
                    
            })
        },
        openEditDia(spotid){
            this.ruleForm3.spotid=spotid;
            this.dialogFormVisible=true;
        },
        editSpotName(){
            this.$refs.ruleForm3.validate((valid)=>{
                if(valid){
                    let para= {
                            spotid:this.ruleForm3.spotid,
                            spotname:this.ruleForm3.spotname2
                            };
                    requesteditSpotName(para).then(res=>{
                        console.log(res)
                        if(res.data==1){
                            this.$message({
                                message:"修改成功",
                                type:"success"
                            })
                            this.getSpots()
                            this.dialogFormVisible=false;
                        }else{
                            this.$message({
                                message:"修改失败",
                                type:"error"
                            })
                        }
                    })
                }else{
                    return false;
                }
            })
        }
    }
    ,
    created(){
        this.getSpots();
    }
}
</script>

<style>

</style>
