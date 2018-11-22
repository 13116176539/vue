import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import demo1 from "../components/demo1"
import parent from "../components/parent"
import C from "../components/C"
import demo2 from "../components/demo2"

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/hanbaobao',
      name: 'HelloWorld',
      component: HelloWorld

    },
    {
      path: '/demo1',
      name: 'demo1',
      component: demo1

    },{
      path: '/parent',
      name: 'parent',
      component: parent
    },
    {
      path: '/C',
      name: 'C',
      component: C
    },
    {
      path: '/demo2',
      name: 'demo2',
      component: demo2
    }

  ]
})
