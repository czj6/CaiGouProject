<template>
  <div class="menuList">
    <container>
      <template v-slot:headSection>
        <div class="headSection">
          <span style="font-size: 16px; font-weight: bolder;">菜谱列表</span>
          <div class="search">
            <span>搜索</span>
            <input type="text" v-model="keyword" class="ipt" v-on:keyup.enter="searchByKeyword">
          </div>
          <div class="cuisine">
            <span>菜系</span>
            <select name="" id="" class="sel">
              <option value="闽">闽菜</option>
              <option value="粤">粤菜</option>
              <option value="川">川菜</option>
            </select>
          </div>
        </div>
      </template>
      <template v-slot:contentBox>
        <div class="contentBox" v-show="currentPage.length!==0">
          <div v-for="item in currentPage" :key="item.id" class="item" @click="gotoDetail(item)">
            <div class="item-img-box">
              <img :src="item.avatar" alt="">
            </div>
            <div class="item-text">
              <p>{{item.name}}</p>
              <p>标签：{{item.tags}}</p>
            </div>
            <div v-if="item.status==1" class="btn">已上架</div>
            <div v-if="item.status==2" class="down-btn">已下架</div>
          </div>
        </div>
        <div class="contentBox" v-show="currentPage.length==0">
          <div class="item item-skeleton">
            <content-loader
              primaryColor="#f3f3f3"
              secondaryColor="#cccccc"
              width="881"
              height="135"
            >
              <rect x="20" y="20" rx="3" ry="3" width="75" height="100" />
              <rect x="135" y="45" rx="10" ry="10" width="100" height="16"></rect>
              <rect x="135" y="75" rx="10" ry="10" width="150" height="16"></rect>
              <rect x="710" y="60" rx="10" ry="10" width="56" height="26"></rect>
            </content-loader>
          </div>
          <div class="item item-skeleton">
            <content-loader
              primaryColor="#f3f3f3"
              secondaryColor="#cccccc"
              width="881"
              height="135"
            >
              <rect x="20" y="20" rx="3" ry="3" width="75" height="100" />
              <rect x="135" y="45" rx="10" ry="10" width="100" height="16"></rect>
              <rect x="135" y="75" rx="10" ry="10" width="150" height="16"></rect>
              <rect x="710" y="60" rx="10" ry="10" width="56" height="26"></rect>
            </content-loader>
          </div>
          <div class="item item-skeleton">
            <content-loader
              primaryColor="#f3f3f3"
              secondaryColor="#cccccc"
              width="881"
              height="135"
            >
              <rect x="20" y="20" rx="3" ry="3" width="75" height="100" />
              <rect x="135" y="45" rx="10" ry="10" width="100" height="16"></rect>
              <rect x="135" y="75" rx="10" ry="10" width="150" height="16"></rect>
              <rect x="710" y="60" rx="10" ry="10" width="56" height="26"></rect>
            </content-loader>
          </div>
        </div>
      </template>
      <template v-slot:footerSection>
        <div class="footerSection">
          <div class="defaultBtn">上一页</div>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="5"
            :total="total"
            :current-page="currentNum"
            v-on:current-change="test">
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
  name: 'menuList',
  components: {
    container,
    [Pagination.name]: Pagination,
    ContentLoader
  },
  data() {
    return {
      keyword: '',
      token: '',
      allMune: [],
      currentPage: [],
      likeMune: {},
      currentNum: 1,
      total: 0,
      flag: 0, // 0表示全部，1表示按关键词查找， 2表示按菜系查找
    }
  },
  mounted() {

  },
  methods: {
    logMsg() {
      console.log(1);
    },
    async searchByKeyword() {
      this.flag = 1
      this.currentNum = 1
      this.likeMune = []
      this.currentPage = []
      let res = await this.axios.get('/api/menu/findLike',{
        params: {
          name: this.keyword,
          pageNum: this.currentNum
        },
        headers: {
          token: this.token
        }
      })
      this.likeMune[this.currentNum] = res.data.data.content
      this.total = res.data.data.totalElements
      this.currentPage = this.likeMune[this.currentNum].slice(2)
    },
    test(e) {
      this.currentNum = e
      this.currentPage = []
      this.searchByPage()
    },
    async searchByPage() {
      let res;
      if (this.flag == 0) {
        if (this.allMune[this.currentNum] == undefined) {
          res = await this.axios.get(`/api/menu/findAll`,{
            params: {
              pageNum: this.currentNum
            },
            headers: {
              token: this.token
            }
          });
          this.allMune[this.currentNum] = res.data.data.content
          this.total = res.data.data.totalElements
        }
        this.currentPage = this.allMune[this.currentNum].slice(2)
      }else if (this.flag == 1) {
        if (this.likeMune[this.currentNum] == undefined) {
          res = await this.axios.get('/api/menu/findLike',{
            params: {
              name: this.keyword,
              pageNum: this.currentNum
            },
            headers: {
              token: this.token
            }
          })
          this.likeMune[this.currentNum] = res.data.data.content
          this.total = res.data.data.totalElements
        }
        this.currentPage = this.likeMune[this.currentNum].slice(2)
      }
    },
    gotoDetail(item) {
      this.$store.dispatch('saveItem',item);
      this.$router.push({path: `/detail/${item.id}`})

    }
  },
  created() {
    this.token = storage.getItem('token');
    this.axios.get('/api/menu/findAll',{
      params: {
        pageNum: 1
      },
      headers: {
        token: this.token
      }
    }).then(res => {
      let data = res.data;
      this.currentPage = data.data.content.slice(2)
      this.allMune[this.currentNum] = data.data.content
      this.total = res.data.data.totalElements
    })
  }
}
</script>

<style scoped>
.container {
  padding: 40px 30px 20px 30px;
}
.menuList {
  height: 100%;
}
.ipt {
  width: 280px;
  border: 1px solid #ddd;
  outline: none;
  background-color: #fff;
  height: 30px;
  font-size: 20px;
  color: #000;
  padding: 0 10px;
}
.sel {
  width: 200px;
  height: 30px;
}

.headSection {
  display: flex;
  align-items: center;
}

.search, .cuisine {
  margin: 0 40px;
}

.search span, .cuisine span{
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px;
}
.contentBox{
  height: 500px;
  width: 70%;
  border: 1px solid #ddd;
  margin-top: 10px;
  background-color: #eee;
}
.contentBox .item {
  height: 135px;
  background-color: #fff;
  margin: 20px 0;
  display: flex;
  align-items: center;
}

.contentBox .item .item-text {
  width: 535px;
  overflow: hidden;
}
.contentBox .item div {
  margin: 0 20px;
}
.item-img-box img{
  height: 100px;
  width: 75px;
}
.btn {
  background-color: #07EB31;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 7px;
  border-radius: 4px;
  color: #fff;
}
.down-btn {
  background-color: red;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 7px;
  border-radius: 4px;
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
