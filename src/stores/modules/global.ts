import {defineStore} from "pinia";
import type {GlobalState} from "@/stores/interface";
import {ref} from "vue";

import Home from "/src/views/home/index.vue"
import About from "/src/views/about/index.vue"
import {HOME_URL} from "@/config/constants";
import First from "@/components/Project/first.vue"
import Second from "@/components/Project/second.vue"
import Third from "@/components/Project/secondFirst.vue"

const MenuList = ref([
    //关于嵌套路由的sample，用于检测menuList能否成功遍历
    {
      path:'/project',
      name:'project',
      redirect:'/project/First',
      children:[
          {
              path:'/project/first',
              name:'First',
              component:First,
              meta:{
                  icon:"Files",
                  title:"First"
              }
          },
          {
              path:'/project/second',
              name:'Second',
              component:Second,
              children:[
                  {
                      path:'/project/second/second-first',
                      name:'Second-First',
                      component:Third,
                      meta:{
                          icon:"Files",
                          title:"Second-first"
                      }
                  }
              ],
              meta:{
                title: "Second",
                icon:"Folder"
              }
          },
      ],
      meta: {
          icon:"CirclePlus",
          title: "Project"
      }
    },

    {
        path:'/home/index',
        name:'home',
        component:Home,
        meta:{
            title:"Home",
            icon:"HomeFilled"
        }
    },
    {
        path:'/about/index',
        name:'about',
        component:About,
        meta: {
            title:"About",
            icon:"Star"
        }
    }
])

//export default useGlobalStore 的区别
export const useGlobalStore = defineStore({
    id: 'MyVueBackendProject',
    state:():GlobalState=>({
        //当前系统语言
        language:null,
        //element组件大小
        assemblySize:"default",
        //布局样式 默认vertical
        layout:"vertical",
        //侧边栏关闭状态
        isCollapse:false,
        //子菜单列表
        showMenuList:MenuList.value,
    }),
})