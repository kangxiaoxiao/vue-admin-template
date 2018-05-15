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
              router
              unique-opened
      >

        <slot v-for="item1 in routers" >
           <template v-if="item1.children">

             <!---子标签只有一条的时候且与子标签的名称一致，只显示一级-->
             <el-menu-item
               :index="item1.path+'/'+item1.children[0].path"
               v-if="item1.meta
               && item1.children
               && (item1.children.length==1)
               && item1.meta.name==item1.children[0].meta.name"
             >
               <i :class="item1.children[0].meta.icon"></i>
               <span slot="title">{{item1.children[0].meta.name}}</span>
             </el-menu-item>

             <!--子标签大于一条的时候或者，显示二级-->
             <el-submenu
               v-if="item1.meta && item1.children
               && (item1.children.length>1 ||( item1.children.length==1 && item1.meta.name!=item1.children[0].meta.name))
               && !item1.hidden"
               :index="item1.path"
             >
               <template slot="title">
                 <i :class="item1.meta.icon"></i>
                 <span>{{item1.meta.name}}</span>
               </template>
               <el-menu-item
                 v-for="(item2,index) in item1.children"
                 :index="item1.path+'/'+item2.path"
                 :key="'item2'+index"
                 v-if="!item2.hidden"
               >
                     <i :class="item2.meta.icon"></i>
                     <span slot="title">{{item2.meta.name}}</span>
               </el-menu-item>
             </el-submenu>

           </template>
        </slot>

      </el-menu>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped >

</style>

<script>
  import { mapGetters } from 'vuex'
  import {menu} from "@/assets/js/menu"
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
      //console.log('自定义menu',menu);

      var _this=this;
      this.routers=this.$router.options.routes||[];
      console.log(this.routers);
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

