<template>
  <div>
    <container class="container">
      <template v-slot:headSection>
        <div class="headSection">
          <div class="ipt-box">
            <input class="manage-ipt" type="text" placeholder="请输入菜名">
            <span class="manage-ipt-text">搜索</span>
          </div>
          <div class="manage-btn">新增菜谱</div>
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
  </div>
</template>

<script>
import container from '../components/container/container'
import {Pagination} from 'element-ui'
export default {
  name: 'menuManage',
  components: {
    container,
    [Pagination.name]: Pagination
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
