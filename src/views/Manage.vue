<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="aside_wrapper" >
      <sidebar></sidebar>
    </div>
    <div class="main-container">
        <navBar ></navBar>
        <container></container>
    </div>

  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang='scss' type="text/scss"  rel="stylesheet/scss" >
  @import './../assets/index.scss';


</style>

<script>
  import sidebar from "@/components/layout/sidebar";
  import navBar from "@/components/layout/navBar";
  import container from "@/views/container/index";

  export default {
    data() {
      return {
        isCollapse: true,
        pathChange:"",
      };
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
    components:{
      sidebar:sidebar,
      navBar:navBar,
      container:container
    }
  }
</script>

