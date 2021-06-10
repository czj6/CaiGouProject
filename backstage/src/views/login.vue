<template>
  <div class="login">
    <div class="logo-box">
      <img src="../assets/ed.png" >
      <span id="UI" @click="login">菜购</span>

    </div>
    <div class="form-box">
      <div class="login_form_left" >
        <span>菜购</span>
        <img src="../assets/login2.png">
      </div>
      <div class="login_form_right">
        <div class="login_text">
          <span id="b" >Login</span>
          <p class="login_text_underline"></p>
        </div>
        <div class="login_ipt_box">
          <el-input class="input login_ipt"  placeholder="请输入账号" v-model="userName" ></el-input>
          <el-input show-password  id="password" class="input login_ipt"  placeholder="请输入密码" v-model="password" ></el-input>
        </div>
        <div class="choose_box">
          <div id="choose" >
            <el-radio style="margin-right: 13px;" v-model="radio" label="1">超市</el-radio>
            <el-radio style="margin-right: 13px;" v-model="radio" label="2">店铺</el-radio>
          </div>
          <span id="c" >忘记密码？</span>
        </div>
        <button class="login_btn el-button is-round" type="primary" round @click="login" >登录</button>
      </div>
    </div>
  </div>
</template>



<script>
import storage from '../storage/storage'
  export default {
    data() {
      return {
        userName: '',
        password: '',
        activeName: 'second',
        activeName: "first",
        input: '',
        input2: '',
        radio: '1',
        isBtnLoading: false
      }
    },
    created () {
      if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).userName){
        this.userName = JSON.parse( localStorage.getItem('user')).userName;
        this.password = JSON.parse( localStorage.getItem('user')).password;
      }
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    methods: {
      async login() {
        if (!this.userName) {
          this.$message.error('请输入用户名');
          return;
        }
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }
        let res = await this.axios.post('/api/adminUser/login',{
          name: this.userName,
          password: this.password
        })
        if (res.data.adminUser) {
          storage.setItem('token',res.data.token)
          if (this.radio == 1) {
            this.$router.push({path: '/supermarket'})
          }
          if (this.radio == 2) {
            this.$router.push({path: '/menu'})
          }
        }else{
          this.$message.error('信息错误');
        }
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style>
  .login {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #F5F5FA;
  }
  .login_form {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
  }
  .logo-box {
    display: flex;
    align-items: center;
    position: absolute;
    top: 20px;
    left: 50px;
  }
  .logo-box img{
    width: 50px;
    height:50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .logo-box span{
     color: #000000;
     font-size:30px;
 }
 .form-box {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
 }
  .login_form1 {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;

  }
  .login_form_left{
    background-color: #00BB7a;
    width: 400px;
    height:500px;
    position: relative;
  }
  .login_form_right {
    width: 400px;
    height: 500px;
    background-color: #fff;
    text-align: center;
  }
  .login_form_left span {
    display: inline-block;
    color: #FFFFFF;
    font-size:30px;
    margin-top: 30px;
    margin-left: 40px;
  }
  .login_form_left img {
    position: absolute;
    width: 370px;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
  }
  .login_text {
    color: #000000;
    font-size:40px;
    text-align: center;
    margin-top: 40px;
  }
  .login_text_underline {
    padding: 0;
    margin: 0;
    margin: 15px auto;
    width: 40px;
    height: 1px;
    background-color: #00BB7a;
  }
  .login_ipt_box {
    margin: 50px auto;
    text-align: center;
  }
  .login_ipt {
    width: 300px !important;
    margin: 10px 0;
  }
  .choose_box {
    width: 300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  #account{
      width: 250px;
  }
  #choose{
      width: 150px;
  }

  #a{
    color: #00BB7a;
    font-size:10px;
  }
  #b{
      color: #000000;
      font-size:40px;
  }
  #c{
    float: right;
    font-size:10px;
  }
  #message2{
    width: 350px;
    height:300px;
  }
  .login_logo {
    height: 100%;
  }
  .login_btn {
    width: 300px;
    font-size: 16px !important;
    background-color: #00BB7a !important;
    margin: 25px auto !important;
    color: #fff !important;
  }
</style>
