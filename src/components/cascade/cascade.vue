<template>
  <div class="ul_wrapper_template" v-show="showPanel" v-clickoutside="handleClose">
    <ul v-for="(item,$index) in option_list"
        v-if="option_list && option_list.length>0"
        :key="$index+'ul'"
    >
      <li v-for="(item2,$index2) in item"
          :key="$index2+'li'"
          @click.stop="handleAddOptions(item2,$index)"
          :class="{active:selectOption.indexOf(item2.name)==$index}"
      >{{item2.name}}
      </li>
    </ul>
  </div>
</template>

<script>
  const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
      function documentHandler(e) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
          return false;
        }
        // 判断指令中是否绑定了函数
        if (binding.expression) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
          binding.value(e);
        }
      }
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.__vueClickOutside__ = documentHandler;
      document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
      // 解除事件监听
      document.removeEventListener('click', el.__vueClickOutside__);
      delete el.__vueClickOutside__;
    },
  };
  export default {
    name: "baseCheckBox",
    data(){
      return{
        showPanel:false,
        option_list:[],
        selectOption:[]
      }
    },
    mounted(){
      this.option_list=[this.options];
    },
    directives: {clickoutside},
    methods:{
      handleClose(e) {
        this.showPanel = false;
      },
      handleChangeStatus(value){
        this.showPanel=!this.showPanel;
        this.selectOption=JSON.parse(value);
        this.initArr();
      },
      initArr(){
        this.option_list=this.option_list.length>1?this.option_list.slice(0,1):this.option_list;
        if(this.selectOption.length>0){
          this.selectOption.forEach((item,index)=>{
            this.option_list[index].forEach((item_option)=>{
                if(item_option.name==item && item_option.child && item_option.child.length>0){
                  this.option_list.push(item_option.child);
                }
            })
          })
        }
      },
      handleAddOptions(item,index){
        let _this=this;
        this.selectOption=this.selectOption.slice(0,index)
        this.selectOption.push(item.name);
        if(item.child && item.child.length>0){
          this.option_list=this.option_list.slice(0,index+1);
          this.option_list.push(item.child)
        }else{
          this.$emit("change",_this.selectOption);
          this.showPanel=false;
        }
      }
    },
    props: {
      options:Array
    },
    model:{
      prop: 'selectOption',
      event: 'change'
    }
  }
</script>

<style scoped lang="scss">
  .ul_wrapper_template{
    display: inline-block;
    overflow: hidden;
    border:1px solid #ccc;
    box-shadow: 0 0 7px #e5e5e5;
    font-size:0;
    ul{
      display:inline-block;
      height: 200px;
      overflow-y: hidden;
      &+ul{
       border-left:1px solid #e5e5e5;
      }
      li{
        min-width: 200px;
        cursor: pointer;
        font-size: 14px;
        line-height: 40px;
        color:#333;
        &:hover,&.active{
          background: #f5f5f5;
          color:#409EFF
        }
      }
    }
  }
</style>
