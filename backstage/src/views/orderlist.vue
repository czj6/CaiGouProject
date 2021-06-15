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
                <input type="text" class="search-ipt" v-model="orderId" placeholder="请输入订单号" v-on:keyup.enter="getDate">
                <select name="" class="search-ipt" v-model="status">
                  <option value= 0>全部</option>
                  <option value= 1>已送达</option>
                  <option value= 2>已取消</option>
                  <option value= 3>配送中</option>
                  <option value= 4>已下单</option>
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
                <div v-if="tableData.length !== 0">
                  <div class="orderRow" v-for="item in tableData" :key="item.id">
                    <span v-if="item.id !== -1">{{item.id}}</span>
                    <span v-if="item.id == -1">查无此订单</span>
                    <span v-if="item.id !== -1">{{item.price}}</span>
                    <span v-if="item.id !== -1">{{item.status | statusFilter}}</span>
                    <span v-if="item.id !== -1">{{item.createtime | dataFilter}}</span>
                    <span v-if="item.id !== -1">
                      <router-link tag="span" :to="'/supermarket/orderdetail/'+item.id">查看详情</router-link>
                    </span>
                  </div>
                </div>
                <div v-if="tableData.length ==0">
                  <div class="orderRow"  v-for="n in 10" :key="n.index">
                    <span class="item-skeleton" v-for="k in 5" :key="k.index">
                      <content-loader
                        primaryColor="#f3f3f3"
                        secondaryColor="#cccccc"
                        width="881"
                        height="135"
                      >
                        <rect x="20" y="60" rx="15" ry="15" width="150" height="70" />
                      </content-loader>
                    </span>
                  </div>
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
              :page-size="10"
              :current-page="pageNum"
               v-on:current-change="changeNum"
              :total="total">
            </el-pagination>
            <div class="defaultBtn">下一页</div>
          </div>
        </template>
      </container>
  </div>
</template>

<script>

import container from '../components/container/container'
import {Pagination} from 'element-ui'
import storage from '../storage/storage'
import { ContentLoader} from 'vue-content-loader'

export default {
    data(){
        return{
            tableData:[],
            token: '',
            orderId: '',
            status: 0,
            pageNum: 1,
            total: 0
        }
    },
    methods: {
      async getDate() {
        let res;
        this.tableData = []
        if (this.orderId == '') {
          res = await this.axios.get('/order/findAll',{
            params: {
              pageNum: this.pageNum,
              pageSize: 10,
              status: this.status
            },
            headers: {
              token: this.token
            }
          })
        }else {
          res = await this.axios.get('/order/findAll',{
            params: {
              pageNum: this.pageNum,
              pageSize: 10,
              status: this.status,
              orderId: this.orderId
            },
            headers: {
              token: this.token
            }
          })
        }
        if (res.data.data.content.length == 0) {
          this.total = 1;
          this.tableData = [
              {
                id: -1,
              }
          ]
        }else{
          this.total = res.data.data.totalElements
          this.tableData = res.data.data.content
        }

      },
      changeNum(e) {
        this.pageNum = e
        this.getDate()
      }
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
    watch: {
      status(val, old) {
        this.getDate()
      }
    },
    async created() {
      this.token = storage.getItem('token')
      this.getDate()
    },
    name:'orderlist',
    components: {

      container,
      [Pagination.name]: Pagination,
      ContentLoader
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
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
}
.orderRow span:last-child {
  cursor: pointer;
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
