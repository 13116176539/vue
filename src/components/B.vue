<template>
  <div>
    B组件:
    <input type="button" value="点击触发" @click="getData">
    <span>{{name}}</span>
  </div>
</template>
<script>
  import Bus from '../assets/bus.js'
  export default{
    data(){
      return{
        name:0
      }
    },
    mounted(){

//用$on事件来接收参数


      Bus.$on('val',(data)=>{
        alert(data)
      })

    },
    methods:{
      getData:function(){
        this.name++
      }
    }
  }
</script>


<style scoped>

</style>
