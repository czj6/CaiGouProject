<template>
  <div>
    <container>
      <template v-slot:headSection>
        <div class="headSection">
          新增菜谱
        </div>
      </template>
      <template v-slot:contentBox>
        <div class="contentBox">
          <div class="content">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="菜谱名称">
                <el-input v-model="form.name" class="myipt"></el-input>
              </el-form-item>
              <el-form-item label="菜谱标签">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="食材主料">
                <div class="table">
                   <div class="orderRow">
                    <span>食材id</span>
                    <span>食材名称</span>
                    <span>单位重量</span>
                  </div>
                  <div class="orderRow" v-for="item in mainFood" :key="item.id">
                    <span>{{item.id}}</span>
                    <span>{{item.name}}</span>
                    <span>{{item.standard_weight}}</span>
                  </div>
                  <div class="orderRow">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <el-button type="primary" icon="el-icon-plus" circle class="addFood" @click="addFood"></el-button>
                </div>
              </el-form-item>
              <el-form-item label="食材辅料">
                <div class="table">
                   <div class="orderRow">
                    <span>食材id</span>
                    <span>食材名称</span>
                    <span>单位重量</span>
                  </div>
                  <div class="orderRow" v-for="item in subFood" :key="item.id">
                    <span>{{item.id}}</span>
                    <span>{{item.name}}</span>
                    <span>{{item.standard_weight}}</span>
                  </div>
                  <div class="orderRow">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <el-button type="primary" icon="el-icon-plus" circle class="addFood" @click="addFood"></el-button>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </template>
    </container>

    <modal
    :isShow="showModal"
    title="新增食材"
    >
      <template v-slot:modalBody>
        <div>
          <div class="addFoodRow">
            <span>食材名称：</span>
            <el-input class="myipt" v-model="addFoodItem.name" @input="debounce" @change="handleBlur" @focus="handleFocus"></el-input>
            <ul class="board" v-show="showBoard">
              <li v-for="item in foodList" :key="item.id" @click="test">{{item.ingredient}}</li>
            </ul>
          </div>
          <div class="addFoodRow">
            <span>食材重量:</span>
            <el-input class="myipt" v-model="addFoodItem.standard_weight"></el-input>
          </div>
          <div class="addFoodRow">
            <el-radio-group v-model="addFoodItem.major">
              <el-radio :label="1">主料</el-radio>
              <el-radio :label="0">辅料</el-radio>
            </el-radio-group>
          </div>
        </div>
      </template>
      <template v-slot:modalFooter>
        <div class="btngroup">
          <el-button type="primary" @click="confirmAdd">添加</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import container from '../components/container/container'
import Modal from '../components/modal/modal.vue'
import storage from '../storage/storage'
import {Input,Form,FormItem,Button,Select,Option,Radio} from 'element-ui'

export default {
  components: {
    container,
    Modal,
    [Input.name]: Input,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
    [Radio.name]: Radio
  },
  data() {
    return {
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      value: '',
      mainFood: [],
      subFood: [],
      showBoard: false,
      showModal: false,
      addFoodItem: {
        name: '',
        id: '',
        major: 1,
        standard_weight: ''
      },
      timer: null,
      token: '',
      foodList: [],
      isExist: false
    }
  },
  methods: {
    addFood() {
      this.showModal = true
    },
    handleFocus() {
      this.showBoard = true
    },
    handleBlur(e) {
      console.log(e);
      this.showBoard = false
      let item = this.foodList[0]
      if (this.foodList.length!==0 && this.addFoodItem.name == item.ingredient) {
        this.addFoodItem.id = item.id
        this.addFoodItem.major = item.major
        this.isExist = true
      }else {
        this.isExist = false
      }
    },
    cancel() {
      this.showModal = false
      this.addFoodItem = {
        name: '',
        id: '',
        major: 1,
        standard_weight: ''
      }
    },

    test() {
      console.log(99);
    },

    debounce(){
        if(this.timer){
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(this.getFoodLike,2000) // 简化写法
    },
    async getFoodLike() {
      let res = await this.axios.get('/food/getAllFoodPageByName',{
        params: {
          name: this.addFoodItem.name,
          pageNum: 1,
          pageSize: 10
        },
        headers: {
          token: this.token
        }
      })
      console.log(res);
      this.foodList = res.data.data.content
    },
    confirmAdd() {
      if (this.isExist) {
        this.$message.success('添加成功')
        if (this.addFoodItem.major == 1) {
          let flag = this.mainFood.findIndex((item) => {
            return item.id == this.addFoodItem.id
          })
          if (flag == -1) {
            this.mainFood.push(this.addFoodItem)
          }
        }else {
          let flag = this.subFood.findIndex((item) => {
            return item.id == this.addFoodItem.id
          })
          if (flag == -1) {
            this.subFood.push(this.addFoodItem)
          }
        }

        this.addFoodItem = {
          name: '',
          id: '',
          major: 1,
          standard_weight: ''
        }
        this.showModal = false
      }else {
        this.$message.error('没有该食材')
      }
    },
    selectItem() {
      console.log(222);
    }
  },

  created() {
    this.token = storage.getItem('token')
  }

}
</script>

<style scoped>
ul{
  padding: 0;
  margin: 0;
}
.headSection {
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  padding-left: 30px;
  border-bottom: 1px solid #e9e9e9;
}
.contentBox {
  background-color: rgb(249,249,249);
  padding: 15px;
}
.content {
  background-color: #fff;
}
.myipt {
  width: 300px;
}
.ipt {
  width: 200px;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  outline: none;
  border: 1px solid #e9e9e9;
}
.orderRow {
  display: flex;
  justify-content: space-around;
  width: 1000px;
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
.table {
  position: relative;
  max-width: 1000px;
  min-width: 700px;
}
.addFood {
  position: absolute;
  right: 10px;
  bottom: 8px;
}

.addFoodRow {
  display: flex;
  width: 400px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 30px auto;
}
.board {
  position: absolute;
  right: 0;
  top: 50px;
  width: 300px;
  border: 1px solid #fff;
  background-color: #fff;
  height: 200px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 8px;
  z-index: 1;
  overflow: scroll;
}
.board::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.board::-webkit-scrollbar-thumb {
    background-color: skyblue;
    border-radius: 6px;
}

.board::-webkit-scrollbar-track {
    background-color: #ddd;
    border-radius: 6px;
}
.board li {
  list-style: none;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
  font-size: 15px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
}
.board li:hover{
  background-color: #ebeef5;
}

.btngroup {
  text-align: center;
  margin-top: 20px;
}
</style>
