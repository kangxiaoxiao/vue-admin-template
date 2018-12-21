<template>
  <div class="option1_2" >
    <!--<base-checkbox v-model="lovingVue"></base-checkbox>
    <hr/>-->
    <el-button @click.stop="hidePanel()">切换</el-button>
    <div>{{value1}}</div>
    <cascade
      :options="optionList"
      v-model="value1"
      ref="cascadeModule"
    ></cascade>
  </div>
</template>

<script>
  import baseCheckbox from "@/components/baseCheckBox/baseCheckBox"
  import cascade from "@/components/cascade/cascade"
  export default {
    name: 'option1_2',
    data () {
       return{
         lovingVue:true,
         optionList:[{
           name:"食物",
           child:[{
             name:"水果",
             child:[{
               name:"苹果"
             },{
               name:"梨子"
             },{
               name:"香蕉"
             }]
           },{
             name:"蔬菜",
             child:[{
               name:"白菜",
             },{
               name:"萝卜",
             },{
               name:"黄花菜",
             }]
           },{
             name:"主食",
             child:[{
               name:"米饭"
             },{
               name:"馒头"
             },{
               name:"水饺"
             }]
           }]
         }],
         value1:["食物","水果","苹果"]
       }
    },
    mounted(){

    },
    methods:{
      hidePanel(){
        console.log("点击事件");
        let _this=this;
        this.$refs.cascadeModule.handleChangeStatus(JSON.stringify(_this.value1));
      }
    },
    components:{
      baseCheckbox,
      cascade
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
