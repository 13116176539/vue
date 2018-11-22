<template>
  <div>
    <input type="text" v-model="msg">
    {{msg}}
    <span v-text="msg"></span>
    <!--v-on:click的语法糖-->
    <button @click="changeValue">点我改变msg值</button>
  </div>
</template>

<script>

  export default {
    name: "demo1",
    beforeCreate() {
      console.group();
      console.error("执行了beforeCreate");

    },
    created() {
      console.group();
      console.error("执行了created")
    },
    beforeMount() {
      console.group();
      console.error("执行了beforeMount")
    },
    mounted() {
      console.group();
      console.error("执行了mounted")
    },
    beforeUpdate() {
      console.group();
      console.error("执行了beforeUpdate")
    },
    updated() {
      console.group();
      console.error("执行了updated")
    },
    data() {
      return {
        msg: 55
      }
    },
    methods:{

        changeValue(){
          this.msg++;
        }

    }
  }
</script>

<style scoped>
  span {
    color: red;
  }
</style>
