<template>
  <div
    v-bind:checked="checked"
    @click="emitValue"
  >我是级联选择</div>
</template>

<script>
  export default {
    name: "cascade",
    data() {
      return {

      }
    },
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean
    },
    methods:{
      emitValue(){
        this.$emit("change",)
      }
    }
  }
</script>

<style scoped>

</style>



