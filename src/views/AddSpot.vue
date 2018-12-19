<template>
    <div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" :inline="true">
        <el-form-item label="站点编号" prop="Sno">
            <el-input v-model="ruleForm2.Sno"></el-input>
        </el-form-item>
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
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @submit.native.prevent>
				<el-form-item>
					<el-input v-model="filters.spotname" placeholder="站点名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getSpots">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <el-table :data="spotlist.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column label="站点编号" prop="Sno" width="200" align="center"></el-table-column>
        <el-table-column label="站点名" prop="Sname" width="200" align="center"></el-table-column>
        <el-table-column label="地址" prop="Scity" width="200" align="center"></el-table-column>
        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="deleteRow(scope.row.Sno)"
                                type="text"
                                size="small">
                                移除
                                </el-button>
                                <el-button
                                @click.native.prevent="openEditDia(scope.row.Sno)"
                                type="text"
                                size="small">
                                修改站点名
                                </el-button>
                            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage" 
        :page-size="pagesize"       
        layout="total,prev, pager, next, jumper"
        :total="spotlist.length"
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
import { requestgetSpots,requesteditSpotName,requestdeleSpot,requestaddSpot } from '../request/api';
export default {
    
    data(){
        return{
            filters: {//搜索功能
				spotname: ''
			},
            currentPage:1,
            pagesize:10,
            dialogFormVisible:false,
            ruleForm2: {    
                spotname:'',
                cityname:'',
                Sno:''
                
            },
            ruleForm3:{
                spotid:'',
                spotname2:'',
            },
            rules2:{
                spotname:[{required: true, message: '站点名不能为空', trigger: 'blur'}],
                cityname:[{required: true, message: '地址不能为空', trigger: 'blur'}],
                spotname2:[{required: true, message: '站点名不能为空', trigger: 'blur'}],
                Sno:[{required: true, message: '站点编号不为空', trigger: 'blur'}]
            },
            spotlist:[]//数据源
        }
    },
    methods:{
         handleCurrentChange:function(currentPage){
            this.currentPage=currentPage;
            console.log(this.currentPage)
        },
        addSpot(){
            var _this = this;
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    let para = {
                        Sno:this.ruleForm2.Sno,
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
                            message:"检查信息合理性",
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
           
            var para ={
                spotname:this.filters.spotname
            }
            console.log(para)
            requestgetSpots(para).then(res=>{
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
                        message:"删除失败,请先删除外部联系",
                        type:"error"
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
