<template>
  <div class="app-wrapper" >
    <div> userName：{{name}}</div>
    <div>roles:<span v-for="(item,index) in roles" :key="index">{{item}}</span></div>
    <div class="avatar_wrapper">
      <span>avatar:</span>
      <span><img :src="avatar" class="avatar"></span>
    </div>
    <!--<div>{{msg}}</div>
    <div>{{_msg}}</div>
    <div>{{msg|lala}}</div>-->
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' type="text/scss"  rel="stylesheet/scss" >
    .avatar_wrapper span{
      vertical-align: top;
    }
    .avatar{
      width:100px;
      height:auto;
      border-radius:7px;
      border:1px solid grey;
      margin:2px;
      box-shadow: 0 0 7px;;
    }
</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
       msg:"欢迎来到我的世界123"
      };
    },
    mounted:function(){
      console.log(this.$states)
    },
    computed: {
      ...mapGetters([
        'name',
        'roles',
        'avatar'
      ]),
      _msg:function(){
        return this.msg+"lala";
      }
    },
    filters:{
      lala:function(val){
        return val+"lalalalalala";
      }
    },
    methods: {

    },
    components:{
    }
  }
</script>

