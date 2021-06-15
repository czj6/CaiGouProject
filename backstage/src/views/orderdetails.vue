<template>
  <div class="detailBox">
    <container>
      <template v-slot:headSection>
        <div class="headSection">
          <img src="../assets/back.png" alt="" @click="goBack">
          订单管理
        </div>
      </template>
      <template v-slot:contentBox>
        <div class="contentBox">
          <div class="content-wrap">
            <div class="card-wrap">
              <div class="card-item">
                <div class="card-title">订单编号</div>
                <div class="card-body" v-if="Object.keys(order).length !==0">{{order.orderid}}</div>
                <div class="card-body item-skeleton" v-if="Object.keys(order).length ==0">
                  <content-loader
                    primaryColor="#f3f3f3"
                    secondaryColor="#cccccc"
                    width="881"
                    height="135"
                  >
                    <rect x="20" y="60" rx="15" ry="15" width="250" height="70" />
                  </content-loader>
                </div>
              </div>
              <div class="card-item">
                <div class="card-title">订单状态</div>
                <div class="card-body" v-if="Object.keys(order).length !==0">{{order.status | statusFilter}}</div>
                <div class="card-body item-skeleton" v-if="Object.keys(order).length ==0">
                  <content-loader
                    primaryColor="#f3f3f3"
                    secondaryColor="#cccccc"
                    width="881"
                    height="135"
                  >
                    <rect x="20" y="60" rx="15" ry="15" width="250" height="70" />
                  </content-loader>
                </div>
              </div>
              <div class="card-item">
                <div class="card-title">创建时间</div>
                <div class="card-body" v-if="Object.keys(order).length !==0">{{order.createtime | dataFilter}}</div>
                <div class="card-body item-skeleton" v-if="Object.keys(order).length ==0">
                  <content-loader
                    primaryColor="#f3f3f3"
                    secondaryColor="#cccccc"
                    width="881"
                    height="135"
                  >
                    <rect x="20" y="60" rx="15" ry="15" width="250" height="70" />
                  </content-loader>
                </div>
              </div>
            </div>
            <div class="card-wrap">
              <div class="card-item">
                <div class="card-title">配送地址</div>
                <div class="card-body" v-if="Object.keys(order).length !==0">{{order.address}}</div>
                <div class="card-body item-skeleton" v-if="Object.keys(order).length ==0">
                  <content-loader
                    primaryColor="#f3f3f3"
                    secondaryColor="#cccccc"
                    width="881"
                    height="135"
                  >
                    <rect x="20" y="60" rx="15" ry="15" width="250" height="70" />
                  </content-loader>
                </div>
              </div>
              <div class="card-item">
                <div class="card-title">电话</div>
                <div class="card-body" v-if="Object.keys(order).length !==0">{{order.phone}}</div>
                <div class="card-body item-skeleton" v-if="Object.keys(order).length ==0">
                  <content-loader
                    primaryColor="#f3f3f3"
                    secondaryColor="#cccccc"
                    width="881"
                    height="135"
                  >
                    <rect x="20" y="60" rx="15" ry="15" width="250" height="70" />
                  </content-loader>
                </div>
              </div>
              <div class="card-item">
                <div class="card-title">交易金额</div>
                <div class="card-body" v-if="Object.keys(order).length !==0">{{order.priceAll}}</div>
                <div class="card-body item-skeleton" v-if="Object.keys(order).length ==0">
                  <content-loader
                    primaryColor="#f3f3f3"
                    secondaryColor="#cccccc"
                    width="881"
                    height="135"
                  >
                    <rect x="20" y="60" rx="15" ry="15" width="250" height="70" />
                  </content-loader>
                </div>
              </div>
            </div>
            <div class="card-wrap last-card-wrap ">
              <div class="card-item">
                <div class="card-title">备注信息</div>
                <div class="card-body" v-if="Object.keys(order).length !==0">{{order.remark}}</div>
                <div class="card-body item-skeleton" v-if="Object.keys(order).length ==0">
                  <content-loader
                    primaryColor="#f3f3f3"
                    secondaryColor="#cccccc"
                    width="881"
                    height="135"
                  >
                    <rect x="20" y="60" rx="15" ry="15" width="250" height="70" />
                  </content-loader>
                </div>
              </div>
              <div class="card-item-hidde"></div>
              <div class="card-item-hidde"></div>
            </div>
            <div class="table-body" v-for="item in menuList" :key="item.id">
              <div class="menu-title">{{item.menuName}}</div>
              <div class="table-box">
                <div class="orderRow">
                  <span>食材id</span>
                  <span>配送食材</span>
                  <span>单价</span>
                  <span>单位重量</span>
                  <span>份数</span>
                </div>
                <div class="orderRow" v-for="foods in item.foodList" :key="foods.id">
                    <span>{{foods.id}}</span>
                    <span>{{foods.ingredient}}</span>
                    <span>{{foods.price}}</span>
                    <span>{{foods.standard_weight}}</span>
                    <span>{{foods.multiple}}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </container>
    <div class="delivery" v-if="order.status == 4" @click="delivery">配送</div>
  </div>
