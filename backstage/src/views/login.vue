<template>
  <div>
  
    
    <img class="cai"  id="picture"  src="../assets/ed.png" >
     <span id="UI" @click="login">菜购</span>
   
     
  </div>
  


</template>
 
 
 
<script>
//  import { userLogin } from '../../api/api';

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
      login() {
        if (!this.userName) {
          this.$message.error('请输入用户名');
          return;
        }
        if (!this.password) {
          this.$message.error('请输入密码');
          return;
        }
 
      },
         handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style>
  .login_form {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
      
  }
  #picture{
    position:absolute; 
    left:100px; 
    top:50px;
    width: 50px;
    height:50px;
    border-radius: 50% ;
}
  .login_form1 {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
      
  }
  #login{
      background-color: #00BB7a;
       position:absolute; 
       left:400px; 
       top:170px;
       width: 60px;
       height:350px;
  }
  #login1{
    background-color: #FFFFFF; 
    position:absolute;
    left:765px;
    top:170px;
    width: 60px;
    height:350px;

  }
  #login2{
      background-color: #00BB7a;
       color: #ffffff;
       position:absolute;
        left:50px;
         top:400px;
  }
  #account{
      width: 250px;
      position:absolute; 
      left:-100px; 
      top:0px;
  }
  #choose{
       position:absolute;
       width: 150px;
        left:50px; 
        top:330px;
  }
  
  #word{
      color: #FFFFFF;
      font-size:30px;
      position:absolute;
       left:40px; 
       top:50px;
  }
  #a{
    color: #00BB7a;
    font-size:10px;
    position:absolute;
     left:160px; 
     top:130px;

  }
  #b{
      color: #000000;
      font-size:40px;
      position:absolute;
       left:130px; 
       top:80px;
  }
  #c{
    float: right;
    
    font-size:10px;
    position:absolute;
     left:300px; 
     top:350px;

  }
  #message2{
    position:absolute; 
    left:10px; 
    top:180px;
    width: 350px;
    height:300px;
  }
 #UI{
     color: #000000;
     font-size:30px;
     position:absolute;
    left:170px;
     top:50px;
 }
  .login_logo {
    height: 100%;
  }
  .login_btn {
    width: 300px;
    font-size: 16px;
    background-color:  #77c49d; 

    
  }
</style>
