<template>
<div>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" :inline="true">
        <el-form-item label="座位类型" prop="seatname">
            <el-input v-model="ruleForm2.seatname"></el-input>
        </el-form-item>
        <el-form-item label="座位价格" prop="prize" >
            <el-input v-model="ruleForm2.prize"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="addSeat" >添加</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="seatlist">
        <el-table-column label="座位名" prop="seatname" width="120" align="center"></el-table-column>
        <el-table-column label="座位价格" prop="prize" width="120" align="center"></el-table-column>
        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="deleteRow(scope.$index, seatlist)"
                                type="text"
                                size="small">
                                移除
                                </el-button>
                                <el-button
                                @click.native.prevent="openEditDia(scope.$index, seatlist)"
                                type="text"
                                size="small">
                                修改价格
                                </el-button>
                            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="修改价格" :visible.sync="dialogFormVisible" >
        <el-form :model="ruleForm3" :rules="rules2" ref="ruleForm3" >
            <el-form-item label="新价格" prop="prize2">
                <el-input  v-model="ruleForm3.prize2"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="editSeatPrize">提交</el-button>
            </el-form-item>
        </el-form> 
    </el-dialog>
</div>
    
</template>

<script>
import { requestaddSeat,requestgetSeats,requesteditSeatPrize,requestdeleSeat } from '../request/api';
export default {
    
    data(){
        
        var checkFloat=(rule, value, callback) => {
            const reg = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/;//非负浮点数
            if(reg.test(value)){
                callback();
            }else{
                callback(new Error('价格格式错误'));
            }
            
      };
        return{
            dialogFormVisible:false,
            ruleForm2: {    
                seatname:'',
                prize:'',
                
            },
            ruleForm3:{
                seatname2:'',
                prize2:''
            },
            rules2:{
                seatname:[{required: true, message: '座位类型不能为空', trigger: 'blur'}],
                prize:[{required: true, message: '价格不能为空', trigger: 'blur'},
                {validator:checkFloat,trigger:'blur'}
                ],
                prize2:[{required: true, message: '价格不能为空', trigger: 'blur'},
                {validator:checkFloat,trigger:'blur'}
                ]

            },
            seatlist:[]

        }
    },
    methods:{
        addSeat(){
            var _this = this;
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    let para = {
                            seatname: _this.ruleForm2.seatname,
                            prize:_this.ruleForm2.prize,
                            };
                    requestaddSeat(para).then(res=>{
                        if(res.data==1){
                            this.$message({
                            message:"添加成功",
                            type: 'success'
                            })
                            _this.getSeats();
                        }else if(res.data==-1){
                            this.$message({
                            message:"类型重复",
                            type: 'error'
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                            }})
                }

            })},
        getSeats(){
            //获取座位信息
            requestgetSeats().then(res=>{
                console.log(res);
                this.seatlist=res.data
            })

        },
        deleteRow(index, list){
            let para={seatname:list[index].seatname}
            requestdeleSeat(para).then(res=>{
                if(res.data==1){
                    this.$message({
                        message:"删除成功",
                        type:"success"
                    })
                    this.getSeats();
                }
                else{
                    this.$message({
                        message:"删除失败",
                        type:"success"
                    })
                }
                    
            })
        },
        openEditDia(index, rows){
            this.ruleForm3.seatname2=rows[index].seatname;
            this.dialogFormVisible=true;
        },
        editSeatPrize(){
            var _this=this;
            this.$refs.ruleForm3.validate((valid)=>{
                if(valid){
                    let para= {
                            seatname: _this.ruleForm3.seatname2,
                            prize:_this.ruleForm3.prize2,
                            };
                    requesteditSeatPrize(para).then(res=>{
                        console.log(res)
                        if(res.data==1){
                            this.$message({
                                message:"修改成功",
                                type:"success"
                            })
                            _this.getSeats();
                            _this.dialogFormVisible=false;
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
    },
    created(){
        this.getSeats();
    }

}
</script>

<style>

</style>
