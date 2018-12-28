<template>
    <el-form :model="ruleForm2"  :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="车次名:" prop="trainname">
                <el-input  v-model.number="ruleForm2.trainname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="车次类型:"  >
                    <el-select v-model="ruleForm2.traintype" placeholder="选择车次种类" @change="changeSeatType">
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
                    <el-option v-for="(item,index) in AllSeatType " :key="index" :label="item.Seatname" :value="item.Seatname" v-if="(item.Seatno>=10&&item.Seatno<seatflag)||(item.Seatno<10&&item.Seatno>seatflag)"></el-option>
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
                        <el-table-column label="座位类型" prop="seatname" width="200" align="center"></el-table-column>
                        <el-table-column label="座位数量" prop="count" width="200" align="center"></el-table-column>
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
                    <el-option v-for="(item,index) in AllStation " :key="index" :label="item.Sname" :value="item.Sname"></el-option>
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
                        <el-table-column label="车站名称" prop="spotname" width="200" align="center"></el-table-column>
                        <el-table-column label="到达里程" prop="miles" width="200" align="center"></el-table-column>
                        <el-table-column label="到达耗时" prop="arrivetime" width="200" align="center"></el-table-column>
                        <el-table-column label="停留时间" prop="staytime" width="200" align="center"></el-table-column>
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
import { requestgetSpots,requestgetSeats,requestaddTrain } from '../request/api';
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

        return{
            AllSeatType:[],
            seattype:'',
            seatflag:20,//作为区分,不同车的座位类型
            AllTrainType:[{name:'高铁',value:'G'},{name:'动车',value:'D'},{name:'特快',value:'T'},{name:'快速',value:'K'}],
            AllAirType:[{name:'有空调',value:1},{name:'无空调',value:0},{name:'新空调',value:2}],
            AllStation:[],
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
        
        //根据车次更改可以选择的座位类型
        changeSeatType(){
            //console.log("jjjj")
            if(this.ruleForm2.traintype==='G'||this.ruleForm2.traintype==='D'){
                this.seatflag=20;
            }else{
                this.seatflag=-1;
            }
        },
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
                if(this.ruleForm2.seat[i].seatname==this.seattype){
                    this.ruleForm2.seat[i].count=this.ruleForm2.seatnum;
                    flag=1;
                }
            }
            if(flag==0){
                this.ruleForm2.seat.push({'seatname':this.seattype,'count':this.ruleForm2.seatnum})
            }
            }
            
            
        },
        addStation(){
            //console.log(this.ruleForm2)
            if(this.ruleForm2.stationname===''||this.ruleForm2.miles===''||this.ruleForm2.usingtime==='')
                this.$message({
                    message:'请将信息填充完整',
                    type:'error'
                })
            else{
                var flag=0;
                var flag2=-1;
                for(var i=0;i<this.ruleForm2.stationlist.length;i++){
                    if(this.ruleForm2.stationname==this.ruleForm2.stationlist[i].spotname){
                        flag2=i;
                }else{
                        if(!((this.ruleForm2.miles>this.ruleForm2.stationlist[i].miles
                        &&this.ruleForm2.usingtime>(this.ruleForm2.stationlist[i].arrivetime+this.ruleForm2.stationlist[i].staytime))//添加后来的车次
                        ||(this.ruleForm2.miles<this.ruleForm2.stationlist[i].miles
                        &&this.ruleForm2.usingtime+this.ruleForm2.stoptime<this.ruleForm2.stationlist[i].arrivetime))
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
                        this.ruleForm2.stationlist.push({"spotname":this.ruleForm2.stationname,"miles":this.ruleForm2.miles,"arrivetime":this.ruleForm2.usingtime,"staytime":this.ruleForm2.stoptime});
                    else{
                        this.ruleForm2.stationlist[flag2].miles=this.ruleForm2.miles;
                        this.ruleForm2.stationlist[flag2].arrivetime=this.ruleForm2.usingtime;
                        this.ruleForm2.stationlist[flag2].staytime=this.ruleForm2.stoptime;
                        
                    }
                    this.ruleForm2.stationlist=sortKey(this.ruleForm2.stationlist,'miles')
                    console.log(this.ruleForm2.stationlist)
                }
            }
            
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm2.stationlist.length==0||this.ruleForm2.seat.length==0)
                this.$message({
                    message:"请将信息填充完整",
                    type:'error'
                })
            else{
                let train={trainid:(this.ruleForm2.traintype+this.ruleForm2.trainname),airid:this.ruleForm2.airtype,seatlist:this.ruleForm2.seat,spotlist:this.ruleForm2.stationlist}
                let para={train:JSON.stringify(train)};
                requestaddTrain(para).then(res=>{
                    if(res.data==1)
                        this.$message({
                            message:"火车添加成功,火车票将于7天后起售",
                            type:"success"
                        })
                });
            }
            
            
          } else {
            this.$message({
                message:"请将信息填充完整",
                type:'error'
            })
            return false;
          }
        });
      }

    },
    created(){
        console.log(1)
        requestgetSeats().then(res=>{
                //console.log(res);
                this.AllSeatType=res.data
            })
        requestgetSpots({spotname:''}).then(res=>{
                this.AllStation=res.data;
            })
    }
    
}
function sortKey(array,key){
                 return array.sort(function(a,b){
                     var x = a[key];
                     var y = b[key];
                     return ((x<y)?-1:(x>y)?1:0)
                 })
             }
</script>

<style>

</style>
