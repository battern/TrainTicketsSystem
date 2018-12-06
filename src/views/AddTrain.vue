<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="车次名:" prop="trainname">
                <el-input  v-model.number="ruleForm2.trainname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="车次类型:" >
                    <el-select v-model="ruleForm2.traintype" placeholder="选择车次种类">
                    <el-option v-for="(item,index) in AllTrainType " :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="空调类型:" >
                    <el-select v-model="ruleForm2.airtype" placeholder="请选择要添加的空调类型">
                    <el-option v-for="(item,index) in AllAirType " :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
            </el-form-item>
            
            <el-row>
                <el-col :span="8">
                <el-form-item label="座位类型:" >
                    <el-select v-model="seattype" placeholder="选择座位种类">
                    <el-option v-for="(item,index) in AllSeatType " :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="座位数量:" prop="seatnum">
                        <el-input  v-model.number="ruleForm2.seatnum"  ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item  >
                        <el-button @click="addSeat">添加座位种类</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-table :data="ruleForm2.seat" height="250" style="width: 100%;">
                    <template slot="empty">
                            <span>未添加座位</span>
                        </template>
                        <el-table-column type="index" width="100" align="center" label="序号"></el-table-column>
                        <el-table-column label="座位类型" prop="type" width="200" align="center"></el-table-column>
                        <el-table-column label="座位数量" prop="num" width="200" align="center"></el-table-column>
                        <el-table-column
                            
                            label="操作"
                            width="200">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="deleteRow(scope.$index, ruleForm2.seat)"
                                type="text"
                                size="small">
                                移除
                                </el-button>
                            </template>
                        </el-table-column>
                </el-table>
            </el-form-item>
            <el-row>
                <el-col :span="4">
                <el-form-item label="车站名称:" >
                    <el-select v-model="ruleForm2.stationname" placeholder="选择车站 ">
                    <el-option v-for="(item,index) in AllStation " :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="4">
                <el-form-item label="到达里程:" prop="miles">
                    <el-input v-model.number="ruleForm2.miles"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="到达耗时:" prop="usingtime" >
                        <el-input v-model.number="ruleForm2.usingtime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="停留时间:" prop="stoptime" >
                        <el-input v-model.number="ruleForm2.stoptime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item  >
                        <el-button @click="addStation">添加车站种类</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <el-table :data="ruleForm2.stationlist" height="250" style="width: 100%;">
                    <template slot="empty">
                            <span>未添加车站</span>
                        </template>
                        <el-table-column type="index" width="100" align="center" label="序号"></el-table-column>
                        <el-table-column label="车站名称" prop="stationname" width="200" align="center"></el-table-column>
                        <el-table-column label="到达里程" prop="miles" width="200" align="center"></el-table-column>
                        <el-table-column label="到达耗时" prop="usingtime" width="200" align="center"></el-table-column>
                        <el-table-column label="停留时间" prop="stoptime" width="200" align="center"></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="deleteRow(scope.$index, ruleForm2.stationlist)"
                                type="text"
                                size="small">
                                移除
                                </el-button>
                            </template>
                        </el-table-column>
                </el-table>
            </el-form-item>
           
            <el-form-item>
                <el-button type="primary"  @click="submitForm('ruleForm2')" >提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
</template>

<script>
export default {
    data(){
        var checkSeatNum = (rule, value, callback) => {//座位
            if(value=='')callback();
            if (!(Number.isInteger(value))) {
                callback(new Error('请输入数字值'));
            } else {
            if (value <= 0) {
                callback(new Error('必须大于0'));
            } else {
                callback();
            }
            }
        
      };
      var checkTrainNum=(rule, value, callback) => {//车次编号
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                callback();
            }
        
      };
        return{
            AllSeatType:["商务座","一等座","二等座"],
            seattype:'',
            AllTrainType:[{name:'高铁',value:'G'},{name:'动车',value:'D'},{name:'特快',value:'T'},{name:'快速',value:'K'}],
            AllAirType:[{name:'有空调',value:1},{name:'无空调',value:0},{name:'新空调',value:2}],
            AllStation:["贵阳北","浦东西","贵阳"],
            ruleForm2: {
                trainname: '',
                seat:[],
                seatnum:'',
                traintype:'G',
                airtype:1,
                stationlist:[],
                stationname:'',
                miles:'',
                usingtime:'',
                stoptime:''

            },
            rules2:{
                trainname:[{required: true, message: '请输入车次号', trigger: 'blur'},
                {validator:checkSeatNum,trigger:'blur'}
                ],
                seatnum:[{validator:checkSeatNum,trigger:'blur'}],
                miles:[{validator:checkSeatNum,trigger:'blur'}],
                usingtime:[{validator:checkSeatNum,trigger:'blur'}],
                stoptime:[{validator:checkSeatNum,trigger:'blur'}]
            }
        }
    },
    methods:{
        deleteRow(index, rows) {//删除添加的座位
            rows.splice(index, 1);
        },
        addSeat(){
            if(this.ruleForm2.seatnum==''||this.seattype==''){
                this.$message({
                    message:'请将信息填充完整',
                    type:'error'
                })
            }
            else{
                var flag=0;
            for(var i=0;i<this.ruleForm2.seat.length;i++){
                if(this.ruleForm2.seat[i].type==this.seattype){
                    this.ruleForm2.seat[i].num=this.ruleForm2.seatnum;
                    flag=1;
                }
            }
            if(flag==0){
                this.ruleForm2.seat.push({'type':this.seattype,'num':this.ruleForm2.seatnum})
            }
            }
            
            
        },
        addStation(){
            if(this.ruleForm2.stationname==''||this.ruleForm2.miles==''||this.ruleForm2.usingtime=='')
                this.$message({
                    message:'请将信息填充完整',
                    type:'error'
                })
            else{
                var flag=0;
                var flag2=-1;
                for(var i=0;i<this.ruleForm2.stationlist.length;i++){

                    
                    if(this.ruleForm2.stationname==this.ruleForm2.stationlist[i].stationname){
                        flag2=i;
                        console.log(flag2)
                    }else{
                        if(!(this.ruleForm2.miles>this.ruleForm2.stationlist[i].miles&&this.ruleForm2.usingtime>(this.ruleForm2.stationlist[i].usingtime+this.ruleForm2.stationlist[i].stoptime))||
                        (this.ruleForm2.miles<this.ruleForm2.stationlist[i].miles&&this.ruleForm2.usingtime<this.ruleForm2.stationlist[i].usingtime)
                    ){
                        flag=1;
                        break;
                    }
                    }
                }
                if(flag==1)
                    this.$message({
                    message:'请确定信息的合理性',
                    type:'error'
                })
                else{
                    if(flag2==-1)
                        this.ruleForm2.stationlist.push({"stationname":this.ruleForm2.stationname,"miles":this.ruleForm2.miles,"usingtime":this.ruleForm2.usingtime,"stoptime":this.ruleForm2.stoptime});
                    else{
                        this.ruleForm2.stationlist[flag2].miles=this.ruleForm2.miles;
                        this.ruleForm2.stationlist[flag2].usingtime=this.ruleForm2.usingtime;
                        this.ruleForm2.stationlist[flag2].stoptime=this.ruleForm2.stoptime;
                    }

                    console.log(this.ruleForm2.stationlist)
                }
            }
            
        }

    }
}
</script>

<style>

</style>
