<template>
  <div class="nav_con">
    <el-col :span="24">
        <span class="bav-item">
          <i class="fa fa-bars openBar"
             :class="{closeBar:sidebar.opened}"
             @click="toggleSideBar"
             :isActive="sidebar.opened">
          </i>
        </span>
        <span class="bav-item breadcrumb">
          <el-breadcrumb separator="/" v-if="routers">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item,index) in routers" :to="{path:item.path}" :key="index" >
                {{item.title}}
              </el-breadcrumb-item>
          </el-breadcrumb>
        </span>
        <span class="user_wrapper">
          <el-dropdown @command="handleItem">
            <img src="../../../assets/images/user_img.jpeg" alt="">
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  command="home">Home</el-dropdown-item>
                <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </span>
    </el-col>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped type="text/css" lang="scss" >
  .openBar{
    transform: rotate(0deg);
    -ms-transform:rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform:rotate(0deg);

    transition: .38s;
    transform-origin: 50% 50%;
  }
  .openBar.closeBar{
    transform: rotate(90deg);
  }
  .nav_con{
    height:40px;
    overflow:hidden;
    padding:5px 10px;
    margin:auto 0;
    border-bottom:1px solid #e6e6e6;
    .bav-item{
      display:block;
      float:left;
      line-height:40px;
      span{
        line-height:40px;
      }
    }
    .breadcrumb{
      margin-left:10px;
      display:inline-block;
    }
  }
  .user_wrapper{
    float:right;
    img{
      display:inline-block;
      height:40px;
      width:auto;
      border-radius:7px;
    }
  }

</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        routers:[],
      };
    },
    props:['pathChange'],
    computed:{
            ...mapGetters([
              'sidebar',
            ])
    },
    mounted:function(){
      this.getRouters();
    },
    methods: {
      toggleSideBar:function(){
        this.$store.dispatch('ToggleSideBar')
      },
      handleItem(command){
        if(command=="home"){
          this.$router.push({path:"/"});
        }
        if(command=="loginOut"){
          console.log("退出登录");
         // this.$router.push({path:"/login"});
          this.$store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
      },
      getRouters:function(){
        var _this=this;
        _this.routers=[];
        var matched=_this.$route.matched;
        console.log("matched",matched);
        if(matched[0].meta && matched[0].meta.name){
          _this.routers[0]={
            path:matched[0].path,
            title:matched[0].meta.name
          }
          _this.routers[1]={
            path:matched[1].path,
            title:matched[1].meta.name
          }
        }else if(!matched[1].meta.breamHidden){
          _this.routers[0]={
            path:matched[1].path,
            title:matched[1].meta.name
          }
        }
        console.log("面包屑导航",_this.routers);
      }
    },
    watch:{
      $route() {
        this.getRouters()
      }
    }
  }
</script>