</template>

<script>
  import container from '../components/container/container'
  import axios from 'axios'
  import storage from '../storage/storage'
  import { ContentLoader} from 'vue-content-loader'

  export default {
    name: 'orderdetail',
    data() {
      return {
        token: '',
        order: {},
        menuList: []
      }
    },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async delivery() {
      let res = await this.axios.put(`/order/changeStatus?orderId=${this.order.orderid}`,{

      },{
        headers: {
          token: this.token
        }
      })
      console.log(res);
      if (res.data.code == 0) {
        this.order.status = 3
        this.$message.success('出货成功')
      }else{
        this.$message.error('出货失败')
      }
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
  async created() {
    this.token = storage.getItem('token')
    this.id = this.$route.params.id
    let res = await this.axios.get('/order/findOneDetail',{
      params: {
        id: this.id
      },
      headers: {
        token: this.token
      }
    })
    let data = res.data;
    this.order = {
      address: data.address,
      createtime: data.createtime,
      remark: data.remark,
      priceAll: data.price,
      phone: data.phone,
      status: data.status,
      orderid: this.id
    }
    this.menuList = data.customMenuList
  },
  components:{
    container,
    ContentLoader
  }
}
</script>

<style scoped>
.delivery {
  position: fixed;
  bottom: 3%;
  right: 2%;
  width: 160px;
  height: 50px;
  line-height: 50px;
  border-radius: 10px;
  text-align: center;
  background-color: #2379EB;
  color: #fff;
  cursor: pointer;
}


.headSection {
  height: 70px;
  border-bottom: 1px solid #ebeef5;
  font-size: 20px;
  padding: 0 30px;
  display: flex;
  align-items: center;
}
.contentBox {
  padding: 15px;
  background-color: #FDFDFD;
}
.content-wrap {
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid #ebeef5;
}

.card-wrap {
  width: 100%;
  min-width: 800px;
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
}
.last-card-wrap {
  padding-bottom: 40px;
  border-bottom: 1px solid #ebeef5;
}
.card-item {
  width: 25%;
  height: 120px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}
.card-item-hidde {
  width: 25%;
  height: 120px;
  border-radius: 4px;
  visibility: hidden;
}
.card-title {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ebeef5;
  padding-left: 15px;
  font-size: 16px;
}
.card-body {
  height: 70px;
  line-height: 70px;
  padding-left: 15px;
  font-size: 16px;
}
.menu-title {
  border: 1px solid #ebeef5;
  width: 200px;
  border-bottom: none;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  text-align: center;
}
.table-body{
  padding: 10px 15px;
  margin: 20px 0;
}
.table-box {
  border: 1px solid #ebeef5;
}
.orderRow {
  display: flex;
  justify-content: space-around;
  width: 100%;
  min-width: 700px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ebeef5;
  padding: 0 20px;
  box-sizing: border-box;
}
.orderRow span{
  flex: 1;
}
</style>
