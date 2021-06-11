<template>
  <div>
    <container class="container">
      <template v-slot:headSection>
        <div class="headSection">
          <div class="ipt-box">
            <input class="manage-ipt" type="text" placeholder="请输入菜名" v-model="keyword" v-on:keyup.enter="searchByKeyword">
            <span class="manage-ipt-text">搜索</span>
          </div>
          <div class="manage-btn" @click="showModal">新增菜谱</div>
        </div>
      </template>

      <template v-slot:contentBox>
        <div class="contentBox" v-show="currentPage.length!==0">
          <div v-for="item in currentPage" :key="item.id" class="item">
            <div class="item-img-box">
              <img :src="item.avatar" alt="">
            </div>
            <div class="item-text">
              <p>{{item.name}}</p>
              <p>标签：{{item.tags}}</p>
            </div>
            <div class="btn" v-on:click="openDelModal(item.id)">删除</div>
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
            :current-page="currentNum"
            :total="total"
            v-on:current-change="test">
          </el-pagination>
          <div class="defaultBtn">下一页</div>
        </div>
      </template>
    </container>
    <modal title="新增菜谱" :isShow="isShowModal">
      <template v-slot:modalBody>
        <div class="modalBody">
          <p>
            <span>菜名：</span>
            <input type="text" v-model="newName">
          </p>
          <p>
            <span>图片：</span>
            <input type="text" v-model="newUrl">
          </p>
          <p>
            <span>标签：</span>
            <input type="text" v-model="newTags">

          </p>
          <p>
            <span>步骤：</span>
            <textarea name="" id="" cols="30" rows="10" v-model="newMethod"></textarea>
          </p>
        </div>
      </template>
      <template v-slot:modalFooter>
        <div class="modalFooter">
          <div class="creatMenu" @click="createMenu">新增</div>
          <div class="back" @click="closeModal">返回</div>
        </div>
      </template>
    </modal>
    <modal title="确认信息" :isShow="showDelModal" :smallSize="true">
      <template v-slot:modalBody>
        <div class="modalBody">
          <p>您确认要删除此菜谱？</p>
        </div>
      </template>
      <template v-slot:modalFooter>
        <div class="modalFooter">
          <div class="creatMenu" @click="deleteMenu">删除</div>
          <div class="back" @click="closeDelModal">返回</div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import container from '../components/container/container'
import modal from '../components/modal/modal'
import {Pagination, Upload} from 'element-ui'
import storage from '../storage/storage'
import { ContentLoader} from 'vue-content-loader'

export default {
  name: 'menuManage',
  components: {
    container,
    [Pagination.name]: Pagination,
    [Upload.name]: Upload,
    modal,
    ContentLoader
  },
  data() {
    return {
      isShowModal: false,
      token: '',
      currentPage: [],
      likeMune: [],
      allMune: [],
      total: 1,
      currentNum: 1,
      keyword: '',
      flag: 0,
      keyword: '',
      showDelModal: false,
      delId: 0,
      newName: '',
      newUrl: '',
      newTags: '',
      newMethod: ''
    }
  },
  methods: {
    showModal() {
      this.isShowModal = true
    },
    closeModal() {
      this.isShowModal = false
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
      this.currentPage = this.likeMune[this.currentNum].slice(0,3)
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
        this.currentPage = this.allMune[this.currentNum].slice(0,3)
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
        this.currentPage = this.likeMune[this.currentNum].slice(0,3)
      }
    },
    async deleteMenu() {
      let res = await this.axios.delete('/api/menu/deleteMenu',{
        params: {
          id: this.delId
        },
        headers: {
          token: this.token
        }
      })
      console.log(res);
      if (this.flag == 0) {
        this.allMune.splice(this.currentNum)
      }else if (this.flag == 1) {
        this.likeMune.splice(this.currentNum)
      }
      await this.searchByPage()
      this.showDelModal = false
      if (res.data.code == 0) {
        this.$message.success('删除成功')
      }else{
        this.$message.error('删除失败')
      }
    },
    openDelModal(id) {
      this.showDelModal = true
      this.delId = id
    },
    closeDelModal() {
      this.showDelModal = false
    },
    async createMenu() {
      let res = await this.axios.post('/api/menu/addMenu',{
        name: this.newName,
        status: "1",
        method: this.newMethod,
        tags: this.newTags,
        avatar: this.newUrl,
      },{
        headers: {
          token: this.token
        }
      })
      if (res.data.code == 0) {
        this.$message.success('添加成功')
        return
      }else{
        this.$message.error('添加失败')
      }
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
      this.currentPage = data.data.content.slice(0,3)
      this.allMune[this.currentNum] = data.data.content
      this.total = res.data.data.totalElements
    })
  }
}
</script>

<style scoped>
.container {
  background-color: #eee;
  padding: 30px 40px;
}

.headSection{
  display: flex;
}

.manage-ipt {
  width: 600px;
  height: 40px;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0 18px;
  font-size: 14px;
}
.ipt-box {
  display: inline-block;
  position: relative;
}
.manage-ipt-text {
  position: absolute;
  right: 10px;
  top: 12px;
  font-size: 15px;
}
.manage-btn {
  width: 80px;
  height: 40px;
  color: #fff;
  background-color: #2379EB;
  text-align: center;
  line-height: 40px;
  border-radius: 8px;
  font-size: 14px;
  margin-left: 50px;
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

.modalBody {
  padding: 15px 40px;
}
.modalBody p {
  display: flex;
}
.modalBody p span {
  font-size: 16px;
  margin-right: 15px;
}
.modalBody p input {
  height: 30px;
  width: 300px;
  border: 1px solid #ddd;
  outline: none;
}
.modalBody p textarea {
  resize: none;
  width: 300px;
  height: 100px;
  border: 1px solid #ddd;
}
.el-upload--picture-card {
  width: 80px !important;
  height: 80px !important;
  line-height: 80px;
}
.creatMenu , .back {
  width: 70px;
  height: 40px;
  color: #fff;
  background-color: #2379EB;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  border-radius: 8px;
}
.back {
  background-color: #EB0707;
}
.modalFooter{
  display: flex;
  width: 400px;
  margin: 0 auto;
  justify-content: space-between;
}
textarea{
  outline: none;
}
</style>
