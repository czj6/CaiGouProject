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
                <el-input v-model="name" class="myipt"></el-input>
              </el-form-item>
              <el-form-item label="菜谱标签">
                <el-select v-model="tag" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.tag_id"
                    :label="item.tag"
                    :value="item.tag">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-upload
                  class="avatar-uploader"
                  action="http://106.53.148.37:8083/menu/upload.action"
                  :headers= headers
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  ref="uploadIpt"
                  >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
                <editor
                  apiKey="boii7cfactuukhrgpfl6rxq70xwjk3j9cf6yo77sp4qn5j40"
                  v-model="richText"
                  :init="{
                    height: 500,
                    language:'zh_CN',
                    plugins: 'image code',
                    toolbar: 'undo redo | link image | code',
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    file_picker_callback: richImg,
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }"
                  ref="myRich"
                >
                </editor>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getRichContent">立即创建</el-button>
                <el-button @click="cancelAdd">取消</el-button>
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
            <el-autocomplete
              class="myipt"
              v-model="addFoodItem.name"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              :trigger-on-focus="false"
              @select="handleSelect"
              @blur="handleBlur"
            ></el-autocomplete>
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
import Editor from '@tinymce/tinymce-vue'
import axios from 'axios'
// const {getQiniu} = require('../lib/qiniuHelp.js')
import {Input,Form,FormItem,Button,Select,Option,Radio, Autocomplete,Upload} from 'element-ui'

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
    [Radio.name]: Radio,
    [Autocomplete.name]: Autocomplete,
    editor: Editor,
    [Upload.name]: Upload
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
      tag: '',
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
      isExist: false,
      richText: '',
      imageUrl: '',
      headers: {},
      name: ''
    }
  },
  methods: {
    async handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = file.response
      },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    addFood() {
      this.showModal = true
    },
    async querySearch(str,cb) {
      await this.getFoodLike()
      cb(this.foodList)
    },
    handleFocus() {
      this.showBoard = true
    },
    handleBlur(e) {

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
    async imgUpload(blobInfo) {
      const axiosInstance = axios.create({ withCredentials: false }); //withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
      let data = new FormData();

      data.append("file", blobInfo);
      let res = await this.axios.post('/menu/upload.action',data,{
        headers: {
          "Content-Type": "multipart/form-data",
          token: this.token
        }
      })
      return res.data
      // console.log(res);
    },
    test() {
      console.log(99);
    },
    async getFoodLike() {
      this.foodList = []
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
      let data = res.data.data.content
      for (let item of data) {
        item['value'] = item.ingredient
        this.foodList.push(item)
      }
    },
    confirmAdd() {
      let item = this.foodList.find((item) => {
        return item.ingredient == this.addFoodItem.name
      })
      if (this.foodList.length!==0 && this.addFoodItem.name == item?.ingredient) {
        this.addFoodItem.id = item.id
        this.addFoodItem.major = item.major
        this.isExist = true
      }else {
        this.isExist = false
      }
      console.log(this.addFoodItem);
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

    },
    handleSelect(item) {
      console.log(2);
    },

    async getRichContent() {
      let method = this.handleRichText(this.richText)
      let foodList = []
      let weightList = []
      for(let item of this.mainFood) {
        foodList.push(item.id)
        weightList.push(item.standard_weight)
      }
      for(let item of this.subFood) {
        foodList.push(item.id)
        weightList.push(item.standard_weight)
      }
      let obj = {
        name: this.name,
        method,
        tags: this.tag,
        avatar: this.imageUrl,
        foodList,
        weightList
      }
      console.log(method);
      let res = await this.axios.post('menu/addMenuDetail',obj,{
        headers: {
          token: this.token
        }
      })
      console.log(res);
      if (res.data.data == 1) {
        this.$message.success('添加成功')
        this.name = '';
        this.richText = '';
        this.tag = '';
        this.imageUrl = '';
        this.mainFood = [];
        this.subFood = []
      }else{
        this.$message.error('添加失败')
      }
    },
    richImg(cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        var base64
        var that = this
        input.onchange = function () {
          var file = this.files[0];
          // console.log(file);
          var reader = new FileReader();
          reader.onload = async function () {
            var id = 'blobid' + (new Date()).getTime();
            var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
            base64 = reader.result.split(',')[1];
            var blobInfo = blobCache.create(id, file, base64);
            var url = await that.imgUpload(file)
            // console.log(url);
            blobCache.add(blobInfo);
            cb(url, { title: file.name });
          };
          reader.readAsDataURL(file);
        };
        input.click();
    },
    handleRichText(str) {
      // console.log(888);
      let arr = []
      let start = 0,end = 0
      while(true) {
        start = str.indexOf('<p>',start)
        end = str.indexOf('</p>',start)
        if (start >= 0) {
          arr.push(str.substring(start+3,end))

          var left = str.indexOf('src="',end)
          var right = str.indexOf('"',left+5)
          arr.push(str.substring(left+5,right))

          start = str.indexOf('<p>',right)
          end = str.indexOf('</p>',start)
          arr.push(str.substring(start+3,end))
        }else{
          break
        }
        if(start < 0)
          break

        start++
      }
      return arr.join('\n')
    },
    cancelAdd() {
      this.name = '';
      this.richText = '';
      this.tag = '';
      this.imageUrl = '';
      this.mainFood = [];
      this.subFood = []
    }

  },

  async created() {
    this.token = storage.getItem('token')
    this.headers = {
      token: this.token
    }
    // this.qiniuToken = getQiniu()
    console.log(this.qiniuToken);
    let res = await this.axios.get('/menu/getAllTags',{
      headers: {
        token: this.token
      }
    })
    this.options = res.data.data;
  }

}
</script>

<style scoped>
ul{
  padding: 0;
  margin: 0;
}
.avatar-uploader{
  width: 178px;
  height: 178px;
  margin: 20px 0;
}
.avatar-uploader, .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader, .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
