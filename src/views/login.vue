<template>
  <div class="login_wrapper">
    <div class="login_container">
      <div class="table_wrapper">

          <el-col  >
            <h4>vue-admin-template</h4>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="">
              <el-form-item label="" prop="username">
                <el-input v-model="ruleForm.username" label="user：" placeholder="请输入用户名">
                  <i slot="prefix" class="fa fa-user inputLabel"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="" prop="password">
                <el-input v-model="ruleForm.password" :type="showPassword?'text':'password'" placeholder="请输入密码">
                  <i slot="prefix" class="fa fa-lock inputLabel" ></i>
                  <i slot="suffix" class="fa  inputLabel" :class="[showPassword?'fa-eye':'fa-eye-slash']"  @click="showPass()"></i>
                </el-input>
              </el-form-item>
            </el-form>
            <el-button class="submitBtn" type="primary" @click="login('ruleForm')">登录</el-button>
            <el-col class="message">
              <span class="username">用户名:admin</span>
              <span class="password">密码:admin</span>
            </el-col>
          </el-col>

      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' type="text/scss"  rel="stylesheet/scss" >
  .login_wrapper{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    min-height:100%;
    width:100%;
    background:#304156;
    margin:auto;
    .login_container{
      top:0;
      bottom:0;
      left:0;
      right:0;
      width:100%;
      height:100%;
      position:relative;
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      -webkit-justify-content: center;
      justify-content: center;
      .table_wrapper{
        width:350px;
      }
    }
    .submitBtn{
      width:100%;
    }
    .inputLabel{
      text-align:center;
      padding-left:5px;
      font-size:16px;
    }
    .message{
      color:#fff;
      display:inline-block;
      line-height:40px;
      .username{
        padding-right:10px;
      }
    }
  }

</style>

<script>


  export default {
    data() {
      var checkPass=function(rule,value,callback){
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length<5) {
          callback(new Error('密码必须不能小于5位'));
        } else {
          callback();
        }
      };
      return {
        showPassword:false,
        ruleForm: {
          username:"admin",
          password:"admin"
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { validator: checkPass, trigger: 'blur' }
          ],
        },
      };
    },
    computed: {

    },
    methods: {
      login(formName){
        var _this=this;
        console.log(_this.ruleForm);

        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$store.dispatch('Login', this.ruleForm).then((data) => {
                this.$router.push({ path: '/' })
          }).catch((err) => {
             console.log("err",err)
          })
          } else {
            console.log('error submit!!')
          return false
        }
      })
      }
    },
    components:{

    }
  }
</script>

