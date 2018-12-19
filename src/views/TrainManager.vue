<template>
    <div>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" @submit.native.prevent>
				<el-form-item>
					<el-input v-model="filters.trainid" placeholder="车次id"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getTrainPart">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <el-table :data="trainlist.slice((currentPage-1)*pagesize,currentPage*pagesize)">
        <el-table-column label="车次id" prop="Tno" width="300" align="center"></el-table-column>
        <el-table-column label="空调类型" prop="airtype" width="300" align="center"></el-table-column>
        <el-table-column label="操作" width="300">
                            <template slot-scope="scope">
                                <el-button
                                @click.native.prevent="deleteRow(scope.row.Tno)"
                                type="text"
                                size="small">
                                移除
                                </el-button>
                                <el-button
                                @click.native.prevent="goToEdit(scope.row.Tno)"
                                type="text"
                                size="small">
                                详细
                                </el-button>
                            </template>
        </el-table-column>
    </el-table>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage" 
        :page-size="pagesize"       
        layout="total,prev, pager, next, jumper"
        :total="trainlist.length"
        > 
    </el-pagination>
    
</div>
</template>

<script>
import { requestgetPartTrain } from '../request/api';
export default {
    
    data(){
        return{
            filters: {
				trainid: ''
			},
            currentPage:1,
            pagesize:20,
            trainlist:[]
        }
    },
    created(){
        this.getTrainPart()
    },
    methods:{
        handleCurrentChange:function(currentPage){
            this.currentPage=currentPage;
            console.log(this.currentPage)
        },
        getTrainPart(){
            let para={
                trainid:this.filters.trainid
            }
            requestgetPartTrain(para).then(res=>{
            this.trainlist=res.data
            for( var i=0;i<this.trainlist.length;i++){
                if(this.trainlist[i].Ano===0)
                    this.trainlist[i].airtype='无空调'
                else if(this.trainlist[i].Ano===1)
                    this.trainlist[i].airtype='有空调'
                else
                    this.trainlist[i].airtype='新空调'
            }

        })
        },
        deleteRow(spotid){
            
            this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let para={}
				}).catch(() => {

				});
            // requestdeleSpot(para).then(res=>{
            //     if(res.data==1){
            //         this.$message({
            //             message:"删除成功",
            //             type:"success"
            //         })
            //         this.getSpots()
            //     }
            //     else{
            //         this.$message({
            //             message:"删除失败",
            //             type:"success"
            //         })
            //     }
                    
            // })
        },
        goToEdit(trainid){
            this.$router.push({name:'修改火车信息',params:{'trainid':trainid}});
        },
        
    }
    
    
}
</script>

<style>

</style>