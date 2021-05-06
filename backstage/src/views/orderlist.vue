<template>
  <div id="body">
      <topline/>
      <div id="nav_left">
        
          <a id="bbs">订单列表
            
          <div id="line1"> </div>
            </a>
      </div>
   
<div id="nav_right">
         <div id="U2" style="font-style:border; margin-top:70px;margin-right:1100px">订单管理</div>
        <el-table
            :data="tableData"
            stripe
            style="width: 80%;border: #BBBBBB 2px solid;left: 50px;top: 20px">

            <el-table-column
                prop="bbs"
                label="订单编号">
            </el-table-column>

            <el-table-column
                prop="num"
                label="配送方式">
            </el-table-column>、
             <el-table-column
                prop="status"
                label="订单状态">
            </el-table-column>
             <el-table-column
                prop="content"
                label="订单详情">
            </el-table-column>
        </el-table>
    
      <router-view></router-view>
          <div class="block" style="margin-top: 50px">
<el-button id="lastpage" style="width: 100px;height: 50px; position:absolute; left:600px; top:640px; background-color:#2379EB"  type="primary" round  >上一页</el-button>
    <el-pagination
    layout="prev, pager, next"
    :total="50" style="position:absolute; left:730px; top:650px;" >
    
  </el-pagination>
  <el-button id="nextpage" style="width: 100px;height: 50px;position:absolute; left:1000px; top:640px; background-color:#2379EB"  type="primary" round  >下一页</el-button>
  

  
</div>
      
        
        
     
            </div>
          
    
  </div>
</template>

<script>
import topline from '../component/topline'
import axios from 'axios'
export default {
    data(){
        return{
            tableData:[{
             
                num:'',
                content:'订单详情',
            },{
             
                num:'',
         
            },{
               
                num:'',
             
            },{
              num:'',
             
            },{
             
                num:'',
           

            },{
               
                num:'',
          
            },{
               
                num:'',
     
            },{
              num:'',
            },{
             
                num:'',
            
            },{
               

                num:'',
        
            },{
               
                num:'',
        
            },{
              num:'',

            },{
             
                num:'',
        
            }
            ]
        }
    },
    methods: {
    getListData(){//网络请求数据
    axios.get('/api/v1/forum/getnum').then((res) => {
            let data = res.data
            let i = 0
            this.tableData.map((item) => {
                item['num'] = data[i]
                i++;
            })
        })
    }
    },
    created(){
        this.getListData()
    },
    name:'usermeeting',
    components: { topline },

}
</script>

<style>
#body{
    width: 100%;
    height: 600px;
}
#nav_left{
    margin-top: 0px;
    border: rgb(0, 0, 0) 2px solid;
    width: 15%;
    height: 650px;
    float: left;
    padding-top: 20px;
}
.nav_right{
    margin:0px;
   
    padding: 0px;
    width: 60%;
    height: 400px;
    float: left;
   
}
#bbs{
   top: 120px;
   left:50px;
    font-size: 20px;
    width:100%;
    height:500px;
    line-height: 500px;
}
#msg{
    width:100%;
    height:50px;
    line-height: 50px;
}
#business{
    display: flex;
    position: relative;
    left: 25%;
    top: 5.5%;
}
#message{
    display: flex;
    position: relative;
    left: 23%;
    top: 6%;
}

#line1{
     margin-top: 20px;
    height: 4px;
    width: 100%;
 
     border: rgb(0, 0, 0) 0px solid;
}

</style>