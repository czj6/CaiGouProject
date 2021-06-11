<template>
  <div id="body">
      <container class="container">
        <template v-slot:headSection>
          <div class="headSection">
            订单管理
          </div>
        </template>
        <template v-slot:contentBox>
          <div class="table-container">
            <div class="table-box">
              <div class="table-search-box">
                <input type="text" class="search-ipt" placeholder="请输入订单号">
                <select name="" class="search-ipt">
                  <option value="全部">全部</option>
                  <option value="已送达">已送达</option>
                  <option value="已取消">已取消</option>
                  <option value="配送中">配送中</option>
                  <option value="已下单">已下单</option>
                </select>
              </div>
              <div class="table-body">
                <div class="orderRow">
                  <span>订单编号</span>
                  <span>订单总价</span>
                  <span>订单状态</span>
                  <span>创建时间</span>
                  <span>操作</span>
                </div>
                <div class="orderRow" v-for="item in tableData" :key="item.id">
                  <span>{{item.id}}</span>
                  <span>{{item.price}}</span>
                  <span>{{item.status | statusFilter}}</span>
                  <span>{{item.createtime | dataFilter}}</span>
                  <span>查看详情</span>
                </div>
              </div>

            </div>
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
import storage from '../storage/storage'
export default {
    data(){
        return{
            tableData:[],
            token: '',
        }
    },
    methods: {

    },
    filters: {
      dataFilter(val) {
        if (!val) {
          return 'xxxx.xx.xx xx:xx:xx'
        }
        return val.slice(0,19)
      },
      statusFilter(val) {
        let res = ''
        switch(val) {
          case 1 : res = '已送达';break;
          case 2: res = '已取消'; break;
          case 3 : res = '派送中'; break;
          case 4 : res = '已下单'; break;
        }
        return res
      }
    },
    async created() {
      this.token = storage.getItem('token')
      let res = await this.axios.get('/api/order/findAll',{
        params: {
          pageNum: 1,
          pageSize: 10
        },
        headers: {
          token: this.token
        }
      })
      this.tableData = res.data.data.content
      console.log(this.tableData);
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

.headSection {
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  border-bottom: 1px solid #e9e9e9;
}
.btn {
  background-color: #EB0707;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 15px;
  border-radius: 8px;
  color: #fff;
}
.container {
  background-color: #FDFDFD;
}
.table-container {
  padding: 20px;
}
.table-box {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid #ebeef5;
}
.table-body {
  padding: 10px 15px;
}
.table-search-box {
  height: 70px;
  border-bottom: 1px solid #ebeef5;
  line-height: 70px;
}
.search-ipt {
  width: 200px;
  height: 30px;
  outline: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 10px;
  margin: 0 15px 0 30px;
  color: #606266;
}
.search-ipt:focus{
  border-color: #4F97F7;
}
.orderRow {
  display: flex;
  justify-content: space-around;
  width: 100%;
  min-width: 700px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ebeef5;
}
.orderRow span {
  flex: 1;
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
