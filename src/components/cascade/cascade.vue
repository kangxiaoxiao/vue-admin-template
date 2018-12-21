<template>
  <div class="ul_wrapper_template" v-show="showPanel">
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
    methods:{
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
