<template>
<div>

      <toplin1/>
      <div id="ticket">

        <div id="sub">
          <div id="sub-count">
            <p id="ID"  class="subTitle">订单编号<br/></p>
            <p id="meeting-count">{{total}}</p>
          </div>
          <div class="line"></div>
          <div id="sub-info">     
          <p id="ID1"  class="subTitle">用户地址<br/></p>
            <p id="meeting-count1">{{total1}}</p>
             <p id="ID2"  class="subTitle2">用户手机号<br/></p>
            <p id="meeting-count2">{{total2}}</p>
              <p id="ID3"  class="subTitle3">用户昵称<br/></p>
            <p id="meeting-count3">{{total3}}</p>
            <div>
              <br/>
              
            </div>
          </div>
       
          <div id="content">
            <p id="ID"  class="subTitle">订单内容<br/></p>
            <p id="meeting-count">{{total}}</p>
          </div>
          <el-button id="nextpage" style="width: 200px;height: 80px;position:absolute; left:1300px; top:550px; background-color:#2379EB"  type="primary" round  >分拣完成</el-button>
        </div>
      
              </div>
 
  <router-view></router-view>
</div>
</template>

<script>
  import toplin1 from '../component/toplin1'
  import axios from 'axios'

  export default {
    name: 'submeeting',
    
    data() {
      return {
        content: '',
        total:'412312312312412312',
          total1:'福州大学',
           total2:'12345678910',
           total3:"人间失格",
        tableData: []
        //tableData: [{info_content:'123'}]
      }
    },
    
    methods: {
    getPeopleCount(){
      axios.get('/api/v1/forum/getnum').then((res) => {
        this.total = res.data[0]
        console.log(this.total);
      })
    },
   
    getListData(){
      axios.get('/api/v1/forum/getmsg0', {
        params: {
          forumid: 1
        }
      }).then((res) => {
        this.tableData = res.data
        
      })
    },

    postInfo(){
      axios.post('api/v1/subchairman/upload', { 
          content: this.content,
          forumid: 1,

      }).then((res) => {
        let data = res.data
        console.log(data);
      })
    }
  },

  created(){//模板已经编译 -- 执行请求数据的操作
        this.getPeopleCount();
        this.getListData();
  },

  components:{toplin1}
  }
</script>

<style>
#sub {
  margin: 0px;
 height:650px; 
 width:100%;
}
.subTitle {
 
  font-size: 30px;
  margin: 15px;
}
 
#sub-info {
position:absolute; 

    left:-0px; 
    width:100%;
    height:210px;
    top:130px;
       border: #BBBBBB 2px solid;
  background-color: #ffffff;
}

#sub-count{
  position:absolute; 
    left:-0px; 
    width:100%;
    height:70px;
    top:30px;
       border: #BBBBBB 2px solid;
  background-color: #ffffff;
}

#meeting-count{
 position:absolute; 
    left:1300px; 
    top:13px;

}

.line{
  height: 1px;

  
}

.info{
  border-radius: 5px;
  width:400px;
  height:35px;

  float: right;
}
#send{
  float:right;
  margin-right: 15px;
  margin-left:15px;
}
#ticket{
  position:absolute; 
    left:8px; 
    top:76px;
  background-color: #eeeeee;
   width:99%;
}
#ID{
  font-size: 20px;
   position:absolute; 
    left:8px; 
    top:10px;
}
#ID1{
  font-size: 20px;
   position:absolute; 
    left:10px; 
    top:20px;
}
#meeting-count1{
 position:absolute; 
    left:1350px; 
    top:14px;
     font-size: 20px;

}
#ID2{
  font-size: 20px;
   position:absolute; 
    left:20px; 
    top:70px;
}
#ID3{
  font-size: 20px;
   position:absolute; 
    left:25px; 
    top:127px;
}
#meeting-count2{
 position:absolute; 
    left:1330px; 
    top:70px;
     font-size: 20px;

}
#meeting-count3{
 position:absolute; 
    left:1350px; 
    top:127px;
     font-size: 20px;

}
#content{
  position:absolute; 

    left:-0px; 
    width:100%;
    height:210px;
    top:400px;
       border: #BBBBBB 2px solid;
  background-color: #ffffff;
}

</style>