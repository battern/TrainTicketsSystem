<template>
<div>
    <div class="crumbs">
        <div class="cantainer">
                    <el-table style="width: 100%;" :data="ticketslist" v-loading="listLoading">
                        <el-table-column type="index" width="100" align="center" label="序号">    
                        </el-table-column>
                        <el-table-column label="车次" prop="trainid" width="200" align="center">    
                        </el-table-column>
                        <el-table-column label="发车时间" prop="begintime" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="出发站" prop="beginSta" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="目的站" prop="endSta" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="一等座" prop="one" width="120" align="center">    
                        </el-table-column>  
                        <el-table-column label="二等座" prop="two" width="120" align="center">    
                        </el-table-column>  
                        <el-table-column label="三等座" prop="three" width="120" align="center">    
                        </el-table-column>
                        <el-table-column label="预订" width="120" align="center" >
                          <template slot-scope="scope" >
                          <el-button size="small" @click="toBuyThisTicket(scope.$index, scope.row)">购买</el-button>
                          </template>  
                        </el-table-column>
                    </el-table>
                        <el-pagination
                            :current-page="currentPage"
                            :page-sizes="[20, 50, 100]" 
                            :page-size="pagesize"       
                            layout="total,prev, pager, next, jumper"
                            :total="total"
                            > 
                    </el-pagination>
        </div>
    </div>
  </div>

    
</template>

<script>
export default {
    
    data(){
        return{
             listLoading:false,
             currentPage:1,
            total:0,
            pagesize:20,
            showDetail:false,
            ticketslist:[{trainid:'1',begintime:'2018-11-28'}],
            
        }
    },
    methods:{
        
        toBuyThisTicket(index, row){
            this.$router.push({name:'买票',params:{'traininfo':JSON.stringify(Object.assign({}, row))}});
        },
        getTicket(needInfo){
            let para = {
					page: this.page,
				};
				this.listLoading = true;
				// getUserListPage(para).then((res) => {
				// 	this.total = res.data.total;
				// 	this.ticketslist = res.data.ticketslists;
				// 	this.listLoading = false;
				// });
        }
    },
    created(){
        let info = this.$router.history.current.params.info;
    //防止F5刷新丢失信息
      if (info) {
        sessionStorage.setItem("need2", info);
      }
      let needInfo =JSON.parse(sessionStorage.getItem("need2") + '') ;
      //TODO:根据传递过来的购票信息,去添加购票人
        console.log(needInfo.begin)
      
    },
    mounted(){
        
    },

}
</script>

<style >
    .box-card {
    width: 600px;
  }
</style>
