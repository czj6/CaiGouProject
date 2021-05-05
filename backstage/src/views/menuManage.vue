<template>
  <div>
    <container class="container">
      <template v-slot:headSection>
        <div class="headSection">
          <div class="ipt-box">
            <input class="manage-ipt" type="text" placeholder="请输入菜名">
            <span class="manage-ipt-text">搜索</span>
          </div>
          <div class="manage-btn" @click="showModal">新增菜谱</div>
        </div>
      </template>

      <template v-slot:contentBox>
        <div class="contentBox">
          <div class="item">
            <div class="item-img-box">
              <img src="../assets/test.jpg" alt="">
            </div>
            <div class="item-text">
              <p>宫保鸡丁</p>
              <p>材料：</p>
            </div>
            <div class="btn">删除</div>
          </div>
          <div class="item">
            <div class="item-img-box">
              <img src="../assets/test.jpg" alt="">
            </div>
            <div class="item-text">
              <p>宫保鸡丁</p>
              <p>材料：</p>
            </div>
            <div class="btn">删除</div>
          </div>
          <div class="item">
            <div class="item-img-box">
              <img src="../assets/test.jpg" alt="">
            </div>
            <div class="item-text">
              <p>宫保鸡丁</p>
              <p>材料：</p>
            </div>
            <div class="btn">删除</div>
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
    <modal title="新增菜谱" :isShow="isShowModal">
      <template v-slot:modalBody>
        <div class="modalBody">
          <p>
            <span>菜名：</span>
            <input type="text">
          </p>
          <p>
            <span>图片：</span>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
          </p>
          <p>
            <span>材料：</span>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </p>
          <p>
            <span>步骤：</span>
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </p>
        </div>
      </template>
      <template v-slot:modalFooter>
        <div class="modalFooter">
          <div class="creatMenu">新增</div>
          <div class="back" @click="closeModal">返回</div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import container from '../components/container/container'
import modal from '../components/modal/modal'
import {Pagination, Upload} from 'element-ui'
export default {
  name: 'menuManage',
  components: {
    container,
    [Pagination.name]: Pagination,
    [Upload.name]: Upload,
    modal
  },
  data() {
    return {
      isShowModal: false
    }
  },
  methods: {
    showModal() {
      this.isShowModal = true
    },
    closeModal() {
      this.isShowModal = false
    }
  }
}
</script>

<style>
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
</style>
