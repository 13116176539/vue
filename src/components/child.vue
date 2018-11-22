<template>
  <div>
    子组件:{{num}}
    <button @click="changeValue">点我同时改变父子组件的值</button>
  </div>
</template>

<script>
  export default {
    name: "child",
    props:["num"],
    methods:{
      changeValue(){
        this.$emit("incre",1);
      }
    }
  }
</script>

<style scoped>

</style>
