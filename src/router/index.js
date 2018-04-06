import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Manage from '@/components/Manage'
import home from '@/components/home'
import login from '@/components/login'
import option1_1 from '@/components/container/option1_1'
import option1_2 from '@/components/container/option1_2'
import option2_1 from '@/components/container/option2_1'
import option3_1 from '@/components/container/option2_2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      hidden:true
    },
    {
      path: '/',
      redirect:"/home",
      name: 'Manage',
      component: Manage,
      children:[{
        path: 'home',
        name: 'home',
        component: home,
        meta:{name:"home",icon:"el-icon-upload",breamHidden:true},
      }],
      hidden:true
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      hidden:true
    },
    {
      path: '/navigation1',
      redirect: '/navigation1/option1_1',
      name: 'navigation',
      component: Manage,
      meta:{name:"导航一",icon:"el-icon-menu"},
      children:[
        {
          path: 'option1_1',
          name: 'option1_1',
          component: option1_1,
          meta:{name:"选项一",icon:"el-icon-location-outline"},
        },
        {
          path: 'option1_2',
          name: 'option1_2',
          component: option1_2,
          meta:{name:"选项二",icon:"el-icon-location"},
        }
      ]
    },
    {
      path: '/navigation2',
      redirect:"/navigation2/option2_1",
      name: 'navigation2',
      component: Manage,
      meta:{name:"导航二",icon:"el-icon-location-outline"},
      children:[{
        path: 'option2_1',
        name: 'option2_1',
        component: option2_1,
        meta:{name:"选项二",icon:"el-icon-star-off"},

      }]
    },
    {
      path: '/navigation3',
      name: 'navigation3',
      component: Manage,
      children:[{
        path: 'option3_1',
        name: 'option3_1',
        component: option3_1,
        meta:{name:"导航三",icon:"el-icon-upload"},
      }]
    },
  ]
})
