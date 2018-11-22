<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <p>父组件:{{num}}</p>
    <Counter :num=num   v-on:incre="increment" ></Counter>

  </div>
</template>


<script>
  import Counter from "./child"
  export default {
    name: "parent",
    data(){
      return{
        num:5,
        msg:"父子组件传值"
      }
    },
    components:{
      Counter
    },
    methods:{
      increment(value){
        this.num-=value;
      }
    }
  }
</script>

<style scoped>

</style>
