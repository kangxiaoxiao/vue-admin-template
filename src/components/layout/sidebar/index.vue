<template>
  <div class="slide">


      <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :collapse="isCollapse"
              background-color="#304156"
              text-color="#fff"
              active-text-color="#409EFF"
      >
        <slot v-for="item in routers" >
          <el-submenu  :index="item.path"
                       v-if="!item.hidden && item.children && item.meta">
            <template  slot="title" >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{item.meta.name}}</span>
            </template>
              <router-link  v-if="item.meta" v-for="(item2,index2) in item.children"  :key="index2" :to="item.path+'/'+item2.path">
                <el-menu-item :index="item.path+'/'+item2.path">
                  <i :class="item2.meta.icon"></i>
                  <span>{{item2.meta.name}}</span>
                </el-menu-item>
              </router-link>
          </el-submenu>

          <router-link
                  v-if="!item.hidden  && !item.meta && item.children"
                  :to="item.path+'/'+item.children[0].path"
                  :key="item.path+'/'+item.children[0].path"

          >
            <el-menu-item  :index="item.path+'/'+item.children[0].path" >
              <i :class="item.children[0].meta.icon"></i>
              <span slot="title">{{item.children[0].meta.name}}</span>
            </el-menu-item>
          </router-link>

        </slot>

      </el-menu>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped >

</style>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'navigation',
    data() {
      return {
        routers:[],
        activeItem:""
      };
    },
    props:[],
    mounted:function(){
      var _this=this;
      this.routers=this.$router.options.routes||[];
      var routers=_this.routers;
      _this.activeItem=_this.$route.path;
    },
    computed: {
            ...mapGetters([
              'sidebar'
            ]),
            isCollapse() {
              return !this.sidebar.opened
            },

    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getActiveItem(val){
        var _this=this;
        _this.activeItem=val;
      },
    },

  }
</script>

