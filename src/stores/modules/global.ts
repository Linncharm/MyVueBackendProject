import {defineStore} from "pinia";
import type {GlobalState} from "@/stores/interface";
import {computed, ref} from "vue";

import {tempRouter} from "@/router/modules/tempRouter";

import Home from "@/views/home/index.vue"
import About from "@/views/about/index.vue"
import {HOME_URL} from "@/config/constants";
import First from "@/components/Project/first.vue"
import Second from "@/components/Project/second.vue"
import Third from "@/components/Project/secondFirst.vue"
import Blog from "@/views/blog/index.vue"

const MenuList = ref(tempRouter)
const MenuListLength = computed(()=>MenuList.value.length)
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
        //子菜单长度
        showMenuListLength:MenuListLength.value,
        //页脚
        footer:true,
    }),
    actions:{
        //设置全局状态
        //剩余参数语法，用于收集不定量的参数，形成一个数组
        setGlobalState(...args: ObjToKeyValueArray<GlobalState>){

            this.$patch({[args[0]] : args[1]});
            //以下是错误的写法 会导致收到数组形式的value
            //this.$patch({[args[0]] : [args[1]] });
        }
    }
})