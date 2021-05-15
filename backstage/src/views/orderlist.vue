<template>
  <div id="body">
      <container>
        <template v-slot:headSection>
          <div class="headSection">
            订单管理
          </div>
        </template>
        <template v-slot:contentBox>
          <div id="nav_right">
            <el-table
                :data="tableData"
                stripe
                style="width: 80%;border: #BBBBBB 2px solid;">

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

          </div>
        </template>
         <template v-slot:footerSection>
          <div class="footerSection">
            <div class="defaultBtn">上一页</div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
            <div class="defaultBtn">下一页</div>
          </div>
        </template>
      </container>
  </div>
</template>

<script>
import headBar from '../components/head/head'
import sideBar from '../components/sideBar/sideBar'
import container from '../components/container/container'
import {Pagination} from 'element-ui'
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

    },

    name:'orderlist',
    components: {
      headBar,
      sideBar,
      container,
      [Pagination.name]: Pagination
    },
}
</script>

<style scoped>
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

.headSection {
  font-size: 14px;
  font-weight: bold;
}
.btn {
  background-color: #EB0707;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 8px;
  color: #fff;
}

.defaultBtn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4F97F7;
  border-radius: 17px;
  color: #fff;
  font-size: 16px;
}

.footerSection {
  width: 70%;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
